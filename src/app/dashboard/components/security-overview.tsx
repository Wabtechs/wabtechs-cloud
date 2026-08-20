'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { Shield, CheckCircle, AlertTriangle, ExternalLink, Key } from '@wabtechs/icons';
import Link from 'next/link';
import { cn } from '@wabtechs/utils';

export function SecurityOverview() {
  const securityItems = [
    {
      title: 'Two-Factor Authentication',
      description: 'Enabled with authenticator app',
      status: 'enabled' as const,
      icon: Shield,
      action: { label: 'Manage', href: '/security' },
    },
    {
      title: 'Active Sessions',
      description: '3 active sessions across devices',
      status: 'info' as const,
      icon: Key,
      action: { label: 'View', href: '/security' },
    },
    {
      title: 'Password Health',
      description: 'Strong password, last changed 45 days ago',
      status: 'enabled' as const,
      icon: CheckCircle,
      action: { label: 'Change', href: '/security' },
    },
    {
      title: 'API Keys',
      description: '2 active API keys',
      status: 'warning' as const,
      icon: AlertTriangle,
      action: { label: 'Manage', href: '/developers/api-keys' },
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Security</CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link href="/security">View all <ExternalLink className="ml-1 h-3 w-3" /></Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {securityItems.map((item, index) => {
            const Icon = item.icon;
            const statusConfig = {
              enabled: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'Enabled' },
              warning: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', label: 'Attention' },
              info: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', label: 'Info' },
              disabled: { color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', label: 'Disabled' },
            }[item.status];

            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-lg', statusConfig.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusConfig.color)}>
                    {statusConfig.label}
                  </span>
                  {item.action && (
                    <Button asChild variant="ghost" size="sm">
                      <Link href={item.action.href}>{item.action.label}</Link>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
