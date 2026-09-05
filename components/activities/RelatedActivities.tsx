'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Image from 'next/image';
import styles from './RelatedActivities.module.css';
import {getRelatedActivities} from '@/data/activities';

interface RelatedActivitiesProps {
  currentId: string;
}

export default function RelatedActivities({currentId}: RelatedActivitiesProps) {
  const t = useTranslations('ActivityDetail.related');
  const tActivities = useTranslations();

  // Get related activities from centralized data
  const relatedActivities = getRelatedActivities(currentId, 2);

  // Helper function to translate if needed
  const translateField = (value: string) => {
    return value.startsWith('activities.') ? tActivities(value) : value;
  };

  if (relatedActivities.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2>{t('title')}</h2>
        </div>

        <div className={styles.grid}>
          {relatedActivities.map((activity) => (
            <Link
              key={activity.id}
              href={`/activities/${activity.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                {activity.image ? (
                  <Image
                    src={activity.image}
                    alt={translateField(activity.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    placeholder={activity.blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={activity.blurDataURL}
                    quality={85}
                    priority={false}
                  />
                ) : (
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
                )}
              </div>
              <div className={styles.cardContent}>
                <span className={styles.category}>{translateField(activity.category)}</span>
                <h3 className={styles.cardTitle}>{translateField(activity.title)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
