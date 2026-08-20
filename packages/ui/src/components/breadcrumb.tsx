import * as React from 'react';
import { cn } from '../lib/utils';
import { Icon } from '@wabtechs/icons';

export interface BreadcrumbProps extends React.HTMLAttributes<nav> {
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb({ separator = '/', className, ...props }, ref) {
    return (
      <nav ref={ref} aria-label="Fil d'Ariane" className={cn('flex items-center', className)} {...props}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">{props.children}</ol>
      </nav>
    );
  },
);

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  isCurrent?: boolean;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, isCurrent = false, ...props }, ref) {
    return (
      <li
        ref={ref}
        className={cn('inline-flex items-center gap-1.5', className)}
        aria-current={isCurrent ? 'page' : undefined}
        {...props}
      />
    );
  },
);

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  function BreadcrumbLink({ className, ...props }, ref) {
    return (
      <a
        ref={ref}
        className={cn('transition-colors hover:text-foreground', className)}
        {...props}
      />
    );
  },
);

export const BreadcrumbSeparator = ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span role="presentation" aria-hidden="true" className={cn('text-muted-foreground', className)} {...props}>
    {children ?? <Icon name="chevron-right" size={12} />}
  </span>
);

export const BreadcrumbEllipsis = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex size-9 items-center justify-center', className)}
    {...props}
  >
    <Icon name="more-horizontal" size={16} />
    <span className="sr-only">Plus</span>
  </span>
);
