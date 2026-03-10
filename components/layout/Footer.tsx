import {Link} from '@/i18n/routing';
import styles from './Footer.module.css';
import LanguageSwitcher from './LanguageSwitcher';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations('Footer');

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.leftColumn}>
          <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Image src="/images/brand/Humam-Logo.svg" alt="Logo" width={100} height={100} />
          </Link>
            <p>{t('tagline')}</p>
          </div>
          <div className={styles.contactInfo}>
            <p>{t('location')}</p>
            <p className={styles.email}>info@humam.sa</p>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.linkGroup}>
            <h4>{t('sections.company.title')}</h4>
            <ul>
              <li><Link href="/about">{t('sections.company.about')}</Link></li>
              <li><Link href="/services">{t('sections.company.services')}</Link></li>
              <li><Link href="/industries">{t('sections.company.industries')}</Link></li>
              <li><Link href="/experts">{t('sections.company.experts')}</Link></li>
              <li><Link href="/contact">{t('sections.company.contact')}</Link></li>
            </ul>
          </div>
          
          <div className={styles.linkGroup}>
            <h4>{t('sections.expertise.title')}</h4>
            <ul>
              <li><Link href="/services#development">{t('sections.expertise.development')}</Link></li>
              <li><Link href="/services#quality">{t('sections.expertise.quality')}</Link></li>
              <li><Link href="/services#training">{t('sections.expertise.training')}</Link></li>
              <li><Link href="/services#planning">{t('sections.expertise.planning')}</Link></li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4>{t('sections.legal.title')}</h4>
            <ul>
              <li><Link href="/privacy">{t('sections.legal.privacy')}</Link></li>
              <li><Link href="/terms">{t('sections.legal.terms')}</Link></li>
              <li><Link href="/cookies">{t('sections.legal.cookies')}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`container`}>
        <div className={styles.bottomBar}>
          <div className={styles.bottomLinks}>
            <p>&copy; {year} {t('copyright')}</p>
            <LanguageSwitcher />
          </div>

          <div className={styles.socialIcons}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
