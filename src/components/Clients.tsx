'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  DeliveredCompanyCard,
  ThreeDMarquee,
} from './aceternity/three-d-marquee';
import { Globe } from './aceternity/globe';
import { SocialProofPress3 } from './magicui/social-proof-press-3';
import { StickyScrollRevealDemo } from './sticky-scroll-reveal-demo';

const DELIVERED_COMPANIES: DeliveredCompanyCard[] = [
  {
    name: 'Arch Events',
    logo: '/assets/clients/arch-events.svg',
    category: 'EXPERIENTIAL & PR',
    deliverable: 'Brand Identity, Event Film & Paid Social',
    market: 'India & UAE',
  },
  {
    name: 'ICFA',
    logo: '/assets/clients/icfa.svg',
    category: 'INSTITUTIONAL',
    deliverable: 'Digital Portal, Search Taxonomy & PR',
    market: 'Pan-India',
  },
  {
    name: 'Swan Energy',
    logo: '/assets/clients/swan-energy.svg',
    category: 'ENTERPRISE INFRA',
    deliverable: 'Corporate Web Architecture & SEO',
    market: 'Global',
  },
  {
    name: 'HeartLink',
    logo: '/assets/clients/heartlink.svg',
    category: 'HEALTHCARE TECH',
    deliverable: 'Patient Acquisition Funnel & Local SEO',
    market: 'India & UK',
  },
  {
    name: 'Urban Dancera',
    logo: '/assets/clients/urban-dancera.svg',
    category: 'CULTURE & CREATOR',
    deliverable: 'Short-Form Studio Reels & Creator Seeding',
    market: 'APAC & India',
  },
  {
    name: 'Kidway Global',
    logo: '/assets/clients/kidway-global.svg',
    category: 'CONSUMER RETAIL',
    deliverable: 'E-commerce Storefront & Meta Ads',
    market: 'Global D2C',
  },
  {
    name: 'Bellurét',
    logo: '/assets/clients/belluret.svg',
    category: 'LUXURY COMMERCE',
    deliverable: 'Shopify Flagship, Film & Retention CRM',
    market: 'EU & MENA',
  },
  {
    name: "Kamat's Legacy",
    logo: '/assets/clients/kamats-legacy.svg',
    category: 'HOSPITALITY',
    deliverable: 'Heritage Rebrand, Local Search & Social',
    market: 'India',
  },
  {
    name: 'Kosi',
    logo: '/assets/clients/kosi.svg',
    category: 'D2C LIFESTYLE',
    deliverable: 'Product Launch Film & Performance Max',
    market: 'US & India',
  },
  {
    name: 'KayImpex',
    logo: '/assets/clients/kayimpex.svg',
    category: 'GLOBAL TRADE',
    deliverable: 'B2B Lead Engine, Web & Search Authority',
    market: 'Worldwide',
  },
];

export function Clients() {
  return (
    <>
      {/* Part A: @magicui-pro/social-proof-press-3 + @aceternity/3d-marquee */}
      <section
        id="clients"
        aria-labelledby="clients-heading"
        className="relative py-20 sm:py-28 bg-[var(--bg-canvas)] text-[var(--text-primary)] border-b border-[var(--border-hairline)]"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              id="clients-heading"
              className="font-sans text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[var(--text-primary)]"
            >
              Brands That Build With Think360
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-sm">
              Explore the companies and full-funnel digital transformations we have delivered across ten verticals.
            </p>
          </div>

          {/* @magicui-pro/social-proof-press-3 High-Definition Companies Showcase */}
          <SocialProofPress3 />

          {/* @aceternity/3d-marquee Full-Stage 32-Card Showcase */}
          <div className="mt-12">
            <ThreeDMarquee items={DELIVERED_COMPANIES} />
          </div>
        </div>
      </section>

      {/* Part B: Clean Editorial Worldwide Globe Section (Zero Vibecoded Slop) */}
      <section
        id="worldwide"
        aria-labelledby="worldwide-heading"
        className="relative py-20 sm:py-28 bg-black text-white border-b border-neutral-900 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,rgba(255,77,46,0.12)_0%,transparent_58%)]"
        />
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <h2
                id="worldwide-heading"
                className="font-sans text-4xl sm:text-6xl font-bold tracking-[-0.035em] leading-[1.05] text-white"
              >
                Engineered in India.
                <span className="block font-display-serif italic font-normal text-[#FF4D2E] mt-1">
                  Delivering Worldwide.
                </span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
                From our creative, media, and technology studios in Mumbai, Bengaluru, and New Delhi, we build storefronts, search authority, and performance campaigns for brands across North America, Europe, the Middle East, and APAC.
              </p>

              <div className="mt-10 pt-8 border-t border-white/15 flex flex-wrap items-center justify-between gap-6">
                <div className="text-sm font-semibold tracking-wide text-white">
                  Mumbai &bull; Bengaluru &bull; New Delhi
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex min-h-[50px] items-center gap-3 rounded-full bg-white text-black px-8 py-3.5 text-sm font-bold transition-all duration-200 hover:bg-[#FF4D2E] hover:text-white hover:scale-[1.02]"
                >
                  <span>Start a Global Project</span>
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 flex items-center justify-center">
              <Globe />
            </div>
          </div>
        </div>
      </section>

      {/* Part C: Platform Partners Sticky Scroll Reveal */}
      <section
        id="insights"
        aria-labelledby="platforms-heading"
        className="relative py-20 sm:py-28 bg-[var(--bg-canvas)] text-[var(--text-primary)] border-b border-[var(--border-hairline)]"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              id="platforms-heading"
              className="font-sans text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[var(--text-primary)]"
            >
              Core Growth Architecture
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-md">
              Scroll through the four platform engines we deploy across search, creator social, headless commerce, and lifecycle retention.
            </p>
          </div>

          <StickyScrollRevealDemo />
        </div>
      </section>
    </>
  );
}
