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

  // Custom method: Check if a theme is currently active
  const isCurrentTheme = (themeName: string): boolean => {
    return state.val().currentTheme === themeName;
  };

  // Custom method: Get the current theme object
  const getCurrentTheme = (): Theme | undefined => {
    const { themes, currentTheme } = state.val();
    return themes.find((theme) => theme.name === currentTheme);
  };

  // Custom method: Set the current theme
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

  // Custom method: Select a token from the current theme
  const selectToken = (category: string, tokenName: string): string | undefined => {
    const currentTheme = getCurrentTheme();
    return currentTheme?.tokens[category]?.[tokenName];
  };

  // Custom method: Select a token with fallback
  const selectTokenOr = (category: string, tokenName: string, fallback: string): string => {
    return selectToken(category, tokenName) ?? fallback;
  };

  // Custom method: Get all tokens for the current theme
  const getAllTokens = (): DesignTokens | undefined => {
    return getCurrentTheme()?.tokens;
  };

  // Custom method: Get all available theme names
  const getThemeNames = (): string[] => {
    return state.val().themes.map((theme) => theme.name);
  };

  // Custom method: Add a new theme
  const addTheme = (theme: Theme): void => {
    state.reduce((prev) => ({
      ...prev,
      themes: [...prev.themes, theme],
    }));
  };

  // Custom method: Remove a theme
  const removeTheme = (themeName: string): void => {
    const { themes, currentTheme } = state.val();

    if (themes.length === 1) {
      throw new Error('Cannot remove the last theme');
    }

    if (currentTheme === themeName) {
      throw new Error('Cannot remove the currently active theme');
    }

    state.reduce((prev) => ({
      ...prev,
      themes: prev.themes.filter((theme) => theme.name !== themeName),
    }));
  };

  return {
    ...state,
    isCurrentTheme,
    getCurrentTheme,
    setTheme,
    selectToken,
    selectTokenOr,
    getAllTokens,
    getThemeNames,
    addTheme,
    removeTheme,
  };
};
