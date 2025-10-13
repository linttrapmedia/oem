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
      )('get'),
    ),
    Cell('Get the current value of the state'),
    Cell(
      html.a(
        ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
        ['attr', 'target', '_blank'],
      )('sub'),
    ),
    Cell('Subscribe to state changes'),
    Cell(
      html.a(
        ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
        ['attr', 'target', '_blank'],
      )('set'),
    ),
    Cell('Update the state'),
    Cell(
      html.a(
        ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
        ['attr', 'target', '_blank'],
      )('pub'),
    ),
    Cell('Publish a new value to all subscribers'),
    Cell(
      html.a(
        ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
        ['attr', 'target', '_blank'],
      )('unsub'),
    ),
    Cell('Unsubscribe from state changes'),
    Cell(
      html.a(
        ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
        ['attr', 'target', '_blank'],
      )('reduce'),
    ),
    Cell('Update state based on previous value (reducer)'),
    Cell(
      html.a(
        ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
        ['attr', 'target', '_blank'],
      )('test'),
    ),
    Cell('Test if a value is equal to the current state'),
  );

export const State = () =>
  Page(
    Section({
      title: 'State',
      subtitle: `State management in OEM is simple and straightforward. Each state object is a micro event bus that can be used anywhere in your application. Although OEM is state management agnostic, it's built-in state management works great for most use cases.`,
      content: Box(
        'column',
        10,
        html.div(
          ['style', 'textAlign', 'center'],
          ['style', 'display', 'inline-flex'],
          ['style', 'alignItems', 'baseline'],
        )('Creating a state object using the ', InlineCode('State'), ' function'),
        html.pre(['prism'])(`import { State } from 'oem';
const color = State<string>('red');`),
      ),
    }),
    Section({
      title: 'Getting',
      subtitle: `You can get and subscribe to the current value of the state using the 'get' method.`,
      content: Box(
        'column',
        10,

        html.pre(['prism'])(`color.get(); // 'red'`),
      ),
    }),

    Section({
      title: 'Setting',
      subtitle: `You can set the state using the 'set' method`,
      content: Box(
        'column',
        10,

        html.pre(['prism'])(`color.set('blue');`),
      ),
    }),
    Section({
      title: 'Subscribing',
      subtitle: `You can subscribe and unsubscribe to state changes using the 'sub' and 'unsub' methods.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])(
          'You can subscribe to state changes by calling ',
          InlineCode('sub(callback)'),
        ),
        html.pre(['prism'])(`const callback = (val) => console.log(val)
color.sub(callback);`),
        html.div(['style', 'textAlign', 'center'])(
          'You can unsubscribe from state changes by calling ',
          InlineCode('unsub(callback)'),
        ),
        html.pre(['prism'])(`color.unsub(callback);`),
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
