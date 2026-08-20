'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { OrganizationsList } from './components/organizations-list';
import { CreateOrganizationDialog } from './components/create-organization-dialog';
import { Button } from '@wabtechs/ui/button';
import { Plus } from '@wabtechs/icons';

export default function OrganizationsPage() {
  const [createOrgOpen, setCreateOrgOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
            <p className="text-muted-foreground mt-1">Manage your organizations and teams</p>
          </div>
          <Button onClick={() => setCreateOrgOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Organization
          </Button>
        </div>

        <OrganizationsList />

        <CreateOrganizationDialog open={createOrgOpen} onOpenChange={setCreateOrgOpen} />
      </div>
    </DashboardLayout>
  );
}
