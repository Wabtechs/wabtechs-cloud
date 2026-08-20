import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '../lib/utils';

/**
 * Libellé accessible (Radix). À utiliser avec les champs de formulaire.
 */
export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, ...props },
  ref,
) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  );
});
