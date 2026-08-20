import * as React from 'react';
import { cn } from '../lib/utils';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Skeleton — placeholder de chargement (`animate-pulse`, reduced-motion-safe).
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

export interface CardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Nombre de lignes de description. */
  lines?: number;
}

/**
 * Skeleton de carte.
 */
export function CardSkeleton({
  className,
  lines = 2,
  ...props
}: CardSkeletonProps): React.JSX.Element {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-5 shadow-sm', className)} {...props}>
      <Skeleton className="h-5 w-32" />
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }, (_, index) => (
          <Skeleton key={index} className={cn('h-3', index === lines - 1 ? 'w-3/4' : 'w-full')} />
        ))}
      </div>
    </div>
  );
}

export interface ListSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
}

/**
 * Skeleton de liste.
 */
export function ListSkeleton({ className, rows = 5, ...props }: ListSkeletonProps): React.JSX.Element {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="flex items-center gap-3">
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export interface TableSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  rows?: number;
}

/**
 * Skeleton de tableau.
 */
export function TableSkeleton({
  className,
  columns = 4,
  rows = 6,
  ...props
}: TableSkeletonProps): React.JSX.Element {
  return (
    <div
      className={cn('overflow-hidden rounded-lg border border-border bg-card shadow-sm', className)}
      {...props}
    >
      <div className="border-b border-border bg-muted/50 px-4 py-3">
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-4 px-4 py-3">
            {Array.from({ length: columns }, (_, colIndex) => (
              <Skeleton
                key={colIndex}
                className={cn('h-3', colIndex === 0 ? 'w-24' : 'flex-1')}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export interface FormSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  fields?: number;
}

/**
 * Skeleton de formulaire (labels + contrôles).
 */
export function FormSkeleton({
  className,
  fields = 3,
  ...props
}: FormSkeletonProps): React.JSX.Element {
  return (
    <div className={cn('space-y-5', className)} {...props}>
      {Array.from({ length: fields }, (_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
      <Skeleton className="h-9 w-32" />
    </div>
  );
}

export interface DashboardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  cards?: number;
}

/**
 * Skeleton de dashboard (grille de cartes métriques).
 */
export function DashboardSkeleton({
  className,
  cards = 4,
  ...props
}: DashboardSkeletonProps): React.JSX.Element {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)} {...props}>
      {Array.from({ length: cards }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
