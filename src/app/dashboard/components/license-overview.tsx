'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { CreditCard, AlertCircle, CheckCircle, Clock, ExternalLink } from '@wabtechs/icons';
import Link from 'next/link';
import { cn } from '@wabtechs/utils';
import { useDashboardStats } from '@/hooks';
import { Skeleton } from '@wabtechs/ui/skeleton';

export function LicenseOverview() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-1.5 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const licenses = stats?.licenses || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Licenses</CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link href="/licenses">View all <ExternalLink className="ml-1 h-3 w-3" /></Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {licenses.slice(0, 3).map((license: { id: string; applicationName: string; type: string; status: string; seats: number; usedSeats: number; expiresAt?: string }) => {
            const statusConfig = {
              active: { label: 'Active', icon: CheckCircle, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
              expired: { label: 'Expired', icon: AlertCircle, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
              revoked: { label: 'Revoked', icon: AlertCircle, color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
              pending: { label: 'Pending', icon: Clock, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
            }[license.status as keyof typeof statusConfig] || { label: 'Unknown', icon: AlertCircle, color: 'bg-gray-100 text-gray-700' };

            const StatusIcon = statusConfig.icon;
            const usagePercent = Math.round((license.usedSeats / license.seats) * 100);

            return (
              <div key={license.id} className="p-3 rounded-lg border">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium truncate">{license.applicationName}</p>
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', statusConfig.color)}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 capitalize">{license.type} plan</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CreditCard className="h-3 w-3" />
                    <span>{license.usedSeats} / {license.seats} seats used</span>
                  </div>
                  <div className="w-32">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn('h-full bg-primary transition-all', usagePercent > 90 && 'bg-destructive')}
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <Link
            href="/licenses"
            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <CreditCard className="h-4 w-4" />
            <span className="text-sm font-medium">View all licenses</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
