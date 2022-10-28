import { ROUTES, tags } from '../../context';
import { Documentation } from '../common/Documentation';
import { Section } from '../common/Section';
import { Snippet } from '../common/Snippet';
const { div } = tags;

export function StateView() {
  return Documentation({
    prev: ['Styling', ROUTES.STYLING],
    next: ['Design', ROUTES.DESIGN_SYSTEM],
    content: div(['flex', 'column', 40])(
      Section({
        title: `State`,
        subtitle: `The \`State.Atom\` is a miniature event bus.`,
        content: Snippet(`// Create an atom
const msg = State.Atom('hello');

// get an atom
console.log(msg.get()); // outputs => 'hello'

// subscribe to an atom
msg.sub((val) => console.log(val));

// set an atom (which calls all subscribers)
msg.set('HELLO'); // outputs => 'HELLO'`),
      }),

      Section({
        title: 'Map State With The Atom Trait',
        subtitle: `Using the \`Atom\` trait gives you the reactivity you're used to in vdoms. Here's an example:`,
        content: Snippet(
          `// Create an atom
const textAtom = State.Atom(null);

// Create a template
const html = Template.Html({
  // map a text input listener
  on_text_input: Trait.OnTextInput,
  // now use the Atom Trait to map the textAtom to the innerText Trait
  on_text_update: Trait.State(textAtom, Trait.InnerText), 
});

// Output your html
return html('div')(
  // The textAtom is set on input
  html('input', ['on_text_input', textAtom.set])(),
  // The innerText updates each time the textAtom changes
  html('div', ['on_text_update', textAtom.get])(),
);`,
        ),
      }),
    ),
  });
}
