'use client';

import {motion} from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import {BrandStar} from '@/components/brand/BrandStar';
import styles from './ServiceBlock.module.css';

interface ServiceBlockProps {
  number?: string;
  eyebrow: string;
  title: string;
  description: string;
  body: string;
  cta: string;
  href: string;
  benefits: string[];
  imageSrc: string;
  imageAlt: string;
  accent?: 'green' | 'burgundy' | 'mustard';
  reverse?: boolean;
}

const accentColors = {
  green: 'var(--color-brand-green)',
  burgundy: 'var(--color-brand-red)',
  mustard: 'var(--color-brand-mustard)',
};

export default function ServiceBlock({
  eyebrow,
  title,
  description,
  cta,
  href,
  benefits,
  imageSrc,
  imageAlt,
  accent = 'green',
  reverse = false,
}: ServiceBlockProps) {
  const contentVariants = {
    hidden: {opacity: 0, x: reverse ? 30 : -30},
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  const imageVariants = {
    hidden: {opacity: 0, x: reverse ? -30 : 30},
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.15,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  const contentSide = (
    <motion.div
      className={styles.contentCol}
      variants={contentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, margin: '-10%'}}
    >
      {/* <div className={styles.numberBadge} style={{color: accentColors[accent]}}>
        {number}
      </div> */}
      <span className="eyebrow">{title}</span>
      <h2 className={styles.title}>{eyebrow}</h2>
      <p className={styles.description}>{description}</p>
      {/* <p className={styles.body}>{body}</p> */}

      {/* Benefits List */}
      <ul className={styles.benefitsList}>
        {benefits.map((benefit, i) => (
          <li key={i} className={styles.benefitItem}>
            <div className={styles.benefitDot} style={{backgroundColor: accentColors[accent]}} />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <div className={styles.ctaWrapper}>
        <Button href={href} variant="secondary">
          {cta}
        </Button>
      </div>
    </motion.div>
  );

  const imageSide = (
    <motion.div
      className={styles.imageCol}
      variants={imageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, margin: '-10%'}}
    >
      <div className={styles.imageFrame}>
        <div className={styles.imageWatermark}>
          <BrandStar fillColor={accentColors[accent]} />
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className={`section ${styles.wrapper}`}>
      <div className={`container ${styles.grid} ${reverse ? styles.gridReverse : ''}`}>
        {contentSide}
        {imageSide}
      </div>
    </section>
  );
}
