# Google Analytics Implementation

This document describes the Google Analytics (gtag.js) implementation in the Humam Consulting website.

## Overview

The implementation includes:
- Google Analytics 4 (GA4) tracking with ID: `G-L72V5PR57T`
- Automatic page view tracking for SPA navigation
- Custom event tracking utilities
- Production-only loading (disabled in development)
- Support for internationalization (English/Arabic)

## Files Structure

```
components/analytics/
├── GoogleAnalytics.tsx      # Main GA script component
└── PageViewTracker.tsx      # SPA page view tracking

lib/
├── analytics.ts             # Analytics utility functions
└── config.ts               # Configuration constants
```

## Configuration

Set the Google Analytics tracking ID in your environment variables:

```bash
NEXT_PUBLIC_GA_TRACKING_ID=G-L72V5PR57T
```

## Usage

### Automatic Tracking

Page views are automatically tracked when users navigate between pages in the SPA.

### Custom Event Tracking

Use the provided utility functions to track custom events:

```typescript
import { event, trackButtonClick, trackFormSubmission } from '@/lib/analytics';

// Generic event tracking
event('custom_action', {
  event_category: 'engagement',
  event_label: 'button_name',
  value: 1
});

// Predefined tracking functions
trackButtonClick('contact_us', 'header');
trackFormSubmission('contact_form');
trackContactAttempt('email');
trackServiceView('quality_assurance');
```

### Available Tracking Functions

- `pageview(url, title?)` - Track page views
- `event(action, parameters)` - Track custom events
- `trackButtonClick(buttonName, location?)` - Track button clicks
- `trackFormSubmission(formName)` - Track form submissions
- `trackContactAttempt(method)` - Track contact attempts
- `trackServiceView(serviceName)` - Track service page views

## Implementation Details

### Next.js Integration

- Uses Next.js `Script` component with `afterInteractive` strategy
- Properly handles SSR/client-side rendering
- Integrates with Next.js internationalized routing

### SPA Considerations

- Tracks route changes using Next.js `usePathname` hook
- Automatically sends page views on client-side navigation
- Maintains proper page titles and URLs

### Performance

- Scripts load after page interaction to avoid blocking initial render
- Only loads in production environment
- Uses Next.js optimized script loading

### Privacy & Compliance

- Only tracks in production environment
- Can be easily extended for cookie consent integration
- Follows Google Analytics best practices

## Testing

To test the implementation:

1. Build and run in production mode:
   ```bash
   npm run build
   npm start
   ```

2. Open browser developer tools and check:
   - Network tab for GA script loading
   - Console for `gtag` function availability
   - Google Analytics Real-Time reports

## Troubleshooting

### Common Issues

1. **GA not loading in development**: This is intentional. Set `NODE_ENV=production` to test locally.

2. **Page views not tracking**: Ensure the `PageViewTracker` component is included in the layout.

3. **Events not firing**: Check that `window.gtag` is available and you're in production mode.

### Debug Mode

To enable debug mode, add this to your GA configuration:

```typescript
gtag('config', GA_TRACKING_ID, {
  debug_mode: true
});
```