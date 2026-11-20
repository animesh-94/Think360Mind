'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export const Hero = ({ className }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn('w-full relative h-screen overflow-hidden bg-black', className)}>
      {/* Base Deep-Black to Neon Volt Radial Horizon */}
      <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_12%,#000000_38%,rgba(140,210,0,0.22)_74%,rgba(204,255,0,0.46)_100%)]" />

      {/* Subtle Neon Perspective Grid masked softly into darkness */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(204,255,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(204,255,0,0.06)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_75%,#000_30%,transparent_100%)]"
      />

      {/* Living Liquid Neon Aurora Orbs (GPU-composited slow drift) */}
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ['-6%', '8%', '-6%'],
                y: ['0%', '-10%', '0%'],
                scale: [1, 1.14, 1],
                opacity: [0.38, 0.68, 0.38],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none will-change-transform absolute -bottom-32 -left-24 h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle,rgba(204,255,0,0.48)_0%,rgba(204,255,0,0.12)_45%,transparent_72%)] blur-3xl"
      />

      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ['8%', '-8%', '8%'],
                y: ['0%', '-8%', '0%'],
                scale: [1.08, 0.94, 1.08],
                opacity: [0.32, 0.62, 0.32],
              }
        }
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none will-change-transform absolute -bottom-28 -right-24 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(180,255,0,0.44)_0%,rgba(204,255,0,0.1)_48%,transparent_72%)] blur-3xl"
      />

      {/* Silky Sweeping Neon Horizon Beam */}
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ['-30%', '30%', '-30%'],
                opacity: [0.25, 0.7, 0.25],
              }
        }
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none will-change-transform absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-[60%] bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent shadow-[0_0_28px_6px_rgba(204,255,0,0.6)]"
      />
    </div>
  );
};
