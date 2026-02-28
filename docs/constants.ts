// constants.ts
import type { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'setup', label: 'Setup' },
  { id: 'wizard', label: 'Wizard' },
  { id: 'primitives', label: 'Primitives' },
  { id: 'examples', label: 'Examples' },
  { id: 'traits', label: 'Traits' },
  { id: 'states', label: 'States' },
  { id: 'theming', label: 'Theming' },
  { id: 'architecture', label: 'Architecture' },
] as const;

export const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

export const ANIM_DURATION_FAST = 200;
export const ANIM_DURATION_MEDIUM = 400;
export const ANIM_DURATION_SLOW = 800;

export const FONT_MONO =
  "'Fira Code', 'JetBrains Mono', 'SF Mono', 'Cascadia Code', Consolas, monospace";
export const FONT_DISPLAY =
  "'Fira Code', 'JetBrains Mono', 'SF Mono', 'Cascadia Code', Consolas, 'Courier New', monospace";

export const FONT_LOGO = 'Splash';
