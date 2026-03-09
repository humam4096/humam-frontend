'use client';

import {useTranslations} from 'next-intl';
import styles from './Contact.module.css';

export default function Contact() {
  const t = useTranslations('ContactPage');

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        
        {/* Left Column: Content */}
        <div className={styles.contentCol}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.description}>{t('description')}</p>
          <div className={styles.contactInfo}>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoLabel}>{t('info.emailLabel')}</h3>
              <a href={`mailto:${t('info.email')}`} className={styles.infoLink}>{t('info.email')}</a>
            </div>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoLabel}>{t('info.locationLabel')}</h3>
              <p className={styles.infoText}>{t('info.location')}</p>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <p className={styles.quote}>"{t('testimonial.quote')}"</p>
            <p className={styles.author}>{t('testimonial.role')} - {t('testimonial.company')}</p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className={styles.formCol}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>{t('form.heading')}</h2>
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>{t('form.name')}</label>
                <input type="text" id="name" className={styles.input} placeholder={t('form.namePlaceholder')} />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>{t('form.email')}</label>
                <input type="email" id="email" className={styles.input} placeholder={t('form.emailPlaceholder')} />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="company" className={styles.label}>{t('form.company')}</label>
                <input type="text" id="company" className={styles.input} placeholder={t('form.companyPlaceholder')} />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="message" className={styles.label}>{t('form.message')}</label>
                <textarea id="message" className={styles.textarea} placeholder={t('form.messagePlaceholder')} rows={4}></textarea>
              </div>
              
              <button type="button" className={styles.submitBtn}>{t('form.submit')}</button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
