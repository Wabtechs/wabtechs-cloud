'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProfileSettings } from './components/profile-settings';
import { OrganizationSettings } from './components/organization-settings';
import { SecuritySettings } from './components/security-settings';
import { NotificationsSettings } from './components/notifications-settings';
import { PreferencesSettings } from './components/preferences-settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@wabtechs/ui';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and organization settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="organization">
            <OrganizationSettings />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsSettings />
          </TabsContent>

          <TabsContent value="preferences">
            <PreferencesSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
