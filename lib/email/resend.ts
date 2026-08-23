// lib/email/resend.ts
import { Resend } from "resend";

/**
 * Resend client singleton
 * Configured with API key from environment variables
 */
export const resend = new Resend(process.env.RESEND_API_KEY || "");

/**
 * Email configuration
 */
export const emailConfig = {
  from: `Humam website <${process.env.RESEND_FROM_EMAIL || "noreply@humam.sa"}>`,
  to: process.env.RESEND_TO_EMAIL || "humam4096@gmail.com",
} as const;


/**
 * Validate email configuration
 * Throws error if required environment variables are missing
 */
export function validateEmailConfig(): void {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured in environment variables");
  }
  
  if (!process.env.RESEND_FROM_EMAIL) {
    console.warn("RESEND_FROM_EMAIL is not set, using default");
  }
  
  if (!process.env.RESEND_TO_EMAIL) {
    console.warn("RESEND_TO_EMAIL is not set, using default");
  }
}
