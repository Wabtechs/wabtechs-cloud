import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../lib/utils';

const gridColsClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
} as const;

/** Classes responsives (littérales pour la compilation Tailwind). */
const responsiveColsClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  12: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12',
} as const;

const gridGapClasses = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
} as const;

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: keyof typeof gridColsClasses;
  gap?: keyof typeof gridGapClasses;
  /** Passe en colonne unique sur mobile (`grid-cols-1`). */
  responsive?: boolean;
  asChild?: boolean;
}

/**
 * Grille CSS. L'espacement suit l'unité de densité UI.
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(
  {
    className,
    cols = 1,
    gap = 4,
    responsive = false,
    asChild = false,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  const colsClasses = responsive
    ? (responsiveColsClasses[cols as keyof typeof responsiveColsClasses] ??
      gridColsClasses[cols])
    : gridColsClasses[cols];

  return (
    <Comp
      ref={ref}
      className={cn('grid', colsClasses, gridGapClasses[gap], className)}
      {...props}
    />
  );
});
