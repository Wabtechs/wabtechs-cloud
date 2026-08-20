'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { LicensesTable } from './components/licenses-table';
import { Button } from '@wabtechs/ui/button';
import { Plus, Search, Filter, RefreshCw } from '@wabtechs/icons';
import { Input } from '@wabtechs/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@wabtechs/ui';

export default function LicensesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Licenses</h1>
            <p className="text-muted-foreground mt-1">Manage your application licenses and subscriptions</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Activate License
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search licenses..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <LicensesTable />
      </div>
    </DashboardLayout>
  );
}
