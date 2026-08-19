'use client';

import {useTranslations} from 'next-intl';
import styles from './ActivityInfo.module.css';

interface ActivityInfoProps {
  activity: {
    year: string;
    client: string;
    location: string;
  };
}

export default function ActivityInfo({activity}: ActivityInfoProps) {
  const t = useTranslations('ActivityDetail.info');

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.item}>
            <span className={styles.label}>{t('year')}</span>
            <span className={styles.value}>{activity.year}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>{t('client')}</span>
            <span className={styles.value}>{activity.client}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>{t('location')}</span>
            <span className={styles.value}>{activity.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
