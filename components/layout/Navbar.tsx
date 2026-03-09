'use client';

import {useState, useEffect} from 'react';
import {Link, usePathname} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './Navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
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

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
          <Image 
            src="/images/brand/" 
            // src="/images/brand/Humam-Logo-Short.svg" 
            alt="Logo" 
            width={100} 
            height={70} 
            priority
          />
        </Link>
        <ul className={styles.navLinks}>
          <li><Link href="/">{t('home')}</Link></li>
          <li><Link href="/about">{t('about')}</Link></li>
          <li><Link href="/services">{t('services')}</Link></li>
          {/* <li><Link href="/industries">{t('industries')}</Link></li> */}
          <li><Link href="/training-center">{t('training')}</Link></li>
          <li><Link href="/contact">{t('contact')}</Link></li>
        </ul>
        <div className={styles.actions}>
          <LanguageSwitcher />
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
          <li><Link href="/" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link></li>
          <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>{t('about')}</Link></li>
          <li><Link href="/services" onClick={() => setIsMenuOpen(false)}>{t('services')}</Link></li>
          <li><Link href="/training-center" onClick={() => setIsMenuOpen(false)}>{t('training')}</Link></li>
          <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>{t('contact')}</Link></li>
        </ul>
        <div className={styles.mobileActions}>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
