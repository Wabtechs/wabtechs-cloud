'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { SecurityOverview } from '@/app/dashboard/components/security-overview';
import { SessionsList } from './components/sessions-list';
import { MFASection } from './components/mfa-section';
import { SecurityEvents } from './components/security-events';
import { PasswordSection } from './components/password-section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@wabtechs/ui';

export default function SecurityPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security</h1>
          <p className="text-muted-foreground mt-1">Manage your security settings and monitor account activity</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="mfa">Two-Factor Auth</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="events">Security Events</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SecurityOverview />
          </TabsContent>

          <TabsContent value="sessions">
            <SessionsList />
          </TabsContent>

          <TabsContent value="mfa">
            <MFASection />
          </TabsContent>

          <TabsContent value="password">
            <PasswordSection />
          </TabsContent>

          <TabsContent value="events">
            <SecurityEvents />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
