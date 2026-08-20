'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { Switch } from '@wabtechs/ui';
import { Label } from '@wabtechs/ui/label';
import { Mail, Bell, Smartphone, Loader2 } from '@wabtechs/icons';
import { toast } from 'sonner';
import { useNotificationPreferences, useUpdateNotificationPreferences } from '@/hooks';

export function NotificationPreferences() {
  const { data: prefs, isLoading } = useNotificationPreferences();
  const updatePrefs = useUpdateNotificationPreferences();
  const [preferences, setPreferences] = useState({
    email: true,
    push: true,
    inApp: true,
    categories: {
      security: true,
      billing: true,
      updates: true,
      marketing: false,
    },
  });

  useEffect(() => {
    if (prefs) {
      setPreferences(prefs);
    }
  }, [prefs]);

  const togglePreference = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (category: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      categories: { ...prev.categories, [category]: value },
    }));
  };

  const handleSave = async () => {
    try {
      await updatePrefs.mutateAsync(preferences);
      toast.success('Preferences saved');
    } catch {
      toast.error('Failed to save preferences');
    }
  };

  const categoryLabels: Record<string, { title: string; description: string }> = {
    security: {
      title: 'Security alerts',
      description: 'Login attempts, 2FA changes, password changes, suspicious activity',
    },
    billing: {
      title: 'Billing & subscriptions',
      description: 'Invoice notifications, payment failures, renewal reminders',
    },
    updates: {
      title: 'Product updates',
      description: 'New features, version releases, maintenance windows',
    },
    marketing: {
      title: 'Marketing & tips',
      description: 'Product tips, webinars, feature highlights, promotional offers',
    },
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Delivery Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Email notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <Switch
              checked={preferences.email}
              onCheckedChange={(checked) => togglePreference('email', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Push notifications</p>
                <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
              </div>
            </div>
            <Switch
              checked={preferences.push}
              onCheckedChange={(checked) => togglePreference('push', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">In-app notifications</p>
                <p className="text-sm text-muted-foreground">Show notifications in the notification center</p>
              </div>
            </div>
            <Switch
              checked={preferences.inApp}
              onCheckedChange={(checked) => togglePreference('inApp', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  {key === 'security' && <Mail className="h-5 w-5" />}
                  {key === 'billing' && <Bell className="h-5 w-5" />}
                  {key === 'updates' && <Smartphone className="h-5 w-5" />}
                  {key === 'marketing' && <Mail className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-medium">{label.title}</p>
                  <p className="text-sm text-muted-foreground">{label.description}</p>
                </div>
              </div>
              <Switch
                checked={preferences.categories[key as keyof typeof preferences.categories]}
                onCheckedChange={(checked) => toggleCategory(key, checked)}
                disabled={key === 'security'}
              />
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            Security alerts cannot be disabled for your protection.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={updatePrefs.isPending}>
          {updatePrefs.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Preferences'
          )}
        </Button>
      </div>
    </div>
  );
}
