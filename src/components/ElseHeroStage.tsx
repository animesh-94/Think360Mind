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

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
    tag: 'Digital Product & Search',
    title: 'Connected Cardiac Care & Patient Funnels',
    image: '/assets/work/heartlink.jpg',
    challenge: 'Drive high-intent patient bookings across regional specialties with frictionless mobile scheduling.',
    architecture: 'Light-mode patient booking UX paired with hyper-local search funnels and tracked attribution.',
    deliverable: 'Web App UX + Local Search Engine',
  },
  {
    id: 'belluret',
    client: 'Bellurét Paris',
    tag: 'Luxury D2C Flagship & Film',
    title: 'Haute Horlogerie Storefront & Launch Film',
    image: '/assets/work/belluret.jpg',
    challenge: 'Pair editorial luxury desire with sub-second checkout speed and automated VIP clienteling.',
    architecture: 'Headless Shopify Plus storefront, studio macro photography, and Klaviyo + WhatsApp flows.',
    deliverable: 'Headless Flagship + Studio Launch Kit',
  },
  {
    id: 'urban-dancera',
    client: 'Urban Dancera',
    tag: 'Studio Production & Reels',
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
    tag: 'Enterprise Web & SEO',
    title: 'Enterprise Infrastructure Portal',
    image: '/assets/work/swan-energy.jpg',
    challenge: 'Consolidate complex industrial divisions into one unified, fast-loading investor & B2B portal.',
    architecture: 'Structured Next.js enterprise architecture, entity schema graph, and Core Web Vitals optimization.',
    deliverable: 'Enterprise Portal + Technical SEO',
  },
  {
    id: 'arch-events',
    client: 'Arch Events',
    tag: 'Experiential Branding',
    title: 'Spatial Identity & Live Stagecraft',
    image: '/assets/work/arch-events.jpg',
    challenge: 'Elevate an experiential production house with an unmistakable visual and physical identity.',
    architecture: 'Environmental typography, VIP press credential kits, and architectural digital showcase.',
    deliverable: 'Identity System + Event Collateral',
  },
  {
    id: 'kosi',
    client: 'Kosi Studio',
    tag: '3D Film & Google PMax',
    title: 'Precision Acoustic Hardware Launch',
    image: '/assets/work/kosi.jpg',
    challenge: 'Translate machined industrial craftsmanship into high-converting Shopping & YouTube ads.',
    architecture: 'Tabletop product films cut into Performance Max hook variants and Merchant Center feeds.',
    deliverable: 'Launch Film + Google PMax Engine',
  },
  {
    id: 'kamats-legacy',
    client: "Kamat's Legacy",
    tag: 'Hospitality Rebrand',
    title: 'Heritage Culinary Identity & Local GEO',
    image: '/assets/work/kamats-legacy.jpg',
    challenge: 'Refresh a storied hospitality brand for modern diners while preserving heritage equity.',
    architecture: 'Refined print & digital menu language, table booking UX, and multi-city local search.',
    deliverable: 'Rebrand + Reservation Experience',
  },
  {
    id: 'kidway-global',
    client: 'Kidway Global',
    tag: 'D2C Retail & Meta Ads',
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

  // Silky high-inertia luxury spring smoothing for BOTH mobile & desktop scroll choreography
  const smooth = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 24,
    mass: 0.6,
  });

  // Desktop 3-column staggered rise + exit
  const centerY = useTransform(smooth, [0.02, 0.28, 0.72, 0.98], ['105vh', '0vh', '0vh', '-115vh']);
  const centerScale = useTransform(smooth, [0.02, 0.28, 0.72, 0.98], [0.92, 1, 1, 0.95]);
  const centerOpacity = useTransform(smooth, [0.01, 0.12, 0.88, 0.99], [0, 1, 1, 0]);

  const leftY = useTransform(smooth, [0.14, 0.4, 0.72, 0.98], ['115vh', '-3vh', '-3vh', '-118vh']);
  const leftScale = useTransform(smooth, [0.14, 0.4, 0.72, 0.98], [0.92, 1, 1, 0.95]);
  const leftOpacity = useTransform(smooth, [0.12, 0.24, 0.88, 0.99], [0, 1, 1, 0]);

  const rightY = useTransform(smooth, [0.24, 0.5, 0.72, 0.98], ['120vh', '4vh', '4vh', '-112vh']);
  const rightScale = useTransform(smooth, [0.24, 0.5, 0.72, 0.98], [0.92, 1, 1, 0.95]);
  const rightOpacity = useTransform(smooth, [0.22, 0.34, 0.88, 0.99], [0, 1, 1, 0]);

  // Monumental "THINK360MEDIA" sweeping smoothly IN FRONT OF cards on both desktop & mobile
  const wordY = useTransform(smooth, [0.36, 0.58, 0.84], ['78vh', '0vh', '-88vh']);
  const wordOpacity = useTransform(smooth, [0.34, 0.48, 0.7, 0.84], [0, 0.98, 0.98, 0]);

  // Mobile overlapping 3-card collage timings matching elsesocial.com mob-02 -> mob-04 identically
  const mobCenterY = useTransform(smooth, [0.02, 0.28, 0.74, 0.98], ['100svh', '-4svh', '-4svh', '-110svh']);
  const mobLeftY = useTransform(smooth, [0.14, 0.42, 0.74, 0.98], ['115svh', '18svh', '18svh', '-105svh']);
  const mobRightY = useTransform(smooth, [0.24, 0.52, 0.74, 0.98], ['115svh', '-2svh', '-2svh', '-108svh']);

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
      {/* Sticky Pinned Hero Layer (mobile + desktop): stays pinned behind rising cards */}
      <div className="sticky top-0 z-0 min-h-[100svh] w-full flex items-center bg-black">
        <Hero />
      </div>

      {/* Unified Rising Overlay Track (Mobile overlapping collage + Desktop 3-column staggered stage) */}
      <div
        aria-label="Featured Work Showcase"
        className="relative z-10 h-[280svh] lg:h-[330vh] -mt-[100svh] lg:-mt-[100vh] pointer-events-none"
      >
        <span id="work" className="absolute top-[24%] left-0 pointer-events-none" aria-hidden="true" />

        <div className="sticky top-0 h-[100svh] lg:h-screen w-full overflow-clip flex items-center justify-center px-4 lg:px-8">
          {/* MOBILE OVERLAPPING 3-CARD COLLAGE (< 1024px) — Exact Else Social mob-02 -> mob-04 choreography */}
          <div className="relative z-20 lg:hidden w-full max-w-[430px] h-full flex items-center justify-center pointer-events-auto">
            {/* Center Dominant Card rises first */}
            <motion.div
              style={{
                y: prefersReducedMotion ? 0 : mobCenterY,
                scale: prefersReducedMotion ? 1 : centerScale,
                opacity: prefersReducedMotion ? 1 : centerOpacity,
              }}
              className="absolute w-[64%] max-w-[265px] z-10 will-change-transform"
            >
              <StageReelCard
                work={STAGE_CARDS[1]}
                sizeClass="h-[52svh] max-h-[450px]"
                featured
                compact
                onSelect={setSelectedWork}
              />
            </motion.div>

            {/* Lower-Left Overlapping Card rises second */}
            <motion.div
              style={{
                y: prefersReducedMotion ? 0 : mobLeftY,
                scale: prefersReducedMotion ? 1 : leftScale,
                opacity: prefersReducedMotion ? 1 : leftOpacity,
              }}
              className="absolute left-0 w-[46%] max-w-[190px] z-20 will-change-transform"
            >
              <StageReelCard
                work={STAGE_CARDS[0]}
                sizeClass="h-[36svh] max-h-[310px]"
                compact
                onSelect={setSelectedWork}
              />
            </motion.div>

            {/* Mid-Right Overlapping Card rises third */}
            <motion.div
              style={{
                y: prefersReducedMotion ? 0 : mobRightY,
                scale: prefersReducedMotion ? 1 : rightScale,
                opacity: prefersReducedMotion ? 1 : rightOpacity,
              }}
              className="absolute right-0 w-[44%] max-w-[184px] z-20 will-change-transform"
            >
              <StageReelCard
                work={STAGE_CARDS[2]}
                sizeClass="h-[33svh] max-h-[290px]"
                compact
                onSelect={setSelectedWork}
              />
            </motion.div>
          </div>

          {/* DESKTOP 3-COLUMN STAGGERED CARDS (>= 1024px) */}
          <div className="relative z-20 hidden lg:grid mx-auto w-full max-w-[1080px] grid-cols-12 items-center gap-8 xl:gap-10 pointer-events-auto">
            <motion.div
              style={{
                y: prefersReducedMotion ? 0 : leftY,
                scale: prefersReducedMotion ? 1 : leftScale,
                opacity: prefersReducedMotion ? 1 : leftOpacity,
              }}
              className="col-span-4 flex justify-center will-change-transform"
            >
              <StageReelCard
                work={STAGE_CARDS[0]}
                sizeClass="max-w-[290px] h-[64vh] max-h-[560px]"
                onSelect={setSelectedWork}
              />
            </motion.div>

            <motion.div
              style={{
                y: prefersReducedMotion ? 0 : centerY,
                scale: prefersReducedMotion ? 1 : centerScale,
                opacity: prefersReducedMotion ? 1 : centerOpacity,
              }}
              className="col-span-4 flex justify-center will-change-transform"
            >
              <StageReelCard
                work={STAGE_CARDS[1]}
                sizeClass="max-w-[320px] h-[76vh] max-h-[660px]"
                featured
                onSelect={setSelectedWork}
              />
            </motion.div>

            <motion.div
              style={{
                y: prefersReducedMotion ? 0 : rightY,
                scale: prefersReducedMotion ? 1 : rightScale,
                opacity: prefersReducedMotion ? 1 : rightOpacity,
              }}
              className="col-span-4 flex justify-center will-change-transform"
            >
              <StageReelCard
                work={STAGE_CARDS[2]}
                sizeClass="max-w-[290px] h-[60vh] max-h-[530px]"
                onSelect={setSelectedWork}
              />
            </motion.div>
          </div>

          {/* Giant Monumental Letters Sweeping Up IN FRONT OF the 3 Pinned Cards (z-30) on both mobile & desktop */}
          <motion.div
            aria-hidden="true"
            style={{
              y: prefersReducedMotion ? 0 : wordY,
              opacity: prefersReducedMotion ? 0.15 : wordOpacity,
            }}
            className="pointer-events-none select-none will-change-transform absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="w-full max-w-[1440px] px-4 sm:px-6 flex items-center justify-between font-sans font-black uppercase text-[clamp(2rem,9.2vw,8.75rem)] leading-none tracking-[-0.03em] text-white drop-shadow-[0_12px_36px_rgba(0,0,0,0.9)]">
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

      {/* Interactive Case Study Quick-View Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: SMOOTH_EASE }}
            onClick={() => setSelectedWork(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="stage-modal-title"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.35, ease: SMOOTH_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0A0A0A] text-white shadow-[0_28px_80px_rgba(0,0,0,0.85)]"
            >
              <button
                type="button"
                onClick={() => setSelectedWork(null)}
                aria-label="Close case study details"
                className="absolute top-3.5 right-3.5 z-10 inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors duration-300"
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

              <div className="p-5 sm:p-8 space-y-5">
                <div className="flex flex-wrap gap-1.5">
                  {ALL_WORKS.map((item) => {
                    const active = item.id === selectedWork.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedWork(item)}
                        className={`rounded-full px-3 py-1 font-sans text-xs font-semibold transition-colors duration-300 ${
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
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#CCFF00]">
                    {selectedWork.tag}
                  </span>
                  <h3 id="stage-modal-title" className="mt-1.5 font-sans text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                    {selectedWork.client} &mdash; {selectedWork.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-white/10 py-4">
                  <div>
                    <div className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Mandate
                    </div>
                    <p className="mt-1.5 font-sans text-xs leading-relaxed text-neutral-200">
                      {selectedWork.challenge}
                    </p>
                  </div>
                  <div>
                    <div className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Architecture
                    </div>
                    <p className="mt-1.5 font-sans text-xs leading-relaxed text-neutral-200">
                      {selectedWork.architecture}
                    </p>
                  </div>
                  <div>
                    <div className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Deliverable
                    </div>
                    <p className="mt-1.5 font-sans text-xs font-bold leading-relaxed text-[#CCFF00]">
                      {selectedWork.deliverable}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedWork(null)}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-5 py-2 font-sans text-xs font-semibold text-neutral-300 hover:border-white hover:text-white transition-colors duration-300"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setSelectedWork(null)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#CCFF00] px-6 py-2.5 font-sans text-xs font-bold text-black transition-all duration-300 hover:bg-[#DCFF4D] hover:shadow-[0_0_24px_rgba(204,255,0,0.45)]"
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
  compact = false,
  onSelect,
}: {
  work: ShowcaseWork;
  sizeClass: string;
  featured?: boolean;
  compact?: boolean;
  onSelect: (work: ShowcaseWork) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(work)}
      className={`group relative w-full ${sizeClass} overflow-hidden rounded-[10px] border ${
        featured
          ? 'border-[#CCFF00]/50 shadow-[0_28px_80px_rgba(0,0,0,0.92)]'
          : 'border-white/20 shadow-[0_22px_64px_rgba(0,0,0,0.88)]'
      } bg-neutral-950 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#CCFF00] hover:shadow-[0_0_40px_rgba(204,255,0,0.28)]`}
    >
      <img
        src={work.image}
        alt={work.client}
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-transparent" />
      <div
        className={`absolute ${
          compact ? 'top-2.5 right-2.5 size-7' : 'top-4 right-4 size-10'
        } inline-flex items-center justify-center rounded-full border border-white/25 bg-black/70 text-white backdrop-blur-md transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black`}
      >
        <ArrowUpRight className={compact ? 'size-3.5' : 'size-4'} aria-hidden="true" />
      </div>
      <div className={`absolute inset-x-0 bottom-0 ${compact ? 'p-3' : 'p-5'}`}>
        {!compact && (
          <span className="inline-block rounded-full border border-[#CCFF00]/45 bg-black/75 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#CCFF00] backdrop-blur-sm">
            {work.tag}
          </span>
        )}
        <h3
          className={`${
            compact ? 'text-sm font-extrabold' : 'mt-3 text-xl sm:text-2xl font-extrabold'
          } font-sans tracking-tight text-white leading-tight`}
        >
          {work.client}
        </h3>
        <p className={`mt-0.5 font-sans text-neutral-300 line-clamp-1 ${compact ? 'text-[10px]' : 'text-xs'}`}>
          {work.title}
        </p>
      </div>
    </button>
  );
}
