import { tag, trait } from './config';
import { Box } from './parts/Box';
import { Code, InlineCode } from './parts/Code';
import { Page } from './parts/Page';
import { Section } from './parts/Section';

export const Docs = () =>
  Page(
    Page.Header('OEM', 'The roll your your own framework framework'),
    Section({
      title: 'What is OEM?',
      subtitle: 'Building blocks for creating your own framework. There are three:',
      content: Box(
        'column',
        20,
        tag.ul(
          trait.style('listStyle', 'none'),
          tag.li(
            tag.strong(trait.style('fontWeight', 'bold'), 'State'),
            ' - Reactive state management with pub/sub pattern',
          ),
          tag.li(
            tag.strong('Template'),
            ' - Create custom templating engines with trait-based behaviors',
          ),
          tag.li(tag.strong('Storage'), ' - Persistent state with web storage and remote syncing'),
        ),
      ),
    }),

    Section({
      title: 'Why OEM?',
      subtitle:
        'Understand the code you write (and AI generates) down to every single line of your framework',
      content: Box(
        'column',
        0,
        tag.ul(
          trait.style('listStyle', 'none'),
          tag.li('✓ Lightweight (~2KB minified)'),
          tag.li('✓ Zero dependencies'),
          tag.li('✓ Locality of behavior patterns with traits'),
          tag.li('✓ Build your own declarative UI framework'),
          tag.li('✓ Full TypeScript support'),
          tag.li('✓ Reactive DOM without a virtual DOM'),
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
      subtitle:
        'Methods prefixed with $ return closures that can be passed as callbacks. Additionally, they support reactive traits:',
      content: Box(
        'column',
        0,
        tag.table(
          trait.style('width', '100%'),
          trait.style('borderCollapse', 'collapse'),
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
                      'Use Case',
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
                      'Get value reactively',
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
                      'Conditional traits',
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
                      'Reactive innerHTML',
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
      title: 'Component Functions',
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
      title: 'Creating Storage',
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
      title: 'Complete Example',
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
      title: 'What Are Traits?',
      subtitle: 'A trait is a function that takes an element and applies behavior to it:',
      content: Code(`function useMyTrait(
  el: HTMLElement,
  param1: string,
  ...rest: (StateType<any> | Condition)[]
) {
  // Apply behavior to element
  el.textContent = param1;

  // Return cleanup function
  return () => {
    // Clean up resources
  };
}`),
    }),

    Section({
      title: 'Built-in Traits',
      content: Box(
        'column',
        0,
        tag.p('Apply HTML attributes to elements'),
        Code(`import { useAttributeTrait } from '@linttrap/oem/traits/Attribute';

trait.attr('type', 'text')
trait.attr('placeholder', 'Enter name')
trait.attr('disabled', 'true', isDisabled.val, isDisabled)`),

        tag.p('Manage CSS classes'),
        Code(`import { useClassNameTrait } from '@linttrap/oem/traits/ClassName';

trait.class('container')
trait.class('active', isActive.val, isActive)`),

        tag.p('Attach event listeners'),
        Code(`import { useEventTrait } from '@linttrap/oem/traits/Event';

trait.event('click', handleClick)
trait.event('submit', handleSubmit, isEnabled.val, isEnabled)`),

        tag.p('Apply CSS styles'),
        Code(`import { useStyleTrait } from '@linttrap/oem/traits/Style';

trait.style('padding', '20px')
trait.style('color', 'red')
trait.style('--custom-var', 'blue') // CSS variables`),

        tag.p('Set innerHTML reactively with arrays of elements'),
        Code(`import { useInnerHTMLTrait } from '@linttrap/oem/traits/InnerHTML';

trait.html('<strong>Bold</strong>')
trait.html(items.$call('map', item => tag.li(item)))
trait.html('Visible', isVisible.val, isVisible)`),

        tag.p('Bind input values to state'),
        Code(`import { useInputValueTrait } from '@linttrap/oem/traits/InputValue';

tag.input(trait.value(name.val, name))`),

        tag.p('Control element focus'),
        Code(`import { useFocusTrait } from '@linttrap/oem/traits/Focus';

trait.focus(shouldFocus.val, shouldFocus)`),
      ),
    }),

    Section({
      title: 'The Reactive Pattern',
      subtitle: 'All traits support reactive parameters:',
      content: Box(
        'column',
        0,
        tag.p('State objects passed as patterns automatically subscribe to changes:'),
        Code(`const isVisible = State(true);

tag.div(
  // Apply when isVisible is true
  trait.style('display', 'block', isVisible.val, isVisible),
  // Apply when isVisible is false
  trait.style('display', 'none', isVisible.$test(false), isVisible)
)`),
        tag.p('Traits automatically re-run when subscribed states change.'),
      ),
    }),

    Section({
      title: 'Creating Custom Traits',
      subtitle: 'Build your own trait functions:',
      content: Code(`function useTooltipTrait(
  el: HTMLElement,
  text: string,
  ...rest: (StateType<any> | Condition)[]
) {
  const isStateObj = (i: any) => i && 'sub' in i;
  const states = rest.filter(isStateObj);
  const conditions = rest.filter(i => !isStateObj(i));

  const apply = () => {
    const applies = conditions.every(c =>
      typeof c === 'function' ? c() : c
    );
    if (applies) {
      el.setAttribute('title', text);
    } else {
      el.removeAttribute('title');
    }
  };

  apply();
  const unsubs = states.map(state => state.sub(apply));

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
      title: 'Counter App',
      subtitle: 'A simple counter demonstrating state and events:',
      content: Code(`import { State, Template } from '@linttrap/oem';
import { useStyleTrait } from '@linttrap/oem/traits/Style';
import { useEventTrait } from '@linttrap/oem/traits/Event';
import { useInnerHTMLTrait } from '@linttrap/oem/traits/InnerHTML';

const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  html: useInnerHTMLTrait,
});

const count = State(0);

const counter = tag.div(
  trait.style('padding', '40px'),
  trait.style('textAlign', 'center'),

  tag.h1(
    trait.style('fontSize', '72px'),
    trait.html(count.$call('toString'))
  ),

  tag.div(
    trait.style('display', 'flex'),
    trait.style('gap', '10px'),
    trait.style('justifyContent', 'center'),

    tag.button(
      trait.event('click', count.$reduce((n) => n - 1)),
      '-'
    ),
    tag.button(
      trait.event('click', count.$set(0)),
      'Reset'
    ),
    tag.button(
      trait.event('click', count.$reduce((n) => n + 1)),
      '+'
    )
  )
);

document.body.appendChild(counter);`),
    }),

    Section({
      title: 'Todo List',
      subtitle: 'Complete todo app with localStorage persistence:',
      content: Code(`import { State, Storage, Template } from '@linttrap/oem';
import { useStyleTrait } from '@linttrap/oem/traits/Style';
import { useEventTrait } from '@linttrap/oem/traits/Event';
import { useInputValueTrait } from '@linttrap/oem/traits/InputValue';
import { useInputEvent } from '@linttrap/oem/traits/InputEvent';
import { useInnerHTMLTrait } from '@linttrap/oem/traits/InnerHTML';

type Todo = { id: number; title: string; completed: boolean };

const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  value: useInputValueTrait,
  input: useInputEvent,
  html: useInnerHTMLTrait,
});

const storage = Storage({
  data: {
    newTodo: {
      key: 'todo-input',
      state: State(''),
      storage: 'localStorage',
    },
    todos: {
      key: 'todos',
      state: State<Todo[]>([]),
      storage: 'localStorage',
    },
  },
  sync: {
    addTodo: () => {
      const title = storage.data.newTodo.val().trim();
      if (title) {
        storage.data.todos.reduce((curr) => [
          ...curr,
          { id: Date.now(), title, completed: false }
        ]);
        storage.data.newTodo.set('');
      }
    },
    toggleTodo: (id: number) => {
      storage.data.todos.reduce((curr) =>
        curr.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
      );
    },
    deleteTodo: (id: number) => {
      storage.data.todos.reduce((curr) => curr.filter((t) => t.id !== id));
    },
  },
});

const app = tag.div(
  trait.style('maxWidth', '600px'),
  trait.style('margin', '50px auto'),

  tag.h1('Todo App'),

  tag.input(
    trait.value(storage.data.newTodo.val, storage.data.newTodo),
    trait.input('input', storage.data.newTodo.set)
  ),

  tag.button(
    trait.event('click', storage.sync.addTodo),
    'Add'
  ),

  tag.ul(
    trait.html(
      storage.data.todos.$call('map', (todo: Todo) =>
        tag.li(
          tag.span(
            trait.style(
              'textDecoration',
              todo.completed ? 'line-through' : 'none'
            ),
            todo.title
          ),
          tag.button(
            trait.event('click', () => storage.sync.toggleTodo(todo.id)),
            'Toggle'
          ),
          tag.button(
            trait.event('click', () => storage.sync.deleteTodo(todo.id)),
            'Delete'
          )
        )
      )
    )
  )
);

document.body.appendChild(app);`),
    }),

    Section({
      title: 'Modal Dialog',
      subtitle: 'Reusable modal component:',
      content:
        Code(`function Modal(title: string, content: HTMLElement, isOpen: StateType<boolean>) {
  return tag.div(
    trait.style('display', 'none', isOpen.$test(false), isOpen),
    trait.style('display', 'flex', isOpen.val, isOpen),
    trait.style('position', 'fixed'),
    trait.style('top', '0'),
    trait.style('left', '0'),
    trait.style('right', '0'),
    trait.style('bottom', '0'),
    trait.style('backgroundColor', 'rgba(0,0,0,0.5)'),
    trait.style('alignItems', 'center'),
    trait.style('justifyContent', 'center'),
    trait.event('click', isOpen.$set(false)),

    tag.div(
      trait.event('click', (e) => e.stopPropagation()),
      trait.style('backgroundColor', 'white'),
      trait.style('padding', '20px'),
      trait.style('borderRadius', '8px'),
      trait.style('maxWidth', '500px'),

      tag.h2(title),
      content,

      tag.button(
        trait.event('click', isOpen.$set(false)),
        'Close'
      )
    )
  );
}

// Usage
const isModalOpen = State(false);

const app = tag.div(
  tag.button(
    trait.event('click', isModalOpen.$set(true)),
    'Open Modal'
  ),

  Modal(
    'Example Modal',
    tag.p('This is modal content'),
    isModalOpen
  )
);`),
    }),

    Section({
      title: 'Dark Mode Toggle',
      subtitle: 'Theme switching with persistence:',
      content: Code(`const storage = Storage({
  data: {
    theme: {
      key: 'app-theme',
      state: State<'light' | 'dark'>('light'),
      storage: 'localStorage',
    },
  },
});

// Apply theme
storage.data.theme.sub((theme) => {
  document.body.style.backgroundColor =
    theme === 'light' ? 'white' : '#1a1a1a';
  document.body.style.color =
    theme === 'light' ? 'black' : 'white';
});

const app = tag.div(
  tag.button(
    trait.event('click', () => {
      const current = storage.data.theme.val();
      storage.data.theme.set(current === 'light' ? 'dark' : 'light');
    }),
    'Toggle Theme'
  )
);`),
    }),

    Section({
      title: 'State<T>(initialValue)',
      subtitle: 'Create reactive state objects',
      content: Box(
        'column',
        20,
        tag.h4('Signature'),
        Code(`State<T>(initialValue: T): StateType<T>`),

        tag.h4('Methods'),
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

        tag.h4('$ Versions'),
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
      title: 'Built-in Traits',
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
      title: 'Browser Support',
      content: Box(
        'column',
        10,
        tag.p(
          'OEM works in all modern browsers that support ES6+, Proxy, WeakMap, Set, and MutationObserver.',
        ),
        tag.p('Minimum versions: Chrome 49+, Firefox 18+, Safari 10+, Edge 12+'),
      ),
    }),
  );
