import React from 'react';
import { Header } from '@/components/Header';
import { ElseHeroStage } from '@/components/ElseHeroStage';
import { ElseAboutSection } from '@/components/ElseAboutSection';
import { ElseServicesSection } from '@/components/ElseServicesSection';
import { ElseClientsBand } from '@/components/ElseClientsBand';
import { ElseStatsCtaBand } from '@/components/ElseStatsCtaBand';
import { ElseContactSection } from '@/components/ElseContactSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-dvh flex flex-col bg-black relative overflow-x-clip">
      <div className="relative z-10 bg-black text-white rounded-b-3xl sm:rounded-b-[4rem] overflow-x-clip shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
        <Header />

        <main id="main-content" className="w-full relative">
          <ElseHeroStage />
          <ElseAboutSection />
          <ElseServicesSection />
          <ElseClientsBand />
          <ElseStatsCtaBand />
          <ElseContactSection />
        </main>
      </div>

      <Footer />
    </div>
  );
}
