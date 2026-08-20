import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../lib/utils';

const avatarSizeClasses = {
  xs: 'size-6 text-[0.625rem]',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-14 text-base',
  xl: 'size-20 text-lg',
} as const;

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: keyof typeof avatarSizeClasses;
}

/**
 * Avatar (Radix) — image de profil avec fallback initials.
 */
export const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  function Avatar({ className, size = 'md', ...props }, ref) {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn('relative flex shrink-0 overflow-hidden rounded-full', avatarSizeClasses[size], className)}
        {...props}
      />
    );
  },
);

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(function AvatarImage({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('aspect-square h-full w-full object-cover', className)}
      {...props}
    />
  );
});

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
});

export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;
export type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Nombre maximum d'avatars visibles (le reste est regroupé). */
  max?: number;
}

/**
 * Groupe d'avatars empilés. Les avatars reçoivent automatiquement un
 * anneau `ring-background` pour la lisibilité.
 */
export function AvatarGroup({
  children,
  max,
  className,
  ...props
}: AvatarGroupProps): React.JSX.Element {
  const items = React.Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const overflowCount = max ? Math.max(items.length - max, 0) : 0;

  return (
    <div className={cn('flex items-center -space-x-2', className)} {...props}>
      {visible.map((child, index) =>
        React.isValidElement<{ className?: string }>(child)
          ? React.cloneElement(child, {
              key: index,
              className: cn('ring-2 ring-background', child.props.className),
            })
          : child,
      )}
      {overflowCount > 0 ? (
        <span className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground ring-2 ring-background">
          +{overflowCount}
        </span>
      ) : null}
    </div>
  );
}
