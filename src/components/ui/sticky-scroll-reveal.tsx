"use client";
import React, { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface StickyScrollItem {
  badge?: string;
  title: string;
  description: string;
  content?: React.ReactNode;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: StickyScrollItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) =>
      cardLength > 1 ? index / (cardLength - 1) : 0
    );
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundThemes = [
    "#06080E",
    "#090512",
    "#040912",
    "#040D0A",
  ];

  const activeBg = backgroundThemes[activeCard % backgroundThemes.length];

  return (
    <motion.div
      animate={{
        backgroundColor: activeBg,
      }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeInOut" }}
      ref={ref}
      tabIndex={0}
      aria-label="Platform capabilities scroll showcase"
      className="relative flex h-[36rem] sm:h-[38rem] lg:h-[36rem] justify-between gap-6 sm:gap-8 lg:gap-12 overflow-y-auto snap-y snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-2xl sm:rounded-3xl border border-neutral-800 p-4 sm:p-8 lg:px-14 lg:py-0 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black dark:focus-visible:outline-white"
    >
      {/* Left Scrolling Column — Each slide occupies full container height; previous/next slides are completely hidden */}
      <div className="relative w-full lg:w-[46%]">
        {content.map((item, index) => {
          const isActive = activeCard === index;
          return (
            <motion.div
              key={item.title + index}
              initial={{ opacity: index === 0 ? 1 : 0 }}
              animate={{
                opacity: isActive ? 1 : 0,
                y: prefersReducedMotion ? 0 : isActive ? 0 : index < activeCard ? -24 : 24,
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: "easeOut" }}
              style={{ pointerEvents: isActive ? "auto" : "none" }}
              aria-hidden={!isActive}
              className="flex h-[36rem] sm:h-[38rem] lg:h-[36rem] snap-start snap-always flex-col justify-center px-1 sm:px-2"
            >
              <div className="border-l-2 border-white pl-4 sm:pl-6">
                {item.badge && (
                  <div className="mb-2 sm:mb-3 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
                    0{index + 1} / 0{cardLength} &mdash; {item.badge}
                  </div>
                )}

                <h3 className="font-sans text-xl sm:text-3xl lg:text-[38px] font-bold tracking-[-0.03em] leading-[1.15] text-white">
                  {item.title}
                </h3>

                <p className="mt-3 sm:mt-5 max-w-md text-xs sm:text-sm lg:text-base leading-relaxed text-neutral-300">
                  {item.description}
                </p>

                {item.content && (
                  <div className="mt-5 w-full overflow-hidden rounded-xl border border-white/20 bg-neutral-950 lg:hidden shadow-lg aspect-[16/11]">
                    {item.content}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Right Sticky Visual Preview Card (Desktop >= 1024px) */}
      <div className="sticky top-0 hidden lg:flex h-[36rem] items-center shrink-0">
        <div
          className={cn(
            "h-[27.5rem] w-[34rem] overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl",
            contentClassName
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.98, y: 10 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.98, y: -10 }
              }
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="h-full w-full"
            >
              {content[activeCard].content ?? null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
