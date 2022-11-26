import { useRoot } from './Document';
import { useElement } from './Element';
import { useNumber } from './Number';
import { useTrait } from './Traits';

function CounterExample() {
  const count = useNumber(1);
  const { button, div } = useElement();
  const { padding, on_click, row, font_size } = useTrait();

  return div(row(30), font_size(50))(
    button(['onclick', count.dec, 1], ['padding', 10], ['padding', 20])('asdf'),
    button(on_click(count.dec, 1), padding(10), padding(20))('-'),
    div()(count.val),
    button(on_click(count.inc, 1))('+'),
  );
}

useRoot(CounterExample);
