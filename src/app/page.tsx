import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CaseStudies } from '@/components/CaseStudies';
import { ServicesBand } from '@/components/ServicesBand';
import { Clients } from '@/components/Clients';
import { CallToAction } from '@/components/CallToAction';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-dvh flex flex-col bg-black relative overflow-x-hidden">
      <div className="relative z-10 bg-[var(--bg-canvas)] text-[var(--text-primary)] rounded-b-[2.5rem] sm:rounded-b-[4rem] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
        <Header />

        <main id="main-content" className="w-full">
          <Hero />
          <CaseStudies />
          <ServicesBand />
          <Clients />
          <CallToAction />
        </main>
      </div>

      <Footer />
    </div>
  );
}
