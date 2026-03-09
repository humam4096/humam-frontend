'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {BrandHalfCircle} from '@/components/brand/BrandHalfCircle';
import {BrandStar} from '@/components/brand/BrandStar';
import styles from './Commitment.module.css';

export default function Commitment() {
  const t = useTranslations('AboutPage');

  return (
    <section className={styles.wrapper}>
      <div className={styles.bgPattern}>
        <BrandHalfCircle className={styles.watermark} />
        <div className={styles.watermarkStar}>
          <BrandStar fillColor="var(--color-brand-cream)" />
        </div>
      </div>
      <div className={`container ${styles.content}`}>
        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-10%'}}
          transition={{duration: 0.8, ease: [0.25, 1, 0.5, 1]}}
        >
          <span className={styles.eyebrow}>{t('commitment.eyebrow')}</span>
          <h2 className={styles.title}>{t('commitment.title')}</h2>
          <p className={styles.description}>{t('commitment.description')}</p>
        </motion.div>
      </div>
    </section>
  );
}
