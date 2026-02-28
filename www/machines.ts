// machines.ts
import { activeSection, navOpen } from './states';
import { theme } from './theme';
import type { Action } from './types';

export function dispatch(action: Action): void {
  switch (action.type) {
    case 'NAVIGATE': {
      activeSection.set(action.payload.section);
      navOpen.set(false);
      const el = document.getElementById(action.payload.section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      break;
    }
    case 'TOGGLE_THEME': {
      theme.reduce((t: 'light' | 'dark') => (t === 'dark' ? 'light' : 'dark'));
      break;
    }
    case 'TOGGLE_NAV': {
      navOpen.reduce((v) => !v);
      break;
    }
    case 'CLOSE_NAV': {
      navOpen.set(false);
      break;
    }
  }
}

export const $dispatch = (action: Action) => () => dispatch(action);
