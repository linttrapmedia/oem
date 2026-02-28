import { State } from '@/registry';

type WindowSize = {
  width: number;
  height: number;
};

export const useWindowSizeState = () => {
  const getSize = (): WindowSize => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const state = State<WindowSize>(getSize());

  window.addEventListener('resize', () => state.set(getSize()));

  return state;
};
