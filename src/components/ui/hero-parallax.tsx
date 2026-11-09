"use client";
import React from "react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "motion/react";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, prefersReducedMotion ? 0 : 1000]
    ),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, prefersReducedMotion ? 0 : -1000]
    ),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2],
      [prefersReducedMotion ? 0 : 15, 0]
    ),
    springConfig
  );
  const opacity = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2],
      [prefersReducedMotion ? 1 : 0.2, 1]
    ),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2],
      [prefersReducedMotion ? 0 : 20, 0]
    ),
    springConfig
  );
  const translateY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2],
      [prefersReducedMotion ? 0 : -700, prefersReducedMotion ? 0 : 500]
    ),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="relative flex flex-col self-auto overflow-hidden antialiased py-16 sm:py-28 md:py-40 md:h-[300vh] [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      {/* Desktop & Tablet Parallax 3D Scroll Flow */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="hidden md:block"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 lg:space-x-20 mb-12 lg:mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-12 lg:mb-20 space-x-12 lg:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 lg:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Dedicated Mobile Touch-Scroll Carousel (<768px): Reflows naturally without multi-screen vertical lock */}
      <div className="md:hidden px-4 mt-6">
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <div
              key={`mob-${product.title}`}
              className="w-[82vw] max-w-[340px] shrink-0 snap-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] overflow-hidden shadow-md"
            >
              <a href={product.link} className="block relative aspect-[16/11] w-full overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </a>
              <div className="p-4">
                <h3 className="font-sans text-sm font-bold text-[var(--text-primary)] leading-snug line-clamp-2">
                  {product.title}
                </h3>
                <a
                  href={product.link}
                  className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold text-[var(--text-primary)] underline underline-offset-4"
                >
                  <span>Explore Project</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-[var(--text-muted)] font-mono">
          Swipe horizontally to explore all 15 flagship deliverables &rarr;
        </p>
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h2 className="text-2xl md:text-7xl font-bold text-black dark:text-white">
        The Ultimate <br />{" "}
        <PointerHighlight
          pointerText="Flagship Lab"
          rectangleClassName="border-black/60 dark:border-white/60 bg-black/5 dark:bg-white/10"
          pointerClassName="text-black dark:text-white"
        >
          <span>360° Studio</span>
        </PointerHighlight>
      </h2>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-700 dark:text-neutral-200">
        We build category-leading brands with integrated strategy, studio film
        production, Next.js &amp; Shopify storefronts, and full-funnel
        performance marketing.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h3 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-bold text-lg">
        {product.title}
      </h3>
    </motion.div>
  );
};

