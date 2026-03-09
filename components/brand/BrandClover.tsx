import React from 'react';

export function BrandClover(props: React.SVGProps<SVGSVGElement>) {
  // Repeating elegant clover line matching image 2
  return (
    <svg viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" {...props}>
      <pattern id="clover-pattern" x="0" y="0" width="30" height="24" patternUnits="userSpaceOnUse">
        <rect y="0" width="30" height="1" fill="var(--color-brand-red)" />
        
        {/* Central shape block representing the intricate geometric clover */}
        <circle cx="15" cy="12" r="9" fill="var(--color-brand-mustard)" />
        <circle cx="15" cy="12" r="7" fill="var(--color-brand-cream)" />
        <circle cx="15" cy="12" r="5" fill="var(--color-brand-green)" />
        <path d="M10 12 L20 12 M15 7 L15 17" stroke="var(--color-brand-cream)" strokeWidth="1" />

        <rect y="23" width="30" height="1" fill="var(--color-brand-red)" />
      </pattern>
      <rect width="100%" height="24" fill="url(#clover-pattern)" />
    </svg>
  );
}
