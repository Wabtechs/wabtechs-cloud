'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Badge } from '@wabtechs/ui/badge';
import { ShieldAlert, CheckCircle, Info, AlertTriangle } from '@wabtechs/icons';
import { cn, formatRelativeTime } from '@/lib/utils';
import { useSecurityEvents } from '@/hooks';
import { Skeleton } from '@wabtechs/ui/skeleton';

function getEventIcon(type: string) {
  const config: Record<string, { icon: typeof Info; color: string }> = {
    critical: { icon: AlertTriangle, color: 'text-red-600' },
    warning: { icon: ShieldAlert, color: 'text-yellow-600' },
    info: { icon: Info, color: 'text-blue-600' },
    success: { icon: CheckCircle, color: 'text-green-600' },
  };
  return config[type] || config.info;
}

function getTypeBadge(type: string) {
  const config: Record<string, { label: string; className: string }> = {
    critical: {
      label: 'Critical',
      className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    },
    warning: {
      label: 'Warning',
      className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    info: {
      label: 'Info',
      className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    },
  };
  return config[type] || config.info;
}

export function SecurityEvents() {
  const { data: response, isLoading } = useSecurityEvents();
  const events = response?.data || [];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-medium mb-1">No security events</h3>
            <p className="text-sm text-muted-foreground">
              Your account security looks good. No unusual activity detected.
            </p>
          </CardContent>
        </Card>
      ) : (
        events.map((event) => {
          const { icon: Icon, color } = getEventIcon(event.type);
          const badge = getTypeBadge(event.type);
          return (
            <Card key={event.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Icon className={cn('h-4 w-4', color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{event.action}</p>
                      <Badge variant="secondary" className={cn('text-xs', badge.className)}>
                        {badge.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.details}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{event.ip}</span>
                      <span>{event.location || 'Unknown location'}</span>
                      <span>{formatRelativeTime(event.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
