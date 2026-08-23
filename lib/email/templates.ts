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
    <body style="margin: 0; padding: 0; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; background-color: #f6f5ef;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f5ef; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 12px rgba(62, 80, 58, 0.1); border: 1px solid rgba(131, 157, 120, 0.3);">
              
              <!-- Header with Logo -->
              <tr>
                <td style="background: linear-gradient(135deg, #6e1c24 0%, #3e503a 100%); padding: 40px 30px; text-align: center;">
                  <img src="https://humam.sa/images/brand/Humam-Logo.svg" alt="Humam Logo" width="120" height="120" style="display: block; margin: 0 auto 20px auto;" />
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.02em;">
                    New Contact Inquiry
                  </h1>
                  <p style="margin: 10px 0 0 0; color: #eae8dc; font-size: 14px; opacity: 0.9;">
                    A new message has been received from your website
                  </p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px; background-color: #ffffff;">
                  <p style="margin: 0 0 30px 0; color: #3e503a; font-size: 16px; line-height: 1.6;">
                    You have received a new contact form submission. Please review the details below and respond promptly.
                  </p>
                  
                  <!-- Contact Details -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                    <tr>
                      <td style="padding: 16px 20px; background-color: #f6f5ef; border-left: 4px solid #839d78; border-radius: 8px;">
                        <p style="margin: 0 0 6px 0; color: #839d78; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
                          Name
                        </p>
                        <p style="margin: 0; color: #2a2a2a; font-size: 17px; font-weight: 500;">
                          ${escapeHtml(data.name)}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                    <tr>
                      <td style="padding: 16px 20px; background-color: #f6f5ef; border-left: 4px solid #839d78; border-radius: 8px;">
                        <p style="margin: 0 0 6px 0; color: #839d78; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
                          Email Address
                        </p>
                        <p style="margin: 0; color: #2a2a2a; font-size: 17px; font-weight: 500;">
                          <a href="mailto:${escapeHtml(data.email)}" style="color: #6e1c24; text-decoration: none; border-bottom: 2px solid rgba(110, 28, 36, 0.2); padding-bottom: 2px;">
                            ${escapeHtml(data.email)}
                          </a>
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  ${data.company ? `
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                    <tr>
                      <td style="padding: 16px 20px; background-color: #f6f5ef; border-left: 4px solid #839d78; border-radius: 8px;">
                        <p style="margin: 0 0 6px 0; color: #839d78; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
                          Company
                        </p>
                        <p style="margin: 0; color: #2a2a2a; font-size: 17px; font-weight: 500;">
                          ${escapeHtml(data.company)}
                        </p>
                      </td>
                    </tr>
                  </table>
                  ` : ''}
                  
                  ${data.industry ? `
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                    <tr>
                      <td style="padding: 16px 20px; background-color: #f6f5ef; border-left: 4px solid #839d78; border-radius: 8px;">
                        <p style="margin: 0 0 6px 0; color: #839d78; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
                          Industry
                        </p>
                        <p style="margin: 0; color: #2a2a2a; font-size: 17px; font-weight: 500;">
                          ${escapeHtml(data.industry)}
                        </p>
                      </td>
                    </tr>
                  </table>
                  ` : ''}
                  
                  ${data.service ? `
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                    <tr>
                      <td style="padding: 16px 20px; background-color: #f6f5ef; border-left: 4px solid #839d78; border-radius: 8px;">
                        <p style="margin: 0 0 6px 0; color: #839d78; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
                          Service of Interest
                        </p>
                        <p style="margin: 0; color: #2a2a2a; font-size: 17px; font-weight: 500;">
                          ${escapeHtml(data.service)}
                        </p>
                      </td>
                    </tr>
                  </table>
                  ` : ''}
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                    <tr>
                      <td style="padding: 16px 20px; background-color: #f6f5ef; border-left: 4px solid #839d78; border-radius: 8px;">
                        <p style="margin: 0 0 6px 0; color: #839d78; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
                          Message
                        </p>
                        <p style="margin: 0; color: #2a2a2a; font-size: 16px; line-height: 1.7; white-space: pre-wrap; word-wrap: break-word;">
                          ${escapeHtml(data.message)}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
                    <tr>
                      <td style="padding: 14px 20px; background-color: #eae8dc; border-left: 4px solid #e6b85c; border-radius: 8px;">
                        <p style="margin: 0; color: #3e503a; font-size: 13px;">
                          <strong>⏰ Submitted:</strong> ${escapeHtml(data.submittedAt)}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- CTA Button -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                    <tr>
                      <td align="center">
                        <a href="mailto:${escapeHtml(data.email)}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #6e1c24 0%, #3e503a 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 15px; letter-spacing: 0.3px;">
                          Reply to ${escapeHtml(data.name.split(' ')[0])}
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f6f5ef; padding: 30px; text-align: center; border-top: 1px solid rgba(131, 157, 120, 0.3);">
                  <p style="margin: 0 0 8px 0; color: #3e503a; font-size: 14px; font-weight: 500;">
                    🌟 Humam - Excellence in Quality Management
                  </p>
                  <p style="margin: 0; color: #839d78; font-size: 13px; line-height: 1.6;">
                    This is an automated notification from your contact form.<br/>
                    Please respond directly to the customer's email address.
                  </p>
                  <p style="margin: 16px 0 0 0; color: #839d78; font-size: 12px;">
                    <a href="https://humam.sa" style="color: #6e1c24; text-decoration: none; font-weight: 600;">humam.sa</a>
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
