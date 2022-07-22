import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';

export const StateExample = () => {
  const textAtom = State.Atom(null);

  const html = Template.Html({
    attr: Trait.Attr,
    on_text_update: Trait.Atom(textAtom, Trait.InnerText),
    on_text_input: Trait.OnTextInput,
    style: Trait.Style,
  });

  return html('div')(
    html(
      'input',
      ['style', 'marginRight', '10px'],
      ['on_text_input', textAtom.set],
      ['attr', 'placeholder', 'Type Something'],
    )(),
    html('div', ['on_text_update', textAtom.get])(),
  );
};
