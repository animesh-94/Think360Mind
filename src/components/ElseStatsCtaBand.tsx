'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const GROWTH_STATS = [
  {
    value: '55%',
    label: 'Objective',
    detail: 'Tailored strategic clarity before execution',
  },
  {
    value: '30%',
    label: 'Approach',
    detail: 'Integrated multi-channel brand orchestration',
  },
  {
    value: '92%',
    label: 'Impact',
    detail: 'Measurable progress for long-term brand growth',
  },
];

export function ElseStatsCtaBand() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="growth-impact"
      aria-labelledby="stats-cta-heading"
      className="relative z-[45] w-full bg-[#060607] text-white py-20 sm:py-28 border-t border-white/10"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.78, ease: SMOOTH_EASE }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* Left Editorial CTA Column */}
          <div className="lg:col-span-5 text-left">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
              Growth Stories: Progress Over Raw Numbers
            </p>
            <h2
              id="stats-cta-heading"
              className="mt-3 font-sans text-[2rem] sm:text-4xl lg:text-[42px] font-extrabold tracking-[-0.035em] leading-[1.08] text-white"
            >
              Strategy built for{' '}
              <span className="font-display-serif italic font-normal text-white">
                measurable growth.
              </span>
            </h2>
            <p className="mt-4 font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-md">
              Whether launching, strengthening your brand presence, or accelerating your next phase
              of growth, every discipline works under one shared vision.
            </p>

            <div className="mt-7">
              <a
                href="#contact"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3 font-sans text-xs font-extrabold uppercase tracking-[0.14em] text-black transition-colors duration-300 hover:bg-[#CCFF00] hover:text-black"
              >
                <span>Let&apos;s Build What&apos;s Next</span>
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* Right Architectural 3-Stat Band */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {GROWTH_STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: idx * 0.08, ease: SMOOTH_EASE }}
                className="group flex flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.03] p-6 sm:p-7 transition-colors duration-300 hover:border-white/30"
              >
                <div>
                  <div className="font-sans text-4xl sm:text-[44px] font-black tracking-[-0.04em] leading-none text-white">
                    {stat.value}
                  </div>
                  <div className="mt-3 flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-neutral-200">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        idx === 2 ? 'bg-[#CCFF00]' : 'bg-white/60'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{stat.label}</span>
                  </div>
                </div>
                <p className="mt-5 font-sans text-xs sm:text-[13px] leading-relaxed text-neutral-400">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
