// machines.ts
import {
  activeSection,
  dialogOpen,
  expandedExamples,
  navOpen,
  primitiveTab,
  toastMessage,
  toastVisible,
} from './states';
import { theme } from './theme';
import type { Action } from './types';

let toastTimer: ReturnType<typeof setTimeout> | null = null;

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
    case 'SET_PRIMITIVE_TAB': {
      primitiveTab.set(action.payload.tab);
      break;
    }
    case 'TOGGLE_EXAMPLE': {
      expandedExamples.reduce((v) => {
        const next = new Set(v);
        next.has(action.payload.index) ? next.delete(action.payload.index) : next.add(action.payload.index);
        return next;
      });
      break;
    }
    case 'SHOW_TOAST': {
      if (toastTimer) clearTimeout(toastTimer);
      toastMessage.set(action.payload.message);
      toastVisible.set(true);
      toastTimer = setTimeout(() => {
        toastVisible.set(false);
        toastTimer = null;
      }, 2000);
      break;
    }
    case 'HIDE_TOAST': {
      if (toastTimer) clearTimeout(toastTimer);
      toastVisible.set(false);
      break;
    }
    case 'OPEN_DIALOG': {
      dialogOpen.set(true);
      break;
    }
    case 'CLOSE_DIALOG': {
      dialogOpen.set(false);
      break;
    }
  }
}

export const $dispatch = (action: Action) => () => dispatch(action);
