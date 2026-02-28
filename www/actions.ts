// actions.ts
import type { Action, Section } from './types';

export const navigate = (section: Section): Action => ({
  type: 'NAVIGATE',
  payload: { section },
});

export const toggleTheme = (): Action => ({
  type: 'TOGGLE_THEME',
});

export const toggleNav = (): Action => ({
  type: 'TOGGLE_NAV',
});

export const closeNav = (): Action => ({
  type: 'CLOSE_NAV',
});
