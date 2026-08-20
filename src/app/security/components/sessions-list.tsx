'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { Badge } from '@wabtechs/ui/badge';
import { Monitor, Smartphone, Tablet, LogOut, Clock } from '@wabtechs/icons';
import { cn, formatRelativeTime } from '@/lib/utils';
import { useSessions, useRevokeSession } from '@/hooks';
import { toast } from 'sonner';
import { Skeleton } from '@wabtechs/ui/skeleton';

function getDeviceIcon(device: string) {
  const lower = device.toLowerCase();
  if (lower.includes('mobile') || lower.includes('android') || lower.includes('iphone')) {
    return Smartphone;
  }
  if (lower.includes('tablet') || lower.includes('ipad')) {
    return Tablet;
  }
  return Monitor;
}

export function SessionsList() {
  const { data: sessions, isLoading } = useSessions();
  const revokeSession = useRevokeSession();
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const handleRevoke = async (id: string) => {
    setRevokingId(id);
    try {
      await revokeSession.mutateAsync(id);
      toast.success('Session revoked');
    } catch {
      toast.error('Failed to revoke session');
    } finally {
      setRevokingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sessions?.map((session) => {
        const DeviceIcon = getDeviceIcon(session.device);
        return (
          <Card key={session.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <DeviceIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{session.device}</p>
                      {session.current && (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {session.ip} · {session.location}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      <span>Last active {formatRelativeTime(session.lastActive)}</span>
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    onClick={() => handleRevoke(session.id)}
                    disabled={revokingId === session.id}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
