import React from 'react';

interface ShapeProps extends React.SVGProps<SVGSVGElement> {
  fillColor?: string;
}

export function BrandStar({ fillColor = "var(--color-brand-green)", ...props }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M50 0C50 27.6142 72.3858 50 100 50C72.3858 50 50 72.3858 50 100C50 72.3858 27.6142 50 0 50C27.6142 50 50 27.6142 50 0Z"
        fill={fillColor}
      />
    </svg>
  );
}
