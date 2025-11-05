import { html } from '../config';
import { Box } from '../parts/Box';
import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';
import { Note } from '../parts/Text';

export const Patterns = () =>
  Page(
    Page.Header('Patterns', 'Common patterns for building applications with OEM'),
    Section({
      title: 'Application Structure',
      subtitle: `The missing piece for many UI libraries is a clear structure for organizing your application. With OEM, you can establish a consistent structure that separates concerns and promotes maintainability.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])(
          'Separate concerns by feature. For small apps, make them single files, for larger apps, make them folders/files.',
        ),
        html.div(['prism'])(`- components // reusable stateless components
- features // stateful features of your app
- pages // pages
- state // your state objects
- actions // your state manipulation functions
- fsm // a finite state machine
- templates // your template engines
- traits // your traits
// models, entities, utils, etc.
`),
        Note(
          `See the `,
          html.a(
            ['attr', 'href', 'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/examples'],
            ['attr', 'target', '_blank'],
          )('Examples'),
          ' source code for more.',
        ),
      ),
    }),
    Section({
      title: 'Component Composition',
      subtitle: `Creating a "component" is just making a function that returns templated elements. However, there are certain practices that make them easier to work with and reuse.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])(
          `Here's a simple button component that accepts a label and an onClick handler:`,
        ),
        html.pre(['prism'])(`// define a reusable button component
const Button = (label, onClick) => 
  tmpl.button(
    ['style', 'padding', '10px 20px'],
    ['style', 'backgroundColor', 'blue'],
    ['style', 'color', 'white'],
    ['onClick', onClick]
  )(label);

// use the Button component within another component
const App = () => 
  tmpl.div()(
    Button('Click Me', () => alert('Button Clicked!')),
    Button('Submit', () => alert('Form Submitted!'))
  );
`),
        Note(
          "With this pattern, you don't need crazy CSS frameworks that require compile time optimization etc, the syntax isn't crazy and following some abstract naming convention. It keeps everything declarative and makes for an excellent foundation for an AI friendly design system.",
        ),
        html.div(['style', 'textAlign', 'center'])(
          `What if you don't want to use the same template engine for your entire app? No problem, just define a template engine within your component! Heck, you even use more than one template engine within the same component if you want.`,
        ),
        html.pre(['prism'])(`// define a component with its own template engine
const Card = (title, content, tmpl) => {

  // local state
  const alertState = State(0);

  // local template engine for the Card component
  const cardTmpl = HTML({ 
   myCustomTrait: useMyCustomTrait,
   style: useStyleTrait
  });

  // use the local template engine to create the card
  return cardTmpl.div(
    ['style', 'border', '1px solid #ccc'],
    ['style', 'padding', '20px'],
    ['style', 'borderRadius', '5px'],
    ['myCustomTrait', 'someValue']
  )(
    cardTmpl.h2(
      ['style', 'color', 'red', alertState.$test(1)],
      ['style', 'color', 'black', alertState.$test(1, false)]
    )(title),
    cardTmpl.p()(content)
  );
};

// use the Card component
const App = () => 
  tmpl.div()(
    Card('Card Title', 'This is the content of the card.'),
    Card('Another Card', 'More content here.')
  );
`),
      ),
    }),

    Section({
      title: 'Idiomatic Traits',
      subtitle: `You want your traits to be configurable, declarative, able to respond to state changes and play nice with the Locality of Behavior pattern.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])(
          `Here's a documented version of the useClassNameTrait available in the Factory section.`,
        ),
        html.pre(['prism'])(`import { Condition, StateType } from '@/types';

// Props for the useClassNameTrait
type Props = [
  el: HTMLElement, 
  className: string | (() => string),
  conditions?: Condition | Condition[],
  states?: StateType<any> | StateType<any>[],
];

export const useClassNameTrait = (...props: Props) => {
  // destructure props with default values
  const [el, className, conditions = true, states = []] = props;
  // function to apply the class name based on conditions
  const apply = () => {
    const _className = typeof className === 'function' ? className() : className;
    // normalize conditions to an array
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    // check if all conditions are met
    const isConditionMet = _conditions.every((condition) => (typeof condition === 'function' ? condition() : condition));
    // apply the class name if conditions are met
    if (isConditionMet) el.setAttribute('class', String(_className));
  };
  // initial application
  apply();
  // subscribe to state changes to re-apply the class name
  const _states = Array.isArray(states) ? states.flat() : [states];
  // map over states to create unsubscribe functions
  const unsubs = _states.map((state) => state.sub(apply));
  // return a cleanup function to unsubscribe from all states should the element be removed
  return () => unsubs.forEach((unsub) => unsub());
};
`),
        html.div(['style', 'textAlign', 'center'])(
          `The Locality of Behavior pattern: Using the template above you can not only register this trait across multiple template engines, but same engine, multiple times. Prefixing with the trait name and what it applies to helps keeps things straight`,
        ),
        html.pre(['prism'])(`// define some state
const someSwitch = State(false);

// create a template engine with the style trait
const tmpl = HTML({ 'style': useStyleTraitTrait});

// use the style trait with conditions based on state
// note: you can apply the same trait multiple times with different conditions
tmpl.div(
  ['style', 'color', 'red', someSwitch.$test(true)],
  ['style', 'color', 'green', someSwitch.$test(false)],
)();
`),
        Note(
          `Notice how with this pattern you can apply the same style property multiple times based on different conditions? You can't do that with JSX or CSS without ugly if statements or complex class management. This keeps your code declarative and easy to reason about.`,
        ),
      ),
    }),

    Section({
      title: 'Thank You!',
      subtitle: `We appreciate your interest in OEM. We hope you find this project useful. Feel free to contribute or provide feedback!`,
      content: FooterNav({
        next: { title: 'State', menuState: 'state' },
        prev: { title: 'Introduction', menuState: 'introduction' },
      }),
    }),
  );
