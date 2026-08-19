'use client';

import styles from './Hero.module.css';
import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import Button from '../ui/Button';

export default function Hero() {
  const t = useTranslations('HomePage');

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {opacity: 0, y: 20},
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
    <section className={styles.hero}>
      <div className={styles.heroWrapper}>
        {/* Background Masked Area */}
        <div className={styles.background}>
  
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.content}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <motion.div variants={itemVariants} className={styles.badge}>
              {t('badge', {default: 'Powered by Excellence'})}
            </motion.div>
            <motion.h1 variants={itemVariants} className={styles.title}>
              {t('title')}
            </motion.h1>
            <motion.p variants={itemVariants} className={styles.description}>
              {t('description')}
            </motion.p>

          </motion.div>
        </div>
        <div className={styles.buttons}>
          <motion.div variants={itemVariants} className={styles.actions}>
            <Button href="/contact" variant="primary">
              {t('ctaPrimary', {default: 'Discuss Your Project'})}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
