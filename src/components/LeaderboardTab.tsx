/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CharacterData, HeroClass } from '../types/game';
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Sparkles,
  Coins,
  Shield,
  Sun,
  CheckCircle2,
  Download,
  Upload,
  UserCheck,
  Star,
  Swords,
  ChevronRight,
} from 'lucide-react';
import { sound } from '../utils/sound';
import { calculateLevelFromExp } from '../data/titles';

interface LeaderboardTabProps {
  characters: Record<string, CharacterData>;
  activeCharacterId: string | null;
  onSelectCharacter: (charId: string) => void;
  onExportSave: () => void;
  onImportFile: () => void;
}

export const LeaderboardTab: React.FC<LeaderboardTabProps> = ({
  characters,
  activeCharacterId,
  onSelectCharacter,
  onExportSave,
  onImportFile,
}) => {
  // Extract all characters and sort by Level (desc), Exp (desc), Completed Stages (desc), Gold (desc)
  const sortedCharacters = Object.values(characters).sort((a, b) => {
    if (b.stats.level !== a.stats.level) {
      return b.stats.level - a.stats.level;
    }
    if (b.stats.exp !== a.stats.exp) {
      return b.stats.exp - a.stats.exp;
    }
    const aStages = a.journey?.completedStages?.length || 0;
    const bStages = b.journey?.completedStages?.length || 0;
    if (bStages !== aStages) {
      return bStages - aStages;
    }
    return b.stats.gold - a.stats.gold;
  });

  const activeIndex = sortedCharacters.findIndex(
    (c) => c.profile.characterId === activeCharacterId
  );
  const myRank = activeIndex >= 0 ? activeIndex + 1 : '-';

  const getHeroClassName = (heroClass: HeroClass) => {
    switch (heroClass) {
      case 'knight':
        return 'Hiệp Sĩ Quả Cảm';
      case 'mage':
        return 'Pháp Sư Thông Thái';
      case 'light_monk':
        return 'Tu Sĩ Ánh Sáng';
      default:
        return 'Hiệp Sĩ Tri Thức';
    }
  };

  const renderHeroIcon = (heroClass: HeroClass, sizeClass: string = 'w-6 h-6') => {
    switch (heroClass) {
      case 'knight':
        return <Shield className={`${sizeClass} text-blue-400`} />;
      case 'mage':
        return <Sparkles className={`${sizeClass} text-purple-400`} />;
      case 'light_monk':
        return <Sun className={`${sizeClass} text-amber-400`} />;
      default:
        return <Shield className={`${sizeClass} text-blue-400`} />;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center font-black text-lg shadow-lg shadow-amber-500/30 border border-yellow-200">
          <Crown className="w-5 h-5 fill-current" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 text-slate-900 flex items-center justify-center font-black text-lg shadow-lg shadow-slate-400/20 border border-slate-100">
          <Medal className="w-5 h-5 fill-current" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-amber-100 flex items-center justify-center font-black text-lg shadow-lg shadow-amber-800/30 border border-amber-500/50">
          <Award className="w-5 h-5 fill-current" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700 text-slate-400 flex items-center justify-center font-black text-sm font-mono">
        #{rank}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6 pb-28 md:pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-rpg text-white tracking-wide">
              BẢNG VÀNG ANH HÙNG TRI THỨC
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Xếp hạng những bậc hiền tài có cấp độ, kinh nghiệm và chiến tích toán học cao nhất trong hành trình
          </p>
        </div>

        {/* Quick Save/Import sync tools */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onImportFile();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            title="Tải tệp tiến trình để so tài thành tích"
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Nhập File</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onExportSave();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            title="Lưu bảng thành tích ra file .json"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Xuất File</span>
          </button>
        </div>
      </div>

      {/* Top Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 shadow-lg">
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">Tổng Anh Hùng Đã Lưu</span>
            <span className="text-xl font-black text-white font-mono">{sortedCharacters.length}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 shadow-lg">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">Cấp Độ Quán Quân</span>
            <span className="text-xl font-black text-amber-400 font-mono">
              Cấp {sortedCharacters[0]?.stats.level || 1}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-purple-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-[11px] text-purple-300 uppercase tracking-wider block font-medium">Hạng Của Bạn</span>
            <span className="text-xl font-black text-white font-mono">
              {myRank !== '-' ? `#${myRank} / ${sortedCharacters.length}` : 'Chưa xếp hạng'}
            </span>
          </div>
        </div>
      </div>

      {/* Podium for Top 3 (if at least 2 characters) */}
      {sortedCharacters.length >= 2 && (
        <div className="mb-10 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Bục Vinh Quang Bậc Binh Vương <Sparkles className="w-4 h-4" />
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-6 pt-4">
            {/* Rank 2 (Silver) */}
            {sortedCharacters[1] && (
              <div className="w-full sm:w-1/3 flex flex-col items-center order-2 sm:order-1">
                <div className="relative mb-2">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-slate-300 p-1 flex items-center justify-center shadow-xl">
                    {renderHeroIcon(sortedCharacters[1].profile.heroClass, 'w-8 h-8')}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-300 text-slate-900 font-bold text-xs flex items-center justify-center shadow">
                    2
                  </div>
                </div>
                <h4 className="font-bold text-sm text-white truncate max-w-[140px] text-center font-rpg">
                  {sortedCharacters[1].profile.name}
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">
                  Cấp {sortedCharacters[1].stats.level} • {sortedCharacters[1].stats.exp.toLocaleString()} EXP
                </span>
                <div className="w-full mt-3 h-24 rounded-t-2xl bg-gradient-to-t from-slate-800/90 to-slate-700/60 border-t-2 border-slate-400 flex items-center justify-center">
                  <Medal className="w-8 h-8 text-slate-300" />
                </div>
              </div>
            )}

            {/* Rank 1 (Gold) */}
            {sortedCharacters[0] && (
              <div className="w-full sm:w-1/3 flex flex-col items-center order-1 sm:order-2">
                <div className="relative mb-2">
                  <div className="w-20 h-20 rounded-2xl bg-amber-950/60 border-2 border-amber-400 p-1.5 flex items-center justify-center shadow-2xl shadow-amber-500/20 ring-4 ring-amber-500/20">
                    {renderHeroIcon(sortedCharacters[0].profile.heroClass, 'w-10 h-10')}
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Crown className="w-6 h-6 text-amber-400 fill-amber-300 filter drop-shadow" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg">
                    1
                  </div>
                </div>
                <h4 className="font-black text-base text-amber-300 truncate max-w-[180px] text-center font-rpg">
                  {sortedCharacters[0].profile.name}
                </h4>
                <span className="text-xs text-amber-200/80 font-mono font-bold">
                  Cấp {sortedCharacters[0].stats.level} • {sortedCharacters[0].stats.exp.toLocaleString()} EXP
                </span>
                <div className="w-full mt-3 h-32 rounded-t-2xl bg-gradient-to-t from-amber-950/90 via-amber-900/60 to-amber-700/50 border-t-2 border-amber-400 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-amber-300" />
                </div>
              </div>
            )}

            {/* Rank 3 (Bronze) */}
            {sortedCharacters[2] && (
              <div className="w-full sm:w-1/3 flex flex-col items-center order-3 sm:order-3">
                <div className="relative mb-2">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-amber-700 p-1 flex items-center justify-center shadow-xl">
                    {renderHeroIcon(sortedCharacters[2].profile.heroClass, 'w-8 h-8')}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-700 text-amber-100 font-bold text-xs flex items-center justify-center shadow">
                    3
                  </div>
                </div>
                <h4 className="font-bold text-sm text-white truncate max-w-[140px] text-center font-rpg">
                  {sortedCharacters[2].profile.name}
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">
                  Cấp {sortedCharacters[2].stats.level} • {sortedCharacters[2].stats.exp.toLocaleString()} EXP
                </span>
                <div className="w-full mt-3 h-20 rounded-t-2xl bg-gradient-to-t from-amber-950/80 to-amber-900/50 border-t-2 border-amber-600 flex items-center justify-center">
                  <Award className="w-7 h-7 text-amber-500" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full Leaderboard Table / Cards */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white font-rpg">
              DANH SÁCH ANH HÙNG TRI THỨC ({sortedCharacters.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">Xếp theo Cấp độ & Kinh nghiệm</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {sortedCharacters.map((char, idx) => {
            const rank = idx + 1;
            const isCurrent = char.profile.characterId === activeCharacterId;
            const completedCount = char.journey?.completedStages?.length || 0;
            const { title: systemTitle } = calculateLevelFromExp(char.stats.exp);
            const displayTitle = char.titles?.customTitle || systemTitle;

            return (
              <div
                key={char.profile.characterId}
                className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                  isCurrent
                    ? 'bg-purple-950/30 border-l-4 border-l-purple-500'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                {/* Left: Rank + Avatar + Name & Titles */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  {/* Rank Badge */}
                  <div className="shrink-0">{getRankBadge(rank)}</div>

                  {/* Character Avatar Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                    {renderHeroIcon(char.profile.heroClass, 'w-6 h-6')}
                  </div>

                  {/* Name, Class, Titles */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm sm:text-base text-white truncate font-rpg">
                        {char.profile.name}
                      </h4>
                      {char.profile.classGroup && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                          {char.profile.classGroup}
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                          <UserCheck className="w-3 h-3" /> Đang chơi
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-purple-300/90 font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        {displayTitle}
                      </span>
                      <span className="text-slate-600 text-xs">•</span>
                      <span className="text-xs text-slate-400">
                        {getHeroClassName(char.profile.heroClass)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Stats & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-6 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  {/* Level & EXP */}
                  <div className="text-left md:text-right">
                    <div className="flex items-center md:justify-end gap-1.5">
                      <span className="text-xs font-bold text-slate-400 uppercase">Cấp</span>
                      <span className="text-base font-black text-teal-300 font-mono">
                        {char.stats.level}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono block">
                      {char.stats.exp.toLocaleString()} EXP
                    </span>
                  </div>

                  {/* Stages Completed */}
                  <div className="text-left md:text-right hidden sm:block">
                    <span className="text-[11px] text-slate-400 block">Ải đã vượt</span>
                    <span className="text-xs font-bold text-slate-200 font-mono">
                      {completedCount} / 40 Ải
                    </span>
                  </div>

                  {/* Gold Reserve */}
                  <div className="text-left md:text-right">
                    <span className="text-[11px] text-slate-400 block">Kho Vàng</span>
                    <span className="text-xs font-bold text-amber-300 font-mono flex items-center md:justify-end gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-400 fill-amber-500/30" />
                      {char.stats.gold.toLocaleString()}
                    </span>
                  </div>

                  {/* Switch to this character button if not currently active */}
                  <div>
                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-emerald-300 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Hiện tại
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          sound.playClick();
                          onSelectCharacter(char.profile.characterId);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                      >
                        <span>Chọn chơi</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Helpful Competitive Note */}
      <div className="mt-8 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-300/90 leading-relaxed flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-white mb-0.5">Lời nhắn từ Bậc Dẫn Đường:</p>
          <p>
            Mỗi khi bạn hoàn thành các thử thách toán học và nâng cao cấp độ, bảng vàng sẽ tự động ghi danh. Bạn có thể sử dụng nút <strong>"Xuất File"</strong> để lưu trữ hoặc gửi cho bạn bè cùng lớp đối chiếu, hoặc bấm <strong>"Nhập File"</strong> để gom chung dữ liệu so tài trên cùng thiết bị!
          </p>
        </div>
      </div>
    </div>
  );
};
