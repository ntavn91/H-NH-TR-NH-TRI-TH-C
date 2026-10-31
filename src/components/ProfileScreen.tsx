/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CharacterData, HeroClass } from '../types/game';
import { Shield, Sparkles, Sun, ArrowLeft, UserPlus, Play, AlertTriangle, RotateCcw, Download, Upload, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { HERO_PORTRAITS } from '../utils/heroAssets';

interface ProfileScreenProps {
  activeCharacter: CharacterData | null;
  backupCharacter: CharacterData | null;
  onSelectContinue: () => void;
  onCreateNew: (name: string, classGroup: string, heroClass: HeroClass) => void;
  onRestoreBackup: () => void;
  onBackToTitle: () => void;
  onExportSave: () => void;
  onImportFile: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  activeCharacter,
  backupCharacter,
  onSelectContinue,
  onCreateNew,
  onRestoreBackup,
  onBackToTitle,
  onExportSave,
  onImportFile,
}) => {
  const [mode, setMode] = useState<'SELECT' | 'FORM'>('SELECT');
  const [name, setName] = useState('');
  const [classGroup, setClassGroup] = useState('Lớp 7A1');
  const [selectedClass, setSelectedClass] = useState<HeroClass>('knight');
  const [showReplaceWarning, setShowReplaceWarning] = useState(false);

  const canContinue = activeCharacter && activeCharacter.stats.hp > 0;
  const isDead = activeCharacter && activeCharacter.stats.hp <= 0;

  const handleStartCreateForm = () => {
    sound.playClick();
    if (activeCharacter) {
      setShowReplaceWarning(true);
    } else {
      setMode('FORM');
    }
  };

  const handleConfirmReplace = () => {
    sound.playClick();
    setShowReplaceWarning(false);
    setMode('FORM');
  };

  const handleSubmitNewCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    sound.playLevelUp();
    onCreateNew(name.trim(), classGroup.trim(), selectedClass);
  };

  return (
    <div className="min-h-screen w-full bg-[#101827] text-slate-100 flex flex-col justify-between py-6 px-4 sm:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <button
          onClick={() => {
            sound.playClick();
            if (mode === 'FORM') setMode('SELECT');
            else onBackToTitle();
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{mode === 'FORM' ? 'Quay lại' : 'Trang chủ'}</span>
        </button>

        <h2 className="text-xl font-bold font-rpg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-amber-200">
          QUẢN LÝ HÀNH TRÌNH
        </h2>

        <div className="flex items-center gap-2">
          {activeCharacter && (
            <button
              onClick={() => {
                sound.playClick();
                onExportSave();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-medium transition-all"
              title="Lưu file (.json) về máy tính"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lưu file máy</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playClick();
              onImportFile();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 border border-purple-500/30 text-xs font-medium transition-all"
            title="Tải file (.json) từ máy"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mở file</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto w-full my-auto">
        {mode === 'SELECT' ? (
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-rpg mb-2">
                CHỌN HÀNH TRÌNH CỦA BẠN
              </h3>
              <p className="text-slate-400 text-sm">
                Mỗi sự lựa chọn sẽ dẫn lối bạn qua các vùng đất toán học kỳ bí
              </p>
            </div>

            {/* Replacement Warning Modal */}
            {showReplaceWarning && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-[#1C293B] border border-amber-500/40 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95">
                  <div className="flex items-center gap-3 text-amber-400 mb-3">
                    <AlertTriangle className="w-6 h-6 shrink-0" />
                    <h4 className="font-bold text-lg text-white">XÁC NHẬN TẠO NHÂN VẬT MỚI</h4>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Thiết bị của bạn đang lưu hồ sơ của hiệp sĩ <strong className="text-amber-300">{activeCharacter?.profile.name}</strong> ({activeCharacter?.profile.classGroup}).
                  </p>
                  <p className="text-slate-400 text-xs mb-6 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    Khi tạo nhân vật mới, hồ sơ cũ sẽ tự động được chuyển thành <strong>bản lưu dự phòng</strong>. Bạn luôn có thể khôi phục lại khi cần hoặc lưu file dự phòng về máy.
                  </p>
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setShowReplaceWarning(false)}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      onClick={handleConfirmReplace}
                      className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold shadow-lg"
                    >
                      Tiếp tục tạo mới
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Card 1: Continue Existing Profile */}
              <div
                className={`rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                  canContinue
                    ? 'bg-slate-900/90 border-purple-500/40 shadow-xl shadow-purple-950/20'
                    : isDead
                    ? 'bg-slate-900/60 border-red-900/40 opacity-80'
                    : 'bg-slate-900/40 border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-purple-400">
                      HỒ SƠ HIỆN TẠI
                    </span>
                    {canContinue && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium">
                        Khả dụng
                      </span>
                    )}
                    {isDead && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 font-medium">
                        Đã hết HP
                      </span>
                    )}
                  </div>

                  {activeCharacter ? (
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-slate-950 border-2 border-purple-500/60 overflow-hidden shadow-lg relative group">
                          <img
                            src={HERO_PORTRAITS[activeCharacter.profile.heroClass]?.image}
                            alt={activeCharacter.profile.name}
                            className="w-full h-full object-cover animate-idle-breathe"
                          />
                          <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{activeCharacter.profile.name}</h4>
                          <p className="text-xs text-slate-400">
                            {activeCharacter.profile.classGroup} · {
                              activeCharacter.profile.heroClass === 'knight' ? 'Hiệp sĩ Thép Lam' :
                              activeCharacter.profile.heroClass === 'mage' ? 'Pháp sư Ma Trận' : 'Tu sĩ Ánh Sáng'
                            }
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center text-xs">
                        <div>
                          <span className="text-slate-400 block">Cấp độ</span>
                          <span className="text-white font-bold text-sm">{activeCharacter.stats.level}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Sinh lực HP</span>
                          <span className={`font-bold text-sm ${isDead ? 'text-red-400' : 'text-emerald-400'}`}>
                            {activeCharacter.stats.hp} / {activeCharacter.stats.maxHp}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Vàng</span>
                          <span className="text-amber-300 font-bold text-sm">{activeCharacter.stats.gold}</span>
                        </div>
                      </div>

                      {isDead && (
                        <p className="text-xs text-red-400 italic">
                          Nhân vật này đã hết HP trong trận chiến. Vui lòng tạo nhân vật mới để tiếp tục thám hiểm!
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-slate-500">
                      <p className="text-sm">Chưa có hành trình nào được lưu trên thiết bị này.</p>
                    </div>
                  )}
                </div>

                <button
                  disabled={!canContinue}
                  onClick={() => {
                    sound.playClick();
                    onSelectContinue();
                  }}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    canContinue
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/40 cursor-pointer active:scale-98'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>TIẾP TỤC HÀNH TRÌNH</span>
                </button>
              </div>

              {/* Card 2: Create New Character */}
              <div className="rounded-2xl p-6 bg-slate-900/90 border border-slate-700/80 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-teal-400">
                      HÀNH TRÌNH MỚI
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 font-medium">
                      Khởi tạo
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
                        <UserPlus className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">Khởi Tạo Nhân Vật</h4>
                        <p className="text-xs text-slate-400">
                          Bắt đầu một cuộc phiêu lưu mới từ Chương 1
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                      Lựa chọn giữa ba lớp nhân vật đặc trưng: <strong>Hiệp sĩ</strong> dồi dào sinh lực, <strong>Pháp sư</strong> làm chủ thời gian, hay <strong>Tu sĩ Ánh Sáng</strong> mở khóa nhiều thẻ trợ lực!
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleStartCreateForm}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-teal-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>TẠO NHÂN VẬT MỚI</span>
                </button>
              </div>
            </div>

            {/* Backup Character restore option if exists */}
            {backupCharacter && (
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-xs text-slate-400">Bản lưu dự phòng trước đó:</p>
                    <p className="text-sm font-semibold text-slate-200">
                      {backupCharacter.profile.name} ({backupCharacter.profile.classGroup}) · Cấp {backupCharacter.stats.level}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    onRestoreBackup();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-300 text-xs font-medium transition-all"
                >
                  Khôi phục bản này
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Create Character Form */
          <div className="max-w-2xl mx-auto bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <h3 className="text-2xl font-bold font-rpg text-white mb-2 text-center">
              THIẾT LẬP NHÂN VẬT MỚI
            </h3>
            <p className="text-xs text-slate-400 mb-6 text-center">
              Nhập thông tin danh xưng và lựa chọn lớp nhân vật đồng hành
            </p>

            <form onSubmit={handleSubmitNewCharacter} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Tên nhân vật / Học sinh
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: Minh Tuấn"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Lớp học
                  </label>
                  <input
                    type="text"
                    required
                    value={classGroup}
                    onChange={(e) => setClassGroup(e.target.value)}
                    placeholder="Ví dụ: Lớp 7A1"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Class Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                  Chọn Lớp Nhân Vật
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Knight */}
                  <div
                    onClick={() => {
                      sound.playCardFlip();
                      setSelectedClass('knight');
                    }}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all text-left relative overflow-hidden group ${
                      selectedClass === 'knight'
                        ? 'bg-blue-950/60 border-cyan-400 shadow-xl shadow-cyan-950/60'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {selectedClass === 'knight' && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-300 absolute top-3 right-3 z-20" />
                    )}
                    <div className="w-full h-32 rounded-xl overflow-hidden mb-3 border border-cyan-500/30 bg-slate-900 relative">
                      <img
                        src={HERO_PORTRAITS.knight.image}
                        alt="Hiệp sĩ Thép Lam"
                        className="w-full h-full object-cover animate-idle-breathe"
                      />
                      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                    </div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      <h5 className="font-bold text-sm text-white">Hiệp sĩ Thép Lam</h5>
                    </div>
                    <p className="text-xs text-cyan-300/80 mb-2">Sức bền & Phòng vệ</p>
                    <ul className="text-[11px] text-slate-400 space-y-1">
                      <li>• HP ban đầu: 2/2</li>
                      <li>• <strong>+2 Max HP</strong> mỗi cấp</li>
                      <li>• 20s đếm ngược</li>
                      <li className="text-amber-300 font-semibold">• <strong>Giảm 50%</strong> Túi Vàng</li>
                    </ul>
                  </div>

                  {/* Mage */}
                  <div
                    onClick={() => {
                      sound.playCardFlip();
                      setSelectedClass('mage');
                    }}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all text-left relative overflow-hidden group ${
                      selectedClass === 'mage'
                        ? 'bg-purple-950/60 border-purple-400 shadow-xl shadow-purple-950/60'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {selectedClass === 'mage' && (
                      <CheckCircle2 className="w-5 h-5 text-purple-300 absolute top-3 right-3 z-20" />
                    )}
                    <div className="w-full h-32 rounded-xl overflow-hidden mb-3 border border-purple-500/30 bg-slate-900 relative">
                      <img
                        src={HERO_PORTRAITS.mage.image}
                        alt="Pháp sư Ma Trận"
                        className="w-full h-full object-cover animate-idle-breathe"
                      />
                      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                    </div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <h5 className="font-bold text-sm text-white">Pháp sư Ma Trận</h5>
                    </div>
                    <p className="text-xs text-purple-300/80 mb-2">Thời gian & Trí tuệ</p>
                    <ul className="text-[11px] text-slate-400 space-y-1">
                      <li>• HP ban đầu: 2/2</li>
                      <li>• +1 Max HP mỗi cấp</li>
                      <li>• <strong>30s đếm ngược</strong> (Dài nhất)</li>
                      <li className="text-cyan-300 font-semibold">• <strong>Giảm 50%</strong> Đồng Hồ</li>
                    </ul>
                  </div>

                  {/* Light Monk */}
                  <div
                    onClick={() => {
                      sound.playCardFlip();
                      setSelectedClass('light_monk');
                    }}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all text-left relative overflow-hidden group ${
                      selectedClass === 'light_monk'
                        ? 'bg-amber-950/60 border-amber-400 shadow-xl shadow-amber-950/60'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {selectedClass === 'light_monk' && (
                      <CheckCircle2 className="w-5 h-5 text-amber-300 absolute top-3 right-3 z-20" />
                    )}
                    <div className="w-full h-32 rounded-xl overflow-hidden mb-3 border border-amber-500/30 bg-slate-900 relative">
                      <img
                        src={HERO_PORTRAITS.light_monk.image}
                        alt="Tu sĩ Ánh Sáng"
                        className="w-full h-full object-cover animate-idle-breathe"
                      />
                      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                    </div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <h5 className="font-bold text-sm text-white">Tu sĩ Ánh Sáng</h5>
                    </div>
                    <p className="text-xs text-amber-300/80 mb-2">Thái Dương & Vận Mệnh</p>
                    <ul className="text-[11px] text-slate-400 space-y-1">
                      <li>• HP ban đầu: 2/2</li>
                      <li>• +1 Max HP mỗi cấp</li>
                      <li>• <strong>3 thẻ lựa chọn</strong></li>
                      <li className="text-amber-300 font-semibold">• <strong>Giảm 50%</strong> Cổ Thư</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setMode('SELECT')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-purple-900/40 cursor-pointer active:scale-95"
                >
                  Xác nhận & Khởi hành →
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-600 pt-6">
        Hành Trình Tri Thức · Dữ liệu được bảo toàn tự động trên thiết bị của bạn
      </footer>
    </div>
  );
};
