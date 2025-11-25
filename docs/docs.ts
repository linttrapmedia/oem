import { Note } from 'docs/parts/Note';
import { Table } from 'docs/parts/Table';
import {
  download,
  downloading,
  examplesLibrary,
  statesLibrary,
  tag,
  trait,
  traitLibrary,
} from './config';
import { Box } from './parts/Box';
import { Code, InlineCode } from './parts/Code';
import { Page } from './parts/Page';
import { Section } from './parts/Section';

export const Docs = () =>
  Page(
    Page.Header('oem', 'The Roll Your Own Framework Framework'),

    // ============================================
    // TOC
    // ============================================

    Section({
      title: 'Table of Contents',
      level: 1,
      content: tag.ul(
        tag.li(
          tag.a(
            trait.attr('href', 'https://github.com/linttrapmedia/oem'),
            trait.attr('target', '_blank'),
            'GITHUB',
          ),
        ),
        tag.li(tag.a(trait.attr('href', '#features'), 'Features')),
        tag.li(tag.a(trait.attr('href', '#philosophy'), 'Philosophy')),
        tag.li(tag.a(trait.attr('href', '#installation'), 'Installation')),
        tag.li(tag.a(trait.attr('href', '#quick-start'), 'Quick Start')),
        tag.li(tag.a(trait.attr('href', '#state'), 'State')),
        tag.li(tag.a(trait.attr('href', '#templating'), 'Templating')),
        tag.li(tag.a(trait.attr('href', '#traits'), 'Traits')),
        tag.li(tag.a(trait.attr('href', '#storage'), 'Storage')),
        tag.li(tag.a(trait.attr('href', '#examples'), 'Examples')),
      ),
    }),

    // ============================================
    // FEATURES
    // ============================================

    Section({
      title: 'Features',
      subtitle:
        'OEM’s syntax is simple and transparent enough for humans to fully grasp and for AI to reliably extend—creating a feedback loop where you understand the code, refine it, and the AI builds on the exact patterns you’ve established.',
      level: 1,
      content: [
        tag.ul(
          tag.li('✓ ~2.7KB minified core, zero dependencies'),
          tag.li('✓ Reactive DOM with no virtual DOM layer'),
          tag.li('✓ Locality of behavior makes reasoning—and debugging—trivial'),
          tag.li('✓ AI can generate Traits directly, and you can understand and refine every line'),
          tag.li('✓ Full TypeScript types without framework overhead'),
          tag.li('✓ Copy only what you need; no bulk, no lock-in'),
        ),
      ],
    }),

    // ============================================
    // PHILOSOPHY
    // ============================================

    Section({
      title: 'Philosophy',
      level: 1,
      subtitle:
        'OEM is a minimal, convention-driven toolkit for crafting your own reactive, component-based UI layer—fully local, fully understood, and entirely yours.',
      content: [
        Section({
          title: 'Transparent',
          level: 2,
          content: [
            tag.p(
              "OEM's primary goal is ",
              tag.strong('transparency'),
              '. It strips away the "black box" complexity of modern frameworks and replaces it with small, local behaviors you can actually reason about.',
            ),

            tag.ul(
              tag.li(
                tag.strong('Readable Core:'),
                ' ~300 lines of plain TypeScript you can grasp in a single sitting',
              ),
              tag.li(
                tag.strong('Local Behavior:'),
                ' Features are implemented as ',
                tag.strong('Traits'),
                '—small files that live next to your markup and are meant to be ',
                tag.strong('copied, edited, and extended'),
              ),
              tag.li(
                tag.strong('No Hidden Magic:'),
                ' Everything reduces to simple reactive patterns (pub/sub, observers, state flows) that you can inspect and reshape',
              ),
            ),
          ],
        }),

        Section({
          title: "Why 'Roll Your Own Framework'?",
          level: 2,
          content: [
            tag.p(
              'Modern frameworks try to be all things to all people, resulting in bulky, complex systems that are hard to master and extend. OEM embraces the idea that ',
              tag.strong('you should build the framework you need, not the other way around'),
              '.',
            ),

            tag.ul(
              tag.li('Start small with just the Traits and States you need'),
              tag.li('Evolve your toolkit organically as your project grows'),
              tag.li('Maintain full control over every line of code and behavior'),
            ),
          ],
        }),
      ],
    }),

    // ============================================
    // INSTALLATION
    // ============================================

    Section({
      title: 'Installation',
      subtitle: 'Get started quickly with OEM in your project',
      level: 1,
      content: [
        Section({
          title: 'Automatically',
          subtitle: "If you want to maintain OEM as a dependency, it's available via npm:",
          level: 2,
          content: Code(`npm install @linttrap/oem`, 'bash'),
        }),
        Section({
          title: 'Manually',
          level: 2,
          content: [
            tag.p(
              'Why not make it yours? The core is 300 LOC and the traits are simple. Use the tool below to customize and download a package with only the Traits and States you need.',
            ),
            tag.form(
              tag.div(
                trait.style('lineHeight', '2'),
                tag.div(
                  trait.style('display', 'flex'),
                  trait.style('gap', '10px'),
                  tag.input(
                    trait.attr('type', 'checkbox'),
                    trait.attr('name', 'modules'),
                    trait.attr('value', `core`),
                    trait.attr('id', `core`),
                    trait.attr('checked', 'true'),
                    trait.attr('disabled', 'true'),
                  ),
                  tag.label(
                    trait.attr('for', `core`),
                    tag.span(trait.style('fontWeight', 'bold'), 'Core'),
                    tag.span(` - Core library (required)`),
                  ),
                ),
                ...traitLibrary.map(([name, path, desc]) =>
                  tag.div(
                    trait.style('display', 'flex'),
                    trait.style('gap', '10px'),
                    tag.input(
                      trait.attr('type', 'checkbox'),
                      trait.attr('name', 'modules'),
                      trait.attr('value', path),
                      trait.attr('id', `trait-${name}`),
                      trait.attr('checked', 'true'),
                    ),
                    tag.label(
                      trait.attr('for', `trait-${name}`),
                      tag.span(trait.style('fontWeight', 'bold'), name),
                      tag.span(` - ${desc}`),
                    ),
                  ),
                ),
                ...statesLibrary.map(([name, path, desc]) =>
                  tag.div(
                    trait.style('display', 'flex'),
                    trait.style('gap', '10px'),
                    tag.input(
                      trait.attr('type', 'checkbox'),
                      trait.attr('name', 'modules'),
                      trait.attr('value', path),
                      trait.attr('id', `state-${name}`),
                      trait.attr('checked', 'true'),
                    ),
                    tag.label(
                      trait.attr('for', `state-${name}`),
                      tag.span(trait.style('fontWeight', 'bold'), name),
                      tag.span(` - ${desc}`),
                    ),
                  ),
                ),
              ),
              tag.br(),
              tag.button(
                trait.attr('type', 'button'),
                trait.attr('disabled', 'true', downloading.$test(true)),
                trait.attr('disabled', undefined, downloading.$test(false)),
                trait.style('opacity', '0.6', downloading.$test(true)),
                trait.style('opacity', '1', downloading.$test(false)),
                trait.style('cursor', 'not-allowed', downloading.$test(true)),
                trait.event('click', () => {
                  downloading.set(true);
                  const form = document.querySelector('form') as HTMLFormElement;
                  const formData = new FormData(form);
                  const modules = formData.getAll('modules') as string[];
                  download(modules).finally(() => {
                    downloading.set(false);
                  });
                }),
                trait.html('Download Zip', downloading.$test(false)),
                trait.html('Preparing...', downloading.$test(true)),
              ),
            ),
          ],
        }),
      ],
    }),

    // ============================================
    // QUICK START
    // ============================================

    Section({
      title: 'Quick Start',
      level: 1,
      subtitle:
        'This is the simplest way to show how State and Templating work together to create a reactive component.',
      content: [
        Section({
          title: 'Example',
          level: 2,
          content: Code(`
const [tag, trait] = Template({ event: useEventTrait });

const count = State(0);

const app = tag.div(
  tag.h1(count.$val),
  tag.button(
    trait.event('click', count.$reduce((n) => n + 1)),
    'Increment',
  ),
);
`),
        }),
        Section({
          title: 'How It Works',
          level: 2,
          subtitle: 'Understanding the complete reactive loop',
          content: [
            Section({
              title: '1. Create State',
              subtitle:
                "State holds reactive data and special methods (prefixed with '$') used to notify subscribers on changes",
              level: 3,
              content: Code(`const count = State(0);`),
            }),
            Section({
              title: '2. Configure Template with Traits',
              subtitle: 'Template provides element creators and access to registered Traits',
              level: 3,
              content: Code(`const [tag, trait] = Template({ event: useEventTrait });`),
            }),
            Section({
              title: '3. Build Elements with Reactive Bindings',
              subtitle: 'Use the tag proxy to create elements and trait proxy to attach behaviors',
              level: 3,
              content: Code(`const app = tag.div(
  // $val subscribes returns current value and auto-updates on changes
  tag.h1(count.$val), 
  tag.button(
    // traits attach behavior; $reduce returns a closure
    // that updates state based on previous value
    trait.event('click', count.$reduce((n) => n + 1)),
    // Basic text and tags can be mixed in directly as children
    'Increment',
  ),
);`),
            }),
          ],
        }),
      ],
    }),

    // ============================================
    // STATE: REACTIVE DATA MANAGEMENT
    // ============================================

    Section({
      title: 'State',
      level: 1,
      subtitle:
        'The State object provides simple reactive state management using the pub/sub pattern.',
      content: [
        Section({
          title: 'Methods',
          level: 2,
          subtitle: 'State methods are used to get, set, and update reactive data.',
          content: Table(
            Table.Header(
              Table.Row(
                Table.HeaderCell('Method'),
                Table.HeaderCell('$ Version'),
                Table.HeaderCell('Description'),
              ),
            ),
            Table.Body(
              Table.Row(
                Table.Cell(InlineCode('val()')),
                Table.Cell(InlineCode('$val()')),
                Table.Cell('Get the value'),
              ),
              Table.Row(
                Table.Cell(InlineCode('set(v)')),
                Table.Cell(InlineCode('$set(v)')),
                Table.Cell('Set a new value'),
              ),
              Table.Row(
                Table.Cell(InlineCode('reduce(fn)')),
                Table.Cell(InlineCode('$reduce(fn)')),
                Table.Cell('Update value based on the previous value'),
              ),
              Table.Row(
                Table.Cell(InlineCode('sub(cb)')),
                Table.Cell(InlineCode('N/A')),
                Table.Cell('Subscribe to state changes (returns unsubscribe fn)'),
              ),
              Table.Row(
                Table.Cell(InlineCode('test(p)')),
                Table.Cell(InlineCode('$test(p)')),
                Table.Cell('Test if the value matches a predicate/condition'),
              ),
              Table.Row(
                Table.Cell(InlineCode('call(m)')),
                Table.Cell(InlineCode('$call(m)')),
                Table.Cell('Call methods on boxed primitives'),
              ),
            ),
          ),
        }),
        Section({
          title: 'The $ Pattern',
          level: 2,
          subtitle:
            'The dollar sign ($) prefix on State methods are the closure versions of those methods. Without these closures, you would need to wrap calls in arrow functions to defer execution.',
          content: [
            Section({
              title: 'Clean Syntax',
              subtitle:
                'Using the $ versions of State methods produces cleaner, more concise code.',
              level: 3,
              content: [
                Code(`// Verbose: Needs an arrow function wrapper
trait.event('click', () => count.set(0));

// Clean: Use the $ pattern
trait.event('click', count.$set(0));
`),
              ],
            }),
            Section({
              title: 'Introspection Inside Traits',
              subtitle:
                'Traits are responsible for managing subscriptions to State objects. By using the $ versions of State methods, Traits can introspect and subscribe automatically.',
              level: 3,
              content: [
                Code(`
function showHideTrait(el: HTMLElement, someCondition: () => boolean) {
  // Check if someCondition is a $test closure by looking for the .type property
  const isTestClosure = someCondition.type === "$test" && typeof someCondition === "function";
  const testFn = isTestClosure ? someCondition : () => someCondition;
  const apply = () =>  el.style.display = testFn() ? "block" : "none";
  apply();
  const unsub = isTestClosure ? someCondition.sub(apply) : () => {};
  return () => unsub();
}`),
              ],
            }),
          ],
        }),

        Section({
          title: 'Ready-Made States',
          level: 2,
          subtitle:
            'Ready-Made states are like hooks in other frameworks: small, focused utilities that provide specific reactive behaviors.',
          content: [
            Table(
              Table.Header(
                Table.Row(
                  Table.HeaderCell('State'),
                  Table.HeaderCell('Description'),
                  Table.HeaderCell('Link'),
                ),
              ),
              Table.Body(
                ...statesLibrary.map(([name, path, description]) =>
                  Table.Row(
                    Table.Cell(InlineCode(name)),
                    Table.Cell(description),
                    Table.Cell(
                      tag.a(
                        trait.attr(
                          'href',
                          `https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/${path}`,
                        ),
                        trait.attr('target', '_blank'),
                        'download',
                      ),
                    ),
                  ),
                ),
              ),
            ),
            Section({
              title: 'Example: useMediaQueryState',
              level: 3,
              content: Code(`
const isMobile = useMediaQueryState({ maxWidth: 768 });

const app = tag.div(
  trait.style('fontSize', '12px', isMobile.$test(true)),
  trait.style('fontSize', '16px', isMobile.$test(false))
);`),
            }),
          ],
        }),
      ],
    }),

    // ============================================
    // TEMPLATING
    // ============================================

    Section({
      title: 'Templating',
      level: 1,
      subtitle:
        'The Template function creates the DOM-building tools you need by configuring available Traits.',
      content: [
        Section({
          title: 'Configuration',
          level: 2,
          subtitle:
            'Template takes an optional configuration object that maps trait names to their implementations.',
          content: Code(`const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
});`),
        }),
        Section({
          title: 'Tag Proxy',
          level: 2,
          subtitle:
            'The tag proxy creates standard HTML and SVG elements with full TypeScript support.',
          content: Code(
            ` // Creates a <div> with red text and "Hello, World!" inside
const el = tag.div('Hello, World!');`,
          ),
        }),
        Section({
          title: 'Nesting Tags and Children',
          level: 3,
          subtitle:
            'Elements can be nested arbitrarily, and children can be static values, other elements, or Traits. ',
          content: Code(`const el = tag.div(
  tag.h1('Title'),
  tag.p('This is a paragraph.'),
  tag.ul(
    tag.li('Item 1'),
    tag.li('Item 2'),
    tag.li('Item 3'),
  ),
);`),
        }),
        Note(
          'Tags can also accept numbers, State closures, and Trait appliers as children. For more advanced usage like dynamic children, see the "useInnerHTMLTrait" Trait.',
        ),
        Section({
          title: 'Trait Proxy',
          level: 2,
          subtitle:
            'Traits are applied to elements by passing them as arguments to the tag functions. Their function names are available as properties on the trait proxy.',
          content: Code(`const el = tag.button(
  trait.style('color', 'white'),
  trait.style('backgroundColor', 'blue'),
  trait.event('click', () => alert('Button clicked!')),
  'Click Me',
);`),
        }),
        Section({
          title: 'Combining Tags and Traits',
          level: 2,
          subtitle:
            'Tags and Traits work together to create fully reactive, behavior-rich elements.',
          content: Code(`const count = State(0);

const el = tag.div(
  tag.h1(count.$val),
  tag.button(
    trait.event('click', count.$reduce((n) => n + 1)),
    'Increment',
  ),
);`),
        }),
        tag.p("Note: For a complete list of available Traits, see the 'Traits' section below."),
      ],
    }),

    // ============================================
    // TRAITS
    // ============================================

    Section({
      title: 'Traits',
      level: 1,
      subtitle: 'A Trait is a function that applies behavior to a DOM element.',
      content: [
        Section({
          title: 'Key Concept: Locality of Behavior',
          subtitle:
            'Traits keep behavior directly alongside your markup, preserving Locality of Behavior. You can attach multiple traits—even multiple of the same kind—to a single element. This produces a clean, declarative syntax that eliminates messy conditionals and manual DOM manipulation.',
          level: 2,
          content: Code(`tag.input(
  trait.value(name.$val), // Input value binding
  trait.input('input', name.set), // set name on input event
  trait.style('color', 'red', nameError.$test(true)), // conditional style
  trait.style('color', 'blue', nameError.$test(false)), // conditional style
);`),
        }),

        Section({
          title: 'Ready-Made Traits',
          level: 2,
          subtitle: 'OEM comes with a set of ready-made Traits to cover common use cases.',
          content: Table(
            Table.Header(
              Table.Row(
                Table.HeaderCell('Trait'),
                Table.HeaderCell('Description'),
                Table.HeaderCell('Link'),
              ),
            ),
            Table.Body(
              ...traitLibrary.map(([name, path, description]) =>
                Table.Row(
                  Table.Cell(InlineCode(name)),
                  Table.Cell(description),
                  Table.Cell(
                    tag.a(
                      trait.attr(
                        'href',
                        `https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/${path}`,
                      ),
                      trait.attr('target', '_blank'),
                      'download',
                    ),
                  ),
                ),
              ),
            ),
          ),
        }),
      ],
    }),

    // ============================================
    // STORAGE
    // ============================================

    Section({
      title: 'Storage',
      level: 1,
      subtitle:
        'The Storage utility is a simple helper to assist in persisting state locally and syncing with external sources.',
      content: Code(`
const storage = Storage({
  data: {
    username: {
      key: 'app-username',
      state: State(''),
      storage: 'localStorage', // Persists across sessions
    },
  },
  sync: {
    // Custom method to load data from an API
    fetchTodos: async () => {
      // ... API fetch logic ...
      storage.data.todos.set(todos);
    },
  },
});

// Access state directly
storage.data.username.set('Alice'); // Auto-saves to localStorage`),
    }),
    Section({
      title: 'Best Practices',
      subtitle: `There are no hard rules, but here are some guidelines to keeping your app's data management clean:`,
      level: 2,
      content: [
        Section({
          title: 'Model State in a State Machine',
          level: 3,
          content: `It's recommended to use a state machine to manage your state. The simplest version of this is a single function with typed actions that update state based on action types..`,
        }),
        Section({
          title: 'Use Storage for Persistence Only',
          level: 3,
          content: `Storage is best suited for persisting user preferences, session data, and other information that should survive page reloads. Avoid using it for transient UI state that doesn't need to be saved.`,
        }),
        Section({
          title: 'Sync Methods for External Data',
          level: 3,
          content: `Use the sync methods in Storage to handle data fetching and synchronization with external APIs or services. This keeps your data flow organized and encapsulated.`,
        }),
      ],
    }),

    // ============================================
    // BROWSER SUPPORT
    // ============================================
    Section({
      title: 'Examples',
      level: 1,
      subtitle: 'A collection of example projects built with OEM.',
      content: Table(
        Table.Header(
          Table.Row(
            Table.HeaderCell('Example'),
            Table.HeaderCell('Description'),
            Table.HeaderCell('Link'),
          ),
        ),
        Table.Body(
          ...examplesLibrary.map(([name, path, description]) =>
            Table.Row(
              Table.Cell(InlineCode(name)),
              Table.Cell(description),
              Table.Cell(
                tag.a(
                  trait.attr('href', `https://github.com/linttrapmedia/oem/tree/main/${path}`),
                  trait.attr('target', '_blank'),
                  'codespace',
                ),
              ),
            ),
          ),
        ),
      ),
    }),

    // ============================================
    // BROWSER SUPPORT
    // ============================================

    Section({
      title: 'Browser Support',
      level: 1,
      content: Box(
        'column',
        10,
        tag.p('Requires ES6+ support:'),
        tag.ul(
          tag.li('Chrome 49+'),
          tag.li('Firefox 18+'),
          tag.li('Safari 10+'),
          tag.li('Edge 12+'),
        ),
      ),
    }),

    // ============================================
    // LICENSE
    // ============================================

    Section({
      title: 'License',
      level: 1,
      content: Box(
        'column',
        10,
        tag.p('MIT License'),
        tag.p(
          '©Copyright 2024. All rights reserved. Made in the USA 🇺🇸 by ',
          tag.a(
            trait.attr('href', 'http://linttrap.media'),
            trait.attr('target', '_blank'),
            'Lint Trap Media',
          ),
          '.',
        ),
      ),
    }),
  );
