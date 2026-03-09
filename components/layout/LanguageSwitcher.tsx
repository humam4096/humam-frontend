'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/routing';
import {useTransition} from 'react';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  }

  return (
    <button 
      className={styles.button} 
      onClick={toggleLocale} 
      disabled={isPending}
      aria-label="Toggle language"
    >
      <span className={styles.icon}>{locale === 'en' ? '🇸🇦' : '🇺🇸'}</span>
      <span className={styles.text}>{locale === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
}
