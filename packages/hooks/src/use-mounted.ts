import * as React from 'react';

/**
 * Renvoie un booléen qui passe à `true` après le montage du composant
 * (utile pour les composants SSR / hydratation).
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
