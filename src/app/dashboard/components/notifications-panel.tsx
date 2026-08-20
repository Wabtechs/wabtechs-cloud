'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { Bell, Check, AlertCircle, Info, ExternalLink } from '@wabtechs/icons';
import Link from 'next/link';
import { formatRelativeTime, cn } from '@/lib/utils';
import { useDashboardNotifications } from '@/hooks';
import { Skeleton } from '@wabtechs/ui/skeleton';

function getNotificationIcon(type: string) {
  const icons: Record<string, { icon: typeof Info; color: string }> = {
    info: { icon: Info, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    warning: { icon: AlertCircle, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
    error: { icon: AlertCircle, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
    success: { icon: Check, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  };
  return icons[type] || icons.info;
}

export function NotificationsPanel() {
  const { data: notifications, isLoading } = useDashboardNotifications();
  const items = notifications || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Notifications</CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link href="/notifications">View all <ExternalLink className="ml-1 h-3 w-3" /></Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.slice(0, 4).map((notification) => {
            const { icon: Icon, color } = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg border transition-colors',
                  !notification.read && 'bg-accent/50 border-primary/20'
                )}
              >
                <div className={cn('p-2 rounded-lg flex-shrink-0 mt-0.5', color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn('font-medium text-sm', !notification.read && 'font-semibold')}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground flex-shrink-0">
                      {formatRelativeTime(notification.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  {notification.actionUrl && notification.actionLabel && (
                    <Button asChild variant="ghost" size="sm" className="mt-2">
                      <Link href={notification.actionUrl}>{notification.actionLabel}</Link>
                    </Button>
                  )}
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                )}
              </div>
            );
          })}
          {items.length > 4 && (
            <Link
              href="/notifications"
              className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span className="text-sm font-medium">View all notifications</span>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
