'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { Switch } from '@wabtechs/ui';
import { NotificationPreferences } from '@/app/notifications/components/notification-preferences';

export function NotificationsSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <NotificationPreferences />
        </CardContent>
      </Card>
    </div>
  );
}