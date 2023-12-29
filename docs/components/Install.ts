import { div } from '@docs/config';
import { Code } from './Code';

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
      div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('Why?'),
      div(
        ['style', 'padding', '20px 0'],
        ['style', 'opacity', 0.5],
      )(
        `I wanted a standards-compliant, reliable, unchanging, lightweight reactive dom library that could serve as a layer one utility library to build out a suite of self-contained web components.`,
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
      div(['style', 'opacity', 0.5], ['style', 'textAlign', 'center'])('(Install the typescript library.)'),
      div(['prism'])(`npm i @linttrap/oem`),
      div()('Also available on CND at unpkg:', Code('https://unpkg.com/@linttrap/oem/dist/oem.min.js')),
    ),
  );
