import * as React from 'react';
import { cn } from '../lib/utils';

const textareaSizeClasses = {
  sm: 'min-h-16 px-2.5 py-2 text-xs',
  md: 'min-h-20 px-3 py-2 text-sm',
  lg: 'min-h-28 px-4 py-3 text-sm',
} as const;

const textareaBaseClasses =
  'flex w-full rounded-md border border-input bg-background text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: keyof typeof textareaSizeClasses;
  error?: boolean;
}

/**
 * Zone de texte multiligne.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, size = 'md', error, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(textareaBaseClasses, textareaSizeClasses[size], className)}
      {...(error ? { 'aria-invalid': true } : {})}
      {...props}
    />
  );
});
