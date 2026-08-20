import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Spinner } from './spinner';

export const buttonVariants = cva(
  'inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        success: 'bg-success text-success-foreground shadow-sm hover:bg-success/90',
        warning: 'bg-warning text-warning-foreground shadow-sm hover:bg-warning/90',
      },
      size: {
        xs: 'h-7 rounded-md px-2.5 text-xs',
        sm: 'h-8 rounded-md px-3 text-sm',
        md: 'h-9 rounded-md px-4 text-sm',
        lg: 'h-10 rounded-md px-6 text-sm',
        xl: 'h-11 rounded-md px-8 text-base',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Rend le composant enfant comme racine (Slot). */
  asChild?: boolean;
  /** État de chargement : désactive le bouton et affiche un spinner. */
  loading?: boolean;
}

/**
 * Bouton — primitive d'action principale de Wabtechs UI.
 *
 * Accessibilité : focus visible, `aria-busy` en chargement, aucune action
 * au clavier si `disabled`. Compatible `asChild` (rendu en lien / router).
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    disabled,
    type,
    children,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      type={type ?? 'button'}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...(loading ? { 'aria-busy': true } : {})}
      {...props}
    >
      {loading ? <Spinner className="size-4" /> : null}
      {children}
    </Comp>
  );
});
