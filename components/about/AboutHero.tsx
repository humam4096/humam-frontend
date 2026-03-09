'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {BrandStar} from '@/components/brand/BrandStar';
import {BrandHalfCircle} from '@/components/brand/BrandHalfCircle';
import styles from './AboutHero.module.css';

export default function AboutHero() {
  const t = useTranslations('AboutPage');

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroWrapper}>
        <div className={styles.background}>
          <motion.div
            className={styles.brandWatermark}
            initial={{opacity: 0, rotate: -15, scale: 0.8}}
            animate={{opacity: 0.12, rotate: 0, scale: 1}}
            transition={{duration: 1.5, ease: 'easeOut'}}
          >
            <BrandStar />
          </motion.div>
          <motion.div
            className={styles.brandWatermarkSecondary}
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 0.07, scale: 1}}
            transition={{duration: 2, delay: 0.3, ease: 'easeOut'}}
          >
            <BrandHalfCircle />
          </motion.div>
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.content}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}
          >
            <motion.div variants={itemVariants} className={styles.badge}>
              {t('hero.eyebrow')}
            </motion.div>
            <motion.h1 variants={itemVariants} className={styles.title}>
              {t('hero.title')}
            </motion.h1>
            <motion.p variants={itemVariants} className={styles.subtitle}>
              {t('hero.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
