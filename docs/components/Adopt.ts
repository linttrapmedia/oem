import { a, div, el } from '../config';

const myButton = document.createElement('button');

export const Adopt = () =>
  div(
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'gap', '50px'],
    ['style', 'justifyContent', 'center'],
  )(
    div(
      ['style', 'alignItems', 'center'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'column'],
      ['style', 'fontFamily', 'Space Grotesk'],
      ['style', 'gap', '20px'],
      ['style', 'justifyContent', 'center'],
      ['style', 'width', '100%'],
    )(
      div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('Adopting Elements'),
      div(['style', 'opacity', 0.5], ['style', 'textAlign', 'center'])(
        `OEM also allows you to adopt elements into its callback pipeline. This is useful for integrating OEM into existing projects, manipulating the DOM or for building out custom components. See the `,
        a(['attr', 'href', 'https://domx.js.org'], ['attr', 'target', '_blank'])('domx'),
        ` library for examples`,
      ),
      div(['prism'])(`const { el } = HTML({ style: useStyle() });
const myButton = document.getElementById('#my-button');

el(myButton)(
  ['click', () => alert('Hello World')],
  ['style', 'backgroundColor', 'black'],
  ['style', 'borderRadius', '4px'],
  ['style', 'border', 'none'],
  ['style', 'color', 'white'],
  ['style', 'cursor', 'pointer'],
  ['style', 'fontSize', '18px'],
  ['style', 'padding', '10px 20px'],
  ['style:mouseover', 'backgroundColor', 'red'],
  ['style:mouseout', 'backgroundColor', 'black'],
)();`),

      el(myButton)(
        ['click', () => alert('Click works!')],
        ['style', 'backgroundColor', 'black'],
        ['style', 'borderRadius', '4px'],
        ['style', 'border', 'none'],
        ['style', 'color', 'white'],
        ['style', 'cursor', 'pointer'],
        ['style', 'fontSize', '18px'],
        ['style', 'padding', '10px 20px'],
        ['style:mouseover', 'backgroundColor', 'red'],
        ['style:mouseout', 'backgroundColor', 'black'],
      )('Hello World'),
    ),
  );
