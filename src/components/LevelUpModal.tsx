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
    // 1. Play grand multi-layer brass & crystal fanfare
    sound.playLevelUp();

    // 2. Wave 1: Central fireworks burst
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#fbbf24', '#f59e0b', '#2dd4bf', '#818cf8', '#ffd700'],
      shapes: ['star', 'circle'],
      scalar: 1.2,
    });

    // 3. Wave 2: Left flank golden star burst
    const timer1 = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 65,
        origin: { x: 0.15, y: 0.7 },
        colors: ['#ffd700', '#f59e0b', '#fef08a', '#ffffff'],
        shapes: ['star'],
        scalar: 1.3,
      });
    }, 220);

    // 4. Wave 3: Right flank celestial star burst
    const timer2 = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 65,
        origin: { x: 0.85, y: 0.7 },
        colors: ['#2dd4bf', '#818cf8', '#c084fc', '#ffffff'],
        shapes: ['star'],
        scalar: 1.3,
      });
    }, 400);

    // 5. Wave 4: Glittering victory shower
    const timer3 = setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { x: 0.5, y: 0.35 },
        colors: ['#ffd700', '#facc15', '#fbbf24'],
        scalar: 0.9,
        gravity: 0.7,
      });
    }, 650);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#101827]/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1C293B] border-2 border-amber-400/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/20 text-center animate-in zoom-in-95 relative overflow-hidden">
        
        {/* Ambient Glowing Sunburst Halo */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-48 h-48 bg-radial from-amber-400/35 via-yellow-500/10 to-transparent blur-2xl pointer-events-none animate-pulse" />

        {/* Floating background star particles */}
        <div className="absolute top-4 left-6 text-amber-300 text-sm pointer-events-none animate-float-particle-1">✦</div>
        <div className="absolute top-12 right-8 text-yellow-300 text-xs pointer-events-none animate-float-particle-2">★</div>
        <div className="absolute bottom-20 left-8 text-teal-300 text-xs pointer-events-none animate-float-particle-3">✧</div>
        <div className="absolute bottom-24 right-6 text-amber-400 text-sm pointer-events-none animate-float-particle-1">★</div>

        {/* Glow emblem with ring shimmer */}
        <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 border-4 border-amber-200 flex items-center justify-center text-slate-950 mx-auto mb-4 shadow-2xl shadow-amber-500/40 ring-4 ring-amber-500/30">
          <Award className="w-12 h-12" />
        </div>

        <span className="text-xs uppercase tracking-widest font-black text-amber-300 block mb-1">
          BƯỚC ĐỘT PHÁ TRI THỨC
        </span>
        <h3 className="text-3xl sm:text-4xl font-black font-rpg text-white mb-2 leading-tight drop-shadow-md">
          CHÚC MỪNG<br />LÊN CẤP!
        </h3>
        <p className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 font-rpg mb-6">
          ĐẠT CẤP ĐỘ {level} · {title.toUpperCase()}
        </p>

        {/* Stat Increase Card with Pulsing Aura */}
        <div className="bg-gradient-to-b from-amber-950/40 via-slate-950/80 to-slate-950/90 rounded-2xl border-2 border-amber-500/40 p-4 mb-6 space-y-3 shadow-inner">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-rose-400 font-bold">
              <Heart className="w-4 h-4 fill-current animate-pulse" />
              Sinh lực hiện tại
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono font-black text-lg">
              +1
            </span>
          </div>

          <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-800/80">
            <span className="flex items-center gap-2 text-purple-400 font-bold">
              <Sparkles className="w-4 h-4 animate-spin" />
              Giới hạn sinh lực
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-300 font-mono font-black text-lg">
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
          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
        >
          <span>TIẾP TỤC HÀNH TRÌNH</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
