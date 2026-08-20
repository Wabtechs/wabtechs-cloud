import * as React from 'react';
import { useControllableState } from '@wabtechs/hooks';
import {
  ThemeProvider,
  useTheme,
  type Density,
  type Direction,
  type ThemeName,
  type WabtechsLocale,
  type WabtechsTheme,
} from '@wabtechs/themes';

export interface DensityContextValue {
  density: Density;
  setDensity: (density: Density) => void;
}

const DensityContext = React.createContext<DensityContextValue | null>(null);

export interface LocaleContextValue {
  locale: WabtechsLocale;
  setLocale: (locale: WabtechsLocale) => void;
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

export interface DirectionContextValue {
  dir: Direction;
  setDirection: (dir: Direction) => void;
}

const DirectionContext = React.createContext<DirectionContextValue | null>(null);

export interface WabtechsProviderProps {
  children: React.ReactNode;

  /** Thème (contrôlé) : light | dark | system. */
  theme?: ThemeName;
  /** Thème par défaut (non contrôlé). */
  defaultTheme?: ThemeName;
  /** Thèmes White Label disponibles (createWabtechsTheme). */
  themes?: WabtechsTheme[];
  /** Identifiant du thème White Label actif. */
  activeThemeId?: string;
  onThemeChange?: (theme: ThemeName) => void;
  /** Désactive les transitions pendant un changement de thème. */
  disableTransitionOnChange?: boolean;

  /** Densité UI (contrôlée) : compact | comfortable | spacious. */
  density?: Density;
  /** Densité par défaut. */
  defaultDensity?: Density;
  onDensityChange?: (density: Density) => void;

  /** Locale : fr | en | sw | ln. */
  locale?: WabtechsLocale;
  /** Locale par défaut. */
  defaultLocale?: WabtechsLocale;
  onLocaleChange?: (locale: WabtechsLocale) => void;

  /** Direction d'écriture (RTL prêt). */
  dir?: Direction;
  onDirChange?: (dir: Direction) => void;
}

/**
 * Provider racine de Wabtechs UI.
 *
 * Gère : thème (light/dark/system + White Label), densité UI, locale,
 * direction (RTL). N'ajoute aucun DOM : il fournit des contextes et
 * pilote les attributs (`data-wt-theme`, `data-wt-density`, `lang`, `dir`)
 * sur `<html>`.
 *
 * @example
 * <WabtechsProvider theme="system" locale="fr" density="comfortable">
 *   <App />
 * </WabtechsProvider>
 */
export function WabtechsProvider({
  children,
  theme,
  defaultTheme,
  themes,
  activeThemeId,
  onThemeChange,
  disableTransitionOnChange,
  density: densityProp,
  defaultDensity = 'comfortable',
  onDensityChange,
  locale: localeProp,
  defaultLocale = 'fr',
  onLocaleChange,
  dir: dirProp,
  defaultDir = 'ltr',
  onDirChange,
}: WabtechsProviderProps): React.JSX.Element {
  const [density, setDensityState] = useControllableState<Density>({
    value: densityProp,
    defaultValue: defaultDensity,
    onChange: onDensityChange,
  });

  const [locale, setLocaleState] = useControllableState<WabtechsLocale>({
    value: localeProp,
    defaultValue: defaultLocale,
    onChange: onLocaleChange,
  });

  const [dir, setDirectionState] = useControllableState<Direction>({
    value: dirProp,
    defaultValue: defaultDir,
    onChange: onDirChange,
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-wt-density', density);
  }, [density]);

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
  }, [locale]);

  React.useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
  }, [dir]);

  const densityValue = React.useMemo(
    () => ({ density, setDensity: setDensityState }),
    [density, setDensityState],
  );

  const localeValue = React.useMemo(
    () => ({ locale, setLocale: setLocaleState }),
    [locale, setLocaleState],
  );

  const directionValue = React.useMemo(
    () => ({ dir, setDirection: setDirectionState }),
    [dir, setDirectionState],
  );

  return (
    <ThemeProvider
      theme={theme}
      defaultTheme={defaultTheme}
      themes={themes}
      activeThemeId={activeThemeId}
      onThemeChange={onThemeChange}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      <DensityContext.Provider value={densityValue}>
        <LocaleContext.Provider value={localeValue}>
          <DirectionContext.Provider value={directionValue}>{children}</DirectionContext.Provider>
        </LocaleContext.Provider>
      </DensityContext.Provider>
    </ThemeProvider>
  );
}

function useContextGuard<T>(context: React.Context<T | null>, hookName: string): T {
  const value = React.useContext(context);
  if (!value) {
    throw new Error(
      `[Wabtechs UI] ${hookName} doit être utilisé sous <WabtechsProvider>.`,
    );
  }
  return value;
}

/** Accède à la densité UI courante. */
export function useDensity(): DensityContextValue {
  return useContextGuard(DensityContext, 'useDensity');
}

/** Accède à la locale courante. */
export function useLocale(): LocaleContextValue {
  return useContextGuard(LocaleContext, 'useLocale');
}

/** Accède à la direction d'écriture courante. */
export function useDirection(): DirectionContextValue {
  return useContextGuard(DirectionContext, 'useDirection');
}

/**
 * Accède à la configuration complète de Wabtechs UI
 * (thème + densité + locale + direction).
 */
export function useWabtechs(): DensityContextValue &
  LocaleContextValue &
  DirectionContextValue & {
    theme: ReturnType<typeof useTheme>['theme'];
    setTheme: ReturnType<typeof useTheme>['setTheme'];
    toggleTheme: ReturnType<typeof useTheme>['toggleTheme'];
    resolvedTheme: ReturnType<typeof useTheme>['resolvedTheme'];
  } {
  const density = useDensity();
  const locale = useLocale();
  const direction = useDirection();
  const theme = useTheme();
  return { ...density, ...locale, ...direction, ...theme };
}
