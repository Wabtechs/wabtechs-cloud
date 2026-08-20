import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../lib/utils';

const stackGapClasses = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
} as const;

const stackItemsClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

const stackJustifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

export type StackGap = keyof typeof stackGapClasses;

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
  items?: keyof typeof stackItemsClasses;
  justify?: keyof typeof stackJustifyClasses;
  direction?: 'column' | 'row';
  asChild?: boolean;
}

/**
 * Stack — disposition flexible (colonne par défaut).
 * L'espacement suit l'unité de densité (`--wabtechs-spacing-unit`).
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    className,
    gap = 4,
    items = 'stretch',
    justify,
    direction = 'column',
    asChild = false,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      ref={ref}
      className={cn(
        'flex',
        direction === 'column' ? 'flex-col' : 'flex-row',
        stackGapClasses[gap],
        stackItemsClasses[items],
        justify ? stackJustifyClasses[justify] : undefined,
        className,
      )}
      {...props}
    />
  );
});

/**
 * Stack horizontal (`direction="row"`).
 */
export const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  function HStack(props, ref) {
    return <Stack ref={ref} direction="row" {...props} />;
  },
);
