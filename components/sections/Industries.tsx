import {useTranslations} from 'next-intl';
import styles from './Industries.module.css';

export default function Industries() {
  const t = useTranslations('Industries');
  const industriesList = ['rest', 'bakery', 'factory', 'hotel', 'hajj', 'healthy'];

  return (
    <section className={`section ${styles.wrapper}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow" style={{color: 'var(--color-light-cream)'}}>{t('eyebrow')}</span>
          <h2>{t('title')}</h2>
        </div>
        <div className={styles.grid}>
          {industriesList.map((key) => (
            <div key={key} className={styles.card}>
              <h3>{t(`list.${key}`)}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
