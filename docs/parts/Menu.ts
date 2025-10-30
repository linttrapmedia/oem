import { State } from '@/index';
import pkg from '../../package.json';
import { html, isMobile, isTablet, menuOpen, menuState, MenuStateTypes } from '../config';

const Item = (txt: string, stateKey: MenuStateTypes) => {
  const hovered = State(false);

  return html.div(
    ['style', 'padding', '10px 20px'],
    ['style', 'cursor', 'pointer'],
    ['style', 'transition', 'background-color 0.3s'],
    ['style', 'textTransform', 'uppercase'],
    ['style', 'color', 'yellow', true, hovered, menuState],
    ['style', 'color', 'white', () => hovered.test(false) && menuState.test(stateKey, false), hovered, menuState],
    ['event', 'click', menuState.$set(stateKey)],
    ['event', 'mouseover', hovered.$set(true)],
    ['event', 'mouseout', hovered.$set(false)],
  )(txt);
};

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
      'html',
      () => [
        html.div(
          ['style', 'position', 'absolute'],
          ['style', 'top', '10px'],
          ['style', 'right', '10px'],
          ['style', 'cursor', 'pointer'],
          ['style', 'fontSize', '21px'],
          ['style', 'textTransform', 'uppercase'],
          ['style', 'padding', '5px'],
          ['style', 'opacity', '0.5'],
          ['style', 'display', 'flex', isMobile.val, isMobile],
          ['style', 'display', 'none', isTablet.val, isTablet],
          ['event', 'click', menuOpen.$reduce((o) => !o)],
          ['html', () => '-', menuOpen.$test(true), menuOpen],
          ['html', () => '=', menuOpen.$test(false), menuOpen],
        )(),
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
          ['style', 'display', 'none', () => isMobile.val() && !menuOpen.val(), menuOpen, isMobile],
          ['style', 'display', 'flex', () => isTablet.val() || menuOpen.val(), menuOpen, isTablet],
          ['style', 'paddingTop', '20px'],
        )(
          Item('Intro', 'introduction'),
          Item('Docs', 'docs'),
          Item('Templates', 'templates'),
          Item('Traits', 'traits'),
          Item('State', 'state'),
          Item('Patterns', 'patterns'),
          Item('Factory', 'factory'),
          html.a(
            ['style', 'marginTop', '20px'],
            ['style', 'color', 'white'],
            ['style', 'padding', '10px'],
            ['style', 'textDecoration', 'none'],
            ['style', 'border', '1px solid rgba(255,255,255,0.2)'],
            ['attr', 'href', 'https://github.com/linttrapmedia/oem'],
            ['attr', 'target', '_blank'],
          )('GITHUB'),
        ),
      ],
    ],
  )();
