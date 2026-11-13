'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactFormGridWithDetails } from '@/components/aceternity/contact-form-grid-with-details';

export default function ContactPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-black relative overflow-x-hidden selection:bg-black selection:text-white">
      <div className="relative z-10 bg-[var(--bg-canvas)] text-[var(--text-primary)] rounded-b-[2.5rem] sm:rounded-b-[4rem] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.65)] flex-1 flex flex-col">
        <Header />

        <main id="main-content" className="w-full flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-8 sm:py-14">
          <div className="mx-auto w-full max-w-6xl mb-6">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
          </div>

          <ContactFormGridWithDetails />
        </main>
      </div>

      <Footer />
    </div>
  );
}
