'use client';

import React from 'react';
import { LiquidWordmark } from './LiquidWordmark';

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative flex min-h-[60svh] md:min-h-[100dvh] w-full items-center justify-center bg-black text-white px-4 sm:px-8 lg:px-14 py-12 overflow-hidden"
    >
      <h2 className="sr-only">Think360</h2>

      <div className="mx-auto w-full max-w-[1600px] relative z-10">
        <LiquidWordmark />
      </div>
    </footer>
  );
}
