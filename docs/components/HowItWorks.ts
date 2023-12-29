import { div, pre } from 'docs/config';

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
      div(
        ['style', 'opacity', 0.5],
        ['style', 'textAlign', 'center'],
      )(
        `OEM works by introducing the idea of creating your own template engine(s) which exist as a middle layer between your state and your DOM. The result is code that is highly expressive, easy to read, and easy to maintain.`,
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

const { div } = Template({
  'text:count': useInnerText(count),
  'click:event': useEventListener('click'),
  'click:style': useEventStyle('click'),
  'mobile:style': useBreakpointStyle(0),
  'tablet:style': useBreakpointStyle(960),
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
  ['click:event', count_inc],
  ['click:style', 'color', count_color],
  ['mobile:style', 'cursor', 'pointer'],
  ['mobile:style', 'display', 'flex'],
  ['mobile:style', 'gap', '10px'],
  ['mobile:style', 'fontSize', '50px'],
  ['tablet:style', 'fontSize', '80px'],
)()`),
        ),
      ),
    ),
  );
