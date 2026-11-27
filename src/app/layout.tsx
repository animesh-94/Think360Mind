import type { Metadata } from 'next';
import { SmoothScroll } from '@/components/SmoothScroll';
import './globals.css';

export const metadata: Metadata = {
  title: 'Think360 Media — 360° Growth Partner | Building Brands From Every Angle',
  description:
    'Think360 Media brings branding, creativity, media, performance, and communication together under one shared vision to build consistent, memorable, and future-ready brands.',
  keywords: [
    'Think360 Media',
    '360 Growth Partner',
    'branding and creative agency Mumbai',
    'performance marketing',
    'social media marketing',
    'SEO',
    'media planning and buying',
    'AI marketing solutions',
    'Wadala Mumbai digital agency',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-black text-[var(--text-primary)] antialiased">
        <SmoothScroll />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-black focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
