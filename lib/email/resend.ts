// lib/email/resend.ts
import { Resend } from "resend";
import { getCloudflareContext } from "@opennextjs/cloudflare";

type EmailEnv = {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  RESEND_TO_EMAIL?: string;
};

/**
 * Resolves environment variables for both runtimes:
 * - Production (Cloudflare Workers): reads from getCloudflareContext().env
 * - Local dev (next dev): falls back to process.env from .env.local
 * - Local preview (wrangler dev): uses .dev.vars via getCloudflareContext()
 */
function getEnv(): EmailEnv {
  try {
    const context = getCloudflareContext();
    return context.env as unknown as EmailEnv;
  } catch {
    // Fallback for Next.js dev server (non-Cloudflare runtime)
    return {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
      RESEND_TO_EMAIL: process.env.RESEND_TO_EMAIL,
    };
  }
}

/**
 * Cached Resend client instance (per-isolate)
 * Cleared on each isolate restart, which is fine for Cloudflare Workers
 */
let _resendInstance: Resend | null = null;

/**
 * Get or create the Resend client.
 * Lazily initialized on first use to avoid build-time evaluation.
 * 
 * @throws {Error} If RESEND_API_KEY is not configured
 */
export function getResend(): Resend {
  if (_resendInstance) {
    return _resendInstance;
  }

  const env = getEnv();
  const apiKey = env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not configured. " +
      "Set it as a Cloudflare secret or in .env.local for local development."
    );
  }

  _resendInstance = new Resend(apiKey);
  return _resendInstance;
}

/**
 * Email configuration with sensible defaults.
 * Returns from/to addresses for email sending.
 */
export function getEmailConfig() {
  const env = getEnv();
  
  return {
    from: `Humam website <${process.env.RESEND_FROM_EMAIL || "noreply@humam.sa"}>`,
    to: env.RESEND_TO_EMAIL || "humam4096@gmail.com",
  } as const;
}

/**
 * Validate that required email environment variables are configured.
 * Call this at the start of API routes that send emails for early validation.
 * 
 * @throws {Error} If RESEND_API_KEY is missing
 */
export function validateEmailConfig(): void {
  const env = getEnv();

  if (!env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is required but not configured. " +
      "Add it as a Cloudflare Worker secret or in .env.local"
    );
  }

  if (!env.RESEND_FROM_EMAIL) {
    console.warn("RESEND_FROM_EMAIL not set, using default: Humam website <noreply@humam.sa>");
  }

  if (!env.RESEND_TO_EMAIL) {
    console.warn("RESEND_TO_EMAIL not set, using default: humam4096@gmail.com");
  }
}
