/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CharacterData, FailedQuestionRecord } from '../types/game';
import { getQuestionById } from '../data/questionsBank';
import { AlertCircle, Play, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface ParallelWorldModalProps {
  character: CharacterData;
  onSolveQuestion: (failedRecord: FailedQuestionRecord) => void;
  onClose: () => void;
}

export const ParallelWorldModal: React.FC<ParallelWorldModalProps> = ({
  character,
  onSolveQuestion,
  onClose,
}) => {
  const pendingList = character.journey.failedQuestions.filter(q => q.status === 'pending');

  return (
    <div className="fixed inset-0 z-50 bg-[#101827]/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-[#1C293B] border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-700/80 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold text-red-400 tracking-wider">
              KHÔNG GIAN NGHỊCH ĐẢO
            </span>
            <h3 className="text-2xl font-black font-rpg text-white">
              THẾ GIỚI SONG SONG
            </h3>
          </div>
        </div>

        {/* Introduction */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          Những câu hỏi bạn từng trả lời sai hoặc hết giờ bị giam giữ tại đây. 
          Theo luật thiêng liêng, <strong>bạn phải giải phóng toàn bộ các câu sai này</strong> để thanh tẩy không gian và mở khóa vùng đất tiếp theo!
          <span className="block mt-1 text-red-300 font-semibold text-xs">
            * Lưu ý: Đúng sẽ xóa câu sai (không nhận thưởng); Sai hoặc hết giờ vẫn bị trừ 1 HP!
          </span>
        </p>

        {/* Failed Questions List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-6">
          {pendingList.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-lg font-bold text-white mb-1">Thế Giới Đã Hoàn Toàn Tinh Khiết!</h4>
              <p className="text-xs text-slate-400">
                Không còn câu sai nào còn tồn đọng. Bạn đã đủ điều kiện tiến tới vùng đất tiếp theo!
              </p>
            </div>
          ) : (
            pendingList.map((rec, idx) => {
              const qDef = getQuestionById(rec.questionId);
              return (
                <div
                  key={`${rec.questionId}-${rec.variantId}-${idx}`}
                  className="p-4 rounded-xl bg-slate-900/80 border border-red-500/30 flex items-center justify-between gap-4 hover:border-red-400 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-950 border border-red-500/50 text-red-300 font-bold">
                        Ải {rec.sourceChapterId}-{rec.sourceStageId}
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        {qDef?.topic || 'Ôn tập toán học'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">
                      Mã câu: {rec.variantId}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onSolveQuestion(rec);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-red-950/50 cursor-pointer active:scale-95 shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Hóa Giải</span>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700/60">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold cursor-pointer"
          >
            Quay lại Bản đồ
          </button>
        </div>
      </div>
    </div>
  );
};
