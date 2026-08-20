'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@wabtechs/ui';
import { MFASection } from '@/app/security/components/mfa-section';
import { PasswordSection } from '@/app/security/components/password-section';
import { SessionsList } from '@/app/security/components/sessions-list';
import { SecurityEvents } from '@/app/security/components/security-events';
import { ApiKeysList } from '@/app/developers/api-keys/components/api-keys-list';

export function SecuritySettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="mfa">Two-Factor Auth</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="events">Security Events</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Security Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage your security settings from the tabs above.</p>
            </CardContent>
          </Card>
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

        <TabsContent value="api-keys">
          <ApiKeysList />
        </TabsContent>
      </Tabs>
    </div>
  );
}