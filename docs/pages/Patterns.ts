import { html } from '../config';
import { Box } from '../parts/Box';
import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';

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
      ),
    }),
    Section({
      title: 'Trait Conventions',
      subtitle: `To maintain consistency across your application, it's helpful to establish conventions for naming and organizing your traits.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])(
          `Here's the basic outline of a trait that responds to state changes and only applies when a condition is met:`,
        ),
        html.pre(['prism'])(`function useStyleTrait(props) {
  return function(el, prop, val, cond) {
    const apply = () => {
      if (cond ? cond() : true) { ... }
    };
    if (props.state) state.sub(apply);
    apply();
  };
}`),
        html.div(['style', 'textAlign', 'center'])(
          `Using the template above you can register multiple instances of this trait. Prefixing with the trait name and what it applies to helps keeps things straight`,
        ),
        html.pre(['prism'])(`// regsiter the trait twice, with different state objects
const tmpl = HTML({
  'style:a': useStyleTrait({ state: stateObjectA }),
  'style:b': useStyleTrait({ state: stateObjectB }),
});

// somewhere in your app
// use both traits, multiple times
// on state change, re-evaluate and re-apply
// this is the Locality of Behavior pattern
tmpl.div(
  ['style:a', 'color', 'red', isAchecked],
  ['style:a', 'color', 'green', isAunchecked],
  ['style:b', 'fontSize', '10px', isBchecked],
  ['style:b', 'fontSize', '20px', isBunchecked],
)();
`),
      ),
    }),
    Section({
      title: 'Component Composition',
      subtitle: `OEM's templating engine allows for easy composition of components. You can create reusable components that can be nested within each other to build complex UIs. This promotes code reuse and maintainability.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])(
          `Componentizing your UI into smaller, reusable pieces makes it easier to manage and reason about. Just make functions that return templated elements. Pending the html engine they're tied to they can be as dynamic as you need.`,
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
        html.div(['style', 'textAlign', 'center'])(
          'You could even have a template engine per component if you wanted!',
        ),
        html.pre(['prism'])(`// define a component with its own template engine
const Card = (title, content) => {
  const cardTmpl = HTML({ /* traits specific to Card */ });
  return cardTmpl.div(
    ['style', 'border', '1px solid #ccc'],
    ['style', 'padding', '20px'],
    ['style', 'borderRadius', '5px']
  )(
    cardTmpl.h2()(title),
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
      title: 'Factory',
      subtitle: `Now that you know the basics of creating elements with templates, manipulating it with traits and managing state, let's look at some common patterns to build a real application.`,
      content: FooterNav({
        prev: { title: 'State', menuState: 'state' },
        next: { title: 'Factory', menuState: 'factory' },
      }),
    }),
  );
