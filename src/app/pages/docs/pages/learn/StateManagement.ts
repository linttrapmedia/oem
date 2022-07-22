import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { FooterNav } from '../../components/FooterNav';
import { Section } from '../../components/Section';
import { Snippet } from '../../components/Snippet';
import { SubSection } from '../../components/SubSection';

export const StateManagement = () => {
  const html = Template.Html({
    attr: Trait.Attr,
    style: Trait.Style,
  });
  return html('div')(
    Section({
      title: `State Management`,
      subtitle: 'The `State.Atom` is a function that is a value wrapper/container and miniature event bus',
      content: Template.Fragment(
        SubSection({
          title: 'Source Code',
          subtitle: '`./src/core/State.ts`',
          content: Snippet(`const Atom = <T>(atom: T): Types.Atom<T> => {
  let _atom = atom;
  const subscribers: ((atom: T) => any)[] = [];
  const get = (): T => _atom;
  const set = (atom: T) => ((_atom = atom), subscribers.forEach((i) => i(_atom)));
  const sub = (cb: () => any) => subscribers.push(cb);
  return { get, set, sub };
};`),
        }),
        SubSection({
          title: 'Basic Usage',
          content: Snippet(`// Create an atom
const msg = State.Atom('hello');

// get an atom
console.log(msg.get()); // outputs => 'hello'

// listen for changes to the atom
msg.sub((val) => console.log(val));

// and on atom change
msg.set('HELLO'); // outputs => 'HELLO'`),
        }),

        SubSection({
          title: 'Usage with the `Trait.Atom` Trait',
          subtitle: `Using atoms with the \`Atom\` trait gives you reactivity. Here's the State example again:`,
          description:
            "On text input the `textAtom` setter is called. When set, the div's `InnerText` trait is called with `textAtom`'s getter.",
          content: Snippet(
            `
  const textAtom = State.Atom(null);
  
  const html = Template.Html({
    on_text_input: Trait.OnTextInput,
    on_text_update: Trait.Atom(textAtom, Trait.InnerText),
  });
  
  return html('div')(
    html('input', ['on_text_input', textAtom.set])(),
    html('div', ['on_text_update', textAtom.get])(),
  );`,
          ),
        }),
      ),
    }),
    Section({
      title: 'Serialize',
      subtitle:
        '`State.Serialize` is a helper function to automatically call `.get` on all atoms in an object or array',
      description:
        "Many times structuring and modeling state in a single object makes a lot of sense. In this case it's nice to have a helper function to serialize the object automatically vs. having to call `get` on each atom.",
      content: Snippet(`const context = {
  age: State.Atom(100),
  name: State.Atom('Ronald'),
  birthday: State.Atom(Date.now()),
}

// call serialize
console.log(State.Serialize(context));

// and it outputs
{
  age: 100,
  name: 'Ronald',
  birthday:' 1656789530388
}
`),
    }),
    FooterNav({ prev: 'traits', prevText: 'Traits', next: 'styling', nextText: 'Styling' }),
  );
};
