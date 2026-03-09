import {ReactNode} from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <div style={{display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-light-cream)'}}>
      <Sidebar />
      <main style={{flex: 1, overflowY: 'auto'}}>
        {children}
      </main>
    </div>
  );
}
