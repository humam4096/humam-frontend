'use client';

import {useTranslations} from 'next-intl';
import styles from './ActivitiesHero.module.css';

export default function ActivitiesHero() {
  const t = useTranslations('ActivitiesPage.hero');

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.content}>
          <span className="eyebrow">{t('eyebrow')}</span>
          <h1 className={styles.title}>{t('title')}</h1>
          {/* <p className={styles.subtitle}>{t('subtitle')}</p> */}
          <p className={styles.year}>{t('year')}</p>
        </div>
      </div>
    </section>
  );
}
