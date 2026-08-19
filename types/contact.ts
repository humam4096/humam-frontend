/**
 * Contact form submission types
 */

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  industry?: string;
  service?: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'resolved';
}

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  error?: string;
}
