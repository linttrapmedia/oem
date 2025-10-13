import pkg from '../../package.json';
import { html, menuOpen, menuState, MenuStateTypes } from '../config';

const Item = (txt: string, stateKey: MenuStateTypes) =>
  html.div(
    ['style', 'padding', '10px 20px'],
    ['style', 'cursor', 'pointer'],
    ['style', 'transition', 'background-color 0.3s'],
    ['style', 'textTransform', 'uppercase'],
    ['click', menuState.cb('reduce', () => stateKey)],
    ['style:menu', 'color', 'yellow', menuState.cb('eq', stateKey)],
    ['style:menu', 'color', 'white', menuState.cb('neq', stateKey)],
  )(txt);

export const Menu = () =>
  html.div(
    ['style', 'backgroundColor', 'black'],
    ['style', 'color', 'white'],
    ['style', 'padding', '10px'],
    ['style', 'fontWeight', 'bold'],
    ['style', 'fontFamily', 'monospace'],
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'alignItems', 'center'],
    ['style', 'justifyContent', 'center'],
    ['style', 'textAlign', 'center'],
    [
      'html:menu',
      () => [
        html.div(
          ['style', 'position', 'absolute'],
          ['style', 'top', '10px'],
          ['style', 'right', '10px'],
          ['style', 'cursor', 'pointer'],
          ['style', 'fontSize', '11px'],
          ['style', 'textTransform', 'uppercase'],
          ['style', 'padding', '5px'],
          ['style', 'opacity', '0.5'],
          ['style', 'display', 'flex'],
          ['style:tablet', 'display', 'none'],
          ['click', menuOpen.cb('reduce', (o) => !o)],
        )('menu'),
        html.div(
          ['style', 'display', 'flex'],
          ['style', 'flexDirection', 'column'],
          ['style', 'alignItems', 'center'],
          ['style', 'justifyContent', 'center'],
          ['style', 'position', 'relative'],
        )(
          html.div(
            ['style', 'display', 'flex'],
            ['style', 'letterSpacing', '2px'],
            ['style', 'fontSize', '40px'],
            ['style', 'textAlign', 'left'],
            ['style', 'lineHeight', 0.75],
            ['style', 'color', 'white'],
            ['style', 'fontFamily', 'Splash'],
            ['style', 'gap', '5px'],
            ['style', 'fontWeight', 'normal'],
          )(
            'oem',
            html.span(
              ['style', 'fontSize', '10px'],
              ['style', 'fontWeight', 'bold'],
              ['style', 'fontFamily', 'monospace'],
              ['style', 'letterSpacing', '0'],
              ['style', 'color', 'yellow'],
            )(pkg.version),
          ),
        ),
        html.div(
          ['style', 'display', 'flex'],
          ['style', 'flexDirection', 'column'],
          ['style', 'justifyContent', 'center'],
          ['style:menu_toggle', 'display', 'none', menuOpen.cb('eq', false)],
          ['style:menu_toggle', 'display', 'flex', menuOpen.cb('eq', true)],
          ['style:tablet', 'display', 'flex'],
          ['style', 'paddingTop', '20px'],
        )(
          Item('Intro', 'introduction'),
          Item('Templates', 'templates'),
          Item('Traits', 'traits'),
          Item('State', 'state'),
          Item('Patterns', 'patterns'),
          Item('Kits', 'kits'),
        ),
      ],
    ],
  )();
