import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  normalizeHotkey,
  useControllableState,
  useDebounceValue,
  useHotkeys,
  useMediaQuery,
  usePrevious,
} from './index';

describe('useDebounceValue', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('retarde la mise à jour de la valeur', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounceValue(value, 300), {
      initialProps: { value: 'a' },
    });

    expect(result.current).toBe('a');

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe('b');
  });
});

describe('useMediaQuery', () => {
  it('retourne le mock matchMedia', () => {
    const { result } = renderHook(() => useMediaQuery('(max-width: 640px)'));
    expect(result.current).toBe(false);
  });
});

describe('usePrevious', () => {
  it('renvoie la valeur précédente', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    });

    expect(result.current).toBeUndefined();
    rerender({ value: 2 });
    expect(result.current).toBe(1);
  });
});

describe('useControllableState', () => {
  it('gère un état non contrôlé', () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 'open' }));
    expect(result.current[0]).toBe('open');
  });

  it('appelle onChange', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 'a', onChange }));
    act(() => result.current[1]('b'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('respecte la valeur contrôlée', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, defaultValue: 'a' }),
      { initialProps: { value: 'x' } },
    );
    expect(result.current[0]).toBe('x');
    rerender({ value: 'y' });
    expect(result.current[0]).toBe('y');
  });
});

describe('normalizeHotkey', () => {
  const fakeEvent = (overrides: Partial<KeyboardEvent>): KeyboardEvent =>
    ({ key: '', ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, ...overrides }) as KeyboardEvent;

  it('matche ctrl+k', () => {
    const matcher = normalizeHotkey('ctrl+k', false);
    expect(matcher(fakeEvent({ key: 'k', ctrlKey: true }))).toBe(true);
    expect(matcher(fakeEvent({ key: 'k' }))).toBe(false);
  });

  it('matche mod+k comme ctrl sur Windows', () => {
    const matcher = normalizeHotkey('mod+k', false);
    expect(matcher(fakeEvent({ key: 'k', ctrlKey: true }))).toBe(true);
    expect(matcher(fakeEvent({ key: 'k', metaKey: true }))).toBe(false);
  });

  it('matche mod+k comme meta sur macOS', () => {
    const matcher = normalizeHotkey('mod+k', true);
    expect(matcher(fakeEvent({ key: 'k', metaKey: true }))).toBe(true);
  });

  it('matche la touche Échap', () => {
    const matcher = normalizeHotkey('esc', false);
    expect(matcher(fakeEvent({ key: 'Escape' }))).toBe(true);
  });
});

describe('useHotkeys', () => {
  it('déclenche le handler sur la touche attendue', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys('mod+k', handler));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('ne déclenche pas le handler sur une autre touche', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys('mod+k', handler));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j', ctrlKey: true }));
    });
    expect(handler).not.toHaveBeenCalled();
  });

  it('respecte l’option enabled', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys('mod+k', handler, { enabled: false }));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    });
    expect(handler).not.toHaveBeenCalled();
  });
});
