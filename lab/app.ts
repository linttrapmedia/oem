import {
  State,
  Template,
  useAttributeTrait,
  useEventTrait,
  useInnerHTMLTrait,
  useStyleTrait,
} from '@/registry';
import { Box } from 'www/parts/Box';
import { Code, InlineCode } from 'www/parts/Code';
import { Note } from 'www/parts/Note';
import { Page } from 'www/parts/Page';
import { Section } from 'www/parts/Section';
import { Table } from 'www/parts/Table';

declare namespace Prism {
  const highlight: any;
  const languages: any;
}

// Custom trait for code highlighting
export const usePrism = (el: HTMLElement, language: string) => {
  el.style.display = 'block';
  el.style.whiteSpace = 'pre';
  el.style.fontFamily = "'Courier New', Courier, monospace";
  el.style.color = 'white';
  el.style.backgroundColor = '#222222';
  el.style.padding = '30px';
  el.style.borderRadius = '5px';
  el.style.overflowX = 'auto';
  el.style.maxWidth = '100%';
  el.style.width = '100%';
  el.style.minWidth = '0';
  el.style.boxSizing = 'border-box';
  el.style.wordBreak = 'normal';
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        if (mutation.addedNodes.length > 0) {
          observer.disconnect();
          const formattedCode = Prism.highlight(el.innerText, Prism.languages[`typescript`]);
          el.innerHTML = formattedCode;
        }
      }
    });
  });
  observer.observe(el, { childList: true });
  return el;
};

export const theme = State<'grey' | 'ada'>('grey');
export const prismCss = State('');
export const downloading = State(false);

export const traitLibrary = [
  ['useAttributeTrait', 'src/traits/Attribute.ts', 'Set HTML attributes'],
  ['useClassNameTrait', 'src/traits/ClassName.ts', 'Apply CSS class names'],
  ['useEventTrait', 'src/traits/Event.ts', 'Attach event listeners (click, input, etc.)'],
  ['useFocusTrait', 'src/traits/Focus.ts', 'Manage focus and blur events'],
  ['useInnerHTMLTrait', 'src/traits/InnerHTML.ts', 'Set inner HTML content'],
  ['useInputEventTrait', 'src/traits/InputEvent.ts', 'Handle input events'],
  ['useStyleTrait', 'src/traits/Style.ts', 'Apply inline styles'],
  ['useStyleOnEventTrait', 'src/traits/StyleOnEvent.ts', 'Apply styles on specific events'],
  ['useTextContentTrait', 'src/traits/TextContent.ts', 'Set text content'],
  ['useValueTrait', 'src/traits/InputValue.ts', 'Bind to input values'],
];

export const statesLibrary = [
  ['useMediaQueryState', 'src/states/MediaQuery.ts', 'Responsive state based on window size'],
];

export const examplesLibrary = [
  [
    'Todo Calendar',
    'examples/todoCalendar',
    'A full-featured todo app with calendar and list views.',
  ],
  ['Counter', 'examples/counter', 'A simple counter application.'],
];

export const [tag, trait] = Template({
  attr: useAttributeTrait,
  event: useEventTrait,
  style: useStyleTrait,
  html: useInnerHTMLTrait,
  prism: usePrism,
});

// declare JSZip for downloading files as zip
declare var JSZip: any;

export async function download(paths: string[]) {
  const zip = new JSZip();
  const _paths = ['src/oem.ts', ...paths];

  for (const path of _paths) {
    const url = `https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/${path}`;
    const resp = await fetch(url);

    if (!resp.ok) {
      console.error('Failed:', path);
      continue;
    }

    const fileData = await resp.arrayBuffer();
    const fileName = path.split('/').pop();
    const folder = path.startsWith('src/traits')
      ? 'traits/'
      : path.startsWith('src/states')
      ? 'states/'
      : '';

    zip.file(folder + fileName, fileData);
  }

  const blob = await zip.generateAsync({ type: 'blob' });

  // create link and download
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'oem.zip';
  a.click();

  URL.revokeObjectURL(a.href);
}

