'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@wabtechs/ui';
import { Button } from '@wabtechs/ui/button';
import { Input } from '@wabtechs/ui/input';
import { Label } from '@wabtechs/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from '@wabtechs/icons';
import { useCreateOrganization } from '@/hooks';

const createOrgSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  slug: z.string().min(2, 'Slug must be at least 2 characters').max(50).regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens allowed'),
  description: z.string().max(500).optional(),
});

type CreateOrgForm = z.infer<typeof createOrgSchema>;

interface CreateOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateOrganizationDialog({ open, onOpenChange }: CreateOrganizationDialogProps) {
  const createOrg = useCreateOrganization();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateOrgForm>({
    resolver: zodResolver(createOrgSchema),
  });

  const onSubmit = async (data: CreateOrgForm) => {
    try {
      await createOrg.mutateAsync(data);
      toast.success('Organization created successfully!');
      onOpenChange(false);
      reset();
    } catch {
      toast.error('Failed to create organization');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden">Create Organization</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Acme Corporation"
              {...register('name')}
              disabled={createOrg.isPending}
              aria-invalid={!!errors.name}
              onChange={(e) => {
                register('name').onChange(e);
                const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
                setValue('slug', slug, { shouldDirty: true });
              }}
            />
            {errors.name && <p className="text-sm text-destructive" role="alert">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">cloud.wabtechs.com/org/</span>
              <Input
                id="slug"
                placeholder="acme-corp"
                className="pl-40"
                {...register('slug')}
                disabled={createOrg.isPending}
                aria-invalid={!!errors.slug}
              />
            </div>
            {errors.slug && <p className="text-sm text-destructive" role="alert">{errors.slug.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              placeholder="Main organization for Acme Corp"
              {...register('description')}
              disabled={createOrg.isPending}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => { onOpenChange(false); reset(); }} disabled={createOrg.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={createOrg.isPending}>
              {createOrg.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Organization'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
