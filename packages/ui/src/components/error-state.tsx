import * as React from 'react';
import { cn } from '../lib/utils';
import { Icon } from '@wabtechs/icons';
import { Button } from './button';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function ErrorState({
  icon,
  title = 'Une erreur est survenue',
  description,
  action,
  className,
  ...props
}: ErrorStateProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-14 text-center',
        className,
      )}
      {...props}
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        {icon ?? <Icon name="alert-triangle" size={24} />}
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="mt-1.5 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
