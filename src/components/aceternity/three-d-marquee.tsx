'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface DeliveredCompanyCard {
  name: string;
  logo: string;
  category: string;
  deliverable: string;
  market: string;
  variant?: 'light' | 'dark';
  metric?: string;
}

interface ThreeDMarqueeProps {
  items: DeliveredCompanyCard[];
  className?: string;
}

export function ThreeDMarquee({ items, className }: ThreeDMarqueeProps) {
  // Build a dense 32-card array (8 cards per column across 4 columns) so the entire 3D stage is packed edge-to-edge
  const denseItems: DeliveredCompanyCard[] = [];
  for (let i = 0; i < 32; i++) {
    const base = items[i % items.length];
    denseItems.push({
      ...base,
      variant: (i + Math.floor(i / 8)) % 3 === 1 ? 'dark' : 'light',
    });
  }

  const chunkSize = 8;
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return denseItems.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        'mx-auto block h-[480px] sm:h-[560px] md:h-[660px] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] relative',
        className
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div
          style={{
            transform: 'rotateX(48deg) rotateY(0deg) rotateZ(-38deg)',
            transformStyle: 'preserve-3d',
          }}
          className="grid w-[1680px] shrink-0 origin-center grid-cols-4 gap-4 sm:gap-6 md:gap-8 scale-[0.44] xs:scale-[0.52] sm:scale-[0.72] md:scale-[0.85] lg:scale-100"
        >
          {chunks.map((subarray, colIndex) => (
            <motion.div
              initial={{ y: colIndex % 2 === 0 ? -80 : 40 }}
              animate={{ y: colIndex % 2 === 0 ? 80 : -100 }}
              transition={{
                duration: colIndex % 2 === 0 ? 12 : 16,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              key={`col-${colIndex}`}
              className="flex flex-col items-start gap-6 sm:gap-8"
            >
              <GridLineVertical className="-left-4" offset="80px" />
              {subarray.map((company, itemIndex) => {
                const isDarkCard = company.variant === 'dark';
                return (
                  <div
                    className="relative w-full"
                    key={`${colIndex}-${itemIndex}-${company.name}`}
                  >
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <motion.div
                      whileHover={{ y: -12, scale: 1.02 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className={cn(
                        'w-full rounded-2xl border p-6 shadow-sm flex flex-col justify-between min-h-[235px]',
                        isDarkCard
                          ? 'border-neutral-800 bg-black text-white'
                          : 'border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-black dark:text-white'
                      )}
                    >
                      <div
                        className={cn(
                          'flex items-center justify-between gap-2 border-b pb-3.5',
                          isDarkCard
                            ? 'border-white/15'
                            : 'border-neutral-200 dark:border-neutral-800'
                        )}
                      >
                        <span
                          className={cn(
                            'rounded-full px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest',
                            isDarkCard
                              ? 'bg-white text-black'
                              : 'bg-black text-white dark:bg-white dark:text-black'
                          )}
                        >
                          {company.category}
                        </span>
                        <span
                          className={cn(
                            'text-[11px] font-mono font-semibold',
                            isDarkCard ? 'text-neutral-400' : 'text-neutral-500'
                          )}
                        >
                          {company.market}
                        </span>
                      </div>

                      <div className="my-5 flex items-center justify-center h-20 px-4">
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={220}
                          height={88}
                          unoptimized
                          className={cn(
                            'max-h-16 w-auto max-w-[190px] object-contain',
                            isDarkCard ? 'invert' : 'dark:invert'
                          )}
                        />
                      </div>

                      <div
                        className={cn(
                          'border-t pt-3.5 flex items-center justify-between gap-2',
                          isDarkCard
                            ? 'border-white/15'
                            : 'border-neutral-200 dark:border-neutral-800'
                        )}
                      >
                        <div>
                          <div className="text-sm font-extrabold">
                            {company.name}
                          </div>
                          <div
                            className={cn(
                              'text-xs mt-0.5',
                              isDarkCard
                                ? 'text-neutral-300'
                                : 'text-neutral-600 dark:text-neutral-400'
                            )}
                          >
                            {company.deliverable}
                          </div>
                        </div>
                        <span
                          className={cn(
                            'inline-flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
                            isDarkCard
                              ? 'border-white/30 text-white'
                              : 'border-neutral-300 dark:border-neutral-700 text-black dark:text-white'
                          )}
                        >
                          ↗
                        </span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GridLineHorizontal({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) {
  return (
    <div
      style={
        {
          '--background': '#ffffff',
          '--color': 'rgba(0, 0, 0, 0.22)',
          '--height': '1px',
          '--width': '5px',
          '--fade-stop': '90%',
          '--offset': offset || '200px',
        } as React.CSSProperties
      }
      className={cn(
        'absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]',
        'bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]',
        '[background-size:var(--width)_var(--height)]',
        '[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]',
        '[mask-composite:exclude]',
        'z-30',
        className
      )}
    />
  );
}

function GridLineVertical({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) {
  return (
    <div
      style={
        {
          '--background': '#ffffff',
          '--color': 'rgba(0, 0, 0, 0.22)',
          '--height': '5px',
          '--width': '1px',
          '--fade-stop': '90%',
          '--offset': offset || '150px',
        } as React.CSSProperties
      }
      className={cn(
        'absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]',
        'bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]',
        '[background-size:var(--width)_var(--height)]',
        '[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]',
        '[mask-composite:exclude]',
        'z-30',
        className
      )}
    />
  );
}
