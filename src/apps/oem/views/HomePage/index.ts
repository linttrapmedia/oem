import { DIV } from '@oem';
import { HSLA } from '../../config';
import { Banner } from './Banner';
import { Hero } from './Hero';
import { Menu } from './Menu';

export const HomePage = () => {
  return DIV.backgroundColor(HSLA.primary)
    .column(20, 'center', 'start')
    .style('minHeight', '100vh')
    .style('fontFamily', 'sans-serif')
    .append(
      Banner(),
      Menu(),
      Hero(),
      // CleanCode(),
      // GoEasy(),
      // Footer(),
    );
};
