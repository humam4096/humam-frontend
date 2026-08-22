'use client';

import {Modal} from '@/components/ui/Modal';
import {StatusBadge} from '@/components/ui/StatusBadge';
import type {Contact} from '@/db/schema';
import styles from './MessageDetailModal.module.css';

interface MessageDetailModalProps {
  message: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MessageDetailModal({message, isOpen, onClose}: MessageDetailModalProps) {
  if (!message) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const {date, time} = formatDate(message.createdAt);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Message Details" size="large">
      <div className={styles.container}>
        {/* Header Info */}
        <div className={styles.header}>
          <div className={styles.headerItem}>
            <span className={styles.label}>Status</span>
            <StatusBadge status={message.status as 'new' | 'read' | 'replied'} />
          </div>
          <div className={styles.headerItem}>
            <span className={styles.label}>Received</span>
            <div>
              <div className={styles.dateText}>{date}</div>
              <div className={styles.timeText}>{time}</div>
            </div>
          </div>
          <div className={styles.headerItem}>
            <span className={styles.label}>ID</span>
            <span className={styles.idText}>#{message.id}</span>
          </div>
        </div>

        {/* Contact Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Contact Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Name</span>
              <span className={styles.fieldValue}>{message.name}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Email</span>
              <a href={`mailto:${message.email}`} className={styles.emailLink}>
                {message.email}
              </a>
            </div>
            {message.company && (
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Company</span>
                <span className={styles.fieldValue}>{message.company}</span>
              </div>
            )}
            {message.industry && (
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Industry</span>
                <span className={styles.fieldValue}>{message.industry}</span>
              </div>
            )}
            {message.service && (
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Service</span>
                <span className={styles.fieldValue}>{message.service}</span>
              </div>
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Message</h3>
          <div className={styles.messageContent}>{message.message}</div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={() => window.open(`mailto:${message.email}`, '_blank')}>
            Reply via Email
          </button>
          <button className={styles.secondaryButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
