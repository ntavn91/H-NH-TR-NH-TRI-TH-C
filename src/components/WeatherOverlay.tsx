/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface WeatherOverlayProps {
  chapterId: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacitySpeed: number;
  color: string;
  angle?: number;
  angularSpeed?: number;
  length?: number;
  pulse?: number;
  pulseSpeed?: number;
  glyph?: string;
}

export const WeatherOverlay: React.FC<WeatherOverlayProps> = ({ chapterId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize particles tailored to the current chapter's weather theme
    const particles: Particle[] = [];
    const count = chapterId === 1 ? 55 : chapterId === 2 ? 65 : chapterId === 3 ? 45 : 50;

    const mathGlyphs = ['x', 'y', 'z', 'f(x)', '²', '³', '∑', 'π', '√', 'α', 'β', '∞'];

    for (let i = 0; i < count; i++) {
      if (chapterId === 1) {
        // Ch 1: Crystal Rain & Morning Valley Dew
        const isRain = Math.random() > 0.35;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: isRain ? Math.random() * 1.5 + 0.8 : Math.random() * 2.5 + 1.2,
          length: isRain ? Math.random() * 18 + 12 : 0,
          speedX: Math.random() * 0.8 - 0.2, // Gentle slight angle
          speedY: isRain ? Math.random() * 5 + 7 : Math.random() * 0.6 + 0.3,
          opacity: Math.random() * 0.45 + 0.2,
          opacitySpeed: Math.random() * 0.02 + 0.005,
          color: isRain
            ? Math.random() > 0.4 ? 'rgba(147, 197, 253, ' : 'rgba(192, 132, 252, '
            : 'rgba(216, 180, 254, ',
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.04 + 0.02,
        });
      } else if (chapterId === 2) {
        // Ch 2: High Stratosphere Cloud Winds & Swirling Snow Flurries
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 2.2 + 1.2, // Drifting sideways with sky island wind
          speedY: Math.random() * 1.2 + 0.6,
          opacity: Math.random() * 0.5 + 0.25,
          opacitySpeed: Math.random() * 0.015 + 0.005,
          color: Math.random() > 0.3 ? 'rgba(255, 255, 255, ' : 'rgba(186, 230, 253, ',
          angle: Math.random() * Math.PI * 2,
          angularSpeed: (Math.random() - 0.5) * 0.04,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.03 + 0.01,
        });
      } else if (chapterId === 3) {
        // Ch 3: Luminescent Purple Swamp Fog & Rising Bioluminescent Spores
        const isFogWisp = Math.random() > 0.6;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: isFogWisp ? Math.random() * 60 + 40 : Math.random() * 3.5 + 1.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: -(Math.random() * 0.8 + 0.3), // Rising upward from swamp
          opacity: isFogWisp ? Math.random() * 0.12 + 0.05 : Math.random() * 0.6 + 0.3,
          opacitySpeed: Math.random() * 0.01 + 0.005,
          color: isFogWisp
            ? 'rgba(168, 85, 247, '
            : Math.random() > 0.5
            ? 'rgba(217, 70, 239, '
            : 'rgba(52, 211, 153, ',
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.03 + 0.015,
        });
      } else {
        // Ch 4: Golden Knowledge Embers & Floating Mathematical Glyphs
        const isGlyph = Math.random() > 0.75;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: isGlyph ? 14 : Math.random() * 2.8 + 1.2,
          speedX: (Math.random() - 0.5) * 0.9,
          speedY: -(Math.random() * 1.0 + 0.4), // Rising upward like ancient embers
          opacity: Math.random() * 0.65 + 0.25,
          opacitySpeed: Math.random() * 0.02 + 0.008,
          color: Math.random() > 0.3 ? 'rgba(251, 191, 36, ' : 'rgba(245, 158, 11, ',
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.04 + 0.02,
          glyph: isGlyph ? mathGlyphs[Math.floor(Math.random() * mathGlyphs.length)] : undefined,
        });
      }
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Render weather layers
      if (chapterId === 1) {
        // --- Chapter 1: Crystal Rain & Sparkling Dew ---
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.pulse !== undefined && p.pulseSpeed) p.pulse += p.pulseSpeed;

          // Wrap around edges
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;

          if (p.length && p.length > 0) {
            // Draw Crystal Rain Streaks
            const currentAlpha = p.opacity;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.speedX * 2, p.y + p.length);
            ctx.strokeStyle = `${p.color}${currentAlpha})`;
            ctx.lineWidth = p.size;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Tiny crystal glint head
            ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.9})`;
            ctx.beginPath();
            ctx.arc(p.x + p.speedX * 2, p.y + p.length, p.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Floating crystal mist mote
            const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse || 0));
            ctx.fillStyle = `${p.color}${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (chapterId === 2) {
        // --- Chapter 2: Stratosphere Cloud Wind & Swirling Snow ---
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX;
          p.y += p.speedY + Math.sin(frame * 0.02 + i) * 0.4;
          if (p.angle !== undefined && p.angularSpeed) p.angle += p.angularSpeed;

          // Wrap around edges
          if (p.x > width + 30) {
            p.x = -30;
            p.y = Math.random() * height;
          }
          if (p.y > height + 30) {
            p.y = -30;
            p.x = Math.random() * width;
          }

          const alpha = p.opacity * (0.8 + 0.2 * Math.sin(frame * 0.03 + i));

          // Soft glowing snowflake
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          grad.addColorStop(0, `${p.color}${alpha})`);
          grad.addColorStop(0.5, `${p.color}${alpha * 0.4})`);
          grad.addColorStop(1, `${p.color}0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();

          // Crisp crystalline center
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (chapterId === 3) {
        // --- Chapter 3: Enchanted Purple Swamp Mist & Rising Luminescent Spores ---
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX + Math.sin(frame * 0.015 + i) * 0.6;
          p.y += p.speedY;
          if (p.pulse !== undefined && p.pulseSpeed) p.pulse += p.pulseSpeed;

          // Wrap around edges
          if (p.y < -80) {
            p.y = height + 40;
            p.x = Math.random() * width;
          }
          if (p.x < -80) p.x = width + 40;
          if (p.x > width + 80) p.x = -80;

          const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse || 0));

          if (p.size > 20) {
            // Rolling soft swamp fog cloud
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            grad.addColorStop(0, `${p.color}${alpha * 0.8})`);
            grad.addColorStop(0.5, `${p.color}${alpha * 0.3})`);
            grad.addColorStop(1, `${p.color}0)`);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Glowing bioluminescent swamp firefly spore
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
            grad.addColorStop(0, `${p.color}${alpha})`);
            grad.addColorStop(0.4, `${p.color}${alpha * 0.5})`);
            grad.addColorStop(1, `${p.color}0)`);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else {
        // --- Chapter 4: Golden Knowledge Embers & Floating Mathematical Glyphs ---
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX + Math.sin(frame * 0.02 + i) * 0.5;
          p.y += p.speedY;
          if (p.pulse !== undefined && p.pulseSpeed) p.pulse += p.pulseSpeed;

          // Wrap around edges
          if (p.y < -30) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
          if (p.x < -30) p.x = width + 20;
          if (p.x > width + 30) p.x = -20;

          const alpha = p.opacity * (0.75 + 0.25 * Math.sin(p.pulse || 0));

          if (p.glyph) {
            // Floating mathematical glyph
            ctx.font = 'bold 12px "JetBrains Mono", monospace';
            ctx.fillStyle = `rgba(251, 191, 36, ${alpha * 0.7})`;
            ctx.fillText(p.glyph, p.x, p.y);
          } else {
            // Radiant golden ember
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2);
            grad.addColorStop(0, `rgba(254, 240, 138, ${alpha})`);
            grad.addColorStop(0.5, `${p.color}${alpha * 0.6})`);
            grad.addColorStop(1, `${p.color}0)`);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
            ctx.fill();

            // White hot core
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [chapterId]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
