// lib/email/send-contact-notification.ts
import { getResend, getEmailConfig, validateEmailConfig } from "./resend";
import {
  getContactNotificationTemplate,
  getContactNotificationText,
  type ContactEmailData,
} from "./templates";

export interface SendContactNotificationParams {
  name: string;
  email: string;
  company?: string;
  industry?: string;
  service?: string;
  message: string;
}

export interface SendContactNotificationResult {
  success: boolean;
  emailId?: string;
  error?: string;
}

/**
 * Send contact form notification email using Resend
 * 
 * @param params - Contact form data
 * @returns Result object with success status and email ID or error message
 */
export async function sendContactNotification(
  params: SendContactNotificationParams
): Promise<SendContactNotificationResult> {
  try {
    // Validate email configuration
    validateEmailConfig();

    // Prepare email data
    const emailData: ContactEmailData = {
      name: params.name,
      email: params.email,
      company: params.company,
      industry: params.industry,
      service: params.service,
      message: params.message,
      submittedAt: new Date().toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      }),
    };

    // Generate email content
    const htmlContent = getContactNotificationTemplate(emailData);
    const textContent = getContactNotificationText(emailData);

    // Get Resend client and email config
    const resend = getResend();
    const emailConfig = getEmailConfig();

    // Send email via Resend
    const result = await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      subject: `New Contact Form Submission from ${params.name}`,
      html: htmlContent,
      text: textContent,
      replyTo: params.email, // Allow easy reply to the customer
    });

    // Check for errors
    if (result.error) {
      console.error("Resend API error:", result.error);
      return {
        success: false,
        error: result.error.message || "Failed to send email",
      };
    }

    // Success
    return {
      success: true,
      emailId: result.data?.id,
    };
  } catch (error) {
    console.error("Error sending contact notification:", error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Send contact notification with error handling and logging
 * This is a fire-and-forget version that logs errors but doesn't throw
 * 
 * @param params - Contact form data
 */
export async function sendContactNotificationSafe(
  params: SendContactNotificationParams
): Promise<void> {
  try {
    const result = await sendContactNotification(params);
    
    if (result.success) {
      console.log(`✅ Contact notification sent successfully. Email ID: ${result.emailId}`);
    } else {
      console.error(`❌ Failed to send contact notification: ${result.error}`);
    }
  } catch (error) {
    console.error("❌ Unexpected error in sendContactNotificationSafe:", error);
  }
}
