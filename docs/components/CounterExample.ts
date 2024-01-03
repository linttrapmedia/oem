import { HTML } from '@oem/html/HTML';
import { useEvent } from '@oem/html/traits/Event';
import { useText } from '@oem/html/traits/Text';
import { useStyle } from '@oem/index';
import { State } from '@oem/state/State';
import { div } from '../config';

const Counter = () => {
  const count = State(1);
  const count_inc = count.reduce((i: number) => i + 1);
  const count_text = () => `#${count.get()}`;
  const count_color = () => (count.get() % 2 === 0 ? 'red' : 'black');

  const { div } = HTML({
    'text:count': useText(count),
    'click:event': useEvent('click'),
    'click:style': useStyle({ event: 'click' }),
    'mobile:style': useStyle({ mediaMinWidth: 0 }),
    'tablet:style': useStyle({ mediaMinWidth: 960 }),
  });

  return div(
    ['text:count', count_text],
    ['click:event', count_inc],
    ['click:style', 'color', count_color],
    ['mobile:style', 'cursor', 'pointer'],
    ['mobile:style', 'display', 'flex'],
    ['mobile:style', 'gap', '10px'],
    ['mobile:style', 'fontSize', '50px'],
    ['tablet:style', 'fontSize', '80px'],
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
