import { State } from '@/registry';
import type { DesignTokens } from '@/themes/_base';

// Theme definition with tokens
export type Theme = {
  name: string;
  tokens: DesignTokens;
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

  // Get a token from the current theme
  const token = (category: string, tokenName: string): string => {
    const { themes, currentTheme } = state.val();
    const theme = themes.find((t) => t.name === currentTheme);
    return theme?.tokens[category]?.[tokenName] || '';
  };

  // Reactive token getter
  const $token = (category: string, tokenName: string) => {
    const closure = () => token(category, tokenName);
    closure.sub = state.sub;
    closure.type = '$token';
    return closure;
  };

  return {
    ...state,
    getTheme,
    setTheme,
    token,
    $token,
  };
};
