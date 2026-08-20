'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ApiKeysList } from './components/api-keys-list';
import { CreateApiKeyDialog } from './components/create-api-key-dialog';
import { Button } from '@wabtechs/ui/button';
import { Plus } from '@wabtechs/icons';

export default function ApiKeysPage() {
  const [createKeyOpen, setCreateKeyOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
            <p className="text-muted-foreground mt-1">Manage your API keys for programmatic access</p>
          </div>
          <Button onClick={() => setCreateKeyOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create API Key
          </Button>
        </div>

        <ApiKeysList />

        <CreateApiKeyDialog open={createKeyOpen} onOpenChange={setCreateKeyOpen} />
      </div>
    </DashboardLayout>
  );
}
