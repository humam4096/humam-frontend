'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import Button from '@/components/ui/Button';
import {BrandStar} from '@/components/brand/BrandStar';
import {BrandTilePattern} from '@/components/brand/BrandTilePattern';
import {BrandHalfCircle} from '@/components/brand/BrandHalfCircle';
import styles from './NotFoundHero.module.css';

export default function NotFoundHero() {
  const t = useTranslations('NotFound');

  return (
    <section className={`section ${styles.wrapper}`}>
      {/* Background Brand Pattern */}
      <div className={styles.backgroundPattern}>
        <BrandTilePattern />
      </div>

      <div className="container">
        <div className={styles.content}>
          {/* Abstract Floating Shapes for visual interest */}
          <div className={styles.floatingShapes}>
            <motion.div 
              className={styles.shapeStar}
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 50, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <BrandStar fillColor="var(--color-brand-mustard)" />
            </motion.div>
            
            <motion.div 
              className={styles.shapeCircle}
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <BrandHalfCircle />
            </motion.div>
          </div>

          <motion.div
            className={styles.textContent}
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: [0.25, 1, 0.5, 1]}}
          >
            <span className={styles.errorNumber}>404</span>
            <span className="eyebrow">{t('badge')}</span>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.description}>{t('description')}</p>

            <div className={styles.actions}>
              <Button href="/" variant="primary">
                {t('buttons.home')}
              </Button>
              <Button href="/services" variant="secondary">
                {t('buttons.services')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
