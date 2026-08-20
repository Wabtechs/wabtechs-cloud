'use client';

import { Card, CardContent } from '@wabtechs/ui/card';
import { Users, Box, CreditCard, Shield, TrendingUp } from '@wabtechs/icons';
import { cn } from '@wabtechs/utils';
import { useDashboardStats } from '@/hooks';
import { Skeleton } from '@wabtechs/ui/skeleton';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  iconColor: string;
}

function StatCard({ title, value, change, changeType, icon, iconColor }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {change && (
              <p
                className={cn(
                  'text-sm mt-1 flex items-center gap-1',
                  changeType === 'increase' ? 'text-green-600' : changeType === 'decrease' ? 'text-red-600' : 'text-muted-foreground'
                )}
              >
                {changeType === 'increase' && <TrendingUp className="h-3 w-3" />}
                {changeType === 'decrease' && <TrendingUp className="h-3 w-3 rotate-180" />}
                {change}
              </p>
            )}
          </div>
          <div className={cn('p-3 rounded-xl', iconColor)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="mt-2 h-8 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Active Users',
      value: stats?.activeUsers ?? '2,847',
      change: '+12.5% from last month',
      changeType: 'increase' as const,
      icon: <Users className="h-6 w-6" />,
      iconColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
      title: 'Applications',
      value: stats?.applications ?? '24',
      change: '3 new this week',
      changeType: 'increase' as const,
      icon: <Box className="h-6 w-6" />,
      iconColor: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    },
    {
      title: 'Active Licenses',
      value: stats?.licenses ?? '18',
      change: '2 expiring soon',
      changeType: 'decrease' as const,
      icon: <CreditCard className="h-6 w-6" />,
      iconColor: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    {
      title: 'Security Score',
      value: stats?.securityScore ?? '94%',
      change: '+2% this month',
      changeType: 'increase' as const,
      icon: <Shield className="h-6 w-6" />,
      iconColor: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
