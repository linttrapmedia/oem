import { html } from '../config';
import { Box } from '../parts/Box';
import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';
import { Note } from '../parts/Text';

const useStyle = (el: HTMLElement, prop: keyof CSSStyleDeclaration, value: any) => {
  el.style[prop as any] = value;
};

export const Traits = () =>
  Page(
    Page.Header('Traits', 'Adding functionality to your templating engine with traits'),
    Section({
      title: 'The Trait Function',
      subtitle: `A "trait" is just a function that takes an element as its first argument and does something to it.`,
      content: Box(
        'column',
        20,
        html.div(['style', 'textAlign', 'center'])(`Here's the basic template for a trait function:`),
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
        Note(
          `Note: you could have applied the style textAlign trait multiple times to the same element with different values, and it would apply them in order. However, that would only make sense if we had a way to add a condition. That's exactly what we cover in the Patterns section. First, let's see how State works.`,
        ),
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
