import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../lib/utils';
import { Icon } from '@wabtechs/icons';
import { Button } from './button';
import { IconButton } from './icon-button';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
  onConfirm: () => void;
  onCancel?: () => void;
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  variant = 'default',
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps): React.JSX.Element {
  const handleCancel = () => {
    onOpenChange(false);
    onCancel?.();
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:wt-animate-fade-in data-[state=closed]:wt-animate-fade-out" />
        <DialogPrimitive.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 border border-border bg-background p-6 shadow-lg sm:rounded-lg',
            'data-[state=open]:wt-animate-zoom-in data-[state=closed]:wt-animate-fade-out',
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'flex size-10 shrink-0 items-center justify-center rounded-full',
                variant === 'destructive' ? 'bg-destructive/10' : 'bg-muted',
              )}
            >
              <Icon
                name={variant === 'destructive' ? 'alert-triangle' : 'help-circle'}
                size={20}
                className={variant === 'destructive' ? 'text-destructive' : 'text-muted-foreground'}
              />
            </div>
            <div className="flex-1">
              <DialogPrimitive.Title className="text-base font-semibold text-foreground">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
                {description}
              </DialogPrimitive.Description>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel} disabled={loading}>
              {cancelLabel}
            </Button>
            <Button
              variant={variant === 'destructive' ? 'destructive' : 'default'}
              size="sm"
              onClick={onConfirm}
              loading={loading}
            >
              {confirmLabel}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
