import { a, div, img, span } from '@docs/config';

export const Header = () =>
  div(
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'fontFamily', 'Space Grotesk'],
    ['style', 'justifyContent', 'center'],
    ['style', 'padding', '50px 50px 0'],
    ['style', 'width', '100%'],
    ['style', 'padding', '50px 20px 0'],
    ['style:tablet', 'padding', '50px 50px 0'],
  )(
    a(
      ['attr', 'href', 'https://github.com/linttrapmedia/oem'],
      ['attr', 'target', '_blank'],
      ['style', 'alignItems', 'flex-start'],
      ['style', 'background', 'linear-gradient(45deg, rgba(0,0,0,0.2) 50%, black 50%)'],
      ['style', 'height', '75px'],
      ['style', 'justifyContent', 'flex-end'],
      ['style', 'position', 'absolute'],
      ['style', 'right', 0],
      ['style', 'top', 0],
      ['style', 'width', '75px'],
      ['style', 'display', 'flex'],
    )(
      img(
        ['attr', 'src', 'assets/gfx/github.svg'],
        ['style', 'opacity', 0.5],
        ['style', 'width', '45%'],
        ['style', 'padding', '5px'],
      )(),
    ),
    div(
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'column'],
      ['style', 'gap', '30px'],
      ['style', 'alignItems', 'center'],
      ['style', 'justifyContent', 'center'],
    )(
      div(
        ['style', 'display', 'flex'],
        ['style', 'letterSpacing', '2px'],
        ['style', 'fontSize', '75px'],
        ['style', 'textAlign', 'center'],
        ['style', 'lineHeight', 0.75],
        ['style', 'color', 'black'],
        ['style', 'fontFamily', 'Splash'],
        ['style', 'gap', '5px'],
      )(
        'oem',
        span(
          ['style', 'fontSize', '10px'],
          ['style', 'fontWeight', 'bold'],
          ['style', 'fontFamily', 'monospace'],
          ['style', 'letterSpacing', '0'],
        )('beta'),
      ),
      div(
        ['style', 'fontSize', '52px'],
        ['style', 'lineHeight', 1],
        ['style', 'margin', '0px 20px 10px 20px'],
        ['style', 'borderRadius', '10px'],
        ['style', 'textAlign', 'center'],
        ['style', 'fontSize', '32px'],
        ['style:tablet', 'fontSize', '52px'],
      )('A novel UI library for writing reactive html in vanilla javascript'),
    ),
  );
