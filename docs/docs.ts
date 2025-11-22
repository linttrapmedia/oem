import { tag, trait } from './config';
import { Box } from './parts/Box';
import { Code, InlineCode } from './parts/Code';
import { Page } from './parts/Page';
import { Section } from './parts/Section';

export const Docs = () =>
  Page(
    Page.Header('oem', 'The roll your own framework framework'),

    Section({
      title: 'Menu',
      type: 'main',
      content: Box(
        'column',
        0,
        tag.ul(
          tag.li(
            tag.a(
              trait.attr('href', 'https://github.com/linttrapmedia/oem'),
              trait.attr('target', '_blank'),
              'GITHUB',
            ),
          ),
          tag.li(tag.a(trait.attr('href', '#what-is-oem'), 'What is OEM?')),
          tag.li(tag.a(trait.attr('href', '#philosophy'), 'Philosophy')),
          tag.li(tag.a(trait.attr('href', '#why-oem'), 'Why OEM?')),
          tag.li(tag.a(trait.attr('href', '#installation'), 'Installation')),
          tag.li(tag.a(trait.attr('href', '#quick-example'), 'Quick Example')),
          tag.li(tag.a(trait.attr('href', '#state'), 'State')),
          tag.li(tag.a(trait.attr('href', '#the-dollar-pattern'), 'The $ Pattern')),
          tag.li(tag.a(trait.attr('href', '#templating'), 'Templating')),
          tag.li(tag.a(trait.attr('href', '#components'), 'Components')),
          tag.li(tag.a(trait.attr('href', '#svg-support'), 'SVG Support')),
          tag.li(tag.a(trait.attr('href', '#storage'), 'Storage')),
          tag.li(tag.a(trait.attr('href', '#traits'), 'Traits')),
          tag.li(tag.a(trait.attr('href', '#reactive-pattern'), 'The Reactive Pattern')),
          tag.li(tag.a(trait.attr('href', '#ready-made-states'), 'Ready-Made States')),
          tag.li(tag.a(trait.attr('href', '#creating-custom-traits'), 'Creating Custom Traits')),
          tag.li(tag.a(trait.attr('href', '#examples'), 'Examples')),
          tag.li(tag.a(trait.attr('href', '#core-methods'), 'Core Methods')),
        ),
      ),
    }),

    Section({
      title: 'What is OEM?',
      type: 'main',
      subtitle: 'A ~2KB micro-library for building reactive UIs with vanilla TypeScript',
      content: Box(
        'column',
        20,
        tag.p(
          'OEM provides three minimal building blocks that you combine to create your own UI framework. ',
          'Think of it as a construction kit rather than a complete framework.',
        ),

        tag.ul(
          trait.style('listStyle', 'none'),
          trait.style('marginTop', '20px'),
          tag.li(
            tag.strong(trait.style('fontWeight', 'bold'), 'State'),
            ' - Reactive state management with pub/sub pattern',
          ),
          tag.li(
            tag.strong('Template'),
            ' - Proxy-based HTML/SVG element creation with trait behaviors',
          ),
          tag.li(
            tag.strong('Storage'),
            ' - Persistent state with web storage and custom sync methods',
          ),
        ),

        tag.p(
          trait.style('marginTop', '20px'),
          'OEM itself is just the core. Traits (event handlers, styles, attributes, etc.) are ',
          tag.strong('reference implementations'),
          ' you copy and customize for your needs.',
        ),
      ),
    }),

    Section({
      title: 'Philosophy',
      type: 'main',
      subtitle: 'Understand every line of code in your framework',
      content: Box(
        'column',
        20,
        tag.p(
          'Most frameworks are black boxes. OEM is different - it gives you the minimal core and ',
          tag.strong('shows you how to build the rest'),
          '. This means:',
        ),

        tag.ul(
          trait.style('marginTop', '20px'),
          tag.li(
            tag.strong('You control the code'),
            ' - Traits are copied into your project, not imported from a package',
          ),
          tag.li(tag.strong('No magic'), ' - The entire core is ~300 lines of readable TypeScript'),
          tag.li(
            tag.strong('Learn by doing'),
            ' - Modify traits or create new ones to understand how reactivity works',
          ),
          tag.li(
            tag.strong('AI-friendly'),
            ' - Simple, predictable patterns that AI assistants can understand and extend',
          ),
        ),

        tag.p(
          trait.style('marginTop', '20px'),
          'When you use OEM, you\'re not "using a framework" - you\'re building your own with guidance.',
        ),
      ),
    }),

    Section({
      title: 'Why OEM?',
      type: 'main',
      content: Box(
        'column',
        0,
        tag.ul(
          trait.style('listStyle', 'none'),
          tag.li('✓ Lightweight (~2KB minified core)'),
          tag.li('✓ Zero dependencies'),
          tag.li('✓ Locality of behavior - traits keep behavior next to markup'),
          tag.li('✓ Full TypeScript support with excellent type inference'),
          tag.li('✓ Reactive DOM without virtual DOM overhead'),
          tag.li('✓ Copy only what you need - no bloat'),
          tag.li('✓ Perfect for learning reactive patterns'),
        ),
      ),
    }),

    Section({
      title: 'Quick Example',
      subtitle: "Here's a simple counter to show you how OEM works:",
      content: Code(`
// Create template with traits
const [tag, trait] = Template({
  event: useEventTrait,
});

// Create reactive state
const count = State(0);

// Generate DOM
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
      title: 'Installation',
      content: Code(`npm install @linttrap/oem`, 'bash'),
    }),

    Section({
      title: 'State',
      type: 'main',
      subtitle: 'Create a state object with an initial value:',
      content: Code(`import { State } from '@linttrap/oem';

const count = State(0);
const name = State('Alice');
const user = State({ id: 1, name: 'Bob' });

// With TypeScript
const color = State<'red' | 'green' | 'blue'>('red');`),
    }),

    Section({
      title: 'Getting Values',
      content: Box(
        'column',
        0,
        tag.p('Use ', InlineCode('val()'), ' to get the current value:'),
        Code(`const count = State(10);
count.val(); // 10`),
        tag.p('Use ', InlineCode('$val()'), ' to get a closure that returns the value:'),
        Code(`const getCount = count.$val();
getCount(); // 10`),
      ),
    }),

    Section({
      title: 'Setting Values',
      content: Box(
        'column',
        0,
        tag.p('Set a new value with ', InlineCode('set(value)'), ':'),
        Code(`count.set(5);`),
        tag.p(
          'Use ',
          InlineCode('$set(value)'),
          ' to get a closure that sets the value when called:',
        ),
        Code(`const setToTen = count.$set(10);
setToTen(); // count is now 10

// Perfect for event handlers
tag.button(trait.event('click', count.$set(0)), 'Reset')`),

        tag.p('Update based on previous value with ', InlineCode('reduce(fn)'), ':'),
        Code(`count.reduce((prev) => prev + 1);`),

        tag.p('Use ', InlineCode('$reduce(fn)'), ' to get a closure for event handlers:'),
        Code(`tag.button(
  trait.event('click', count.$reduce((n) => n + 1)), 'Increment')
)`),
      ),
    }),

    Section({
      title: 'Subscribing to Changes',
      content: Box(
        'column',
        0,
        tag.p('Subscribe to state changes. Returns an unsubscribe function:'),
        Code(`const unsub = count.sub((newValue) => {
  console.log('Count changed:', newValue);
});

count.set(5); // Logs: "Count changed: 5"

// Unsubscribe
unsub();`),
      ),
    }),

    Section({
      title: 'Testing Values',
      content: Box(
        'column',
        0,
        tag.p('Test if current value matches a condition:'),
        Code(`const color = State('red');
    
// Direct comparison
color.test('red'); // true
color.test('blue'); // false

// Inverse check
color.test('red', false); // false

// Function predicate
const items = State([1, 2, 3]);
items.test((arr) => arr.length > 2); // true

// Regular expression
const name = State('Alice');
name.test(/^A/); // true

// Use in traits
tag.div(
  trait.style('display', 'block', isVisible.$test(true))
)`),
      ),
    }),

    Section({
      title: 'Method Calls',
      content: Box(
        'column',
        0,
        tag.p(
          InlineCode('call(...)'),
          ' to call methods on boxed primitives (String, Number, Boolean):',
        ),
        Code(`const text = State('hello world');
text.call('toUpperCase'); // 'HELLO WORLD'

const num = State(3.14159);
num.call('toFixed', 2); // '3.14'

// Use $call for reactive updates
tag.div(
  trait.html(count.$call('toUpperCase'))
)`),

        tag.p(InlineCode('chain(...)'), ' to chain multiple method calls:'),
        Code(`const text = State('  hello world  ');
text.chain(
  ['trim'],
  ['toUpperCase'],
  ['split', ' ']
); // ['HELLO', 'WORLD']

// Use $chain for reactive updates
tag.div(
  trait.html(
    text.$chain(['toUpperCase'], ['split', ''])
  )
)`),
      ),
    }),

    Section({
      title: 'The $ Pattern',
      type: 'main',
      subtitle: 'Understanding closures and reactive bindings',
      content: Box(
        'column',
        20,
        tag.p(
          'Every State method has a $ version that returns a ',
          tag.strong('closure'),
          ' - a function you can call later. This is crucial for two reasons:',
        ),

        tag.h4(trait.style('marginTop', '20px'), '1. Event Handlers'),
        tag.p("Without closures, you'd need wrapper functions everywhere:"),
        Code(`// Without $ pattern - verbose
tag.button(
  trait.event('click', () => count.set(0)),
  'Reset'
)

// With $ pattern - clean
tag.button(
  trait.event('click', count.$set(0)),
  'Reset'
)`),

        tag.h4(trait.style('marginTop', '20px'), '2. Reactive UI Updates'),
        tag.p(
          'The Template system automatically subscribes to ',
          InlineCode('$val'),
          ', ',
          InlineCode('$test'),
          ', and other $ methods, updating the UI when state changes:',
        ),
        Code(`const count = State(0);

// This text auto-updates when count changes
tag.h1(count.$val)

// This button appears/disappears based on count
tag.div(
  trait.style('display', 'block', count.$test(0, false)), // Hide when count is 0
  trait.style('display', 'none', count.$test(0)),          // Show when count is 0
  'Count is not zero'
)`),

        tag.h4(trait.style('marginTop', '20px'), 'Complete Method Reference'),
        tag.table(
          trait.style('width', '100%'),
          trait.style('borderCollapse', 'collapse'),
          trait.style('marginTop', '20px'),
          trait.html([
            tag.thead(
              trait.html(
                tag.tr(
                  trait.html([
                    tag.th(
                      trait.style('textAlign', 'left'),
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '2px solid black'),
                      'Method',
                    ),
                    tag.th(
                      trait.style('textAlign', 'left'),
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '2px solid black'),
                      '$ Version',
                    ),
                    tag.th(
                      trait.style('textAlign', 'left'),
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '2px solid black'),
                      'Primary Use',
                    ),
                  ]),
                ),
              ),
            ),
            tag.tbody(
              trait.html([
                tag.tr(
                  trait.html([
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      trait.html(InlineCode('val()')),
                    ),
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      trait.html(InlineCode('$val()')),
                    ),
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      'Reactive text/content',
                    ),
                  ]),
                ),
                tag.tr(
                  trait.html([
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      trait.html(InlineCode('set(v)')),
                    ),
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      trait.html(InlineCode('$set(v)')),
                    ),
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      'Event handlers',
                    ),
                  ]),
                ),
                tag.tr(
                  trait.html([
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      trait.html(InlineCode('reduce(fn)')),
                    ),
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      trait.html(InlineCode('$reduce(fn)')),
                    ),
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      'Event handlers',
                    ),
                  ]),
                ),
                tag.tr(
                  trait.html([
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      trait.html(InlineCode('test(p)')),
                    ),
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      trait.html(InlineCode('$test(p)')),
                    ),
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      'Conditional visibility/styles',
                    ),
                  ]),
                ),
                tag.tr(
                  trait.html([
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      trait.html(InlineCode('call(m)')),
                    ),
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      trait.html(InlineCode('$call(m)')),
                    ),
                    tag.td(
                      trait.style('padding', '10px'),
                      trait.style('borderBottom', '1px solid black'),
                      'Transform values (map, filter, etc.)',
                    ),
                  ]),
                ),
              ]),
            ),
          ]),
        ),
      ),
    }),

    Section({
      title: 'Templating',
      type: 'main',
      subtitle:
        'The Template function takes a configuration object mapping trait names to functions:',
      content: Code(`import { Template } from '@linttrap/oem';
import { useStyleTrait } from '@linttrap/oem/traits/Style';
import { useEventTrait } from '@linttrap/oem/traits/Event';

const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
});`),
    }),

    Section({
      title: 'The Tag Proxy',
      subtitle: 'Creates HTML/SVG elements with full TypeScript support:',
      content: Code(`const div = tag.div();
const button = tag.button();
const svg = tag.svg();
const circle = tag.circle();

// All HTML and SVG elements available!`),
    }),

    Section({
      title: 'The Trait Proxy',
      subtitle: 'Provides access to configured trait functions:',
      content: Code(`// After configuration, you have:
trait.style('color', 'red');
trait.event('click', handleClick);
// ... all your configured traits`),
    }),

    Section({
      title: 'Applying Traits',
      subtitle: 'Pass traits as arguments to tag functions:',
      content: Box(
        'column',
        0,
        Code(`tag.div(
  trait.style('padding', '20px'),
  trait.style('color', 'blue'),
 ...
)`),
      ),
    }),

    Section({
      title: 'Working with Children',
      content: Box(
        'column',
        0,
        tag.p('Simple Children'),
        Code(`tag.p('This is a paragraph')
tag.h1('Title')
tag.span(123)`),

        tag.p('Nested Elements'),
        Code(`tag.div(
  tag.h1('Title'),
  tag.p('Description'),
  tag.button('Click me')
)`),

        tag.p('Dynamic Children'),
        Code(`
const msg = State('Hello, World!');
const items = State(['Apple', 'Banana', 'Orange']);

tag.div(msg.$val); // Reactive message

tag.ul(
  trait.html(
    items.$call('map', (item) => tag.li(item)) // Reactive list items
  )
)`),
      ),
    }),

    Section({
      title: 'Subscribing to State Changes',
      content: Box(
        'column',
        0,
        tag.p('Using ', InlineCode('$val()'), ' in traits automatically subscribes to changes:'),
        Code(`tag.p(someState.$val)`),
        tag.p(
          'To subscribe manually, simply add the state object to the trait arguments (trait must support it):',
        ),
        Code(`trait.style('display', 'block', isVisible.val, isVisible)`),
        tag.p(
          'This pattern then supports multiple state objects. The value needs to be a function (so you can recompute it when the state changes):',
        ),
        Code(`trait.style('opacity', () => 'computed value', stateObject1, stateObject2)`),
      ),
    }),

    Section({
      title: 'Component Functions',
      type: 'main',
      subtitle: 'Components are just functions that return elements:',
      content: Code(`function Button(text: string, onClick: () => void) {
  return tag.button(
    trait.style('padding', '10px 20px'),
    trait.style('backgroundColor', 'blue'),
    trait.style('color', 'white'),
    trait.style('border', 'none'),
    trait.style('borderRadius', '5px'),
    trait.style('cursor', 'pointer'),
    trait.event('click', onClick),
    text
  );
}

// Use it
const app = tag.div(
  Button('Click me', () => console.log('Clicked!'))
);`),
    }),

    Section({
      title: 'SVG Support',
      type: 'main',
      subtitle: 'Full support for SVG elements:',
      content: Code(`const icon = tag.svg(
  trait.attr('width', '24'),
  trait.attr('height', '24'),
  trait.attr('viewBox', '0 0 24 24'),

  tag.circle(
    trait.attr('cx', '12'),
    trait.attr('cy', '12'),
    trait.attr('r', '10'),
    trait.style('fill', 'blue')
  ),

  tag.path(
    trait.attr('d', 'M12 2L2 22h20L12 2z'),
    trait.style('fill', 'white')
  )
);`),
    }),

    Section({
      title: 'How It All Works Together',
      type: 'main',
      subtitle: 'Understanding the complete picture',
      content: Box(
        'column',
        20,
        tag.p("Let's connect the dots on how OEM's pieces create a reactive UI:"),

        tag.h4(trait.style('marginTop', '20px'), '1. You Create State'),
        Code(`const count = State(0);`),

        tag.h4(trait.style('marginTop', '20px'), '2. You Configure a Template with Traits'),
        Code(`const [tag, trait] = Template({
  event: useEventTrait,
  style: useStyleTrait,
});`),

        tag.h4(trait.style('marginTop', '20px'), '3. You Build Elements with Reactive Bindings'),
        Code(`const app = tag.div(
  // This text updates when count changes
  tag.h1(count.$val),

  // This button modifies count
  tag.button(
    trait.event('click', count.$reduce(n => n + 1)),
    'Increment'
  )
);`),

        tag.h4(trait.style('marginTop', '20px'), '4. Behind the Scenes'),
        tag.ul(
          trait.style('marginTop', '10px'),
          tag.li(
            'The Template sees ',
            InlineCode('count.$val'),
            ' and automatically subscribes to it',
          ),
          tag.li('When you click the button, ', InlineCode('count.$reduce'), ' updates the state'),
          tag.li("State notifies all subscribers (including the h1's text node)"),
          tag.li('The UI updates automatically - no manual DOM manipulation needed'),
        ),

        tag.p(
          trait.style('marginTop', '20px'),
          tag.strong('This is the entire reactive loop.'),
          ' No virtual DOM diffing, no complex lifecycle hooks, no magic. Just pub/sub with smart subscription management.',
        ),
      ),
    }),

    Section({
      title: 'Storage',
      type: 'main',
      subtitle: 'Automatically sync state with localStorage, sessionStorage, or memory:',
      content: Code(`import { Storage, State } from '@linttrap/oem';

const storage = Storage({
  data: {
    username: {
      key: 'app-username',
      state: State(''),
      storage: 'localStorage',
    },
    theme: {
      key: 'app-theme',
      state: State<'light' | 'dark'>('light'),
      storage: 'localStorage',
    },
    sessionToken: {
      key: 'app-session',
      state: State(''),
      storage: 'sessionStorage',
    },
  },
});`),
    }),

    Section({
      title: 'Storage Types',
      content: Box(
        'column',
        0,
        tag.ul(
          trait.style('fontSize', '16px'),
          trait.style('lineHeight', '1.2'),
          trait.html([
            tag.li(InlineCode('localStorage'), ' - Persists across browser sessions'),
            tag.li(InlineCode('sessionStorage'), ' - Cleared when tab/window closes'),
            tag.li(InlineCode('memory'), ' - No persistence, runtime only'),
          ]),
        ),
      ),
    }),

    Section({
      title: 'Accessing State',
      subtitle: 'Access state objects directly from the storage:',
      content: Code(`// Get value
console.log(storage.data.username.val());

// Set value (automatically saves to localStorage)
storage.data.username.set('Alice');

// Subscribe to changes
storage.data.username.sub((value) => {
  console.log('Username changed:', value);
});`),
    }),

    Section({
      title: 'Sync Methods',
      subtitle: 'Define custom methods for syncing with external sources:',
      content: Code(`const storage = Storage({
  data: {
    todos: {
      key: 'todos',
      state: State([]),
      storage: 'localStorage',
    },
  },
  sync: {
    fetchTodos: async () => {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      storage.data.todos.set(todos);
    },
    saveTodo: async (todo) => {
      await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
      });
      storage.sync.fetchTodos();
    },
  },
});

// Use sync methods
await storage.sync.fetchTodos();
await storage.sync.saveTodo({ title: 'New Todo', completed: false });`),
    }),

    Section({
      title: 'Complete Storage Example',
      subtitle: 'Todo app with persistent storage:',
      content: Code(`import { Storage, State } from '@linttrap/oem';

const storage = Storage({
  data: {
    newTodo: {
      key: 'todo-input',
      state: State(''),
      storage: 'localStorage',
    },
    todos: {
      key: 'todos',
      state: State([]),
      storage: 'localStorage',
    },
  },
  sync: {
    addTodo: () => {
      const title = storage.data.newTodo.val().trim();
      if (title) {
        storage.data.todos.reduce((curr) => [
          ...curr,
          { title, completed: false }
        ]);
        storage.data.newTodo.set('');
      }
    },
    toggleTodo: (id) => {
      storage.data.todos.reduce((curr) =>
        curr.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
    },
  },
});`),
    }),

    Section({
      title: 'What are Traits?',
      type: 'main',
      subtitle: "The secret sauce behind OEM's extensibility",
      content: Box(
        'column',
        20,
        tag.p(
          'A trait is a function that applies behavior to a DOM element. Traits are what make OEM powerful - ',
          "they're how you add event handlers, styles, attributes, and any other behavior you can imagine.",
        ),

        tag.h4(trait.style('marginTop', '20px'), 'Basic Structure'),
        Code(`function useMyTrait(
  el: HTMLElement,
  param1: string,
  ...rest: (StateType<any> | Condition)[]
) {
  // Apply behavior to element
  el.textContent = param1;

  // Return cleanup function
  return () => {
    // Clean up resources when element is removed
  };
}`),

        tag.p(
          trait.style('marginTop', '20px'),
          tag.strong('Key Point:'),
          ' Traits are ',
          tag.strong('NOT imported from OEM'),
          '. You copy the reference implementations from the ',
          InlineCode('src/traits/'),
          ' folder into your project and customize them as needed.',
        ),
      ),
    }),

    Section({
      title: 'Ready-Made Traits',
      subtitle: 'Pre-built traits you can copy from src/traits/ and install in your project',
      content: Box(
        'column',
        0,
        tag.table(
          trait.style('width', '100%'),
          trait.style('borderCollapse', 'collapse'),
          tag.thead(
            tag.tr(
              tag.th(
                trait.style('textAlign', 'left'),
                trait.style('padding', '10px'),
                trait.style('borderBottom', '2px solid black'),
                'Trait',
              ),
              tag.th(
                trait.style('textAlign', 'left'),
                trait.style('padding', '10px'),
                trait.style('borderBottom', '2px solid black'),
                'Description',
              ),
            ),
          ),
          tag.tbody(
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('useAttributeTrait'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Apply HTML attributes',
              ),
            ),
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('useClassNameTrait'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Manage CSS classes',
              ),
            ),
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('useEventTrait'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Attach event listeners',
              ),
            ),
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('useFocusTrait'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Control element focus',
              ),
            ),
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('useInnerHTMLTrait'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Set innerHTML reactively',
              ),
            ),
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('useInputValueTrait'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Bind input values',
              ),
            ),
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('useInputEvent'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Handle input events',
              ),
            ),
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('useStyleTrait'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Apply CSS styles',
              ),
            ),
            tag.tr(
              tag.td(trait.style('padding', '10px'), InlineCode('useTextContentTrait')),
              tag.td(trait.style('padding', '10px'), 'Set text content reactively'),
            ),
          ),
        ),
      ),
    }),

    Section({
      title: 'Example Usage of Ready-Made Traits',

      content: Box(
        'column',
        0,
        tag.p('Apply HTML attributes to elements'),
        Code(`import { useAttributeTrait } from '@linttrap/oem/traits/Attribute';

trait.attr('type', 'text')
trait.attr('placeholder', 'Enter name')
trait.attr('disabled', 'true', isDisabled.$val)`),

        tag.p('Manage CSS classes'),
        Code(`import { useClassNameTrait } from '@linttrap/oem/traits/ClassName';

trait.class('container')
trait.class('active', isActive.$val)`),

        tag.p('Attach event listeners'),
        Code(`import { useEventTrait } from '@linttrap/oem/traits/Event';

trait.event('click', handleClick)
trait.event('submit', handleSubmit, 'Click me')`),

        tag.p('Apply CSS styles'),
        Code(`import { useStyleTrait } from '@linttrap/oem/traits/Style';

trait.style('padding', '20px')
trait.style('color', 'red')
trait.style('--custom-var', 'blue') // CSS variables
trait.style('display', 'block', isVisible.$test(true)) // Show when true
trait.style('display', 'none', isVisible.$test(false)) // Hide when false
`),

        tag.p('Set innerHTML reactively with arrays of elements'),
        Code(`import { useInnerHTMLTrait } from '@linttrap/oem/traits/InnerHTML';

trait.html('<strong>Bold</strong>')
trait.html(items.$call('map', item => tag.li(item))) // Reactive list
trait.html('Visible', isVisible.$val)`),

        tag.p('Bind input values to state'),
        Code(`import { useInputValueTrait } from '@linttrap/oem/traits/InputValue';

tag.input(trait.value(name.$val))`),

        tag.p('Control element focus'),
        Code(`import { useFocusTrait } from '@linttrap/oem/traits/Focus';

trait.focus(shouldFocus.$val)`),
      ),
    }),

    Section({
      title: 'The Reactive Pattern',
      type: 'main',
      subtitle: 'All Ready-Made traits support reactive parameters:',
      content: Box(
        'column',
        0,
        tag.p(
          'You can subscribe to state changes two ways. Support is 100% dependent on the trait implementation.',
        ),
        Code(`
// by using a $ methods
trait.style('display', 'block', isVisible.$val)
trait.style('display', 'none', isVisible.$test(false))
trait.style('display', 'flex', isVisible.$call('toString'))

// by passing state objects as additional arguments
trait.style('opacity', () => 'computed value', stateObject1, stateObject2)
          `),
      ),
    }),

    Section({
      title: 'Ready-Made States',
      type: 'main',
      subtitle:
        'Pre-built state utilities you can copy from src/states/ and install in your project',
      content: Box(
        'column',
        20,
        tag.p(
          'Just like traits, OEM provides ready-made State utilities that handle common patterns. ',
          'These are located in ',
          InlineCode('src/states/'),
          ' and you copy them into your project as needed.',
        ),

        tag.h4(trait.style('marginTop', '20px'), 'Available States'),
        tag.table(
          trait.style('width', '100%'),
          trait.style('borderCollapse', 'collapse'),
          trait.style('marginTop', '10px'),
          tag.thead(
            tag.tr(
              tag.th(
                trait.style('textAlign', 'left'),
                trait.style('padding', '10px'),
                trait.style('borderBottom', '2px solid black'),
                'State',
              ),
              tag.th(
                trait.style('textAlign', 'left'),
                trait.style('padding', '10px'),
                trait.style('borderBottom', '2px solid black'),
                'Description',
              ),
            ),
          ),
          tag.tbody(
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('useMediaQueryState'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Reactive media query state that updates on window resize',
              ),
            ),
          ),
        ),

        tag.h4(trait.style('marginTop', '20px'), 'Example: Media Query State'),
        Code(`import { useMediaQueryState } from '@linttrap/oem/states/MediaQuery';

// Create reactive state for mobile breakpoint
const isMobile = useMediaQueryState({
  maxWidth: 768,
});

// Use it in your UI
const nav = tag.nav(
  trait.style('display', 'block', isMobile.$test(true)),
  trait.style('display', 'none', isMobile.$test(false)),
  'Mobile Navigation'
);

// Or with desktop
const isDesktop = useMediaQueryState({
  minWidth: 1024,
});`),

        tag.p(
          trait.style('marginTop', '20px'),
          tag.strong('More coming soon! '),
          "We're adding more ready-made state utilities like router state, form state, async data state, and more. ",
          'Check ',
          InlineCode('src/states/'),
          ' for the latest additions.',
        ),
      ),
    }),

    Section({
      title: 'Creating Custom Traits',
      subtitle: `Here's the basic ou1tline for creating a custom trait:`,
      content: Code(`function useMyCustomTrait(
  el: HTMLElement,
  text: string,
  ...rest: (StateType<any> | Condition)[]
) {

  // get your list of conditions and state
  const isStateObj = (i: any) => i && 'sub' in i;
  const states = rest.filter(isStateObj);
  const conditions = rest.filter(i => !isStateObj(i));

  // create an apply function to set the trait behavior
  const apply = () => {
    const applies = conditions.every(c =>
      typeof c === 'function' ? c() : c
    );
    if (applies) {
      // YOUR CODE GOES HERE
    }
  };

  // initial application
  apply();

  // subscribe to state changes
  const unsubs = states.map(state => state.sub(apply));

  // return cleanup function
  return () => unsubs.forEach(unsub => unsub());
}

// Use it
const [tag, trait] = Template({
  tooltip: useTooltipTrait,
});

tag.button(
  trait.tooltip('Click to submit'),
  'Submit'
)`),
    }),

    Section({
      title: 'Examples',
      type: 'main',
      subtitle: 'Real-world examples showing how the pieces fit together',
      content: Box('column', 0),
    }),

    Section({
      title: 'Example: Counter App',
      subtitle: 'A simple counter demonstrating state and events:',
      content: Code(`// Create template with traits
const [tag, trait] = Template({
  event: useEventTrait,
});

// Create reactive state
const count = State(0);

// Build UI
const app = tag.div(
  tag.h1(count.$val),
  tag.button(
    trait.event(
      'click',
      count.$reduce((n) => n + 1),
    ),
    'Increment',
  ),
);`),
    }),

    Section({
      title: 'Example: Todo List',
      subtitle: 'Complete todo app with localStorage persistence:',
      content: Code(`
const [tag, trait] = Template({
  attr: useAttributeTrait,
  event: useEventTrait,
  style: useStyleTrait,
  focus: useFocusTrait,
  value: useInputValueTrait,
  input: useInputEvent,
  html: useInnerHTMLTrait,
});

const view = tag.div(
  tag.form(
    trait.event('submit', (e) => e!.preventDefault()),
    tag.input(
      trait.attr('id', 'new-todo'),
      trait.attr('type', 'text'),
      trait.attr('placeholder', 'New todo...'),
      trait.attr('autofocus', 'true'),
      trait.focus(storage.data.newTodo.$test('')),
      trait.input('input', storage.data.newTodo.set),
      trait.value(storage.data.newTodo.val, storage.data.newTodo),
    ),
    tag.button(trait.event('click', $fsm('ADD')), 'Add'),
  ),
  tag.ul(
    trait.html(
      storage.data.todos.$call('map', (todo: TodoType) =>
        tag.li(
          trait.style('display', 'grid'),
          trait.style('gridTemplateColumns', 'auto min-content min-content'),
          tag.span(trait.style('textDecoration', 'line-through', todo.completed), todo.title),
          tag.button(trait.event('click', $fsm('TOGGLE', todo)), 'Toggle'),
          tag.button(trait.event('click', $fsm('DELETE', todo)), 'Delete'),
        ),
      ),
    ),
  ),
);`),
    }),

    Section({
      title: 'Core Methods',
      subtitle: 'Method signatures for core OEM functions:',
      type: 'main',
      content: Box('column', 20),
    }),

    Section({
      title: 'State<T>(initialValue)',
      subtitle: 'State objects provide the following methods:',
      content: Box(
        'column',
        0,
        Code(`State<T>(initialValue: T): StateType<T>`),
        tag.ul(
          trait.style('lineHeight', '1.8'),
          tag.li(InlineCode('val()'), ' - Get current value'),
          tag.li(InlineCode('set(value)'), ' - Set new value'),
          tag.li(InlineCode('reduce(fn)'), ' - Update based on previous value'),
          tag.li(
            InlineCode('sub(callback)'),
            ' - Subscribe to changes, returns unsubscribe function',
          ),
          tag.li(InlineCode('test(predicate, truthCheck?)'), ' - Test value against condition'),
          tag.li(InlineCode('call(method, ...args)'), ' - Call methods on boxed primitives'),
          tag.li(InlineCode('chain(...calls)'), ' - Chain method calls'),
        ),

        tag.p('All methods have $ prefixed versions that return closures:'),
        tag.ul(
          trait.style('lineHeight', '1.8'),
          tag.li(
            InlineCode('$val()'),
            ', ',
            InlineCode('$set()'),
            ', ',
            InlineCode('$reduce()'),
            ', ',
            InlineCode('$test()'),
            ', ',
            InlineCode('$call()'),
            ', ',
            InlineCode('$chain()'),
          ),
        ),
      ),
    }),

    Section({
      title: 'Template<P>(config)',
      subtitle: 'Create custom templating engines',
      content: Box(
        'column',
        0,
        tag.h4('Signature'),
        Code(`Template<P>(config?: P): [TagProxy, TraitProxy]`),

        tag.h4('Returns'),
        tag.p('Tuple of [tag, trait] proxies:'),
        tag.ul(
          trait.style('lineHeight', '1.8'),
          tag.li(InlineCode('tag'), ' - Creates HTML/SVG elements'),
          tag.li(InlineCode('trait'), ' - Applies configured behaviors'),
        ),

        tag.h4('Example'),
        Code(`const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
});`),
      ),
    }),

    Section({
      title: 'Storage<Data, Sync>(config)',
      subtitle: 'Create persistent state with browser storage',
      content: Box(
        'column',
        0,
        tag.h4('Signature'),
        Code(`Storage<Data, Sync>(config): { data, sync }`),

        tag.h4('Storage Types'),
        tag.ul(
          trait.style('lineHeight', '1.8'),
          tag.li(InlineCode('localStorage'), ' - Persists across sessions'),
          tag.li(InlineCode('sessionStorage'), ' - Current session only'),
          tag.li(InlineCode('memory'), ' - No persistence'),
        ),

        tag.h4('Returns'),
        tag.ul(
          trait.style('lineHeight', '1.8'),
          tag.li(InlineCode('data'), ' - Object with state instances'),
          tag.li(InlineCode('sync'), ' - Object with sync methods'),
        ),
      ),
    }),

    Section({
      title: 'Browser Support',
      type: 'main',
      content: Box(
        'column',
        10,
        tag.p('OEM works in all modern browsers that support ES6+'),
        tag.p('Minimum versions: Chrome 49+, Firefox 18+, Safari 10+, Edge 12+'),
      ),
    }),

    Section({
      title: 'License',
      type: 'main',
      content: Box(
        'column',
        10,
        tag.p('MIT License'),
        tag.p('© ', new Date().getFullYear(), ' Lint Trap Media'),
      ),
    }),
  );
