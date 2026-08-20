import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Icon } from '@wabtechs/icons';
import { cn } from '../lib/utils';

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-5 [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-foreground',
        info: 'border-info/30 bg-info/10 text-foreground [&>svg]:text-info',
        success: 'border-success/30 bg-success/10 text-foreground [&>svg]:text-success',
        warning: 'border-warning/30 bg-warning/10 text-foreground [&>svg]:text-warning',
        destructive: 'border-destructive/30 bg-destructive/10 text-foreground [&>svg]:text-destructive',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

const defaultAlertIcons = {
  default: 'circle-alert',
  info: 'info',
  success: 'circle-check',
  warning: 'triangle-alert',
  destructive: 'circle-x',
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Icône personnalisée (remplace l'icône par défaut du variant). */
  icon?: React.ReactNode;
  /** Titre de l'alerte. */
  title?: React.ReactNode;
  /** Description. */
  description?: React.ReactNode;
  /** Action(s) contextuelle(s). */
  action?: React.ReactNode;
  /** Icône décorative : `false` pour masquer. */
  showIcon?: boolean;
}

/**
 * Alerte — retour d'information contextuel.
 *
 * Accessibilité : `role="alert"` (annonce assertive), icône décorative
 * (`aria-hidden`), titre + description lisibles par lecteur d'écran.
 */
export function Alert({
  className,
  variant,
  icon,
  title,
  description,
  action,
  showIcon = true,
  ...props
}: AlertProps): React.JSX.Element {
  const resolvedVariant: NonNullable<NonNullable<AlertProps['variant']>> = variant ?? 'default';
  const resolvedIcon = icon ?? <Icon name={defaultAlertIcons[resolvedVariant]} />;

  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {showIcon ? resolvedIcon : null}
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {description ? <AlertDescription>{description}</AlertDescription> : null}
      {action ? <div className="mt-2 pl-7">{action}</div> : null}
    </div>
  );
}

export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export type AlertDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

export const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(function AlertTitle({ className, ...props }, ref) {
  return (
    <h5 ref={ref} className={cn('mb-1 font-semibold leading-none tracking-tight', className)} {...props} />
  );
});

export const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
  function AlertDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('text-sm leading-relaxed text-muted-foreground [&_p]:leading-relaxed', className)}
      {...props}
    />
  );
});
