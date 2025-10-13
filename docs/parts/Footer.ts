import { html } from '../config';

const date = new Date();

export const Footer = () =>
  html.div(
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'gap', '50px'],
    ['style', 'justifyContent', 'center'],
  )(
    html.div(
      ['style', 'alignItems', 'center'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'column'],
      ['style', 'fontFamily', 'Space Grotesk'],
      ['style', 'gap', '20px'],
      ['style', 'justifyContent', 'center'],
      ['style', 'width', '100%'],
    )(
      html.div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('OEM'),
      html.div(['style', 'opacity', 0.5], ['style', 'textAlign', 'center'])(
        `©Copyright ${date.getFullYear()} All rights reserved.`,
        ` Made in the USA 🇺🇸 by `,
        html.a(
          ['attr', 'href', 'http://kevinlint.com'],
          ['attr', 'target', '_blank'],
          ['style', 'color', 'black'],
          ['style:mouseover', 'color', 'blue'],
          ['style:mouseout', 'color', 'black'],
        )('Kevin Lint'),
        ` as a product of `,
        html.a(
          ['attr', 'href', 'http://linttrap.media'],
          ['attr', 'target', '_blank'],
          ['style', 'color', 'black'],
          ['style:mouseover', 'color', 'blue'],
          ['style:mouseout', 'color', 'black'],
        )('Lint Trap Media.'),
      ),
    ),
  );
