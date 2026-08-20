import * as React from 'react';
import { Button, type ButtonProps } from './button';

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  /** Libellé accessible (requis — l'icône seule n'est pas accessible). */
  label: string;
  /** Icône (ou contenu alternatif). */
  icon?: React.ReactNode;
}

/**
 * Bouton icône avec `aria-label` obligatoire.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, children, ...props },
  ref,
) {
  return (
    <Button ref={ref} aria-label={label} {...props}>
      {icon ?? children}
    </Button>
  );
});
