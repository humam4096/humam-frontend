'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {BrandStar} from '@/components/brand/BrandStar';
import styles from './QualityCommitment.module.css';

const statKeys = ['years', 'projects', 'certifications', 'industries'] as const;

export default function QualityCommitment() {
  const t = useTranslations('AboutPage');

  return (
    <section className={`section ${styles.wrapper}`}>
      <div className="container">
        <div className={styles.grid}>
          <motion.div
            className={styles.content}
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-10%'}}
            transition={{duration: 0.8, ease: [0.25, 1, 0.5, 1]}}
          >
            <span className="eyebrow">{t('quality.eyebrow')}</span>
            <h2 className={styles.title}>{t('quality.title')}</h2>
            <p className={styles.description}>{t('quality.description')}</p>
          </motion.div>

          <motion.div
            className={styles.statsGrid}
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-10%'}}
            transition={{duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1]}}
          >
            <div className={styles.statsWatermark}>
              <BrandStar fillColor="var(--color-brand-green)" />
            </div>
            {statKeys.map((key) => (
              <div key={key} className={styles.stat}>
                <span className={styles.statValue}>{t(`quality.stats.${key}`)}</span>
                <span className={styles.statLabel}>{t(`quality.stats.${key}Label`)}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
