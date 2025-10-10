import { a, div } from '../config';

export const Install = () =>
  div(
    ['style', 'flexDirection', 'column'],
    ['style', 'gap', '30px'],
    ['style:tablet', 'flexDirection', 'row'],
    ['style:tablet', 'gap', '30px'],
    ['style:tablet', 'padding', '0px'],
    ['style', 'alignItems', 'center'],
    ['style', 'display', 'flex'],
    ['style', 'fontFamily', 'Space Grotesk'],
    ['style', 'justifyContent', 'center'],
  )(
    div(
      ['style', 'alignItems', 'center'],
      ['style', 'border', '2px solid black'],
      ['style', 'borderRadius', '20px'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'boxShadow', '20px 20px 0px black'],
      ['style', 'display', 'grid'],
      ['style', 'flexWrap', 'wrap'],
      ['style', 'justifyContent', 'center'],
      ['style', 'padding', '20px'],
      ['style', 'textAlign', 'center'],
      ['style', 'width', '100%'],
    )(
      div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('Charter'),
      div(
        ['style', 'padding', '20px 0'],
        ['style', 'opacity', 0.5],
      )(
        `To create a standards-compliant, lightweight DOM library that could serve as a layer-one utility library for building out sophisticated web apps and components.`,
      ),
    ),
    div(
      ['style', 'alignItems', 'center'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'display', 'grid'],
      ['style', 'flexWrap', 'wrap'],
      ['style', 'gap', '20px'],
      ['style', 'justifyContent', 'center'],
      ['style', 'padding', '20px'],
      ['style', 'width', '100%'],
      ['style:tablet', 'borderRight', '1px dashed black'],
      ['style', 'borderRight', 'none'],
      ['style', 'borderBottom', '1px dashed black'],
      ['style:tablet', 'borderBottom', 'none'],
    )(
      div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('Install'),
      div(['prism'])(`npm i @linttrap/oem`),
      div(
        ['style', 'opacity', 0.35],
        ['style', 'fontSize', '14px'],
        ['style', 'textAlign', 'center'],
      )(
        'Or download with unpkg at ',
        a(
          ['attr', 'href', 'https://unpkg.com/@linttrap/oem@latest/dist/oem.min.js'],
          ['attr', 'target', '_blank'],
        )('unpkg'),
      ),
    ),
  );
