'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import styles from './ServicesPhilosophy.module.css';

export default function ServicesPhilosophy() {
  const t = useTranslations('ServicesPage');

  return (
    <section className={`section ${styles.wrapper}`}>
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.left}
          initial={{opacity: 0, x: -30}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true, margin: '-10%'}}
          transition={{duration: 0.8, ease: [0.25, 1, 0.5, 1]}}
        >
          <span className="eyebrow">{t('philosophy.eyebrow')}</span>
          <h2 className={styles.heading}>{t('philosophy.heading')}</h2>
          <div className={styles.accentLine}></div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-10%'}}
          transition={{duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1]}}
        >
          <p className={styles.paragraph}>{t('philosophy.p1')}</p>
          <p className={styles.paragraph}>{t('philosophy.p2')}</p>
          <p className={styles.paragraph}>{t('philosophy.p3')}</p>
        </motion.div>
      </div>
    </section>
  );
}
