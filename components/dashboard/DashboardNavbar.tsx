'use client';

import {useState, useRef, useEffect} from 'react';
import {Link} from '@/i18n/routing';
import {useAuth} from '@/contexts/AuthContext';
import {useTranslations} from 'next-intl';
import {useMessages} from '@/hooks/useMessages';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import Image from 'next/image';
import styles from './DashboardNavbar.module.css';

interface DashboardNavbarProps {
  onMenuToggle?: () => void;
}

export default function DashboardNavbar({onMenuToggle}: DashboardNavbarProps) {
  const {user, logout} = useAuth();
  const t = useTranslations('Dashboard');
  const {messages} = useMessages();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  // Count unread messages (status: 'new')
  const unreadCount = messages.filter(msg => msg.status === 'new').length;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Left side - Mobile Menu + Brand */}
        <div className={styles.brand}>
          {/* Mobile Menu Button */}
          <button 
            className={styles.menuButton}
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M3 12h18M3 6h18M3 18h18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Right side - Actions */}
        <div className={styles.actions}>
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Messages/Notifications */}
          <Link href="/dashboard/messages" className={styles.iconButton} title="Messages">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path 
                d="M15 6a5 5 0 00-10 0c0 7-3 9-3 9h16s-3-2-3-9M11.73 17a2 2 0 01-3.46 0" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            {unreadCount > 0 && (
              <span className={styles.badge}>{unreadCount}</span>
            )}
          </Link>

          {/* User Menu */}
          <div className={styles.dropdown} ref={userMenuRef}>
            <button 
              className={styles.userButton}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-label="User menu"
            >
              <div className={styles.avatar}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </button>

            {isUserMenuOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.userMenuHeader}>
                  <div className={styles.avatarLarge}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className={styles.userDetails}>
                    <p className={styles.userMenuName}>{user?.name}</p>
                    <p className={styles.userMenuEmail}>{user?.email}</p>
                  </div>
                </div>
                
                {/* <div className={styles.menuDivider}></div> */}
                
                {/* <Link 
                  href="/dashboard" 
                  className={styles.menuItem}
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path 
                      d="M3 9h6M3 5h12M3 13h12" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                  </svg>
                  {t('dashboard') || 'Dashboard'}
                </Link>
                 */}
                {/* <Link 
                  href="/dashboard/profile" 
                  className={styles.menuItem}
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path 
                      d="M15 15v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M12 5a4 4 0 11-8 0 4 4 0 018 0z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t('profile') || 'Profile'}
                </Link>
                
                <Link 
                  href="/dashboard/settings" 
                  className={styles.menuItem}
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path 
                      d="M9 11a2 2 0 100-4 2 2 0 000 4z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M14.32 11a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V17a2 2 0 11-4 0v-.09A1.65 1.65 0 003.68 15a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H1a2 2 0 110-4h.09A1.65 1.65 0 003 3.68a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H7.5a1.65 1.65 0 001-1.51V1a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V7.5a1.65 1.65 0 001.51 1H17a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t('settings') || 'Settings'}
                </Link> */}
                
                <div className={styles.menuDivider}></div>
                
                <button 
                  className={`${styles.menuItem} ${styles.logoutItem}`}
                  onClick={handleLogout}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path 
                      d="M6 16H3a2 2 0 01-2-2V4a2 2 0 012-2h3M12 13l5-5-5-5M17 8H6" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t('logout') || 'Logout'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
