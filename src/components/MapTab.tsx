/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CharacterData, StageDefinition } from '../types/game';
import { CHAPTERS, STAGES_BY_CHAPTER } from '../data/chapters';
import { Check, Lock, Crown, Play, BookOpen, AlertCircle, Compass, Sparkles, CloudRain, CloudSnow, CloudFog, Flame } from 'lucide-react';
import { sound } from '../utils/sound';
import { WeatherOverlay } from './WeatherOverlay';

interface MapTabProps {
  character: CharacterData;
  activeChapterId?: number;
  onSelectChapter?: (chapterId: number) => void;
  onEnterStage: (chapterId: number, stageId: number) => void;
  onOpenStoryIntro: (chapterId: number) => void;
  onOpenParallelWorld: () => void;
}

export const MapTab: React.FC<MapTabProps> = ({
  character,
  activeChapterId,
  onSelectChapter,
  onEnterStage,
  onOpenStoryIntro,
  onOpenParallelWorld,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(
    activeChapterId || character.journey.chapterId || 1
  );

  React.useEffect(() => {
    if (activeChapterId && activeChapterId !== selectedChapterId) {
      setSelectedChapterId(activeChapterId);
    }
  }, [activeChapterId]);
  const [selectedStage, setSelectedStage] = useState<StageDefinition | null>(null);

  const pendingFailedQuestions = character.journey.failedQuestions.filter(q => q.status === 'pending');
  const currentChapter = CHAPTERS.find(c => c.chapterId === selectedChapterId) || CHAPTERS[0];
  const stages = STAGES_BY_CHAPTER[selectedChapterId] || [];

  // Check if a chapter is unlocked:
  // Chapter 1 is always unlocked.
  // Chapter N is unlocked if Chapter N-1 boss is beaten AND no pending failed questions from Chapter N-1.
  const isChapterUnlocked = (chId: number): boolean => {
    if (chId === 1) return true;
    const prevChapterBossKey = `${chId - 1}-10`;
    const bossBeaten = character.journey.completedStages.includes(prevChapterBossKey);
    const hasPendingFromPrev = pendingFailedQuestions.some(q => q.sourceChapterId === chId - 1);
    return bossBeaten && !hasPendingFromPrev;
  };

  // Determine stage status
  const getStageStatus = (stage: StageDefinition): 'completed' | 'current' | 'locked' => {
    const key = `${stage.chapterId}-${stage.stageId}`;
    if (character.journey.completedStages.includes(key)) {
      return 'completed';
    }
    // Check if previous stage is completed or if it's stage 1 of unlocked chapter
    if (stage.stageId === 1 && isChapterUnlocked(stage.chapterId)) {
      return 'current';
    }
    const prevKey = `${stage.chapterId}-${stage.stageId - 1}`;
    if (character.journey.completedStages.includes(prevKey)) {
      return 'current';
    }
    return 'locked';
  };

  const handleSelectStage = (stage: StageDefinition) => {
    sound.playClick();
    setSelectedStage(stage);
  };

  const handleStartStage = () => {
    if (!selectedStage) return;
    const status = getStageStatus(selectedStage);
    if (status === 'locked') return;

    if (selectedStage.isBoss) {
      sound.playBoss();
    } else {
      sound.playClick();
    }
    onEnterStage(selectedStage.chapterId, selectedStage.stageId);
  };

  // Auto-select first active or current stage on chapter switch
  React.useEffect(() => {
    const active = stages.find(s => getStageStatus(s) === 'current') || stages[0];
    setSelectedStage(active);
  }, [selectedChapterId]);

  const weatherInfo: Record<number, { title: string; desc: string; icon: React.ReactNode; color: string }> = {
    1: {
      title: 'Mưa Tinh Thể Số Thực',
      desc: 'Mưa pha lê phản chiếu lấp lánh qua thung lũng hữu tỉ',
      icon: <CloudRain className="w-3.5 h-3.5 text-cyan-300" />,
      color: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-200',
    },
    2: {
      title: 'Gió Tuyết Tầng Mây',
      desc: 'Bông tuyết và luồng gió lốc lơ lửng quanh đảo góc cẩm thạch',
      icon: <CloudSnow className="w-3.5 h-3.5 text-sky-300" />,
      color: 'bg-sky-950/60 border-sky-400/40 text-sky-200',
    },
    3: {
      title: 'Sương Mù Phát Quang',
      desc: 'Sương tím ma mị và bào tử ánh sáng huyền bí trôi dạt',
      icon: <CloudFog className="w-3.5 h-3.5 text-purple-300" />,
      color: 'bg-purple-950/60 border-purple-500/40 text-purple-200',
    },
    4: {
      title: 'Tàn Tro Tri Thức Hoàng Kim',
      desc: 'Bụi vàng và ký tự toán học bừng sáng thánh địa đại hiền triết',
      icon: <Flame className="w-3.5 h-3.5 text-amber-300" />,
      color: 'bg-amber-950/60 border-amber-500/40 text-amber-200',
    },
  };

  const chapterThemes: Record<
    number,
    {
      bgGradient: string;
      ambientAura: string;
      panelBg: string;
      panelBorder: string;
      compassIconColor: string;
      tabSelectedBg: string;
      tabText: string;
      nodeCurrent: string;
      nodeCurrentRing: string;
      nodeSelectedRing: string;
      actionBtnGradient: string;
      actionBtnText: string;
      storyBtnBorder: string;
      detailTitleColor: string;
      detailBorder: string;
      accentBadge: string;
    }
  > = {
    1: {
      bgGradient: 'from-slate-950/90 via-[#061e2b]/85 to-[#02111a]',
      ambientAura: 'from-cyan-500/25 via-teal-500/10 to-transparent',
      panelBg: 'bg-[#061824]/90',
      panelBorder: 'border-cyan-500/30',
      compassIconColor: 'text-cyan-400',
      tabSelectedBg: 'bg-gradient-to-r from-cyan-950/90 to-blue-950/90 border-cyan-400 shadow-lg shadow-cyan-950/60',
      tabText: 'text-cyan-300',
      nodeCurrent: 'bg-gradient-to-br from-cyan-500 to-blue-700 border-2 border-cyan-300 text-white shadow-xl shadow-cyan-950/60',
      nodeCurrentRing: 'ring-4 ring-cyan-400/40 animate-pulse',
      nodeSelectedRing: 'ring-4 ring-cyan-300',
      actionBtnGradient: 'bg-gradient-to-r from-cyan-500 via-teal-600 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-950/60',
      actionBtnText: 'text-white',
      storyBtnBorder: 'bg-cyan-950/70 hover:bg-cyan-900/70 border-cyan-500/40 text-cyan-200',
      detailTitleColor: 'text-cyan-400',
      detailBorder: 'border-cyan-500/40 shadow-2xl shadow-cyan-950/50',
      accentBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    2: {
      bgGradient: 'from-slate-950/90 via-[#0a1c38]/85 to-[#051124]',
      ambientAura: 'from-sky-500/25 via-indigo-500/10 to-transparent',
      panelBg: 'bg-[#081830]/90',
      panelBorder: 'border-sky-500/30',
      compassIconColor: 'text-sky-400',
      tabSelectedBg: 'bg-gradient-to-r from-sky-950/90 to-indigo-950/90 border-sky-400 shadow-lg shadow-sky-950/60',
      tabText: 'text-sky-300',
      nodeCurrent: 'bg-gradient-to-br from-sky-500 to-indigo-700 border-2 border-sky-300 text-white shadow-xl shadow-sky-950/60',
      nodeCurrentRing: 'ring-4 ring-sky-400/40 animate-pulse',
      nodeSelectedRing: 'ring-4 ring-sky-300',
      actionBtnGradient: 'bg-gradient-to-r from-sky-500 via-indigo-600 to-blue-700 hover:from-sky-400 hover:to-indigo-500 shadow-xl shadow-sky-950/60',
      actionBtnText: 'text-white',
      storyBtnBorder: 'bg-sky-950/70 hover:bg-sky-900/70 border-sky-500/40 text-sky-200',
      detailTitleColor: 'text-sky-400',
      detailBorder: 'border-sky-500/40 shadow-2xl shadow-sky-950/50',
      accentBadge: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    },
    3: {
      bgGradient: 'from-slate-950/90 via-[#1f0c2e]/85 to-[#10051a]',
      ambientAura: 'from-purple-500/25 via-fuchsia-500/10 to-transparent',
      panelBg: 'bg-[#170824]/90',
      panelBorder: 'border-purple-500/30',
      compassIconColor: 'text-purple-400',
      tabSelectedBg: 'bg-gradient-to-r from-purple-950/90 to-fuchsia-950/90 border-purple-400 shadow-lg shadow-purple-950/60',
      tabText: 'text-purple-300',
      nodeCurrent: 'bg-gradient-to-br from-purple-600 to-fuchsia-700 border-2 border-purple-300 text-white shadow-xl shadow-purple-950/60',
      nodeCurrentRing: 'ring-4 ring-purple-400/40 animate-pulse',
      nodeSelectedRing: 'ring-4 ring-purple-300',
      actionBtnGradient: 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-700 hover:from-purple-500 hover:to-fuchsia-500 shadow-xl shadow-purple-950/60',
      actionBtnText: 'text-white',
      storyBtnBorder: 'bg-purple-950/70 hover:bg-purple-900/70 border-purple-500/40 text-purple-200',
      detailTitleColor: 'text-purple-400',
      detailBorder: 'border-purple-500/40 shadow-2xl shadow-purple-950/50',
      accentBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    4: {
      bgGradient: 'from-slate-950/90 via-[#261505]/85 to-[#140b02]',
      ambientAura: 'from-amber-500/25 via-orange-500/10 to-transparent',
      panelBg: 'bg-[#1c0f03]/90',
      panelBorder: 'border-amber-500/30',
      compassIconColor: 'text-amber-400',
      tabSelectedBg: 'bg-gradient-to-r from-amber-950/90 to-orange-950/90 border-amber-400 shadow-lg shadow-amber-950/60',
      tabText: 'text-amber-300',
      nodeCurrent: 'bg-gradient-to-br from-amber-500 to-orange-700 border-2 border-amber-300 text-white shadow-xl shadow-amber-950/60',
      nodeCurrentRing: 'ring-4 ring-amber-400/40 animate-pulse',
      nodeSelectedRing: 'ring-4 ring-amber-300',
      actionBtnGradient: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-xl shadow-amber-950/60',
      actionBtnText: 'text-slate-950 font-black',
      storyBtnBorder: 'bg-amber-950/70 hover:bg-amber-900/70 border-amber-500/40 text-amber-200',
      detailTitleColor: 'text-amber-400',
      detailBorder: 'border-amber-500/40 shadow-2xl shadow-amber-950/50',
      accentBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
  };

  const currentWeather = weatherInfo[selectedChapterId] || weatherInfo[1];
  const theme = chapterThemes[selectedChapterId] || chapterThemes[1];

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] pb-28 md:pb-12 flex flex-col justify-between overflow-hidden">
      {/* Dynamic Background Image of current Chapter */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45 transition-all duration-700 pointer-events-none scale-105"
        style={{ backgroundImage: `url('${currentChapter.bgImage}')` }}
      />
      {/* Thematic Atmosphere Dynamic Gradient per Chapter */}
      <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient} transition-all duration-700 pointer-events-none`} />

      {/* Ambient Radial Aura for Realm Depth */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-radial ${theme.ambientAura} blur-3xl pointer-events-none transition-all duration-700`} />

      {/* Dynamic Thematic Weather Layer */}
      <WeatherOverlay chapterId={selectedChapterId} />

      {/* Chapter Selection Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-rpg text-white tracking-wide flex items-center gap-2">
              <Compass className={`w-6 h-6 ${theme.compassIconColor}`} />
              <span>{currentChapter.name}</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1">
              {currentChapter.description}
            </p>
            {/* Thematic Atmospheric Weather Badge */}
            <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-xl border text-xs font-semibold backdrop-blur-md shadow-lg shadow-black/30 transition-all animate-in fade-in">
              <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border ${currentWeather.color}`}>
                {currentWeather.icon}
                <span>{currentWeather.title}</span>
              </div>
              <span className="hidden sm:inline text-[11px] text-slate-300 opacity-90">{currentWeather.desc}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onOpenStoryIntro(selectedChapterId);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold backdrop-blur-sm cursor-pointer transition-all ${theme.storyBtnBorder}`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Dẫn Truyện Chương</span>
            </button>

            {pendingFailedQuestions.length > 0 && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenParallelWorld();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-900/70 to-rose-900/70 hover:from-red-800/80 hover:to-rose-800/80 border border-red-500/50 text-red-100 text-xs font-bold backdrop-blur-sm cursor-pointer transition-all shadow-lg shadow-red-950/40 animate-pulse"
              >
                <AlertCircle className="w-4 h-4 text-red-300" />
                <span>Thế Giới Song Song ({pendingFailedQuestions.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Chapter Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          {CHAPTERS.map(ch => {
            const unlocked = isChapterUnlocked(ch.chapterId);
            const isSelected = ch.chapterId === selectedChapterId;
            const completedCount = STAGES_BY_CHAPTER[ch.chapterId]?.filter(s =>
              character.journey.completedStages.includes(`${ch.chapterId}-${s.stageId}`)
            ).length || 0;

            return (
              <button
                key={ch.chapterId}
                disabled={!unlocked}
                onClick={() => {
                  sound.playClick();
                  setSelectedChapterId(ch.chapterId);
                  onSelectChapter?.(ch.chapterId);
                }}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? theme.tabSelectedBg
                    : unlocked
                    ? 'bg-slate-900/70 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800/60 cursor-pointer'
                    : 'bg-slate-950/60 border-slate-900 text-slate-600 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-bold ${isSelected ? theme.tabText : 'text-slate-400'}`}>
                    CHƯƠNG 0{ch.chapterId}
                  </span>
                  {!unlocked ? (
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  ) : completedCount === 10 ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="text-[10px] text-teal-400 font-mono">{completedCount}/10</span>
                  )}
                </div>
                <div className="font-bold text-sm text-white truncate">{ch.shortName}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Nodes Pathway & Selected Stage Details Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        {/* Left Column: Interactive 10-Stage Path Grid */}
        <div className={`lg:col-span-8 ${theme.panelBg} backdrop-blur-md border ${theme.panelBorder} rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-500`}>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
              ĐƯỜNG HÀNH TRÌNH KHÁM PHÁ (10 ẢI)
            </span>
            <span className="text-xs text-slate-400">
              Ải 10 là Trùm Vùng Đất
            </span>
          </div>

          {/* Grid of Stage Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 relative">
            {stages.map((stage) => {
              const status = getStageStatus(stage);
              const isSelected = selectedStage?.stageId === stage.stageId;

              return (
                <div key={stage.stageId} className="flex flex-col items-center">
                  <button
                    onClick={() => handleSelectStage(stage)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      stage.isBoss
                        ? status === 'completed'
                          ? 'bg-gradient-to-br from-amber-600 to-yellow-500 border-2 border-amber-300 shadow-lg shadow-amber-900/40 text-white'
                          : status === 'current'
                          ? 'bg-gradient-to-br from-purple-800 via-amber-700 to-purple-900 border-2 border-amber-400 shadow-xl shadow-amber-500/30 text-amber-200 animate-pulse scale-105'
                          : 'bg-slate-900 border border-slate-800 text-slate-600'
                        : status === 'completed'
                        ? 'bg-emerald-950/70 border-2 border-emerald-500/80 text-emerald-300 shadow-md shadow-emerald-950/40'
                        : status === 'current'
                        ? `${theme.nodeCurrent} ${theme.nodeCurrentRing} scale-105`
                        : 'bg-slate-900/70 border border-slate-800 text-slate-600'
                    } ${isSelected ? theme.nodeSelectedRing : ''}`}
                  >
                    {stage.isBoss ? (
                      <Crown className={`w-7 h-7 sm:w-8 sm:h-8 ${status === 'completed' ? 'text-amber-100' : 'text-amber-400'}`} />
                    ) : status === 'completed' ? (
                      <Check className="w-7 h-7 text-emerald-400" />
                    ) : status === 'locked' ? (
                      <Lock className="w-5 h-5 text-slate-600" />
                    ) : (
                      <span className="text-xl sm:text-2xl font-black font-rpg">{stage.stageId}</span>
                    )}

                    <span className="absolute -bottom-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950 border border-slate-800 text-slate-300 shadow">
                      {stage.isBoss ? 'TRÙM' : `Ải ${stage.stageId}`}
                    </span>
                  </button>

                  <span className="text-[11px] text-slate-400 font-medium text-center mt-3 truncate max-w-[90px]">
                    {stage.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Stage Detail Action Panel */}
        <div className="lg:col-span-4">
          {selectedStage ? (
            <div className={`${theme.panelBg} backdrop-blur-md border ${theme.detailBorder} rounded-3xl p-6 shadow-2xl animate-in fade-in transition-all duration-500`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs uppercase tracking-wider font-bold ${theme.detailTitleColor}`}>
                  CHI TIẾT THỬ THÁCH
                </span>
                {getStageStatus(selectedStage) === 'completed' && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Đã Vượt
                  </span>
                )}
                {getStageStatus(selectedStage) === 'current' && (
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${theme.accentBadge} font-semibold flex items-center gap-1`}>
                    <Sparkles className="w-3 h-3 text-amber-300" /> Sẵn Sàng
                  </span>
                )}
                {getStageStatus(selectedStage) === 'locked' && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700 font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Bị Khóa
                  </span>
                )}
              </div>

              <h4 className="text-xl font-bold font-rpg text-white mb-1">
                {selectedStage.title}
              </h4>
              <p className="text-xs text-amber-300 font-semibold mb-4">
                Chủ đề: {selectedStage.subtitle}
              </p>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-6">
                {selectedStage.description}
              </div>

              {selectedStage.isBoss && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs mb-6 flex items-start gap-2.5">
                  <Crown className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{selectedStage.bossName}</p>
                    <p className="text-[11px] text-amber-300/80">{selectedStage.bossTitle} · Đánh bại Trùm để hoàn thành vùng đất!</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <button
                  disabled={getStageStatus(selectedStage) === 'locked'}
                  onClick={handleStartStage}
                  className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                    getStageStatus(selectedStage) === 'locked'
                      ? 'bg-slate-800 text-slate-600 border border-slate-800 cursor-not-allowed'
                      : selectedStage.isBoss
                      ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white shadow-xl shadow-amber-950/50'
                      : `${theme.actionBtnGradient} ${theme.actionBtnText}`
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>
                    {getStageStatus(selectedStage) === 'completed'
                      ? 'ÔN TẬP LẠI ẢI NÀY'
                      : selectedStage.isBoss
                      ? 'KHIÊU CHIẾN TRÙM'
                      : 'VÀO ẢI THỬ THÁCH →'}
                  </span>
                </button>

                {getStageStatus(selectedStage) === 'locked' && (
                  <p className="text-center text-xs text-slate-500">
                    Cần hoàn thành các ải trước để mở khóa ải này.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center text-slate-500">
              <p className="text-sm">Chọn một ải trên bản đồ để xem chi tiết.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
