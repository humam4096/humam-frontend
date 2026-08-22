'use client';

import {useAuth} from '@/contexts/AuthContext';
import {hasAccess} from '@/lib/auth';
import {useRouter} from '@/i18n/routing';
import {useEffect} from 'react';
import {useMessages} from '@/hooks/useMessages';
import {MessagesTable} from '@/components/dashboard/MessagesTable';
import styles from './page.module.css';

export default function MessagesPage() {
  const {user, loading: authLoading} = useAuth();
  const router = useRouter();
  const {messages, loading, error} = useMessages();

  useEffect(() => {
    if (!authLoading && user && !hasAccess(user.role, ['CLIENT', 'ADMIN'])) {
      router.replace('/dashboard');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user || !hasAccess(user.role, ['CLIENT', 'ADMIN'])) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Messages</h1>
        <p className={styles.description}>View and manage contact form submissions.</p>
      </div>

      {loading && <div className={styles.loadingState}>Loading messages...</div>}

      {error && <div className={styles.error}>{error}</div>}

      {!loading && !error && messages.length === 0 && (
        <div className={styles.emptyState}>No messages found.</div>
      )}

      {!loading && !error && messages.length > 0 && <MessagesTable messages={messages} />}
    </div>
  );
}
