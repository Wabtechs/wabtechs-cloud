'use client';

import { Suspense } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { DashboardStats } from './components/dashboard-stats';
import { RecentActivity } from './components/recent-activity';
import { ApplicationsOverview } from './components/applications-overview';
import { LicenseOverview } from './components/license-overview';
import { NotificationsPanel } from './components/notifications-panel';
import { SecurityOverview } from './components/security-overview';
import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Skeleton } from '@wabtechs/ui/skeleton';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your Wabtechs ecosystem</p>
        </div>

        <Suspense fallback={<StatsSkeleton />}>
          <DashboardStats />
        </Suspense>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<CardSkeleton />}>
            <ApplicationsOverview />
          </Suspense>
          <Suspense fallback={<CardSkeleton />}>
            <LicenseOverview />
          </Suspense>
          <Suspense fallback={<CardSkeleton />}>
            <SecurityOverview />
          </Suspense>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Suspense fallback={<CardSkeleton />}>
            <RecentActivity />
          </Suspense>
          <Suspense fallback={<CardSkeleton />}>
            <NotificationsPanel />
          </Suspense>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="mt-2 h-8 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-1/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-3/4" />
        <Skeleton className="mt-2 h-4 w-1/2" />
      </CardContent>
    </Card>
  );
}
