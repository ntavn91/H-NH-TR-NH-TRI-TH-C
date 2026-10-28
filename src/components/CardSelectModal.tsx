/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeroClass } from '../types/game';
import { Sun, Moon, Sparkles, HelpCircle, RotateCcw } from 'lucide-react';
import { sound } from '../utils/sound';

interface CardSelectModalProps {
  heroClass: HeroClass;
  hasFateCard: boolean;
  onUseFateCard: () => void;
  onConfirmCardChoice: (cardType: 'light' | 'dark') => void;
  stageTitle: string;
}

interface CardSlot {
  id: number;
  type: 'light' | 'dark';
}

export const CardSelectModal: React.FC<CardSelectModalProps> = ({
  heroClass,
  hasFateCard,
  onUseFateCard,
  onConfirmCardChoice,
  stageTitle,
}) => {
  const [cards, setCards] = useState<CardSlot[]>([]);
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<'light' | 'dark' | null>(null);
  const [hasRerolled, setHasRerolled] = useState(false);

  // Generate card deck based on character class
  const generateDeck = () => {
    let cardTypes: ('light' | 'dark')[] = [];
    if (heroClass === 'light_monk') {
      // 3 cards: 2 Light, 1 Dark
      cardTypes = ['light', 'light', 'dark'];
    } else {
      // Knight & Mage: 2 cards: 1 Light, 1 Dark
      cardTypes = ['light', 'dark'];
    }
    // Shuffle
    cardTypes.sort(() => Math.random() - 0.5);
    return cardTypes.map((type, id) => ({ id, type }));
  };

  useEffect(() => {
    setCards(generateDeck());
    setRevealedIndex(null);
    setSelectedType(null);
  }, []);

  const handlePickCard = (index: number) => {
    if (revealedIndex !== null) return;
    sound.playCardFlip();
    setRevealedIndex(index);
    const chosen = cards[index].type;
    setSelectedType(chosen);
  };

  const handleRerollWithFateCard = () => {
    sound.playBuyItem();
    onUseFateCard();
    setHasRerolled(true);
    setCards(generateDeck());
    setRevealedIndex(null);
    setSelectedType(null);
  };

  const handleProceed = () => {
    if (!selectedType) return;
    sound.playClick();
    onConfirmCardChoice(selectedType);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#101827]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-[#1C293B] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-center animate-in fade-in zoom-in-95">
        <span className="text-xs uppercase tracking-wider font-bold text-purple-400 block mb-1">
          RÚT THẺ VẬN MỆNH TRƯỚC ẢI ĐẤU
        </span>
        <h3 className="text-2xl sm:text-3xl font-black font-rpg text-white mb-2">
          {stageTitle}
        </h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto mb-8">
          Chọn một lá bài để định đoạt số lượng phương án trả lời. 
          <strong className="text-amber-300"> Thẻ Ánh Sáng</strong> mở ra 2 đáp án (50/50), 
          trong khi <strong className="text-indigo-300"> Thẻ Bóng Tối</strong> thử thách bạn với 4 đáp án!
        </p>

        {/* Cards Presentation */}
        <div className={`grid gap-4 sm:gap-6 justify-center max-w-lg mx-auto mb-8 ${
          cards.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
        }`}>
          {cards.map((card, idx) => {
            const isRevealed = revealedIndex === idx;
            const isChosenType = isRevealed ? card.type : null;

            return (
              <div
                key={card.id}
                onClick={() => handlePickCard(idx)}
                className={`relative h-48 sm:h-56 rounded-2xl border-2 transition-all duration-500 flex flex-col items-center justify-center p-4 cursor-pointer select-none ${
                  isRevealed
                    ? isChosenType === 'light'
                      ? 'bg-gradient-to-t from-amber-950/80 to-amber-600/30 border-amber-400 shadow-xl shadow-amber-500/20 scale-105'
                      : 'bg-gradient-to-t from-purple-950/80 to-indigo-900/40 border-purple-400 shadow-xl shadow-purple-500/20 scale-105'
                    : revealedIndex !== null
                    ? 'bg-slate-900/60 border-slate-800 opacity-40 cursor-default'
                    : 'bg-gradient-to-b from-slate-800 to-slate-900 border-purple-500/40 hover:border-purple-400 hover:scale-102 hover:shadow-lg shadow-purple-950/30'
                }`}
              >
                {!isRevealed ? (
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300">
                      <HelpCircle className="w-6 h-6 animate-pulse" />
                    </div>
                    <span className="text-xs font-bold font-rpg tracking-wider text-slate-300">
                      LÁ BÀI 0{idx + 1}
                    </span>
                    <span className="text-[10px] text-purple-400 font-semibold">Bấm để lật</span>
                  </div>
                ) : card.type === 'light' ? (
                  <div className="flex flex-col items-center gap-2 animate-in zoom-in-75">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-lg shadow-amber-500/30">
                      <Sun className="w-8 h-8 fill-amber-400/30" />
                    </div>
                    <h4 className="font-bold text-base text-amber-300 font-rpg">THẺ ÁNH SÁNG</h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 font-semibold">
                      Chỉ 2 Đáp Án (50%)
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 animate-in zoom-in-75">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-500/30">
                      <Moon className="w-8 h-8 fill-purple-400/30" />
                    </div>
                    <h4 className="font-bold text-base text-purple-300 font-rpg">THẺ BÓNG TỐI</h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 font-semibold">
                      Đầy Đủ 4 Đáp Án
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Fate Card Reroll Option */}
        {selectedType === 'dark' && hasFateCard && !hasRerolled && (
          <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/40 mb-6 flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Bạn đang có Thẻ Định Mệnh!</p>
                <p className="text-[11px] text-purple-300/80">Cho phép xáo trộn và rút lại một lần trước khi câu hỏi xuất hiện.</p>
              </div>
            </div>
            <button
              onClick={handleRerollWithFateCard}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Dùng Thẻ Rút Lại</span>
            </button>
          </div>
        )}

        {/* Confirm and Start Button */}
        {selectedType && (
          <button
            onClick={handleProceed}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all shadow-xl cursor-pointer active:scale-95 ${
              selectedType === 'light'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-950/40'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-950/40'
            }`}
          >
            BƯỚC VÀO TRẬN ĐẤU ({selectedType === 'light' ? 'THẺ ÁNH SÁNG · 2 ĐÁP ÁN' : 'THẺ BÓNG TỐI · 4 ĐÁP ÁN'}) →
          </button>
        )}
      </div>
    </div>
  );
};
