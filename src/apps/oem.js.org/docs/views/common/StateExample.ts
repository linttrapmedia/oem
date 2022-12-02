import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';

export function StateExample() {
  const textAtom = State.Atom<string>(null);

  const { div, input } = Template.Html({
    on_text_input: Trait.OnTextInput,
    on_text_update: Trait.State(textAtom, Trait.InnerText),
  });

  return div(['flex', 'row', 10])(
    input(['on_text_input', textAtom.set], ['attr', 'placeholder', 'Start Typing'])(),
    div(['on_text_update', textAtom.get])(),
  );
}
