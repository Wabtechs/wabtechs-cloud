import * as React from 'react';
import { cn } from '../lib/utils';

const spinnerSizeClasses = {
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-8 border-[3px]',
} as const;

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: keyof typeof spinnerSizeClasses;
  /** Libellé accessible (si absent, l'indicateur est décoratif). */
  label?: string;
}

/**
 * Indicateur de chargement rotatif.
 *
 * Accessibilité : avec `label`, le spinner annonce `role="status"` ;
 * sans label il est décoratif (`aria-hidden`).
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { className, size = 'md', label, ...props },
  ref,
) {
  const accessibilityProps = label
    ? ({ role: 'status', 'aria-label': label } as const)
    : ({ 'aria-hidden': true } as const);

  return (
    <span
      ref={ref}
      data-testid="spinner"
      className={cn(
        'inline-block animate-spin rounded-full border-current border-t-transparent',
        spinnerSizeClasses[size],
        className,
      )}
      {...accessibilityProps}
      {...props}
    />
  );
});
