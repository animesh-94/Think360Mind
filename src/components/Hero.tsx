'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { FftOceanBackground } from './fft-ocean';

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: SMOOTH_EASE },
        };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[100svh] bg-black text-white overflow-hidden flex flex-col justify-between"
    >
      {/* Vercel vgpu "Particles ocean" (fft-ocean) WebGPU background with subtle Neon Volt crest glint */}
      <div className="absolute inset-0 z-0">
        <FftOceanBackground />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_48%_at_50%_42%,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.22)_64%,rgba(0,0,0,0.68)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/65 to-transparent"
        />
      </div>

      {/* Centered Editorial Hero Typography (Pure Black & White, Restrained Neon Hover Only) */}
      <div className="relative z-10 mx-auto w-full max-w-[1320px] flex-1 flex flex-col items-center justify-center px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-12 text-center">
        <motion.h1
          id="hero-heading"
          {...reveal(0.08)}
          className="max-w-5xl font-sans text-[clamp(2.65rem,8.4vw,6.35rem)] font-extrabold tracking-[-0.045em] leading-[1.01] text-white"
        >
          <span className="block text-white">Building Brands</span>
          <span className="mt-1 block">
            <span className="text-white">From Every </span>
            <span className="font-display-serif italic font-normal text-white">
              Angle.
            </span>
          </span>
        </motion.h1>

        <motion.p
          {...reveal(0.18)}
          className="mt-6 sm:mt-7 max-w-xl sm:max-w-2xl font-sans text-[15px] sm:text-lg lg:text-[19px] font-normal leading-relaxed text-neutral-300"
        >
          Think360 Media is your 360° Growth Partner: uniting branding, creativity, media,
          performance, and communication under one shared vision.
        </motion.p>

        {/* Crisp Monochrome Action Row (Neon Volt reserved strictly for tactile hover feedback) */}
        <motion.div
          {...reveal(0.28)}
          className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          <a
            href="#contact"
            className="group inline-flex min-h-[50px] w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-white px-8 py-3 font-sans text-[13px] font-extrabold uppercase tracking-[0.12em] text-black transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#CCFF00] hover:text-black active:scale-[0.98]"
          >
            <span>Let&apos;s Build What&apos;s Next</span>
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>

          <a
            href="#work"
            className="group inline-flex min-h-[50px] w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-white/25 bg-black/45 px-7 py-3 font-sans text-[13px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white hover:bg-white/10"
          >
            <span>Selected Work</span>
            <ArrowDown
              className="size-4 text-neutral-300 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-white"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>

      {/* Minimal Scroll Cue */}
      <motion.div
        {...reveal(0.38)}
        className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-8 pb-7 flex items-center justify-center"
      >
        <a
          href="#work"
          aria-label="Scroll to selected work"
          className="group inline-flex min-h-[44px] flex-col items-center justify-center gap-1.5 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-400 transition-colors hover:text-white"
        >
          <span>Scroll</span>
          <span className="h-5 w-px bg-gradient-to-b from-white/70 to-transparent transition-all duration-300 group-hover:h-7 group-hover:from-[#CCFF00]" />
        </a>
      </motion.div>
    </section>
  );
}
