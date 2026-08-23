// lib/email/templates.ts

export interface ContactEmailData {
  name: string;
  email: string;
  company?: string;
  industry?: string;
  service?: string;
  message: string;
  submittedAt: string;
}

/**
 * Generate HTML email template for contact form notification
 */
export function getContactNotificationTemplate(data: ContactEmailData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background-color: #2563eb; padding: 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                    📬 New Contact Form Submission
                  </h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 30px;">
                  <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px;">
                    You have received a new message from your website contact form.
                  </p>
                  
                  <!-- Contact Details -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #2563eb;">
                        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                          <strong>Name</strong>
                        </p>
                        <p style="margin: 0; color: #111827; font-size: 16px;">
                          ${escapeHtml(data.name)}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #2563eb;">
                        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                          <strong>Email</strong>
                        </p>
                        <p style="margin: 0; color: #111827; font-size: 16px;">
                          <a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb; text-decoration: none;">
                            ${escapeHtml(data.email)}
                          </a>
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  ${data.company ? `
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #2563eb;">
                        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                          <strong>Company</strong>
                        </p>
                        <p style="margin: 0; color: #111827; font-size: 16px;">
                          ${escapeHtml(data.company)}
                        </p>
                      </td>
                    </tr>
                  </table>
                  ` : ''}
                  
                  ${data.industry ? `
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #2563eb;">
                        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                          <strong>Industry</strong>
                        </p>
                        <p style="margin: 0; color: #111827; font-size: 16px;">
                          ${escapeHtml(data.industry)}
                        </p>
                      </td>
                    </tr>
                  </table>
                  ` : ''}
                  
                  ${data.service ? `
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #2563eb;">
                        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                          <strong>Service Interested In</strong>
                        </p>
                        <p style="margin: 0; color: #111827; font-size: 16px;">
                          ${escapeHtml(data.service)}
                        </p>
                      </td>
                    </tr>
                  </table>
                  ` : ''}
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #2563eb;">
                        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                          <strong>Message</strong>
                        </p>
                        <p style="margin: 0; color: #111827; font-size: 16px; white-space: pre-wrap; word-wrap: break-word;">
                          ${escapeHtml(data.message)}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #6b7280;">
                        <p style="margin: 0; color: #6b7280; font-size: 14px;">
                          <strong>Submitted:</strong> ${escapeHtml(data.submittedAt)}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">
                    This is an automated notification from your website contact form.
                  </p>
                  <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 12px;">
                    Please reply directly to the customer's email address above.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Generate plain text version of contact notification
 */
export function getContactNotificationText(data: ContactEmailData): string {
  return `
NEW CONTACT FORM SUBMISSION
===========================

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}
${data.industry ? `Industry: ${data.industry}` : ''}
${data.service ? `Service Interested In: ${data.service}` : ''}

MESSAGE:
${data.message}

Submitted: ${data.submittedAt}

---
This is an automated notification from your website contact form.
Please reply directly to the customer's email address above.
  `.trim();
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}
