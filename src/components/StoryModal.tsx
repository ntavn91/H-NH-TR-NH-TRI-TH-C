/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface StoryModalProps {
  title: string;
  subtitle: string;
  paragraphs: string[];
  bgImage?: string;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  title,
  subtitle,
  paragraphs,
  bgImage,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#101827]/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full bg-[#1C293B] border border-purple-500/40 rounded-3xl p-6 sm:p-9 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Subtle background graphic */}
        {bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C293B] via-[#1C293B]/80 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Biên Niên Sử Khám Phá</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black font-rpg text-white mb-1">
            {title}
          </h3>
          <p className="text-xs text-amber-300 font-semibold mb-6">
            {subtitle}
          </p>

          {/* Paragraphs */}
          <div className="space-y-4 mb-8">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="text-slate-300 text-sm sm:text-base leading-relaxed italic border-l-2 border-purple-500/40 pl-4 py-1"
              >
                "{p}"
              </p>
            ))}
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-950/50 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>TIẾP TỤC BƯỚC VÀO HÀNH TRÌNH</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
