"use client";

import React from "react";
import HeroParallaxDemo from "./hero-parallax-demo";

export function CaseStudies() {
  return (
    <section
      id="work"
      aria-label="Featured Client Transformation Work"
      className="relative w-full bg-[var(--bg-canvas)] text-[var(--text-primary)] border-b border-[var(--border-hairline)] overflow-hidden"
    >
      <HeroParallaxDemo />
    </section>
  );
}
