'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { Hero } from './Hero';

interface ShowcaseWork {
  id: string;
  client: string;
  tag: string;
  title: string;
  image: string;
  challenge: string;
  architecture: string;
  deliverable: string;
}

const STAGE_CARDS: ShowcaseWork[] = [
  {
    id: 'heartlink',
    client: 'HeartLink Health',
    tag: 'DIGITAL PRODUCT & SEARCH',
    title: 'Connected Cardiac Care & Patient Funnels',
    image: '/assets/work/heartlink.jpg',
    challenge: 'Drive high-intent patient bookings across regional specialties with frictionless mobile scheduling.',
    architecture: 'Light-mode patient booking UX paired with hyper-local search funnels and tracked attribution.',
    deliverable: 'Web App UX + Local Search Engine',
  },
  {
    id: 'belluret',
    client: 'Bellurét Paris',
    tag: 'LUXURY D2C FLAGSHIP & FILM',
    title: 'Haute Horlogerie Storefront & Launch Film',
    image: '/assets/work/belluret.jpg',
    challenge: 'Pair editorial luxury desire with sub-second checkout speed and automated VIP clienteling.',
    architecture: 'Headless Shopify Plus storefront, studio macro photography, and Klaviyo + WhatsApp flows.',
    deliverable: 'Headless Flagship + Studio Launch Kit',
  },
  {
    id: 'urban-dancera',
    client: 'Urban Dancera',
    tag: 'STUDIO PRODUCTION & REELS',
    title: 'Soundstage Direction & Creator Velocity',
    image: '/assets/work/urban-dancera.jpg',
    challenge: 'Sustain thumb-stopping visual energy across weekly vertical reels and paid social whitelisting.',
    architecture: 'In-house soundstage shoots, kinetic 0–3s visual hook edits, and creator whitelisting funnels.',
    deliverable: '48 Monthly 9:16 Reels + Paid Social',
  },
];

const EXTRA_WORKS: ShowcaseWork[] = [
  {
    id: 'swan-energy',
    client: 'Swan Energy',
    tag: 'ENTERPRISE WEB & SEO',
    title: 'Enterprise Infrastructure Portal',
    image: '/assets/work/swan-energy.jpg',
    challenge: 'Consolidate complex industrial divisions into one unified, fast-loading investor & B2B portal.',
    architecture: 'Structured Next.js enterprise architecture, entity schema graph, and Core Web Vitals optimization.',
    deliverable: 'Enterprise Portal + Technical SEO',
  },
  {
    id: 'arch-events',
    client: 'Arch Events',
    tag: 'EXPERIENTIAL BRANDING',
    title: 'Spatial Identity & Live Stagecraft',
    image: '/assets/work/arch-events.jpg',
    challenge: 'Elevate an experiential production house with an unmistakable visual and physical identity.',
    architecture: 'Environmental typography, VIP press credential kits, and architectural digital showcase.',
    deliverable: 'Identity System + Event Collateral',
  },
  {
    id: 'kosi',
    client: 'Kosi Studio',
    tag: '3D FILM & GOOGLE PMAX',
    title: 'Precision Acoustic Hardware Launch',
    image: '/assets/work/kosi.jpg',
    challenge: 'Translate machined industrial craftsmanship into high-converting Shopping & YouTube ads.',
    architecture: 'Tabletop product films cut into Performance Max hook variants and Merchant Center feeds.',
    deliverable: 'Launch Film + Google PMax Engine',
  },
  {
    id: 'kamats-legacy',
    client: "Kamat's Legacy",
    tag: 'HOSPITALITY REBRAND',
    title: 'Heritage Culinary Identity & Local GEO',
    image: '/assets/work/kamats-legacy.jpg',
    challenge: 'Refresh a storied hospitality brand for modern diners while preserving heritage equity.',
    architecture: 'Refined print & digital menu language, table booking UX, and multi-city local search.',
    deliverable: 'Rebrand + Reservation Experience',
  },
  {
    id: 'kidway-global',
    client: 'Kidway Global',
    tag: 'D2C RETAIL & META ADS',
    title: 'Family Commerce & Advantage+ Engine',
    image: '/assets/work/kidway-global.jpg',
    challenge: 'Scale family retail awareness while keeping blended acquisition costs disciplined.',
    architecture: 'Dynamic catalog Meta Advantage+ testing matrices paired with tactile lifestyle shoots.',
    deliverable: 'Shopify Storefront + Meta Creative Lab',
  },
];

