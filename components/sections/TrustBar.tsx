import React from 'react';
import styles from './TrustBar.module.css';

const CLIENTS = [
  'Ministry of Tourism',
  'Saudi Airlines Catering',
  'McDonald\'s',
  'Sunbulah Group',
  'Al Kabeer',
  'Lulu\'s',
  'Taifah Catering',
  'Anjum'
];

export default function TrustBar() {
  return (
    <section className={styles.trustBar}>
      <h3 className={styles.introText}>Trusted by industry leaders including</h3>
      <div className={styles.scrollContainer}>
        <div className={styles.marquee}>
          {CLIENTS.map((client, idx) => (
            <div key={idx} className={styles.clientItem}>
              <span className={styles.client}>{client}</span>
            </div>
          ))}
          {/* Duplicate for seamless scrolling loop */}
          {CLIENTS.map((client, idx) => (
            <div key={`copy-${idx}`} className={styles.clientItem}>
              <span className={styles.client}>{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
