import * as React from 'react';
import { cn } from '../lib/utils';

const inputSizeClasses = {
  sm: 'h-8 px-2.5 text-xs',
  md: 'h-9 px-3 text-sm',
  lg: 'h-10 px-4 text-sm',
} as const;

const inputBaseClasses =
  'flex w-full rounded-md border border-input bg-background text-foreground shadow-sm transition-colors placeholder:text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Taille du contrôle (suit la densité UI). */
  size?: keyof typeof inputSizeClasses;
  /** Marque l'état d'erreur (`aria-invalid`). */
  error?: boolean;
}

/**
 * Champ de saisie.
 *
 * Accessibilité : compatible `label`, `aria-invalid` en erreur,
 * focus visible, contraste AA.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size = 'md', error, type = 'text', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(inputBaseClasses, inputSizeClasses[size], className)}
      {...(error ? { 'aria-invalid': true } : {})}
      {...props}
    />
  );
});