const ALL_WORKS = [...STAGE_CARDS, ...EXTRA_WORKS];

export function ElseHeroStage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [selectedWork, setSelectedWork] = useState<ShowcaseWork | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });

  // Exact video choreography (00:00 -> 00:05):
  // 1) Center card rises first directly over pinned Hero (0.04 -> 0.28), holds, then exits up (0.76 -> 0.98)
  const centerY = useTransform(smooth, [0.02, 0.28, 0.74, 0.98], ['105vh', '0vh', '0vh', '-115vh']);
  const centerScale = useTransform(smooth, [0.02, 0.28, 0.74, 0.98], [0.94, 1, 1, 0.96]);

  // 2) Left card rises second (0.14 -> 0.40), holds slightly higher (-3vh), then exits up with group
  const leftY = useTransform(smooth, [0.14, 0.4, 0.74, 0.98], ['115vh', '-3vh', '-3vh', '-118vh']);

  // 3) Right card rises third (0.24 -> 0.50), holds slightly lower (+4vh), then exits up with group
  const rightY = useTransform(smooth, [0.24, 0.5, 0.74, 0.98], ['120vh', '4vh', '4vh', '-112vh']);

  // 4) Giant monumental "THINK360" letters sweep UPWARD behind the 3 pinned cards (0.38 -> 0.78)
  const wordY = useTransform(smooth, [0.36, 0.56, 0.8], ['85vh', '0vh', '-95vh']);
  const wordOpacity = useTransform(smooth, [0.36, 0.48, 0.68, 0.8], [0, 0.96, 0.96, 0]);

  useEffect(() => {
    if (!selectedWork) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedWork(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedWork]);

  return (
    <div ref={trackRef} className="relative w-full bg-black">
      {/* Sticky Pinned Hero Layer (00:00 -> 00:05): stays frozen behind rising vertical cards */}
      <div className="sticky top-0 z-0 min-h-screen w-full flex items-center bg-black">
        <Hero />
      </div>

      {/* Desktop Rising Vertical Showcase Overlay Track (directly overlaps pinned Hero) */}
      <div
        aria-label="Featured Work Showcase"
        className="relative z-10 hidden lg:block h-[330vh] -mt-[100vh] pointer-events-none"
      >
        <span id="work" className="absolute top-[24%] left-0 pointer-events-none" aria-hidden="true" />
        <div className="sticky top-0 h-screen w-full overflow-clip flex items-center justify-center px-8">
          {/* 3 Staggered Rising Cards (z-20) — slimmer vertical portrait width */}
          <div className="relative z-20 mx-auto w-full max-w-[1080px] grid grid-cols-12 items-center gap-8 xl:gap-10 pointer-events-auto">
            {/* Left Staggered Card */}
            <motion.div
              style={{ y: prefersReducedMotion ? 0 : leftY }}
              className="col-span-4 flex justify-center"
            >
              <StageReelCard
                work={STAGE_CARDS[0]}
                sizeClass="max-w-[290px] h-[64vh] max-h-[560px]"
                onSelect={setSelectedWork}
              />
            </motion.div>

            {/* Center Dominant Featured Card */}
            <motion.div
              style={{
                y: prefersReducedMotion ? 0 : centerY,
                scale: prefersReducedMotion ? 1 : centerScale,
              }}
              className="col-span-4 flex justify-center"
            >
              <StageReelCard
                work={STAGE_CARDS[1]}
                sizeClass="max-w-[320px] h-[76vh] max-h-[660px]"
                featured
                onSelect={setSelectedWork}
              />
            </motion.div>

            {/* Right Staggered Card */}
            <motion.div
              style={{ y: prefersReducedMotion ? 0 : rightY }}
              className="col-span-4 flex justify-center"
            >
              <StageReelCard
                work={STAGE_CARDS[2]}
                sizeClass="max-w-[290px] h-[60vh] max-h-[530px]"
                onSelect={setSelectedWork}
              />
            </motion.div>
          </div>

          {/* Giant Monumental Letters Sweeping Up IN FRONT OF the 3 Pinned Cards (z-30) */}
          <motion.div
            aria-hidden="true"
            style={{
              y: prefersReducedMotion ? 0 : wordY,
              opacity: prefersReducedMotion ? 0.15 : wordOpacity,
            }}
            className="pointer-events-none select-none absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="w-full max-w-[1440px] px-6 flex items-center justify-between font-sans font-black uppercase text-[clamp(3.25rem,8.8vw,8.75rem)] leading-none tracking-[-0.03em] text-white drop-shadow-[0_14px_40px_rgba(0,0,0,0.85)]">
              <span>T</span>
              <span>H</span>
              <span>I</span>
              <span>N</span>
              <span>K</span>
              <span className="text-[#CCFF00]">3</span>
              <span className="text-[#CCFF00]">6</span>
              <span className="text-[#CCFF00]">0</span>
              <span>M</span>
              <span>E</span>
              <span>D</span>
              <span>I</span>
              <span>A</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile & Tablet Clean Staggered Showcase (< 1024px) */}
      <div
        id="work-mobile"
        className="relative z-10 lg:hidden bg-black px-5 py-16 border-t border-white/10"
      >
        <div className="mb-8 text-center">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-[#CCFF00]">
            SELECTED WORK
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold uppercase tracking-tight text-white">
            THINK360MEDIA IN MOTION
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STAGE_CARDS.map((work) => (
            <div key={work.id} className="w-[74vw] max-w-[300px] shrink-0 snap-center">
              <StageReelCard
                work={work}
                sizeClass="h-[430px]"
                onSelect={setSelectedWork}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Case Study Quick-View Modal (with switcher across all Think360 client work) */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedWork(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="stage-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-[#0A0A0A] text-white shadow-[0_28px_80px_rgba(0,0,0,0.85)]"
            >
              <button
                type="button"
                onClick={() => setSelectedWork(null)}
                aria-label="Close case study details"
                className="absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
              >
                <X className="size-4" />
              </button>

              <div className="aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-neutral-900">
                <img
                  src={selectedWork.image}
                  alt={selectedWork.client}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                {/* Quick Project Switcher Strip */}
                <div className="flex flex-wrap gap-1.5">
                  {ALL_WORKS.map((item) => {
                    const active = item.id === selectedWork.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedWork(item)}
                        className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          active
                            ? 'bg-[#CCFF00] text-black'
                            : 'border border-white/15 bg-white/5 text-neutral-300 hover:border-white/40 hover:text-white'
                        }`}
                      >
                        {item.client}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#CCFF00]">
                    {selectedWork.tag}
                  </span>
                  <h3 id="stage-modal-title" className="mt-1.5 font-sans text-2xl font-extrabold text-white">
                    {selectedWork.client} &mdash; {selectedWork.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-white/10 py-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                      MANDATE
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-neutral-200">
                      {selectedWork.challenge}
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                      ARCHITECTURE
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-neutral-200">
                      {selectedWork.architecture}
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                      DELIVERABLE
                    </div>
                    <p className="mt-1.5 text-xs font-bold leading-relaxed text-[#CCFF00]">
                      {selectedWork.deliverable}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedWork(null)}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-5 py-2 font-mono text-xs uppercase tracking-wider text-neutral-300 hover:border-white hover:text-white transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setSelectedWork(null)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#CCFF00] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-black transition-all hover:bg-[#DCFF4D] hover:shadow-[0_0_24px_rgba(204,255,0,0.45)]"
                  >
                    <span>Start Similar Project</span>
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StageReelCard({
  work,
  sizeClass,
  featured = false,
  onSelect,
}: {
  work: ShowcaseWork;
  sizeClass: string;
  featured?: boolean;
  onSelect: (work: ShowcaseWork) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(work)}
      className={`group relative w-full ${sizeClass} overflow-hidden rounded-[10px] border ${
        featured
          ? 'border-[#CCFF00]/50 shadow-[0_36px_95px_rgba(0,0,0,0.92)]'
          : 'border-white/20 shadow-[0_28px_80px_rgba(0,0,0,0.85)]'
      } bg-neutral-950 text-left transition-all duration-300 hover:border-[#CCFF00] hover:shadow-[0_0_40px_rgba(204,255,0,0.28)]`}
    >
      <img
        src={work.image}
        alt={work.client}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-transparent" />
      <div className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/70 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black">
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="inline-block rounded-full border border-[#CCFF00]/45 bg-black/75 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#CCFF00] backdrop-blur-sm">
          {work.tag}
        </span>
        <h3 className="mt-3 font-sans text-xl sm:text-2xl font-extrabold text-white leading-tight">
          {work.client}
        </h3>
        <p className="mt-1 font-mono text-xs text-neutral-300">
          {work.title}
        </p>
      </div>
    </button>
  );
}
