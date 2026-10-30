/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CharacterData } from '../types/game';
import {
  Shield,
  Sparkles,
  Sun,
  Heart,
  Coins,
  Map,
  ShoppingBag,
  User,
  Volume2,
  VolumeX,
  Download,
  ArrowLeftCircle,
  Trophy,
  Sliders,
} from 'lucide-react';
import { sound } from '../utils/sound';
import { calculateLevelFromExp } from '../data/titles';

interface TopHUDProps {
  character: CharacterData;
  activeTab: 'map' | 'shop' | 'character' | 'leaderboard';
  onSelectTab: (tab: 'map' | 'shop' | 'character' | 'leaderboard') => void;
  isMuted: boolean;
  onToggleMute: () => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  onExportSave: () => void;
  onSwitchProfile: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  character,
  activeTab,
  onSelectTab,
  isMuted,
  onToggleMute,
  volume,
  onVolumeChange,
  onExportSave,
  onSwitchProfile,
}) => {
  const { profile, stats, titles } = character;
  const { title: currentSystemTitle, nextExp, currentLevelExp } = calculateLevelFromExp(stats.exp);

  const [showVolumePopup, setShowVolumePopup] = useState(false);

  const expProgressPercent = Math.min(
    100,
    Math.max(0, ((stats.exp - currentLevelExp) / (nextExp - currentLevelExp || 1)) * 100)
  );

  const hpPercent = Math.min(100, Math.max(0, (stats.hp / stats.maxHp) * 100));

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#1C293B]/95 backdrop-blur-md border-b border-slate-700/80 shadow-xl transition-all">
        {/* DESKTOP VIEW (md and up) */}
        <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 py-3 items-center justify-between gap-4">
          {/* Left: Avatar, Name, Level, Title */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border-2 border-purple-500/50 flex items-center justify-center text-purple-300 shadow-md overflow-hidden">
                {profile.heroClass === 'knight' && <Shield className="w-6 h-6 text-blue-400" />}
                {profile.heroClass === 'mage' && <Sparkles className="w-6 h-6 text-purple-400" />}
                {profile.heroClass === 'light_monk' && <Sun className="w-6 h-6 text-amber-400" />}
              </div>
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-purple-700 border border-purple-400 text-[10px] font-black text-white shadow">
                Lv.{stats.level}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">{profile.name}</h3>
                <span className="text-xs px-2 py-0.2 rounded bg-slate-800 text-slate-400 font-medium border border-slate-700">
                  {profile.classGroup}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium">
                <span>{titles.customTitle ? titles.customTitle : currentSystemTitle}</span>
              </div>
            </div>
          </div>

          {/* Center: HP, EXP, Gold Meters */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* HP Bar */}
            <div className="flex flex-col min-w-[120px]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1 text-red-400 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  HP
                </span>
                <span className="font-mono text-slate-200 font-semibold tabular-nums text-[11px]">
                  {stats.hp}/{stats.maxHp}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-300"
                  style={{ width: `${hpPercent}%` }}
                />
              </div>
            </div>

            {/* EXP Bar */}
            <div className="flex flex-col min-w-[120px]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1 text-teal-400 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  EXP
                </span>
                <span className="font-mono text-slate-200 font-semibold tabular-nums text-[11px]">
                  {stats.exp}/{nextExp}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${expProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Gold Coin */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 font-bold text-sm shadow-inner">
              <Coins className="w-4 h-4 text-amber-400 fill-amber-500/20" />
              <span className="font-mono tabular-nums">{stats.gold.toLocaleString()}</span>
            </div>
          </div>

          {/* Right: Navigation Tabs & Actions */}
          <div className="flex items-center gap-2">
            {/* Navigation Segments */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-700/60">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab('map');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'map'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Bản Đồ</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab('shop');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'shop'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Thương Hội</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab('character');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'character'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Nhân Vật</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab('leaderboard');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'leaderboard'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Bảng Xếp Hạng</span>
              </button>
            </div>

            {/* Quick Utility Buttons */}
            <div className="flex items-center gap-1 relative">
              {/* Volume Slider Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowVolumePopup(!showVolumePopup)}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                  title="Chỉnh âm lượng"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-teal-400" />
                  )}
                </button>

                {showVolumePopup && (
                  <div className="absolute right-0 top-12 w-48 p-3 rounded-2xl bg-[#1C293B] border border-slate-700 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                      <span>Âm lượng</span>
                      <span className="text-teal-400 font-mono">{Math.round(volume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400 mb-2"
                    />
                    <button
                      onClick={onToggleMute}
                      className="w-full py-1 rounded-lg text-center text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
                    >
                      {isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onExportSave();
                }}
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 hover:text-amber-200 hover:bg-slate-800 transition-all cursor-pointer"
                title="Lưu file (.json) về máy"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSwitchProfile();
                }}
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-all cursor-pointer"
                title="Đổi nhân vật / Về quản lý hồ sơ"
              >
                <ArrowLeftCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW (phones under 768px) */}
        <div className="md:hidden px-3 py-2.5">
          <div className="flex items-center justify-between gap-2">
            {/* Hero Minimal Header */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-purple-500/60 flex items-center justify-center text-purple-300 shadow">
                  {profile.heroClass === 'knight' && <Shield className="w-4 h-4 text-blue-400" />}
                  {profile.heroClass === 'mage' && <Sparkles className="w-4 h-4 text-purple-400" />}
                  {profile.heroClass === 'light_monk' && <Sun className="w-4 h-4 text-amber-400" />}
                </div>
                <div className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded-full bg-purple-700 text-[8px] font-black text-white">
                  {stats.level}
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="text-xs font-bold text-white truncate max-w-[95px]">
                  {profile.name}
                </h3>
                <span className="text-[10px] text-amber-300 font-medium block truncate max-w-[95px]">
                  {titles.customTitle || currentSystemTitle}
                </span>
              </div>
            </div>

            {/* Meters: Compact HP & Gold */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* HP Pill */}
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 border border-red-500/30 text-red-400 text-xs font-bold">
                <Heart className="w-3 h-3 fill-current" />
                <span className="font-mono text-[11px]">{stats.hp}/{stats.maxHp}</span>
              </div>

              {/* Gold Pill */}
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Coins className="w-3 h-3 fill-amber-400/30" />
                <span className="font-mono text-[11px]">{stats.gold.toLocaleString()}</span>
              </div>
            </div>

            {/* Mobile Actions: Volume, Exit */}
            <div className="flex items-center gap-1 shrink-0">

              <button
                onClick={() => {
                  sound.playClick();
                  onToggleMute();
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300"
                title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-red-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-teal-400" />
                )}
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSwitchProfile();
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400"
                title="Đổi nhân vật"
              >
                <ArrowLeftCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Thin EXP Progress Bar underneath mobile header */}
          <div className="w-full h-1 rounded-full bg-slate-900 overflow-hidden mt-2 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-300"
              style={{ width: `${expProgressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR (Phones only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#1C293B]/95 backdrop-blur-xl border-t border-slate-700/80 md:hidden flex items-center justify-around py-2 px-3 shadow-2xl">
        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('map');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'map'
              ? 'text-purple-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px]">Bản Đồ</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('shop');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'shop'
              ? 'text-purple-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px]">Thương Hội</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('character');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'character'
              ? 'text-purple-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Nhân Vật</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('leaderboard');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'text-amber-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-5 h-5 text-amber-400" />
          <span className="text-[10px]">Xếp Hạng</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onExportSave();
          }}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-amber-400 hover:text-amber-300 transition-all cursor-pointer"
          title="Lưu tiến trình file .json"
        >
          <Download className="w-5 h-5" />
          <span className="text-[10px]">Lưu Máy</span>
        </button>
      </nav>
    </>
  );
};
