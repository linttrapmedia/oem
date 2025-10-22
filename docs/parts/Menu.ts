import { useEvent } from '@/factory/traits/Event';
import { useStyle } from '@/factory/traits/Style';
import { HTML, State } from '@/index';
import pkg from '../../package.json';
import { html, menuOpen, menuState, MenuStateTypes } from '../config';

const Item = (txt: string, stateKey: MenuStateTypes) => {
  const hovered = State(false);
  const tmpl = HTML({
    click: useEvent({ event: 'click' }),
    mouseover: useEvent({ event: 'mouseover' }),
    mouseout: useEvent({ event: 'mouseout' }),
    style: useStyle({ state: [hovered, menuState] }),
  });

  return tmpl.div(
    ['style', 'padding', '10px 20px'],
    ['style', 'cursor', 'pointer'],
    ['style', 'transition', 'background-color 0.3s'],
    ['style', 'textTransform', 'uppercase'],
    ['click', menuState.$set(stateKey)],
    ['style', 'color', 'yellow', hovered.$test(true)],
    ['style', 'color', 'white', hovered.$test(false)],
    ['style', 'color', 'yellow', menuState.test(stateKey)],
    ['mouseover', hovered.$set(true)],
    ['mouseout', hovered.$set(false)],
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
      'html:menu',
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
          ['style', 'display', 'flex'],
          ['style:tablet', 'display', 'none'],
          ['click', menuOpen.$reduce((o) => !o)],
          ['html:menu_toggle', () => '-', menuOpen.$test(true)],
          ['html:menu_toggle', () => '=', menuOpen.$test(false)],
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
          ['style:menu_toggle', 'display', 'none', menuOpen.$test(false)],
          ['style:menu_toggle', 'display', 'flex', menuOpen.$test(true)],
          ['style:tablet', 'display', 'flex'],
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
