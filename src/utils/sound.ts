/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.9; // Boosted base volume from 0.5 to 0.9
  private bgmOscillators: OscillatorNode[] = [];
  private bgmGain: GainNode | null = null;
  private bgmInterval: number | null = null;
  private currentChapterTheme: number = 1;
  private isBgmPlaying: boolean = false;
  private customAudio: HTMLAudioElement | null = null;
  private isCustomBgmPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(newVol: number) {
    this.volume = Math.max(0, Math.min(1, newVol));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.customAudio) {
      this.customAudio.muted = muted;
    }
    if (muted) {
      this.stopBGM();
    } else if (this.isBgmPlaying && !this.isCustomBgmPlaying) {
      this.startChapterBGM(this.currentChapterTheme);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // Play custom background track (e.g. generated from Lyria)
  public playCustomBgm(audioUrl: string) {
    this.stopBGM(false);
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }

    try {
      this.customAudio = new Audio(audioUrl);
      this.customAudio.loop = true;
      this.customAudio.volume = this.volume;
      this.customAudio.muted = this.isMuted;
      this.isCustomBgmPlaying = true;
      this.isBgmPlaying = true;
      this.customAudio.play().catch(() => {});
    } catch {
      // Audio fallback
    }
  }

  public stopCustomBgm() {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    this.isCustomBgmPlaying = false;
  }

  public isUsingCustomBgm(): boolean {
    return this.isCustomBgmPlaying;
  }

  // --- Sound Effects ---

  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(this.volume * 0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio fallback
    }
  }

  public playCardFlip() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(this.volume * 0.45, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Audio fallback
    }
  }

  public playCorrect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Arpeggio C5 -> E5 -> G5 -> C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const start = now + idx * 0.07;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(this.volume * 0.65, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.35);
      });
    } catch {
      // Fallback
    }
  }

  public playWrong() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.3);

      gain.gain.setValueAtTime(this.volume * 0.55, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Fallback
    }
  }

  public playLevelUp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Fanfare: G4, C5, E5, G5 (sustained)
      const notes = [392, 523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;

        const start = now + idx * 0.12;
        const duration = idx === 3 ? 0.7 : 0.2;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(this.volume * 0.75, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      });
    } catch {
      // Fallback
    }
  }

  public playBuyItem() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [987.77, 1318.51].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const start = now + idx * 0.08;
        gain.gain.setValueAtTime(this.volume * 0.55, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.2);
      });
    } catch {
      // Fallback
    }
  }

  public playTimerTick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 800;

      gain.gain.setValueAtTime(this.volume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Fallback
    }
  }

  public playBoss() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [130.81, 164.81, 196.0]; // C3, E3, G3
      notes.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.75, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.9);
      });
    } catch {
      // Fallback
    }
  }

  public playGameOver() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [329.63, 311.13, 293.66, 277.18]; // E4, D#4, D4, C#4 descending
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const start = now + idx * 0.2;
        gain.gain.setValueAtTime(this.volume * 0.65, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch {
      // Fallback
    }
  }

  public playVictory() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5]; // C4-E4-G4-C5-E5-G5-C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;

        const start = now + idx * 0.1;
        const duration = idx === notes.length - 1 ? 0.9 : 0.25;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(this.volume * 0.75, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      });
    } catch {
      // Fallback
    }
  }

  // --- Ambient Synthesizer Background Music Per Chapter ---

  public startChapterBGM(chapterId: number = 1) {
    if (this.isCustomBgmPlaying) return; // Don't interrupt custom music
    this.currentChapterTheme = chapterId;
    this.isBgmPlaying = true;
    if (this.isMuted) return;
    this.stopBGM(false);
    this.initContext();
    if (!this.ctx) return;

    const chordProgressions: Record<number, number[][]> = {
      1: [
        [261.63, 329.63, 392.00, 523.25], // C major
        [220.00, 261.63, 329.63, 440.00], // A minor
        [174.61, 220.00, 261.63, 349.23], // F major
        [196.00, 246.94, 293.66, 392.00]  // G major
      ],
      2: [
        [293.66, 349.23, 440.00, 587.33], // D minor
        [261.63, 329.63, 392.00, 523.25], // C major
        [246.94, 293.66, 369.99, 493.88], // Bm
        [220.00, 261.63, 329.63, 440.00]  // A minor
      ],
      3: [
        [329.63, 392.00, 493.88, 659.25], // E minor
        [293.66, 369.99, 440.00, 587.33], // D major
        [261.63, 329.63, 392.00, 523.25], // C major
        [246.94, 311.13, 369.99, 493.88]  // B7
      ],
      4: [
        [220.00, 261.63, 329.63, 440.00], // A minor
        [174.61, 220.00, 261.63, 349.23], // F major
        [261.63, 329.63, 392.00, 523.25], // C major
        [196.00, 246.94, 293.66, 392.00]  // G major
      ]
    };

    const progression = chordProgressions[chapterId] || chordProgressions[1];
    let step = 0;

    const playChordStep = () => {
      if (!this.ctx || this.isMuted || !this.isBgmPlaying || this.isCustomBgmPlaying) return;
      const chord = progression[step % progression.length];
      step++;

      const now = this.ctx.currentTime;
      const stepDuration = 3.2; // 3.2 seconds per pad chord

      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = freq;

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700, now);
        filter.frequency.linearRampToValueAtTime(1200, now + stepDuration / 2);
        filter.frequency.linearRampToValueAtTime(600, now + stepDuration);

        // Rich, audible pad envelope (boosted from 0.05 to 0.22)
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.22, now + 0.6);
        gain.gain.linearRampToValueAtTime(0.001, now + stepDuration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + stepDuration);
      });
    };

    // Play first chord immediately
    playChordStep();
    this.bgmInterval = window.setInterval(playChordStep, 3200);
  }

  public stopBGM(fullStop: boolean = true) {
    if (fullStop) {
      this.isBgmPlaying = false;
    }
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const sound = new SoundEngine();
