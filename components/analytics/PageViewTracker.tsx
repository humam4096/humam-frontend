'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/routing';
import { pageview } from '@/lib/analytics';

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on route change
    const url = window.location.origin + pathname;
    pageview(url);
  }, [pathname]);

  return null;
}