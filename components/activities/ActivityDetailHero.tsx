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
  const tActivities = useTranslations();

  // Translate the activity fields if they are translation keys
  const translatedCategory = activity.category.startsWith('activities.') 
    ? tActivities(activity.category) 
    : activity.category;
  const translatedTitle = activity.title.startsWith('activities.') 
    ? tActivities(activity.title) 
    : activity.title;
  const translatedDescription = activity.description.startsWith('activities.') 
    ? tActivities(activity.description) 
    : activity.description;

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/activities" className={styles.breadcrumbLink}>
            {t('breadcrumb')}
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{translatedCategory}</span>
        </div>

        <div className={styles.content}>
          <span className={styles.category}>{translatedCategory}</span>
          <h2 className={styles.title}>{translatedTitle}</h2>
          <p className={styles.description}>{translatedDescription}</p>
        </div>
      </div>
    </section>
  );
}
