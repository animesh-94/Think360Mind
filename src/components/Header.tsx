'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#clients' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[60] w-full transition-all duration-300 ${
        scrolled
          ? 'bg-black/92 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.45)]'
          : 'bg-black border-b border-white/5'
      } text-white`}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 h-[78px] grid grid-cols-3 items-center">
        {/* Left Zone: Minimal Social Icons (Else Social layout) + Quiet Section Anchors */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-3.5">
            <a
              href="mailto:hello@think360media.com?subject=Instagram%20Inquiry"
              aria-label="Instagram"
              className="inline-flex size-9 items-center justify-center rounded-full text-white/85 hover:text-[#CCFF00] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="size-[17px]" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="mailto:hello@think360media.com?subject=Meta%20Paid%20Social%20Inquiry"
              aria-label="Facebook"
              className="inline-flex size-9 items-center justify-center rounded-full text-white/85 hover:text-[#CCFF00] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-[17px]" aria-hidden="true">
                <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
              </svg>
            </a>
            <a
              href="mailto:hello@think360media.com?subject=LinkedIn%20Inquiry"
              aria-label="LinkedIn"
              className="inline-flex size-9 items-center justify-center rounded-full text-white/85 hover:text-[#CCFF00] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-[16px]" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.8c0-1.86-.03-4.25-2.59-4.25-2.59 0-2.99 2.02-2.99 4.12V23h-4V8z" />
              </svg>
            </a>
          </div>

          <nav aria-label="Primary navigation" className="hidden xl:flex items-center gap-5 pl-4 border-l border-white/15">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-300 hover:text-[#CCFF00] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Trigger (Left on mobile) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex sm:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {/* Center Zone: Bold Centered Wordmark (Exact Else Social Focal Alignment) */}
        <div className="flex justify-center">
          <a
            href="#home"
            aria-label="Think360Media Home"
            className="group inline-flex min-h-[44px] items-center font-sans text-xl sm:text-[26px] font-black tracking-[-0.04em] text-white transition-transform duration-200 hover:scale-[1.03]"
          >
            <span>Think360Media</span>
            <span className="text-[#CCFF00] transition-transform duration-300 group-hover:scale-125">.</span>
          </a>
        </div>

        {/* Right Zone: Signature White Pill CONTACT CTA -> Neon Glow Hover */}
        <div className="flex items-center justify-end gap-3">
          <a
            href="#contact"
            className="inline-flex min-h-[40px] sm:min-h-[42px] items-center justify-center rounded-full bg-white px-5 sm:px-8 py-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-[#CCFF00] hover:text-black hover:shadow-[0_0_24px_rgba(204,255,0,0.5)] hover:scale-[1.03] active:scale-[0.98]"
          >
            CONTACT
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="hidden sm:inline-flex xl:hidden min-h-[42px] min-w-[42px] items-center justify-center rounded-full border border-white/20 text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Animated Slide-Down Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="xl:hidden overflow-hidden border-t border-white/10 bg-black/98 backdrop-blur-xl"
          >
            <nav className="mx-auto max-w-[1440px] px-6 py-6 flex flex-col gap-2">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[48px] items-center justify-between border-b border-white/10 font-sans text-lg font-bold uppercase tracking-wider text-white hover:text-[#CCFF00] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[#CCFF00]">&rarr;</span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#CCFF00] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black"
              >
                START A PROJECT
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
