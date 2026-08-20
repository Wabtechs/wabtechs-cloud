import * as React from 'react';
import { cn } from '../lib/utils';
import { Icon } from '@wabtechs/icons';
import type { IconName } from '@wabtechs/icons';

export interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  description?: string;
  icon?: IconName;
  trend?: {
    value: number;
    label?: string;
  };
}

export const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  function StatsCard({ title, value, description, icon, trend, className, ...props }, ref) {
    const trendPositive = trend && trend.value >= 0;

    return (
      <div
        ref={ref}
        className={cn('rounded-lg border border-border bg-card p-6 shadow-sm', className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon ? <Icon name={icon} size={16} className="text-muted-foreground" /> : null}
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        </div>
        {description || trend ? (
          <div className="mt-2 flex items-center gap-2">
            {trend ? (
              <span
                className={cn(
                  'inline-flex items-center text-xs font-medium',
                  trendPositive ? 'text-success' : 'text-destructive',
                )}
              >
                <Icon
                  name={trendPositive ? 'trending-up' : 'trending-down'}
                  size={14}
                  className="mr-0.5"
                />
                {trendPositive ? '+' : ''}
                {trend.value}%
              </span>
            ) : null}
            {description ? (
              <p className="text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  },
);
