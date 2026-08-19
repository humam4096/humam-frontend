/**
 * Cloudflare Environment Types
 * Using official @cloudflare/workers-types
 */

/// <reference types="@cloudflare/workers-types" />

interface CloudflareEnv {
  DB: D1Database;
  ASSETS: Fetcher;
  IMAGES: any;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends CloudflareEnv {}
  }
}

export {};
