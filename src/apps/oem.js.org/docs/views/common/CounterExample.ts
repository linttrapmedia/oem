import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';

export function CounterExample() {
  const count = State.Number(0);

  const { div, button } = Template.Html({
    on_count: Trait.State(count, Trait.InnerText),
  });

  return div(['flex', 'row', 30], ['font_size', 30])(
    button(['on_click_bind', count.subtract, '1'])('-'),
    div(['on_count', count.get])(count.get()),
    button(['on_click_bind', count.add, 1])('+'),
  );
}
