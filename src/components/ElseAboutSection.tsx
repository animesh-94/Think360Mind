'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Hero as AboutBackground } from '@/components/ui/tailwind-css-background-snippet';

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PILLARS = [
  { code: '01', label: 'Brand Strategy' },
  { code: '02', label: 'Studio & Film' },
  { code: '03', label: 'Performance Tech' },
];

export function ElseAboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.14,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: SMOOTH_EASE,
      },
    },
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative sticky top-0 z-20 flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black text-white py-24 sm:py-32 border-t border-white/10 shadow-[0_-28px_70px_rgba(0,0,0,0.9)]"
    >
      {/* Full-bleed Living Neon Background Snippet */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <AboutBackground className="h-full w-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 text-center"
      >
        {/* Eyebrow with Expanding Neon Hairlines */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-8 sm:w-14 bg-gradient-to-l from-[#CCFF00] to-transparent"
          />
          <span className="inline-flex items-center gap-2 font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#CCFF00]">
            <span
              className="size-1.5 rounded-full bg-[#CCFF00] shadow-[0_0_10px_#CCFF00] motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <span>About</span>
          </span>
          <span
            aria-hidden="true"
            className="h-px w-8 sm:w-14 bg-gradient-to-r from-[#CCFF00] to-transparent"
          />
        </motion.div>

        {/* Previous Editorial Typography: Manrope Display Sans + Newsreader Italic Serif */}
        <motion.h2
          id="about-heading"
          variants={itemVariants}
          className="mt-6 sm:mt-7 font-sans text-[2.1rem] sm:text-5xl lg:text-[58px] font-extrabold tracking-[-0.035em] leading-[1.08] text-white"
        >
          We craft{' '}
          <span className="font-display-serif italic font-normal text-[#CCFF00]">
            bold ideas
          </span>{' '}
          and fearless campaigns that turn brands into{' '}
          <span className="font-display-serif italic font-normal text-[#CCFF00]">
            legacies.
          </span>
        </motion.h2>

        {/* Clean Manrope Body Copy */}
        <motion.p
          variants={itemVariants}
          className="mt-6 sm:mt-7 mx-auto max-w-2xl font-sans text-[15px] sm:text-lg font-normal leading-relaxed text-neutral-300"
        >
          At Think360Media, we&apos;re not just another marketing company &mdash; we&apos;re strategists,
          storytellers, engineers, and filmmakers. Our mission is helping ambitious brands cut
          through the noise, build unmistakable identity, and scale compounding growth across
          every digital touchpoint.
        </motion.p>

        {/* Centered Compact White Pill (Exact Else Social mob-05 proportion) */}
        <motion.div variants={itemVariants} className="mt-9 sm:mt-10">
          <motion.a
            href="#contact"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.35, ease: SMOOTH_EASE }}
            className="group inline-flex min-h-[50px] sm:min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-white px-10 py-3.5 font-sans text-sm font-bold tracking-tight text-black transition-colors duration-500 hover:bg-[#CCFF00] hover:text-black hover:shadow-[0_0_32px_rgba(204,255,0,0.5)]"
          >
            <span>Get in Touch</span>
            <ArrowRight
              className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              aria-hidden="true"
            />
          </motion.a>
        </motion.div>

        {/* Subtle Capability Strip (Desktop/Tablet) */}
        <motion.div
          variants={itemVariants}
          className="hidden sm:flex mt-14 flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {PILLARS.map((pillar) => (
            <div
              key={pillar.code}
              className="inline-flex items-center justify-center gap-2 font-sans text-xs font-semibold tracking-wide text-neutral-300"
            >
              <span className="font-bold text-[#CCFF00]">{pillar.code}</span>
              <span className="text-white/25">/</span>
              <span>{pillar.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
