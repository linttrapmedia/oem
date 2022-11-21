import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';

export function CounterExample() {
  const count = State.Number(0);

  const { div, button } = Template.Html({
    on_count: Trait.State(count, Trait.InnerText),
  });

  return div(['flex', 'row', 30], ['style', 'fontSize', '36px'])(
    button(['on_click', count.bind('subtract', 1)], ['style', 'cursor', 'pointer'])('-'),
    div(['on_count', count.get], ['on_click', count.bind('reset')])(count.get()),
    button(['on_click', count.bind('add', 1)], ['style', 'cursor', 'pointer'])('+'),
  );
}
