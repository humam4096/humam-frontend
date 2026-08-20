import {Link} from '@/i18n/routing';
import styles from './Footer.module.css';
import LanguageSwitcher from './LanguageSwitcher';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

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
              <li><Link href="/dashboard">{t('sections.company.dashboard')}</Link></li>
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
            <a href="https://www.snapchat.com/@humamksa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <path d="M12 2c-3.3 0-5.6 2.6-5.6 6.1v2.1c0 .3-.2.5-.4.6l-2.3 1c-.3.1-.4.5-.2.8.5.7 1.5 1.1 2.2 1.3-.1.4-.3.9-.5 1.3-.1.3.1.6.4.6.5.1 1 .1 1.4.2.1.4.2.9.4 1.3.4.9 2 1.5 4.6 1.5s4.2-.6 4.6-1.5c.2-.4.3-.9.4-1.3.4-.1.9-.1 1.4-.2.3 0 .5-.3.4-.6-.2-.4-.4-.9-.5-1.3.7-.2 1.7-.6 2.2-1.3.2-.3.1-.7-.2-.8l-2.3-1c-.2-.1-.4-.3-.4-.6V8.1C17.6 4.6 15.3 2 12 2z"></path>
              </svg>
            </a>
            <a href="https://x.com/Humamksa" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 26 26" fill="currentColor" className={styles.icon}>
                <path d="M18.9 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/humamksa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.youtube.com/@Humamksa" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
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
