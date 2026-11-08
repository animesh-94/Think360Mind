'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { LiquidWordmark } from './LiquidWordmark';

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && privacyOpen) {
        setPrivacyOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [privacyOpen]);

  return (
    <footer
      id="footer"
      className="relative bg-black text-white pt-10 sm:pt-16 pb-10 overflow-hidden"
    >
      <h2 className="sr-only">Think360 Media</h2>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-14 relative z-10">
        <div className="my-2 sm:my-4">
          <LiquidWordmark />
        </div>

        <div className="mt-8 border-t border-white/20 pt-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-white">
            <a
              href="mailto:hello@think360media.com?subject=Think360%20LinkedIn%20Inquiry"
              aria-label="Contact Think360 Media via LinkedIn Desk"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/20 bg-neutral-950 hover:border-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            <a
              href="mailto:hello@think360media.com?subject=Think360%20Instagram%20Reel%20Deck"
              aria-label="Request Think360 Media Instagram Creative Deck"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/20 bg-neutral-950 hover:border-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            <a
              href="mailto:hello@think360media.com?subject=Think360%20YouTube%20Production%20Showreel"
              aria-label="Request Think360 Media YouTube Production Showreel"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/20 bg-neutral-950 hover:border-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <a
              href="mailto:hello@think360media.com?subject=Think360%20Meta%20Media%20Buying%20Inquiry"
              aria-label="Contact Think360 Media Paid Social Team"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/20 bg-neutral-950 hover:border-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-white"
          >
            <a
              href="/#about"
              className="inline-flex min-h-[44px] items-center px-3 rounded-lg hover:opacity-70 transition-opacity"
            >
              About
            </a>
            <a
              href="/contact"
              className="inline-flex min-h-[44px] items-center px-3 rounded-lg hover:opacity-70 transition-opacity"
            >
              Contact
            </a>
            <a
              href="/#work"
              className="inline-flex min-h-[44px] items-center px-3 rounded-lg hover:opacity-70 transition-opacity"
            >
              Case Studies
            </a>
            <a
              href="/#insights"
              className="inline-flex min-h-[44px] items-center px-3 rounded-lg hover:opacity-70 transition-opacity"
            >
              Blog
            </a>
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={privacyOpen}
              className="inline-flex min-h-[44px] items-center px-3 rounded-lg text-white hover:opacity-70 transition-opacity"
            >
              Privacy
            </button>
          </nav>

          <div className="text-xs text-neutral-300 font-medium tracking-tight text-center lg:text-right leading-relaxed">
            <span className="block">Proudly created in India.</span>
            <span className="block">© 2026 Think360 Media. All Rights Reserved.</span>
          </div>
        </div>
      </div>

      {privacyOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <div className="w-full max-w-lg rounded-2xl border border-white/25 bg-neutral-950 p-6 sm:p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
              <h3 id="privacy-modal-title" className="font-sans text-2xl font-bold text-white">
                Privacy Policy &amp; Terms of Service
              </h3>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                aria-label="Close Privacy Policy dialog"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/25 bg-black text-white hover:bg-white hover:text-black transition-colors"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-neutral-300 leading-relaxed">
              <p>
                <strong className="text-white">Data Use:</strong> Information submitted through the Think360 Media Growth Audit form (your name, work email, brand URL, and growth focus) is used solely to prepare your requested channel teardown and contact you about our agency services.
              </p>
              <p>
                <strong className="text-white">No Third-Party Resale:</strong> We never sell, rent, or broker client inquiry details to third-party data vendors.
              </p>
              <p>
                <strong className="text-white">Contact:</strong> To request deletion of your inquiry data at any time, email{' '}
                <a
                  href="mailto:hello@think360media.com"
                  className="text-white underline"
                >
                  hello@think360media.com
                </a>
                .
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-extrabold text-black"
              >
                Close Dialog (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
