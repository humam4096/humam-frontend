'use client';

import {Link, usePathname} from '@/i18n/routing';
import {useAuth} from '@/contexts/AuthContext';
import styles from './Sidebar.module.css';
import Image from 'next/image';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({isOpen, onClose}: SidebarProps) {
  const {user, loading} = useAuth();
  const pathname = usePathname();

  if (loading) return <div className={styles.sidebar}>Loading...</div>;

  const links = [
    {href: '/dashboard', label: 'Overview', roles: ['ADMIN']},
    {href: '/dashboard/messages', label: 'Messages', roles: ['ADMIN']},
    {href: '/dashboard/users', label: 'Users', roles: ['ADMIN']},
  ];

  const visibleLinks = links.filter((link) => user?.role && link.roles.includes(user.role));

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.brand}>
        <Link href="/" style={{display: "flex", justifyItems: 'center', alignItems: 'center'}}>
          <Image
            src="/images/brand/Humam-Logo-Short.svg"
            alt="Humam Logo"
            width={40}
            height={40}
            priority
          />
          <span style={{fontWeight: 600}}>HUMAM</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        {visibleLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${isActive ? styles.active : ''}`}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userCard}>
          <div className={styles.avatar}>{user?.name.charAt(0)}</div>
          <div className={styles.userInfo}>
            <p>{user?.name}</p>
            <p className={styles.logout}>Log out (Mock)</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
