import { div, pre } from '../config';
import { Box } from '../parts/Box';
import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';

export const Templating = () =>
  Page(
    Section({
      title: 'Templates',
      subtitle: `OEM is built around the concept of creating micro-templating engines that can be composed together to create complex UIs. This is done by defining a set of traits (small testable functions) that can be attached to HTML elements.`,
      content: Box(
        'column',
        20,
        div(
          ['style', 'alignItems', 'center'],
          ['style', 'boxSizing', 'border-box'],
          ['style', 'display', 'flex'],
          ['style', 'flexDirection', 'column'],
          ['style', 'fontFamily', 'Space Grotesk'],
          ['style', 'gap', '20px'],
          ['style', 'justifyContent', 'center'],
          ['style', 'width', '100%'],
        )(
          div(['style', 'textAlign', 'center'])('Import the HTML function and create an HTML templating engine'),
          pre(['prism'])(`import { HTML } from 'oem';
const tmpl = HTML({...});`),
          div(['style', 'textAlign', 'center'])(
            'You can now generate HTML elements with the templating engine. Notice that the tag generating function is curried. More on that later.',
          ),
          pre(['prism'])(`tmpl.div()('Hello World!');
// returns <div>Hello World!</div>`),
          div(['style', 'textAlign', 'center'])(
            "Your template engine can create basic html tags but that's it. How can we add functionality? Small functions called traits. Let's create a very basic trait that makes text red.",
          ),
          pre(['prism'])(`const makeItRed = (el: HTMLElement) => el.style.color = 'red';`),
          div(['style', 'textAlign', 'center'])('We can now add that trait to our template engine.'),
          pre(['prism'])(`const tmpl = HTML({ "red": makeItRed });`),
          div(['style', 'textAlign', 'center'])(
            'This "red" trait is now available on all HTML elements created by the template in the first curried function call.',
          ),
          pre(['prism'])(`div(['red'])('Hello World!');
// returns <div style="color: red">Hello World!</div>`),
        ),
      ),
    }),

    Section({
      title: 'Traits',
      subtitle: `This code may look a bit unusual at first in a silly 'hello world' format, but it becomes much more elegant (better!) when you actually start adding complexity. Let's do that next by learning more about where the real magic happens: traits.`,
      content: FooterNav({
        next: { title: 'Traits', menuState: 'traits' },
      }),
    }),
  );
