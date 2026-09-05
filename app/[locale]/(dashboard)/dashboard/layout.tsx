'use client';

import {ReactNode, useState} from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';

export default function DashboardLayout({children}: {children: ReactNode}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div style={{display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-light-cream)'}}>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 85,
            display: 'none',
          }}
          className="mobile-overlay"
        />
      )}
      
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0}}>
        <DashboardNavbar onMenuToggle={toggleSidebar} />
        <main style={{flex: 1, overflowY: 'auto'}}>
          {children}
        </main>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .mobile-overlay {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
