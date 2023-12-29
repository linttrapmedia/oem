import { div } from 'docs/config';
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
      div(['style', 'padding', '20px 0'], ['style', 'opacity', 0.5])(
        `Are you sick of modern UI libraries' false promises of simplicity only to open up a codebase and find hell on earth? And what about the source code of those frameworks? Got those down? Can we not use simple software patterns to do the same things? Yep, we can, it's called `,
        Code('oem'),
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
      div(['style', 'opacity', 0.5], ['style', 'textAlign', 'center'])(
        '(Install the typescript library. Or via CDN @ ',
        Code('unpkg.com/@linttrap/oem'),
        ' more details below',
        ')',
      ),
      div(['prism'])(`npm i @linttrap/oem`),
    ),
  );
