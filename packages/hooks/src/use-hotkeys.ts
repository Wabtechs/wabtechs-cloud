import * as React from 'react';
import { useEventListener } from './use-event-listener';

export type Hotkeys = string | readonly string[];

export interface HotkeyOptions {
  /** Si `false`, les raccourcis sont désactivés. */
  enabled?: boolean;
  /** Empêche le comportement par défaut du navigateur. */
  preventDefault?: boolean;
}

const MODIFIER_ALIASES: Record<string, keyof KeyboardEvent> = {
  mod: 'metaKey',
  cmd: 'metaKey',
  command: 'metaKey',
  ctrl: 'ctrlKey',
  control: 'ctrlKey',
  alt: 'altKey',
  option: 'altKey',
  shift: 'shiftKey',
};

/**
 * Normalise une touche ("mod+k", "ctrl+shift+arrowup"…).
 * `mod` = Cmd sur macOS, Ctrl ailleurs.
 */
export function normalizeHotkey(hotkey: string, isMac: boolean): (event: KeyboardEvent) => boolean {
  const parts = hotkey
    .toLowerCase()
    .split('+')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) return () => false;

  const key = parts[parts.length - 1] as string;
  const modifiers = parts.slice(0, -1);

  return (event: KeyboardEvent) => {
    const expectedMods = new Set(
      modifiers.map((mod) => {
        const alias = MODIFIER_ALIASES[mod];
        if (!alias) return undefined;
        if (mod === 'mod' || mod === 'cmd' || mod === 'command') {
          return isMac ? 'metaKey' : 'ctrlKey';
        }
        return alias;
      }),
    );

    const pressedMods = new Set<keyof KeyboardEvent>();
    if (event.ctrlKey) pressedMods.add('ctrlKey');
    if (event.metaKey) pressedMods.add('metaKey');
    if (event.altKey) pressedMods.add('altKey');
    if (event.shiftKey) pressedMods.add('shiftKey');

    if (expectedMods.size !== pressedMods.size) return false;
    for (const mod of expectedMods) {
      if (!mod || !pressedMods.has(mod)) return false;
    }

    const eventKey = event.key.toLowerCase();
    if (key === 'esc') return eventKey === 'escape';
    if (key === 'space') return eventKey === ' ';
    return eventKey === key;
  };
}

/**
 * Raccourcis clavier globaux. Compatible `⌘K` / `Ctrl K` (Command Palette).
 *
 * @example useHotkeys(['mod+k', 'ctrl+k'], () => openPalette());
 */
export function useHotkeys(hotkeys: Hotkeys, handler: (event: KeyboardEvent) => void, options: HotkeyOptions = {}): void {
  const { enabled = true, preventDefault = true } = options;
  const handlerRef = React.useRef(handler);

  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const isMac = React.useMemo(
    () => typeof navigator !== 'undefined' && /mac|iphone|ipad|ipod/i.test(navigator.platform),
    [],
  );

  const matchers = React.useMemo(() => {
    const list = Array.isArray(hotkeys) ? hotkeys : [hotkeys];
    return list.map((h) => normalizeHotkey(h, isMac));
  }, [hotkeys, isMac]);

  useEventListener(
    typeof window !== 'undefined' ? window : undefined,
    'keydown',
    (event) => {
      if (!enabled) return;
      const matches = matchers.some((matcher) => matcher(event));
      if (!matches) return;
      if (preventDefault) event.preventDefault();
      handlerRef.current(event);
    },
    { passive: false },
  );
}
