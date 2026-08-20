import type { Density } from './types';

export type ThemeColorOverrides = Partial<{
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  primary: string;
  primaryForeground: string;
  primaryHover: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  info: string;
  infoForeground: string;
  border: string;
  input: string;
  ring: string;
}>;

export type RadiusKey = 'sm' | 'md' | 'lg' | 'xl';

export type WabtechsThemeVariables = Record<string, string>;

export interface WabtechsTheme {
  /** Identifiant stable du thème (ex. "bilengi"). */
  id: string;
  /** Nom d'affichage. */
  name: string;
  /** Variables CSS (light) à appliquer sur la racine. */
  variables: WabtechsThemeVariables;
  /** Variables CSS (dark) appliquées en plus en mode sombre. */
  darkVariables?: WabtechsThemeVariables;
}

export interface CreateWabtechsThemeOptions {
  /** Nom d'affichage du thème. */
  name: string;
  /** Couleurs (light). */
  colors?: ThemeColorOverrides;
  /** Couleurs (dark) — optionnel, sinon les tokens dark par défaut s'appliquent. */
  dark?: ThemeColorOverrides;
  /** Rayon de base en rem, ou valeurs par clé. */
  radius?: number | Partial<Record<RadiusKey, string>>;
  /** Typographie. */
  font?: { sans?: string; mono?: string };
  /** Densité UI (ajuste l'unité d'espacement). */
  density?: Density;
  /** Variables additionnelles libres. */
  tokens?: Record<string, string>;
}

const COLOR_VAR_KEYS: Record<keyof ThemeColorOverrides, string> = {
  background: '--wabtechs-background',
  foreground: '--wabtechs-foreground',
  card: '--wabtechs-card',
  cardForeground: '--wabtechs-card-foreground',
  muted: '--wabtechs-muted',
  mutedForeground: '--wabtechs-muted-foreground',
  primary: '--wabtechs-primary',
  primaryForeground: '--wabtechs-primary-foreground',
  primaryHover: '--wabtechs-primary-hover',
  secondary: '--wabtechs-secondary',
  secondaryForeground: '--wabtechs-secondary-foreground',
  accent: '--wabtechs-accent',
  accentForeground: '--wabtechs-accent-foreground',
  destructive: '--wabtechs-destructive',
  destructiveForeground: '--wabtechs-destructive-foreground',
  success: '--wabtechs-success',
  successForeground: '--wabtechs-success-foreground',
  warning: '--wabtechs-warning',
  warningForeground: '--wabtechs-warning-foreground',
  info: '--wabtechs-info',
  infoForeground: '--wabtechs-info-foreground',
  border: '--wabtechs-border',
  input: '--wabtechs-input',
  ring: '--wabtechs-ring',
};

const SPACING_UNITS: Record<Density, string> = {
  compact: '0.2rem',
  comfortable: '0.25rem',
  spacious: '0.3125rem',
};

function toVariables(colors: ThemeColorOverrides | undefined): WabtechsThemeVariables {
  const variables: WabtechsThemeVariables = {};
  for (const [key, value] of Object.entries(colors ?? {}) as Array<
    [keyof ThemeColorOverrides, string]
  >) {
    const cssVar = COLOR_VAR_KEYS[key];
    if (cssVar) variables[cssVar] = value;
  }
  return variables;
}

function radiusVariables(radius: CreateWabtechsThemeOptions['radius']): WabtechsThemeVariables {
  const variables: WabtechsThemeVariables = {};
  if (typeof radius === 'number') {
    variables['--wabtechs-radius-sm'] = `${radius * 0.75}rem`;
    variables['--wabtechs-radius-md'] = `${radius}rem`;
    variables['--wabtechs-radius-lg'] = `${radius * 1.25}rem`;
    variables['--wabtechs-radius-xl'] = `${radius * 1.5}rem`;
  } else if (radius) {
    if (radius.sm) variables['--wabtechs-radius-sm'] = radius.sm;
    if (radius.md) variables['--wabtechs-radius-md'] = radius.md;
    if (radius.lg) variables['--wabtechs-radius-lg'] = radius.lg;
    if (radius.xl) variables['--wabtechs-radius-xl'] = radius.xl;
  }
  return variables;
}

/**
 * Crée un thème Wabtechs (White Label) exportable en variables CSS.
 *
 * @example
 * const bilengi = createWabtechsTheme({
 *   name: 'Bilengi',
 *   colors: { primary: '#0ea5e9', background: '#f8fafc' },
 *   radius: 0.625,
 *   density: 'spacious',
 * });
 */
export function createWabtechsTheme(options: CreateWabtechsThemeOptions): WabtechsTheme {
  const id = options.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const variables: WabtechsThemeVariables = {
    ...toVariables(options.colors),
    ...radiusVariables(options.radius),
    ...(options.tokens ?? {}),
  };
  const darkVariables: WabtechsThemeVariables = toVariables(options.dark);

  if (options.font?.sans) variables['--wabtechs-font-sans'] = options.font.sans;
  if (options.font?.mono) variables['--wabtechs-font-mono'] = options.font.mono;
  if (options.density) variables['--wabtechs-spacing-unit'] = SPACING_UNITS[options.density];

  const theme: WabtechsTheme = {
    id,
    name: options.name,
    variables,
  };

  if (Object.keys(darkVariables).length > 0) {
    theme.darkVariables = darkVariables;
  }

  return theme;
}
