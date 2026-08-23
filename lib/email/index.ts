// lib/email/index.ts
/**
 * Email service module
 * Centralized exports for email functionality
 */

export { resend, emailConfig, validateEmailConfig } from "./resend";

export {
  sendContactNotification,
  sendContactNotificationSafe,
  type SendContactNotificationParams,
  type SendContactNotificationResult,
} from "./send-contact-notification";

export {
  getContactNotificationTemplate,
  getContactNotificationText,
  type ContactEmailData,
} from "./templates";
