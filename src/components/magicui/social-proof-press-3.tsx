'use client';

import React from 'react';
import Image from 'next/image';
import { CLIENTS, ClientItem } from '@/lib/constants';
import { Marquee } from './marquee';

interface SocialProofPress3Props {
  items?: ClientItem[];
  title?: string;
}

export function SocialProofPress3({
  items = CLIENTS,
  title = 'TRUSTED BY CATEGORY-LEADING BRANDS & ENTERPRISES',
}: SocialProofPress3Props) {
  return (
    <div className="w-full py-10">
      <div className="mx-auto max-w-[1440px]">
        <h3 className="text-center text-xs font-mono font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">
          {title}
        </h3>

        {/* @magicui-pro/social-proof-press-3 Marquee */}
        <div className="relative mt-8 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:36s] [--gap:4rem]" repeat={3}>
            {items.map((client) => (
              <div
                key={`marquee-${client.name}`}
                className="flex h-24 w-56 items-center justify-center px-4 py-2"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={240}
                  height={96}
                  unoptimized
                  className="h-16 sm:h-20 w-auto max-w-[200px] object-contain dark:invert"
                />
              </div>
            ))}
          </Marquee>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-canvas)] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-canvas)] to-transparent"
          />
        </div>
      </div>
    </div>
  );
}

