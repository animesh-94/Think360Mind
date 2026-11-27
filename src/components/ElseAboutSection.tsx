'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ElseAboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.82,
        ease: SMOOTH_EASE,
      },
    },
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative sticky top-0 z-20 flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black text-white py-24 sm:py-32 border-t border-white/12 shadow-[0_-28px_70px_rgba(0,0,0,0.92)]"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 text-center"
      >
        <motion.p
          variants={itemVariants}
          className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-neutral-400"
        >
          Beyond 360°
        </motion.p>

        <motion.h2
          id="about-heading"
          variants={itemVariants}
          className="mt-5 sm:mt-6 font-sans text-[2rem] sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.035em] leading-[1.08] text-white"
        >
          Successful marketing isn&apos;t about doing everything. It&apos;s about making{' '}
          <span className="font-display-serif italic font-normal text-white">
            everything work together.
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-6 sm:mt-7 mx-auto max-w-2xl font-sans text-[15px] sm:text-lg font-normal leading-relaxed text-neutral-300"
        >
          360° is how Think360 Media thinks, creates, and grows brands: uniting branding,
          creativity, media, performance, and communication under one shared vision. Every brand
          deserves a meaningful presence wherever its audience is, built through consistent
          experiences that inspire trust, recognition, and long-term relationships.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 sm:mt-11">
          <motion.a
            href="#contact"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -1 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.3, ease: SMOOTH_EASE }}
            className="group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-full bg-white px-9 py-3.5 font-sans text-sm font-bold tracking-tight text-black transition-colors duration-300 hover:bg-[#CCFF00] hover:text-black"
          >
            <span>Let&apos;s Build What&apos;s Next</span>
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              aria-hidden="true"
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
