'use client';

import React from 'react';
import { DitherShader } from './ui/dither-shader';

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative w-full bg-black text-white overflow-hidden"
    >
      {/* Full-bleed edge-to-edge @aceternity/dither-shader background */}
      <div className="relative min-h-[100svh] sm:min-h-[88vh] w-full flex items-center pt-24 pb-16 sm:py-32">
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
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.56)_58%,transparent_92%)] sm:bg-[radial-gradient(circle_at_25%_50%,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.52)_52%,transparent_88%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_55%,rgba(204,255,0,0.11)_0%,transparent_58%)]"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Fluid Display Headline with Typographic Rhythm */}
            <h1
              id="hero-heading"
              className="font-sans text-[clamp(2.25rem,9vw,5.75rem)] font-extrabold tracking-[-0.04em] leading-[1.06] text-white"
            >
              <span className="bg-gradient-to-b from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent">
                Transform Your
              </span>{' '}
              <span className="font-display-serif italic font-normal text-[#CCFF00]">
                Marketing
              </span>{' '}
              <br className="hidden sm:inline" />
              <span className="text-white">with Think360Media</span>
            </h1>

            {/* Editorial Subheadline */}
            <p className="mt-5 sm:mt-6 text-[15px] sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-xl sm:max-w-2xl text-center">
              Automate Campaigns, Engage Audiences, and Boost Lead Generation with Our All-in-One Marketing Solution
            </p>

            {/* Quiet Scroll Affordance */}
            <a
              href="#work"
              aria-label="Scroll to explore Think360Media"
              className="group mt-10 sm:mt-12 inline-flex min-h-[44px] flex-col items-center justify-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
            >
              <span>Scroll to explore</span>
              <span className="flex flex-col items-center">
                <span className="h-5 w-px bg-gradient-to-b from-[#CCFF00] to-transparent transition-all duration-300 group-hover:h-7" />
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-[#CCFF00] transition-transform duration-300 group-hover:translate-y-0.5 motion-safe:animate-bounce"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
