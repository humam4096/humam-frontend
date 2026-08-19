import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Initialize OpenNext Cloudflare for development
// This enables getCloudflareContext() to work with `next dev`
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    typedRoutes: true,
    webpackBuildWorker: false,
    inlineCss: false
  }
};

export default nextConfig;