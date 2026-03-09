'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {BrandStar} from '@/components/brand/BrandStar';
import styles from './QualityStandards.module.css';
import { BrandTilePattern } from '../brand/BrandTilePattern';

const standardKeys = ['iso9001', 'iso22000', 'haccp', 'gmp'] as const;

interface ServiceDetailSectionProps {
  eyebrow: string;
  heading: string;
  description: string;
}

export default function QualityStandards({ eyebrow, heading, description }: ServiceDetailSectionProps) {
  const t = useTranslations('QualityPage');

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
          {standardKeys.map((key) => {
            const steps = t(`standards.${key}.steps`).split(', ');
            const included = t(`standards.${key}.included`).split(', ');

            return (
              <motion.div key={key} variants={cardVariants} className={styles.standardCard}>
                {/* Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardWatermark}>
                    <BrandStar fillColor="var(--color-brand-green)" />
                  </div>
                  <h3 className={styles.cardTitle}>{t(`standards.${key}.title`)}</h3>
                  <span className={styles.cardSubtitle}>{t(`standards.${key}.subtitle`)}</span>
                </div>

                {/* Goal */}
                <div className={styles.cardSection}>
                  <span className={styles.sectionLabel}>Goal</span>
                  <p className={styles.goalText}>{t(`standards.${key}.goal`)}</p>
                </div>

                {/* What's Included */}
                <div className={styles.cardSection}>
                  <span className={styles.sectionLabel}>What&apos;s Included</span>
                  <div className={styles.includedList}>
                    {included.map((item, i) => (
                      <div key={i} className={styles.includedItem}>
                        <div className={styles.dot}></div>
                        <span>{item.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process Steps */}
                <div className={styles.cardSection}>
                  <span className={styles.sectionLabel}>Process</span>
                  <div className={styles.stepsRow}>
                    {steps.map((step, i) => (
                      <div key={i} className={styles.step}>
                        <div className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</div>
                        <span className={styles.stepText}>{step.trim()}</span>
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
  );
}
