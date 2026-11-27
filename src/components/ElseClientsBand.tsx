'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Marquee } from '@/components/magicui/marquee';

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ClientLogo {
  name: string;
  src: string;
}

const CLIENT_LOGOS_ROW_1: ClientLogo[] = [
  { name: 'Arch Events', src: '/assets/client-logos/arch-events.jpg' },
  { name: 'ICPA', src: '/assets/client-logos/icpa.jpg' },
  { name: 'Swan Energy Limited', src: '/assets/client-logos/swan-energy.jpg' },
  { name: 'Heartlink', src: '/assets/client-logos/heartlink.jpg' },
  { name: 'Urban Dancera', src: '/assets/client-logos/urban-dancera.jpg' },
  { name: 'Kidway Global Online School', src: '/assets/client-logos/kidway.jpg' },
  { name: 'The Strat Genius Academy', src: '/assets/client-logos/strat-genius.jpg' },
  { name: 'Country Hills Resort', src: '/assets/client-logos/country-hills.jpg' },
  { name: 'Alpa Apoorva', src: '/assets/client-logos/alpa-apoorva.jpg' },
];

const CLIENT_LOGOS_ROW_2: ClientLogo[] = [
  { name: 'Kindness Practice Foundation', src: '/assets/client-logos/kindness-practice.jpg' },
  { name: 'Bellurét', src: '/assets/client-logos/belluret.jpg' },
  { name: 'BHN', src: '/assets/client-logos/bhn.jpg' },
  { name: 'CarePlus+', src: '/assets/client-logos/careplus.jpg' },
  { name: 'Aaryavam', src: '/assets/client-logos/aaryavam.jpg' },
  { name: "Kamat's Legacy", src: '/assets/client-logos/kamats-legacy.jpg' },
  { name: 'Kosi (Est. 2015)', src: '/assets/client-logos/kosi.jpg' },
  { name: 'Mind Tree', src: '/assets/client-logos/mind-tree.jpg' },
  { name: 'Kayimpex (Est. 1988)', src: '/assets/client-logos/kayimpex.jpg' },
];

function ClientLogoTile({ client }: { client: ClientLogo }) {
  return (
    <div className="flex h-[96px] sm:h-[112px] w-[176px] sm:w-[210px] shrink-0 items-center justify-center rounded-2xl border border-black/[0.08] bg-white px-5 py-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/25 hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)] hover:-translate-y-0.5">
      <img
        src={client.src}
        alt={client.name}
        loading="lazy"
        className="max-h-[68px] sm:max-h-[78px] max-w-[144px] sm:max-w-[172px] w-auto h-auto object-contain brightness-[1.03] contrast-[1.05] mix-blend-multiply"
      />
    </div>
  );
}

export function ElseClientsBand() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="relative z-40 w-full bg-white text-black py-20 sm:py-28 overflow-hidden shadow-[0_-24px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: SMOOTH_EASE }}
          className="max-w-2xl mx-auto"
        >
          <p className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Our Clientele
          </p>

          <h2
            id="clients-heading"
            className="mt-2.5 font-sans text-[2rem] sm:text-5xl font-extrabold tracking-[-0.035em] text-black leading-[1.08]"
          >
            Proud to{' '}
            <span className="font-display-serif italic font-normal text-black">
              work with
            </span>
          </h2>

          <p className="mt-3 font-sans text-sm text-neutral-600 leading-relaxed">
            Work delivered across agency engagements and outsourced collaborations for brands across
            healthcare, hospitality, education, luxury beauty, energy, and global trade.
          </p>
        </motion.div>
      </div>

      {/* Full-bleed Dual-Row Counter-Scrolling Magic UI Marquee */}
      <div className="relative mt-12 sm:mt-14 space-y-4">
        <Marquee pauseOnHover repeat={3} className="[--duration:38s] [--gap:1rem] py-1">
          {CLIENT_LOGOS_ROW_1.map((client) => (
            <ClientLogoTile key={client.name} client={client} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover repeat={3} className="[--duration:42s] [--gap:1rem] py-1">
          {CLIENT_LOGOS_ROW_2.map((client) => (
            <ClientLogoTile key={client.name} client={client} />
          ))}
        </Marquee>

        {/* Clean White Gradient Edge Masks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 sm:w-32 bg-gradient-to-r from-white via-white/85 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 sm:w-32 bg-gradient-to-l from-white via-white/85 to-transparent"
        />
      </div>
    </section>
  );
}
