"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export default function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "Swan Energy — Enterprise Web & Technical SEO",
    link: "/contact",
    thumbnail: "/assets/work/swan-energy.png",
  },
  {
    title: "Bellurét — Luxury D2C Storefront & Launch Film",
    link: "/contact",
    thumbnail: "/assets/work/belluret.png",
  },
  {
    title: "HeartLink — Healthcare Acquisition & Search",
    link: "/contact",
    thumbnail: "/assets/work/heartlink.png",
  },
  {
    title: "Urban Dancera — Studio Production & Creator Reels",
    link: "/contact",
    thumbnail: "/assets/work/urban-dancera.png",
  },
  {
    title: "Arch Events — Experiential Branding & PR",
    link: "/contact",
    thumbnail: "/assets/work/arch-events.png",
  },
  {
    title: "ICFA — National Digital Platform & Media",
    link: "/contact",
    thumbnail: "/assets/work/icfa.png",
  },
  {
    title: "Kidway Global — D2C Retail & Meta Advantage+",
    link: "/contact",
    thumbnail: "/assets/work/kidway-global.png",
  },
  {
    title: "Kamat's Legacy — Hospitality Rebrand & Local SEO",
    link: "/contact",
    thumbnail: "/assets/work/kamats-legacy.png",
  },
  {
    title: "Kosi — Product Launch Film & Performance Max",
    link: "/contact",
    thumbnail: "/assets/work/kosi.png",
  },
  {
    title: "KayImpex — Global B2B Trade & Lead Engine",
    link: "/contact",
    thumbnail: "/assets/work/kayimpex.png",
  },
  {
    title: "Think360 Brands — Strategy & Identity Systems",
    link: "/#services",
    thumbnail: "/assets/work/brand-solution.png",
  },
  {
    title: "Think360 Tech — Next.js & Shopify Engineering",
    link: "/#services",
    thumbnail: "/assets/work/tech-solution.png",
  },
  {
    title: "Think360 Media — Full-Funnel Paid Search & Social",
    link: "/#services",
    thumbnail: "/assets/work/media-solution.png",
  },
  {
    title: "Think360 Search — Technical SEO & AI GEO",
    link: "/#services",
    thumbnail: "/assets/work/seo-research.png",
  },
  {
    title: "Think360 Motion Pictures — Studio Film & 3D CGI",
    link: "/#services",
    thumbnail: "/assets/work/film-production.png",
  },
];

