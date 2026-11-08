'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MotionValue, motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

export interface MacbookScrollProps {
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}

export function MacbookScroll({ title, badge, children }: MacbookScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0.05, 0.45],
    [1.02, isMobile ? 1.02 : 1.28]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0.05, 0.45],
    [0.78, isMobile ? 1.02 : 1.28]
  );
  const translate = useTransform(scrollYProgress, [0.05, 0.45], [0, 28]);
  const rotate = useTransform(
    scrollYProgress,
    [0.05, 0.22, 0.45],
    [-22, -10, 0]
  );
  const textTransform = useTransform(scrollYProgress, [0.05, 0.32], [0, 36]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.28], [1, 0.2]);

  return (
    <div
      ref={ref}
      className="flex min-h-[38rem] sm:min-h-[50rem] md:min-h-[60rem] shrink-0 transform flex-col items-center justify-start py-8 sm:py-16 md:py-20 [perspective:1200px] scale-[0.62] xs:scale-[0.72] sm:scale-90 md:scale-100 origin-top"
    >
      <motion.div
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="mb-10 text-center px-4"
      >
        {title || (
          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            Built for High-Velocity Brands.
          </h2>
        )}
      </motion.div>

      {/* MacBook Pro Display Lid */}
      <Lid
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      >
        {children}
      </Lid>

      {/* MacBook Pro Aluminum / Space-Black Base Chassis */}
      <div className="relative -z-10 h-[21rem] w-[34rem] overflow-hidden rounded-b-2xl rounded-t-md bg-gradient-to-b from-[#27272A] via-[#18181B] to-[#09090B] border border-neutral-700/80 shadow-[0_36px_90px_rgba(0,0,0,0.45)]">
        {/* Top hinge recess */}
        <div className="relative h-8 w-full">
          <div className="absolute inset-x-0 mx-auto h-3 w-[80%] rounded-b-md bg-[#09090B] shadow-inner border-x border-b border-neutral-800" />
        </div>

        {/* Speakers + Backlit Magic Keyboard */}
        <div className="relative flex px-2">
          <div className="mx-auto h-full w-[9%] overflow-hidden">
            <SpeakerGrid />
          </div>
          <div className="mx-auto h-full w-[82%]">
            <Keypad />
          </div>
          <div className="mx-auto h-full w-[9%] overflow-hidden">
            <SpeakerGrid />
          </div>
        </div>

        <Trackpad />

        {/* Front lip notch */}
        <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-24 rounded-tl-2xl rounded-tr-2xl bg-gradient-to-t from-black to-neutral-700 border-t border-neutral-600/40" />

        {badge && <div className="absolute bottom-3 left-4">{badge}</div>}
      </div>
    </div>
  );
}

function Lid({
  scaleX,
  scaleY,
  rotate,
  translate,
  children,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative [perspective:1200px] z-10">
      <motion.div
        style={{
          scaleX,
          scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: 'preserve-3d',
          transformOrigin: 'bottom',
        }}
        className="relative h-[22rem] w-[34rem] rounded-t-2xl rounded-b-md bg-[#141416] p-2.5 border border-neutral-700 shadow-[0_28px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Outer bezel */}
        <div className="absolute inset-0 rounded-t-2xl rounded-b-md bg-[#09090B]" />

        {/* MacBook Pro Camera Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 h-3.5 w-24 rounded-b-lg bg-[#09090B] flex items-center justify-center">
          <span className="size-1.5 rounded-full bg-[#1E293B] ring-1 ring-white/20" />
        </div>

        {/* Retina Display Screen */}
        <div className="relative z-10 h-full w-full overflow-hidden rounded-lg bg-[#F5F5F7] text-black flex flex-col justify-between shadow-inner">
          {children || <MacOSRetinaScreen />}
        </div>
      </motion.div>
    </div>
  );
}

