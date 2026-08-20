import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'border border-success/20 bg-success/10 text-success',
        warning: 'border border-warning/20 bg-warning/10 text-warning',
        info: 'border border-info/20 bg-info/10 text-info',
        outline: 'border border-border text-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge — étiquette courte (statut, catégorie, compteur).
 */
export function Badge({ className, variant, size, ...props }: BadgeProps): React.JSX.Element {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
