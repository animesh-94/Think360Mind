'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

export interface FuturisticGlowCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  active?: boolean;
  tilt?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  ariaLabel?: string;
}

/**
 * Clean monochrome editorial card primitive with subtle pointer-tracked
 * hairline sheen and damped 3D micro-tilt (zero neon border overload or HUD clutter).
 */
export function FuturisticGlowCard({
  children,
  className,
  innerClassName,
  active = false,
  tilt = true,
  onClick,
  onMouseEnter,
  onFocus,
  ariaLabel,
}: FuturisticGlowCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 190, damping: 26, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 190, damping: 26, mass: 0.5 });

  const spotlightBg = useMotionTemplate`radial-gradient(420px circle at ${mouseX}% ${mouseY}%, rgba(255, 255, 255, 0.12), transparent 65%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(px);
    mouseY.set(py);

    if (tilt) {
      const rx = ((py - 50) / 50) * -3.5;
      const ry = ((px - 50) / 50) * 4.2;
      rawRotateX.set(rx);
      rawRotateY.set(ry);
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter?.();
      }}
      onFocus={() => {
        setIsHovered(true);
        onFocus?.();
      }}
      onBlur={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label={ariaLabel}
      style={
        prefersReducedMotion || !tilt
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1200,
              transformStyle: 'preserve-3d',
            }
      }
      className={cn(
        'group relative block w-full overflow-hidden rounded-[20px] border bg-[#0A0A0B] text-left transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black will-change-transform',
        active
          ? 'border-white/35 shadow-[0_28px_70px_rgba(0,0,0,0.88)]'
          : 'border-white/12 shadow-[0_18px_45px_rgba(0,0,0,0.75)] hover:border-white/30',
        className
      )}
    >
      <div className={cn('relative h-full w-full overflow-hidden', innerClassName)}>
        {!prefersReducedMotion && (
          <motion.span
            aria-hidden="true"
            style={{ background: spotlightBg }}
            className={cn(
              'pointer-events-none absolute inset-0 z-20 transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          />
        )}
        {children}
      </div>
    </motion.button>
  );
}
