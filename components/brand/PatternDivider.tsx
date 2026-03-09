import styles from './PatternDivider.module.css';

type PatternDividerProps = {
  variant?: 'zigzag' | 'clover';
  flip?: boolean;
};

const patternMap = {
  zigzag: '/patterns/pattern-zigzag-strip.png',
  clover: '/patterns/pattern-clover-strip.png',
};

export default function PatternDivider({variant = 'zigzag', flip = false}: PatternDividerProps) {
  return (
    <div
      className={`${styles.divider} ${flip ? styles.flip : ''}`}
      style={{backgroundImage: `url(${patternMap[variant]})`}}
      aria-hidden="true"
    />
  );
}
