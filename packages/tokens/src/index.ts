/**
 * Wabtechs UI — Design Tokens
 *
 * Exposition programmatique des tokens (pour les cas non-CSS : charts,
 * canvas, exports de thème…). Le rendu visuel reste piloté par tokens.css.
 */

export interface WabtechsTokenSpec {
  /** Nom logique du token, ex. "primary" */
  name: string;
  /** Variable CSS, ex. "--wabtechs-primary" */
  cssVar: string;
  /** Valeur par défaut (light) */
  value: string;
  /** Groupe du token */
  group: 'color' | 'spacing' | 'radius' | 'shadow' | 'font' | 'density';
}

export const tokens = [
  // Colors
  { name: 'background', cssVar: '--wabtechs-background', value: '#ffffff', group: 'color' },
  { name: 'foreground', cssVar: '--wabtechs-foreground', value: '#18181b', group: 'color' },
  { name: 'card', cssVar: '--wabtechs-card', value: '#ffffff', group: 'color' },
  { name: 'card-foreground', cssVar: '--wabtechs-card-foreground', value: '#18181b', group: 'color' },
  { name: 'muted', cssVar: '--wabtechs-muted', value: '#f4f4f5', group: 'color' },
  { name: 'muted-foreground', cssVar: '--wabtechs-muted-foreground', value: '#71717a', group: 'color' },
  { name: 'primary', cssVar: '--wabtechs-primary', value: '#842ae3', group: 'color' },
  { name: 'primary-foreground', cssVar: '--wabtechs-primary-foreground', value: '#ffffff', group: 'color' },
  { name: 'primary-hover', cssVar: '--wabtechs-primary-hover', value: '#7323c4', group: 'color' },
  { name: 'secondary', cssVar: '--wabtechs-secondary', value: '#f4f4f5', group: 'color' },
  { name: 'secondary-foreground', cssVar: '--wabtechs-secondary-foreground', value: '#18181b', group: 'color' },
  { name: 'accent', cssVar: '--wabtechs-accent', value: '#f3eafd', group: 'color' },
  { name: 'accent-foreground', cssVar: '--wabtechs-accent-foreground', value: '#5b1fa0', group: 'color' },
  { name: 'destructive', cssVar: '--wabtechs-destructive', value: '#dc2626', group: 'color' },
  { name: 'destructive-foreground', cssVar: '--wabtechs-destructive-foreground', value: '#ffffff', group: 'color' },
  { name: 'success', cssVar: '--wabtechs-success', value: '#059669', group: 'color' },
  { name: 'success-foreground', cssVar: '--wabtechs-success-foreground', value: '#ffffff', group: 'color' },
  { name: 'warning', cssVar: '--wabtechs-warning', value: '#d97706', group: 'color' },
  { name: 'warning-foreground', cssVar: '--wabtechs-warning-foreground', value: '#ffffff', group: 'color' },
  { name: 'info', cssVar: '--wabtechs-info', value: '#2563eb', group: 'color' },
  { name: 'info-foreground', cssVar: '--wabtechs-info-foreground', value: '#ffffff', group: 'color' },
  { name: 'border', cssVar: '--wabtechs-border', value: '#e4e4e7', group: 'color' },
  { name: 'input', cssVar: '--wabtechs-input', value: '#e4e4e7', group: 'color' },
  { name: 'ring', cssVar: '--wabtechs-ring', value: '#842ae3', group: 'color' },

  // Radius
  { name: 'radius-sm', cssVar: '--wabtechs-radius-sm', value: '0.375rem', group: 'radius' },
  { name: 'radius-md', cssVar: '--wabtechs-radius-md', value: '0.5rem', group: 'radius' },
  { name: 'radius-lg', cssVar: '--wabtechs-radius-lg', value: '0.75rem', group: 'radius' },
  { name: 'radius-xl', cssVar: '--wabtechs-radius-xl', value: '1rem', group: 'radius' },

  // Shadows
  { name: 'shadow-sm', cssVar: '--wabtechs-shadow-sm', value: '0 1px 2px 0 rgb(24 24 27 / 0.06)', group: 'shadow' },
  {
    name: 'shadow-md',
    cssVar: '--wabtechs-shadow-md',
    value: '0 4px 6px -1px rgb(24 24 27 / 0.07), 0 2px 4px -2px rgb(24 24 27 / 0.05)',
    group: 'shadow',
  },
  {
    name: 'shadow-lg',
    cssVar: '--wabtechs-shadow-lg',
    value: '0 10px 15px -3px rgb(24 24 27 / 0.08), 0 4px 6px -4px rgb(24 24 27 / 0.05)',
    group: 'shadow',
  },

  // Typographie
  { name: 'font-sans', cssVar: '--wabtechs-font-sans', value: "Inter, system-ui, sans-serif", group: 'font' },
  { name: 'font-mono', cssVar: '--wabtechs-font-mono', value: "JetBrains Mono, monospace", group: 'font' },

  // Densité
  { name: 'spacing-unit', cssVar: '--wabtechs-spacing-unit', value: '0.25rem', group: 'density' },
] as const satisfies readonly WabtechsTokenSpec[];

export type TokenName = (typeof tokens)[number]['name'];

const tokenMap = new Map<string, (typeof tokens)[number]>(tokens.map((t) => [t.name, t]));

/** Retourne la référence CSS `var(--wabtechs-...)` d'un token. */
export function token(name: TokenName): string {
  const spec = tokenMap.get(name);
  if (!spec) {
    throw new Error(`[Wabtechs Tokens] Token inconnu : "${name}"`);
  }
  return `var(${spec.cssVar})`;
}

/** Retourne la variable CSS `--wabtechs-...` d'un token. */
export function cssVar(name: TokenName): string {
  const spec = tokenMap.get(name);
  if (!spec) {
    throw new Error(`[Wabtechs Tokens] Token inconnu : "${name}"`);
  }
  return spec.cssVar;
}
