'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import styles from './Values.module.css';

// const valueKeys = ['trust', 'partnership', 'quality', 'responsibility', 'excellence'] as const;

export default function Values() {
  const t = useTranslations('AboutPage');

  // const containerVariants = {
  //   hidden: {opacity: 0},
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //     },
  //   },
  // };

  // const cardVariants = {
  //   hidden: {opacity: 0, y: 25},
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.6,
  //       ease: [0.25, 1, 0.5, 1] as const,
  //     },
  //   },
  // };

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
          <span className="eyebrow">{t('values.eyebrow')}</span>
          <h2 className={styles.title}>{t('values.title')}</h2>
          <p className={styles.subtitle}>{t('values.subtitle')}</p>
        </motion.div>

        {/* <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-5%'}}
        >
          {valueKeys.map((key) => (
            <motion.div key={key} variants={cardVariants} className={styles.valueCard}>
              <h3 className={styles.valueTitle}>{t(`values.list.${key}.title`)}</h3>
              <p className={styles.valueDesc}>{t(`values.list.${key}.description`)}</p>
            </motion.div>
          ))}
        </motion.div> */}

        <motion.div
          className={styles.bottom}
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-10%'}}
          transition={{duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1]}}
        >
          <span className={styles.taglineEyebrow}>{t('values.taglineEyebrow')}</span>
          <h3 className={styles.tagline}>{t('values.tagline')}</h3>
        </motion.div>
      </div>
    </section>
  );
}
