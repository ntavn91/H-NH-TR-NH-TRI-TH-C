/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, XCircle, Clock, Heart, Sparkles, Coins, Feather, ArrowRight, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/sound';

export type ResultType = 'correct' | 'wrong' | 'timeout' | 'skipped' | 'shield_saved' | 'parallel_correct' | 'parallel_wrong';

interface ResultModalProps {
  type: ResultType;
  expGained: number;
  goldGained: number;
  hpLost: number;
  canUseSecondChance: boolean;
  onUseSecondChance: () => void;
  onContinue: () => void;
  isGameOver: boolean;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  type,
  expGained,
  goldGained,
  hpLost,
  canUseSecondChance,
  onUseSecondChance,
  onContinue,
  isGameOver,
}) => {
  const isSuccess = type === 'correct' || type === 'parallel_correct';

  return (
    <div className="fixed inset-0 z-50 bg-[#101827]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1C293B] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center animate-in fade-in zoom-in-95">
        
        {/* Status Icon */}
        <div className="mb-4 flex justify-center">
          {isSuccess ? (
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>
          ) : type === 'shield_saved' ? (
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center text-blue-400 shadow-xl shadow-blue-500/20">
              <ShieldCheck className="w-9 h-9" />
            </div>
          ) : type === 'timeout' ? (
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/20">
              <Clock className="w-9 h-9" />
            </div>
          ) : type === 'skipped' ? (
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-slate-300 shadow-xl">
              <ArrowRight className="w-9 h-9" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-rose-500 shadow-xl shadow-rose-500/20">
              <XCircle className="w-9 h-9" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black font-rpg text-white mb-2">
          {type === 'correct'
            ? 'CHÍNH XÁC XUẤT SẮC!'
            : type === 'parallel_correct'
            ? 'GIẢI PHÓNG THẾ GIỚI SONG SONG!'
            : type === 'shield_saved'
            ? 'HỘ TÂM PHÙ BẢO VỆ!'
            : type === 'skipped'
            ? 'ĐÃ BỎ QUA ẢI NÀY'
            : type === 'timeout'
            ? 'HẾT THỜI GIAN ĐẾM NGƯỢC!'
            : 'CHƯA CHÍNH XÁC!'}
        </h3>

        {/* Message Notice */}
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          {type === 'correct'
            ? 'Năng lượng tri thức khai thông phong ấn. Bạn đã nhận được trọn vẹn phần thưởng ải đấu!'
            : type === 'parallel_correct'
            ? 'Câu hỏi sai trước đây đã được hóa giải hoàn toàn và gỡ bỏ khỏi danh sách Thế giới Song Song!'
            : type === 'shield_saved'
            ? 'Hộ Tâm Phù đã hấp thu toàn bộ phản phệ! Bạn không mất HP, được qua ải và câu hỏi không bị đưa sang Thế giới Song Song.'
            : type === 'skipped'
            ? 'Lệnh Bài Vượt Ải đã mở lối an toàn cho bạn tiến bước sang ải kế tiếp.'
            : type === 'timeout'
            ? 'Đồng hồ cát đã cạn (-1 HP). Bạn vẫn được tiếp tục qua ải kế tiếp, nhưng câu hỏi này đã được chuyển vào Thế Giới Song Song để phục thù sau này!'
            : 'Phép biến đổi chưa chuẩn xác (-1 HP). Bạn vẫn được qua ải để tiếp tục hành trình, câu hỏi này đã được chuyển vào Thế Giới Song Song để giải phóng sau khi hạ Trùm!'}
        </p>

        {/* Rewards / Penalties Breakdown */}
        <div className="grid grid-cols-3 gap-2 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 text-center mb-6">
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">Sinh lực HP</span>
            <div className="flex items-center justify-center gap-1 font-bold text-sm">
              <Heart className={`w-3.5 h-3.5 fill-current ${hpLost > 0 ? 'text-rose-500' : 'text-emerald-400'}`} />
              <span className={hpLost > 0 ? 'text-rose-400' : 'text-emerald-400'}>
                {hpLost > 0 ? `-${hpLost}` : '0'}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block mb-1">Kinh nghiệm</span>
            <div className="flex items-center justify-center gap-1 font-bold text-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-teal-300">+{expGained}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block mb-1">Vàng</span>
            <div className="flex items-center justify-center gap-1 font-bold text-sm">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300">+{goldGained}</span>
            </div>
          </div>
        </div>

        {/* Second Chance via Linh Vũ Hồi Đáp */}
        {canUseSecondChance && (
          <div className="p-3.5 rounded-xl bg-purple-950/80 border border-purple-500/40 mb-4 flex items-center justify-between text-left">
            <div className="flex items-center gap-2.5">
              <Feather className="w-5 h-5 text-purple-300 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Linh Vũ Hồi Đáp đang khả dụng!</p>
                <p className="text-[10px] text-purple-300">Trả lời lại câu này lần 2 để cứu vãn HP và nhận đủ thưởng.</p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onUseSecondChance();
              }}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
            >
              Làm Lại Ngay
            </button>
          </div>
        )}

        {/* Continue Action */}
        <button
          onClick={() => {
            sound.playClick();
            onContinue();
          }}
          className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer active:scale-95 ${
            isGameOver
              ? 'bg-rose-700 hover:bg-rose-600 text-white shadow-rose-950/40'
              : isSuccess
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-950/40'
              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-950/40'
          }`}
        >
          <span>{isGameOver ? 'TIẾP TỤC (GAME OVER)' : 'TIẾP TỤC HÀNH TRÌNH →'}</span>
        </button>
      </div>
    </div>
  );
};
