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
          pre(['prism'])(`// Create Your State
const countState = State(1);

// Define Your Template Engine
const { div } = HTML({
  'text': useTextContent({ state: countState }),
  'click': useEvent({ event: 'click' }),
  'style': useStyle({ state: countState }),
});`),
        ),
        div(
          ['style', 'display', 'flex'],
          ['style', 'flexDirection', 'column'],
          ['style', 'width', '100%'],
          ['style:tablet', 'width', '50%'],
        )(
          div(['style', 'textAlign', 'center'])('Step 2:  Generate Your Reactive UI'),
          pre(['prism'])(`// Output your html
div(
  ['text', (val) => \`#\${val\}\`],
  ['click', countState.reduce((i: number) => i + 1)],
  ['style', 'color', 'red', (val) => val % 2 === 0],
  ['style', 'color', 'black', (val) => val % 2 !== 0],
)()`),
        ),
      ),
    ),
  );
