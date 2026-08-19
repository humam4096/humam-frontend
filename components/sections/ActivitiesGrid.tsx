'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import styles from './ActivitiesGrid.module.css';
import {motion} from 'framer-motion';
import {BrandStar} from '@/components/brand/BrandStar';

interface Activity {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string;
  featured?: boolean;
}

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

  // Sample activities - replace with actual data
  const activities: Activity[] = [
    {
      id: '1',
      title: t('activities.hajj.title'),
      category: t('activities.hajj.category'),
      description: t('activities.hajj.description'),
      image: '/images/activities/hajj-humam/activity-hajj8.webp',
      slug: 'hajj-catering',
      featured: true,
    },
    {

      id: '2',
      title: t('activities.restaurant.title'),
      category: t('activities.restaurant.category'),
      description: t('activities.restaurant.description'),
      image: '/images/activities/restaurant-setup.jpg',
      slug: 'restaurant-launch',
    },
    {
      id: '3',
      title: t('activities.training.title'),
      category: t('activities.training.category'),
      description: t('activities.training.description'),
      image: '/images/activities/chef-training.jpg',
      slug: 'chef-training',
    },
    {
      id: '4',
      title: t('activities.certification.title'),
      category: t('activities.certification.category'),
      description: t('activities.certification.description'),
      image: '/images/activities/iso-certification.jpg',
      slug: 'iso-certification',
      featured: true,

    },
  ];

  return (
    <section className={styles.gridSection}>
      <div className="container">
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-10%'}}
          transition={{duration: 0.8, ease: [0.25, 1, 0.5, 1] as const}}
          className={styles.header}
        >
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2>{t('title')}</h2>
        </motion.div>

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
                <div className={styles.cardBackground} style={{backgroundImage: `url('${activity.image}')`}}></div>
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

        {/* <div className={styles.cta}>
          <p className={styles.ctaText}>{t('cta.text')}</p>
          <button className={styles.ctaButton}>
            {t('cta.button')}
          </button>
        </div> */}
      </div>
    </section>
  );
}