function App() {
  return tag.div(
    trait.attr('data-app', 'OEM Documentation'),
    trait.style('padding', '2rem'),
    trait.html(
      tag.div(
        trait.attr('data-part', 'AppContent'),
        trait.style('display', 'flex'),
        trait.style('flexDirection', 'column'),
        trait.html(() =>
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
                tag.li(tag.a(trait.attr('href', '#overview'), 'Overview')),
                tag.li(tag.a(trait.attr('href', '#installation'), 'Installation')),
                tag.li(tag.a(trait.attr('href', '#quick-start'), 'Quick Start')),
                tag.li(tag.a(trait.attr('href', '#state'), 'State')),
                tag.li(tag.a(trait.attr('href', '#templating'), 'Templating')),
                tag.li(tag.a(trait.attr('href', '#traits'), 'Traits')),
                tag.li(tag.a(trait.attr('href', '#helpers'), 'Helpers')),
                tag.li(tag.a(trait.attr('href', '#examples'), 'Examples')),
              ),
            }),

            // ============================================
            // OVERVIEW
            // ============================================

            Section({
              title: 'Overview',
              subtitle: 'A UI toolkit built for the age of AI-assisted development.',
              level: 1,
              content: [
                tag.p(
                  'OEM is designed so that both AI and humans can work with the same codebase effectively. The framework is small and predictable enough for AI to parse and reason about, while the code you write stays readable and maintainable by humans.',
                ),
                tag.ul(
                  tag.li(
                    tag.strong('AI-parseable: '),
                    'The entire framework and your code on top of it can be easily understood and extended by AI',
                  ),
                  tag.li(
                    tag.strong('Human-readable: '),
                    'The code remains clean, maintainable, and easy to reason about',
                  ),
                  tag.li(
                    tag.strong('Declarative & local: '),
                    'Logic is expressed with locality of behavior—each behavior lives next to the element it affects',
                  ),
                  tag.li(
                    tag.strong('Fully testable: '),
                    'The trait-based architecture makes every single line testable',
                  ),
                ),
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
                        trait.style('display', 'grid'),
                        trait.style('gridTemplateColumns', 'repeat(auto-fit, minmax(300px, 1fr))'),
                        trait.style('gap', '10px'),
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
                            tag.div(trait.style('fontWeight', 'bold'), 'Core'),
                            tag.div(`Core library (required)`),
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
                              trait.style('lineHeight', '1.4'),
                              tag.div(trait.style('fontWeight', 'bold'), name),
                              tag.div(`${desc}`),
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
                              trait.style('lineHeight', '1.4'),
                              tag.div(trait.style('fontWeight', 'bold'), name),
                              tag.div(`${desc}`),
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
                      subtitle:
                        'Template provides element creators and access to registered Traits',
                      level: 3,
                      content: Code(`const [tag, trait] = Template({ event: useEventTrait });`),
                    }),
                    Section({
                      title: '3. Build Elements with Reactive Bindings',
                      subtitle:
                        'Use the tag proxy to create elements and trait proxy to attach behaviors',
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
                  title: 'Creating State',
                  level: 2,
                  subtitle: 'State is created by calling the State function with an initial value.',
                  content: Code(`const count = State(0); // creates a State holding the number 0`),
                }),
                Section({
                  title: 'Creating Typed State',
                  level: 2,
                  subtitle:
                    'You can create typed State objects by providing a type parameter to the State function.',
                  content: Code(
                    `const name = State<string>(''); // creates a State holding a string`,
                  ),
                }),
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
                        'Using the $ callback versions of State methods produces cleaner, more concise code.',
                      level: 3,
                      content: [
                        Code(`
        // Create a State to hold a count
        const count = State(0);                  
                          
        // Verbose: Needs an arrow function wrapper
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
                tag.p(
                  "Note: For a complete list of available Traits, see the 'Traits' section below.",
                ),
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

                Section({
                  title: 'Custom Traits',
                  level: 2,
                  subtitle:
                    'Creating custom Traits is straightforward. A Trait is simply a function that takes an element and any number of arguments, applies behavior, and returns an optional cleanup function. See the Ready-Made Traits source code for examples on making reactive Traits.',
                  content: Code(`function useNoopTrait(el: HTMLElement) {
          // do anything with the element here
          return () => {}; // optional cleanup function
        }`),
                }),
              ],
            }),

            // ============================================
            // HELPERS
            // ============================================

            Section({
              title: 'Helpers',
              level: 1,
              subtitle: 'OEM has several helper functions to streamline common tasks.',
              content: [
                Section({
                  title: 'The $test Helper',
                  level: 2,
                  subtitle: `The $test helper creates a Condition closure that can be used for testing within Traits and State methods. It has a type key of '$test' to allow Traits to introspect and subscribe to changes automatically (Also see 'extractConditions' helper).`,
                  content: Code(`const isActive = State(false);
        // Value check
        const el = tag.div(
          trait.style('display', 'block', $test(isActive, true)),
          trait.style('display', 'none', $test(isActive, false)),
        );
        
        // Function result check
        const el2 = tag.div(
          trait.style('display', 'block', $test(somefunc, true)),
          trait.style('display', 'none', $test(someval, 'is this val')),
        );
        `),
                }),
                Section({
                  title: 'The extractStates and extractConditions Helpers',
                  level: 2,
                  subtitle: `These two helpers are used within Traits to separate State objects from Condition closures in the arguments passed to a Trait. This allows Traits to manage subscriptions and reactivity properly. Under the hood a "state" is any object with a "sub" method (i.e., a State object), and a condition is any function with a "type" key of "$test".`,
                  content:
                    Code(`function useMultiStateTrait(el: HTMLElement, ...rest: (StateType<any> | Condition)[]) {
          const states = extractStates(...rest);
          const conditions = extractConditions(...rest);
          const apply = () => {
            // Do something with the current state values if conditions are met
          };
          states.forEach((state) => state.sub(apply));
          apply();
          return () => {
            // Cleanup subscriptions if needed
          };
        }`),
                }),
              ],
            }),

            // ============================================
            // EXAMPLES
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
                          trait.attr(
                            'href',
                            `https://github.com/linttrapmedia/oem/tree/main/${path}`,
                          ),
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
          ),
        ),
      ),
    ),
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return;
  root.appendChild(App());
});
