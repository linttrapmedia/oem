import { div } from 'docs/config';
import { Template } from 'src/html/HTML';
import { useBreakpointStyle } from 'src/html/traits/BreakpointStyle';
import { useEventListener } from 'src/html/traits/EventListener';
import { useEventStyle } from 'src/html/traits/EventStyle';
import { useInnerText } from 'src/html/traits/InnerText';
import State from 'src/state/State';

const Counter = () => {
  const count = State(1);
  const count_inc = count.reduce((i) => i + 1);
  const count_text = () => `#${count.get()}`;
  const count_color = () => (count.get() % 2 === 0 ? 'red' : 'black');

  const { div } = Template({
    'text:count': useInnerText(count),
    'click:event': useEventListener('click'),
    'click:style': useEventStyle('click'),
    'style:mobile': useBreakpointStyle(0),
    'style:tablet': useBreakpointStyle(960),
  });

  return div(
    ['text:count', count_text],
    ['click:event', count_inc],
    ['click:style', 'color', count_color],
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
