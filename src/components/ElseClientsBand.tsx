'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Marquee } from './magicui/marquee';

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CLIENT_LOGOS = [
  { name: 'Swan Energy', logo: '/assets/clients/swan-energy.svg' },
  { name: 'Bellurét', logo: '/assets/clients/belluret.svg' },
  { name: 'HeartLink', logo: '/assets/clients/heartlink.svg' },
  { name: 'Urban Dancera', logo: '/assets/clients/urban-dancera.svg' },
  { name: 'Arch Events', logo: '/assets/clients/arch-events.svg' },
  { name: 'ICFA', logo: '/assets/clients/icfa.svg' },
  { name: 'Kidway Global', logo: '/assets/clients/kidway-global.svg' },
  { name: "Kamat's Legacy", logo: '/assets/clients/kamats-legacy.svg' },
  { name: 'Kosi', logo: '/assets/clients/kosi.svg' },
  { name: 'KayImpex', logo: '/assets/clients/kayimpex.svg' },
];

export function ElseClientsBand() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="relative z-40 w-full bg-white text-black py-14 sm:py-28 overflow-hidden shadow-[0_-24px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: SMOOTH_EASE }}
        >
          <p className="inline-flex items-center gap-2 font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
            <span className="size-2 rounded-full bg-[#CCFF00] ring-1 ring-black/20" aria-hidden="true" />
            <span>Among Our Clients</span>
          </p>

          <h2
            id="clients-heading"
            className="mt-2.5 sm:mt-3 font-sans text-[1.9rem] sm:text-5xl font-extrabold tracking-[-0.03em] text-black"
          >
            Proud to{' '}
            <span className="font-display-serif italic font-normal text-black">
              work with
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Mobile Centered Wrapped Rows (Exact Else Social mob-07 layout) */}
      <div className="sm:hidden mt-10 px-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-6">
        {CLIENT_LOGOS.slice(0, 8).map((client) => (
          <div
            key={client.name}
            className="flex h-11 w-[26%] min-w-[84px] items-center justify-center"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="max-h-8 w-auto object-contain opacity-90"
            />
          </div>
        ))}
      </div>

      {/* Tablet & Desktop Infinite Client Logo Strip */}
      <div className="hidden sm:block relative mt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent"
        />

        <Marquee pauseOnHover className="[--duration:34s] [--gap:3.5rem] py-2" repeat={3}>
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.name}
              className="group flex h-20 w-48 items-center justify-center px-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-12 w-auto object-contain opacity-85 transition-opacity duration-400 group-hover:opacity-100"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
