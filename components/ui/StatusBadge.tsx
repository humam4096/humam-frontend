import styles from './StatusBadge.module.css';

type Status = 'new' | 'read' | 'replied';

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({status}: StatusBadgeProps) {
  return <span className={`${styles.badge} ${styles[status]}`}>{status}</span>;
}
