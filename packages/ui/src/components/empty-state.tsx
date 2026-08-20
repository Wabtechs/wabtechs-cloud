import * as React from 'react';
import { cn } from '../lib/utils';

const emptyStateSizeClasses = {
  sm: 'py-8',
  md: 'py-14',
  lg: 'py-20',
} as const;

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  size?: keyof typeof emptyStateSizeClasses;
}

/**
 * État vide élégant — message clair + action d'amorçage.
 *
 * @example
 * <EmptyState
 *   icon={<Icon name="package" size={24} />}
 *   title="Aucune commande"
 *   description="Les commandes apparaîtront ici."
 *   action={<Button>Créer une commande</Button>}
 * />
 */
export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
  size = 'md',
  ...props
}: EmptyStateProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-6 text-center',
        emptyStateSizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon ? (
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      ) : null}
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="mt-1.5 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
