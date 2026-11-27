'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Minimize2, X } from 'lucide-react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { Hero } from './Hero';

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MORPH_SPRING = { type: 'spring' as const, stiffness: 210, damping: 28, mass: 0.9 };

interface ShowcaseWork {
  id: string;
  code: string;
  client: string;
  tag: string;
  title: string;
  image: string;
  objective: string;
  approach: string;
  impact: string;
  fromXRatio: number;
  fromYRatio: number;
  fromRot: number;
  bundleX: number;
  bundleY: number;
  bundleRot: number;
}

const DECK_CARDS: ShowcaseWork[] = [
  {
    id: 'heartlink',
    code: '01',
    client: 'Heartlink',
    tag: 'Branding & Discovery',
    title: 'Connecting Souls & Families',
    image: '/assets/work/heartlink.jpg',
    objective:
      'Build an approachable, trustworthy brand experience for families seeking meaningful care and connection.',
    approach:
      'Strategy-led identity refresh paired with clean digital journeys, social storytelling, and search discovery.',
    impact: 'Consistent recognition & higher organic engagement',
    fromXRatio: -0.8,
    fromYRatio: -0.7,
    fromRot: -32,
    bundleX: -12,
    bundleY: 8,
    bundleRot: -7.5,
  },
  {
    id: 'urban-dancera',
    code: '02',
    client: 'Urban Dancera',
    tag: 'Creative & Social',
    title: 'Educate. Entertain. Empower.',
    image: '/assets/work/urban-dancera.jpg',
    objective:
      'Capture attention with high-energy storytelling that transforms viewers into an active community.',
    approach:
      'Thumb-stopping creative production, consistent social media marketing, and authentic creator collaborations.',
    impact: 'Sustained audience growth & community loyalty',
    fromXRatio: 0.84,
    fromYRatio: -0.64,
    fromRot: 28,
    bundleX: 13,
    bundleY: -6,
    bundleRot: 5.8,
  },
  {
    id: 'belluret',
    code: '03',
    client: 'Bellurét',
    tag: 'Brand & E-Commerce',
    title: 'Your Undeniable Beauty',
    image: '/assets/work/belluret.jpg',
    objective:
      'Position Bellurét as an unforgettable modern beauty & lifestyle brand built for scale across channels.',
    approach:
      'Integrated brand identity, conversion-focused storefront experience, creative production, and performance media.',
    impact: 'Cohesive luxury presence & scalable growth funnel',
    fromXRatio: -0.76,
    fromYRatio: 0.74,
    fromRot: 24,
    bundleX: -6,
    bundleY: -8,
    bundleRot: -3.2,
  },
  {
    id: 'swan-energy',
    code: '04',
    client: 'Swan Energy Limited',
    tag: 'Digital & SEO',
    title: 'Enterprise Brand Presence',
    image: '/assets/work/swan-energy.jpg',
    objective:
      'Present multi-sector industrial leadership through a clear, credible, and modern corporate presence.',
    approach:
      'Structured web architecture, brand communication clarity, and search engine visibility.',
    impact: 'Unified corporate credibility across audiences',
    fromXRatio: 0.8,
    fromYRatio: 0.72,
    fromRot: -27,
    bundleX: 8,
    bundleY: 9,
    bundleRot: 3.6,
  },
  {
    id: 'arch-events',
    code: '05',
    client: 'Arch Events',
    tag: 'Branding, PR & Offline',
    title: 'Experiential Brand Storytelling',
    image: '/assets/work/arch-events.jpg',
    objective:
      'Translate live experiential excellence into a memorable brand identity beyond physical venues.',
    approach:
      'Strategy-led creative direction, strategic PR positioning, and cohesive digital showcase.',
    impact: 'Distinct brand recall across live & digital channels',
    fromXRatio: 0.05,
    fromYRatio: -0.84,
    fromRot: 16,
    bundleX: 0,
    bundleY: 0,
    bundleRot: 0,
  },
];

interface ArchiveWork {
  id: string;
  code: string;
  client: string;
  tag: string;
  title: string;
  image: string;
  objective: string;
  approach: string;
  impact: string;
}

