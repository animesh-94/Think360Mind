"use client";
import React from "react";
import { StickyScroll, StickyScrollItem } from "@/components/ui/sticky-scroll-reveal";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

const content: StickyScrollItem[] = [
  {
    badge: "GOOGLE SEARCH & ADS",
    title: "Google Search & Performance Max",
    description:
      "Full-funnel search, shopping, YouTube, and technical SEO architecture built to capture high-intent commercial demand.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[#06080E]">
        <img
          src="/assets/platforms/google-search-pmax.png"
          width={1024}
          height={832}
          className="h-full w-full object-cover"
          alt="Google Search, Shopping PMax, AI Overview, and YouTube Action architecture"
        />
      </div>
    ),
  },
  {
    badge: "META & CREATOR SOCIAL",
    title: "Meta Advantage+ & Reels Engine",
    description:
      "High-velocity thumb-stopping video hooks paired with structured conversion API tracking and creator whitelisting.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[#090512]">
        <img
          src="/assets/platforms/meta-reels-engine.png"
          width={1024}
          height={832}
          className="h-full w-full object-cover"
          alt="Meta Advantage+ Reels player, hook testing matrix, and server-side Conversions API"
        />
      </div>
    ),
  },
  {
    badge: "COMMERCE & WEB",
    title: (
      <span>
        Next.js &amp;{" "}
        <PointerHighlight
          pointerText="Headless CRO"
          rectangleClassName="border-emerald-400/70 bg-emerald-500/10"
          pointerClassName="text-emerald-400"
        >
          <span className="text-white">Shopify Storefronts</span>
        </PointerHighlight>
      </span>
    ),
    description:
      "Sub-second storefronts, custom landing pages, and checkout conversion rate optimization engineered for D2C scale.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[#040912]">
        <img
          src="/assets/platforms/nextjs-shopify-storefront.png"
          width={1024}
          height={832}
          className="h-full w-full object-cover"
          alt="Next.js and Shopify Plus headless storefront with slide-over 1-tap checkout"
        />
      </div>
    ),
  },
  {
    badge: "RETENTION & AI CRM",
    title: "Klaviyo, WhatsApp & AI Lifecycle",
    description:
      "Automated email, SMS, and WhatsApp retention flows that compound repeat-purchase lifetime value.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[#040D0A]">
        <img
          src="/assets/platforms/klaviyo-whatsapp-crm.png"
          width={1024}
          height={832}
          className="h-full w-full object-cover"
          alt="Klaviyo omnichannel CRM triggers and verified WhatsApp Business VIP concierge flow"
        />
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
