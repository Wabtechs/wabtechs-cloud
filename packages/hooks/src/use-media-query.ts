import * as React from 'react';

/**
 * Détecte une media query (SSR-safe).
 *
 * @example const isMobile = useMediaQuery('(max-width: 640px)');
 */
export function useMediaQuery(query: string, options: { defaultValue?: boolean } = {}): boolean {
  const { defaultValue = false } = options;

  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onStoreChange);
      return () => mediaQueryList.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = React.useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = React.useCallback(() => defaultValue, [defaultValue]);

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
