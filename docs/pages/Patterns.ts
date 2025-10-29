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
      title: 'Idiomatic Traits',
      subtitle: `You want your traits to be configurable, declarative, able to respond to state changes and play nice with the Locality of Behavior pattern.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])(
          `Here's the basic outline of a trait that responds to state changes and only applies when a condition is met:`,
        ),
        html.pre(['prism'])(`function useStyleTraitTrait(props) { // <-- configurable
  return function(el, prop, val, cond) { // <-- your trait function
    const apply = () => { // <-- your apply function
      if (cond ? cond() : true) { ... } // <-- the condition to apply
    };
    if (props.state) state.sub(apply); // <-- respond to state changes
    apply(); // <-- initial application
  };
}`),
        html.div(['style', 'textAlign', 'center'])(
          `The Locality of Behavior pattern: Using the template above you can not only register this trait across multiple template engines, but same engine, multiple times. Prefixing with the trait name and what it applies to helps keeps things straight`,
        ),
        html.pre(['prism'])(`// register the trait multiple times and 
// have them respond to different state objects
const tmpl = HTML({
  'style:a': useStyleTraitTrait({ state: stateObjectA }),
  'style:b': useStyleTraitTrait({ state: stateObjectB }),
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
        Note(
          `Notice how with this pattern you can conditionally apply the same style property multiple times based on different state objects? You can't do that with JSX or CSS without ugly if statements or complex class management. This keeps your code declarative and easy to reason about.`,
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
          `Since all state and template behavior comes from a template engine, you don't have to "prop drill" behavioral and presentational logic into your components. This keeps your components simple and focused on just rendering.`,
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
const Card = (title, content) => {
  const cardTmpl = HTML({ /* traits specific to Card */ });
  return cardTmpl.div(
    ['style', 'border', '1px solid #ccc'],
    ['style', 'padding', '20px'],
    ['style', 'borderRadius', '5px']
  )(
    tmpl.h2( // <-- using the global tmpl engine
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
      title: 'Factory',
      subtitle: `Now that you know the basics of creating elements with templates, manipulating it with traits and managing state, let's look at some common patterns to build a real application.`,
      content: FooterNav({
        prev: { title: 'State', menuState: 'state' },
        next: { title: 'Factory', menuState: 'factory' },
      }),
    }),
  );
