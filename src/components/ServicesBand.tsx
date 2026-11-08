'use client';

import React, { useState } from 'react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Marquee } from './magicui/marquee';
import { ROW_1_SERVICES, ROW_2_SERVICES, ServiceItem } from '@/lib/constants';
import { ServiceIcon } from './ServiceIcons';

interface SolutionColumn {
  id: string;
  line1: string;
  line2: string;
  summary: string;
  capabilities: string[];
}

const SOLUTIONS: SolutionColumn[] = [
  {
    id: 'brand',
    line1: 'Brand',
    line2: 'Solution',
    summary:
      'We develop brand positioning, visual identity systems, and daily social storytelling to build lasting consumer affinity.',
    capabilities: [
      'Brand Strategy & Identity Design',
      'Social Media Management',
      'Influencer & Creator Seeding',
      'Campaign Copy & Art Direction',
    ],
  },
  {
    id: 'tech',
    line1: 'Tech',
    line2: 'Solution',
    summary:
      'We architect fast web and e-commerce storefronts paired with AI marketing workflows and automated CRM retention.',
    capabilities: [
      'Website & E-commerce Development',
      'AI Marketing Automation',
      'Email, SMS & WhatsApp CRM',
      'Conversion Rate Optimization (CRO)',
    ],
  },
  {
    id: 'media',
    line1: 'Media',
    line2: 'Solution',
    summary:
      'We plan, buy, and optimize performance media across paid search, social, programmatic, digital PR, and outdoor.',
    capabilities: [
      'Paid Search & Shopping (Google PMax)',
      'Paid Social (Meta, YouTube, LinkedIn)',
      'Digital PR & Media Buying',
      'Outdoor & Print Placements',
    ],
  },
  {
    id: 'research-seo',
    line1: 'SEO &',
    line2: 'Research',
    summary:
      'We combine market intelligence with technical search engineering so your brand owns high-intent search and AI answers.',
    capabilities: [
      'Technical SEO & Site Taxonomy',
      'Generative Engine Optimization (GEO)',
      'Category & Competitor Research',
      'Search Content Architecture',
    ],
  },
  {
    id: 'film-production',
    line1: 'Film &',
    line2: 'Production',
    summary:
      'Our in-house production studio directs commercial films, product photography, 3D motion, and high-velocity ad hooks.',
    capabilities: [
      'Commercial Video & Ad Production',
      'Product & Editorial Photography',
      '3D Motion & VFX Assets',
      'Short-Form Reels & YouTube Shorts',
    ],
  },
];

function PracticePill({ item }: { item: ServiceItem }) {
  return (
    <div className="flex items-center gap-3.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-5 py-3 shrink-0">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
        <ServiceIcon name={item.iconName} className="size-4 text-current" />
      </div>
      <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

export function ServicesBand() {
  const [activeId, setActiveId] = useState<string>('brand');
  const [marqueePaused, setMarqueePaused] = useState(false);

  return (
    <section
      id="services"
      aria-labelledby="solutions-heading"
      className="relative bg-[var(--bg-canvas)] text-[var(--text-primary)] border-b border-[var(--border-hairline)]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            INTEGRATED SOLUTIONS
          </span>
          <h2
            id="solutions-heading"
            className="mt-2 font-sans text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[var(--text-primary)]"
          >
            Everything Your Brand Needs. One Partner.
          </h2>
        </div>
        <p className="text-sm text-[var(--text-muted)] max-w-sm">
          Select or hover any solution pillar below to inspect our in-house capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border-t border-[var(--border-hairline)]">
        {SOLUTIONS.map((col) => {
          const isActive = activeId === col.id;
          return (
            <div
              key={col.id}
              onMouseEnter={() => setActiveId(col.id)}
              onFocus={() => setActiveId(col.id)}
              className={`group relative flex flex-col justify-between p-8 sm:p-10 min-h-[420px] lg:min-h-[540px] border-b lg:border-b-0 lg:border-r last:border-r-0 border-[var(--border-hairline)] transition-colors duration-300 ${
                isActive ? 'bg-[var(--bg-elevated)]' : 'bg-[var(--bg-canvas)]'
              }`}
            >
              <div>
                <h3
                  className={`font-sans text-4xl xl:text-[46px] font-bold tracking-[-0.03em] leading-[1.08] text-center transition-colors duration-300 ${
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[#525252] dark:text-[#A3A3A3] group-hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="block">{col.line1}</span>
                  <span className="block">{col.line2}</span>
                </h3>

                <div
                  className={`mt-8 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-85 group-hover:opacity-100'
                  }`}
                >
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed text-center">
                    {col.summary}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-[var(--border-hairline)] pt-5">
                    {col.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]"
                      >
                        <span
                          className="size-1.5 rounded-full bg-[var(--text-primary)] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <a
                  href="/contact"
                  onClick={() => setActiveId(col.id)}
                  aria-label={`Scope ${col.line1} ${col.line2} with Think360`}
                  className={`inline-flex size-14 items-center justify-center rounded-full border transition-all duration-300 ${
                    isActive
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black scale-105'
                      : 'border-[var(--border-hairline)] bg-transparent text-[var(--text-primary)] group-hover:border-black group-hover:bg-black group-hover:text-white dark:group-hover:border-white dark:group-hover:bg-white dark:group-hover:text-black'
                  }`}
                >
                  <ArrowRight className="size-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[var(--border-hairline)] bg-[var(--bg-elevated)] py-10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 mb-5 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            ALL 10 SPECIALIZED PRACTICE PODS
          </span>

          <button
            type="button"
            onClick={() => setMarqueePaused((prev) => !prev)}
            aria-pressed={marqueePaused}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-2 text-xs font-bold text-[var(--text-primary)] hover:border-[var(--text-primary)]"
          >
            {marqueePaused ? (
              <>
                <Play className="size-3.5" aria-hidden="true" />
                <span>Resume Practice Stream</span>
              </>
            ) : (
              <>
                <Pause className="size-3.5" aria-hidden="true" />
                <span>Pause Practice Stream</span>
              </>
            )}
          </button>
        </div>

        <div
          className={`space-y-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] ${
            marqueePaused ? 'motion-paused' : ''
          }`}
        >
          <Marquee reverse pauseOnHover className="[--duration:42s]">
            {ROW_1_SERVICES.map((item) => (
              <PracticePill key={item.id} item={item} />
            ))}
          </Marquee>

          <Marquee pauseOnHover className="[--duration:48s]">
            {ROW_2_SERVICES.map((item) => (
              <PracticePill key={item.id} item={item} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
