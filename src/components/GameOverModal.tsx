/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Skull, RotateCcw, UserPlus, Heart, Sparkles, Coins, Layers } from 'lucide-react';
import { CharacterData } from '../types/game';
import { sound } from '../utils/sound';

interface GameOverModalProps {
  character: CharacterData;
  onGoToProfiles: () => void;
  onCreateNewHero: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  character,
  onGoToProfiles,
  onCreateNewHero,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#101827]/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1C293B] border border-rose-600/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-center animate-in zoom-in-95">
        
        {/* Skull Emblem */}
        <div className="w-16 h-16 rounded-2xl bg-rose-950/80 border-2 border-rose-500 flex items-center justify-center text-rose-500 mx-auto mb-4 shadow-xl shadow-rose-950/50">
          <Skull className="w-9 h-9" />
        </div>

        <h3 className="text-3xl font-black font-rpg text-white mb-2">
          HÀNH TRÌNH TẠM DỪNG
        </h3>
        <p className="text-xs text-rose-300 font-semibold mb-6">
          Sinh lực HP của hiệp sĩ {character.profile.name} đã về 0
        </p>

        {/* Journey Summary */}
        <div className="grid grid-cols-3 gap-2 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 text-center mb-6">
          <div>
            <span className="text-[10px] text-slate-400 block mb-1">Cấp độ</span>
            <div className="font-bold text-white text-base">
              Lv.{character.stats.level}
            </div>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 block mb-1">Kinh nghiệm</span>
            <div className="flex items-center justify-center gap-1 font-bold text-teal-300 text-sm">
              <Sparkles className="w-3 h-3" />
              <span>{character.stats.exp}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 block mb-1">Ải đã vượt</span>
            <div className="flex items-center justify-center gap-1 font-bold text-purple-300 text-sm">
              <Layers className="w-3 h-3" />
              <span>{character.journey.completedStages.length}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-6 italic">
          "Đừng nản lòng! Mọi bậc đại hiền triết đều từng vấp ngã trước khi làm chủ các con số. Hãy bắt đầu một hành trình mới với kinh nghiệm quý báu vừa tích lũy!"
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              sound.playClick();
              onCreateNewHero();
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-950/40 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>TẠO NHÂN VẬT MỚI</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onGoToProfiles();
            }}
            className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>VỀ QUẢN LÝ HỒ SƠ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
