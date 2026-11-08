'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface FallingLeavesProps {
  className?: string;
  leafCount?: number;
  interactive?: boolean;
  fullScreen?: boolean;
  shapes?: string[];
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
  primaryColor: string;
  secondaryColor: string;
  stemColor: string;
  veinColor: string;
  opacity: number;
}

// True autumn maple leaf palettes: fiery crimson red, burnt amber-orange, golden saffron, deep scarlet wine
const AUTUMN_MAPLE_PALETTES = [
  {
    primary: '#DC2626', // Vibrant crimson red
    secondary: '#EA580C', // Burnt orange highlight
    stem: '#7F1D1D',
    vein: 'rgba(127, 29, 29, 0.75)',
  },
  {
    primary: '#EA580C', // Autumn fiery orange
    secondary: '#F59E0B', // Golden amber tip
    stem: '#9A3412',
    vein: 'rgba(154, 52, 18, 0.75)',
  },
  {
    primary: '#B91C1C', // Deep maple scarlet
    secondary: '#C2410C', // Russet red
    stem: '#781515',
    vein: 'rgba(120, 21, 21, 0.8)',
  },
  {
    primary: '#F59E0B', // Rich golden yellow
    secondary: '#D97706', // Warm honey amber
    stem: '#B45309',
    vein: 'rgba(180, 83, 9, 0.75)',
  },
  {
    primary: '#991B1B', // Deep burgundy / maroon
    secondary: '#DC2626', // Bright red accent
    stem: '#5F1212',
    vein: 'rgba(95, 18, 18, 0.85)',
  },
  {
    primary: '#D97706', // Warm amber ochre
    secondary: '#EF4444', // Red-tinged margin
    stem: '#92400E',
    vein: 'rgba(146, 64, 14, 0.75)',
  },
];

function drawMapleLeaf(
  ctx: CanvasRenderingContext2D,
  size: number,
  primaryColor: string,
  secondaryColor: string,
  stemColor: string,
  veinColor: string,
  opacity: number
) {
  ctx.save();
  ctx.globalAlpha = opacity;

  // Normalized scaling factor for maple leaf
  const s = size / 32;

  // Create subtle radial/linear autumn gradient across the leaf blade
  const grad = ctx.createLinearGradient(0, 14 * s, 0, -18 * s);
  grad.addColorStop(0, stemColor);
  grad.addColorStop(0.35, primaryColor);
  grad.addColorStop(1, secondaryColor);

  ctx.beginPath();
  // 5-lobe serrated maple leaf contour (Acer palmatum / saccharum geometry)
  ctx.moveTo(0, 15 * s); // stem base
  ctx.lineTo(0, 6 * s);

  // Lower Left Lobe
  ctx.lineTo(-6 * s, 8 * s);
  ctx.lineTo(-10 * s, 6 * s);
  ctx.lineTo(-7 * s, 2 * s);
  ctx.lineTo(-13 * s, 1.5 * s);
  ctx.lineTo(-15 * s, -2.5 * s);
  ctx.lineTo(-9 * s, -4.5 * s);

  // Upper Left Middle Lobe
  ctx.lineTo(-12 * s, -10 * s);
  ctx.lineTo(-8.5 * s, -12 * s);
  ctx.lineTo(-4.5 * s, -8.5 * s);

  // Central Apex Lobe
  ctx.lineTo(-4.5 * s, -14 * s);
  ctx.lineTo(0, -18.5 * s);
  ctx.lineTo(4.5 * s, -14 * s);

  // Upper Right Middle Lobe
  ctx.lineTo(4.5 * s, -8.5 * s);
  ctx.lineTo(8.5 * s, -12 * s);
  ctx.lineTo(12 * s, -10 * s);

  // Lower Right Lobe
  ctx.lineTo(9 * s, -4.5 * s);
  ctx.lineTo(15 * s, -2.5 * s);
  ctx.lineTo(13 * s, 1.5 * s);
  ctx.lineTo(7 * s, 2 * s);
  ctx.lineTo(10 * s, 6 * s);
  ctx.lineTo(6 * s, 8 * s);
  ctx.lineTo(0, 6 * s);
  ctx.closePath();

  ctx.fillStyle = grad;
  ctx.fill();

  // Subtle leaf boundary outline
  ctx.strokeStyle = stemColor;
  ctx.lineWidth = Math.max(0.65, 0.75 * s);
  ctx.stroke();

  // Main primary stem & vein
  ctx.beginPath();
  ctx.moveTo(0, 15 * s);
  ctx.lineTo(0, -15 * s);

  // Lateral primary veins spreading to outer lobes
  ctx.moveTo(0, 2 * s);
  ctx.lineTo(-10 * s, -6 * s);
  ctx.moveTo(0, 2 * s);
  ctx.lineTo(10 * s, -6 * s);

  ctx.moveTo(0, 5 * s);
  ctx.lineTo(-8 * s, 5 * s);
  ctx.moveTo(0, 5 * s);
  ctx.lineTo(8 * s, 5 * s);

  ctx.strokeStyle = veinColor;
  ctx.lineWidth = Math.max(0.5, 0.65 * s);
  ctx.stroke();

  ctx.restore();
}

