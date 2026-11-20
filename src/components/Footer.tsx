'use client';

import React from 'react';
import { LiquidWordmark } from './LiquidWordmark';

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative bg-black text-white pt-10 sm:pt-16 pb-10 overflow-hidden"
    >
      <h2 className="sr-only">Think360Media</h2>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-14 relative z-10">
        <div className="my-2 sm:my-4">
          <LiquidWordmark />
        </div>
      </div>
    </footer>
  );
}
