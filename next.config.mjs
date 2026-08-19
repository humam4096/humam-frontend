import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import createNextIntlPlugin from 'next-intl/plugin';

// Initialize OpenNext Cloudflare for development
// This enables getCloudflareContext() to work with `next dev`
await initOpenNextCloudflareForDev();

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typedRoutes: true,
  experimental: {
    webpackBuildWorker: false,
    inlineCss: false
  }
};

export default withNextIntl(nextConfig);