'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ApplicationsTable } from './components/applications-table';
import { Button } from '@wabtechs/ui/button';
import { Plus, Search, Filter } from '@wabtechs/icons';
import { Input } from '@wabtechs/ui/input';

export default function ApplicationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
            <p className="text-muted-foreground mt-1">Browse and manage available applications</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Application
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search applications..." className="pl-10" />
          </div>
        </div>

        <ApplicationsTable />
      </div>
    </DashboardLayout>
  );
}
