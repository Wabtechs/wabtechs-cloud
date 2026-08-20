'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@wabtechs/ui/badge';
import { CreditCard, AlertCircle, CheckCircle, Clock, XCircle, ExternalLink, RotateCcw, Key } from '@wabtechs/icons';
import { cn, formatDate } from '@wabtechs/utils';
import { useLicenses } from '@/hooks';
import { Skeleton } from '@wabtechs/ui/skeleton';

function getStatusConfig(status: string) {
  const config: Record<string, { label: string; icon: typeof CheckCircle; color: string }> = {
    active: { label: 'Active', icon: CheckCircle, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    expired: { label: 'Expired', icon: AlertCircle, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
    revoked: { label: 'Revoked', icon: XCircle, color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
    pending: { label: 'Pending', icon: Clock, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  };
  return config[status] || config.active;
}

function getTypeConfig(type: string) {
  const config: Record<string, { label: string; color: string }> = {
    trial: { label: 'Trial', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
    standard: { label: 'Standard', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    premium: { label: 'Premium', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    enterprise: { label: 'Enterprise', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  };
  return config[type] || config.standard;
}

export function LicensesTable() {
  const { data: licenses, isLoading } = useLicenses('current');

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>License Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Application</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>License Key</TableHead>
                <TableHead className="w-48 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licenses?.map((license) => {
                const statusConfig = getStatusConfig(license.status);
                const typeConfig = getTypeConfig(license.type);
                const StatusIcon = statusConfig.icon;
                const usagePercent = Math.round((license.usedSeats / license.seats) * 100);
                const isExpiringSoon = license.expiresAt && new Date(license.expiresAt).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000;

                return (
                  <TableRow key={license.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{license.applicationId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={typeConfig.color}>
                        {typeConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('gap-1', statusConfig.color)}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {license.seats}
                    </TableCell>
                    <TableCell>
                      <div className="w-32">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{license.usedSeats} / {license.seats}</span>
                          <span className={cn('font-medium', usagePercent > 90 && 'text-destructive')}>
                            {usagePercent}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn('h-full transition-all', usagePercent > 90 ? 'bg-destructive' : 'bg-primary')}
                            style={{ width: `${usagePercent}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {license.expiresAt ? (
                        <div>
                          <p className={cn(isExpiringSoon && 'text-destructive font-medium')}>
                            {formatDate(license.expiresAt)}
                          </p>
                          {isExpiringSoon && (
                            <p className="text-xs text-destructive">Expires soon</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No expiration</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {license.key}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {license.status === 'active' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Rotate key">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
                        {license.status === 'expired' && (
                          <Button variant="outline" size="sm">
                            <RotateCcw className="mr-1 h-3 w-3" />
                            Renew
                          </Button>
                        )}
                        {license.status === 'pending' && (
                          <Button variant="outline" size="sm">
                            <Key className="mr-1 h-3 w-3" />
                            Activate
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
