'use client';

import {Link, usePathname} from '@/i18n/routing';
import {useAuth} from '@/hooks/useAuth';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const {user, loading} = useAuth();
  const pathname = usePathname();

  if (loading) return <div className={styles.sidebar}>Loading...</div>;

  const links = [
    {href: '/dashboard', label: 'Overview', roles: ['ADMIN', 'EDITOR', 'CLIENT']},
    {href: '/dashboard/client', label: 'My Projects', roles: ['CLIENT', 'ADMIN']},
    {href: '/dashboard/admin', label: 'Admin Settings', roles: ['ADMIN']},
  ];

  const visibleLinks = links.filter((link) => user?.role && link.roles.includes(user.role));

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <h2>HUMAM</h2>
        <span className={styles.roleBadge}>{user?.role}</span>
      </div>

      <nav className={styles.nav}>
        {visibleLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${isActive ? styles.active : ''}`}
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
