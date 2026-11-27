'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type PillarKey = 'foundations' | 'growth' | 'beyond';

interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ChromeIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex size-14 sm:size-16 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-105">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-1 rounded-full bg-white/0 blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-white/15"
      />
      <div className="relative z-10 drop-shadow-[0_10px_20px_rgba(255,255,255,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        {children}
      </div>
    </div>
  );
}

const ChromeDefs = ({ id }: { id: string }) => (
  <defs>
    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="45%" stopColor="#C4CDD5" />
      <stop offset="72%" stopColor="#5B6B7A" />
      <stop offset="100%" stopColor="#F4F6F8" />
    </linearGradient>
  </defs>
);

const SERVICE_PILLARS: Record<
  PillarKey,
  {
    label: string;
    subtitle: string;
    items: ServiceCardItem[];
  }
> = {
  foundations: {
    label: 'What We Do Best',
    subtitle: 'Brand & Digital Foundations',
    items: [
      {
        id: 'branding',
        title: 'Branding & Creative',
        description: 'Building memorable identities that inspire recognition and trust.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-brand" />
            <path
              d="M24 6 39 15v18l-15 9-15-9V15L24 6zm0 8-8 4.8v9.4L24 33l8-4.8v-9.4L24 14z"
              fill="url(#c-brand)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1"
            />
          </svg>
        ),
      },
      {
        id: 'web-ecom',
        title: 'Website & E-commerce',
        description: 'Creating digital experiences designed for growth.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-web" />
            <rect
              x="7"
              y="10"
              width="34"
              height="24"
              rx="4"
              fill="url(#c-web)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1"
            />
            <rect x="12" y="15" width="24" height="14" rx="2" fill="#0B0C0E" fillOpacity="0.55" />
            <path d="M16 38h16" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        id: 'production',
        title: 'Creative Production',
        description: 'Producing content that captures attention and tells compelling stories.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-prod" />
            <path
              d="M24 41s-14.5-8.9-14.5-19.5C9.5 14.9 14.6 10 20.4 10c2.9 0 5.1 1.4 3.6 3.5C22.5 11.4 24.7 10 27.6 10c5.8 0 10.9 4.9 10.9 11.5C38.5 32.1 24 41 24 41z"
              fill="url(#c-prod)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1"
            />
          </svg>
        ),
      },
      {
        id: 'social',
        title: 'Social Media Marketing',
        description: 'Creating consistent social presence and digital experiences designed for growth.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-soc" />
            <path
              d="M14 22v16H9a2 2 0 0 1-2-2V24a2 2 0 0 1 2-2h5zm4 0 5.4-11.2A3 3 0 0 1 28.8 12v7h8.4a3.5 3.5 0 0 1 3.4 4.3l-2.8 11.4A4 4 0 0 1 33.9 38H18V22z"
              fill="url(#c-soc)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1"
            />
          </svg>
        ),
      },
    ],
  },
  growth: {
    label: 'Driving Growth',
    subtitle: 'Discovery & Acquisition',
    items: [
      {
        id: 'influencer',
        title: 'Influencer Marketing',
        description: 'Creating authentic partnerships that spark meaningful conversations.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-inf" />
            <circle cx="24" cy="16" r="7.5" fill="url(#c-inf)" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
            <path
              d="M10.5 38c1.2-7.5 6.8-12 13.5-12s12.3 4.5 13.5 12H10.5z"
              fill="url(#c-inf)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1"
            />
          </svg>
        ),
      },
      {
        id: 'performance',
        title: 'Performance Marketing',
        description: 'Scaling businesses through measurable advertising strategies.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-perf" />
            <path
              d="M41 9 8 22.5l12.4 5.2L35 15 23.2 29.8 28.5 41 41 9z"
              fill="url(#c-perf)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1"
            />
          </svg>
        ),
      },
      {
        id: 'seo',
        title: 'Search Engine Optimization (SEO)',
        description: 'Helping brands get discovered by the right audience.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-seo" />
            <circle cx="21" cy="21" r="11" fill="url(#c-seo)" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
            <circle cx="21" cy="21" r="5.5" fill="#0B0C0E" fillOpacity="0.6" />
            <path d="M29.5 29.5 40 40" stroke="#E2E8F0" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        id: 'ai-marketing',
        title: 'AI Marketing Solutions',
        description: 'Making marketing smarter through automation and intelligent insights.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-ai" />
            <path
              d="M24 6 28.6 19.4 42 24l-13.4 4.6L24 42l-4.6-13.4L6 24l13.4-4.6L24 6z"
              fill="url(#c-ai)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1"
            />
          </svg>
        ),
      },
    ],
  },
  beyond: {
    label: 'Beyond Digital',
    subtitle: 'Retention, PR & Offline',
    items: [
      {
        id: 'email-crm',
        title: 'Email & CRM Marketing',
        description: 'Building lasting customer relationships through personalised communication.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-crm" />
            <rect x="7" y="12" width="34" height="24" rx="4" fill="url(#c-crm)" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
            <path d="M9 14 24 25 39 14" fill="none" stroke="#0B0C0E" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        id: 'pr',
        title: 'Public Relations',
        description: 'Strengthening brand credibility through strategic media exposure.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-pr" />
            <path
              d="M11 11h26a4 4 0 0 1 4 4v15a4 4 0 0 1-4 4H22l-8.5 6.5V34H11a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z"
              fill="url(#c-pr)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1"
            />
          </svg>
        ),
      },
      {
        id: 'media-buying',
        title: 'Media Planning & Buying',
        description: 'Maximising reach through smarter media investments from brief to reporting.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-media" />
            <rect x="8" y="24" width="7" height="15" rx="2" fill="url(#c-media)" />
            <rect x="20.5" y="17" width="7" height="22" rx="2" fill="url(#c-media)" />
            <rect x="33" y="9" width="7" height="30" rx="2" fill="url(#c-media)" />
          </svg>
        ),
      },
      {
        id: 'outdoor',
        title: 'Outdoor Advertising',
        description: 'Creating memorable brand visibility beyond digital platforms.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-ooh" />
            <rect x="8" y="11" width="32" height="20" rx="3" fill="url(#c-ooh)" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
            <path d="M16 31v8M32 31v8M12 39h24" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        id: 'marketplace',
        title: 'Marketplace Marketing',
        description: 'Helping brands grow across leading e-commerce marketplaces.',
        icon: (
          <svg viewBox="0 0 48 48" className="size-11 sm:size-12" aria-hidden="true">
            <ChromeDefs id="c-mkt" />
            <path
              d="M11 16h26l-2.5 22a3 3 0 0 1-3 2.7H16.5a3 3 0 0 1-3-2.7L11 16z"
              fill="url(#c-mkt)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1"
            />
            <path d="M18 16v-3a6 6 0 0 1 12 0v3" fill="none" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
  },
};

