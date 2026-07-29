'use client';

import React from 'react';
import styles from './TrustBar.module.css';
import Image from 'next/image';
import {useTranslations} from 'next-intl';


const logoPath = (file: string) =>
  `/images/sponsers-svg-logo/${encodeURIComponent(file)}`;

const CLIENT_LOGOS = [
  { file: 'Ministry-of-Hajj.svg', alt: 'Ministry of Hajj' },
  { file: 'McDonalds-logo.svg', alt: "McDonald's" },
  { file: 'Sarhad-Logo.svg', alt: 'Sarhad' },
  { file: 'Sumbulah-Group-Logo.svg', alt: 'Sunbulah Group' },
  { file: 'alkabeer-logo.svg', alt: 'Al Kabeer' },
  { file: 'anjum-logo.svg', alt: 'Anjum' },
  { file: 'ethraa-alkhair-logo.svg', alt: 'Ethraa Alkhair' },
  { file: 'manaf-logo.svg', alt: 'Manaf' },
  { file: 'Sinad-City-Logo.svg', alt: 'Sinad City' },
  { file: 'Zaitoon-Logo.svg', alt: 'Zaitoon' },
  { file: 'ashraqat-logo.svg', alt: 'Ashraqat' },
  { file: 'binyan-academy-logo.svg', alt: 'Binyan Academy' },
  { file: 'ethraa-aljood-logo.svg', alt: 'Ethraa Aljood' },
  { file: 'jab-cookies.svg', alt: 'Jab Cookies' },
  { file: 'Tadco-Logo.svg', alt: 'Tadco' },
] as const;


export default function TrustBar() {
  const t = useTranslations('HomePage');
  
  return (
    <section className={styles.trustBar}>
      <h3 className={styles.introText}>{t('trustBar')}</h3>
      <div className={styles.scrollContainer}>
        <div className={styles.marquee}>
          {CLIENT_LOGOS.map((client, idx) => (
            <div key={idx} className={styles.clientItem}>
              <Image
                src={logoPath(client.file)}
                alt={client.alt}
                width={200}
                height={80}
                className={styles.clientLogo}
              />
            </div>
          ))}
          {/* Duplicate for seamless scrolling loop */}
          {CLIENT_LOGOS.map((client, idx) => (
            <div key={`copy-${idx}`} className={styles.clientItem}>
              <Image
                src={logoPath(client.file)}
                alt={client.alt}
                width={200}
                height={80}
                className={styles.clientLogo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
