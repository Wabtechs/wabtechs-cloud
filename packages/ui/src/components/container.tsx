import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../lib/utils';

const containerSizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1440px]',
  full: 'max-w-full',
} as const;

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof containerSizeClasses;
  asChild?: boolean;
}

/**
 * Conteneur — largeur maximale + marges latérales responsives.
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { className, size = 'lg', asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      ref={ref}
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', containerSizeClasses[size], className)}
      {...props}
    />
  );
});
