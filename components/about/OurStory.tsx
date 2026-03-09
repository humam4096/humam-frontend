'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import styles from './OurStory.module.css';

export default function OurStory() {
  const t = useTranslations('AboutPage');

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
          <span className="eyebrow">{t('story.eyebrow')}</span>
          <h2 className={styles.heading}>{t('story.heading')}</h2>
          <div className={styles.accentLine}></div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-10%'}}
          transition={{duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1]}}
        >
          <p className={styles.paragraph}>{t('story.p1')}</p>
          <p className={styles.paragraph}>{t('story.p2')}</p>
          <p className={styles.paragraph}>{t('story.p3')}</p>
        </motion.div>
      </div>
    </section>
  );
}
