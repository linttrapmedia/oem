import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';

export function CounterExample() {
  const count = State.Atom(0);
  const inc = () => count.set(count.get() + 1);
  const dec = () => count.set(count.get() - 1);
  const reset = () => count.set(0);

  const { div, button } = Template.Html({
    on_click: Trait.OnClick,
    on_count: Trait.Atom(count, Trait.InnerText),
    style: Trait.Style,
    flex: Trait.Flex,
  });

  return div(['flex', 'row', 30], ['style', 'fontSize', '36px'], ['style', 'cursor', 'pointer'])(
    button(['on_click', dec], ['style', 'cursor', 'pointer'])('-'),
    div(['on_count', count.get], ['on_click', reset])(count.get()),
    button(['on_click', inc], ['style', 'cursor', 'pointer'])('+'),
  );
}
