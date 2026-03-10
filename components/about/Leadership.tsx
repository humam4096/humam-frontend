'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {BrandStar} from '@/components/brand/BrandStar';
import {BrandHalfCircle} from '@/components/brand/BrandHalfCircle';
import {BrandClover} from '@/components/brand/BrandClover';
import {BrandTilePattern} from '@/components/brand/BrandTilePattern';
import {Link} from '@/i18n/routing';
import styles from './Leadership.module.css';
import Image from 'next/image';

const leaderKeys = ['atef', 'enas', 'alaa'] as const;

const leaderBrandShapes: Record<string, React.ReactNode> = {
  atef: <BrandStar fillColor="var(--color-brand-dark-olive)" />,
  enas: <BrandHalfCircle />,
  alaa: <BrandClover />,
};

const leaderImages: Record<string, string> = {
  atef: '/images/team/Atif.webp',
  enas: '/images/team/Enasu.webp',
  alaa: '/images/team/allaa.webp',
};

export default function Leadership() {
  const t = useTranslations('AboutPage');

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
      <div className={styles.sectionWatermark}>
        <BrandTilePattern />
      </div>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-10%'}}
          transition={{duration: 0.8, ease: [0.25, 1, 0.5, 1]}}
        >
          <span className="eyebrow">{t('leadership.eyebrow')}</span>
          <h2>{t('leadership.title')}</h2>
          <p className={styles.subtitle}>{t('leadership.subtitle')}</p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-5%'}}
        >
          {leaderKeys.map((key) => (
            <Link
              href={`/team/${key}`}
              key={key}
              style={{display: 'block'}}
              aria-label={`View ${t(`leadership.list.${key}.name`)} profile`}
            >
              <motion.div variants={cardVariants} className={`card ${styles.leaderCard}`}>
                <div className={styles.imagePlaceholder}>
                  {leaderImages[key] && (
                    <Image
                      src={leaderImages[key]}
                      alt={t(`leadership.list.${key}.name`)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 320px"
                      priority
                      className={styles.photo}
                    />
                  )}
                  <div className={styles.placeholderShape}>
                    {leaderBrandShapes[key]}
                  </div>
                  <div className={styles.imageInitial}>
                    {t(`leadership.list.${key}.name`).charAt(0)}
                  </div>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{t(`leadership.list.${key}.name`)}</h3>
                  <p className={styles.role}>{t(`leadership.list.${key}.role`)}</p>
                  {/* <p className={styles.bio}>{t(`leadership.list.${key}.bio`)}</p> */}
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