const PILLAR_KEYS: PillarKey[] = ['foundations', 'growth', 'beyond'];

export function ElseServicesSection() {
  const [activePillar, setActivePillar] = useState<PillarKey>('foundations');
  const prefersReducedMotion = useReducedMotion();
  const current = SERVICE_PILLARS[activePillar];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative lg:sticky lg:top-0 z-30 flex lg:min-h-screen w-full items-center bg-black text-white py-20 sm:py-24 border-t border-white/10 shadow-[0_-28px_70px_rgba(0,0,0,0.92)]"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 w-full">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: SMOOTH_EASE }}
          className="text-center"
        >
          <p className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-neutral-400">
            Services
          </p>
          <h2
            id="services-heading"
            className="mt-3 sm:mt-4 font-sans text-[1.95rem] sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1] text-white"
          >
            Everything your brand needs.{' '}
            <span className="font-display-serif italic font-normal text-white">
              One partner.
            </span>
          </h2>

          {/* Interactive 3-Pillar Tabs */}
          <div
            role="tablist"
            aria-label="Think360 Media service pillars"
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] p-1.5"
          >
            {PILLAR_KEYS.map((key) => {
              const isSelected = activePillar === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActivePillar(key)}
                  className={`min-h-[40px] rounded-full px-4 sm:px-6 py-2 font-sans text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 ${
                    isSelected
                      ? 'bg-white text-black'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {SERVICE_PILLARS[key].label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 font-sans text-xs sm:text-sm font-medium text-neutral-400">
            {current.subtitle}
          </p>
        </motion.div>

        {/* Borderless Chrome-Icon Grid switching smoothly across all 13 capabilities */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: SMOOTH_EASE }}
            className={`mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 ${
              current.items.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
            } gap-y-10 sm:gap-x-8 sm:gap-y-12`}
          >
            {current.items.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col items-center text-center px-2"
              >
                <ChromeIcon>{service.icon}</ChromeIcon>

                <h3 className="mt-5 font-sans text-base font-bold tracking-tight text-white transition-colors duration-400 group-hover:text-[#CCFF00]">
                  {service.title}
                </h3>

                <p className="mt-2 max-w-[270px] font-sans text-xs sm:text-sm leading-relaxed text-neutral-300 sm:text-neutral-400">
                  {service.description}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
