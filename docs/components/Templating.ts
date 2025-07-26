import { div, pre } from '../config';

const Header = (txt: string) => div(['style', 'backgroundColor', 'rgba(0,0,0,0.1)'], ['style', 'padding', '10px'])(txt);
const Cell = (txt: HTMLElement | string) =>
  div(
    ['style', 'padding', '10px'],
    ['style', 'borderBottom', '1px solid rgba(0,0,0,0.1)'],
    ['style', 'fontSize', '13px'],
    ['style:tablet', 'fontSize', '16px'],
  )(txt);

export const Templating = () =>
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
      div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])(`Templating`),
      div(
        ['style', 'opacity', 0.5],
        ['style', 'textAlign', 'center'],
      )(
        `A template is an instance of a templating engine that allows you to create HTML elements with a simple and intuitive syntax.`,
      ),
      div(['style', 'textAlign', 'center'])('Import the HTML function and create an HTML templating engine'),
      pre(['prism'])(`import { HTML } from 'oem';
const tmpl = HTML({...});`),
      div(['style', 'textAlign', 'center'])('You can now generate HTML elements with the templating engine'),
      pre(['prism'])(`tmpl.div()('Hello World!');
// returns <div>Hello World!</div>`),
      div(['style', 'textAlign', 'center'])('Add a trait to the template'),
      pre(['prism'])(`const tmpl = HTML({
  "style": useStyle(),
});`),
      div(['style', 'textAlign', 'center'])('You can now use the trait to add styles to the elements'),
      pre(['prism'])(`div(['style', 'color', 'red'])('Hello World!');
// returns <div style="color: red">Hello World!</div>`),
    ),
  );
