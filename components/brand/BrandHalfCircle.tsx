import React from 'react';

export function BrandHalfCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M50 0 C22.3858 0 0 22.3858 0 50 C0 77.6142 22.3858 100 50 100" fill="var(--color-brand-cream)" />
      <path d="M50 0 C77.6142 0 100 22.3858 100 50 C100 77.6142 77.6142 100 50 100" fill="var(--color-brand-red)" />
    </svg>
  );
}
