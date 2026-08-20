import { describe, expect, it } from 'vitest';
import {
  areEqual,
  chunk,
  clamp,
  cn,
  first,
  formatBytes,
  formatCurrency,
  formatDate,
  formatNumber,
  groupBy,
  last,
  pluralize,
  range,
  sortBy,
  unique,
} from './index';

describe('cn', () => {
  it('fusionne les classes clsx', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c');
  });

  it('résout les conflits tailwind-merge', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('accepte les objets conditionnels', () => {
    expect(cn({ 'is-active': true, hidden: false })).toBe('is-active');
  });
});

describe('formatNumber', () => {
  it('formate en français', () => {
    expect(formatNumber(1234.5)).toBe('1\u202f234,5');
  });

  it('formate en anglais', () => {
    expect(formatNumber(1234.5, { locale: 'en' })).toBe('1,234.5');
  });
});

describe('formatCurrency', () => {
  it('formate en CDF', () => {
    expect(formatCurrency(1500, 'CDF')).toContain('1');
    expect(formatCurrency(1500, 'CDF')).toContain('500');
  });
});

describe('formatDate', () => {
  it('formate une date ISO', () => {
    expect(formatDate('2024-01-15T10:00:00Z', { dateStyle: 'short' })).toBe('15/01/2024');
  });
});

describe('formatBytes', () => {
  it('formate les octets', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1024 * 1024)).toBe('1 MB');
  });
});

describe('pluralize', () => {
  it('français : 0 et 1 au singulier', () => {
    expect(pluralize(0, 'utilisateur', { locale: 'fr' })).toBe('0 utilisateur');
    expect(pluralize(1, 'utilisateur', { locale: 'fr' })).toBe('1 utilisateur');
    expect(pluralize(2, 'utilisateur', { locale: 'fr' })).toBe('2 utilisateurs');
  });

  it('anglais : seul 1 au singulier', () => {
    expect(pluralize(1, 'user', { locale: 'en' })).toBe('1 user');
    expect(pluralize(0, 'user', { locale: 'en' })).toBe('0 users');
  });

  it('sans count', () => {
    expect(pluralize(2, 'user', undefined, { locale: 'en', includeCount: false })).toBe('users');
  });
});

describe('data helpers', () => {
  it('clamp', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
  });

  it('range', () => {
    expect(range(3)).toEqual([0, 1, 2]);
    expect(range(3, 5, 2)).toEqual([5, 7, 9]);
  });

  it('groupBy', () => {
    const items = [
      { cat: 'a', n: 1 },
      { cat: 'b', n: 2 },
      { cat: 'a', n: 3 },
    ];
    expect(groupBy(items, (i) => i.cat)).toEqual({
      a: [
        { cat: 'a', n: 1 },
        { cat: 'a', n: 3 },
      ],
      b: [{ cat: 'b', n: 2 }],
    });
  });

  it('sortBy', () => {
    expect(sortBy([3, 1, 2], (n) => n)).toEqual([1, 2, 3]);
    expect(sortBy([3, 1, 2], (n) => n)).not.toBe([3, 1, 2]);
  });

  it('chunk', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('unique / first / last', () => {
    expect(unique([1, 1, 2, 3, 3])).toEqual([1, 2, 3]);
    expect(first([1, 2, 3])).toBe(1);
    expect(last([1, 2, 3])).toBe(3);
  });

  it('areEqual', () => {
    expect(areEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(areEqual({ a: 1 }, { a: 2 })).toBe(false);
  });
});
