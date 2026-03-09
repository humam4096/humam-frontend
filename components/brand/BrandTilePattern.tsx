import React from 'react';

/**
 * Checkerboard tile pattern: alternating cells of
 * - Green background with white 4-pointed star (negative space)
 * - Burgundy background with mustard 4-petal flower
 */
export function BrandTilePattern(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}
    >
      {/* Row 1: Green + white star */}
      <rect x="0" y="0" width="60" height="60" fill="var(--color-brand-green)" />
      <path
        d="M30 5C30 19 41 30 55 30C41 30 30 41 30 55C30 41 19 30 5 30C19 30 30 19 30 5Z"
        fill="white"
      />

      {/* Row 1 col 2: Burgundy + mustard petals */}
      <rect x="60" y="0" width="60" height="60" fill="var(--color-brand-red)" />
      <ellipse cx="90" cy="10" rx="12" ry="20" fill="var(--color-brand-mustard)" />
      <ellipse cx="90" cy="50" rx="12" ry="20" fill="var(--color-brand-mustard)" />
      <ellipse cx="70" cy="30" rx="20" ry="12" fill="var(--color-brand-mustard)" />
      <ellipse cx="110" cy="30" rx="20" ry="12" fill="var(--color-brand-mustard)" />

      {/* Row 2: Burgundy + mustard petals */}
      <rect x="0" y="60" width="60" height="60" fill="var(--color-brand-red)" />
      <ellipse cx="30" cy="70" rx="12" ry="20" fill="var(--color-brand-mustard)" />
      <ellipse cx="30" cy="110" rx="12" ry="20" fill="var(--color-brand-mustard)" />
      <ellipse cx="10" cy="90" rx="20" ry="12" fill="var(--color-brand-mustard)" />
      <ellipse cx="50" cy="90" rx="20" ry="12" fill="var(--color-brand-mustard)" />

      {/* Row 2 col 2: Green + white star */}
      <rect x="60" y="60" width="60" height="60" fill="var(--color-brand-green)" />
      <path
        d="M90 65C90 79 101 90 115 90C101 90 90 101 90 115C90 101 79 90 65 90C79 90 90 79 90 65Z"
        fill="white"
      />

      {/* Row 3: Green + white star */}
      <rect x="0" y="120" width="60" height="60" fill="var(--color-brand-green)" />
      <path
        d="M30 125C30 139 41 150 55 150C41 150 30 161 30 175C30 161 19 150 5 150C19 150 30 139 30 125Z"
        fill="white"
      />

      {/* Row 3 col 2: Burgundy + mustard petals */}
      <rect x="60" y="120" width="60" height="60" fill="var(--color-brand-red)" />
      <ellipse cx="90" cy="130" rx="12" ry="20" fill="var(--color-brand-mustard)" />
      <ellipse cx="90" cy="170" rx="12" ry="20" fill="var(--color-brand-mustard)" />
      <ellipse cx="70" cy="150" rx="20" ry="12" fill="var(--color-brand-mustard)" />
      <ellipse cx="110" cy="150" rx="20" ry="12" fill="var(--color-brand-mustard)" />

      {/* Row 4: Burgundy + mustard petals */}
      <rect x="0" y="180" width="60" height="60" fill="var(--color-brand-red)" />
      <ellipse cx="30" cy="190" rx="12" ry="20" fill="var(--color-brand-mustard)" />
      <ellipse cx="30" cy="230" rx="12" ry="20" fill="var(--color-brand-mustard)" />
      <ellipse cx="10" cy="210" rx="20" ry="12" fill="var(--color-brand-mustard)" />
      <ellipse cx="50" cy="210" rx="20" ry="12" fill="var(--color-brand-mustard)" />

      {/* Row 4 col 2: Green + white star */}
      <rect x="60" y="180" width="60" height="60" fill="var(--color-brand-green)" />
      <path
        d="M90 185C90 199 101 210 115 210C101 210 90 221 90 235C90 221 79 210 65 210C79 210 90 199 90 185Z"
        fill="white"
      />

      {/* Row 5: Green + white star */}
      <rect x="0" y="240" width="60" height="60" fill="var(--color-brand-green)" />
      <path
        d="M30 245C30 259 41 270 55 270C41 270 30 281 30 295C30 281 19 270 5 270C19 270 30 259 30 245Z"
        fill="white"
      />

      {/* Row 5 col 2: Burgundy + mustard petals */}
      <rect x="60" y="240" width="60" height="60" fill="var(--color-brand-red)" />
      <ellipse cx="90" cy="250" rx="12" ry="20" fill="var(--color-brand-mustard)" />
      <ellipse cx="90" cy="290" rx="12" ry="20" fill="var(--color-brand-mustard)" />
      <ellipse cx="70" cy="270" rx="20" ry="12" fill="var(--color-brand-mustard)" />
      <ellipse cx="110" cy="270" rx="20" ry="12" fill="var(--color-brand-mustard)" />

      {/* Row 6: Burgundy + mustard petals */}
      <rect x="0" y="300" width="60" height="60" fill="var(--color-brand-red)" />
      <ellipse cx="30" cy="310" rx="12" ry="20" fill="var(--color-brand-mustard)" />
      <ellipse cx="30" cy="350" rx="12" ry="20" fill="var(--color-brand-mustard)" />
      <ellipse cx="10" cy="330" rx="20" ry="12" fill="var(--color-brand-mustard)" />
      <ellipse cx="50" cy="330" rx="20" ry="12" fill="var(--color-brand-mustard)" />

      {/* Row 6 col 2: Green + white star */}
      <rect x="60" y="300" width="60" height="60" fill="var(--color-brand-green)" />
      <path
        d="M90 305C90 319 101 330 115 330C101 330 90 341 90 355C90 341 79 330 65 330C79 330 90 319 90 305Z"
        fill="white"
      />
    </svg>
  );
}
