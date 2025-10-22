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

// create a trait
const style = (el: HTMLElement, key: string, value: string) => {
  el.style[key as any] = value;
}
      
// create a template engine and map the style trait
const tmpl = HTML({ style });

// use it 
tmpl.div(['style','color','red'])('Hello, OEM!');
// <div style="color: red;">Hello, OEM!</div>
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
console.log(color.val);
console.log(color.$val()); // (method version)

// setting
color.set('green'); 
const setToRed = color.$set('red'); // (method version)
setToRed();

// reducing
color.reduce((prev) => prev === 'red' ? 'green' : 'red');
const toggleColor = color.$reduce((prev) => prev === 'red' ? 'green' : 'red'); (method version)
toggleColor();

// subscribe to changes
const colorSub = (newColor) =>  console.log('Color changed to:', newColor);
color.sub(colorSub);

// unsubscribe from changes
color.unsub(colorSub);

// test
color.test('red'); // by string
color.test('red', false); // by string, false for NOT equal
const isRed = color.$test('red');  // (method version)
isRed();
const isNotRed = color.$test('red', false); // (method version) NOT equal
isNotRed();
`),
      ),
    }),
    Section({
      title: 'Learn (~10min)',
      subtitle: `You can learn the core concepts of OEM in about 10 minutes. Follow along with the examples to get a feel for how OEM works.`,
      content: FooterNav({
        next: { title: 'Templates', menuState: 'templates' },
        prev: { title: 'Intro', menuState: 'introduction' },
      }),
    }),
  );
