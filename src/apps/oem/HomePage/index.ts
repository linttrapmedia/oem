import { HSLA } from '../config';
import { Banner } from './Banner';
import { CleanCode } from './CleanCode';
import { Footer } from './Footer';
import { GoEasy } from './GoEasy';
import { Hero } from './Hero';
import { Menu } from './Menu';

export const HomePage = () => {
  return DIV.backgroundColor(HSLA.primary)
    .column(20, 'center', 'start')
    .style('minHeight', '100vh')
    .style('fontFamily', 'sans-serif')
    .append(
      COMMENT('Banner Section'),
      Banner(),
      COMMENT('Menu Section'),
      Menu(),
      COMMENT('Hero Section'),
      Hero(),
      COMMENT('Clean Code Section'),
      CleanCode(),
      COMMENT('Go Easy Section'),
      GoEasy(),
      COMMENT('Footer Section'),
      Footer(),
    );
};
