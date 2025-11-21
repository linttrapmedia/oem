import { html } from '../config';
import { Box } from '../parts/Box';
import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';
import { InlineCode, Note } from '../parts/Text';

export const Docs = () =>
  Page(
    Page.Header('Docs', "OEM only has two functions — HTML and State. Here's how they work."),
    Section({
      title: 'HTML',
      subtitle: `OEM's HTML template engine is a lightweight and efficient way to create and manage HTML elements in your application.`,
      content: Box(
        'column',
        10,
        html.pre(['prism'])(`import { HTML } from 'oem';
      
// create a template engine
const tmpl = HTML();

// you can now generate HTML elements
tmpl.div()('Hello, OEM!');
// <div>Hello, OEM!</div>
`),
      ),
    }),
    Note(`There's also an `, InlineCode('SVG'), ` version of the HTML function for creating SVG elements.`),
    Section({
      title: 'State',
      subtitle: `OEM's built-in state management is simple yet powerful. Each state object is a micro event bus that can be used anywhere in your application.`,
      content: Box(
        'column',
        10,
        html.pre(['prism'])(`import { State } from 'oem'; 

// create a state object
const color = State<'green' | 'red'>('red');

// getting
color.val();

// setting
color.set('green'); 
const setToRed = color.$set('red'); // cb version

// reducing
color.reduce((prev) => prev === 'red' ? 'green' : 'red');
color.$reduce((prev) => prev === 'red' ? 'green' : 'red'); // cb version

// subscribe/unsubscribe to changes
const colorSub = (updatedColor) => {...};
color.sub(colorSub);
color.unsub(colorSub);

// testing value
color.test('red'); // by string
color.test('red', false); // by string, false for NOT equal
color.$test('red');  // by string, cb version
color.$test('red', false); // by string, cb version NOT equal
color.test(/red/); // by regex
color.$test(/red/); // by regex, cb version
color.test((val) => val === 'red'); // by function
color.$test((val) => val === 'red'); // by function, cb version
`),
      ),
    }),
    Section({
      title: 'Learn (~10min)',
      subtitle: `Get started with OEM by following our step-by-step guide. You'll be building a small app in no time!`,
      content: FooterNav({
        next: { title: 'Templates', menuState: 'templates' },
        prev: { title: 'Intro', menuState: 'introduction' },
      }),
    }),
  );
