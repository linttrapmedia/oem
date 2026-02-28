// constants.ts

import type { Filter } from './types';

export const ANIM_DURATION_FAST = 150;
export const ANIM_DURATION_MEDIUM = 300;
export const ANIM_DURATION_SLOW = 500;
export const ANIM_DURATION_STAGGER = 60;

export const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Done' },
];

export const FONT_PRIMARY =
  "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
export const FONT_MONO = "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace";

export const PLACEHOLDER_TEXT = 'What needs to be done?';

export const EMPTY_MESSAGES: Record<Filter, string> = {
  all: 'No todos yet. Add one above!',
  active: 'No active todos. Nice work!',
  completed: 'No completed todos yet.',
};
