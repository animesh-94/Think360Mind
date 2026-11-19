'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Marquee } from './magicui/marquee';

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
      className="relative z-40 w-full bg-white text-black py-20 sm:py-28 overflow-hidden shadow-[0_-24px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.26em] text-neutral-600">
            <span className="size-2 rounded-full bg-[#CCFF00] ring-1 ring-black/20" aria-hidden="true" />
            <span>AMONG OUR CLIENTS</span>
          </p>

          <h2
            id="clients-heading"
            className="mt-3 font-sans text-3xl sm:text-5xl font-extrabold uppercase tracking-[-0.02em] text-black"
          >
            PROUD TO WORK WITH
          </h2>
        </motion.div>
      </div>

      {/* Smooth Infinite Client Logo Strip */}
      <div className="relative mt-14 sm:mt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent"
        />

        <Marquee pauseOnHover className="[--duration:30s] [--gap:3.5rem] py-2" repeat={3}>
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.name}
              className="group flex h-16 sm:h-20 w-40 sm:w-48 items-center justify-center px-4 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-10 sm:max-h-12 w-auto object-contain opacity-85 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