export function FallingLeaves({
  className,
  leafCount = 38,
  interactive = true,
  fullScreen = false,
}: FallingLeavesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -2000, y: -2000, vx: 0, vy: 0, lastX: 0, lastY: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = fullScreen ? window.innerWidth : 1200;
    let height = fullScreen ? window.innerHeight : 800;

    const resize = () => {
      if (fullScreen) {
        width = window.innerWidth;
        height = window.innerHeight;
      } else {
        const rect = canvas.getBoundingClientRect();
        width = Math.max(320, Math.floor(rect.width));
        height = Math.max(320, Math.floor(rect.height));
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => resize())
      : null;

    if (resizeObserver && canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Initialize autumn maple leaf particles with varying sizes and authentic hues
    const leaves: LeafParticle[] = [];
    for (let i = 0; i < leafCount; i++) {
      const palette = AUTUMN_MAPLE_PALETTES[i % AUTUMN_MAPLE_PALETTES.length];
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 20 + Math.random() * 26, // 20px to 46px realistic maple leaf spans
        speedY: 0.7 + Math.random() * 0.95, // gentle autumn descent
        speedX: -0.3 + Math.random() * 0.6, // natural sideways breeze
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.022,
        oscillation: Math.random() * Math.PI * 2,
        oscSpeed: 0.014 + Math.random() * 0.024,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.018 + Math.random() * 0.028,
        primaryColor: palette.primary,
        secondaryColor: palette.secondary,
        stemColor: palette.stem,
        veinColor: palette.vein,
        opacity: 0.82 + Math.random() * 0.16, // rich, vivid visibility (not washed out)
      });
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      let x = e.clientX;
      let y = e.clientY;
      if (!fullScreen) {
        const rect = canvas.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      mouseRef.current.vx = x - mouseRef.current.lastX;
      mouseRef.current.vy = y - mouseRef.current.lastY;
      mouseRef.current.lastX = x;
      mouseRef.current.lastY = y;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    const onPointerLeave = () => {
      mouseRef.current.x = -2000;
      mouseRef.current.y = -2000;
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

          // Natural swaying leaf drift
          const driftX = Math.sin(leaf.oscillation) * 1.25 + leaf.speedX;
          leaf.x += driftX;
          leaf.y += leaf.speedY;

          // Interactive wind gust from pointer
          const dx = leaf.x - mouseRef.current.x;
          const dy = leaf.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const force = (1 - dist / 160) * 4.2;
            leaf.x += (dx / (dist || 1)) * force + mouseRef.current.vx * 0.14;
            leaf.y += (dy / (dist || 1)) * force + mouseRef.current.vy * 0.14;
            leaf.rotation += (dx > 0 ? 1 : -1) * 0.06;
          }

          // Cycle when falling off the bottom
          if (leaf.y > height + 50) {
            leaf.y = -50;
            leaf.x = Math.random() * width;
          }
          if (leaf.x > width + 50) leaf.x = -50;
          if (leaf.x < -50) leaf.x = width + 50;
        }

        // Realistic 3D leaf tumble (flipping horizontally as it drops)
        const scaleFlip = Math.cos(leaf.flip);

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.scale(scaleFlip, 1);

        drawMapleLeaf(
          ctx,
          leaf.size,
          leaf.primaryColor,
          leaf.secondaryColor,
          leaf.stemColor,
          leaf.veinColor,
          leaf.opacity
        );

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
      resizeObserver?.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [leafCount, interactive, fullScreen, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none select-none',
        fullScreen
          ? 'fixed inset-0 h-screen w-screen z-30 pointer-events-none'
          : 'absolute inset-0 h-full w-full z-10 pointer-events-none',
        className
      )}
    />
  );
}
