import { HomePage } from './views/HomePage';
import { OverviewPage } from './views/OverviewPage';

export const ROUTER: Record<string, any> = {
  home: HomePage,
  overview: OverviewPage,
};

export const HSLA = {
  primary: 'hsla(40, 3%, 17%, 1)',
  secondary: 'hsla(205, 81%, 76%, 1)',
  accent: 'hsla(313, 100%, 72%, 1)',
  white: 'hsla(0, 0, 100%, 1)',
  black: 'hsla(0, 0%, 0%, 1)',
};

export const PAGE_WIDTH = 1200;
