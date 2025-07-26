import { a, div, pre } from '../config';

const Header = (txt: string) => div(['style', 'backgroundColor', 'rgba(0,0,0,0.1)'], ['style', 'padding', '10px'])(txt);
const Cell = (txt: HTMLElement | string) =>
  div(
    ['style', 'padding', '10px'],
    ['style', 'borderBottom', '1px solid rgba(0,0,0,0.1)'],
    ['style', 'fontSize', '13px'],
    ['style:tablet', 'fontSize', '16px'],
  )(txt);

export const State = () =>
  div(
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'gap', '50px'],
    ['style', 'justifyContent', 'center'],
  )(
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
      div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])(`State Managment`),
      div(
        ['style', 'opacity', 0.5],
        ['style', 'textAlign', 'center'],
      )(
        `OEM's State Managment is based on a simple pub/sub model. Each state function is it's own object that can be subscribed to and updated. Wiring state into your templates is what makes OEM so powerful.`,
      ),
      div(['style', 'textAlign', 'center'])('Creating a state object is easy'),
      pre(['prism'])(`import { State } from 'oem';
const color = State('red');`),
      div(['style', 'textAlign', 'center'])('You can get the current value of the state object'),
      pre(['prism'])(`color.get(); 
// 'red'`),
      div(['style', 'textAlign', 'center'])('You can subscribe to the state object'),
      pre(['prism'])(`color.sub(console.log);`),
      div(['style', 'textAlign', 'center'])('You can update the state object'),
      pre(['prism'])(`color.set('blue');
// 'blue' will be logged to the console by the subscriber`),

      div(['style', 'textAlign', 'center'])('You can use the state in your templates'),
      pre(['prism'])(`const tmpl = HTML({
  "style:color": useStyle({ state: color }),
});`),
      div(['style', 'textAlign', 'center'])(
        'Any html element that uses the style:color trait will now update when the state changes and can react to the state change accordingly...however that is a little messy and is not recommended.',
      ),
      pre(['prism'])(`tmpl.div(['style:color','color',(c) => c === 'red' ? 'blue' : c])('Hello World!');
// returns <div style="color: red">Hello World!</div>`),
      div(['style', 'textAlign', 'center'])(
        `Instead the idiomatic OEM way is to make use of a condition flag and use the following pattern:`,
      ),
      pre(['prism'])(`import { HTML, State } from 'oem';

// create state and some helper functions
const colorState = State<'red'|'yellow'|'green>('red');
const colorStateIsRed = () => colorState.get() === 'red';
const colorStateIsYellow = () => colorState.get() === 'yellow';
const colorStateIsGreen = () => colorState.get() === 'green';

// create a templating engine with a trait that uses the state
const tmpl = HTML({
  "style:color": useStyle({ state: colorState }),
});

// render your html and apply the trait multiple times with 
// different conditions which will be evaluated at render time
tmpl.div(
  ['style:color', 'color', 'red', colorStateIsRed],
  ['style:color', 'color', 'yellow', colorStateIsYellow],
  ['style:color', 'color', 'green', colorStateIsGreen],
)('Hello World!');
`),
      div(
        ['style', 'borderRadius', '5px'],
        ['style', 'boxSizing', 'border-box'],
        ['style', 'display', 'grid'],
        ['style', 'gridTemplateColumns', '1fr 1fr'],
        ['style', 'width', '100%'],
      )(
        Header('Method'),
        Header('Description'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
            ['attr', 'target', '_blank'],
          )('get'),
        ),
        Cell('Get the current value of the state'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
            ['attr', 'target', '_blank'],
          )('sub'),
        ),
        Cell('Subscribe to state changes'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
            ['attr', 'target', '_blank'],
          )('set'),
        ),
        Cell('Update the state'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
            ['attr', 'target', '_blank'],
          )('pub'),
        ),
        Cell('Publish a new value to all subscribers'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
            ['attr', 'target', '_blank'],
          )('unsub'),
        ),
        Cell('Unsubscribe from state changes'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
            ['attr', 'target', '_blank'],
          )('reduce'),
        ),
        Cell('Update state based on previous value (functional update)'),
      ),
    ),
  );
