import * as React from 'react';

/**
 * Renvoie la valeur précédente d'un état (pattern classique).
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T | undefined>(undefined);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
