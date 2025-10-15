import { html } from '../config';
import { Box } from '../parts/Box';
import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';
import { InlineCode } from '../parts/Text';

const Header = (txt: string) =>
  html.div(['style', 'backgroundColor', 'rgba(0,0,0,0.1)'], ['style', 'padding', '10px'])(txt);

const Cell = (txt: HTMLElement | string) =>
  html.div(
    ['style', 'padding', '10px'],
    ['style', 'borderBottom', '1px solid rgba(0,0,0,0.1)'],
    ['style', 'fontSize', '13px'],
    ['style:tablet', 'fontSize', '16px'],
  )(txt);

const MethodTable = () =>
  html.div(
    ['style', 'borderRadius', '5px'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'grid'],
    ['style', 'gridTemplateColumns', '1fr 1fr'],
    ['style', 'width', '100%'],
  )(
    Header('Method'),
    Header('Description'),
    Cell(
      html.a(
        ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
        ['attr', 'target', '_blank'],
      )('val, $val'),
    ),
    Cell('Get the current value of the state'),
    Cell(
      html.a(
        ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
        ['attr', 'target', '_blank'],
      )('set, $set'),
    ),
    Cell('Set the state to a specific value'),
    Cell(
      html.a(
        ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
        ['attr', 'target', '_blank'],
      )('reduce, $reduce'),
    ),
    Cell('Reduce state to a specific value'),
    Cell(
      html.a(
        ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
        ['attr', 'target', '_blank'],
      )('sub, unsub'),
    ),
    Cell('Subscribe and unsubscribe to state changes'),
    Cell(
      html.a(
        ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
        ['attr', 'target', '_blank'],
      )('test, $test'),
    ),
    Cell('Test if a value is equal to the current state'),
  );

export const State = () =>
  Page(
    Section({
      title: 'State',
      subtitle: `Each state object in OEM is a micro event bus that can be used anywhere in your application. Although OEM is state management agnostic, it's built-in state management works great for most use cases.`,
      content: Box('column', 10, MethodTable()),
    }),

    Section({
      title: 'Getting',
      subtitle: `Getting the current value of the state is straight forward.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])('Get the current value with the  ', InlineCode('val'), ' property.'),
        html.pre(['prism'])(`color.val;`),
        html.div(['style', 'textAlign', 'center'])('Or with the method  ', InlineCode('$val()'), '.'),
        html.pre(['prism'])(`color.$val();`),
      ),
    }),

    Section({
      title: 'Setting',
      subtitle: `Setting state is straight forward as well and includes a few helper methods which begins to introduce some OEM specific patterns.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])('Set state with the  ', InlineCode('set'), ' method.'),
        html.pre(['prism'])(`color.set('blue');`),
        html.div(['style', 'textAlign', 'center'])(
          'Or create callback version of it with  ',
          InlineCode('$set'),
          ' to be called later. More on this in the patterns section.',
        ),
        html.pre(['prism'])(`const setToBlue = color.$set('blue');
setToBlue();`),
        html.div(['style', 'textAlign', 'center'])(
          'State can also be set using a reducer with the ',
          InlineCode('reduce'),
          ' method.',
        ),
        html.pre(['prism'])(`color.reduce((prev) => prev === 'red' ? 'blue' : 'red');`),
        html.div(['style', 'textAlign', 'center'])(
          'Or create callback version of it with  ',
          InlineCode('$reduce'),
          ' to call it later.',
        ),
        html.pre(['prism'])(`const toggleColor = color.$reduce((prev) => prev === 'red' ? 'blue' : 'red');
toggleColor();`),
      ),
    }),
    Section({
      title: 'Subscribing',
      subtitle: `Subscribing to state changes is an important part of state management. OEM makes this easy with the built-in pub/sub pattern.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])('Subscribe by calling the ', InlineCode('sub'), ' method.'),
        html.pre(['prism'])(`const cb = (val) => console.log(val)
color.sub(cb);`),
        html.div(['style', 'textAlign', 'center'])(
          'You can unsubscribe from state changes by calling ',
          InlineCode('unsub(cb)'),
        ),
        html.pre(['prism'])(`color.unsub(callback);`),
      ),
    }),
    Section({
      title: 'Testing',
      subtitle: `Testing the current state value is useful for conditionally applying traits or other logic in your application.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])(
          'Test if the current state matches a value with the ',
          InlineCode('test'),
          ' method. Note: equality is determined by comparing the serialized values.',
        ),
        html.pre(['prism'])(`color.test('red');
color.$test('red'); // callback version
`),
        html.div(['style', 'textAlign', 'center'])('Works with regular expressions too'),
        html.pre(['prism'])(`color.test(/red/);
color.$test(/red/); // callback version`),
        html.div(['style', 'textAlign', 'center'])('You can also check for inequality by passing a second argument'),
        html.pre(['prism'])(`color.test('red', false); // returns true if color is NOT 'red'
color.$test('red', false); // callback version`),
      ),
    }),
    Section({
      title: 'Patterns',
      subtitle: `Now that you know the basics of creating elements with templates, manipulating it with traits and managing state, let's look at some common patterns to build a real application.`,
      content: FooterNav({
        next: { title: 'Patterns', menuState: 'patterns' },
        prev: { title: 'Traits', menuState: 'traits' },
      }),
    }),
  );
