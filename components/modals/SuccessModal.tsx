'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Modal from './Modal';
import styles from './SuccessModal.module.css';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const t = useTranslations('ContactPage');

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="500px">
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/brand/Humam-Logo.svg"
            alt="Humam Logo"
            width={200}
            height={80}
            priority
          />
        </div>
        
        <div className={styles.checkmarkContainer}>
          <svg 
            className={styles.checkmark} 
            viewBox="0 0 52 52"
          >
            <circle 
              className={styles.checkmarkCircle} 
              cx="26" 
              cy="26" 
              r="25" 
              fill="none"
            />
            <path 
              className={styles.checkmarkCheck} 
              fill="none" 
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <h2 className={styles.title}>
          {t('modal.thankYou')}
        </h2>
        
        <p className={styles.message}>
          {t('modal.message')}
        </p>

        <button 
          className={styles.okButton} 
          onClick={onClose}
        >
          {t('modal.close')}
        </button>
      </div>
    </Modal>
  );
}
