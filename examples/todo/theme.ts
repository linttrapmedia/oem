// ─── Theme ───────────────────────────────────────────────────────────────────

import type { Theme } from '../../src/states/ThemeState';
import { useThemeState } from '../../src/states/ThemeState';
import { darkTheme } from '../../src/themes/dark';

const myDarkTheme: Theme = { name: 'dark', tokens: darkTheme };

export const theme = useThemeState([myDarkTheme]);
