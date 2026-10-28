/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Compass, Download, Upload, Shield, Award } from 'lucide-react';
import { sound } from '../utils/sound';

interface WelcomeScreenProps {
  onStart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onImportFile: () => void;
  hasExistingSave: boolean;
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  isMuted,
  onToggleMute,
  onImportFile,
  hasExistingSave,
  onContinue,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#101827]">
      {/* Background Graphic with Vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('/src/assets/images/game_cover_knowledge_1793188991559.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-[#101827]/70 to-[#101827]/90" />

      {/* Top Bar Navigation */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-900/30">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white font-rpg">HÀNH TRÌNH TRI THỨC</h1>
            <p className="text-xs text-slate-400">MATH RPG · PHIÊU LƯU TOÁN HỌC</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onToggleMute();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 text-xs font-medium transition-all"
            title="Bật/Tắt âm thanh"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline">{isMuted ? 'Bật âm thanh' : 'Âm thanh'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onImportFile();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 text-xs font-medium transition-all"
            title="Tải file tiến trình đã lưu từ máy"
          >
            <Upload className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Tải file lưu</span>
          </button>
        </div>
      </header>

      {/* Center Hero Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col items-center text-center my-auto">
        {/* Main Title */}
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-rpg mb-4 drop-shadow-md">
          HÀNH TRÌNH <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300">TRI THỨC</span>
        </h2>

        {/* Dedicated 2-Line Author Guide Banner (Replaces BOSS:...) */}
        <div className="flex flex-col items-center gap-1.5 mb-8 text-center max-w-2xl px-2 w-full">
          <div className="text-xs sm:text-sm md:text-base font-bold tracking-wider text-amber-300 font-rpg uppercase drop-shadow flex items-center justify-center gap-2 whitespace-nowrap overflow-x-auto w-full">
            <span className="hidden sm:inline w-6 sm:w-10 h-px bg-amber-500/40 shrink-0" />
            <span className="whitespace-nowrap">THẦY NGUYỄN TUẤN ANH VÀ CÔ TRƯƠNG ANH TOÀN</span>
            <span className="hidden sm:inline w-6 sm:w-10 h-px bg-amber-500/40 shrink-0" />
          </div>
          <div className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-widest text-purple-300 uppercase flex items-center justify-center gap-2">
            <span>NGƯỜI DẪN ĐƯỜNG TẬN TÂM CỦA BẠN</span>
          </div>
        </div>

        {/* Engaging Introductory Story */}
        <div className="max-w-2xl bg-slate-900/80 border border-purple-500/20 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-2xl mb-8 text-left">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Lời Hiệu Triệu Khởi Hành</span>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic mb-3">
            "Chào mừng lữ khách can trường! Cánh cổng Thời Không nối liền bốn vùng đất kỳ bí của Toán học đã chính thức khai mở. 
            Từ Thung Lũng Số Thực ngập tràn tinh thể vô tỉ, Đảo Góc lơ lửng giữa biển mây, đến Đầm Lầy Tỉ Lệ ma thuật và Thị Trấn Đa Thức linh thiêng..."
          </p>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Mỗi bài toán là một câu chú, mỗi lựa chọn Thẻ Ánh Sáng hay Bóng Tối là một quyết định sinh tử. 
            Hãy tôi luyện bản lĩnh, tích lũy EXP, săn tìm bảo vật và cùng vượt qua thử thách để chinh phục đỉnh cao trí tuệ!
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          {hasExistingSave && (
            <button
              onClick={() => {
                sound.playClick();
                onContinue();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-lg shadow-emerald-900/40 hover:shadow-emerald-700/50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Shield className="w-5 h-5" />
              <span>TIẾP TỤC HÀNH TRÌNH</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playClick();
              onStart();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-600 text-white font-bold text-base shadow-xl shadow-purple-900/40 hover:shadow-purple-700/60 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-purple-400/30"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>BẮT ĐẦU HÀNH TRÌNH →</span>
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Tri thức mở ra con đường · Bản lĩnh quyết định hành trình
        </p>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 py-4 px-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
        <p>© 2026 Hành Trình Tri Thức · DẪN LỐI THÀNH CÔNG</p>
      </footer>
    </div>
  );
};