function MacOSRetinaScreen() {
  return (
    <div className="relative h-full w-full flex flex-col justify-between overflow-hidden select-none bg-[#E8ECE9]">
      {/* Wallpaper background artwork */}
      <Image
        src="/assets/bottom-ribbon.png"
        alt="macOS desktop background artwork"
        fill
        className="object-cover opacity-55 pointer-events-none"
      />

      {/* Genuine macOS Top Menu Bar */}
      <div className="relative z-20 flex h-6 w-full items-center justify-between bg-white/75 backdrop-blur-md px-3 text-[9px] font-semibold text-black border-b border-black/5">
        <div className="flex items-center gap-3">
          <span className="font-black text-[10px]"></span>
          <span className="font-extrabold">Safari</span>
          <span className="text-black/75">File</span>
          <span className="text-black/75">Edit</span>
          <span className="text-black/75">View</span>
          <span className="text-black/75">History</span>
          <span className="text-black/75">Window</span>
        </div>
        <div className="flex items-center gap-2.5 text-[8.5px] font-semibold text-black/80">
          <span>100%</span>
          <span>Wi-Fi</span>
          <span>Sun 5:48 PM</span>
        </div>
      </div>

      {/* Genuine Safari Browser Window */}
      <div className="relative z-20 mx-3 my-2 flex-1 rounded-xl border border-black/15 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.22)] overflow-hidden flex flex-col">
        {/* Safari Toolbar */}
        <div className="flex h-7 items-center justify-between border-b border-neutral-200 bg-[#F6F6F6] px-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#FF5F56] border border-black/10" />
            <span className="size-2.5 rounded-full bg-[#FFBD2E] border border-black/10" />
            <span className="size-2.5 rounded-full bg-[#27C93F] border border-black/10" />
          </div>

          <div className="flex h-4.5 w-56 items-center justify-center rounded-md bg-white border border-neutral-300/80 px-2 text-[8.5px] font-medium text-neutral-700 shadow-2xs">
            <span>think360media.com</span>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] font-bold text-neutral-500">
            <span>+</span>
          </div>
        </div>

        {/* Real Visual Website Content Inside Safari */}
        <div className="flex-1 grid grid-cols-12 bg-white overflow-hidden">
          {/* Left Hero Preview Column with 3D Glass Ring Image */}
          <div className="col-span-7 relative p-4 flex flex-col justify-between overflow-hidden bg-[#FAFAF6] border-r border-neutral-200">
            <Image
              src="/assets/hero-ring.png"
              alt="Think360 3D Glass Sculpture"
              width={220}
              height={220}
              className="pointer-events-none absolute -right-8 -top-6 w-40 h-40 object-contain opacity-95"
            />

            <div className="relative z-10 flex items-center justify-between">
              <span className="font-sans text-[11px] font-black tracking-tight text-black">
                Think360.
              </span>
              <span className="rounded-full bg-black text-white px-2.5 py-0.5 text-[7.5px] font-bold">
                Let&apos;s Talk ↗
              </span>
            </div>

            <div className="relative z-10 my-auto max-w-[175px]">
              <div className="font-display-serif text-lg font-bold leading-[1.05] text-black">
                Building Brands From{' '}
                <span className="italic underline decoration-black/30">
                  Every Angle.
                </span>
              </div>
              <p className="mt-1.5 text-[8px] leading-relaxed text-neutral-600">
                Strategy, studio production, media buying, and search engineering under one roof.
              </p>
            </div>

            {/* Client logos bar inside Safari */}
            <div className="relative z-10 flex items-center gap-3 border-t border-neutral-200 pt-2">
              <Image
                src="/assets/clients/swan-energy.svg"
                alt="Swan Energy"
                width={56}
                height={22}
                unoptimized
                className="h-3.5 w-auto object-contain"
              />
              <Image
                src="/assets/clients/belluret.svg"
                alt="Bellurét"
                width={56}
                height={22}
                unoptimized
                className="h-3.5 w-auto object-contain"
              />
              <Image
                src="/assets/clients/heartlink.svg"
                alt="HeartLink"
                width={56}
                height={22}
                unoptimized
                className="h-3.5 w-auto object-contain"
              />
              <Image
                src="/assets/clients/kosi.svg"
                alt="Kosi"
                width={48}
                height={20}
                unoptimized
                className="h-3 w-auto object-contain"
              />
            </div>
          </div>

          {/* Right Visual Campaign Reel Cards */}
          <div className="col-span-5 bg-black text-white p-3.5 flex flex-col justify-between relative overflow-hidden">
            <Image
              src="/assets/hero-ribbon.png"
              alt="Campaign visual ribbon"
              width={200}
              height={140}
              className="pointer-events-none absolute -bottom-6 -right-4 w-36 object-contain opacity-65"
            />

            <div className="relative z-10">
              <span className="text-[7.5px] font-mono uppercase tracking-widest text-neutral-400">
                FEATURED SHOWREEL
              </span>
              <div className="mt-1 font-sans text-xs font-extrabold leading-tight text-white">
                Swan Energy &amp; Bellurét Digital Flagships
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-1.5 my-2">
              <div className="rounded-lg bg-white/10 backdrop-blur-xs border border-white/15 p-2">
                <Image
                  src="/assets/clients/swan-energy.svg"
                  alt="Swan Energy"
                  width={64}
                  height={24}
                  unoptimized
                  className="h-4 w-auto object-contain invert"
                />
                <div className="mt-1 text-[7.5px] text-neutral-300">
                  Enterprise Web &amp; SEO
                </div>
              </div>
              <div className="rounded-lg bg-white/10 backdrop-blur-xs border border-white/15 p-2">
                <Image
                  src="/assets/clients/urban-dancera.svg"
                  alt="Urban Dancera"
                  width={64}
                  height={24}
                  unoptimized
                  className="h-4 w-auto object-contain invert"
                />
                <div className="mt-1 text-[7.5px] text-neutral-300">
                  Studio Film &amp; Reels
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-2 text-[8px]">
              <span className="font-semibold text-neutral-300">
                think360media.com/work
              </span>
              <span className="rounded-full bg-white text-black px-2 py-0.5 font-bold">
                View ↗
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Genuine macOS Floating Glass Dock */}
      <div className="relative z-20 mb-1.5 mx-auto flex h-7 items-center gap-2 rounded-xl border border-white/40 bg-white/55 backdrop-blur-md px-3 shadow-md">
        {[
          { label: 'Finder', bg: 'bg-gradient-to-b from-sky-400 to-blue-600' },
          { label: 'Safari', bg: 'bg-gradient-to-b from-blue-400 to-indigo-600' },
          { label: 'Figma', bg: 'bg-gradient-to-b from-neutral-800 to-black' },
          { label: 'Studio', bg: 'bg-gradient-to-b from-emerald-500 to-teal-800' },
          { label: 'Mail', bg: 'bg-gradient-to-b from-sky-500 to-blue-700' },
        ].map((app) => (
          <div
            key={app.label}
            title={app.label}
            className={cn(
              'size-4.5 rounded-md shadow-xs border border-white/30',
              app.bg
            )}
          />
        ))}
      </div>
    </div>
  );
}

