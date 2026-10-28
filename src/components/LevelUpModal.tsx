/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface LevelUpModalProps {
  level: number;
  title: string;
  currentHp: number;
  maxHp: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  level,
  title,
  currentHp,
  maxHp,
  onClose,
}) => {
  useEffect(() => {
    sound.playLevelUp();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#101827]/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1C293B] border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center animate-in zoom-in-95">
        
        {/* Glow emblem */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600 to-yellow-400 border-4 border-amber-300 flex items-center justify-center text-slate-950 mx-auto mb-4 shadow-xl shadow-amber-500/30">
          <Award className="w-12 h-12" />
        </div>

        <span className="text-xs uppercase tracking-widest font-extrabold text-amber-300 block mb-1">
          BƯỚC ĐỘT PHÁ TRI THỨC
        </span>
        <h3 className="text-3xl sm:text-4xl font-black font-rpg text-white mb-2 leading-tight">
          CHÚC MỪNG<br />LÊN CẤP!
        </h3>
        <p className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 font-rpg mb-6">
          ĐẠT CẤP ĐỘ {level} · {title.toUpperCase()}
        </p>

        {/* Stat Increase Card */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 mb-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-rose-400 font-bold">
              <Heart className="w-4 h-4 fill-current" />
              Sinh lực hiện tại
            </span>
            <span className="text-emerald-400 font-mono font-bold text-lg">
              +1
            </span>
          </div>

          <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-800/80">
            <span className="flex items-center gap-2 text-purple-400 font-bold">
              <Sparkles className="w-4 h-4" />
              Giới hạn sinh lực
            </span>
            <span className="text-purple-300 font-mono font-bold text-lg">
              +1
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 italic mb-6 leading-relaxed">
          "Trí tuệ được tôi luyện giúp cơ thể và tinh thần bạn thêm phần kiên cố. Tiếp tục hành trình để chinh phục các tầng bí ẩn tiếp theo!"
        </p>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <span>TIẾP TỤC HÀNH TRÌNH</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
