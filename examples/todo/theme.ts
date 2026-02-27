import { useThemeState } from '@/states/ThemeState';
import { darkTheme, lightTheme } from '@/themes';
import type { Theme } from '@/states/ThemeState';

const dark: Theme = { name: 'dark', tokens: darkTheme };
const light: Theme = { name: 'light', tokens: lightTheme };

export const theme = useThemeState([dark, light], 'dark');
