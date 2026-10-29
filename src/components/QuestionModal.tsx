/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { QuestionVariant, QuestionOption, CharacterData, HeroClass } from '../types/game';
import { LatexRenderer } from '../utils/katexRenderer';
import { Clock, Shield, Hourglass, Scroll, Sparkles, AlertCircle, BookOpen, Crown } from 'lucide-react';
import { sound } from '../utils/sound';

interface QuestionModalProps {
  variant: QuestionVariant;
  options: QuestionOption[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  cardType: 'light' | 'dark';
  stageTitle: string;
  isBoss: boolean;
  bossName?: string;
  character: CharacterData;
  isParallelWorld?: boolean;
  onAnswer: (selectedOptionId: 'A' | 'B' | 'C' | 'D', isTimeout: boolean) => void;
  onUseItem: (itemId: string) => void;
  onSkipQuestion: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  variant,
  options,
  correctOptionId,
  cardType,
  stageTitle,
  isBoss,
  bossName,
  character,
  isParallelWorld = false,
  onAnswer,
  onUseItem,
  onSkipQuestion,
}) => {
  // Base time based on hero class
  // Knight: 20s, Mage: 30s, Light Monk: 20s
  // Plus 2s if player has passive item "Đồng Hồ Minh Triết"
  const getBaseTimeSeconds = (): number => {
    let t = character.profile.heroClass === 'mage' ? 30 : 20;
    if (character.inventory.passiveItems['wisdom_watch']) {
      t += 2;
    }
    return t;
  };

  const [deadline, setDeadline] = useState<number>(Date.now() + getBaseTimeSeconds() * 1000);
  const [secondsLeft, setSecondsLeft] = useState<number>(getBaseTimeSeconds());
  const [isResolving, setIsResolving] = useState<boolean>(false);
  const [hasShieldActive, setHasShieldActive] = useState<boolean>(
    Boolean(character.inventory.activeEffects['heart_shield'])
  );
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);

  const initialTotalSecondsRef = useRef<number>(getBaseTimeSeconds());

  // Inventory counts
  const hourglassCount = character.inventory.activeItems['time_hourglass'] || 0;
  const shieldCount = character.inventory.activeItems['heart_shield'] || 0;
  const skipCount = character.inventory.activeItems['pass_token'] || 0;

  // Countdown Loop
  useEffect(() => {
    if (isResolving) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const diffMs = deadline - now;
      const left = Math.max(0, Math.ceil(diffMs / 1000));
      setSecondsLeft(left);

      if (left <= 5 && left > 0) {
        sound.playTimerTick();
      }

      if (left <= 0) {
        clearInterval(timer);
        handleTimeout();
      }
    }, 200);

    return () => clearInterval(timer);
  }, [deadline, isResolving]);

  const handleTimeout = () => {
    if (isResolving) return;
    setIsResolving(true);
    sound.playWrong();
    onAnswer('A', true); // timeout flagged
  };

  const handleSelectOption = (optId: 'A' | 'B' | 'C' | 'D') => {
    if (isResolving) return;
    setIsResolving(true);
    setSelectedOpt(optId);
    sound.playClick();
    onAnswer(optId, false);
  };

  // Add 10 seconds via Hourglass
  const handleUseHourglass = () => {
    if (hourglassCount <= 0 || isResolving) return;
    sound.playBuyItem();
    onUseItem('time_hourglass');
    setDeadline(prev => prev + 10000);
    initialTotalSecondsRef.current += 10;
  };

  // Activate Heart Shield
  const handleUseShield = () => {
    if (shieldCount <= 0 || hasShieldActive || isResolving) return;
    sound.playBuyItem();
    onUseItem('heart_shield');
    setHasShieldActive(true);
  };

  // Skip question via Pass Token
  const handleUseSkipToken = () => {
    if (skipCount <= 0 || isResolving || isParallelWorld) return;
    sound.playBuyItem();
    setIsResolving(true);
    onSkipQuestion();
  };

  const timerRatio = Math.min(1, Math.max(0, secondsLeft / initialTotalSecondsRef.current));

  return (
    <div className="fixed inset-0 z-50 bg-[#101827]/95 backdrop-blur-lg flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
      <div className="max-w-4xl w-full bg-[#1C293B] border border-purple-500/30 rounded-3xl p-4 sm:p-7 shadow-2xl my-auto animate-in fade-in zoom-in-95 max-h-[96vh] overflow-y-auto">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/60 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {isBoss ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Crown className="w-4 h-4 text-amber-400" />
                TRÙM: {bossName || 'Chúa Tể'}
              </span>
            ) : isParallelWorld ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-400 text-red-300 font-bold text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-red-400" />
                THẾ GIỚI SONG SONG
              </span>
            ) : (
              <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-300 font-bold uppercase tracking-wider">
                {stageTitle}
              </span>
            )}

            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium">
              {cardType === 'light' ? 'Thẻ Ánh Sáng (2 đáp án)' : 'Thẻ Bóng Tối (4 đáp án)'}
            </span>
          </div>

          {/* Countdown Timer Display */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm shadow-inner transition-colors ${
              secondsLeft <= 5
                ? 'bg-red-950/80 border-red-500 text-red-300 animate-pulse'
                : 'bg-slate-900 border-slate-700 text-slate-100'
            }`}>
              <Clock className={`w-4 h-4 ${secondsLeft <= 5 ? 'text-red-400' : 'text-teal-400'}`} />
              <span className="tabular-nums text-base">{secondsLeft}s</span>
            </div>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden mb-6 border border-slate-800">
          <div
            className={`h-full transition-all duration-300 ${
              secondsLeft <= 5
                ? 'bg-gradient-to-r from-red-600 to-rose-500'
                : 'bg-gradient-to-r from-teal-500 via-purple-500 to-indigo-500'
            }`}
            style={{ width: `${timerRatio * 100}%` }}
          />
        </div>

        {/* Context / Story Narration Frame */}
        {variant.storyContext && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-xs sm:text-sm text-purple-200/90 italic leading-relaxed mb-6 flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-purple-300 not-italic block mb-0.5 text-xs">
                Dẫn truyện ải đấu:
              </span>
              "{variant.storyContext}"
            </div>
          </div>
        )}

        {/* Mathematical Problem LaTeX Frame */}
        <div className="p-5 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner mb-6 text-center">
          <div className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed overflow-x-auto py-2">
            <LatexRenderer content={variant.questionLatex} />
          </div>
        </div>

        {/* Active Items Support Bar (During Quiz) */}
        {!isParallelWorld && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-6 flex-wrap gap-2 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Vật phẩm hỗ trợ:
            </span>

            <div className="flex items-center gap-2">
              {/* Hourglass */}
              <button
                disabled={hourglassCount <= 0 || isResolving}
                onClick={handleUseHourglass}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
                  hourglassCount > 0 && !isResolving
                    ? 'bg-slate-800 hover:bg-slate-700 border-teal-500/40 text-teal-300 cursor-pointer'
                    : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                }`}
                title="Sa Lậu Ngưng Thời: Thêm 10 giây cho câu này"
              >
                <Hourglass className="w-3.5 h-3.5 text-teal-400" />
                <span>+10s ({hourglassCount})</span>
              </button>

              {/* Heart Shield */}
              <button
                disabled={shieldCount <= 0 || hasShieldActive || isResolving}
                onClick={handleUseShield}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
                  hasShieldActive
                    ? 'bg-blue-900/40 border-blue-400 text-blue-300 font-bold'
                    : shieldCount > 0 && !isResolving
                    ? 'bg-slate-800 hover:bg-slate-700 border-blue-500/40 text-blue-300 cursor-pointer'
                    : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                }`}
                title="Hộ Tâm Phù: Không mất HP và không thêm vào Thế giới Song Song nếu sai"
              >
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>{hasShieldActive ? 'Đang Khiên' : `Khiên (${shieldCount})`}</span>
              </button>

              {/* Skip Token */}
              <button
                disabled={skipCount <= 0 || isResolving}
                onClick={handleUseSkipToken}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
                  skipCount > 0 && !isResolving
                    ? 'bg-slate-800 hover:bg-slate-700 border-amber-500/40 text-amber-300 cursor-pointer'
                    : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                }`}
                title="Lệnh Bài Vượt Ải: Bỏ qua câu hỏi này an toàn"
              >
                <Scroll className="w-3.5 h-3.5 text-amber-400" />
                <span>Bỏ Qua ({skipCount})</span>
              </button>
            </div>
          </div>
        )}

        {/* Options Grid */}
        <div className={`grid gap-3 sm:gap-4 ${options.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {options.map((opt) => {
            const isSelected = selectedOpt === opt.optionId;
            return (
              <button
                key={opt.optionId}
                disabled={isResolving}
                onClick={() => handleSelectOption(opt.optionId)}
                className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-3.5 cursor-pointer active:scale-98 ${
                  isSelected
                    ? 'bg-purple-900/60 border-purple-400 shadow-lg text-white'
                    : 'bg-slate-900/80 hover:bg-slate-850 border-slate-700/80 hover:border-purple-400/80 text-slate-100 hover:shadow-md'
                }`}
              >
                <span className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 font-bold text-sm flex items-center justify-center shrink-0">
                  {opt.optionId}
                </span>

                <div className="text-sm sm:text-base font-medium overflow-x-auto py-1">
                  <LatexRenderer content={opt.latex} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Resolving indicator */}
        {isResolving && (
          <div className="mt-4 text-center text-xs text-purple-400 animate-pulse font-semibold">
            Đang chốt kết quả và tính toán phong ấn...
          </div>
        )}
      </div>
    </div>
  );
};
