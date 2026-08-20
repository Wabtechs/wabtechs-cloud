'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { NotificationsList } from './components/notifications-list';
import { NotificationPreferences } from './components/notification-preferences';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@wabtechs/ui';
import { Button } from '@wabtechs/ui/button';
import { Check } from '@wabtechs/icons';
import { useMarkAllNotificationsRead } from '@/hooks';

export default function NotificationsPage() {
  const markAllRead = useMarkAllNotificationsRead();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground mt-1">Manage your notifications and preferences</p>
          </div>
          <Button variant="outline" onClick={() => markAllRead.mutate()} disabled={markAllRead.isPending}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">All Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <NotificationsList />
          </TabsContent>

          <TabsContent value="preferences">
            <NotificationPreferences />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
