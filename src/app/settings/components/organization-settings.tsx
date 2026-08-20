'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { Input } from '@wabtechs/ui/input';
import { Label } from '@wabtechs/ui/label';
import { Textarea } from '@wabtechs/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Switch } from '@wabtechs/ui';
import { Loader2, Building2, Users, Shield, Globe } from '@wabtechs/icons';
import { toast } from 'sonner';
import { cn } from '@wabtechs/utils';

const orgSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens'),
  description: z.string().max(500).optional(),
  allowPublicSignup: z.boolean(),
  requireMFA: z.boolean(),
  sessionDuration: z.number().min(1).max(90),
  allowedDomains: z.string().optional(),
});

type OrgForm = z.infer<typeof orgSchema>;

export function OrganizationSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrgForm>({
    resolver: zodResolver(orgSchema),
    defaultValues: {
      name: 'Acme Corporation',
      slug: 'acme-corp',
      description: 'Main organization for Acme Corp',
      allowPublicSignup: false,
      requireMFA: true,
      sessionDuration: 30,
      allowedDomains: 'acme.com, acme.io',
    },
  });

  const onSubmit = async (data: OrgForm) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Organization settings saved');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                {...register('name')}
                disabled={isLoading}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-sm text-destructive" role="alert">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">cloud.wabtechs.com/org/</span>
                <Input
                  id="slug"
                  className="pl-40"
                  {...register('slug')}
                  disabled={isLoading}
                  aria-invalid={!!errors.slug}
                />
              </div>
              {errors.slug && <p className="text-sm text-destructive" role="alert">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your organization..."
                className="min-h-[100px]"
                {...register('description')}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security & Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Require Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Enforce 2FA for all organization members</p>
            </div>
            <Switch
              checked={watch('requireMFA')}
              onCheckedChange={(checked) => setValue('requireMFA', checked)}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Allow Public Signup</p>
              <p className="text-sm text-muted-foreground">Allow anyone with an allowed domain to join</p>
            </div>
            <Switch
              checked={watch('allowPublicSignup')}
              onCheckedChange={(checked) => setValue('allowPublicSignup', checked)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionDuration">Session Duration (days)</Label>
            <Input
              id="sessionDuration"
              type="number"
              min="1"
              max="90"
              {...register('sessionDuration', { valueAsNumber: true })}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allowedDomains">Allowed Email Domains</Label>
            <Input
              id="allowedDomains"
              placeholder="acme.com, acme.io"
              {...register('allowedDomains')}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">Comma-separated list of allowed domains for signup</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-destructive/5">
            <div>
              <p className="font-medium text-destructive">Delete Organization</p>
              <p className="text-sm text-muted-foreground">Permanently delete this organization and all its data</p>
            </div>
            <Button variant="destructive" onClick={() => {}}>Delete Organization</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}