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
import { Key, Trash2, Copy, Check } from '@wabtechs/icons';
import { formatRelativeTime, formatDate } from '@/lib/utils';
import { useApiKeys, useRevokeApiKey } from '@/hooks';
import { useState } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '@wabtechs/ui/skeleton';

export function ApiKeysList() {
  const { data: keys, isLoading } = useApiKeys();
  const revokeKey = useRevokeApiKey();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleRevoke = async (keyId: string) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      return;
    }
    try {
      await revokeKey.mutateAsync(keyId);
      toast.success('API key revoked');
    } catch {
      toast.error('Failed to revoke API key');
    }
  };

  const handleCopy = (prefix: string) => {
    navigator.clipboard.writeText(`${prefix}****`);
    setCopiedId(prefix);
    toast.success('Key prefix copied');
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/6" />
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
        <CardTitle>Your API Keys</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <p className="text-sm text-muted-foreground">
            <strong>Important:</strong> Secret keys are only shown once at creation.
            Store them securely — we cannot retrieve them for you.
          </p>
        </div>

        {!keys || keys.length === 0 ? (
          <div className="text-center py-12">
            <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-1">No API keys yet</h3>
            <p className="text-sm text-muted-foreground mb-4">Create your first API key to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Prefix</TableHead>
                  <TableHead>Scopes</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-40 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{key.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      <span className="flex items-center gap-1">
                        {key.prefix}****
                        {copiedId === key.prefix && <Check className="h-3 w-3 text-green-600" />}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {key.scopes.map((scope) => (
                          <Badge key={scope} variant="secondary" className="text-xs">
                            {scope}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {key.lastUsedAt ? (
                        <span>{formatRelativeTime(key.lastUsedAt)}</span>
                      ) : (
                        <span className="text-muted-foreground">Never used</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {key.expiresAt ? (
                        <span>{formatDate(key.expiresAt)}</span>
                      ) : (
                        <Badge variant="secondary">No expiration</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(key.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopy(key.prefix)}
                          title="Copy prefix"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleRevoke(key.id)}
                          disabled={revokeKey.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
