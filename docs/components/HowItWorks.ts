import { a, div, pre } from '../config';

export const HowItWorks = () =>
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
      div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('How It Works'),
      div(['style', 'opacity', 0.5], ['style', 'textAlign', 'center'])(
        `OEM works by introducing the idea of creating your own template engine(s) which exist as a middle layer between your state and your DOM. The result is small units of code that follow the "Locality of Behavior" principle (code behavior is defined close to where it is used). `,
        a(['attr', 'href', 'https://htmx.org/essays/locality-of-behaviour/'], ['attr', 'target', '_blank'])('🏹 LOB'),
      ),
      div(
        ['style', 'boxSizing', 'border-box'],
        ['style', 'display', 'flex'],
        ['style', 'flexDirection', 'column'],
        ['style', 'justifyContent', 'center'],
        ['style', 'gap', '20px'],
        ['style', 'width', '100%'],
        ['style:tablet', 'flexDirection', 'row'],
      )(
        div(
          ['style', 'display', 'flex'],
          ['style', 'flexDirection', 'column'],
          ['style', 'width', '100%'],
          ['style:tablet', 'width', '50%'],
        )(
          div(['style', 'textAlign', 'center'])('Step 1: Define State and Your Template Engine'),
          pre(['prism'])(`const count = State(1);
const count_inc = count.reduce((i) => i + 1);
const count_text = () => \`#\${count.get()}\`;
const count_color = () => (count.get() % 2 === 0 ? 'red' : 'black');

const { div } = HTML({
  'text:count': useText({state: count}),
  'event:click': useEvent('click'),
  'style:click': useStyle({ event: 'click' }),
  'style:mobile': useStyle({ mediaMinWidth: 0 }),
  'style:tablet': useStyle({ mediaMinWidth: 960 }),
});`),
        ),
        div(
          ['style', 'display', 'flex'],
          ['style', 'flexDirection', 'column'],
          ['style', 'width', '100%'],
          ['style:tablet', 'width', '50%'],
        )(
          div(['style', 'textAlign', 'center'])('Step 2:  Generate Your Reactive UI'),
          pre(['prism'])(`div(
  ['text:count', count_text],
  ['event:click', count_inc],
  ['style:click', 'color', count_color],
  ['style:mobile', 'cursor', 'pointer'],
  ['style:mobile', 'display', 'flex'],
  ['style:mobile', 'gap', '10px'],
  ['style:mobile', 'fontSize', '50px'],
  ['style:tablet', 'fontSize', '80px'],
)()`),
        ),
      ),
    ),
  );
