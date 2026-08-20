'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { Building2, Users, Settings, MoreHorizontal, CheckCircle, Clock } from '@wabtechs/icons';
import { cn } from '@wabtechs/utils';
import { useOrganizations } from '@/hooks';
import { Skeleton } from '@wabtechs/ui/skeleton';

function getPlanBadge(plan: string) {
  const config: Record<string, { label: string; color: string }> = {
    free: { label: 'Free', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
    pro: { label: 'Pro', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    enterprise: { label: 'Enterprise', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  };
  return config[plan] || config.free;
}

function getRoleBadge(role: string) {
  const config: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
    owner: { label: 'Owner', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: CheckCircle },
    admin: { label: 'Admin', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Users },
    member: { label: 'Member', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', icon: Clock },
  };
  return config[role] || config.member;
}

export function OrganizationsList() {
  const { data: orgs, isLoading } = useOrganizations();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Organizations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orgs?.map((org) => {
            const planConfig = getPlanBadge(org.plan);
            const roleConfig = getRoleBadge(org.role);
            const RoleIcon = roleConfig.icon;

            return (
              <div key={org.id} className="p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold truncate">{org.name}</h3>
                        <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', planConfig.color)}>
                          {planConfig.label}
                        </span>
                        <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', roleConfig.color)}>
                          <RoleIcon className="h-3 w-3" />
                          {roleConfig.label}
                        </span>
                      </div>
                      {org.description && (
                        <p className="text-sm text-muted-foreground mt-1 truncate">{org.description}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Created {new Date(org.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
