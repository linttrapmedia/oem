import { State } from '../../src/state/State';
import { HTML } from '../../src/template/HTML';
import { useEvent } from '../../src/traits/Event';
import { useStyle } from '../../src/traits/Style';
import { useTextContent } from '../../src/traits/TextContent';
import { html } from '../config';

const Counter = () => {
  const countState = State(1);

  const { div } = HTML({
    'text:count': useTextContent({ state: countState }),
    'event:click': useEvent({ event: 'click' }),
    'style:count': useStyle({ state: countState }),
    'style:mobile': useStyle({ mediaMinWidth: 0 }),
    'style:tablet': useStyle({ mediaMinWidth: 960 }),
  });

  return div(
    ['text:count', (v) => `#${v}`],
    ['event:click', () => countState.set((i: number) => i + 1)],
    ['style:count', 'color', 'red', (s) => s % 2 === 0],
    ['style:count', 'color', 'black', (s) => s % 2 !== 0],
    ['style:mobile', 'cursor', 'pointer'],
    ['style:mobile', 'display', 'flex'],
    ['style:mobile', 'gap', '10px'],
    ['style:mobile', 'fontSize', '50px'],
    ['style:tablet', 'fontSize', '80px'],
  )();
};

export const Example = () =>
  html.div(
    ['style', 'alignItems', 'center'],
    ['style', 'backgroundColor', 'rgba(255,255,255,0.2)'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'borderRadius', '5px'],
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'gap', '50px'],
    ['style', 'justifyContent', 'center'],
    ['style', 'padding', '50px'],
    ['style', 'width', '100%'],
  )(
    html.div(
      ['style', 'alignItems', 'center'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'column'],
      ['style', 'fontFamily', 'Space Grotesk'],
      ['style', 'justifyContent', 'center'],
      ['style', 'width', '100%'],
    )(
      html.div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('The Result'),
      html.div()('(Click the number)'),
      Counter(),
    ),
  );
