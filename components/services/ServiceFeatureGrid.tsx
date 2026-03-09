'use client';

import {motion} from 'framer-motion';
import {BrandStar} from '@/components/brand/BrandStar';
import styles from './ServiceFeatureGrid.module.css';

interface FeatureItem {
  title: string;
  desc: string;
}

interface ServiceFeatureGridProps {
  eyebrow: string;
  heading: string;
  description: string;
  items: FeatureItem[];
  accent?: string;
}

export default function ServiceFeatureGrid({
  eyebrow,
  heading,
  description,
  items,
  accent = 'var(--color-brand-green)',
}: ServiceFeatureGridProps) {
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {opacity: 0, y: 25},
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
          {items.map((item, index) => (
            <motion.div key={index} variants={cardVariants} className={`card ${styles.featureCard}`}>
              <div className={styles.cardIndex} style={{color: accent}}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className={styles.cardWatermark}>
                <BrandStar fillColor={accent} />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
              <div className={styles.cardAccent} style={{backgroundColor: accent}}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
