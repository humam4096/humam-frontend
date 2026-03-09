'use client';

// This is the global 404 page that catches requests without a valid locale prefix
// Example: /missing-page
// Since it's outside the [locale] scope, we render a basic HTML shell 
// and the NotFoundHero. We can't use next-intl translations directly here without context,
// so we provide default english fallback strings in a wrapper or just render a basic message.
// For Next.js App Router with next-intl, typically a meta refresh or a simple English fallback is used.
import {BrandStar} from '@/components/brand/BrandStar';

export default function GlobalNotFound() {
  return (
    <html>
      <body style={{ backgroundColor: '#F9F8F6', fontFamily: 'system-ui, sans-serif', margin: 0, padding: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '2rem' }}>
          <div style={{ position: 'absolute', opacity: 0.1, zIndex: 0 }}>
             <BrandStar fillColor="#D3631A" />
          </div>
          <h1 style={{ fontSize: '4rem', color: '#1A1A1A', marginBottom: '1rem', zIndex: 1 }}>404</h1>
          <p style={{ fontSize: '1.25rem', color: '#3E503A', marginBottom: '2rem', zIndex: 1 }}>The page you are looking for doesn&apos;t exist.</p>
          <a href="/en" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#D3631A', color: 'white', textDecoration: 'none', borderRadius: '4px', zIndex: 1 }}>
            Return to Homepage
          </a>
        </div>
      </body>
    </html>
  );
}
