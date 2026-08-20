'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { Badge } from '@wabtechs/ui/badge';
import { AlertCircle, Check, Info, Bell } from '@wabtechs/icons';
import { formatRelativeTime } from '@/lib/utils';
import { cn } from '@wabtechs/utils';
import { useNotifications, useMarkNotificationRead } from '@/hooks';
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

export function NotificationsList() {
  const { data: response, isLoading } = useNotifications();
  const markRead = useMarkNotificationRead();
  const notifications = response?.data || [];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
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
      {notifications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-1">No notifications</h3>
            <p className="text-sm text-muted-foreground">You&apos;re all caught up!</p>
          </CardContent>
        </Card>
      ) : (
        notifications.map((notification) => {
          const { icon: Icon, color } = getNotificationIcon(notification.type);
          return (
            <Card
              key={notification.id}
              className={cn(
                'transition-colors',
                !notification.read && 'bg-accent/50 border-primary/20'
              )}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
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
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => markRead.mutate(notification.id)}
                      disabled={markRead.isPending}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
