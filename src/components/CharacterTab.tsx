/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CharacterData } from '../types/game';
import { SYSTEM_TITLES, calculateLevelFromExp } from '../data/titles';
import { ACTIVE_ITEMS, PASSIVE_ITEMS } from '../data/items';
import { Shield, Sparkles, Sun, Heart, Coins, Award, Plus, Check, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface CharacterTabProps {
  character: CharacterData;
  onUpdateCustomTitle: (newTitle: string) => void;
  onAddNewCustomTitle: (newTitle: string) => void;
  onSelectCustomTitle: (title: string) => void;
}

export const CharacterTab: React.FC<CharacterTabProps> = ({
  character,
  onUpdateCustomTitle,
  onAddNewCustomTitle,
  onSelectCustomTitle,
}) => {
  const { profile, stats, titles, inventory, journey } = character;
  const { title: systemTitle, nextExp } = calculateLevelFromExp(stats.exp);

  const [newTitleInput, setNewTitleInput] = useState('');
  const [isAddingTitle, setIsAddingTitle] = useState(false);

  const sealCount = inventory.activeItems['freedom_seal'] || 0;
  const customList = titles.customTitlesList || (titles.customTitle ? [titles.customTitle] : []);

  const handleCreateNewTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleInput.trim() || sealCount <= 0) return;
    sound.playLevelUp();
    onAddNewCustomTitle(newTitleInput.trim());
    setNewTitleInput('');
    setIsAddingTitle(false);
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6 pb-28 md:pb-12">
      {/* Top Profile Summary Card */}
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: Avatar & Hero Emblem */}
        <div className="md:col-span-4 flex flex-col items-center text-center">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-950 border-4 border-purple-500/40 flex items-center justify-center text-purple-300 shadow-2xl shadow-purple-950/60 mb-4 relative">
            {profile.heroClass === 'knight' && <Shield className="w-16 h-16 text-blue-400" />}
            {profile.heroClass === 'mage' && <Sparkles className="w-16 h-16 text-purple-400" />}
            {profile.heroClass === 'light_monk' && <Sun className="w-16 h-16 text-amber-400" />}

            <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs border border-purple-400 shadow-md">
              CẤP {stats.level}
            </div>
          </div>

          <h3 className="text-2xl font-black font-rpg text-white">{profile.name}</h3>
          <p className="text-xs text-slate-400 mt-1">
            {profile.classGroup} · {
              profile.heroClass === 'knight' ? 'Hiệp sĩ (Sức bền & HP)' :
              profile.heroClass === 'mage' ? 'Pháp sư (Ma thuật & Thời gian)' : 'Tu sĩ Ánh Sáng'
            }
          </p>

          {/* Title Badges */}
          <div className="mt-4 flex flex-col items-center gap-1.5 w-full">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{systemTitle}</span>
            </div>

            {/* Currently Equipped Custom Title */}
            {titles.customTitle && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs font-semibold mt-1">
                <span>Danh hiệu đang mang: <strong className="text-white">{titles.customTitle}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Key Stats Overview */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Sinh Lực HP</span>
            <div className="flex items-center justify-center gap-1.5 text-xl font-bold text-rose-400">
              <Heart className="w-5 h-5 fill-current" />
              <span>{stats.hp} / {stats.maxHp}</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">
              {profile.heroClass === 'knight' ? '+2 Max HP/cấp' : '+1 Max HP/cấp'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Kinh Nghiệm EXP</span>
            <div className="flex items-center justify-center gap-1.5 text-xl font-bold text-teal-300">
              <Sparkles className="w-5 h-5" />
              <span>{stats.exp}</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">
              Mốc tiếp: {nextExp} EXP
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Tài Khố Vàng</span>
            <div className="flex items-center justify-center gap-1.5 text-xl font-bold text-amber-300">
              <Coins className="w-5 h-5" />
              <span>{stats.gold.toLocaleString()}</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">
              Thương vụ & phần thưởng
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Tiến Trình Đã Vượt</span>
            <div className="flex items-center justify-center gap-1.5 text-xl font-bold text-purple-300">
              <Layers className="w-5 h-5" />
              <span>{journey.completedStages.length} / 40</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">
              Tổng 4 chương
            </span>
          </div>
        </div>
      </div>

      {/* Custom Titles Management Panel (Ấn Danh Tự Tại) */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-7 backdrop-blur-md shadow-xl mb-8">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h4 className="text-base font-bold font-rpg text-white uppercase tracking-wider">
              BỘ SƯU TẬP DANH HIỆU RIÊNG (ẤN DANH TỰ TẠI)
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-semibold">
              Ấn Danh sở hữu: {sealCount}
            </span>
            {sealCount > 0 && !isAddingTitle && (
              <button
                onClick={() => setIsAddingTitle(true)}
                className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tạo Danh Hiệu Mới</span>
              </button>
            )}
          </div>
        </div>

        {/* Add Title Form */}
        {isAddingTitle && (
          <form onSubmit={handleCreateNewTitle} className="mb-4 p-4 rounded-xl bg-slate-950/80 border border-amber-500/40 animate-in fade-in">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Nhập danh hiệu mới bạn muốn tạo (Sẽ tiêu hao 1 Ấn Danh Tự Tại):
            </label>
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <input
                type="text"
                required
                maxLength={30}
                value={newTitleInput}
                onChange={(e) => setNewTitleInput(e.target.value)}
                placeholder="Ví dụ: Đại Hiệp Đại Số, Khắc Tinh Căn Bậc Hai..."
                className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Xác Nhận Tạo
              </button>
              <button
                type="button"
                onClick={() => setIsAddingTitle(false)}
                className="px-3 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-medium"
              >
                Hủy
              </button>
            </div>
          </form>
        )}

        {/* List of Custom Titles */}
        {customList.length > 0 ? (
          <div>
            <p className="text-xs text-slate-400 mb-3">
              Nhấp vào một danh hiệu để gắn lên nhân vật của bạn:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {customList.map((t, idx) => {
                const isEquipped = titles.customTitle === t;
                return (
                  <button
                    key={`${t}-${idx}`}
                    onClick={() => {
                      sound.playClick();
                      onSelectCustomTitle(t);
                    }}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      isEquipped
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 border-amber-300 text-slate-950 shadow-md shadow-amber-950/40'
                        : 'bg-slate-950/80 border-slate-700 text-slate-200 hover:border-purple-400'
                    }`}
                  >
                    <span>{t}</span>
                    {isEquipped && <CheckCircle2 className="w-4 h-4 fill-slate-950 text-amber-300" />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 leading-relaxed">
            Bạn chưa có danh hiệu riêng nào. Hãy ghé <strong>Thương Hội Tri Thức</strong> mua <strong>Ấn Danh Tự Tại (500 Vàng)</strong> để tự do đặt và chuyển đổi nhiều danh hiệu độc lập theo ý muốn!
          </p>
        )}
      </div>

      {/* Grid: Inventory Assets & Titles Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Inventory Stash */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Items */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h4 className="text-sm font-bold font-rpg text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Túi Vật Phẩm Chủ Động</span>
            </h4>

            <div className="space-y-3">
              {ACTIVE_ITEMS.map(item => {
                const count = inventory.activeItems[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div>
                      <h5 className="font-bold text-xs text-slate-200">{item.name}</h5>
                      <p className="text-[11px] text-slate-400">{item.description}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 font-mono font-bold shrink-0">
                      x{count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Passive Artifacts */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h4 className="text-sm font-bold font-rpg text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Cổ Vật Bị Động Đã Kích Hoạt</span>
            </h4>

            <div className="space-y-3">
              {PASSIVE_ITEMS.map(item => {
                const isOwned = Boolean(inventory.passiveItems[item.id]);
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border flex items-center justify-between ${
                      isOwned
                        ? 'bg-slate-950/80 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div>
                      <h5 className="font-bold text-xs text-white">{item.name}</h5>
                      <p className="text-[11px] text-slate-400">{item.effectDescription}</p>
                    </div>
                    {isOwned ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 shrink-0">
                        <Check className="w-3.5 h-3.5" /> Kích hoạt
                      </span>
                    ) : (
                      <span className="text-xs text-slate-600 shrink-0">Chưa có</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Titles Progression Roadmap */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h4 className="text-sm font-bold font-rpg text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Hệ Thống 12 Bậc Danh Hiệu Tri Thức</span>
          </h4>

          <div className="space-y-2.5">
            {SYSTEM_TITLES.map(titleObj => {
              const isUnlocked = stats.level >= titleObj.level;
              const isCurrent = stats.level === titleObj.level;

              return (
                <div
                  key={titleObj.level}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'bg-purple-900/40 border-amber-400 shadow-md text-white'
                      : isUnlocked
                      ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                      : 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg text-xs font-bold font-mono flex items-center justify-center ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950'
                        : isUnlocked
                        ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                        : 'bg-slate-900 text-slate-600'
                    }`}>
                      {titleObj.level}
                    </span>

                    <div>
                      <h5 className="font-bold text-sm text-slate-100">{titleObj.title}</h5>
                      <span className="text-[10px] text-slate-400">Yêu cầu: {titleObj.minExp} EXP</span>
                    </div>
                  </div>

                  {isCurrent && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 font-bold">
                      Hiện Tại
                    </span>
                  )}
                  {isUnlocked && !isCurrent && (
                    <Check className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
