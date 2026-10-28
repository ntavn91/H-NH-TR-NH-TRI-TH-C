/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CharacterData } from '../types/game';
import { Shield, Sparkles, Sun, Heart, Coins, Map, ShoppingBag, User, Volume2, VolumeX, Download, ArrowLeftCircle } from 'lucide-react';
import { sound } from '../utils/sound';
import { calculateLevelFromExp } from '../data/titles';

interface TopHUDProps {
  character: CharacterData;
  activeTab: 'map' | 'shop' | 'character';
  onSelectTab: (tab: 'map' | 'shop' | 'character') => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onExportSave: () => void;
  onSwitchProfile: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  character,
  activeTab,
  onSelectTab,
  isMuted,
  onToggleMute,
  onExportSave,
  onSwitchProfile,
}) => {
  const { profile, stats, titles } = character;
  const { title: currentSystemTitle, nextExp, currentLevelExp } = calculateLevelFromExp(stats.exp);

  const expProgressPercent = Math.min(
    100,
    Math.max(0, ((stats.exp - currentLevelExp) / (nextExp - currentLevelExp || 1)) * 100)
  );

  const hpPercent = Math.min(100, Math.max(0, (stats.hp / stats.maxHp) * 100));

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1C293B]/95 backdrop-blur-md border-b border-slate-700/80 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Avatar, Name, Level, Title */}
        <div className="flex items-center gap-3">
          {/* Class Portrait / Icon */}
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
          <div className="flex flex-col min-w-[110px] sm:min-w-[130px]">
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
          <div className="flex flex-col min-w-[110px] sm:min-w-[130px]">
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
          </div>

          {/* Quick Utility Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                sound.playClick();
                onToggleMute();
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onExportSave();
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 hover:text-amber-200 hover:bg-slate-800 transition-all cursor-pointer"
              title="Lưu file (.json) về máy tính"
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
    </header>
  );
};
