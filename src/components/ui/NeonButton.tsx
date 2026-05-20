import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  glow = true,
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-300 rounded-full border disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-offset-2';

  const variantClasses = {
    primary: 'border-transparent bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground shadow-[0_14px_30px_hsl(217_91%_60%/0.22)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_hsl(217_91%_60%/0.3)]',
    secondary: 'border-border/70 bg-card/80 text-foreground backdrop-blur-md hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5',
    outline: 'border border-primary/30 bg-transparent text-primary hover:-translate-y-0.5 hover:bg-primary/10 hover:border-primary/50',
    ghost: 'border-transparent bg-transparent text-foreground hover:bg-muted/70 hover:text-foreground',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-sm md:text-base',
    lg: 'px-7 py-4 text-base md:text-lg',
  };

  const glowClasses = glow && variant === 'primary' 
    ? 'shadow-[0_0_20px_hsl(187_100%_50%/0.28)] hover:shadow-[0_0_30px_hsl(187_100%_50%/0.45)]' 
    : '';

  return (
    <motion.button
      type={type}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glowClasses,
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};
