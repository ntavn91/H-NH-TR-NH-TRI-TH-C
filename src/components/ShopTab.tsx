/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CharacterData, ItemDefinition } from '../types/game';
import { ACTIVE_ITEMS, PASSIVE_ITEMS } from '../data/items';
import { Coins, Shield, Sparkles, Feather, Hourglass, Scroll, Heart, Clock, BookOpen, Award, Check, ShoppingBag } from 'lucide-react';
import { sound } from '../utils/sound';

interface ShopTabProps {
  character: CharacterData;
  onBuyItem: (item: ItemDefinition) => void;
}

export const ShopTab: React.FC<ShopTabProps> = ({ character, onBuyItem }) => {
  const [activeCategory, setActiveCategory] = useState<'active' | 'passive'>('active');

  const itemsList = activeCategory === 'active' ? ACTIVE_ITEMS : PASSIVE_ITEMS;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scroll':
        return <Scroll className="w-7 h-7 text-amber-400" />;
      case 'Shield':
        return <Shield className="w-7 h-7 text-blue-400" />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-purple-400" />;
      case 'Feather':
        return <Feather className="w-7 h-7 text-rose-400" />;
      case 'Heart':
        return <Heart className="w-7 h-7 text-red-400" />;
      case 'Hourglass':
        return <Hourglass className="w-7 h-7 text-teal-400" />;
      case 'Clock':
        return <Clock className="w-7 h-7 text-cyan-400" />;
      case 'BookOpen':
        return <BookOpen className="w-7 h-7 text-indigo-400" />;
      case 'Coins':
        return <Coins className="w-7 h-7 text-amber-400" />;
      case 'Award':
        return <Award className="w-7 h-7 text-yellow-400" />;
      default:
        return <Sparkles className="w-7 h-7 text-purple-400" />;
    }
  };

  const handleBuy = (item: ItemDefinition) => {
    if (character.stats.gold < item.price) {
      sound.playWrong();
      return;
    }
    if (item.category === 'passive' && character.inventory.passiveItems[item.id]) {
      sound.playWrong();
      return;
    }
    sound.playBuyItem();
    onBuyItem(item);
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6 pb-28 md:pb-12">
      {/* Shop Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShoppingBag className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-black font-rpg text-white tracking-wide">
              THƯƠNG HỘI TRI THỨC
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Trang bị pháp bảo và cổ thư cổ đại để tăng cơ hội vượt qua các ải toán hiểm hóc
          </p>
        </div>

        {/* Current Gold Reserve */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-amber-500/40 text-amber-300 font-bold text-base shadow-inner">
          <Coins className="w-5 h-5 text-amber-400 fill-amber-500/30" />
          <span className="font-mono tabular-nums">{character.stats.gold.toLocaleString()} Vàng</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-8 p-1 bg-slate-900 rounded-2xl max-w-sm border border-slate-800">
        <button
          onClick={() => {
            sound.playClick();
            setActiveCategory('active');
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'active'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Vật Phẩm Chủ Động
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveCategory('passive');
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'passive'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Vật Phẩm Bị Động
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itemsList.map(item => {
          const isPassiveOwned = item.category === 'passive' && character.inventory.passiveItems[item.id];
          const activeCount = character.inventory.activeItems[item.id] || 0;
          const canAfford = character.stats.gold >= item.price;

          return (
            <div
              key={item.id}
              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                isPassiveOwned
                  ? 'bg-slate-900/40 border-emerald-500/30 opacity-80'
                  : 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50 shadow-xl'
              }`}
            >
              <div>
                {/* Top Badge & Owned Count */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-700/80 flex items-center justify-center shadow-inner">
                    {renderIcon(item.icon)}
                  </div>

                  {item.category === 'passive' ? (
                    isPassiveOwned ? (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Đã Sở Hữu
                      </span>
                    ) : (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                        Hiệu ứng vĩnh viễn
                      </span>
                    )
                  ) : (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                      Đang có: {activeCount}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-1 font-rpg">{item.name}</h3>
                <p className="text-xs text-purple-300/90 mb-3">{item.description}</p>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 leading-relaxed mb-6">
                  {item.effectDescription}
                </div>
              </div>

              {/* Purchase Button */}
              <button
                disabled={isPassiveOwned || !canAfford}
                onClick={() => handleBuy(item)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isPassiveOwned
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                    : !canAfford
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-950/40 cursor-pointer active:scale-95'
                }`}
              >
                {isPassiveOwned ? (
                  <span>ĐÃ KÍCH HOẠT VĨNH VIỄN</span>
                ) : (
                  <>
                    <Coins className="w-4 h-4 fill-current" />
                    <span>MUA ({item.price} Vàng)</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
