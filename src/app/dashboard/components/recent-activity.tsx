'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { Clock, User, Box, CreditCard, Shield, ExternalLink } from '@wabtechs/icons';
import Link from 'next/link';
import { formatRelativeTime, cn } from '@/lib/utils';
import { useDashboardActivity } from '@/hooks';
import { Skeleton } from '@wabtechs/ui/skeleton';

interface Activity {
  id: string;
  type: 'user' | 'application' | 'license' | 'security' | 'organization';
  action: string;
  description: string;
  user: string;
  timestamp: string;
}

const fallbackActivities: Activity[] = [
  {
    id: '1',
    type: 'user',
    action: 'joined',
    description: 'Sarah Chen joined the organization',
    user: 'Sarah Chen',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: '2',
    type: 'application',
    action: 'installed',
    description: 'Installed Bilengi Pro for the team',
    user: 'Michael Torres',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '3',
    type: 'license',
    action: 'renewed',
    description: 'Renewed Dhayaro Enterprise license',
    user: 'Admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

function getActivityIcon(type: Activity['type']) {
  const icons = {
    user: { icon: User, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    application: { icon: Box, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
    license: { icon: CreditCard, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
    security: { icon: Shield, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
    organization: { icon: Clock, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
  };
  return icons[type];
}

export function RecentActivity() {
  const { data: activities, isLoading } = useDashboardActivity();
  const items = activities || fallbackActivities;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
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
        <CardTitle>Recent Activity</CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link href="/activity">View all <ExternalLink className="ml-1 h-3 w-3" /></Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((activity) => {
            const { icon: Icon, color } = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className={cn('p-2 rounded-lg flex-shrink-0', color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm">{activity.user}</p>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted">
                      {activity.action}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatRelativeTime(activity.timestamp)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
