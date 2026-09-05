'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Image from 'next/image';
import styles from './ActivitiesGrid.module.css';
import {motion} from 'framer-motion';
import {BrandStar} from '@/components/brand/BrandStar';
import {getActivityListItems, type ActivityListItem} from '@/data/activities';

export default function ActivitiesGrid() {
  const t = useTranslations('ActivitiesPage.grid');

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {opacity: 0, y: 30},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  // Get activities from centralized data
  const activities: ActivityListItem[] = getActivityListItems();

  return (
    <section className={styles.gridSection}>
      <div className="container">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-5%'}}
          className={styles.grid}
        >
          {activities.map((activity, index) => (
            <Link
              key={activity.id}
              href={`/activities/${activity.slug}`}
              className={`${styles.cardLink} ${activity.featured ? styles.featured : ''}`}
            >
              <motion.div variants={cardVariants} className={`card ${styles.card}`}>
                <div className={styles.cardBackground}>
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    placeholder={activity.blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={activity.blurDataURL}
                    quality={85}
                    priority={index === 0}
                  />
                </div>
                <div className={styles.cardOverlay}></div>
                <div className={styles.watermark} style={{
                  bottom: index % 2 === 0 ? '-20%' : '-15%',
                  right: index % 2 === 0 ? '-20%' : '-15%',
                }}>
                  <BrandStar fill="var(--color-brand-mustard)" />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.category}>{activity.category}</span>
                  <h3 className={styles.cardTitle}>{activity.title}</h3>
                  <p className={styles.cardDescription}>{activity.description}</p>
                </div>
                <div className={styles.cardHoverAccent}></div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
