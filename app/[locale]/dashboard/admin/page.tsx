'use client';

import {useAuth} from '@/hooks/useAuth';
import {hasAccess} from '@/lib/auth';
import {useRouter} from '@/i18n/routing';
import {useEffect} from 'react';

export default function AdminPage() {
  const {user, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && !hasAccess(user.role, ['ADMIN'])) {
      // Redirect if not admin
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) return <div style={{padding: '2rem'}}>Loading...</div>;
  if (!user || !hasAccess(user.role, ['ADMIN'])) return null;

  return (
    <div style={{padding: '3rem'}}>
      <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Admin Settings</h1>
      <p style={{opacity: 0.8, marginBottom: '2rem'}}>Manage users, roles, and global platform settings.</p>

      <div className="card" style={{borderLeft: '4px solid var(--color-muted-green)'}}>
        <h3>System Status: Online</h3>
        <p style={{marginTop: '1rem'}}>Active users: 42</p>
        <p>Pending registrations: 3</p>
      </div>
    </div>
  );
}
