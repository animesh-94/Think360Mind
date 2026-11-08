'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-*/:=.';

interface Cell {
  x: number;
  y: number;
  isInside: boolean;
  glyph: string;
  rerollInterval: number;
  lastReroll: number;
  baseBrightness: number;
}

export function LiquidWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [cursorTarget, setCursorTarget] = useState({ x: -999, y: -999 });
  const [isPointerOver, setIsPointerOver] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    let animId: number;
    const updateCursor = () => {
      setCursorPos((prev) => ({
        x: prev.x + (cursorTarget.x - prev.x) * 0.15,
        y: prev.y + (cursorTarget.y - prev.y) * 0.15,
      }));
      animId = requestAnimationFrame(updateCursor);
    };
    animId = requestAnimationFrame(updateCursor);
    return () => cancelAnimationFrame(animId);
  }, [cursorTarget]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cellSize = 12;
    let cells: Cell[] = [];

    let wave1: Float32Array = new Float32Array(0);
    let wave2: Float32Array = new Float32Array(0);
    const damping = 0.965;

    let isVisible = true;
    let isTabVisible = !document.hidden;
    let animFrameId: number;

    const mousePos = { x: -999, y: -999 };

    const initGrid = () => {
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width || container.clientWidth || 1280);
      height = Math.floor(Math.max(300, Math.min(440, width * 0.34)));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      cellSize = width < 640 ? 9 : 13;
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);

      wave1 = new Float32Array(cols * rows);
      wave2 = new Float32Array(cols * rows);

      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const octx = offscreen.getContext('2d');
      if (!octx) return;

      octx.clearRect(0, 0, width, height);
      octx.fillStyle = '#FFFFFF';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';

      let fontSize = Math.floor(width * 0.22);
      octx.font = `800 ${fontSize}px Manrope, sans-serif`;
      const measured = octx.measureText('Think360').width;
      if (measured > width * 0.94) {
        fontSize = Math.floor(fontSize * ((width * 0.94) / measured));
        octx.font = `800 ${fontSize}px Manrope, sans-serif`;
      }

      octx.fillText('Think360', width / 2, height / 2);
      const imgData = octx.getImageData(0, 0, width, height).data;

      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = Math.floor(c * cellSize + cellSize / 2);
          const py = Math.floor(r * cellSize + cellSize / 2);
          if (px >= width || py >= height) continue;

          const idx = (py * width + px) * 4;
          const alpha = imgData[idx + 3];
          const isInside = alpha > 90;

          let hasNeighbor = false;
          if (!isInside) {
            const checkDist = cellSize * 2;
            for (let dy = -checkDist; dy <= checkDist; dy += checkDist) {
              for (let dx = -checkDist; dx <= checkDist; dx += checkDist) {
                const nx = Math.min(width - 1, Math.max(0, px + dx));
                const ny = Math.min(height - 1, Math.max(0, py + dy));
                if (imgData[(ny * width + nx) * 4 + 3] > 90) {
                  hasNeighbor = true;
                }
              }
            }
          }

          const isDust = !isInside && (hasNeighbor ? Math.random() < 0.16 : Math.random() < 0.01);
          if (isInside || isDust) {
            cells.push({
              x: c * cellSize + cellSize / 2,
              y: r * cellSize + cellSize / 2,
              isInside,
              glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
              rerollInterval: 80 + Math.random() * 520,
              lastReroll: performance.now() - Math.random() * 600,
              baseBrightness: isInside ? 0.38 + Math.random() * 0.45 : 0.12 + Math.random() * 0.15,
            });
          }
        }
      }
    };

    const stepWaves = () => {
      for (let r = 1; r < rows - 1; r++) {
        const rowOffset = r * cols;
        for (let c = 1; c < cols - 1; c++) {
          const i = rowOffset + c;
          const avg = (wave1[i - 1] + wave1[i + 1] + wave1[i - cols] + wave1[i + cols]) * 0.5;
          wave2[i] = (avg - wave2[i]) * damping;
        }
      }
      const temp = wave1;
      wave1 = wave2;
      wave2 = temp;
    };

    const addRipple = (x: number, y: number, strength = 28) => {
      const cc = Math.floor(x / cellSize);
      const rr = Math.floor(y / cellSize);
      const radius = 3;
      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          const r = rr + dr;
          const c = cc + dc;
          if (r > 0 && r < rows - 1 && c > 0 && c < cols - 1) {
            const dist = Math.sqrt(dr * dr + dc * dc);
            if (dist <= radius) {
              wave1[r * cols + c] += strength * (1 - dist / (radius + 1));
            }
          }
        }
      }
    };

    const render = (now: number) => {
      if (!prefersReducedMotion && isVisible && isTabVisible) {
        stepWaves();
      }

      ctx.clearRect(0, 0, width, height);
      ctx.font = `600 ${Math.max(8, cellSize - 2)}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const pointerRadius = 120;
      const clearRadius = isTouchDevice ? 0 : 44;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const dx = cell.x - mousePos.x;
        const dy = cell.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (clearRadius > 0 && dist < clearRadius) {
          continue;
        }

        const isNearPointer = dist < pointerRadius;
        const effectiveInterval = isNearPointer ? 45 : cell.rerollInterval;

        if (!prefersReducedMotion && now - cell.lastReroll > effectiveInterval) {
          cell.glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          cell.lastReroll = now;
        }

        const c = Math.min(cols - 1, Math.max(0, Math.floor(cell.x / cellSize)));
        const r = Math.min(rows - 1, Math.max(0, Math.floor(cell.y / cellSize)));
        const waveVal = wave1[r * cols + c] || 0;
        const crest = Math.min(1, Math.max(0, Math.abs(waveVal) / 14));

        const pointerBoost = isNearPointer ? (1 - dist / pointerRadius) * 0.5 : 0;
        const alpha = Math.min(1, cell.baseBrightness + pointerBoost + crest * 0.55);

        const offsetX = Math.max(-2.5, Math.min(2.5, waveVal * 0.14));
        const offsetY = Math.max(-2.5, Math.min(2.5, waveVal * 0.14));

        if (crest > 0.2 || pointerBoost > 0.18 || alpha > 0.68) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
        } else {
          ctx.fillStyle = `rgba(180, 180, 180, ${alpha.toFixed(2)})`;
        }

        ctx.fillText(cell.glyph, cell.x + offsetX, cell.y + offsetY);
      }

      if (!prefersReducedMotion && isVisible && isTabVisible) {
        animFrameId = requestAnimationFrame(render);
      }
    };

    initGrid();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        initGrid();
        render(performance.now());
      });
    }

    if (!prefersReducedMotion) {
      animFrameId = requestAnimationFrame(render);
    } else {
      render(0);
    }

    const resizeObserver = new ResizeObserver(() => {
      initGrid();
      if (prefersReducedMotion) render(performance.now());
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (!wasVisible && isVisible && !prefersReducedMotion) {
            cancelAnimationFrame(animFrameId);
            animFrameId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && isVisible && !prefersReducedMotion) {
        cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mousePos.x = x;
      mousePos.y = y;

      setCursorTarget({ x: e.clientX, y: e.clientY });
      setIsPointerOver(true);

      addRipple(x, y, 26);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const t = e.touches[0];
        const x = t.clientX - rect.left;
        const y = t.clientY - rect.top;
        addRipple(x, y, 32);
      }
    };

    const handlePointerLeave = () => {
      mousePos.x = -999;
      mousePos.y = -999;
      setIsPointerOver(false);
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mouseleave', handlePointerLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('mouseleave', handlePointerLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isTouchDevice]);

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="relative w-full h-[320px] sm:h-[420px] flex items-center justify-center select-none overflow-hidden"
      >
        <Link
          href="/contact"
          aria-label="Contact Think360 Media"
          className="block w-full h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-white"
        >
          <canvas ref={canvasRef} aria-hidden="true" className="w-full h-full block" />
        </Link>

        {!isTouchDevice && isPointerOver && cursorPos.x > 0 && (
          <span
            aria-hidden="true"
            style={{
              transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`,
            }}
            className="fixed top-0 left-0 pointer-events-none z-50 px-5 py-2.5 rounded-full bg-white text-black text-xs font-extrabold tracking-wide shadow-[0_6px_24px_rgba(0,0,0,0.65)] flex items-center gap-1.5"
          >
            <span>Contact Us</span>
            <span>→</span>
          </span>
        )}

        {isTouchDevice && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold tracking-wide"
            >
              <span>Contact Us</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
