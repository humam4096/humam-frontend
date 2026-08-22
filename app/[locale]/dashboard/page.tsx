'use client';

import {useAuth} from '@/contexts/AuthContext';

export default function DashboardOverview() {
  const {user, loading} = useAuth();

  if (loading) return <div style={{padding: '2rem'}}>Loading...</div>;

  return (
    <div style={{padding: '3rem'}}>
      <div style={{marginBottom: '2rem'}}>
        <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Welcome back, {user?.name}</h1>
        <p style={{opacity: 0.8}}>Here is an overview of your recent activity and notifications.</p>
      </div>
    </div>
  );
}
