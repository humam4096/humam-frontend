'use client';

import {useAuth} from '@/hooks/useAuth';

export default function DashboardOverview() {
  const {user, loading} = useAuth();

  if (loading) return <div style={{padding: '2rem'}}>Loading...</div>;

  return (
    <div style={{padding: '3rem'}}>
      <div style={{marginBottom: '2rem'}}>
        <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Welcome back, {user?.name}</h1>
        <p style={{opacity: 0.8}}>Here is an overview of your recent activity and notifications.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
        <div className="card">
          <h3 style={{marginBottom: '1rem'}}>Recent Documents</h3>
          <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <li>📄 Quality Assurance Report Q3</li>
            <li>📄 ISO 22000 Certification Plan</li>
            <li>📄 Menu Engineering Strategy</li>
          </ul>
        </div>
        <div className="card">
          <h3 style={{marginBottom: '1rem'}}>Upcoming Tasks</h3>
          <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <li>✅ Finalize kitchen compliance audit</li>
            <li>⏳ Staff Training: Good Manufacturing Practices</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
