'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface PointerHighlightProps {
  children: React.ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
  pointerText?: string;
  badgeClassName?: string;
  cursorColor?: string;
  delay?: number;
}

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
  pointerText,
  badgeClassName,
  cursorColor = '#FFFFFF',
  delay = 0.25,
}: PointerHighlightProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span className={cn('relative inline-flex items-center', containerClassName)}>
      {/* Target Content */}
      <span className="relative z-10">{children}</span>

      {/* Animated Framing Rectangle */}
      <motion.span
        initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-xl border border-white/60 bg-white/5 backdrop-blur-[2px] shadow-[0_0_24px_rgba(255,255,255,0.08)]',
          rectangleClassName
        )}
        aria-hidden="true"
      />

      {/* Designer Cursor Pointer */}
      <motion.span
        initial={
          prefersReducedMotion
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: 12, y: 16, scale: 0.8 }
        }
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{
          duration: 0.55,
          delay: delay + 0.18,
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className={cn(
          'pointer-events-none absolute -bottom-5 -right-3 z-30 flex items-center gap-1.5 select-none',
          pointerClassName
        )}
        aria-hidden="true"
      >
        {/* Sleek SVG Cursor Arrow */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          style={{ color: cursorColor }}
        >
          <path
            d="M4.5 3.5L10.5 21L13.8 13.8L21 10.5L4.5 3.5Z"
            fill="currentColor"
            stroke="black"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Optional Collaborator / Engine Label Badge */}
        {pointerText && (
          <span
            className={cn(
              'rounded-full border border-white/20 bg-black/90 px-2.5 py-0.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-md whitespace-nowrap',
              badgeClassName
            )}
          >
            {pointerText}
          </span>
        )}
      </motion.span>
    </span>
  );
}

