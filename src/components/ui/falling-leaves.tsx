'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface FallingLeavesProps {
  className?: string;
  leafCount?: number;
  interactive?: boolean;
}

interface LeafParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  oscillation: number;
  oscSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  stemColor: string;
}

// Crisp monochrome maple leaf paths and palettes
const MAPLE_PALETTE = [
  { fill: 'rgba(255, 255, 255, 0.42)', stroke: 'rgba(255, 255, 255, 0.75)' },
  { fill: 'rgba(228, 228, 231, 0.32)', stroke: 'rgba(255, 255, 255, 0.55)' },
  { fill: 'rgba(161, 161, 170, 0.28)', stroke: 'rgba(212, 212, 216, 0.50)' },
  { fill: 'rgba(255, 255, 255, 0.20)', stroke: 'rgba(255, 255, 255, 0.45)' },
];

function drawMapleLeaf(
  ctx: CanvasRenderingContext2D,
  size: number,
  fillColor: string,
  strokeColor: string
) {
  ctx.save();
  ctx.beginPath();
  // Realistic 5-lobe serrated maple leaf path normalized to [-size/2, -size/2, size, size]
  const s = size / 32;

  ctx.moveTo(0, 14 * s); // stem base
  ctx.lineTo(0, 6 * s);

  // Bottom left lobe
  ctx.lineTo(-6 * s, 8 * s);
  ctx.lineTo(-9 * s, 6 * s);
  ctx.lineTo(-7 * s, 2 * s);
  ctx.lineTo(-12 * s, 2 * s);
  ctx.lineTo(-14 * s, -2 * s);
  ctx.lineTo(-8 * s, -4 * s);

  // Left middle lobe
  ctx.lineTo(-11 * s, -9 * s);
  ctx.lineTo(-8 * s, -11 * s);
  ctx.lineTo(-4 * s, -8 * s);

  // Central apex lobe
  ctx.lineTo(-4 * s, -13 * s);
  ctx.lineTo(0, -17 * s);
  ctx.lineTo(4 * s, -13 * s);

  // Right middle lobe
  ctx.lineTo(4 * s, -8 * s);
  ctx.lineTo(8 * s, -11 * s);
  ctx.lineTo(11 * s, -9 * s);

  // Bottom right lobe
  ctx.lineTo(8 * s, -4 * s);
  ctx.lineTo(14 * s, -2 * s);
  ctx.lineTo(12 * s, 2 * s);
  ctx.lineTo(7 * s, 2 * s);
  ctx.lineTo(9 * s, 6 * s);
  ctx.lineTo(6 * s, 8 * s);
  ctx.lineTo(0, 6 * s);
  ctx.closePath();

  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = Math.max(0.75, 0.9 * s);
  ctx.stroke();

  // Primary vein
  ctx.beginPath();
  ctx.moveTo(0, 14 * s);
  ctx.lineTo(0, -14 * s);
  // Lateral veins
  ctx.moveTo(0, 2 * s);
  ctx.lineTo(-9 * s, -5 * s);
  ctx.moveTo(0, 2 * s);
  ctx.lineTo(9 * s, -5 * s);
  ctx.moveTo(0, 5 * s);
  ctx.lineTo(-6 * s, 5 * s);
  ctx.moveTo(0, 5 * s);
  ctx.lineTo(6 * s, 5 * s);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = Math.max(0.5, 0.6 * s);
  ctx.stroke();

  ctx.restore();
}

export function FallingLeaves({
  className,
  leafCount = 28,
  interactive = true,
}: FallingLeavesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 1200;
    let height = 800;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(320, Math.floor(rect.width));
      height = Math.max(320, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize realistic maple leaf particles
    const leaves: LeafParticle[] = [];
    for (let i = 0; i < leafCount; i++) {
      const palette = MAPLE_PALETTE[i % MAPLE_PALETTE.length];
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 18 + Math.random() * 22,
        speedY: 0.6 + Math.random() * 0.9,
        speedX: -0.2 + Math.random() * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        oscillation: Math.random() * Math.PI * 2,
        oscSpeed: 0.015 + Math.random() * 0.025,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.02 + Math.random() * 0.03,
        color: palette.fill,
        stemColor: palette.stroke,
      });
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.vx = x - mouseRef.current.lastX;
      mouseRef.current.vy = y - mouseRef.current.lastY;
      mouseRef.current.lastX = x;
      mouseRef.current.lastY = y;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    const onPointerLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);

    let animId = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];

        if (!prefersReducedMotion) {
          leaf.oscillation += leaf.oscSpeed;
          leaf.flip += leaf.flipSpeed;
          leaf.rotation += leaf.rotSpeed;

          // Natural drifting flutter
          const driftX = Math.sin(leaf.oscillation) * 1.1 + leaf.speedX;
          leaf.x += driftX;
          leaf.y += leaf.speedY;

          // Mouse wind gust displacement
          const dx = leaf.x - mouseRef.current.x;
          const dy = leaf.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (1 - dist / 140) * 3.5;
            leaf.x += (dx / (dist || 1)) * force + mouseRef.current.vx * 0.12;
            leaf.y += (dy / (dist || 1)) * force + mouseRef.current.vy * 0.12;
            leaf.rotation += (dx > 0 ? 1 : -1) * 0.05;
          }

          // Loop back to top when falling past bottom
          if (leaf.y > height + 40) {
            leaf.y = -40;
            leaf.x = Math.random() * width;
          }
          if (leaf.x > width + 40) leaf.x = -40;
          if (leaf.x < -40) leaf.x = width + 40;
        }

        // 3D tumble projection (scaleX simulates leaf flipping in wind)
        const scaleFlip = Math.cos(leaf.flip);

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.scale(scaleFlip, 1);

        drawMapleLeaf(ctx, leaf.size, leaf.color, leaf.stemColor);

        ctx.restore();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [leafCount, interactive, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full select-none z-10', className)}
    />
  );
}
