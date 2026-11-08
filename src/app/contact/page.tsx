'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactFormGridWithDetails } from '@/components/aceternity/contact-form-grid-with-details';
import { FallingLeaves } from '@/components/ui/falling-leaves';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-black selection:bg-black selection:text-white">
      {/* Full-Screen Natural Autumn Maple Leaves Animation */}
      <FallingLeaves
        fullScreen
        leafCount={42}
        interactive
        className="fixed inset-0 z-30 pointer-events-none"
      />

      <Header />

      <main
        id="main-content"
        className="flex-1 bg-[var(--bg-canvas)] text-[var(--text-primary)] rounded-b-[2.5rem] sm:rounded-b-[4rem] overflow-hidden relative z-10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] py-12 sm:py-20 px-4 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* @aceternity/contact-form-grid-with-details */}
          <ContactFormGridWithDetails />
        </div>
      </main>

      <Footer />
    </div>
  );
}
