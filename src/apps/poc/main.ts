import { root } from './Document';
import { button, div } from './Element';
import { number } from './Number';
import { on_click, row, style } from './Traits';

function CounterExample() {
  const count = number(1);
  return div(row(30), style('fontSize', '32px'))(
    button(on_click(count.dec, 1))('-'),
    div(on_click(count.reset))(count.val),
    button(on_click(count.inc, 1))('+'),
    div()(() => count.val() + 'asdf'),
  );
}

root(CounterExample());
