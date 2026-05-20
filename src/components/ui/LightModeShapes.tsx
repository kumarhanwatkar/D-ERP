import React from 'react';
import { cn } from '@/lib/utils';

type ShapesVariant = 'public' | 'dashboard';

interface LightModeShapesProps {
  variant?: ShapesVariant;
  className?: string;
}

const variantClasses: Record<ShapesVariant, string[]> = {
  public: [
    'shape-blob shape-blob-primary -top-24 -left-20 h-80 w-80',
    'shape-blob shape-blob-secondary top-1/3 -right-24 h-72 w-72',
    'shape-blob shape-blob-muted bottom-12 left-1/4 h-64 w-64',
  ],
  dashboard: [
    'shape-blob shape-blob-primary -top-20 -right-24 h-72 w-72',
    'shape-blob shape-blob-secondary top-40 -left-28 h-64 w-64',
    'shape-blob shape-blob-muted bottom-16 right-1/4 h-56 w-56',
  ],
};

export const LightModeShapes: React.FC<LightModeShapesProps> = ({
  variant = 'public',
  className,
}) => {
  return (
    <div className={cn('light-mode-shapes pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {variantClasses[variant].map((blobClassName, index) => (
        <span key={index} className={blobClassName} />
      ))}
    </div>
  );
};
