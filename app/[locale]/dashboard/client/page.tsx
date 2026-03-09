'use client';

import {useAuth} from '@/hooks/useAuth';
import {hasAccess} from '@/lib/auth';
import {useRouter} from '@/i18n/routing';
import {useEffect} from 'react';

export default function ClientPage() {
  const {user, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && !hasAccess(user.role, ['CLIENT', 'ADMIN'])) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) return <div style={{padding: '2rem'}}>Loading...</div>;
  if (!user || !hasAccess(user.role, ['CLIENT', 'ADMIN'])) return null;

  return (
    <div style={{padding: '3rem'}}>
      <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>My Projects</h1>
      <p style={{opacity: 0.8, marginBottom: '2rem'}}>Track the progress of your ongoing consultancy projects.</p>

      <div className="card">
        <h3 style={{marginBottom: '0.5rem'}}>ISO 9001 Qualification</h3>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
          <div style={{flex: 1, height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px'}}>
            <div style={{width: '60%', height: '100%', backgroundColor: 'var(--color-muted-green)', borderRadius: '4px'}}></div>
          </div>
          <span>60%</span>
        </div>
        <p>Current Phase: Internal Audits & Management Review</p>
      </div>
    </div>
  );
}