const EXTRA_WORKS: ArchiveWork[] = [
  {
    id: 'icpa',
    code: '06',
    client: 'ICPA',
    tag: 'Communication & Media',
    title: 'Vision to a Healthy Future',
    image: '/assets/work/icfa.jpg',
    objective:
      'Strengthen healthcare authority and communicate purpose clearly to practitioners and consumers.',
    approach:
      'Consistent communication frameworks, performance outreach, and digital discovery foundations.',
    impact: 'Trusted brand leadership & sustained visibility',
  },
  {
    id: 'kamats-legacy',
    code: '07',
    client: "Kamat's Legacy",
    tag: 'Hospitality & Discovery',
    title: 'Eternal Flavours of South',
    image: '/assets/work/kamats-legacy.jpg',
    objective:
      'Honour decades of South Indian culinary heritage while attracting a new generation of diners.',
    approach:
      'Identity storytelling, local search optimization, social content, and offline-to-digital consistency.',
    impact: 'Stronger recognition & repeat dining affinity',
  },
  {
    id: 'kosi',
    code: '08',
    client: 'Kosi (Est. 2015)',
    tag: 'Brand & Performance',
    title: 'From the Land of Gods',
    image: '/assets/work/kosi.jpg',
    objective:
      'Turn authentic regional craft into a scalable consumer brand across digital and marketplace touchpoints.',
    approach:
      'Creative production, marketplace marketing, and measurable performance advertising.',
    impact: 'High-trust brand positioning & repeat demand',
  },
  {
    id: 'kidway-global',
    code: '09',
    client: 'Kidway Global Online School',
    tag: 'Acquisition & Social',
    title: 'Modern Online Learning Growth',
    image: '/assets/work/kidway-global.jpg',
    objective:
      'Reach modern parents with clear, confidence-building communication that drives admissions.',
    approach:
      'Performance marketing, social media campaigns, and personalized CRM communication.',
    impact: 'Measurable parent inquiries & brand trust',
  },
  {
    id: 'kayimpex',
    code: '10',
    client: 'Kayimpex (Est. 1988)',
    tag: 'B2B Digital & SEO',
    title: 'Global Trade Visibility',
    image: '/assets/work/kayimpex.jpg',
    objective:
      'Modernize a multi-decade export brand to connect seamlessly with global B2B partners.',
    approach:
      'Growth-oriented website experience, structured SEO, and clear corporate positioning.',
    impact: 'Always-on international discovery pipeline',
  },
];

const ALL_WORKS: ArchiveWork[] = [...DECK_CARDS, ...EXTRA_WORKS];

type StageMode = 'scroll' | 'bundled' | 'spinning' | 'rest' | 'closing';

const CHAKRI_DURATION_MS = 1800;
const CLOSE_DURATION_MS = 820;
const TOTAL_SPIN_RAD = Math.PI * 3.0; // 1.5 smooth circular chakri revolutions

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -9 * t);
}

function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

