/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import confetti from 'canvas-confetti';

// Gold coin & sparkle palette
const GOLD_COLORS = ['#fbbf24', '#f59e0b', '#d97706', '#fef08a', '#ffd700', '#facc15'];

// Wisdom / EXP magical cyan-teal-violet palette
const EXP_COLORS = ['#2dd4bf', '#14b8a6', '#06b6d4', '#818cf8', '#c084fc', '#ffffff'];

/**
 * Triggers glowing wisdom/EXP particles (stars, orbs)
 */
export const triggerExpParticles = (originX: number = 0.35, originY: number = 0.6) => {
  try {
    // Wave 1: Upward fountain of magic knowledge stars
    confetti({
      particleCount: 35,
      angle: 75,
      spread: 60,
      origin: { x: originX, y: originY },
      colors: EXP_COLORS,
      shapes: ['star', 'circle'],
      scalar: 1.15,
      ticks: 180,
      gravity: 0.8,
      drift: -0.1,
    });

    // Wave 2: Sparkling dust
    setTimeout(() => {
      confetti({
        particleCount: 20,
        angle: 85,
        spread: 45,
        origin: { x: originX, y: originY },
        colors: EXP_COLORS,
        shapes: ['circle'],
        scalar: 0.8,
        ticks: 200,
        gravity: 0.6,
      });
    }, 120);
  } catch {
    // Graceful fallback if canvas is unavailable
  }
};

/**
 * Triggers sparkling treasure/Gold particles (coins, sparkles)
 */
export const triggerGoldParticles = (originX: number = 0.65, originY: number = 0.6) => {
  try {
    // Wave 1: Radiant gold coins explosion
    confetti({
      particleCount: 35,
      angle: 105,
      spread: 60,
      origin: { x: originX, y: originY },
      colors: GOLD_COLORS,
      shapes: ['circle', 'square'],
      scalar: 1.2,
      ticks: 180,
      gravity: 0.9,
      drift: 0.1,
    });

    // Wave 2: Glittering gold dust
    setTimeout(() => {
      confetti({
        particleCount: 25,
        angle: 95,
        spread: 50,
        origin: { x: originX, y: originY },
        colors: GOLD_COLORS,
        shapes: ['star', 'circle'],
        scalar: 0.9,
        ticks: 200,
        gravity: 0.7,
      });
    }, 120);
  } catch {
    // Graceful fallback
  }
};

/**
 * Synchronized celebration for EXP and Gold rewards
 */
export const triggerRewardParticles = (expGained: number, goldGained: number) => {
  try {
    if (expGained > 0 && goldGained > 0) {
      // Dual side burst: EXP from left, Gold from right
      triggerExpParticles(0.28, 0.62);
      triggerGoldParticles(0.72, 0.62);

      // Central fireworks shower after 180ms
      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 90,
          spread: 80,
          origin: { x: 0.5, y: 0.55 },
          colors: [...EXP_COLORS, ...GOLD_COLORS],
          shapes: ['star', 'circle'],
          scalar: 1.1,
          ticks: 220,
          gravity: 0.75,
        });
      }, 180);
    } else if (expGained > 0) {
      triggerExpParticles(0.5, 0.6);
    } else if (goldGained > 0) {
      triggerGoldParticles(0.5, 0.6);
    }
  } catch {
    // Ignore canvas errors
  }
};
