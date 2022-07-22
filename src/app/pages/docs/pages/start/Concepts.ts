import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { box } from 'src/app/components/Layout/Box';
import { text } from 'src/app/components/Typography/Text';
import { FooterNav } from '../../components/FooterNav';
import { Section } from '../../components/Section';
import { Snippet } from '../../components/Snippet';
import { StateExample } from '../../components/StateExample';

const html = Template.Html({
  style: Trait.Style,
  onclick: Trait.OnClick,
});

const example = html(
  'div',
  ['style', 'padding', '50px'],
  ['style', 'backgroundColor', Theme.Color('black', 0, 0.08)],
  ['style', 'marginBottom', '20px'],
  ['style', 'borderRadius', '5px'],
);

export const Concepts = () =>
  html('div')(
    Section({
      title: 'Create your own HTML',
      subtitle: `The core concept of OEM is that you can create your own HTML and give it superpowers`,
      content: html('div')(
        text('paragraph')(
          `When compared to other UI libraries, OEM takes a fundamentally different approach for generating html, managing state and creating components. There is no central dom or templating engine. Instead there is a factory function (called \`Template\`) that is used to *declare your own HTML* in scope. While declaring a template, you add behaviors called *Traits*. A trait is a function you map onto a template instance in order to *add* behaviors such as reactivity and styling. This turns out to be a powerful abstraction because it can produce formulaic code that is easy to read, change, test, extend — you name it.`,
        ),
      ),
    }),
    Section({
      title: 'Easy To Master',
      subtitle: `OEM has been created with a bias towards simplicity and conceptual elegance.`,
      content: html('div')(
        text('paragraph')(
          `Every line of the core *framework* has been written in a way that any dev can understand. This of course is not a perfect science and therefore the goal of this document is help you understand how everything works under the hood *and* how to build an app that will scale in all the ways that count. Here below is a quick preview of the main features of the framework. From there we show you a [full example](/docs/?p=example) written from scratch to illustrate how everything works.`,
        ),
      ),
    }),
    Section({
      title: 'Templating',
      subtitle: `Create an template instance, use the returned function to render dom elements`,
      description: `By default a template can only output html tags (no attributes, styles, behaviors, etc.)`,
      content: box(['direction', 'column'], ['align', 'center'])(
        example('Hello World'),
        Snippet(
          `const html = Template.Html({});
html('div')('Hello World')`,
          25,
          'typescript',
        ),
      ),
    }),
    Section({
      title: 'Traits',
      subtitle: `You can add behaviors to the template by mapping a "trait"`,
      description: `Here we map the \`Trait.Style\` trait which will enable inline css.`,
      content: box(['direction', 'column'], ['align', 'center'])(
        example(html('div', ['style', 'fontWeight', 'bold'])('Hello World')),
        Snippet(
          `// Create the template with the style trait
const html = Template.Html({ 
  style: Trait.Style 
});

// output the html and declare a style
html('div', ['style', 'fontWeight', 'bold'])('Hello World')`,
        ),
      ),
    }),
    Section({
      title: 'State',
      subtitle: `Create an "Atom" instance and map it to the template with the Atom trait.`,
      description: `Atoms are miniature event buses. We can use the Atom trait to map it to our template and listen for changes, reacting just like you would in a virtual dom.`,
      content: box(['direction', 'column'], ['align', 'center'])(
        example(StateExample()),
        Snippet(
          `
// Create the atom
const textAtom = State.Atom(null);

const html = Template.Html({

  // Use the atom trait to listen for changes and
  // map the InnerText trait which will be called on change
  on_text_update: Trait.Atom(textAtom, Trait.InnerText),

  // The OnTextInput trait will be called when the text changes
  on_text_input: Trait.OnTextInput,
  
});

return html('div')(
  html('input', ['on_text_input', textAtom.set])(),
  html('div', ['on_text_update', textAtom.get])(),
);`,
        ),
      ),
    }),

    FooterNav({ prev: 'overview', prevText: 'Overview', next: 'example', nextText: 'Full Example' }),
  );
