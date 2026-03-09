import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import styles from './AboutSnapshot.module.css';

export default function AboutSnapshot() {
  const t = useTranslations('About');

  return (
    <section className={`section ${styles.about}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
          <Link href="/about" className={styles.link}>
            {t('cta')} <span>→</span>
          </Link>
        </div>
        <div className={styles.pillars}>
          <div className={styles.pillar}>
            <h3>01</h3>
            <p>{t('pillars.dev')}</p>
          </div>
          <div className={styles.pillar}>
            <h3>02</h3>
            <p>{t('pillars.safety')}</p>
          </div>
          <div className={styles.pillar}>
            <h3>03</h3>
            <p>{t('pillars.training')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
