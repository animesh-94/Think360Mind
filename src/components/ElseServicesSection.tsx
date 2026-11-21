'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ChromeIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex size-16 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-110">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-1 rounded-full bg-[#CCFF00]/0 blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[#CCFF00]/35"
      />
      <div className="relative z-10 drop-shadow-[0_10px_20px_rgba(255,255,255,0.12)] group-hover:drop-shadow-[0_0_20px_rgba(204,255,0,0.45)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        {children}
      </div>
    </div>
  );
}

const SERVICES: ServiceCardItem[] = [
  {
    id: 'social',
    title: 'Social Media Management',
    description:
      'Smart strategies, engaging content, and real connections — because social media is more than just likes.',
    icon: (
      <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
        <defs>
          <linearGradient id="ch1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#C4CDD5" />
            <stop offset="70%" stopColor="#637381" />
            <stop offset="100%" stopColor="#F4F6F8" />
          </linearGradient>
        </defs>
        <path
          d="M14 22v16H9a2 2 0 0 1-2-2V24a2 2 0 0 1 2-2h5zm4 0 5.4-11.2A3 3 0 0 1 28.8 12v7h8.4a3.5 3.5 0 0 1 3.4 4.3l-2.8 11.4A4 4 0 0 1 33.9 38H18V22z"
          fill="url(#ch1)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    id: 'content',
    title: 'Content & Film Creation',
    description:
      'Words, studio films, 3D CGI, and reels that don’t just scroll by — they stop thumbs and start conversations.',
    icon: (
      <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
        <defs>
          <linearGradient id="ch2" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="42%" stopColor="#D6DFE8" />
            <stop offset="72%" stopColor="#5B6B7A" />
            <stop offset="100%" stopColor="#EEF2F6" />
          </linearGradient>
        </defs>
        <path
          d="M24 41s-14.5-8.9-14.5-19.5C9.5 14.9 14.6 10 20.4 10c2.9 0 5.1 1.4 3.6 3.5C22.5 11.4 24.7 10 27.6 10c5.8 0 10.9 4.9 10.9 11.5C38.5 32.1 24 41 24 41z"
          fill="url(#ch2)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    id: 'brand',
    title: 'Brand Strategy & Development',
    description:
      'We don’t just build brands — we give them an unmistakable identity, sharp voice, and category authority.',
    icon: (
      <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
        <defs>
          <linearGradient id="ch3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="48%" stopColor="#B8C4D0" />
            <stop offset="76%" stopColor="#4F5D6B" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
        </defs>
        <path
          d="M11 11h26a4 4 0 0 1 4 4v15a4 4 0 0 1-4 4H22l-8.5 6.5V34H11a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z"
          fill="url(#ch3)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    id: 'performance',
    title: 'Performance Marketing',
    description:
      'Full-funnel Google PMax, Meta Advantage+, and precision media buying engineered for compounding ROAS.',
    icon: (
      <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
        <defs>
          <linearGradient id="ch4" x1="0%" y1="10%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#BCC7D4" />
            <stop offset="78%" stopColor="#52606E" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
        </defs>
        <path
          d="M41 9 8 22.5l12.4 5.2L35 15 23.2 29.8 28.5 41 41 9z"
          fill="url(#ch4)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    id: 'commerce',
    title: 'Web & Headless Commerce',
    description:
      'Sub-second Next.js and Shopify Plus storefronts paired with automated CRM & WhatsApp retention engines.',
    icon: (
      <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
        <defs>
          <linearGradient id="ch5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#C2CCD6" />
            <stop offset="75%" stopColor="#566573" />
            <stop offset="100%" stopColor="#EDF2F7" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="17" r="7.5" fill="url(#ch5)" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
        <path
          d="M10.5 39c1.2-7.5 6.8-12 13.5-12s12.3 4.5 13.5 12H10.5z"
          fill="url(#ch5)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    id: 'seo',
    title: 'Technical SEO & AI Search',
    description:
      'Entity graphs, structured schema, and Generative Engine Optimization so your brand owns search and AI answers.',
    icon: (
      <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
        <defs>
          <linearGradient id="ch6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#C8D2DC" />
            <stop offset="74%" stopColor="#586675" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
        </defs>
        <rect
          x="8"
          y="12"
          width="32"
          height="26"
          rx="4"
          fill="url(#ch6)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
        />
        <rect x="13" y="18" width="22" height="14" rx="2" fill="#0B0C0E" fillOpacity="0.55" />
        <path d="M16 12V8M32 12V8" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function ElseServicesSection() {
  const prefersReducedMotion = useReducedMotion();

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.09,
      },
    },
  };

  const cardVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: SMOOTH_EASE },
    },
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative lg:sticky lg:top-0 z-30 flex lg:min-h-screen w-full items-center bg-black text-white py-20 sm:py-28 border-t border-white/10 shadow-[0_-28px_70px_rgba(0,0,0,0.92)]"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12 w-full">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: SMOOTH_EASE }}
          className="text-center"
        >
          <p className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#CCFF00]">
            Services
          </p>
          <h2
            id="services-heading"
            className="mt-3 sm:mt-4 font-sans text-[2rem] sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1] text-white"
          >
            Not just{' '}
            <span className="font-display-serif italic font-normal text-[#CCFF00]">
              digital
            </span>{' '}
            marketers.
          </h2>
        </motion.div>

        {/* Exact Else Social Pure Black Borderless Chrome-Icon Stack on Mobile & 3x2 on Desktop */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-x-12 sm:gap-y-20"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group flex flex-col items-center text-center px-2"
            >
              <ChromeIcon>{service.icon}</ChromeIcon>

              <h3 className="mt-5 sm:mt-7 font-sans text-base sm:text-lg font-bold tracking-tight text-white transition-colors duration-400 group-hover:text-[#CCFF00]">
                {service.title}
              </h3>

              <p className="mt-2.5 sm:mt-3 max-w-[300px] font-sans text-sm leading-relaxed text-neutral-300 sm:text-neutral-400">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