function Trackpad() {
  return (
    <div
      className="mx-auto my-2 h-28 w-[38%] rounded-xl border border-neutral-700/80 bg-[#141417]"
      style={{
        boxShadow: '0px 0px 2px 1px #00000040 inset',
      }}
    />
  );
}

function SpeakerGrid() {
  return (
    <div
      className="mt-2 flex h-36 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage:
          'radial-gradient(circle, #09090B 0.75px, transparent 0.75px)',
        backgroundSize: '3px 3px',
      }}
    />
  );
}

function Keypad() {
  const rows = [
    ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', '○'],
    ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete'],
    ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'return'],
    ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'shift'],
    ['fn', '⌃', '⌥', '⌘', 'space', '⌘', '⌥', '◀', '▲▼', '▶'],
  ];

  return (
    <div className="mx-1 h-full rounded-lg bg-[#09090B] p-1.5 border border-neutral-800 flex flex-col gap-1 shadow-inner">
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="flex w-full gap-1 justify-between">
          {row.map((key, kIdx) => {
            const isSpace = key === 'space';
            const isWide =
              key === 'tab' ||
              key === 'caps' ||
              key === 'return' ||
              key === 'shift' ||
              key === 'delete' ||
              key === '⌘';
            return (
              <div
                key={`${rIdx}-${kIdx}-${key}`}
                className={cn(
                  'h-4.5 rounded-[3px] bg-[#18181B] border border-neutral-700/70 text-[6px] font-sans font-semibold text-neutral-200 flex items-center justify-center select-none shadow-[0_1px_0_rgba(255,255,255,0.08)]',
                  isSpace ? 'flex-[4.2]' : isWide ? 'flex-[1.65]' : 'flex-1'
                )}
              >
                {isSpace ? '' : key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
