/**
 * Types partagés du système de thèmes Wabtechs UI.
 */

export type ThemeName = 'light' | 'dark' | 'system';

export type ResolvedTheme = 'light' | 'dark';

export type Density = 'compact' | 'comfortable' | 'spacious';

export type WabtechsLocale = 'fr' | 'en' | 'sw' | 'ln';

export type Direction = 'ltr' | 'rtl';

export const DENSITIES: readonly Density[] = ['compact', 'comfortable', 'spacious'];

export const LOCALES: readonly WabtechsLocale[] = ['fr', 'en', 'sw', 'ln'];

export function isDensity(value: unknown): value is Density {
  return DENSITIES.includes(value as Density);
}
