import * as React from 'react';
import { cn } from '../lib/utils';
import { Icon } from '@wabtechs/icons';
import { Input } from './input';
import { IconButton } from './icon-button';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ className, onSearch, onClear, value, onChange, placeholder = 'Rechercher…', ...props }, ref) {
    const [internalValue, setInternalValue] = React.useState(value ?? '');
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch?.(currentValue as string);
      }
    };

    const handleClear = () => {
      setInternalValue('');
      onClear?.();
      onSearch?.('');
    };

    return (
      <div className="relative">
        <Icon
          name="search"
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          ref={ref}
          type="search"
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn('pl-9 pr-8', className)}
          {...props}
        />
        {currentValue ? (
          <IconButton
            variant="ghost"
            size="icon-sm"
            onClick={handleClear}
            aria-label="Effacer la recherche"
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            <Icon name="x" size={14} />
          </IconButton>
        ) : null}
      </div>
    );
  },
);
