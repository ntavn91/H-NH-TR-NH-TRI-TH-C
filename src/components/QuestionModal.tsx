/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { QuestionVariant, QuestionOption, CharacterData } from '../types/game';
import { LatexRenderer } from '../utils/katexRenderer';
import { Clock, Shield, Hourglass, Scroll, Sparkles, AlertCircle, BookOpen, Crown, Flame } from 'lucide-react';
import { sound } from '../utils/sound';

interface QuestionModalProps {
  variant: QuestionVariant;
  options: QuestionOption[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  cardType: 'light' | 'dark';
  stageTitle: string;
  isBoss: boolean;
  bossName?: string;
  bossTitle?: string;
  bossImage?: string;
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
  bossTitle,
  bossImage,
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
  const [answerStatus, setAnswerStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [screenShaking, setScreenShaking] = useState<boolean>(false);
  const [showWrongFlash, setShowWrongFlash] = useState<boolean>(false);

  // 3 visual states for Boss: 'intro' (spawn), 'idle' (waiting/breathing), 'defeated' (dissolving)
  const [bossState, setBossState] = useState<'intro' | 'idle' | 'defeated'>('idle');

  const initialTotalSecondsRef = useRef<number>(getBaseTimeSeconds());

  // Boss appearance intro sequence
  useEffect(() => {
    if (isBoss) {
      setBossState('intro');
      sound.playBossIntro();
      setScreenShaking(true);
      const shakeTimer = setTimeout(() => setScreenShaking(false), 200);
      const idleTimer = setTimeout(() => setBossState('idle'), 1300);
      return () => {
        clearTimeout(shakeTimer);
        clearTimeout(idleTimer);
      };
    }
  }, [isBoss]);

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
    setAnswerStatus('wrong');
    setShowWrongFlash(true);
    sound.playWrong();
    setTimeout(() => {
      onAnswer('A', true); // timeout flagged
    }, 550);
  };

  const handleSelectOption = (optId: 'A' | 'B' | 'C' | 'D') => {
    if (isResolving) return;
    setIsResolving(true);
    setSelectedOpt(optId);

    const isCorrect = optId === correctOptionId;
    if (isCorrect) {
      sound.playClick();
      setAnswerStatus('correct');
      setScreenShaking(true);
      setTimeout(() => setScreenShaking(false), 140);

      // Delicate celebratory confetti
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#F59E0B', '#10B981', '#38BDF8', '#FCD34D', '#A855F7'],
        disableForReducedMotion: true,
      });

      if (isBoss) {
        setBossState('defeated');
        sound.playBossDefeat();
        setTimeout(() => {
          onAnswer(optId, false);
        }, 1100);
      } else {
        setTimeout(() => {
          onAnswer(optId, false);
        }, 450);
      }
    } else {
      sound.playWrong();
      setAnswerStatus('wrong');
      setShowWrongFlash(true);
      setScreenShaking(true);
      setTimeout(() => setScreenShaking(false), 140);
      setTimeout(() => {
        onAnswer(optId, false);
      }, 600);
    }
  };

  // Add 10 seconds via Hourglass
  const handleUseHourglass = () => {
    if (hourglassCount <= 0 || isResolving) return;
    sound.playBuyItem();
    onUseItem('time_hourglass');
    setDeadline((prev) => prev + 10000);
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
    <div className={`fixed inset-0 z-50 bg-[#101827]/95 backdrop-blur-lg flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto ${screenShaking ? 'animate-shake' : ''}`}>
      {/* Wrong Answer Red Vignette Flash & Ash Particles */}
      {showWrongFlash && (
        <div className="fixed inset-0 pointer-events-none z-50 animate-vignette-flash bg-[radial-gradient(circle_at_center,transparent_40%,rgba(220,38,38,0.75)_100%)]">
          <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-slate-400 opacity-60 animate-ash-1" />
          <div className="absolute top-1/3 left-1/2 w-4 h-4 rounded-full bg-slate-300 opacity-50 animate-ash-2" />
          <div className="absolute top-1/4 right-1/3 w-2.5 h-2.5 rounded-full bg-red-400 opacity-70 animate-ash-3" />
        </div>
      )}

      <div className="max-w-4xl w-full bg-[#1C293B] border border-purple-500/30 rounded-3xl p-4 sm:p-7 shadow-2xl my-auto animate-in fade-in zoom-in-95 max-h-[96vh] overflow-y-auto relative">
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
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm shadow-inner transition-colors ${
                secondsLeft <= 5
                  ? 'bg-red-950/80 border-red-500 text-red-300 animate-pulse'
                  : 'bg-slate-900 border-slate-700 text-slate-100'
              }`}
            >
              <Clock className={`w-4 h-4 ${secondsLeft <= 5 ? 'text-red-400' : 'text-teal-400'}`} />
              <span className="tabular-nums text-base">{secondsLeft}s</span>
            </div>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden mb-5 border border-slate-800">
          <div
            className={`h-full transition-all duration-300 ${
              secondsLeft <= 5
                ? 'bg-gradient-to-r from-red-600 to-rose-500'
                : 'bg-gradient-to-r from-teal-500 via-purple-500 to-indigo-500'
            }`}
            style={{ width: `${timerRatio * 100}%` }}
          />
        </div>

        {/* BOSS SHOWCASE BANNER (Stage 10) */}
        {isBoss && (
          <div
            className={`p-4 rounded-2xl border mb-5 flex flex-col sm:flex-row items-center gap-4 transition-all duration-500 relative overflow-hidden ${
              bossState === 'defeated'
                ? 'bg-gradient-to-r from-amber-950/90 via-yellow-950/80 to-purple-950/90 border-amber-400 shadow-2xl shadow-amber-500/40'
                : bossState === 'intro'
                ? 'bg-gradient-to-r from-purple-950/90 via-red-950/80 to-slate-950/90 border-amber-500/70 shadow-2xl shadow-purple-900/50'
                : 'bg-slate-950/80 border-amber-500/40 shadow-xl'
            }`}
          >
            {/* Background rotating magic rune circle */}
            <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full border border-amber-400/20 border-dashed animate-rune-spin pointer-events-none" />

            {/* Boss Portrait Frame with 3 states */}
            <div className="relative shrink-0">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-xl relative bg-slate-900 ${
                  bossState === 'idle'
                    ? 'animate-idle-breathe shadow-amber-500/30'
                    : bossState === 'intro'
                    ? 'animate-pulse ring-4 ring-amber-400'
                    : 'animate-boss-dissolve ring-4 ring-yellow-300'
                }`}
              >
                {bossImage ? (
                  <img
                    src={bossImage}
                    alt={bossName || 'Boss'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-amber-400">
                    <Crown className="w-10 h-10" />
                  </div>
                )}
              </div>

              {/* Boss state indicator badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-950 border border-amber-400 text-amber-300 shadow whitespace-nowrap">
                {bossState === 'intro' && 'Triệu Hồi'}
                {bossState === 'idle' && 'Nghênh Chiến'}
                {bossState === 'defeated' && 'Bị Đánh Bại!'}
              </div>
            </div>

            {/* Boss Info Text */}
            <div className="flex-1 text-center sm:text-left z-10">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <Crown className="w-4 h-4 text-amber-400" />
                <h4 className="text-base sm:text-lg font-bold font-rpg text-amber-200">
                  {bossName || 'Trùm Vùng Đất'}
                </h4>
              </div>
              <p className="text-xs text-amber-300/80 font-medium mb-1">
                {bossTitle || 'Chúa Tể Tri Thức'}
              </p>
              <p className="text-[11px] text-slate-300 leading-snug">
                {bossState === 'intro' && '⚡ Uy áp cực đại! Trùm đã xuất hiện từ vết nứt không gian!'}
                {bossState === 'idle' && '🛡️ Hộ thể bằng kết giới toán học. Hãy giải chính xác để phá vỡ phong ấn!'}
                {bossState === 'defeated' && '✨ Trùm đã tan rã thành muôn ngàn hạt sáng! Cánh cổng chương kế tiếp bừng mở!'}
              </p>
            </div>
          </div>
        )}

        {/* Context / Story Narration Frame */}
        {variant.storyContext && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-xs sm:text-sm text-purple-200/90 italic leading-relaxed mb-5 flex items-start gap-2.5">
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
        <div className="p-5 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner mb-5 text-center">
          <div className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed overflow-x-auto py-2">
            <LatexRenderer content={variant.questionLatex} />
          </div>
        </div>

        {/* Active Items Support Bar (During Quiz) */}
        {!isParallelWorld && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-5 flex-wrap gap-2 text-xs">
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

        {/* Options Grid with Golden / Red Flash */}
        <div className={`grid gap-3 sm:gap-4 ${options.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {options.map((opt) => {
            const isSelected = selectedOpt === opt.optionId;
            const isCorrect = opt.optionId === correctOptionId;

            // Visual highlight logic on submit
            let buttonStyle = 'bg-slate-900/80 hover:bg-slate-850 border-slate-700/80 hover:border-purple-400/80 text-slate-100 hover:shadow-md';
            if (isSelected) {
              if (answerStatus === 'correct') {
                buttonStyle = 'bg-amber-950/90 border-amber-400 ring-4 ring-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.9)] text-white animate-shimmer scale-[1.02]';
              } else if (answerStatus === 'wrong') {
                buttonStyle = 'bg-red-950/90 border-red-500 ring-4 ring-red-500/70 shadow-[0_0_25px_rgba(239,68,68,0.8)] text-white';
              } else {
                buttonStyle = 'bg-purple-900/60 border-purple-400 shadow-lg text-white';
              }
            } else if (isResolving && answerStatus === 'wrong' && isCorrect) {
              // Highlight the true correct answer gently if player chose wrong
              buttonStyle = 'bg-emerald-950/60 border-emerald-400 text-emerald-200';
            }

            return (
              <button
                key={opt.optionId}
                disabled={isResolving}
                onClick={() => handleSelectOption(opt.optionId)}
                className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-3.5 cursor-pointer active:scale-98 relative overflow-hidden ${buttonStyle}`}
              >
                <span
                  className={`w-8 h-8 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 border transition-all ${
                    isSelected && answerStatus === 'correct'
                      ? 'bg-amber-500 text-slate-950 border-amber-300'
                      : isSelected && answerStatus === 'wrong'
                      ? 'bg-red-600 text-white border-red-400'
                      : 'bg-purple-950 border-purple-500/40 text-purple-300'
                  }`}
                >
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
          <div className="mt-4 text-center text-xs text-purple-400 animate-pulse font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Đang chốt phong ấn kết quả...</span>
          </div>
        )}
      </div>
    </div>
  );
};
