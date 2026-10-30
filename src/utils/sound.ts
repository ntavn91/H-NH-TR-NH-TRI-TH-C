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

      // Layer 1: Sub-bass triumphant foundation (C2 -> C3)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(65.41, now);
      subOsc.frequency.exponentialRampToValueAtTime(130.81, now + 0.3);
      subGain.gain.setValueAtTime(0, now);
      subGain.gain.linearRampToValueAtTime(this.volume * 0.45, now + 0.05);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.2);

      // Layer 2: Heroic Brass Fanfare: C4 -> E4 -> G4 -> C5 -> E5 -> G5 (sustained chord triumph)
      const brassNotes = [
        { freq: 261.63, time: 0, dur: 0.2 },
        { freq: 329.63, time: 0.12, dur: 0.2 },
        { freq: 392.00, time: 0.24, dur: 0.2 },
        { freq: 523.25, time: 0.36, dur: 0.3 },
        { freq: 659.25, time: 0.50, dur: 0.35 },
        { freq: 783.99, time: 0.65, dur: 1.4 },  // High G5 triumphant finish
        { freq: 1046.50, time: 0.65, dur: 1.4 }, // Octave C6 support
      ];

      brassNotes.forEach(({ freq, time, dur }) => {
        if (!this.ctx) return;
        const start = now + time;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.value = freq;

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, start);
        filter.frequency.exponentialRampToValueAtTime(800, start + dur);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(this.volume * 0.5, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + dur);
      });

      // Layer 3: Shimmering Angelic Bell Arpeggio
      const chimeNotes = [1046.5, 1318.5, 1567.98, 2093.0];
      chimeNotes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const start = now + 0.65 + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(this.volume * 0.4, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.8);
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

      // 1. Heavy leather pouch coin drop / thud
      const thudOsc = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thudOsc.type = 'triangle';
      thudOsc.frequency.setValueAtTime(140, now);
      thudOsc.frequency.exponentialRampToValueAtTime(50, now + 0.12);
      thudGain.gain.setValueAtTime(this.volume * 0.45, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      thudOsc.connect(thudGain);
      thudGain.connect(this.ctx.destination);
      thudOsc.start(now);
      thudOsc.stop(now + 0.12);

      // 2. Realistic multi-coin clinking jingle (metallic resonance)
      const coinClinks = [
        { freq: 2489, time: 0.02 },
        { freq: 3135, time: 0.06 },
        { freq: 2793, time: 0.11 },
        { freq: 3520, time: 0.16 },
        { freq: 4186, time: 0.22 },
      ];

      coinClinks.forEach(({ freq, time }) => {
        if (!this.ctx) return;
        const start = now + time;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.95, start + 0.1);

        gain.gain.setValueAtTime(this.volume * 0.4, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.1);
      });

      // 3. Magical purchase acquisition chime (celestial shimmer)
      const chimeNotes = [783.99, 987.77, 1318.51, 1567.98];
      chimeNotes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const start = now + 0.12 + idx * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(this.volume * 0.45, start + 0.02);
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

  public playOpenShop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Medieval merchant wind chimes
      const chimeTones = [1174.66, 1479.98, 1760.00, 2217.46];
      chimeTones.forEach((freq, idx) => {
        if (!this.ctx) return;
        const start = now + idx * 0.06;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(this.volume * 0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch {
      // Fallback
    }
  }

  public playHeal() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Healing pulse: gentle warm rising tones
      [329.63, 440.0, 554.37, 659.25, 880.0].forEach((freq, idx) => {
        if (!this.ctx) return;
        const start = now + idx * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(this.volume * 0.4, start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.5);
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
