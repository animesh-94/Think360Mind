import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Think360 Media: Your Creative, Media & Technology Transformation Partner',
  description:
    'A 360° creative, media, and marketing technology partner that brings strategy, production, search, and performance together to grow brands.',
  keywords: [
    'Think360 Media',
    'creative agency',
    'media agency',
    'marketing technology',
    'brand strategy',
    'performance marketing',
    'SEO',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('think360-theme');if(t==='dark'){document.documentElement.classList.add('dark');}else if(t==='light'){document.documentElement.classList.remove('dark');}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-dvh bg-black text-[var(--text-primary)] antialiased">
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
