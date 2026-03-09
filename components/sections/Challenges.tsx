'use client';

import {useRef} from 'react';
import {useTranslations} from 'next-intl';
import styles from './Challenges.module.css';
import {motion, useScroll, useTransform} from 'framer-motion';

function ChallengeCard({title, desc}: {title: string; desc: string}) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track this specific card's position relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"]
  });

  // Highlight smoothly from 40% opacity to 100% when it reaches the center 20% of the screen.
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.35, 1, 1, 0.35]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.95, 1.05, 1.05, 0.95]);

  return (
    <motion.div
      ref={ref}
      className={`card ${styles.challengeCard}`}
      style={{ opacity, scale }}
    >
      <h3>{title}</h3>
      <p>{desc}</p>
    </motion.div>
  );
}

export default function Challenges() {
  const t = useTranslations('Challenges');
  const challengesList = ['quality', 'efficiency', 'growth', 'sustainability', 'reputation'];

  return (
    <section className={`section ${styles.wrapper}`}>
      <div className={`container ${styles.layout}`}>
        {/* Sticky Left Column */}
        <div className={styles.stickyCol}>
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>

        {/* Scrolling Right Column */}
        <div className={styles.scrollCol}>
          {challengesList.map((key) => (
            <ChallengeCard
              key={key}
              title={t(`list.${key}.title`)}
              desc={t(`list.${key}.desc`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
