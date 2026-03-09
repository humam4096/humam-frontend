'use client';

import React from 'react';
import {Link} from '@/i18n/routing';
import styles from './Button.module.css';
import {motion} from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export default function Button({href, variant = 'primary', className = '', children, ...props}: ButtonProps) {
  const combinedClassName = `${styles.btn} ${styles[variant]} ${className}`.trim();

  // The wrapper allows us to use whileHover and whileTap naturally on Next.js Links too
  if (href) {
    return (
      <Link href={href} className={styles.linkWrapper}>
        <motion.div
          className={combinedClassName}
          whileHover={{scale: 0.98}}
          whileTap={{scale: 0.95}}
          transition={{type: 'spring', stiffness: 400, damping: 25}}
        >
          {children}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      className={combinedClassName}
      whileHover={{scale: 0.98}}
      whileTap={{scale: 0.95}}
      transition={{type: 'spring', stiffness: 400, damping: 25}}
      {...props as any}
    >
      {children}
    </motion.button>
  );
}
