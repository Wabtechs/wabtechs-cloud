import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusionne les classes CSS avec clsx puis tailwind-merge.
 * tailwind-merge résout les conflits de classes Tailwind (dernière gagnante).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Alias de clsx (sans tailwind-merge), pour les cas simples. */
export const cx = clsx;

/* ------------------------------------------------------------------ */
/* Types & constantes liées aux locales                                */
/* ------------------------------------------------------------------ */

export type WabtechsLocale = 'fr' | 'en' | 'sw' | 'ln';

export const SUPPORTED_LOCALES: readonly WabtechsLocale[] = ['fr', 'en', 'sw', 'ln'];

export const LOCALE_LABELS: Record<WabtechsLocale, string> = {
  fr: 'Français',
  en: 'English',
  sw: 'Kiswahili',
  ln: 'Lingála',
};

/* ------------------------------------------------------------------ */
/* Formats (internationalisation)                                      */
/* ------------------------------------------------------------------ */

export interface FormatOptions {
  locale?: WabtechsLocale;
}

/** Formate une date selon la locale. */
export function formatDate(date: Date | string | number, options: FormatOptions & Intl.DateTimeFormatOptions = {}): string {
  const { locale = 'fr', ...dateOptions } = options;
  return new Intl.DateTimeFormat(locale, dateOptions).format(toDate(date));
}

/** Formate une durée (jours/heures/min) de façon lisible. */
export function formatDuration(
  ms: number,
  options: { locale?: WabtechsLocale; maxParts?: number } = {},
): string {
  const { locale = 'fr', maxParts = 2 } = options;
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['day', 86_400_000],
    ['hour', 3_600_000],
    ['minute', 60_000],
    ['second', 1000],
  ];
  const parts: string[] = [];
  let remaining = ms;
  for (const [unit, size] of units) {
    if (parts.length >= maxParts) break;
    if (remaining >= size) {
      const value = Math.floor(remaining / size);
      remaining -= value * size;
      parts.push(new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(value, unit));
    }
  }
  return parts.length > 0 ? parts.join(' ') : new Intl.RelativeTimeFormat(locale).format(0, 'second');
}

/** Formate un nombre selon la locale. */
export function formatNumber(
  value: number,
  options: FormatOptions & Intl.NumberFormatOptions = {},
): string {
  const { locale = 'fr', ...numberOptions } = options;
  return new Intl.NumberFormat(locale, numberOptions).format(value);
}

/** Formate une devise selon la locale. */
export function formatCurrency(
  value: number,
  currency = 'CDF',
  options: FormatOptions = {},
): string {
  const { locale = 'fr' } = options;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Formate une taille de fichier (B, KB, MB, GB). */
export function formatBytes(bytes: number, decimals = 1): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const k = 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1);
  const value = i === 0 ? bytes : parseFloat((bytes / k ** i).toFixed(decimals));
  return `${value} ${units[i]}`;
}

/**
 * Pluriel simple par locale.
 * Note : gestion fr (0→singulier), en/sw/ln (0→pluriel).
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string,
  options: { locale?: WabtechsLocale; includeCount?: boolean } = {},
): string {
  const { locale = 'fr', includeCount = true } = options;
  const resolvedPlural = plural ?? `${singular}s`;
  const isSingular = locale === 'fr' ? count === 0 || count === 1 : count === 1;
  const label = isSingular ? singular : resolvedPlural;
  return includeCount ? `${formatNumber(count)} ${label}` : label;
}

/* ------------------------------------------------------------------ */
/* Math & data helpers                                                 */
/* ------------------------------------------------------------------ */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function clampPercentage(value: number): number {
  return clamp(value, 0, 100);
}

export function range(length: number, start = 0, step = 1): number[] {
  return Array.from({ length }, (_, i) => start + i * step);
}

/** Regroupe un tableau par une clé. */
export function groupBy<T>(items: readonly T[], keyFn: (item: T) => string): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of items) {
    const key = keyFn(item);
    (result[key] ??= []).push(item);
  }
  return result;
}

/** Trie un tableau immuablement selon une clé. */
export function sortBy<T>(items: readonly T[], keyFn: (item: T) => string | number): T[] {
  return [...items].sort((a, b) => {
    const ka = keyFn(a);
    const kb = keyFn(b);
    if (ka < kb) return -1;
    if (ka > kb) return 1;
    return 0;
  });
}

/** Découpe un tableau en morceaux de taille donnée. */
export function chunk<T>(items: readonly T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

/** Renvoie les éléments uniques (Set). */
export function unique<T>(items: readonly T[]): T[] {
  return [...new Set(items)];
}

/** Premier élément du tableau (sans lever d'erreur). */
export function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}

/** Dernier élément du tableau. */
export function last<T>(items: readonly T[]): T | undefined {
  return items[items.length - 1];
}

/** Compare deux valeurs par JSON.stringify (utile pour des options). */
export function areEqual<T>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

/* ------------------------------------------------------------------ */
/* DOM & accessibilité                                                 */
/* ------------------------------------------------------------------ */

/** Génère un identifiant unique (fallback d'identifiant accessible). */
export function generateId(prefix = 'wt'): string {
  const random = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);
  return `${prefix}-${random}`;
}

function toDate(date: Date | string | number): Date {
  return date instanceof Date ? date : new Date(date);
}
