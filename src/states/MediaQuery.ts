import { State } from '@/oem';

export const useMediaQueryState = (props: {
  type?: 'screen' | 'print' | 'all';
  minWidth?: number;
  maxWidth?: number;
}) => {
  const { type = 'all', minWidth = 0, maxWidth = Infinity } = props;
  const state = State<boolean>(false);
  const apply = () => {
    const width = window.innerWidth;
    const mediaMatches = width >= minWidth && width <= maxWidth;
    const typeMatches = type === 'all' || window.matchMedia(type).matches;
    state.set(mediaMatches && typeMatches);
  };
  apply();
  window.addEventListener('resize', apply);
  return state;
};
