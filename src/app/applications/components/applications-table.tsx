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
import { Box, CheckCircle, AlertCircle, XCircle, ExternalLink, Download, Settings } from '@wabtechs/icons';
import { cn } from '@wabtechs/utils';
import { useApplications } from '@/hooks';
import { Skeleton } from '@wabtechs/ui/skeleton';

function getStatusConfig(status: string) {
  const config: Record<string, { label: string; icon: typeof CheckCircle; color: string }> = {
    available: { label: 'Available', icon: AlertCircle, color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
    installed: { label: 'Installed', icon: CheckCircle, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    connected: { label: 'Connected', icon: CheckCircle, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    deprecated: { label: 'Deprecated', icon: XCircle, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  };
  return config[status] || config.available;
}

export function ApplicationsTable() {
  const { data: apps, isLoading } = useApplications();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
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
        <CardTitle>All Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Application</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Subscription</TableHead>
                <TableHead className="hidden lg:table-cell">License</TableHead>
                <TableHead className="w-40 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps?.map((app) => {
                const statusConfig = getStatusConfig(app.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          <Box className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{app.name}</p>
                          <p className="text-xs text-muted-foreground">{app.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{app.category}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      v{app.version}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('gap-1', statusConfig.color)}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {app.subscription ? (
                        <Badge variant="outline">{app.subscription.plan}</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {app.license ? (
                        <Badge variant="secondary">{app.license.type}</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings className="h-4 w-4" />
                        </Button>
                        {app.status === 'available' && (
                          <Button variant="outline" size="sm">
                            <Download className="mr-1 h-3 w-3" />
                            Install
                          </Button>
                        )}
                        {(app.status === 'installed' || app.status === 'connected') && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
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
