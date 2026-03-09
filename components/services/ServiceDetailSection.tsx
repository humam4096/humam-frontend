'use client';

import {useRef} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import styles from './ServiceDetailSection.module.css';
import { BrandTilePattern } from '../brand/BrandTilePattern';

interface DetailItem {
  title: string;
  desc: string;
  included: string;
}

interface ServiceDetailSectionProps {
  items: DetailItem[];
  accent?: string;
  eyebrow: string;
  heading: string;
  description: string;
}

function DetailCard({item, index, accent}: {item: DetailItem; index: number; accent: string}) {
  const ref = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.96, 1.02, 1.02, 0.96]);

  const includedItems = item.included.split(', ');

  return (
    <motion.div ref={ref} className={`card ${styles.detailCard}`} style={{opacity, scale}}>
      <div className={styles.cardNumber} style={{color: accent}}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDesc}>{item.desc}</p>
      <div className={styles.includedSection}>
        <span className={styles.includedLabel}>What&apos;s Included</span>
        <div className={styles.includedGrid}>
          {includedItems.map((text, i) => (
            <div key={i} className={styles.includedItem}>
              <div className={styles.includedDot} style={{backgroundColor: accent}}></div>
              <span>{text.trim()}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceDetailSection({items, accent = 'var(--color-brand-green)', eyebrow, heading, description}: ServiceDetailSectionProps) {
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
        <div className={styles.scrollCol}>
          <div className={styles.backgroundPattern}>
            <BrandTilePattern />
          </div>
          {items.map((item, index) => (
            <DetailCard key={index} item={item} index={index} accent={accent} />
          ))}
        </div>
      </div>

    </section>
  );
}
