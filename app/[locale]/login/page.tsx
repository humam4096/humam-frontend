'use client';

import { useState, useEffect, Suspense } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@/i18n/routing';
import styles from './page.module.css';

function LoginForm() {
  const t = useTranslations('LoginPage');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { login, user, loading: authLoading } = useAuth();
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      const redirect = searchParams.get('redirect') || '/dashboard';
      // Ensure redirect URL includes locale
      const redirectUrl = redirect.startsWith('/') 
        ? `/${locale}${redirect}` 
        : redirect;
      window.location.href = redirectUrl;
    }
  }, [user, authLoading, searchParams, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError(t('errors.required'));
      setLoading(false);
      return;
    }

    try {
      const result = await login(email, password);

      if (result.success) {
        const redirect = searchParams.get('redirect') || '/dashboard';
        // Ensure redirect URL includes locale
        const redirectUrl = redirect.startsWith('/') 
          ? `/${locale}${redirect}` 
          : redirect;
        window.location.href = redirectUrl;
      } else {
        setError(result.error || t('errors.invalid'));
      }
    } catch (err) {
      setError(t('errors.invalid'));
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <main className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.formCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                {t('form.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('form.emailPlaceholder')}
                disabled={loading}
                className={styles.input}
                autoComplete="email"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                {t('form.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('form.passwordPlaceholder')}
                disabled={loading}
                className={styles.input}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? t('form.submitting') : t('form.submit')}
            </button>
          </form>

          <div className={styles.footer}>
            {t('footer.contact')}{' '}
            <Link href="/contact" className={styles.link}>
              {t('footer.contactLink')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
