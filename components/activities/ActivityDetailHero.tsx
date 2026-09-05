'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import styles from './ActivityDetailHero.module.css';

interface ActivityDetailHeroProps {
  activity: {
    title: string;
    category: string;
    description: string;
  };
}

export default function ActivityDetailHero({activity}: ActivityDetailHeroProps) {
  const t = useTranslations('ActivityDetail');

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/activities" className={styles.breadcrumbLink}>
            {t('breadcrumb')}
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{activity.category}</span>
        </div>

        <div className={styles.content}>
          <span className={styles.category}>{activity.category}</span>
          <h2 className={styles.title}>{activity.title}</h2>
          <p className={styles.description}>{activity.description}</p>
        </div>
      </div>
    </section>
  );
}
