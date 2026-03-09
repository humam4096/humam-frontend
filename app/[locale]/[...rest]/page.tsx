import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

// This catch-all route triggers the localized 404 page
// when a user navigates to a non-existent route within a valid locale prefix.
// Example: /en/missing-page -> Trigger Next.js notFound() -> Render app/[locale]/not-found.tsx
export default async function CatchAllPage({params}: Props) {
  const {locale} = await params;
  
  // Ensure the locale is valid before setting it
  if (!routing.locales.includes(locale as any)) {
     notFound();
  }
  
  setRequestLocale(locale);
  notFound();
}
