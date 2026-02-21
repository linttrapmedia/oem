import { ThemeState, type Theme } from '@/states/ThemeState';
import { darkTheme, lightTheme } from '@/themes';

// Register all available themes
const availableThemes: Theme[] = [
  { name: 'light', tokens: lightTheme },
  { name: 'dark', tokens: darkTheme },
];

// Create singleton instance - globally available
export const theme = ThemeState(availableThemes, 'light');
