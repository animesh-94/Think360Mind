"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "motion/react";

export interface ParallaxProduct {
  title: string;
  link: string;
  thumbnail: string;
  category?: string;
  challenge?: string;
  architecture?: string;
  outcome?: string;
  focusSlug?: string;
}

export const HeroParallax = ({
  products,
}: {
  products: ParallaxProduct[];
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ParallaxProduct | null>(null);
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!selectedProduct) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProduct]);
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
              onSelect={setSelectedProduct}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-12 lg:mb-20 space-x-12 lg:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              onSelect={setSelectedProduct}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 lg:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              onSelect={setSelectedProduct}
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
              <button
                type="button"
                onClick={() => setSelectedProduct(product)}
                className="block relative aspect-[16/11] w-full overflow-hidden text-left cursor-pointer"
                aria-label={`Inspect ${product.title}`}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </button>
              <div className="p-4">
                {product.category && (
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent)] mb-1">
                    {product.category}
                  </p>
                )}
                <h3 className="font-sans text-sm font-bold text-[var(--text-primary)] leading-snug line-clamp-2">
                  {product.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold text-[var(--text-primary)] underline underline-offset-4 hover:text-[var(--accent)] cursor-pointer"
                >
                  <span>Inspect Brief</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-[var(--text-muted)] font-mono">
          Swipe horizontally and tap any deliverable to inspect architecture &rarr;
        </p>
      </div>

      {/* Interactive Deliverable Quick-View Dialog */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-modal-title"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close deliverable preview"
                className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)]/90 text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
              >
                <span aria-hidden="true" className="text-lg leading-none">&times;</span>
              </button>

              <div className="aspect-[16/9] w-full overflow-hidden border-b border-[var(--border-hairline)] bg-neutral-950">
                <img
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {selectedProduct.category ?? "Selected Architecture"}
                  </p>
                  <h3
                    id="case-study-modal-title"
                    className="mt-1.5 font-sans text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]"
                  >
                    {selectedProduct.title}
                  </h3>
                </div>

                {(selectedProduct.challenge || selectedProduct.architecture || selectedProduct.outcome) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-[var(--border-hairline)] py-4">
                    {selectedProduct.challenge && (
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          Mandate
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                          {selectedProduct.challenge}
                        </p>
                      </div>
                    )}
                    {selectedProduct.architecture && (
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          Architecture
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                          {selectedProduct.architecture}
                        </p>
                      </div>
                    )}
                    {selectedProduct.outcome && (
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          Deliverable Scope
                        </p>
                        <p className="mt-1 text-xs font-semibold leading-relaxed text-[var(--text-primary)]">
                          {selectedProduct.outcome}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--border-hairline)] px-5 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    Back to Showcase
                  </button>
                  <Link
                    href={
                      selectedProduct.focusSlug
                        ? `/contact?focus=${selectedProduct.focusSlug}`
                        : selectedProduct.link
                    }
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-[var(--accent-hover)]"
                  >
                    <span>Request Similar Architecture</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h2 className="text-2xl md:text-7xl font-bold text-black dark:text-white">
        The Ultimate <br /> 360° Creative &amp; Media Studio
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
  onSelect,
}: {
  product: ParallaxProduct;
  translate: MotionValue<number>;
  onSelect: (product: ParallaxProduct) => void;
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
      <button
        type="button"
        onClick={() => onSelect(product)}
        aria-label={`Inspect ${product.title}`}
        className="block h-full w-full text-left group-hover/product:shadow-2xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </button>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity duration-200"></div>
      <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover/product:opacity-100 pointer-events-none transition-opacity duration-200">
        {product.category && (
          <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF4D2E] mb-1">
            {product.category}
          </span>
        )}
        <h3 className="text-white font-bold text-lg leading-snug">
          {product.title}
        </h3>
        <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300">
          Inspect Architecture &rarr;
        </span>
      </div>
    </motion.div>
  );
};

