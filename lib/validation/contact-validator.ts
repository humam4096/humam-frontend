/**
 * Contact form validation utilities
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class ContactValidator {
  /**
   * Validate contact form data
   */
  static validate(data: any): ValidationResult {
    const errors: ValidationError[] = [];

    // Name validation
    if (!data.name || typeof data.name !== 'string') {
      errors.push({ field: 'name', message: 'Name is required' });
    } else if (data.name.trim().length < 2) {
      errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
    } else if (data.name.trim().length > 100) {
      errors.push({ field: 'name', message: 'Name must not exceed 100 characters' });
    }

    // Email validation
    if (!data.email || typeof data.email !== 'string') {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    } else if (data.email.trim().length > 255) {
      errors.push({ field: 'email', message: 'Email must not exceed 255 characters' });
    }

    // Message validation
    if (!data.message || typeof data.message !== 'string') {
      errors.push({ field: 'message', message: 'Message is required' });
    } else if (data.message.trim().length < 10) {
      errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
    } else if (data.message.trim().length > 5000) {
      errors.push({ field: 'message', message: 'Message must not exceed 5000 characters' });
    }

    // Company validation (optional)
    if (data.company && typeof data.company === 'string' && data.company.trim().length > 200) {
      errors.push({ field: 'company', message: 'Company name must not exceed 200 characters' });
    }

    // Industry validation (optional)
    if (data.industry && typeof data.industry === 'string') {
      const validIndustries = [
        'restaurants',
        'bakeries',
        'factories',
        'hotels',
        'hajj',
        'healthy',
      ];
      if (!validIndustries.includes(data.industry)) {
        errors.push({ field: 'industry', message: 'Invalid industry selection' });
      }
    }

    // Service validation (optional)
    if (data.service && typeof data.service === 'string') {
      const validServices = ['consultancy', 'quality', 'training'];
      if (!validServices.includes(data.service)) {
        errors.push({ field: 'service', message: 'Invalid service selection' });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Sanitize string input
   */
  static sanitize(value: string): string {
    return value.trim().replace(/\s+/g, ' ');
  }
}
