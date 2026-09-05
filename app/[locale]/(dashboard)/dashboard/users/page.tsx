'use client';

import {useAuth} from '@/contexts/AuthContext';
import {hasAccess} from '@/lib/auth';
import {useRouter} from '@/i18n/routing';
import {useEffect} from 'react';
import {useUsers} from '@/hooks/useUsers';
import {UsersTable} from '@/components/dashboard/UsersTable';
import styles from './page.module.css';

export default function UsersPage() {
  const {user, loading: authLoading} = useAuth();
  const router = useRouter();
  const {users, loading, error} = useUsers();

  useEffect(() => {
    if (!authLoading && user && !hasAccess(user.role, ['ADMIN'])) {
      router.replace('/dashboard');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user || !hasAccess(user.role, ['ADMIN'])) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Users Management</h1>
        <p className={styles.description}>View and manage all system users.</p>
      </div>

      {loading && <div className={styles.loadingState}>Loading users...</div>}

      {error && <div className={styles.error}>{error}</div>}

      {!loading && !error && users.length === 0 && (
        <div className={styles.emptyState}>No users found.</div>
      )}

      {!loading && !error && users.length > 0 && <UsersTable users={users} />}
    </div>
  );
}
