import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/#contact',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
