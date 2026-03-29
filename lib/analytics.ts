// Google Analytics utility functions
import { GA_TRACKING_ID, isProduction } from '@/lib/config';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: Record<string, any>[];
  }
}

// Track page views
export const pageview = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag && isProduction) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
      page_title: title || document.title,
    });
  }
};

// Track custom events
export const event = (
  action: string,
  {
    event_category,
    event_label,
    value,
    ...customParameters
  }: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  } = {}
) => {
  if (typeof window !== 'undefined' && window.gtag && isProduction) {
    window.gtag('event', action, {
      event_category,
      event_label,
      value,
      ...customParameters,
    });
  }
};

// Common event tracking functions
export const trackButtonClick = (buttonName: string, location?: string) => {
  event('click', {
    event_category: 'engagement',
    event_label: buttonName,
    location,
  });
};

export const trackFormSubmission = (formName: string) => {
  event('form_submit', {
    event_category: 'engagement',
    event_label: formName,
  });
};

export const trackContactAttempt = (method: string) => {
  event('contact_attempt', {
    event_category: 'lead_generation',
    event_label: method,
  });
};

export const trackServiceView = (serviceName: string) => {
  event('service_view', {
    event_category: 'content',
    event_label: serviceName,
  });
};