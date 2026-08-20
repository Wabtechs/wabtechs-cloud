import * as React from 'react';
import type { WabtechsTheme } from './create-theme';
import type { ResolvedTheme, ThemeName } from './types';

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Thème contrôlé (prioritaire sur l'état interne). */
  theme?: ThemeName;
  /** Thème par défaut en mode non contrôlé. */
  defaultTheme?: ThemeName;
  /** Thèmes White Label disponibles. */
  themes?: WabtechsTheme[];
  /** Identifiant du thème White Label actif. */
  activeThemeId?: string;
  /** Notifié de chaque changement de thème. */
  onThemeChange?: (theme: ThemeName) => void;
  /** Désactive temporairement les transitions pendant un changement de thème. */
  disableTransitionOnChange?: boolean;
}

export interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
  resolvedTheme: ResolvedTheme;
  activeTheme?: WabtechsTheme | undefined;
  themes?: WabtechsTheme[] | undefined;
}

export const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const SYSTEM_QUERY = '(prefers-color-scheme: dark)';

/**
 * Résout le thème système (dark/light) via useSyncExternalStore.
 */
export function useSystemTheme(): ResolvedTheme {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const mediaQueryList = window.matchMedia(SYSTEM_QUERY);
      mediaQueryList.addEventListener('change', onStoreChange);
      return () => mediaQueryList.removeEventListener('change', onStoreChange);
    },
    () => (window.matchMedia(SYSTEM_QUERY).matches ? 'dark' : 'light'),
    () => 'light',
  );
}

function applyVariables(variables: Record<string, string> | undefined): void {
  if (!variables) return;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(variables)) {
    root.style.setProperty(key, value);
  }
}

/**
 * Moteur de thèmes : applique `data-wt-theme` (light/dark/system) sur
 * `<html>` et injecte les variables des thèmes White Label.
 *
 * Aucun DOM propre : ce composant ne rend qu'un contexte.
 */
export function ThemeProvider({
  children,
  theme: themeProp,
  defaultTheme = 'system',
  themes,
  activeThemeId,
  onThemeChange,
  disableTransitionOnChange = false,
}: ThemeProviderProps): React.JSX.Element {
  const [internalTheme, setInternalTheme] = React.useState<ThemeName>(defaultTheme);
  const systemTheme = useSystemTheme();

  const theme: ThemeName = themeProp ?? internalTheme;
  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;

  const activeTheme = React.useMemo(
    () => themes?.find((candidate) => candidate.id === activeThemeId),
    [themes, activeThemeId],
  );

  const setTheme = React.useCallback(
    (next: ThemeName) => {
      setInternalTheme(next);
      onThemeChange?.(next);
    },
    [onThemeChange],
  );

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  React.useEffect(() => {
    const root = document.documentElement;

    if (disableTransitionOnChange) {
      root.classList.add('wt-no-transitions');
      const timeoutId = window.setTimeout(() => {
        root.classList.remove('wt-no-transitions');
      }, 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, [resolvedTheme, disableTransitionOnChange]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-wt-theme', resolvedTheme);

    applyVariables(activeTheme?.variables);
    if (resolvedTheme === 'dark') {
      applyVariables(activeTheme?.darkVariables);
    }
  }, [resolvedTheme, activeTheme]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      resolvedTheme,
      activeTheme,
      themes,
    }),
    [theme, setTheme, toggleTheme, resolvedTheme, activeTheme, themes],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Accède au contexte de thème. Doit être utilisé sous `ThemeProvider`
 * (ou `WabtechsProvider`).
 */
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('[Wabtechs UI] useTheme doit être utilisé sous <ThemeProvider> ou <WabtechsProvider>.');
  }
  return context;
}
