'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import styles from './RelatedActivities.module.css';

interface RelatedActivitiesProps {
  currentId: string;
}

export default function RelatedActivities({currentId}: RelatedActivitiesProps) {
  const t = useTranslations('ActivityDetail.related');

  // Sample related activities - replace with actual data
  const relatedActivities = [
    {
      id: 'factory-quality',
      title: t('activities.factory.title'),
      category: t('activities.factory.category'),
      slug: 'factory-quality',
    },
    {
      id: 'chef-training',
      title: t('activities.training.title'),
      category: t('activities.training.category'),
      slug: 'chef-training',
    },
  ];

  const filtered = relatedActivities.filter(activity => activity.id !== currentId);

  if (filtered.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2>{t('title')}</h2>
        </div>

        <div className={styles.grid}>
          {filtered.map((activity) => (
            <Link
              key={activity.id}
              href={`/activities/${activity.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <div className={styles.imagePlaceholder}>
                  <div className={styles.placeholderIcon}>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.category}>{activity.category}</span>
                <h3 className={styles.cardTitle}>{activity.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
