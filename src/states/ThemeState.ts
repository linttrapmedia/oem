import { State } from '@/registry';

export type Theme = 'light' | 'dark';

export const useThemeState = (theme: Theme) => {
  const state = State<Theme>(theme);
  return state;
};
