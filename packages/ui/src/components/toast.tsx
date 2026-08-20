import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Icon } from '@wabtechs/icons';
import { Button } from './button';

const toastVariants = cva(
  'pointer-events-auto relative flex w-full items-center gap-3 rounded-lg border p-4 shadow-lg',
  {
    variants: {
      variant: {
        default: 'border-border bg-background text-foreground',
        success: 'border-success/30 bg-success/10 text-foreground',
        destructive: 'border-destructive/30 bg-destructive/10 text-foreground',
        warning: 'border-warning/30 bg-warning/10 text-foreground',
        info: 'border-info/30 bg-info/10 text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

const toastIcons = {
  default: 'info',
  success: 'check-circle',
  destructive: 'x-circle',
  warning: 'alert-triangle',
  info: 'info',
} as const;

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  showIcon?: boolean;
}

export function Toast({
  variant = 'default',
  title,
  description,
  action,
  onClose,
  showIcon = true,
  className,
  ...props
}: ToastProps): React.JSX.Element {
  const resolvedVariant = variant ?? 'default';

  return (
    <div role="status" aria-live="polite" className={cn(toastVariants({ variant }), className)} {...props}>
      {showIcon ? (
        <Icon name={toastIcons[resolvedVariant]} size={16} className="shrink-0" />
      ) : null}
      <div className="flex-1">
        {title ? <p className="text-sm font-semibold">{title}</p> : null}
        {description ? <p className="mt-0.5 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
      {onClose ? (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 hover:text-foreground"
          aria-label="Fermer"
        >
          <Icon name="x" size={14} />
        </button>
      ) : null}
    </div>
  );
}
