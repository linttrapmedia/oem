// types.ts

export type Section =
  | 'hero'
  | 'philosophy'
  | 'setup'
  | 'primitives'
  | 'examples'
  | 'traits'
  | 'states'
  | 'theming'
  | 'architecture';

export type PrimitiveTab = 'element' | 'trait' | 'state';

export type NavItem = {
  id: Section;
  label: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: string;
};

export type CodeExample = {
  title: string;
  description: string;
  code: string;
  language: string;
};

export type TraitDoc = {
  name: string;
  signature: string;
  description: string;
};

export type StateDoc = {
  name: string;
  signature: string;
  description: string;
};

export type Action =
  | { type: 'NAVIGATE'; payload: { section: Section } }
  | { type: 'TOGGLE_THEME' }
  | { type: 'TOGGLE_NAV' }
  | { type: 'CLOSE_NAV' }
  | { type: 'SET_PRIMITIVE_TAB'; payload: { tab: PrimitiveTab } }
  | { type: 'TOGGLE_EXAMPLE'; payload: { index: number } }
  | { type: 'SHOW_TOAST'; payload: { message: string } }
  | { type: 'HIDE_TOAST' }
  | { type: 'OPEN_DIALOG' }
  | { type: 'CLOSE_DIALOG' };
