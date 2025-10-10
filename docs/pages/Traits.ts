import { HTML } from '../../src';
import { a, div } from '../config';
import { Box } from '../parts/Box';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';

const Header = (txt: string) => div(['style', 'backgroundColor', 'rgba(0,0,0,0.1)'], ['style', 'padding', '10px'])(txt);
const Cell = (txt: HTMLElement | string) =>
  div(
    ['style', 'padding', '10px'],
    ['style', 'borderBottom', '1px solid rgba(0,0,0,0.1)'],
    ['style', 'fontSize', '13px'],
    ['style:tablet', 'fontSize', '16px'],
  )(txt);

const useStyle = (el: HTMLElement, prop: keyof CSSStyleDeclaration, value: any) => {
  el.style[prop as any] = value;
};

const tmpl = HTML({ style: useStyle });

export const Traits = () =>
  Page(
    Section({
      title: 'Traits',
      subtitle: `Traits are small, reusable functions that can be attached to HTML elements to add functionality. They can be composed together to create complex behaviors.`,
      content: Box(
        'column',
        20,
        div(['style', 'textAlign', 'center'])(
          'A "trait" is just a function that takes an element as its first argument. However, you can also pass additional arguments as you\'d like. Here is an example of a very simple trait that applies a style to an element.',
        ),
        div(['prism'])(`const useStyle = (
  el: HTMLElement, 
  prop: keyof CSSStyleDeclaration, 
  value: any) => {
  el.style[prop] = value;
}`),
        div(['style', 'textAlign', 'center'])('Your trait can now be added to your templating engine like this:'),
        div(['prism'])(`const tmpl = HTML({ "style": useStyle });`),
        div(['style', 'textAlign', 'center'])(
          'Now, when you render an element, everything will be intellisensed. Here is how you would use the "style" trait to make some text red, 24px, and centered:',
        ),
        div(['prism'])(`tmpl.div(
  ['style', 'color', 'red'],
  ['style','fontSize','24px'],
  ['style','textAlign','center']
)('...');`),
      ),
    }),
    Section({
      title: 'Included Traits',
      subtitle: `You aren't left to fend for yourself, OEM comes with a set of traits for common use cases. Here's a list.`,
      content: div(
        ['style', 'borderRadius', '5px'],
        ['style', 'boxSizing', 'border-box'],
        ['style', 'display', 'grid'],
        ['style', 'gridTemplateColumns', '1fr 1fr'],
        ['style', 'width', '100%'],
      )(
        Header('Trait'),
        Header('Description'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/Style.ts'],
            ['attr', 'target', '_blank'],
          )('useAttribute'),
        ),
        Cell('Apply attributes'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/ClassName.ts'],
            ['attr', 'target', '_blank'],
          )('useClassName'),
        ),
        Cell('Apply class names'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/Event.ts'],
            ['attr', 'target', '_blank'],
          )('useEvent'),
        ),
        Cell('Attach event listener'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/InnerHTML.ts'],
            ['attr', 'target', '_blank'],
          )('useInnerHTML'),
        ),
        Cell('Attach event listener'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/Text.ts'],
            ['attr', 'target', '_blank'],
          )('useText'),
        ),
        Cell('Apply inner text'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/Style.ts'],
            ['attr', 'target', '_blank'],
          )('useStyle'),
        ),
        Cell('Apply styles'),
      ),
    }),
    Section({
      title: 'Kitchen Sink',
      subtitle: `Here's an example that uses all the traits at once!`,
      content: Box('column', 20, div()('adsf')),
    }),
  );
