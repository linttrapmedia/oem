// actions.ts
import type { Action, PrimitiveTab, Section } from './types';

export const navigate = (section: Section): Action => ({
  type: 'NAVIGATE',
  payload: { section },
});

export const toggleTheme = (): Action => ({ type: 'TOGGLE_THEME' });
export const toggleNav = (): Action => ({ type: 'TOGGLE_NAV' });
export const closeNav = (): Action => ({ type: 'CLOSE_NAV' });

export const setPrimitiveTab = (tab: PrimitiveTab): Action => ({
  type: 'SET_PRIMITIVE_TAB',
  payload: { tab },
});

export const toggleExample = (index: number): Action => ({
  type: 'TOGGLE_EXAMPLE',
  payload: { index },
});

export const showToast = (message: string): Action => ({
  type: 'SHOW_TOAST',
  payload: { message },
});

export const hideToast = (): Action => ({ type: 'HIDE_TOAST' });
export const openDialog = (): Action => ({ type: 'OPEN_DIALOG' });
export const closeDialog = (): Action => ({ type: 'CLOSE_DIALOG' });
