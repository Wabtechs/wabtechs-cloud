import * as React from 'react';

/**
 * État synchronisé avec localStorage (SSR-safe, avec cleanup du listener).
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [stored, setStored] = React.useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue: React.Dispatch<React.SetStateAction<T>> = React.useCallback(
    (value) => {
      setStored((prev) => {
        const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(key, JSON.stringify(next));
          } catch {
            // localStorage indisponible (private mode, quota…)
          }
        }
        return next;
      });
    },
    [key],
  );

  React.useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      try {
        if (event.newValue === null) return;
        setStored(JSON.parse(event.newValue) as T);
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [stored, setValue];
}
