'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, HeartHandshake } from 'lucide-react';
import { Marquee } from './magicui/marquee';
import { ServiceIcon } from './ServiceIcons';
import { ServiceItem } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface AuditModuleCardProps {
  title: string;
  pod: string;
  scope: string;
  iconName: ServiceItem['iconName'];
}

const AUDIT_MODULES: AuditModuleCardProps[] = [
  {
    title: 'Branding & Creative',
    pod: 'Pod 01 • Brand Identity Audit',
    scope: 'Visual positioning, message hierarchy, and creative consistency review across touchpoints.',
    iconName: 'branding',
  },
  {
    title: 'Website & E-commerce',
    pod: 'Pod 02 • Storefront & CRO Audit',
    scope: 'Landing page speed, checkout funnel drop-off analysis, and mobile conversion review.',
    iconName: 'website',
  },
  {
    title: 'Creative Production',
    pod: 'Pod 03 • Video & Hook Audit',
    scope: 'Ad creative fatigue teardown and 3-second thumb-stop hook scripting for short-form video.',
    iconName: 'production',
  },
  {
    title: 'Performance Marketing',
    pod: 'Pod 04 • Paid Media Tear-Down',
    scope: 'Account structure, attribution hygiene, and wasted spend audit across search and social.',
    iconName: 'performance',
  },
  {
    title: 'Search Engine Optimization',
    pod: 'Pod 05 • Technical SEO & Search',
    scope: 'Crawl health, schema markup, commercial keyword gaps, and search visibility roadmap.',
    iconName: 'seo',
  },
  {
    title: 'Email & CRM Marketing',
    pod: 'Pod 06 • Lifecycle & Retention',
    scope: 'Welcome, abandoned cart, and repeat-buyer automation audit across email and messaging.',
    iconName: 'email',
  },
];

const firstRow = AUDIT_MODULES.slice(0, 3);
const secondRow = AUDIT_MODULES.slice(3, 6);
const thirdRow = [AUDIT_MODULES[1], AUDIT_MODULES[3], AUDIT_MODULES[5]];
const fourthRow = [AUDIT_MODULES[0], AUDIT_MODULES[2], AUDIT_MODULES[4]];

function AuditModuleCard({ title, pod, scope, iconName }: AuditModuleCardProps) {
  return (
    <article
      className={cn(
        'relative w-84 sm:w-96 overflow-hidden rounded-2xl border p-5 transition-colors',
        'border-white/30 bg-neutral-900/95 text-white shadow-lg'
      )}
    >
      <div className="flex flex-row items-center gap-3.5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/40 bg-black text-white">
          <ServiceIcon name={iconName} className="size-6 text-white" />
        </div>
        <div className="flex flex-col text-left">
          <h3 className="text-base font-bold text-white leading-tight">
            {title}
          </h3>
          <p className="text-sm font-semibold text-neutral-300">{pod}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-100 text-left font-medium">
        {scope}
      </p>
    </article>
  );
}

export function CallToAction() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[var(--bg-canvas)] text-[var(--text-primary)]"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="relative flex h-[430px] sm:h-[480px] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-neutral-800 bg-black text-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden opacity-95"
          >
            <div
              className="flex flex-col gap-5"
              style={{
                transform:
                  'translateX(-40px) translateY(0px) translateZ(-60px) rotateX(18deg) rotateY(-8deg) rotateZ(28deg) scale(1.3)',
              }}
            >
              <Marquee pauseOnHover className="[--duration:28s]" repeat={4}>
                {firstRow.map((mod) => (
                  <AuditModuleCard key={`r1-${mod.title}`} {...mod} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:34s]" repeat={4}>
                {secondRow.map((mod) => (
                  <AuditModuleCard key={`r2-${mod.title}`} {...mod} />
                ))}
              </Marquee>
              <Marquee pauseOnHover className="[--duration:30s]" repeat={4}>
                {thirdRow.map((mod) => (
                  <AuditModuleCard key={`r3-${mod.title}`} {...mod} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:36s]" repeat={4}>
                {fourthRow.map((mod) => (
                  <AuditModuleCard key={`r4-${mod.title}`} {...mod} />
                ))}
              </Marquee>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(255, 77, 46, 0.14) 0%, rgba(0, 0, 0, 0.72) 55%, #000000 95%)',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <div className="mb-6 flex size-20 sm:size-24 items-center justify-center rounded-[1.75rem] border border-white/25 bg-neutral-900/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <HeartHandshake
                className="size-10 sm:size-12 text-white stroke-[1.75]"
                aria-hidden="true"
              />
            </div>

            <h2
              id="cta-heading"
              className="font-sans text-2xl sm:text-4xl md:text-[44px] font-bold tracking-[-0.03em] text-white leading-tight"
            >
              Stop wasting ad spend on guesswork.
            </h2>

            <p className="mt-2.5 max-w-md text-sm sm:text-base text-neutral-300 font-medium">
              Book your free 360° growth audit. Strategy, creative &amp; performance under one roof.
            </p>

            <Link
              href="/contact"
              className="group mt-6 inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#FF4D2E] bg-[#FF4D2E] px-7 py-3 text-xs sm:text-sm font-extrabold text-white transition-all duration-200 hover:bg-[#E03E22] hover:border-[#E03E22] active:scale-95"
            >
              <span>Book Your Free 360° Audit</span>
              <ChevronRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
