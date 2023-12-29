import { HTML } from '@oem/html/HTML';
import { useBreakpointStyle } from '@oem/html/traits/BreakpointStyle';
import { useEventListener } from '@oem/html/traits/EventListener';
import { useEventStyle } from '@oem/html/traits/EventStyle';
import { useInnerText } from '@oem/html/traits/InnerText';
import { State } from '@oem/state/State';
import { div } from '../config';

const Counter = () => {
  const count = State(1);
  const count_inc = count.reduce((i: number) => i + 1);
  const count_text = () => `#${count.get()}`;
  const count_color = () => (count.get() % 2 === 0 ? 'red' : 'black');

  const { div } = HTML({
    'text:count': useInnerText(count),
    'click:event': useEventListener('click'),
    'click:style': useEventStyle('click'),
    'mobile:style': useBreakpointStyle(0),
    'tablet:style': useBreakpointStyle(960),
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
    ['style', 'backgroundColor', 'rgba(255,255,255,0.1)'],
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
