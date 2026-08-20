import * as React from 'react';
import { cn } from '../lib/utils';

const cardClasses = 'rounded-lg border border-border bg-card text-card-foreground shadow-sm';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;
export type CardActionProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Carte — conteneur de surface premium (fond `card`, bordure, ombre).
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card({ className, ...props }, ref) {
    return <div ref={ref} className={cn(cardClasses, className)} {...props} />;
  },
);

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
      />
    );
  },
);

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle({ className, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cn('text-base font-semibold leading-none tracking-tight', className)}
        {...props}
      />
    );
  },
);

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />;
});

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
  },
);

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
    );
  },
);

/**
 * Zone d'actions en haut à droite de la carte.
 */
export const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(function CardAction({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex items-center gap-1', className)} {...props} />;
  },
);
