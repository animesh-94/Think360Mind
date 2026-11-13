'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { WordRotate } from './magicui/word-rotate';

const SOLUTION_LINKS = [
  {
    title: 'Brand Solution',
    desc: 'Brand strategy, identity systems, social media & campaign storytelling.',
    href: '/#services',
  },
  {
    title: 'Tech Solution',
    desc: 'Websites, e-commerce storefronts, AI marketing workflows & CRM.',
    href: '/#services',
  },
  {
    title: 'Media Solution',
    desc: 'Performance marketing, paid social, search, PR & outdoor media buying.',
    href: '/#services',
  },
  {
    title: 'SEO & Research',
    desc: 'Technical SEO, search authority, market research & consumer insights.',
    href: '/#services',
  },
  {
    title: 'Film & Production',
    desc: 'Commercial video production, product photography, 3D motion & creator reels.',
    href: '/#services',
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('think360-theme');
      const prefersDark = savedTheme === 'dark' || document.documentElement.classList.contains('dark');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      }
      setIsDark(prefersDark);

      if (sessionStorage.getItem('think360-banner-dismissed') === '1') {
        setBannerOpen(false);
      }
    } catch {
      setIsDark(document.documentElement.classList.contains('dark'));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSolutionsOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
    try {
      localStorage.setItem('think360-theme', nextDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors in restricted contexts
    }
  };

  const dismissBanner = () => {
    setBannerOpen(false);
    try {
      sessionStorage.setItem('think360-banner-dismissed', '1');
    } catch {
      // ignore storage errors in restricted contexts
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg-canvas)] text-[var(--text-primary)] border-b border-[var(--border-hairline)] transition-colors duration-200">
      {bannerOpen && (
        <div className="bg-black text-white px-4 sm:px-8 py-2 text-xs font-medium flex items-center justify-between gap-4 border-b border-white/15">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-2 text-center">
            <span className="inline-block font-semibold">
              How well is your website really converting? Find out with a free 360° CRO &amp; Growth Audit.
            </span>
            <a
              href="/contact"
              className="inline-flex items-center gap-1 font-bold text-[#FF4D2E] underline underline-offset-4 hover:text-[#FF6B52] transition-colors"
            >
              <span>Check it out here</span>
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
          <button
            type="button"
            onClick={dismissBanner}
            aria-label="Dismiss audit announcement banner"
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-white/80 hover:bg-white/15 hover:text-white"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 h-[72px] flex items-center justify-between">
        <a
          href="/"
          aria-label="Think360 Media Home"
          className="inline-flex min-h-[44px] items-baseline gap-1.5 py-2 focus-visible:outline-2"
        >
          <span className="font-sans text-2xl sm:text-[28px] font-black tracking-[-0.04em] text-[var(--text-primary)] transition-all duration-300">
            {scrolled ? '#360.' : 'Think360.'}
          </span>
          <span className="font-sans text-sm sm:text-base font-bold tracking-tight text-[var(--text-primary)]">
            <WordRotate
              duration={2400}
              words={['Brands', 'Tech', 'Media', 'Motion Pictures', 'Search']}
            />
          </span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          <a
            href="/#work"
            className="inline-flex min-h-[44px] items-center px-4 text-sm font-semibold text-[var(--text-primary)] hover:opacity-65 transition-opacity"
          >
            Work
          </a>

          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setSolutionsOpen((prev) => !prev)}
              aria-expanded={solutionsOpen}
              aria-controls="solutions-dropdown"
              className="inline-flex min-h-[44px] items-center gap-1.5 px-4 text-sm font-semibold text-[var(--text-primary)] hover:opacity-65 transition-opacity"
            >
              <span>Solutions</span>
              <ChevronDown
                className={`size-4 transition-transform duration-200 ${
                  solutionsOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {solutionsOpen && (
              <div
                id="solutions-dropdown"
                className="absolute left-0 top-full pt-2 w-[540px] z-50"
              >
                <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)] grid grid-cols-2 gap-3">
                  {SOLUTION_LINKS.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={() => setSolutionsOpen(false)}
                      className="group rounded-xl border border-transparent hover:border-[var(--border-hairline)] hover:bg-[var(--bg-elevated)] p-3.5 transition-all"
                    >
                      <div className="flex items-center justify-between text-sm font-bold text-[var(--text-primary)]">
                        <span>{item.title}</span>
                        <ArrowRight
                          className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">
                        {item.desc}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href="/#about"
            className="inline-flex min-h-[44px] items-center px-4 text-sm font-semibold text-[var(--text-primary)] hover:opacity-65 transition-opacity"
          >
            About
          </a>

          <a
            href="/#insights"
            className="inline-flex min-h-[44px] items-center px-4 text-sm font-semibold text-[var(--text-primary)] hover:opacity-65 transition-opacity"
          >
            Resources
          </a>

          <a
            href="/#clients"
            className="inline-flex min-h-[44px] items-center px-4 text-sm font-semibold text-[var(--text-primary)] hover:opacity-65 transition-opacity"
          >
            Clients
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'Switch to white mode' : 'Switch to dark mode'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-3 text-xs font-bold text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors"
          >
            {isDark ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </button>

          <a
            href="/contact"
            className="hidden sm:inline-flex min-h-[46px] items-center gap-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black px-7 py-3 text-sm font-bold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span className="size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            <span>Contact Us</span>
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="inline-flex lg:hidden min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-hairline)] px-4 py-2 text-xs font-bold text-[var(--text-primary)]"
          >
            {mobileMenuOpen ? (
              <>
                <X className="size-4" aria-hidden="true" />
                <span>Close</span>
              </>
            ) : (
              <>
                <Menu className="size-4" aria-hidden="true" />
                <span>Menu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-5"
        >
          <ul className="flex flex-col gap-1">
            {[
              { label: 'Work', href: '/#work' },
              { label: 'Solutions', href: '/#services' },
              { label: 'About', href: '/#about' },
              { label: 'Resources', href: '/#insights' },
              { label: 'Clients', href: '/#clients' },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] items-center justify-between rounded-xl px-4 py-3 text-base font-bold text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black px-6 py-3.5 text-sm font-bold"
              >
                <span>Contact Us</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