export function ElseHeroStage() {
  const id = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const blurVeilRef = useRef<HTMLDivElement>(null);
  const cardsLayerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expandedCardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [uiMode, setUiMode] = useState<StageMode>('scroll');
  const [activeWork, setActiveWork] = useState<ArchiveWork | null>(null);

  const animRef = useRef({
    mode: 'scroll' as StageMode,
    scrollTarget: 0,
    scrollSmooth: 0,
    chakriStart: 0,
    closeStart: 0,
    stageWidth: 1280,
    stageHeight: 760,
  });

  useOutsideClick(expandedCardRef, () => {
    if (activeWork) setActiveWork(null);
  });

  const triggerChakri = () => {
    const state = animRef.current;
    if (state.mode === 'spinning' || state.mode === 'rest') return;
    if (prefersReducedMotion) {
      state.mode = 'rest';
      setUiMode('rest');
      return;
    }
    state.scrollTarget = 1;
    state.scrollSmooth = 1;
    state.mode = 'spinning';
    state.chakriStart = performance.now();
    setUiMode('spinning');
  };

  const triggerRebundle = () => {
    const state = animRef.current;
    if (state.mode !== 'rest' && state.mode !== 'spinning') return;
    setActiveWork(null);
    if (prefersReducedMotion) {
      state.mode = 'bundled';
      setUiMode('bundled');
      return;
    }
    state.mode = 'closing';
    state.closeStart = performance.now();
    setUiMode('closing');
  };

  const handleCardClick = (work: ShowcaseWork) => {
    const mode = animRef.current.mode;
    if (mode === 'rest') {
      setActiveWork(work);
      return;
    }
    if (mode === 'bundled' || (mode === 'scroll' && animRef.current.scrollSmooth >= 0.72)) {
      triggerChakri();
    }
  };

  // Lock body scroll and bind Escape cleanly while a card is expanded
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveWork(null);
      }
    };

    if (activeWork) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeWork]);

  // Pure GPU-compositor 60/120fps Hero Dissolve + Scattered Arrival + Chakri Engine
  // (Zero per-frame CSS filter blur radius mutation, zero React re-renders on hover or scroll)
  useEffect(() => {
    const stageEl = stageRef.current;
    const trackEl = trackRef.current;
    if (!stageEl || !trackEl) return;

    const updateSize = () => {
      const rect = stageEl.getBoundingClientRect();
      animRef.current.stageWidth = Math.max(320, rect.width);
      animRef.current.stageHeight = Math.max(480, rect.height);
    };
    updateSize();

    const ro = new ResizeObserver(updateSize);
    ro.observe(stageEl);

    const readScrollProgress = () => {
      const rect = trackEl.getBoundingClientRect();
      const vh = Math.max(1, window.innerHeight);
      const scrollSpan = Math.max(vh * 1.15, (rect.height - vh) * 0.78);
      const traveled = -rect.top;
      const p = Math.max(0, Math.min(1, traveled / scrollSpan));
      animRef.current.scrollTarget = p;

      if (p < 0.22 && (animRef.current.mode === 'rest' || animRef.current.mode === 'spinning')) {
        animRef.current.mode = 'scroll';
        setActiveWork(null);
        setUiMode('scroll');
      }
    };

    readScrollProgress();
    window.addEventListener('scroll', readScrollProgress, { passive: true });

    let rafId = 0;
    let lastTs = performance.now();

    const computeRadii = (w: number, h: number) => {
      if (w >= 1280) {
        return { rx: Math.min(w * 0.36, 445), ry: Math.min(h * 0.27, 214) };
      }
      if (w >= 1024) {
        return { rx: Math.min(w * 0.35, 365), ry: Math.min(h * 0.27, 198) };
      }
      if (w >= 640) {
        return { rx: Math.min(w * 0.33, 245), ry: Math.min(h * 0.26, 185) };
      }
      return { rx: Math.min(w * 0.31, 118), ry: Math.min(h * 0.25, 170) };
    };

    const applyHeroDissolve = (p: number) => {
      const heroEl = heroLayerRef.current;
      const veilEl = blurVeilRef.current;
      if (!heroEl || !veilEl) return;

      // 0% -> 8%: 100% sharp Hero
      // 8% -> 82%: GPU-composited frosted veil fades in (opacity only — zero blur-radius thrash)
      // while Hero scales smoothly down and fades completely to 0
      const fadeP = Math.max(0, Math.min(1, (p - 0.08) / 0.74));
      const smoothFade = easeInOutQuart(fadeP);
      const heroOpacity = Math.max(0, 1 - smoothFade);
      const scale = 1 - smoothFade * 0.075;

      // Veil rises smoothly over the Hero during transition, then gently clears to pure black once Hero vanishes
      const veilOpacity = Math.sin(fadeP * Math.PI) * 0.92;

      heroEl.style.opacity = heroOpacity.toFixed(4);
      heroEl.style.transform = `translate3d(0, 0, 0) scale(${scale.toFixed(4)})`;
      heroEl.style.pointerEvents = p < 0.22 ? 'auto' : 'none';
      heroEl.style.visibility = heroOpacity <= 0.004 ? 'hidden' : 'visible';

      veilEl.style.opacity = veilOpacity.toFixed(4);
      veilEl.style.visibility = veilOpacity <= 0.004 ? 'hidden' : 'visible';
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      const st = animRef.current;
      const { stageWidth: w, stageHeight: h } = st;
      const { rx: targetRx, ry: targetRy } = computeRadii(w, h);

      if (prefersReducedMotion) {
        const p = st.scrollTarget;
        const heroGone = p >= 0.45 || st.mode === 'rest';
        applyHeroDissolve(heroGone ? 1 : 0);
        if (cardsLayerRef.current) {
          cardsLayerRef.current.style.pointerEvents = heroGone ? 'auto' : 'none';
        }
        DECK_CARDS.forEach((c, i) => {
          const slot = slotRefs.current[i];
          if (!slot) return;
          if (!heroGone) {
            slot.style.opacity = '0';
            return;
          }
          if (st.mode === 'rest') {
            const angle = -Math.PI / 2 + (i / DECK_CARDS.length) * Math.PI * 2 + TOTAL_SPIN_RAD;
            slot.style.transform = `translate3d(${(Math.cos(angle) * targetRx).toFixed(2)}px, ${(Math.sin(angle) * targetRy).toFixed(2)}px, 0) rotate(0deg) scale(1)`;
          } else {
            slot.style.transform = `translate3d(${c.bundleX}px, ${c.bundleY}px, 0) rotate(${c.bundleRot}deg) scale(1)`;
          }
          slot.style.opacity = '1';
        });
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (st.mode === 'scroll' || st.mode === 'bundled') {
        // Crisp responsive damping paired with global Lenis smooth inertia (zero rubbery double-lag)
        st.scrollSmooth += (st.scrollTarget - st.scrollSmooth) * (1 - Math.exp(-14 * dt));
        if (Math.abs(st.scrollTarget - st.scrollSmooth) < 0.0005) {
          st.scrollSmooth = st.scrollTarget;
        }
        applyHeroDissolve(st.scrollSmooth);

        if (st.scrollSmooth >= 0.95 && st.mode !== 'bundled') {
          st.mode = 'bundled';
          setUiMode('bundled');
        } else if (st.scrollSmooth < 0.88 && st.mode === 'bundled') {
          st.mode = 'scroll';
          setUiMode('scroll');
        }

        const cardsP = Math.max(0, Math.min(1, (st.scrollSmooth - 0.08) / 0.86));
        if (cardsLayerRef.current) {
          cardsLayerRef.current.style.pointerEvents = cardsP > 0.14 ? 'auto' : 'none';
        }

        DECK_CARDS.forEach((c, i) => {
          const slot = slotRefs.current[i];
          if (!slot) return;
          const stagger = i * 0.05;
          const localP = Math.max(0, Math.min(1, (cardsP - stagger) / (1 - stagger * 0.7)));
          const e = easeOutQuart(localP);

          const startX = c.fromXRatio * w;
          const startY = c.fromYRatio * h;
          const x = startX + (c.bundleX - startX) * e;
          const y = startY + (c.bundleY - startY) * e;
          const rot = c.fromRot + (c.bundleRot - c.fromRot) * e;
          const scale = 0.84 + 0.16 * e;
          const opacity = localP <= 0.01 ? 0 : Math.min(1, localP * 2.1);

          slot.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
          slot.style.opacity = opacity.toFixed(3);
        });
      } else if (st.mode === 'spinning') {
        applyHeroDissolve(1);
        if (cardsLayerRef.current) cardsLayerRef.current.style.pointerEvents = 'auto';

        const rawT = Math.min(1, (now - st.chakriStart) / CHAKRI_DURATION_MS);
        const radiusT = easeOutQuart(Math.min(1, rawT * 1.18));
        const spinT = easeOutExpo(rawT);
        const spinVelocity = Math.pow(1 - rawT, 3.2);

        const rx = targetRx * radiusT;
        const ry = targetRy * radiusT;

        DECK_CARDS.forEach((c, i) => {
          const slot = slotRefs.current[i];
          if (!slot) return;
          const baseAngle = -Math.PI / 2 + (i / DECK_CARDS.length) * Math.PI * 2;
          const angle = baseAngle + spinT * TOTAL_SPIN_RAD;

          const x = c.bundleX * (1 - radiusT) + Math.cos(angle) * rx;
          const y = c.bundleY * (1 - radiusT) + Math.sin(angle) * ry;

          const tangentDeg = ((angle * 180) / Math.PI + 90) * 0.22 * spinVelocity;
          const rot = c.bundleRot * (1 - radiusT) + tangentDeg;
          const scale = 0.92 + 0.08 * radiusT;

          slot.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
          slot.style.opacity = '1';
        });

        if (rawT >= 1) {
          st.mode = 'rest';
          setUiMode('rest');
        }
      } else if (st.mode === 'rest') {
        applyHeroDissolve(1);
        if (cardsLayerRef.current) cardsLayerRef.current.style.pointerEvents = 'auto';

        DECK_CARDS.forEach((_, i) => {
          const slot = slotRefs.current[i];
          if (!slot) return;
          const angle = -Math.PI / 2 + (i / DECK_CARDS.length) * Math.PI * 2 + TOTAL_SPIN_RAD;
          const x = Math.cos(angle) * targetRx;
          const y = Math.sin(angle) * targetRy;
          slot.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(0deg) scale(1)`;
          slot.style.opacity = '1';
        });
      } else if (st.mode === 'closing') {
        applyHeroDissolve(1);
        if (cardsLayerRef.current) cardsLayerRef.current.style.pointerEvents = 'auto';

        const rawT = Math.min(1, (now - st.closeStart) / CLOSE_DURATION_MS);
        const t = easeInOutQuart(rawT);
        const radiusT = 1 - t;
        const spinBack = -t * Math.PI * 0.85;
        const rx = targetRx * radiusT;
        const ry = targetRy * radiusT;

        DECK_CARDS.forEach((c, i) => {
          const slot = slotRefs.current[i];
          if (!slot) return;
          const angle = -Math.PI / 2 + (i / DECK_CARDS.length) * Math.PI * 2 + TOTAL_SPIN_RAD + spinBack;
          const x = c.bundleX * t + Math.cos(angle) * rx;
          const y = c.bundleY * t + Math.sin(angle) * ry;
          const rot = c.bundleRot * t + (1 - t) * (-14 * Math.sin(rawT * Math.PI));

          slot.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(1)`;
          slot.style.opacity = '1';
        });

        if (rawT >= 1) {
          st.mode = 'bundled';
          setUiMode('bundled');
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('scroll', readScrollProgress);
    };
  }, [prefersReducedMotion]);

  const isRest = uiMode === 'rest';

  return (
    <div ref={trackRef} className="relative h-[230svh] sm:h-[250vh] w-full bg-black">
      <span
        id="work"
        aria-hidden="true"
        className="pointer-events-none absolute top-[54%] left-0 h-px w-px"
      />

      <div
        ref={stageRef}
        aria-label="Hero and Selected Work Showcase"
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black"
      >
        {/* Layer 1: Live Hero (compositor-only scale + opacity dissolve — ZERO per-frame blur thrash) */}
        <div
          ref={heroLayerRef}
          className="absolute inset-0 z-10 h-full w-full will-change-[transform,opacity]"
        >
          <Hero />
        </div>

        {/* Layer 1.5: Fixed-radius GPU Frosted Blur Veil (animates opacity ONLY for butter-smooth Apple blur transition) */}
        <div
          ref={blurVeilRef}
          aria-hidden="true"
          style={{ opacity: 0, visibility: 'hidden' }}
          className="pointer-events-none absolute inset-0 z-[15] bg-black/35 backdrop-blur-xl will-change-[opacity]"
        />

        {/* Layer 2: Floating Apple Liquid Glass Cards (Zero opaque curtain wall, zero external text) */}
        <div ref={cardsLayerRef} className="absolute inset-0 z-20 pointer-events-none">
          <h2 className="sr-only">Selected Work</h2>

          {/* Icon-only Apple Glass Center Collapse Button */}
          <button
            type="button"
            onClick={triggerRebundle}
            aria-label="Fold cards back into bundle"
            tabIndex={isRest && !activeWork ? 0 : -1}
            className={`absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 inline-flex size-12 sm:size-14 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] text-white backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.38)] transition-[opacity,transform,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#CCFF00] hover:text-[#CCFF00] hover:scale-110 focus-visible:outline-2 focus-visible:outline-white ${
              isRest && !activeWork
                ? 'opacity-100 pointer-events-auto scale-100'
                : 'opacity-0 pointer-events-none scale-75'
            }`}
          >
            <Minimize2 className="size-4 sm:size-5" aria-hidden="true" />
          </button>

          {/* 5 Positioned Chakri Slots — DOM z-index promotion on hover (zero React re-renders!) */}
          {DECK_CARDS.map((work, index) => {
            const isExpanded = activeWork?.id === work.id;
            return (
              <div
                key={work.id}
                ref={(el) => {
                  slotRefs.current[index] = el;
                }}
                onMouseEnter={() => {
                  const slot = slotRefs.current[index];
                  if (slot) slot.style.zIndex = '60';
                }}
                onMouseLeave={() => {
                  const slot = slotRefs.current[index];
                  if (slot) slot.style.zIndex = String(10 + index);
                }}
                style={{
                  zIndex: 10 + index,
                  opacity: 0,
                }}
                className="absolute left-1/2 top-1/2 -ml-[62px] -mt-[83px] h-[166px] w-[124px] sm:-ml-[80px] sm:-mt-[107px] sm:h-[214px] sm:w-[160px] lg:-ml-[96px] lg:-mt-[128px] lg:h-[256px] lg:w-[192px] xl:-ml-[106px] xl:-mt-[140px] xl:h-[280px] xl:w-[212px] will-change-transform"
              >
                {/* Dedicated GPU Hover-Enlarge Wrapper (keeps hover transform cleanly separated from Framer Motion layoutId) */}
                {!isExpanded && (
                  <div className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.13] hover:-translate-y-1.5 will-change-transform">
                    <motion.button
                      layoutId={`card-${work.id}-${id}`}
                      transition={MORPH_SPRING}
                      type="button"
                      onClick={() => handleCardClick(work)}
                      aria-label={
                        isRest
                          ? `Expand ${work.client} growth story`
                          : `Open card bundle in circular spin`
                      }
                      className="group relative block h-full w-full overflow-hidden rounded-[18px] sm:rounded-[22px] border border-white/28 bg-gradient-to-br from-white/[0.15] via-white/[0.06] to-black/55 text-left backdrop-blur-md backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(255,255,255,0.1),0_22px_54px_rgba(0,0,0,0.72)] transition-[border-color,box-shadow] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/75 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.68),0_32px_78px_rgba(0,0,0,0.9)] focus-visible:outline-2 focus-visible:outline-white"
                    >
                      <motion.div
                        layoutId={`image-${work.id}-${id}`}
                        transition={MORPH_SPRING}
                        className="absolute inset-0 h-full w-full"
                      >
                        <img
                          src={work.image}
                          alt={work.client}
                          className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-95"
                        />
                      </motion.div>

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.04)_36%,transparent_60%)]"
                      />

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/22 to-transparent"
                      />

                      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3 sm:p-4">
                        <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.16em] text-white/85">
                          {work.code}
                        </span>
                        <motion.span
                          layoutId={`cta-${work.id}-${id}`}
                          transition={MORPH_SPRING}
                          className="inline-flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black"
                        >
                          <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </motion.span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
                        <p className="font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-200/85 line-clamp-1">
                          {work.tag}
                        </p>
                        <motion.h3
                          layoutId={`title-${work.id}-${id}`}
                          transition={MORPH_SPRING}
                          className="mt-0.5 sm:mt-1 font-sans text-xs sm:text-base lg:text-[17px] font-extrabold tracking-tight text-white leading-tight line-clamp-2"
                        >
                          {work.client}
                        </motion.h3>
                        <motion.p
                          layoutId={`subtitle-${work.id}-${id}`}
                          transition={MORPH_SPRING}
                          className="hidden sm:block mt-0.5 font-sans text-[11px] text-neutral-200/85 line-clamp-1"
                        >
                          {work.title}
                        </motion.p>
                      </div>
                    </motion.button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Shared-Element Expandable Card Morph Overlay */}
      <AnimatePresence>
        {activeWork && (
          <motion.div
            key="expand-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: SMOOTH_EASE }}
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeWork && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`expanded-title-${activeWork.id}`}
            className="fixed inset-0 z-[101] grid place-items-center p-3 sm:p-6 pointer-events-none"
          >
            <motion.div
              ref={expandedCardRef}
              layoutId={`card-${activeWork.id}-${id}`}
              transition={MORPH_SPRING}
              className="pointer-events-auto relative w-full max-w-[560px] max-h-[88dvh] flex flex-col overflow-hidden rounded-3xl border border-white/20 bg-[#0B0B0D]/92 text-white backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_32px_100px_rgba(0,0,0,0.92)]"
            >
              <motion.button
                key={`close-${activeWork.id}-${id}`}
                type="button"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.1 } }}
                onClick={() => setActiveWork(null)}
                aria-label="Close expanded card"
                className="absolute top-3.5 right-3.5 z-20 inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition-colors duration-200 hover:border-white hover:bg-white hover:text-black"
              >
                <X className="size-4" aria-hidden="true" />
              </motion.button>

              <motion.div
                layoutId={`image-${activeWork.id}-${id}`}
                transition={MORPH_SPRING}
                className="relative h-52 sm:h-64 w-full shrink-0 overflow-hidden bg-neutral-950"
              >
                <img
                  src={activeWork.image}
                  alt={activeWork.client}
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-black/25"
                />
              </motion.div>

              <div className="flex items-start justify-between gap-4 px-5 sm:px-7 pt-4 pb-3 border-b border-white/10">
                <div className="min-w-0">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    {activeWork.code} / {activeWork.tag}
                  </p>
                  <motion.h3
                    id={`expanded-title-${activeWork.id}`}
                    layoutId={`title-${activeWork.id}-${id}`}
                    transition={MORPH_SPRING}
                    className="mt-1 font-sans text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight"
                  >
                    {activeWork.client}
                  </motion.h3>
                  <motion.p
                    layoutId={`subtitle-${activeWork.id}-${id}`}
                    transition={MORPH_SPRING}
                    className="mt-0.5 font-sans text-xs sm:text-sm text-neutral-400 text-balance"
                  >
                    {activeWork.title}
                  </motion.p>
                </div>

                <motion.a
                  layoutId={`cta-${activeWork.id}-${id}`}
                  transition={MORPH_SPRING}
                  href="#contact"
                  onClick={() => setActiveWork(null)}
                  className="shrink-0 inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-white px-4 sm:px-5 py-2 font-sans text-xs font-bold text-black transition-colors duration-200 hover:bg-[#CCFF00]"
                >
                  <span>Start Project</span>
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </motion.a>
              </div>

              <div className="overflow-y-auto px-5 sm:px-7 py-5 space-y-5 [scrollbar-width:none] [-ms-overflow-style:none]">
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: SMOOTH_EASE }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                        Objective <span className="text-white">&bull; 55%</span>
                      </div>
                      <p className="mt-1.5 font-sans text-xs leading-relaxed text-neutral-200">
                        {activeWork.objective}
                      </p>
                    </div>
                    <div>
                      <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                        Approach <span className="text-white">&bull; 30%</span>
                      </div>
                      <p className="mt-1.5 font-sans text-xs leading-relaxed text-neutral-200">
                        {activeWork.approach}
                      </p>
                    </div>
                    <div>
                      <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                        Impact <span className="text-[#CCFF00]">&bull; 92%</span>
                      </div>
                      <p className="mt-1.5 font-sans text-xs font-semibold leading-relaxed text-white">
                        {activeWork.impact}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {ALL_WORKS.map((item) => {
                        const selected = item.id === activeWork.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveWork(item)}
                            className={`rounded-full px-3 py-1 font-sans text-[11px] font-semibold transition-colors duration-200 ${
                              selected
                                ? 'bg-white text-black'
                                : 'border border-white/12 bg-white/[0.03] text-neutral-400 hover:border-white/35 hover:text-white'
                            }`}
                          >
                            {item.client}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
