'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Header() {
  const [hidden, setHidden] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Vanish as soon as scrolling leaves the top hero fold and the rising card stage begins
      setHidden(window.scrollY > 56);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      aria-hidden={hidden}
      initial={false}
      animate={
        hidden
          ? {
              opacity: 0,
              y: prefersReducedMotion ? 0 : -28,
              scale: prefersReducedMotion ? 1 : 0.97,
              filter: prefersReducedMotion ? 'none' : 'blur(6px)',
            }
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
            }
      }
      transition={{ duration: prefersReducedMotion ? 0.15 : 0.55, ease: SMOOTH_EASE }}
      className={`fixed top-0 inset-x-0 z-[60] w-full bg-gradient-to-b from-black/90 via-black/60 to-transparent text-white will-change-transform ${
        hidden ? 'pointer-events-none select-none' : 'pointer-events-auto'
      }`}
    >
      <div className="mx-auto max-w-[940px] px-5 sm:px-8 h-[88px] sm:h-[96px] grid grid-cols-3 items-center">
        {/* Left Zone: 3 Minimal Social Icons */}
        <div className="flex items-center justify-start gap-4 sm:gap-6">
          <a
            href="mailto:hello@think360media.com?subject=Instagram%20Inquiry"
            aria-label="Instagram"
            tabIndex={hidden ? -1 : 0}
            className="inline-flex size-9 items-center justify-center rounded-full text-white hover:text-[#CCFF00] transition-colors duration-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[19px]"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="mailto:hello@think360media.com?subject=Meta%20Paid%20Social%20Inquiry"
            aria-label="Facebook"
            tabIndex={hidden ? -1 : 0}
            className="inline-flex size-9 items-center justify-center rounded-full text-white hover:text-[#CCFF00] transition-colors duration-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-[19px]"
              aria-hidden="true"
            >
              <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
            </svg>
          </a>
          <a
            href="mailto:hello@think360media.com?subject=LinkedIn%20Inquiry"
            aria-label="LinkedIn"
            tabIndex={hidden ? -1 : 0}
            className="inline-flex size-9 items-center justify-center rounded-full text-white hover:text-[#CCFF00] transition-colors duration-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-[18px]"
              aria-hidden="true"
            >
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.8c0-1.86-.03-4.25-2.59-4.25-2.59 0-2.99 2.02-2.99 4.12V23h-4V8z" />
            </svg>
          </a>
        </div>

        {/* Center Zone: Larger Prominent Think360Media Wordmark */}
        <div className="flex justify-center">
          <a
            href="#home"
            aria-label="Think360Media Home"
            tabIndex={hidden ? -1 : 0}
            className="group inline-flex min-h-[48px] items-center font-sans text-2xl sm:text-[34px] font-black tracking-[-0.045em] text-white transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04] whitespace-nowrap"
          >
            <span>Think360</span>
            <span className="text-[#CCFF00]">Media</span>
          </a>
        </div>

        {/* Right Zone: Wide Crisp White Pill CONTACT Button */}
        <div className="flex items-center justify-end">
          <a
            href="#contact"
            tabIndex={hidden ? -1 : 0}
            className="inline-flex min-h-[44px] sm:min-h-[48px] min-w-[116px] sm:min-w-[164px] items-center justify-center rounded-full bg-white px-6 sm:px-9 py-2.5 font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] text-black transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#CCFF00] hover:text-black hover:shadow-[0_0_26px_rgba(204,255,0,0.5)] hover:scale-[1.03] active:scale-[0.98]"
          >
            CONTACT
          </a>
        </div>
      </div>
    </motion.header>
  );
}
