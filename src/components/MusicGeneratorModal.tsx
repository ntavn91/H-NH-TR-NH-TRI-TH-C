/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Music, Sparkles, Play, Pause, Volume2, Download, Check, X, AlertCircle, Disc } from 'lucide-react';
import { sound } from '../utils/sound';

interface MusicGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVolume: number;
  onVolumeChange: (vol: number) => void;
}

const PRESET_THEMES = [
  {
    id: 'epic_adventure',
    title: 'Hành Trình Hào Khí',
    description: 'Dàn nhạc giao hưởng hùng tráng, tiếng kèn đồng và trống trận giục giã thám hiểm.',
    prompt: 'A heroic, epic orchestral fantasy adventure theme with brass, strings, and cinematic percussion for a math RPG journey.',
  },
  {
    id: 'peaceful_valley',
    title: 'Thung Lũng Yên Bình',
    description: 'Giai điệu sáo trúc, đàn hạc êm dịu thanh bình cho việc tập trung giải toán.',
    prompt: 'A peaceful, serene acoustic ambient track with harp, wooden flute, and warm acoustic guitar for quiet study and contemplation.',
  },
  {
    id: 'mystic_temple',
    title: 'Cổ Miếu Huyền Bí',
    description: 'Thanh âm chuông gió ma thuật và hợp xướng cổ xưa trong không gian số học.',
    prompt: 'A mystical, ethereal fantasy soundtrack with angelic choirs, crystal bells, and ambient synth pads.',
  },
  {
    id: 'boss_showdown',
    title: 'Quyết Đấu Trùm Cuối',
    description: 'Nhịp điệu dồn dập, căng thẳng kịch tính thách thức trí tuệ cao độ.',
    prompt: 'A dramatic, high-energy battle orchestral score with fast strings, heavy taiko drums, and suspenseful brass hits.',
  },
];

export const MusicGeneratorModal: React.FC<MusicGeneratorModalProps> = ({
  isOpen,
  onClose,
  currentVolume,
  onVolumeChange,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('epic_adventure');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [modelType, setModelType] = useState<'lyria-3-clip-preview' | 'lyria-3-pro-preview'>('lyria-3-clip-preview');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeBgmApplied, setActiveBgmApplied] = useState<boolean>(sound.isUsingCustomBgm());

  if (!isOpen) return null;

  const handleGenerate = async () => {
    sound.playClick();
    setIsGenerating(true);
    setErrorMessage(null);
    setActiveBgmApplied(false);

    const activePreset = PRESET_THEMES.find((p) => p.id === selectedPreset);
    const finalPrompt = customPrompt.trim() || activePreset?.prompt || 'A fantasy math adventure theme with orchestral music.';

    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          model: modelType,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Không thể tạo nhạc nền');
      }

      // Decode base64 audio into Blob URL
      const binary = atob(data.audioBase64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);

      setGeneratedAudioUrl(audioUrl);
      sound.playLevelUp();
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi gọi mô hình Lyria. Hãy kiểm tra API Key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyAsGameBgm = () => {
    if (!generatedAudioUrl) return;
    sound.playClick();
    sound.playCustomBgm(generatedAudioUrl);
    setActiveBgmApplied(true);
    setIsPlaying(true);
  };

  const handleRestoreDefaultBgm = () => {
    sound.playClick();
    sound.stopCustomBgm();
    setActiveBgmApplied(false);
    setIsPlaying(false);
    sound.startChapterBGM();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#101827]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="max-w-2xl w-full bg-[#1C293B] border border-purple-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl my-auto animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-700/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black font-rpg text-white tracking-wide flex items-center gap-2">
                <span>PHÒNG HÒA ÂM TRI THỨC</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/80 border border-purple-400 text-purple-200 font-sans font-bold">
                  AI Lyria
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Tạo bản nhạc nền phiêu lưu độc bản và tinh chỉnh âm lượng trò chơi
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Master Slider Control */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
            <span className="flex items-center gap-1.5 text-teal-400">
              <Volume2 className="w-4 h-4" />
              Âm Lượng Tổng Thể (Nhạc & Hiệu ứng)
            </span>
            <span className="font-mono text-white text-sm">
              {Math.round(currentVolume * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={currentVolume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>Yên lặng (0%)</span>
            <span>Cơ bản (50%)</span>
            <span>To rõ (90% - 100%)</span>
          </div>
        </div>

        {/* Preset Theme Selection */}
        <div className="mb-5">
          <label className="text-xs uppercase font-bold text-slate-400 block mb-2.5">
            1. Chọn phong cách nhạc nền:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRESET_THEMES.map((theme) => {
              const isSelected = selectedPreset === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedPreset(theme.id);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-900/50 border-purple-400 shadow-lg text-white'
                      : 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className={isSelected ? 'text-purple-300' : 'text-slate-200'}>
                      {theme.title}
                    </span>
                    {isSelected && <Disc className="w-3.5 h-3.5 text-purple-400 animate-spin" />}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {theme.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Prompt & Model Choice */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs uppercase font-bold text-slate-400">
              2. Mô hình & Tùy chỉnh (Tùy chọn):
            </label>
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setModelType('lyria-3-clip-preview')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  modelType === 'lyria-3-clip-preview'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Clip 30s
              </button>
              <button
                type="button"
                onClick={() => setModelType('lyria-3-pro-preview')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  modelType === 'lyria-3-pro-preview'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Bản Dài (Pro)
              </button>
            </div>
          </div>

          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Ví dụ: Nhạc thám hiểm rộn rã với đàn tranh và trống trận..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
          />
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Button: Generate */}
        <button
          disabled={isGenerating}
          onClick={handleGenerate}
          className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isGenerating
              ? 'bg-purple-900/60 text-purple-300 cursor-not-allowed animate-pulse'
              : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-950/50 hover:shadow-purple-900/60 active:scale-98'
          }`}
        >
          {isGenerating ? (
            <>
              <Disc className="w-4 h-4 animate-spin text-purple-300" />
              <span>Đang sáng tác bản nhạc với mô hình {modelType}...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tạo Nhạc Nền AI (Lyria)</span>
            </>
          )}
        </button>

        {/* Result Audio Player & Controls */}
        {generatedAudioUrl && (
          <div className="mt-5 p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <audio
                src={generatedAudioUrl}
                controls
                className="w-full sm:w-60 h-10 accent-purple-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleApplyAsGameBgm}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeBgmApplied
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow'
                }`}
              >
                {activeBgmApplied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Đang Dùng BGM Này</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Đặt Làm Nhạc Game</span>
                  </>
                )}
              </button>

              <a
                href={generatedAudioUrl}
                download="hanh-trinh-tri-thuc-lyria-bgm.wav"
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all"
                title="Tải file âm thanh .wav"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Reset to standard theme option if custom applied */}
        {sound.isUsingCustomBgm() && (
          <div className="mt-3 text-center">
            <button
              onClick={handleRestoreDefaultBgm}
              className="text-xs text-slate-400 hover:text-purple-300 underline cursor-pointer"
            >
              Quay lại giai điệu nguyên bản của các chương
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
