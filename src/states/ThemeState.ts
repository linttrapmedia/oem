import { State } from '@/registry';
import type { DesignTokens } from '@/themes/tokens';

// Theme definition with tokens
export type Theme = {
  name: string;
  tokens: DesignTokens;
};

// Generate token getter types - function that returns string | number
type TokenGetters<T> = {
  [K in keyof T]: () => string | number;
};

// Generate deferred token getter types - function with sub property
type DeferredTokenGetters<T> = {
  [K in keyof T as `$${string & K}`]: (() => string | number) & { sub: any; type: '$token' };
};

// State structure
type ThemeStateValue = {
  themes: Theme[];
  currentTheme: string;
};

export const ThemeState = (themes: Theme[], initialTheme?: string) => {
  if (themes.length === 0) {
    throw new Error('At least one theme must be provided');
  }

  const initial: ThemeStateValue = {
    themes,
    currentTheme: initialTheme || themes[0].name,
  };

  const state = State<ThemeStateValue>(initial);

  // Get the current theme name
  const getTheme = (): string => {
    return state.val().currentTheme;
  };

  // Set the current theme
  const setTheme = (themeName: string): void => {
    const { themes } = state.val();
    const themeExists = themes.some((theme) => theme.name === themeName);

    if (!themeExists) {
      throw new Error(`Theme "${themeName}" not found`);
    }

    state.reduce((prev) => ({
      ...prev,
      currentTheme: themeName,
    }));
  };

  // Get a token from the current theme by key
  const getToken = (tokenKey: keyof DesignTokens): string | number => {
    const { themes, currentTheme } = state.val();
    const theme = themes.find((t) => t.name === currentTheme);
    return theme?.tokens[tokenKey] ?? '';
  };

  // Base state object
  const baseState = {
    ...state,
    getTheme,
    setTheme,
  };

  // Create a proxy to dynamically generate token getters
  const handler: ProxyHandler<typeof baseState> = {
    get(target, prop: string | symbol) {
      // Convert symbol to string if needed
      if (typeof prop === 'symbol') {
        return Reflect.get(target, prop);
      }

      // Check if it's a base state property first
      if (prop in target) {
        return Reflect.get(target, prop);
      }

      // Handle deferred token getters (starts with $)
      if (prop.startsWith('$')) {
        const tokenKey = prop.slice(1) as keyof DesignTokens;
        const closure = () => getToken(tokenKey);
        closure.sub = state.sub;
        closure.type = '$token';
        return closure;
      }

      // Handle regular token getters
      return () => getToken(prop as keyof DesignTokens);
    },
  };

  return new Proxy(baseState, handler) as typeof baseState &
    TokenGetters<DesignTokens> &
    DeferredTokenGetters<DesignTokens>;
};
