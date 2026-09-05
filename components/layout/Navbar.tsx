'use client';

import {useState, useEffect} from 'react';
import {Link, usePathname} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import {useAuth} from '@/contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './Navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const {user, logout} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events for dynamic border
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
          <Image 
            src="/images/brand/Humam-Logo.svg" 
            // src="/images/brand/Humam-Logo-Short.svg" 
            alt="Logo" 
            width={100} 
            height={70} 
            priority
          />
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link 
              href="/" 
              className={pathname === '/' ? styles.active : ''}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              {t('home')}
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className={pathname === '/about' ? styles.active : ''}
              aria-current={pathname === '/about' ? 'page' : undefined}
            >
              {t('about')}
            </Link>
          </li>
          <li>
            <Link 
              href="/services" 
              className={pathname === '/services' ? styles.active : ''}
              aria-current={pathname === '/services' ? 'page' : undefined}
            >
              {t('services')}
            </Link>
          </li>
          <li>
            <Link 
              href="/activities" 
              className={pathname === '/activities' ? styles.active : ''}
              aria-current={pathname === '/activities' ? 'page' : undefined}
            >
              {t('activities')}
            </Link>
          </li>
          {/* <li><Link href="/industries">{t('industries')}</Link></li> */}
          <li>
            <Link 
              href="/training-center" 
              className={pathname === '/training-center' ? styles.active : ''}
              aria-current={pathname === '/training-center' ? 'page' : undefined}
            >
              {t('training')}
            </Link>
          </li>
          <li>
            <Link 
              href="/contact" 
              className={pathname === '/contact' ? styles.active : ''}
              aria-current={pathname === '/contact' ? 'page' : undefined}
            >
              {t('contact')}
            </Link>
          </li>
        </ul>
        <div className={styles.actions}>
          <LanguageSwitcher />
          
          {user ? (
            <div className={styles.userMenu}>
              <Link
              href={'/dashboard'} 
                className={styles.userButton}
                onClick={() => navigator}
                aria-label="User menu"
              >
                <span className={styles.userName}>{user.name}</span>
              </Link>
            </div>
          ) : (
            <Link href="/login" className={styles.loginButton}>
              {t('login')}
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className={styles.hamburger}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Click-away Overlay */}
      {isMenuOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <button 
            className={styles.closeButton}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
        
        <ul className={styles.mobileNavLinks}>
          <li>
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className={pathname === '/' ? styles.active : ''}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              {t('home')}
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              onClick={() => setIsMenuOpen(false)}
              className={pathname === '/about' ? styles.active : ''}
              aria-current={pathname === '/about' ? 'page' : undefined}
            >
              {t('about')}
            </Link>
          </li>
          <li>
            <Link 
              href="/services" 
              onClick={() => setIsMenuOpen(false)}
              className={pathname === '/services' ? styles.active : ''}
              aria-current={pathname === '/services' ? 'page' : undefined}
            >
              {t('services')}
            </Link>
          </li>
          <li>
            <Link 
              href="/activities" 
              onClick={() => setIsMenuOpen(false)}
              className={pathname === '/activities' ? styles.active : ''}
              aria-current={pathname === '/activities' ? 'page' : undefined}
            >
              {t('activities')}
            </Link>
          </li>
          <li>
            <Link 
              href="/training-center" 
              onClick={() => setIsMenuOpen(false)}
              className={pathname === '/training-center' ? styles.active : ''}
              aria-current={pathname === '/training-center' ? 'page' : undefined}
            >
              {t('training')}
            </Link>
          </li>
          <li>
            <Link 
              href="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className={pathname === '/contact' ? styles.active : ''}
              aria-current={pathname === '/contact' ? 'page' : undefined}
            >
              {t('contact')}
            </Link>
          </li>
        </ul>
        <div className={styles.mobileActions}>
          <LanguageSwitcher />
          
          {user ? (
            <div className={styles.mobileUserInfo}>
              <div className={styles.mobileUserDetails}>
                <span className={styles.mobileUserName}>{user.name}</span>
                <span className={styles.mobileUserRole}>{user.role}</span>
              </div>
              <Link 
                href="/dashboard" 
                className={styles.mobileDashboardLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('dashboard')}
              </Link>
              <button 
                className={styles.mobileLogoutButton}
                onClick={handleLogout}
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className={styles.mobileLoginButton}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('login')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
