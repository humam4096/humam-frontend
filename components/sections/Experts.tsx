import {useTranslations} from 'next-intl';
import styles from './Experts.module.css';

import {Link} from '@/i18n/routing';

export default function Experts() {
  const t = useTranslations('Experts');
  const expertsList = ['atef', 'enas', 'alaa'];

  return (
    <section className={`section ${styles.wrapper}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2>{t('title')}</h2>
        </div>
        
        <div className={styles.grid}>
          {expertsList.map((key) => (
            <Link href={`/team/${key}`} key={key} className={`card ${styles.expertCard}`} aria-label={`View ${t(`list.${key}.name`)} profile`}>
              <div className={styles.imagePlaceholder}>
                {/* Real images will go here, placeholders for now */}
              </div>
              <div className={styles.info}>
                <h3>{t(`list.${key}.name`)}</h3>
                <p className={styles.role}>{t(`list.${key}.role`)}</p>
                <div className={styles.overlay}>
                  <p>{t(`list.${key}.bio`)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
