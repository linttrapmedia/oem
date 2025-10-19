import { html } from '../config';
import { Box } from '../parts/Box';
import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';

export const Templating = () =>
  Page(
    Page.Header('Templates', 'Creating micro-templating engines with OEM'),

    Section({
      title: 'The HTML function',
      subtitle: `The HTML function creates a templating engine that can generate HTML elements.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])('Import the HTML function to create an HTML templating engine'),
        html.pre(['prism'])(`import { HTML } from 'oem';
const tmpl = HTML({...});`),
        html.div(['style', 'textAlign', 'center'])(
          'You can now generate HTML elements with the templating engine. Notice that the tag generating function is curried. More on that later.',
        ),
        html.pre(['prism'])(`html.div()('Hello World!');
// returns <div>Hello World!</div>`),
      ),
    }),

    Section({
      title: 'Traits',
      subtitle: `Your template engine can generate html tags, but that's it. How can we add functionality? Small functions called traits. `,
      content: FooterNav({
        next: { title: 'Traits', menuState: 'traits' },
        prev: { title: 'Intro', menuState: 'introduction' },
      }),
    }),
  );
