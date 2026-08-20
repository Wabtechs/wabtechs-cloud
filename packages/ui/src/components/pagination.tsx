import * as React from 'react';
import { cn } from '../lib/utils';
import { Button } from './button';
import { Icon } from '@wabtechs/icons';

export interface PaginationProps extends React.HTMLAttributes<nav> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
  ...props
}: PaginationProps): React.JSX.Element {
  const pages = React.useMemo(() => {
    const items: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      items.push(1);
      if (page > 3) items.push('ellipsis');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        items.push(i);
      }
      if (page < totalPages - 2) items.push('ellipsis');
      items.push(totalPages);
    }
    return items;
  }, [page, totalPages]);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-1', className)}
      {...props}
    >
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Page précédente"
      >
        <Icon name="chevron-left" size={14} />
      </Button>
      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <Button
            key={p}
            variant={p === page ? 'default' : 'outline'}
            size="icon-sm"
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </Button>
        ),
      )}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Page suivante"
      >
        <Icon name="chevron-right" size={14} />
      </Button>
    </nav>
  );
}
