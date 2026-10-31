/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.9; // Boosted base volume from 0.5 to 0.9
  private bgmMasterGain: GainNode | null = null;
  private activeBgmOscillators: OscillatorNode[] = [];
  private bgmLoopTimer: number | null = null;
  private currentChapterTheme: number = 1;
  private currentPlayingChapter: number | null = null;
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
    if (this.bgmMasterGain && this.ctx && !this.isMuted) {
      try {
        this.bgmMasterGain.gain.setValueAtTime(this.volume * 0.38, this.ctx.currentTime);
      } catch {
        // Fallback
      }
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
      this.stopBGM(false);
    } else if (this.isBgmPlaying && !this.isCustomBgmPlaying) {
      this.startChapterBGM(this.currentChapterTheme, true);
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

  // Standard tactile UI button click
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

      gain.gain.setValueAtTime(this.volume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio fallback
    }
  }

  // Card Flip: Parchment flutter noise + light whoosh
  public playCardFlip() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Whoosh pitch glide
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.14);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.Q.value = 2.0;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.45, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);

      // 2. Parchment paper flutter noise (white noise burst through bandpass)
      const bufferSize = this.ctx.sampleRate * 0.09;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1400, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(2200, now + 0.09);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(this.volume * 0.22, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
    } catch {
      // Audio fallback
    }
  }

  // Bright crystal "ting" when purchasing items or picking up loot
  public playTing() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // High sparkling bell tone (E6 & B6 harmony)
      [1318.51, 1975.53, 2637.02].forEach((freq, idx) => {
        if (!this.ctx) return;
        const start = now + idx * 0.03;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.98, start + 0.45);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(this.volume * (0.45 / (idx + 1)), start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch {
      // Audio fallback
    }
  }

  // Title unlock fanfare with sparkling glissando
  public playUnlockTitle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Majestic golden fanfare: F4 -> A4 -> C5 -> F5 -> A5 -> C6
      const fanfare = [349.23, 440.0, 523.25, 698.46, 880.0, 1046.5];
      fanfare.forEach((freq, idx) => {
        if (!this.ctx) return;
        const start = now + idx * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(this.volume * 0.5, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + (idx === fanfare.length - 1 ? 0.9 : 0.35));

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + (idx === fanfare.length - 1 ? 0.9 : 0.35));
      });
    } catch {
      // Fallback
    }
  }

  // Boss appearance intro: deep ominous rumble + summoning ring surge
  public playBossIntro() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Sub-bass tremor 65Hz -> 45Hz
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(65, now);
      sub.frequency.exponentialRampToValueAtTime(40, now + 1.2);
      subGain.gain.setValueAtTime(this.volume * 0.65, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(now);
      sub.stop(now + 1.2);

      // 2. Ominous brass chord (C3 + Gb3 tritone devil chord)
      [130.81, 185.00, 261.63].forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, now);
        filter.frequency.exponentialRampToValueAtTime(300, now + 1.4);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.45, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.4);
      });
    } catch {
      // Fallback
    }
  }

  // Boss defeated: magical dissolution chime into golden particles
  public playBossDefeat() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // High crystalline dispersion chord
      const chords = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093.0];
      chords.forEach((freq, idx) => {
        if (!this.ctx) return;
        const start = now + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.05, start + 0.6);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(this.volume * 0.45, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.6);
      });
    } catch {
      // Fallback
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

  // --- Thematic Multi-track Synthesizer Background Music Per Chapter ---

  public getCurrentChapterTheme(): number {
    return this.currentChapterTheme;
  }

  public startChapterBGM(chapterId: number = 1, force: boolean = false) {
    if (this.isCustomBgmPlaying) return; // Don't interrupt custom audio track if any
    const targetChapter = Math.max(1, Math.min(4, chapterId));

    // If already playing this chapter and not forced, keep playing smoothly
    if (this.currentPlayingChapter === targetChapter && this.isBgmPlaying && !force && this.bgmLoopTimer !== null) {
      return;
    }

    this.currentChapterTheme = targetChapter;
    this.isBgmPlaying = true;

    // Immediately stop running timers & fade out any lingering oscillators in 50ms
    if (this.bgmLoopTimer !== null) {
      window.clearTimeout(this.bgmLoopTimer);
      this.bgmLoopTimer = null;
    }

    if (this.bgmMasterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.bgmMasterGain.gain.setValueAtTime(this.bgmMasterGain.gain.value, now);
        this.bgmMasterGain.gain.linearRampToValueAtTime(0.0001, now + 0.05);
      } catch {
        // Fallback
      }
    }

    this.activeBgmOscillators.forEach((osc) => {
      try {
        osc.stop(this.ctx!.currentTime + 0.06);
        osc.disconnect();
      } catch {
        // Fallback
      }
    });
    this.activeBgmOscillators = [];

    if (this.isMuted) {
      this.currentPlayingChapter = null;
      return;
    }

    this.initContext();
    if (!this.ctx) return;

    // Create fresh dedicated master gain node for the new chapter
    const master = this.ctx.createGain();
    master.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    master.gain.linearRampToValueAtTime(this.volume * 0.38, this.ctx.currentTime + 0.12);
    master.connect(this.ctx.destination);
    this.bgmMasterGain = master;
    this.currentPlayingChapter = targetChapter;

    // Track definitions for each chapter:
    // Ch 1: Thung Lũng Số Thực (Crystal Water Valley - Fantasy Folk, Sparkling Harp & Celesta)
    // Ch 2: Đảo Góc Kỳ Bí (Angles Island - Ethereal Sky Sanctuary, High Wind Chimes)
    // Ch 3: Đầm Lầy Tỉ Lệ (Ratio Swamp - Mysterious Enchanted Mist, Wooden Marimba Steps)
    // Ch 4: Thị Trấn Đa Thức Một Biến (Academy of Sages - Grand Neo-Classical Strings & Fanfare)

    interface ThematicBar {
      chord: number[];
      bass: number;
      melody: { note: number; time: number; dur: number }[];
      filterFreq: number;
    }

    const chapterThemes: Record<number, { barDuration: number; bars: ThematicBar[]; oscType: OscillatorType; leadType: OscillatorType }> = {
      1: {
        barDuration: 3.4,
        oscType: 'sine',
        leadType: 'triangle',
        bars: [
          {
            chord: [261.63, 329.63, 392.00, 523.25], // C4, E4, G4, C5
            bass: 65.41, // C2
            filterFreq: 1100,
            melody: [
              { note: 659.25, time: 0.0, dur: 0.45 },
              { note: 783.99, time: 0.45, dur: 0.45 },
              { note: 1046.50, time: 0.9, dur: 0.7 },
              { note: 783.99, time: 1.5, dur: 0.45 },
              { note: 659.25, time: 2.0, dur: 0.45 },
              { note: 587.33, time: 2.5, dur: 0.55 },
            ],
          },
          {
            chord: [220.00, 261.63, 329.63, 440.00], // A3, C4, E4, A4
            bass: 55.00, // A1
            filterFreq: 1000,
            melody: [
              { note: 523.25, time: 0.0, dur: 0.45 },
              { note: 659.25, time: 0.45, dur: 0.45 },
              { note: 880.00, time: 0.9, dur: 0.7 },
              { note: 659.25, time: 1.5, dur: 0.45 },
              { note: 523.25, time: 2.0, dur: 0.45 },
              { note: 493.88, time: 2.5, dur: 0.55 },
            ],
          },
          {
            chord: [174.61, 220.00, 261.63, 349.23], // F3, A3, C4, F4
            bass: 43.65, // F1
            filterFreq: 1150,
            melody: [
              { note: 440.00, time: 0.0, dur: 0.45 },
              { note: 523.25, time: 0.45, dur: 0.45 },
              { note: 698.46, time: 0.9, dur: 0.7 },
              { note: 880.00, time: 1.5, dur: 0.45 },
              { note: 698.46, time: 2.0, dur: 0.45 },
              { note: 523.25, time: 2.5, dur: 0.55 },
            ],
          },
          {
            chord: [196.00, 246.94, 293.66, 392.00], // G3, B3, D4, G4
            bass: 49.00, // G1
            filterFreq: 1200,
            melody: [
              { note: 493.88, time: 0.0, dur: 0.45 },
              { note: 587.33, time: 0.45, dur: 0.45 },
              { note: 783.99, time: 0.9, dur: 0.7 },
              { note: 987.77, time: 1.5, dur: 0.5 },
              { note: 783.99, time: 2.0, dur: 0.45 },
              { note: 587.33, time: 2.5, dur: 0.6 },
            ],
          },
        ],
      },
      2: {
        barDuration: 3.6,
        oscType: 'triangle',
        leadType: 'sine',
        bars: [
          {
            chord: [146.83, 220.00, 261.63, 329.63, 349.23], // Dm9
            bass: 73.42, // D2
            filterFreq: 1600,
            melody: [
              { note: 880.00, time: 0.0, dur: 0.7 },
              { note: 698.46, time: 0.55, dur: 0.5 },
              { note: 659.25, time: 1.1, dur: 0.5 },
              { note: 587.33, time: 1.7, dur: 0.7 },
              { note: 659.25, time: 2.4, dur: 0.8 },
            ],
          },
          {
            chord: [116.54, 174.61, 220.00, 293.66], // Bbmaj7
            bass: 58.27, // Bb1
            filterFreq: 1500,
            melody: [
              { note: 1174.66, time: 0.0, dur: 0.8 },
              { note: 880.00, time: 0.6, dur: 0.6 },
              { note: 698.46, time: 1.3, dur: 0.6 },
              { note: 587.33, time: 2.0, dur: 0.9 },
            ],
          },
          {
            chord: [130.81, 196.00, 293.66, 329.63], // Cadd9
            bass: 65.41, // C2
            filterFreq: 1700,
            melody: [
              { note: 783.99, time: 0.0, dur: 0.6 },
              { note: 659.25, time: 0.55, dur: 0.5 },
              { note: 587.33, time: 1.1, dur: 0.6 },
              { note: 523.25, time: 1.7, dur: 0.7 },
              { note: 659.25, time: 2.4, dur: 0.8 },
            ],
          },
          {
            chord: [110.00, 164.81, 196.00, 261.63], // Am7
            bass: 55.00, // A1
            filterFreq: 1550,
            melody: [
              { note: 659.25, time: 0.0, dur: 0.6 },
              { note: 523.25, time: 0.55, dur: 0.5 },
              { note: 493.88, time: 1.2, dur: 0.6 },
              { note: 440.00, time: 1.9, dur: 1.0 },
            ],
          },
        ],
      },
      3: {
        barDuration: 3.3,
        oscType: 'sawtooth',
        leadType: 'triangle',
        bars: [
          {
            chord: [82.41, 123.47, 164.81, 196.00, 293.66], // Em add9
            bass: 41.20, // E1
            filterFreq: 750,
            melody: [
              { note: 329.63, time: 0.0, dur: 0.32 },
              { note: 493.88, time: 0.35, dur: 0.32 },
              { note: 392.00, time: 0.7, dur: 0.32 },
              { note: 659.25, time: 1.35, dur: 0.4 },
              { note: 587.33, time: 1.85, dur: 0.32 },
              { note: 493.88, time: 2.3, dur: 0.45 },
            ],
          },
          {
            chord: [65.41, 130.81, 164.81, 246.94], // Cmaj7
            bass: 32.70, // C1
            filterFreq: 700,
            melody: [
              { note: 261.63, time: 0.0, dur: 0.32 },
              { note: 392.00, time: 0.35, dur: 0.32 },
              { note: 329.63, time: 0.7, dur: 0.32 },
              { note: 493.88, time: 1.35, dur: 0.4 },
              { note: 392.00, time: 1.85, dur: 0.32 },
              { note: 329.63, time: 2.3, dur: 0.45 },
            ],
          },
          {
            chord: [55.00, 110.00, 164.81, 246.94], // Am9
            bass: 27.50, // A0
            filterFreq: 800,
            melody: [
              { note: 220.00, time: 0.0, dur: 0.32 },
              { note: 329.63, time: 0.35, dur: 0.32 },
              { note: 261.63, time: 0.7, dur: 0.32 },
              { note: 440.00, time: 1.35, dur: 0.4 },
              { note: 493.88, time: 1.85, dur: 0.32 },
              { note: 440.00, time: 2.3, dur: 0.45 },
            ],
          },
          {
            chord: [61.74, 123.47, 185.00, 220.00, 311.13], // B7sus4 -> B7
            bass: 30.87, // B0
            filterFreq: 850,
            melody: [
              { note: 246.94, time: 0.0, dur: 0.32 },
              { note: 369.99, time: 0.35, dur: 0.32 },
              { note: 311.13, time: 0.7, dur: 0.32 },
              { note: 440.00, time: 1.35, dur: 0.4 },
              { note: 369.99, time: 1.85, dur: 0.32 },
              { note: 246.94, time: 2.3, dur: 0.5 },
            ],
          },
        ],
      },
      4: {
        barDuration: 3.0,
        oscType: 'sawtooth',
        leadType: 'triangle',
        bars: [
          {
            chord: [110.00, 164.81, 220.00, 261.63, 329.63], // Am
            bass: 55.00, // A1
            filterFreq: 1300,
            melody: [
              { note: 440.00, time: 0.0, dur: 0.26 },
              { note: 523.25, time: 0.34, dur: 0.26 },
              { note: 659.25, time: 0.68, dur: 0.26 },
              { note: 880.00, time: 1.02, dur: 0.32 },
              { note: 659.25, time: 1.4, dur: 0.26 },
              { note: 523.25, time: 1.74, dur: 0.26 },
              { note: 493.88, time: 2.08, dur: 0.26 },
              { note: 523.25, time: 2.42, dur: 0.35 },
            ],
          },
          {
            chord: [87.31, 130.81, 174.61, 261.63, 349.23], // F
            bass: 43.65, // F1
            filterFreq: 1350,
            melody: [
              { note: 349.23, time: 0.0, dur: 0.26 },
              { note: 440.00, time: 0.34, dur: 0.26 },
              { note: 523.25, time: 0.68, dur: 0.26 },
              { note: 698.46, time: 1.02, dur: 0.32 },
              { note: 523.25, time: 1.4, dur: 0.26 },
              { note: 440.00, time: 1.74, dur: 0.26 },
              { note: 392.00, time: 2.08, dur: 0.26 },
              { note: 440.00, time: 2.42, dur: 0.35 },
            ],
          },
          {
            chord: [73.42, 146.83, 220.00, 293.66, 349.23], // Dm
            bass: 36.71, // D1
            filterFreq: 1250,
            melody: [
              { note: 293.66, time: 0.0, dur: 0.26 },
              { note: 349.23, time: 0.34, dur: 0.26 },
              { note: 440.00, time: 0.68, dur: 0.26 },
              { note: 587.33, time: 1.02, dur: 0.32 },
              { note: 440.00, time: 1.4, dur: 0.26 },
              { note: 349.23, time: 1.74, dur: 0.26 },
              { note: 329.63, time: 2.08, dur: 0.26 },
              { note: 349.23, time: 2.42, dur: 0.35 },
            ],
          },
          {
            chord: [82.41, 164.81, 207.65, 246.94, 329.63], // E7
            bass: 41.20, // E1
            filterFreq: 1400,
            melody: [
              { note: 329.63, time: 0.0, dur: 0.26 },
              { note: 415.30, time: 0.34, dur: 0.26 },
              { note: 493.88, time: 0.68, dur: 0.26 },
              { note: 659.25, time: 1.02, dur: 0.35 },
              { note: 493.88, time: 1.4, dur: 0.26 },
              { note: 415.30, time: 1.74, dur: 0.26 },
              { note: 369.99, time: 2.08, dur: 0.26 },
              { note: 415.30, time: 2.42, dur: 0.4 },
            ],
          },
        ],
      },
    };

    const currentThemeData = chapterThemes[targetChapter] || chapterThemes[1];
    let barIndex = 0;

    const scheduleBar = () => {
      if (!this.ctx || this.isMuted || !this.isBgmPlaying || this.currentPlayingChapter !== targetChapter || !this.bgmMasterGain) {
        return;
      }

      const bar = currentThemeData.bars[barIndex % currentThemeData.bars.length];
      barIndex++;
      const now = this.ctx.currentTime;
      const barDuration = currentThemeData.barDuration;

      // 1. Bass voice
      try {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = targetChapter === 3 ? 'sine' : 'triangle';
        bassOsc.frequency.setValueAtTime(bar.bass, now);

        bassGain.gain.setValueAtTime(0, now);
        bassGain.gain.linearRampToValueAtTime(0.4, now + 0.08);
        bassGain.gain.setValueAtTime(0.35, now + barDuration - 0.2);
        bassGain.gain.linearRampToValueAtTime(0.001, now + barDuration);

        bassOsc.connect(bassGain);
        bassGain.connect(this.bgmMasterGain);
        bassOsc.start(now);
        bassOsc.stop(now + barDuration);
        this.activeBgmOscillators.push(bassOsc);
      } catch {
        // Fallback
      }

      // 2. Harmonic Pad Chords
      bar.chord.forEach((freq, idx) => {
        if (!this.ctx || !this.bgmMasterGain) return;
        try {
          const osc = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc.type = currentThemeData.oscType;
          osc.frequency.setValueAtTime(freq, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(bar.filterFreq * 0.8, now);
          filter.frequency.linearRampToValueAtTime(bar.filterFreq * 1.25, now + barDuration * 0.5);
          filter.frequency.linearRampToValueAtTime(bar.filterFreq * 0.8, now + barDuration);

          const basePadGain = 0.12 / Math.sqrt(bar.chord.length);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(basePadGain, now + 0.4);
          gain.gain.setValueAtTime(basePadGain * 0.85, now + barDuration - 0.3);
          gain.gain.linearRampToValueAtTime(0.001, now + barDuration);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.bgmMasterGain);

          osc.start(now);
          osc.stop(now + barDuration);
          this.activeBgmOscillators.push(osc);
        } catch {
          // Fallback
        }
      });

      // 3. Thematic Lead / Arpeggiator Melody
      bar.melody.forEach(({ note, time, dur }) => {
        if (!this.ctx || !this.bgmMasterGain) return;
        try {
          const start = now + time;
          const osc = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc.type = currentThemeData.leadType;
          osc.frequency.setValueAtTime(note, start);

          filter.type = targetChapter === 2 ? 'bandpass' : 'lowpass';
          filter.frequency.setValueAtTime(targetChapter === 2 ? note : 2200, start);

          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.22, start + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.bgmMasterGain);

          osc.start(start);
          osc.stop(start + dur);
          this.activeBgmOscillators.push(osc);
        } catch {
          // Fallback
        }
      });

      // 4. Unique Land-Specific Ambient Soundscapes
      try {
        if (targetChapter === 1) {
          // Chapter 1: Thung Lũng Số Thực - Mountain Valley Breeze & Crystal Wind Chimes
          const chimes = [1760.0, 2093.0, 2637.02, 3135.96];
          const chimeOffsets = [0.6, 1.9, 2.7];
          chimeOffsets.forEach((tOffset, i) => {
            if (!this.ctx || !this.bgmMasterGain) return;
            const chimeOsc = this.ctx.createOscillator();
            const chimeGain = this.ctx.createGain();
            const chimeFreq = chimes[(barIndex + i) % chimes.length];
            chimeOsc.type = 'sine';
            chimeOsc.frequency.setValueAtTime(chimeFreq, now + tOffset);
            chimeGain.gain.setValueAtTime(0, now + tOffset);
            chimeGain.gain.linearRampToValueAtTime(0.06, now + tOffset + 0.02);
            chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + tOffset + 0.65);
            chimeOsc.connect(chimeGain);
            chimeGain.connect(this.bgmMasterGain);
            chimeOsc.start(now + tOffset);
            chimeOsc.stop(now + tOffset + 0.65);
            this.activeBgmOscillators.push(chimeOsc);
          });
        } else if (targetChapter === 2) {
          // Chapter 2: Đảo Góc Kỳ Bí - Celestial Wind & Resonant Ancient Metallic Bell/Bowl
          const bowlOsc1 = this.ctx.createOscillator();
          const bowlOsc2 = this.ctx.createOscillator();
          const bowlGain = this.ctx.createGain();
          bowlOsc1.type = 'sine';
          bowlOsc2.type = 'sine';
          bowlOsc1.frequency.setValueAtTime(432, now + 0.4);
          bowlOsc2.frequency.setValueAtTime(866, now + 0.4); // subtle detune
          bowlGain.gain.setValueAtTime(0, now + 0.4);
          bowlGain.gain.linearRampToValueAtTime(0.07, now + 0.8);
          bowlGain.gain.exponentialRampToValueAtTime(0.0001, now + barDuration);
          bowlOsc1.connect(bowlGain);
          bowlOsc2.connect(bowlGain);
          bowlGain.connect(this.bgmMasterGain);
          bowlOsc1.start(now + 0.4);
          bowlOsc2.start(now + 0.4);
          bowlOsc1.stop(now + barDuration);
          bowlOsc2.stop(now + barDuration);
          this.activeBgmOscillators.push(bowlOsc1, bowlOsc2);
        } else if (targetChapter === 3) {
          // Chapter 3: Đầm Lầy Tỉ Lệ - Water Droplets, Mystical Swamp Insects & Slow Gear Ticks
          // Water droplets (plink downwards)
          [0.5, 1.8].forEach((dropTime) => {
            if (!this.ctx || !this.bgmMasterGain) return;
            const dropOsc = this.ctx.createOscillator();
            const dropGain = this.ctx.createGain();
            dropOsc.type = 'sine';
            dropOsc.frequency.setValueAtTime(1750, now + dropTime);
            dropOsc.frequency.exponentialRampToValueAtTime(780, now + dropTime + 0.08);
            dropGain.gain.setValueAtTime(0.12, now + dropTime);
            dropGain.gain.exponentialRampToValueAtTime(0.0001, now + dropTime + 0.08);
            dropOsc.connect(dropGain);
            dropGain.connect(this.bgmMasterGain);
            dropOsc.start(now + dropTime);
            dropOsc.stop(now + dropTime + 0.08);
            this.activeBgmOscillators.push(dropOsc);
          });
          // Gear tick
          const gearOsc = this.ctx.createOscillator();
          const gearGain = this.ctx.createGain();
          gearOsc.type = 'triangle';
          gearOsc.frequency.setValueAtTime(95, now + 1.2);
          gearOsc.frequency.exponentialRampToValueAtTime(40, now + 1.28);
          gearGain.gain.setValueAtTime(0.08, now + 1.2);
          gearGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.28);
          gearOsc.connect(gearGain);
          gearGain.connect(this.bgmMasterGain);
          gearOsc.start(now + 1.2);
          gearOsc.stop(now + 1.28);
          this.activeBgmOscillators.push(gearOsc);
        } else if (targetChapter === 4) {
          // Chapter 4: Thị Trấn Đa Thức - Ancient Library Reverb & Arcane Knowledge Resonance
          const droneOsc = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const droneGain = this.ctx.createGain();
          droneOsc.type = 'sawtooth';
          droneOsc.frequency.setValueAtTime(110, now); // A2
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(320, now);
          filter.frequency.linearRampToValueAtTime(540, now + barDuration * 0.5);
          filter.frequency.linearRampToValueAtTime(320, now + barDuration);
          droneGain.gain.setValueAtTime(0, now);
          droneGain.gain.linearRampToValueAtTime(0.06, now + 0.5);
          droneGain.gain.setValueAtTime(0.05, now + barDuration - 0.4);
          droneGain.gain.linearRampToValueAtTime(0.0001, now + barDuration);
          droneOsc.connect(filter);
          filter.connect(droneGain);
          droneGain.connect(this.bgmMasterGain);
          droneOsc.start(now);
          droneOsc.stop(now + barDuration);
          this.activeBgmOscillators.push(droneOsc);
        }
      } catch {
        // Fallback
      }

      // Clean up finished oscillators periodically to avoid memory growth
      this.activeBgmOscillators = this.activeBgmOscillators.filter((o) => {
        // Active if audioContext time is less than when it would stop
        return true;
      }).slice(-40);

      // Schedule next bar with exact millisecond timeout
      const nextDelayMs = Math.max(100, Math.floor((barDuration - 0.05) * 1000));
      this.bgmLoopTimer = window.setTimeout(scheduleBar, nextDelayMs);
    };

    // Immediately trigger the first bar
    scheduleBar();
  }

  public stopBGM(fullStop: boolean = true) {
    if (fullStop) {
      this.isBgmPlaying = false;
      this.currentPlayingChapter = null;
    }
    if (this.bgmLoopTimer !== null) {
      window.clearTimeout(this.bgmLoopTimer);
      this.bgmLoopTimer = null;
    }
    if (this.bgmMasterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.bgmMasterGain.gain.setValueAtTime(this.bgmMasterGain.gain.value, now);
        this.bgmMasterGain.gain.linearRampToValueAtTime(0.0001, now + 0.06);
      } catch {
        // Fallback
      }
    }
    this.activeBgmOscillators.forEach((osc) => {
      try {
        osc.stop(this.ctx!.currentTime + 0.07);
        osc.disconnect();
      } catch {
        // Fallback
      }
    });
    this.activeBgmOscillators = [];
  }
}

export const sound = new SoundEngine();
