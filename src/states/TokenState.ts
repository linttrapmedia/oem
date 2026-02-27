import { State, StateType } from '@/registry';
import { Theme } from './ThemeState';

export const useTokenState = <T>(lightVal: T, darkVal: T, themeState: StateType<Theme, {}>) => {
  const getVal = () => (themeState.val() === 'light' ? lightVal : darkVal);
  const state = State<T>(getVal());
  themeState.sub((t) => state.set(getVal()));
  return state;
};
