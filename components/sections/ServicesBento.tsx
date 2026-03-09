'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import styles from './ServicesBento.module.css';
import {motion} from 'framer-motion';
import {BrandHalfCircle} from '@/components/brand/BrandHalfCircle';
import {BrandStar} from '@/components/brand/BrandStar';

export default function ServicesBento() {
  const t = useTranslations('Services');

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

  return (
    <section className={`section ${styles.wrapper}`}>
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
          className={styles.bentoGrid}
        >
          {/* Large Main Feature Card */}
          <Link href="/services/consultancy" className={styles.largeCardLink}>
            <motion.div variants={cardVariants} className={`card ${styles.bentoCard} ${styles.largeCard}`}>
              <div className={styles.bentoWatermarkLarge}>
                <BrandHalfCircle />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.icon}>📈</div>
                <h3>{t('dev.title')}</h3>
                <p>{t('dev.desc')}</p>
              </div>
              <div className={styles.cardHoverAccent}></div>
            </motion.div>
          </Link>

          {/* Right Stacked Cards */}
          <Link href="/services/quality" className={styles.stackedCardLink}>
            <motion.div variants={cardVariants} className={`card ${styles.bentoCard}`}>
              <div className={styles.bentoWatermarkSmall}>
                <BrandStar fill="var(--color-brand-mustard)" />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.icon}>🛡️</div>
                <h3>{t('safety.title')}</h3>
                <p>{t('safety.desc')}</p>
              </div>
              <div className={styles.cardHoverAccent}></div>
            </motion.div>
          </Link>

          <Link href="/services/training" className={styles.stackedCardLink}>
            <motion.div variants={cardVariants} className={`card ${styles.bentoCard}`}>
              <div className={styles.bentoWatermarkSmall} style={{ top: '-10%', left: '-10%', right: 'auto', bottom: 'auto' }}>
                <BrandStar fill="var(--color-brand-red)" />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.icon}>👥</div>
                <h3>{t('training.title')}</h3>
                <p>{t('training.desc')}</p>
              </div>
              <div className={styles.cardHoverAccent}></div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
