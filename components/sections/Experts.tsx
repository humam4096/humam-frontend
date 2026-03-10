import {useTranslations} from 'next-intl';
import styles from './Experts.module.css';

import {Link} from '@/i18n/routing';
import Image from 'next/image';

export default function Experts() {
  const t = useTranslations('Experts');
  const expertsList = ['atef', 'enas', 'alaa'];
  const expertImages: Record<string, string> = {
    atef: '/images/team/Atif.webp',
    enas: '/images/team/Enasu.webp',
    alaa: '/images/team/allaa.webp',
  };

  return (
    <section className={`section ${styles.wrapper}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2>{t('title')}</h2>
        </div>
        
        <div className={styles.grid}>
          {expertsList.map((key) => {
            const imageSrc = expertImages[key] ?? '/images/team/team.jpeg';

            return (
              <Link
                href={`/team/${key}`}
                key={key}
                className={`card ${styles.expertCard}`}
                aria-label={`View ${t(`list.${key}.name`)} profile`}
              >
                <div className={styles.imagePlaceholder}>
                  <Image
                    src={imageSrc}
                    alt={t(`list.${key}.name`)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                    priority
                    className={`${styles.teamImage}`}
                  />
                </div>
              <div className={styles.info}>
                <h3>{t(`list.${key}.name`)}</h3>
                <p className={styles.role}>{t(`list.${key}.role`)}</p>
                <div className={styles.overlay}>
                  <p>{t(`list.${key}.bio`)}</p>
                </div>
              </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
