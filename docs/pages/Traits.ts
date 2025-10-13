import { html } from '../config';
import { Box } from '../parts/Box';
import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';

const useStyle = (el: HTMLElement, prop: keyof CSSStyleDeclaration, value: any) => {
  el.style[prop as any] = value;
};

export const Traits = () =>
  Page(
    Section({
      title: 'Traits',
      subtitle: `Traits are small, reusable functions that can be attached to HTML elements to add functionality. They can be composed together to create complex behaviors.`,
      content: Box(
        'column',
        20,
        html.div(['style', 'textAlign', 'center'])(
          'A "trait" is just a function that takes an element as its first argument and does something to it.',
        ),
        html.div(['prism'])(`const useStyle = (el: HTMLElement) => {...}`),
        html.div(['style', 'textAlign', 'center'])(
          'Here is an example of a very simple "style" trait for applying css styles to an element.',
        ),
        html.div(['prism'])(`const useStyle = (el: HTMLElement, prop: string, value: string) => {
  el.style[prop] = value;
}`),
        html.div(['style', 'textAlign', 'center'])('This trait can now be added to your templating engine like this:'),
        html.div(['prism'])(`const tmpl = HTML({ "style": useStyle });`),
        html.div(['style', 'textAlign', 'center'])(
          `Now, when you render an element, the first curried function takes a list of traits to apply to the element. 'style' will be intellisensed along with it's arguments 'prop' and 'value' (everything after the 'el' argument in your trait function). Here is how you would use the "style" trait to make some text red, 24px, and centered:`,
        ),
        html.div(['prism'])(`tmpl.div(
  ['style','color', 'red'],
  ['style','fontSize','24px'],
  ['style','textAlign','center']
)('...');`),
      ),
    }),

    Section({
      title: 'State',
      subtitle: `OK, we can generate html, and now have a way to manipulate it with traits. But how do we make it dynamic? What if we could reapply traits when something changes? Enter "State".`,
      content: FooterNav({
        next: { title: 'State', menuState: 'state' },
        prev: { title: 'Templates', menuState: 'templates' },
      }),
    }),
  );
