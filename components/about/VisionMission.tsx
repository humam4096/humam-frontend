'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {BrandStar} from '@/components/brand/BrandStar';
import {BrandTilePattern} from '@/components/brand/BrandTilePattern';
import styles from './VisionMission.module.css';

export default function VisionMission() {
  const t = useTranslations('AboutPage');

  return (
    <section className={`section ${styles.wrapper}`}>
      <div className="container">
        <div className={styles.grid}>
          <motion.div
            className={`card ${styles.block}`}
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-10%'}}
            transition={{duration: 0.7, ease: [0.25, 1, 0.5, 1]}}
          >
            <div className={styles.cardWatermark}>
              <BrandStar fillColor="var(--color-brand-green)" />
            </div>
            <div className={styles.cardContent}>
              <span className="eyebrow">{t('vision.eyebrow')}</span>
              <h2 className={styles.blockTitle}>{t('vision.title')}</h2>
              <p className={styles.blockDesc}>{t('vision.description')}</p>
            </div>
          </motion.div>

          <motion.div
            className={`card ${styles.block} ${styles.blockMission}`}
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-10%'}}
            transition={{duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1]}}
          >
            <div className={styles.cardWatermarkMission}>
              <BrandTilePattern />
            </div>
            <div className={styles.cardContent}>
              <span className="eyebrow">{t('mission.eyebrow')}</span>
              <h2 className={styles.blockTitle}>{t('mission.title')}</h2>
              <p className={styles.blockDesc}>{t('mission.description')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
