import * as React from 'react';

type Target = Window | Document | HTMLElement | null | undefined;

export type EventTargetRef = React.RefObject<Target | null>;

function resolveTarget(target: Target | EventTargetRef): Target {
  if (target && 'current' in target) {
    return target.current;
  }
  return target;
}

/**
 * Attache un event listener à une cible (window/document/élément),
 * en gérant proprement le cleanup.
 */
export function useEventListener<K extends keyof DocumentEventMap>(
  target: Target | EventTargetRef,
  event: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions | boolean,
): void {
  const handlerRef = React.useRef(handler);

  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const resolved = resolveTarget(target);
    if (!resolved) return;

    const listener = (event: DocumentEventMap[K]) => handlerRef.current(event);
    resolved.addEventListener(event, listener as EventListener, options);
    return () => resolved.removeEventListener(event, listener as EventListener, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, event, options]);
}
