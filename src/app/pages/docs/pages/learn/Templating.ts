import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { FooterNav } from '../../components/FooterNav';
import { Section } from '../../components/Section';
import { Snippet } from '../../components/Snippet';
import { SubSection } from '../../components/SubSection';

const html = Template.Html({
  style: Trait.Style,
  onclick: Trait.OnClick,
});

export const Templating = () =>
  html('div')(
    Section({
      title: 'Templating',
      subtitle: 'Create Your Own Html',
      description: `The \`Template.Html\` function is used to *create your own html* using a [hyperscript](https://github.com/hyperhype/hyperscript)-type syntax. The function takes a config of traits you want to use and returns a function you can use to render html. *Note: Typings removed for clarity*`,
      content: html('div')(
        SubSection({
          title: 'Source Code',
          subtitle: '`./src/core/Template.ts`',
          content: Snippet(
            `const Html =
    (config) =>
    (tag, ...traits) =>
    (...children) => {
      
      const el = document.createElementNS("http://www.w3.org/1999/xhtml", tag);

      traits.forEach(([trait, ...args]) => config[trait](el, ...args));
      
      children.forEach((child) => {
        if (child instanceof Node) el.appendChild(child);
        if (typeof child === 'string' || typeof child === 'number') el.appendChild(CleanText(String(child)));
      });
  
      return el;
    };
    `,
          ),
        }),
        SubSection({
          title: 'Usage',
          content: Snippet(`import { Template } from '@core/framework/Template'; 
const html = Template.Html({ // no traits by default });
html('div')('Hello World')`),
        }),
      ),
    }),
    FooterNav({ prev: 'example', prevText: 'Example', next: 'traits', nextText: 'Traits' }),
  );
