'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Hero as AboutBackground } from '@/components/ui/tailwind-css-background-snippet';

export function ElseAboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative lg:sticky lg:top-0 z-20 flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white py-28 sm:py-36 border-t border-white/10 shadow-[0_-28px_70px_rgba(0,0,0,0.9)]"
    >
      {/* Full-bleed Background Snippet covering full width & height of the About section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <AboutBackground className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#CCFF00]">
            ABOUT
          </p>

          <h2
            id="about-heading"
            className="mt-6 font-sans text-3xl sm:text-5xl lg:text-[56px] font-extrabold uppercase tracking-[-0.025em] leading-[1.08] text-white"
          >
            WE CRAFT BOLD IDEAS AND FEARLESS CAMPAIGNS THAT TURN BRANDS INTO LEGACIES.
          </h2>

          <p className="mt-8 mx-auto max-w-2xl font-mono text-xs sm:text-[15px] leading-[1.85] text-neutral-300">
            At Think360Media, we&apos;re not just another marketing company &mdash; we&apos;re strategists,
            storytellers, engineers, and filmmakers. Our mission? Helping ambitious brands cut
            through the noise, build unmistakable identity, and scale compounding growth across
            every digital touchpoint.
          </p>

          <div className="mt-10">
            <a
              href="#contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-9 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-[#CCFF00] hover:text-black hover:shadow-[0_0_28px_rgba(204,255,0,0.5)] hover:scale-[1.03] active:scale-[0.98]"
            >
              GET IN TOUCH
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
