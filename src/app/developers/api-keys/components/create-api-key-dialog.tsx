'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@wabtechs/ui';
import { Button } from '@wabtechs/ui/button';
import { Input } from '@wabtechs/ui/input';
import { Label } from '@wabtechs/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Key, Copy } from '@wabtechs/icons';
import { useCreateApiKey } from '@/hooks';

const createKeySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  scopes: z.array(z.string()).min(1, 'Select at least one scope'),
  expiresAt: z.string().optional(),
});

type CreateKeyForm = z.infer<typeof createKeySchema>;

const availableScopes = [
  { value: 'read', label: 'Read', description: 'Read access to resources' },
  { value: 'write', label: 'Write', description: 'Create and modify resources' },
  { value: 'admin', label: 'Admin', description: 'Full administrative access' },
];

interface CreateApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateApiKeyDialog({ open, onOpenChange }: CreateApiKeyDialogProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [generatedKey, setGeneratedKey] = useState('');
  const createKey = useCreateApiKey();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateKeyForm>({
    resolver: zodResolver(createKeySchema),
    defaultValues: { scopes: ['read'] },
  });

  const selectedScopes = watch('scopes');

  const onSubmit = async (data: CreateKeyForm) => {
    try {
      const result = await createKey.mutateAsync(data);
      setGeneratedKey(result.secret);
      setStep('success');
      toast.success('API key created successfully!');
    } catch {
      toast.error('Failed to create API key');
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey);
    toast.success('API key copied to clipboard');
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep('form');
    setGeneratedKey('');
    reset();
  };

  if (step === 'success') {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>API Key Created</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                Your API key has been generated. <strong>Copy it now — you won&apos;t be able to see it again.</strong>
              </p>
              <div className="flex items-center gap-2">
                <Input readOnly value={generatedKey} className="font-mono text-sm flex-1" />
                <Button variant="outline" size="sm" onClick={handleCopyKey}>
                  <Copy className="mr-1 h-3 w-3" />
                  Copy
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Store this key securely. For security reasons, we only show the full key once.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={handleClose}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New API Key</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Production API"
              {...register('name')}
              disabled={createKey.isPending}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-sm text-destructive" role="alert">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Scopes</Label>
            <div className="space-y-2">
              {availableScopes.map((scope) => (
                <div key={scope.value} className="flex items-center gap-3 p-3 rounded-lg border">
                  <input
                    type="checkbox"
                    id={`scope-${scope.value}`}
                    checked={selectedScopes.includes(scope.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        register('scopes').onChange({ target: { value: [...selectedScopes, scope.value] } });
                      } else {
                        register('scopes').onChange({ target: { value: selectedScopes.filter(s => s !== scope.value) } });
                      }
                    }}
                    className="rounded border-input"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{scope.label}</p>
                    <p className="text-sm text-muted-foreground">{scope.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {errors.scopes && <p className="text-sm text-destructive" role="alert">{errors.scopes.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiresAt">Expiration (optional)</Label>
            <Input
              id="expiresAt"
              type="date"
              {...register('expiresAt')}
              disabled={createKey.isPending}
              min={new Date().toISOString().split('T')[0]}
            />
            <p className="text-xs text-muted-foreground">Leave empty for no expiration</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={createKey.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={createKey.isPending}>
              {createKey.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Key className="mr-2 h-4 w-4" />
                  Create API Key
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
