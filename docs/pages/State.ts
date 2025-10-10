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
        Cell('Update state based on previous value (reducer)'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/state/State.ts'],
            ['attr', 'target', '_blank'],
          )('test'),
        ),
        Cell('Test if a value is equal to the current state'),
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
  "style": useStyle({ state: color }),
});`),
      div(['style', 'textAlign', 'center'])(
        'Any html element that uses the style trait will now update when the state changes and can react to the state change accordingly...however that is a little messy and is not recommended.',
      ),
      pre(['prism'])(`tmpl.div(['style','color',(c) => c === 'red' ? 'blue' : c])('Hello World!');
// returns <div style="color: red">Hello World!</div>`),
      div(['style', 'textAlign', 'center'])(
        'The much cleaner and recommended way is to use a function to determine when the style should be applied. Since OEM allows for multiple traits of the same type (style in this case), we can expressly define when a style should be applied based on the state right here. This becomes very powerful abstraction when it comes to scaling your application.',
      ),
      pre(['prism'])(`const isColor = (val: string) => (state: string) => state === val;
        
tmpl.div(
  ['style','color', 'red', isColor('red')],
  ['style','color', 'blue', isColor('blue')]
)('Hello World!');`),
    ),
  );
