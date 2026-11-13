'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Marquee } from './magicui/marquee';
import { MacbookScroll } from './aceternity/macbook-scroll';
import { DitherShader } from './ui/dither-shader';

function StarburstIcon({ className = 'size-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <rect
          key={i}
          x="22.5"
          y="2"
          width="3"
          height="44"
          rx="1.5"
          transform={`rotate(${i * 11.25} 24 24)`}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <>
      <section
        id="home"
        aria-labelledby="hero-heading"
        className="relative w-full bg-black text-white overflow-hidden"
      >
        {/* Full-bleed edge-to-edge @aceternity/dither-shader background */}
        <div className="relative min-h-[82vh] w-full flex items-center py-24 sm:py-32">
          <div className="absolute inset-0 z-0">
            <DitherShader
              gridSize={3}
              speed={0.6}
              ditherMode="bayer"
              primaryColor={[0.96, 0.96, 0.98]}
              backgroundColor={[0.02, 0.02, 0.03]}
              interactive={true}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.52)_52%,transparent_88%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_55%,rgba(255,77,46,0.11)_0%,transparent_58%)]"
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              {/* Fluid Display Headline with Typographic Rhythm */}
              <h1
                id="hero-heading"
                className="font-sans text-[clamp(2.75rem,6.6vw,5.75rem)] font-extrabold tracking-[-0.04em] leading-[1.05] text-white"
              >
                <span className="bg-gradient-to-b from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent">
                  Transform Your
                </span>{' '}
                <span className="font-display-serif italic font-normal text-[#FF4D2E]">
                  Marketing
                </span>{' '}
                <br className="hidden sm:inline" />
                <span className="text-white">with Think360Mind</span>
              </h1>

              {/* Editorial Subheadline */}
              <p className="mt-6 text-base sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl text-center">
                Automate Campaigns, Engage Audiences, and Boost Lead Generation with Our All-in-One Marketing Solution
              </p>
            </div>
          </div>
        </div>

        {/* Kinetic Outline Marquee */}
        <div className="py-4 bg-[var(--bg-canvas)] text-[var(--text-primary)] border-y border-[var(--border-hairline)]">
          <Marquee className="[--duration:34s] [--gap:2.5rem]" repeat={4}>
            <div className="flex items-center gap-10">
              <span className="text-stroke-outline font-sans text-2xl sm:text-4xl lg:text-[42px] font-extrabold uppercase tracking-wider select-none">
                IT&apos;S TIME TO CREATE A THINK360
              </span>
              <StarburstIcon className="size-8 sm:size-10 text-[var(--text-primary)] animate-spin-slow shrink-0" />
            </div>
          </Marquee>
        </div>
      </section>

      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative py-20 sm:py-32 bg-[var(--bg-canvas)] text-[var(--text-primary)] overflow-hidden border-b border-[var(--border-hairline)]"
      >
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-auto opacity-80 text-[var(--border-hairline)]"
          aria-hidden="true"
        >
          <line x1="0" y1="30" x2="1440" y2="30" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="290" x2="1440" y2="290" stroke="currentColor" strokeWidth="1" />
          <circle cx="400" cy="160" r="130" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="960" cy="160" r="130" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M 0,30 C 140,30 180,110 270,110 C 360,110 400,30 530,30 L 1440,30"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M 530,30 C 670,30 700,115 760,115 C 820,115 850,30 990,30 C 1120,30 1160,115 1230,115 C 1300,115 1340,30 1440,30"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M 530,290 C 670,290 700,205 760,205 C 820,205 850,290 990,290 C 1120,290 1160,205 1230,205 C 1300,205 1340,290 1440,290"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line x1="400" y1="30" x2="400" y2="290" stroke="currentColor" strokeWidth="1" />
          <line x1="530" y1="160" x2="760" y2="160" stroke="currentColor" strokeWidth="1" />
          <line x1="960" y1="160" x2="1090" y2="160" stroke="currentColor" strokeWidth="1" />
        </svg>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <h2
                id="about-heading"
                className="font-sans text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-[var(--text-primary)]"
              >
                What defines us
              </h2>

              <div className="mt-12 sm:mt-20">
                <svg
                  viewBox="0 0 140 100"
                  fill="none"
                  className="w-28 sm:w-36 h-auto text-[var(--text-primary)] transition-transform duration-500 hover:-translate-x-2"
                  aria-hidden="true"
                >
                  <line
                    x1="130"
                    y1="50"
                    x2="12"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="7"
                  />
                  <polyline
                    points="52,12 12,50 52,88"
                    stroke="currentColor"
                    strokeWidth="7"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="font-sans text-xl sm:text-2xl lg:text-[26px] font-bold leading-[1.35] tracking-tight text-[var(--text-primary)]">
                We&apos;re brand builders at heart, creators by design, tech enthusiasts in practice, and integrated at our core.
              </h3>

              <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                We are on a mission to unite brand strategy, studio production, performance media, and marketing technology into one seamless operating system. By removing the silos between creative agencies, media buyers, and SEO teams, we turn bold ideas into compounding commercial growth.
              </p>

              <div className="mt-9">
                <a
                  href="#services"
                  className="group inline-flex min-h-[52px] items-center gap-3 rounded-full bg-black text-white dark:bg-white dark:text-black px-9 py-4 text-sm font-bold transition-all duration-200 hover:bg-[var(--accent)] hover:text-white dark:hover:bg-[var(--accent)] dark:hover:text-white hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Dive Into Our Solutions</span>
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* @aceternity/macbook-scroll Continuous Scroll Showcase */}
      <section
        aria-label="Think360 Digital Work Showcase"
        className="relative w-full overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)] border-b border-[var(--border-hairline)]"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <MacbookScroll
            title={
              <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                Crafted for Every Screen.{' '}
                <span className="font-display-serif italic font-normal text-[var(--accent)]">
                  Built to Convert.
                </span>
              </h2>
            }
          />
        </div>
      </section>
    </>
  );
}
