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
  | { type: 'CLOSE_NAV' };
