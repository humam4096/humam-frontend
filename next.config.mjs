import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import createNextIntlPlugin from 'next-intl/plugin';

// Initialize OpenNext Cloudflare for development
// This enables getCloudflareContext() to work with `next dev`
// Only initialize in development mode, not during CI/production builds
if (process.env.NODE_ENV === 'development') {
  await initOpenNextCloudflareForDev();
}

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typedRoutes: true,
  experimental: {
    webpackBuildWorker: false,
    // Enable inline CSS to reduce bundle size
    inlineCss: true
  },
  // Optimize images for Workers
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Reduce bundle size
  compress: true,
  // Enable production optimizations
  productionBrowserSourceMaps: false,
  swcMinify: true,
};

export default withNextIntl(nextConfig);