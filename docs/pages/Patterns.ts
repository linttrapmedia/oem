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
      content: html.div(['prism'])(`
// all your reusable components 
📁 components

// all code related to state management
📁 state
        // functions to directly manipulate state
        📄 actions.ts
        // listens for app events and calls various actions
        📄 machine.ts
        // state objects
        // ... Todo.ts, User.ts, etc.

// all your templating engines
📁 templates

// all your reusable traits
📁 traits

// entry point for your application
📄 app.ts

// ... types, constants, config, utils, etc.
  `),
    }),
    Section({
      title: 'Trait Conventions',
      subtitle: `To maintain consistency across your application, it's helpful to establish conventions for naming and organizing your traits.`,
      content: Box(
        'column',
        10,
        html.div(['style', 'textAlign', 'center'])('Build your traits like this'),
        html.pre(['prism'])(`// create some configuration props so you 
// can use this reuse this trait in different templates
type UseStyleProps = {
  state?: StateType<T>
}

// create a "hook" to use the trait
const useStyle = (props: UseStyleProps) => (
  el: HTMLElement, 
  key: string, 
  value: string,
  
  // add a condition at the end to only apply the style when true
  condition?: boolean | ((state: T) => boolean)
) => {

// create an "apply" function that applies the style
  const apply = () => {...}
  // ...
}

export const style = useStyle();
        `),
      ),
    }),
    Section({
      title: 'Component Composition',
      subtitle: `OEM's templating engine allows for easy composition of components. You can create reusable components that can be nested within each other to build complex UIs. This promotes code reuse and maintainability.`,
    }),
    Section({
      title: 'Kits',
      subtitle: `Now that you know the basics of creating elements with templates, manipulating it with traits and managing state, let's look at some common patterns to build a real application.`,
      content: FooterNav({
        prev: { title: 'State', menuState: 'state' },
        next: { title: 'Kits', menuState: 'kits' },
      }),
    }),
  );
