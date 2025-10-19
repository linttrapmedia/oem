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

// get the current value
console.log(color.val); // 'red'

// get the current value (method version)
console.log(color.$val()); // 'red'

// set the value
color.set('green');

// set the value (method version)
const setToRed = color.$set('red');
setToRed();

// reduce the value
color.reduce((prev) => prev === 'red' ? 'green' : 'red');

// reduce the value (method version)
const toggleColor = color.$reduce((prev) => prev === 'red' ? 'green' : 'red');
toggleColor();

// subscribe to changes
const colorSub = (newColor) =>  console.log('Color changed to:', newColor);
color.sub(colorSub);

// unsubscribe from changes
color.unsub(colorSub);

// test the current value
color.test('red'); // returns true

// test if the current value is NOT 'red'
color.test('red', false); // returns true

// test the current value (method version)
const isRed = color.$test('red'); 
isRed(); // returns true

// test if the current value is NOT 'red' (method version)
const isNotRed = color.$test('red', false);
isNotRed(); // returns true
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
