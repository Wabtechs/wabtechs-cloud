import * as React from 'react';

export function useIsomorphicLayoutEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
): void {
  const isBrowser = typeof window !== 'undefined';
  const hook = isBrowser ? React.useLayoutEffect : React.useEffect;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  hook(effect, deps);
}
