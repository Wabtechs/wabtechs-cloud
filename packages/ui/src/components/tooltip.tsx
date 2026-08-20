import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../lib/utils';

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;
export type TooltipTriggerProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>;
export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent({ className, sideOffset = 4, ...props }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 overflow-hidden rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md wt-animate-fade-in wt-animate-zoom-in',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});

export interface SimpleTooltipProps {
  /** Contenu du tooltip. */
  content: React.ReactNode;
  /** Élément déclencheur. */
  children: React.ReactNode;
  /** Position par défaut. */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Délai d'affichage (ms). */
  delayDuration?: number;
}

/**
 * Tooltip accessible (Radix) — configurer `TooltipProvider` au niveau racine
 * pour un comportement global (delays, skip delay).
 *
 * @example
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger asChild><Button>...</Button></TooltipTrigger>
 *     <TooltipContent>Contenu</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 */
export function SimpleTooltip({
  content,
  children,
  side = 'top',
  delayDuration = 300,
}: SimpleTooltipProps): React.JSX.Element {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  );
}
