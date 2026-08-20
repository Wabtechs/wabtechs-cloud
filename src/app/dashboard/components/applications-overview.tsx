'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { Box, CheckCircle, AlertCircle, XCircle, ExternalLink } from '@wabtechs/icons';
import Link from 'next/link';
import { cn } from '@wabtechs/utils';
import { useApplications } from '@/hooks';
import { Skeleton } from '@wabtechs/ui/skeleton';

function getStatusBadge(status: string) {
  const config: Record<string, { label: string; icon: typeof CheckCircle; color: string }> = {
    available: { label: 'Available', icon: AlertCircle, color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
    installed: { label: 'Installed', icon: CheckCircle, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    connected: { label: 'Connected', icon: CheckCircle, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    deprecated: { label: 'Deprecated', icon: XCircle, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  };
  return config[status] || config.available;
}

export function ApplicationsOverview() {
  const { data: apps, isLoading } = useApplications();
  const applications = apps || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
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
        <CardTitle>Applications</CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link href="/applications">View all <ExternalLink className="ml-1 h-3 w-3" /></Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.slice(0, 3).map((app) => {
            const statusConfig = getStatusBadge(app.status);
            const StatusIcon = statusConfig.icon;
            return (
              <Link
                key={app.id}
                href={`/applications/${app.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Box className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{app.name}</p>
                    <p className="text-sm text-muted-foreground">{app.category} • v{app.version}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium', statusConfig.color)}>
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig.label}
                  </span>
                </div>
              </Link>
            );
          })}
          <Link
            href="/applications"
            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <Box className="h-4 w-4" />
            <span className="text-sm font-medium">View all applications</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
