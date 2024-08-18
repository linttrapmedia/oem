import { HTML } from '../../src/html/HTML';
import { useEvent } from '../../src/html/traits/Event';
import { useStyle, useTextContent } from '../../src/index';
import { State } from '../../src/state/State';
import { div } from '../config';

const Counter = () => {
  const count = State(1);
  const count_inc = count.reduce((i: number) => i + 1);
  const count_text = () => `#${count.get()}`;
  const count_color = () => (count.get() % 2 === 0 ? 'red' : 'black');

  const { div } = HTML({
    'text:count': useTextContent({ state: count }),
    'event:click': useEvent({ event: 'click' }),
    'style:click': useStyle({ event: 'click' }),
    'style:mobile': useStyle({ mediaMinWidth: 0 }),
    'style:tablet': useStyle({ mediaMinWidth: 960 }),
  });

  return div(
    ['text:count', count_text],
    ['event:click', count_inc],
    ['style:click', 'color', count_color],
    ['style:mobile', 'cursor', 'pointer'],
    ['style:mobile', 'display', 'flex'],
    ['style:mobile', 'gap', '10px'],
    ['style:mobile', 'fontSize', '50px'],
    ['style:tablet', 'fontSize', '80px'],
  )();
};

export const Example = () =>
  div(
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
    div(
      ['style', 'alignItems', 'center'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'column'],
      ['style', 'fontFamily', 'Space Grotesk'],
      ['style', 'gap', '20px'],
      ['style', 'justifyContent', 'center'],
      ['style', 'width', '100%'],
    )(div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('Click The Number'), Counter()),
  );
