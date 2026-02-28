// constants.ts
import type { Filter } from './types';

export const STORAGE_KEY: string = 'oem-todo-app';

export const FILTER_OPTIONS: readonly Filter[] = ['all', 'active', 'completed'] as const;

export const KEYBOARD = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
} as const;
