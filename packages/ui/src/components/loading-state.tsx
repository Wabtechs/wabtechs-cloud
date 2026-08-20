import * as React from 'react';
import { cn } from '../lib/utils';
import { Spinner } from './spinner';

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({
  label = 'Chargement…',
  size = 'md',
  className,
  ...props
}: LoadingStateProps): React.JSX.Element {
  const spinnerSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-14 text-center',
        className,
      )}
      role="status"
      aria-live="polite"
      {...props}
    >
      <Spinner size={spinnerSize} label={label} />
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
