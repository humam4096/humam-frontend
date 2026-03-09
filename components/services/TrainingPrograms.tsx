'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import Button from '@/components/ui/Button';
import {BrandStar} from '@/components/brand/BrandStar';
import {BrandHalfCircle} from '@/components/brand/BrandHalfCircle';
import styles from './TrainingPrograms.module.css';
import { BrandTilePattern } from '../brand/BrandTilePattern';

const programKeys = ['employee', 'chef', 'workshops', 'specialized'] as const;

interface ServiceDetailSectionProps {
  eyebrow: string;
  heading: string;
  description: string;
}


export default function TrainingPrograms({ eyebrow, heading, description }: ServiceDetailSectionProps) {
  const t = useTranslations('TrainingPage');

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: {opacity: 0, y: 30},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  return (
    <>
      {/* Programs Grid */}
      <section className={`section ${styles.wrapper}`}>
        <div className={`container ${styles.gridContainer}`}>
          <motion.div
            className={styles.header}
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-10%'}}
            transition={{duration: 0.8, ease: [0.25, 1, 0.5, 1]}}
          >
            <span className="eyebrow">{eyebrow}</span>
            <h2 className={styles.heading}>{heading}</h2>
            <p className={styles.description}>{description}</p>
          </motion.div>
          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-5%'}}
          >
            <div className={styles.backgroundPattern}>
              <BrandTilePattern />
            </div>
            {programKeys.map((key, index) => {
              const outcomes = t(`programs.${key}.outcomes`).split(', ');

              return (
                <motion.div key={key} variants={cardVariants} className={styles.programCard}>
                  <div className={styles.cardWatermark}>
                    <BrandStar fillColor="var(--color-brand-mustard)" />
                  </div>
                  <div className={styles.cardNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className={styles.cardTitle}>{t(`programs.${key}.title`)}</h3>
                  <p className={styles.cardDesc}>{t(`programs.${key}.desc`)}</p>
                  <div className={styles.outcomesSection}>
                    <span className={styles.outcomesLabel}>Outcomes</span>
                    <div className={styles.outcomesGrid}>
                      {outcomes.map((outcome, i) => (
                        <div key={i} className={styles.outcomeItem}>
                          <div className={styles.outcomeDot}></div>
                          <span>{outcome.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Training CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg}>
          <BrandHalfCircle className={styles.ctaWatermark} />
        </div>
        <div className={`container ${styles.ctaContent}`}>
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.8, ease: [0.25, 1, 0.5, 1]}}
          >
            <span className={styles.ctaEyebrow}>{t('cta.eyebrow')}</span>
            <h2 className={styles.ctaTitle}>{t('cta.title')}</h2>
            <p className={styles.ctaDesc}>{t('cta.description')}</p>
            <Button href="/contact" variant="outline">
              {t('cta.button')}
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
