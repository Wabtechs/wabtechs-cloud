import * as React from 'react';

/**
 * Valeur debouncée : la valeur retournée ne change qu'après `delay` ms
 * d'inactivité. Utile pour la recherche asynchrone.
 */
export function useDebounceValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return debounced;
}
