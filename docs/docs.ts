import { tag, trait } from './config';
import { Box } from './parts/Box';
import { Code, InlineCode } from './parts/Code';
import { Page } from './parts/Page';
import { Section } from './parts/Section';

export const Docs = () =>
  Page(
    Page.Header('oem', 'The Roll Your Own Framework Framework'),

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
          tag.li(tag.a(trait.attr('href', '#core-philosophy'), 'Core Philosophy')),
          tag.li(tag.a(trait.attr('href', '#installation'), 'Installation')),
          tag.li(tag.a(trait.attr('href', '#quick-start'), 'Quick Start')),
          tag.li(tag.a(trait.attr('href', '#state'), 'State: Reactive Data')),
          tag.li(tag.a(trait.attr('href', '#the-pattern'), 'Understanding $ Pattern')),
          tag.li(tag.a(trait.attr('href', '#templating'), 'Templating: DOM Creation')),
          tag.li(tag.a(trait.attr('href', '#storage'), 'Storage: Persistence')),
          tag.li(tag.a(trait.attr('href', '#traits'), 'Traits: Extensibility')),
          tag.li(tag.a(trait.attr('href', '#how-it-works'), 'How It All Works Together')),
          tag.li(tag.a(trait.attr('href', '#ready-made-states'), 'Ready-Made States')),
          tag.li(tag.a(trait.attr('href', '#custom-traits'), 'Creating Custom Traits')),
          tag.li(tag.a(trait.attr('href', '#examples'), 'Examples')),
          tag.li(tag.a(trait.attr('href', '#method-reference'), 'Method Reference')),
        ),
      ),
    }),

    // ============================================
    // CORE PHILOSOPHY
    // ============================================

    Section({
      title: 'Core Philosophy',
      type: 'main',
      subtitle: 'OEM is a ~2KB micro-library for building reactive UIs with vanilla TypeScript',
      content: Box(
        'column',
        20,
        tag.p(
          'OEM provides three minimal building blocks that allow you to construct your own custom UI framework. ',
          'The primary goal is ',
          tag.strong('transparency'),
          ' - removing the "black box" nature of most modern frameworks.',
        ),

        tag.h4(trait.style('marginTop', '20px'), 'Understand Every Line'),
        tag.ul(
          trait.style('marginTop', '10px'),
          tag.li(tag.strong('Core is tiny'), ' - Only ~300 lines of readable TypeScript'),
          tag.li(
            tag.strong('You control the code'),
            ' - Traits are copied into your project, not imported as immutable packages',
          ),
          tag.li(
            tag.strong('No magic'),
            ' - Learn foundational reactive patterns (pub/sub) by modifying and creating behaviors',
          ),
          tag.li(
            tag.strong('AI-friendly'),
            ' - Simple, predictable patterns that AI assistants can understand and extend',
          ),
        ),

        tag.h4(trait.style('marginTop', '20px'), 'Why OEM?'),
        tag.ul(
          trait.style('marginTop', '10px'),
          tag.li('✓ Lightweight (~2KB minified core) with zero dependencies'),
          tag.li('✓ Reactive DOM without virtual DOM overhead'),
          tag.li('✓ Locality of behavior - traits keep behavior next to markup'),
          tag.li('✓ Full TypeScript support with excellent type inference'),
          tag.li('✓ Copy only what you need - no bloat'),
          tag.li('✓ Perfect for learning reactive patterns'),
        ),

        tag.p(
          trait.style('marginTop', '20px'),
          'When you use OEM, you\'re not "using a framework" - you\'re building your own with guidance.',
        ),
      ),
    }),

    // ============================================
    // INSTALLATION
    // ============================================

    Section({
      title: 'Installation',
      content: Code(`npm install @linttrap/oem`, 'bash'),
    }),

    // ============================================
    // QUICK START
    // ============================================

    Section({
      title: 'Quick Start',
      type: 'main',
      subtitle: "Here's the simplest way to show how State and Template work together:",
      content: Code(`import { State, Template } from '@linttrap/oem';
import { useEventTrait } from '@linttrap/oem/traits/Event';

// 1. Configure template with needed traits
const [tag, trait] = Template({
  event: useEventTrait,
});

// 2. Create reactive state
const count = State(0);

// 3. Generate DOM with reactive bindings
const app = tag.div(
  // Reactive text: auto-updates when count changes
  tag.h1(count.$val),

  // Event handler: uses $ pattern for clean syntax
  tag.button(
    trait.event('click', count.$reduce((n) => n + 1)),
    'Increment',
  ),
);

document.body.appendChild(app);`),
    }),

    // ============================================
    // STATE: REACTIVE DATA MANAGEMENT
    // ============================================

    Section({
      title: 'State: Reactive Data Management',
      type: 'main',
      subtitle: 'The State object provides simple reactive state management using the pub/sub pattern',
      content: Box(
        'column',
        20,
        tag.h4('Creating State'),
        Code(`import { State } from '@linttrap/oem';

const count = State(0);
const name = State('Alice');
const user = State({ id: 1, name: 'Bob' });

// With TypeScript
const color = State<'red' | 'green' | 'blue'>('red');`),

        tag.h4(trait.style('marginTop', '20px'), 'State Methods'),
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
                'Description',
              ),
              tag.th(
                trait.style('textAlign', 'left'),
                trait.style('padding', '10px'),
                trait.style('borderBottom', '2px solid black'),
                'Primary Use',
              ),
            ),
          ),
          tag.tbody(
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('val()'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('$val()'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Get current value',
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Reactive text/UI updates',
              ),
            ),
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('set(v)'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('$set(v)'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Set new value',
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Simple value assignment',
              ),
            ),
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('reduce(fn)'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('$reduce(fn)'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Update based on previous value',
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Incrementing counters',
              ),
            ),
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('sub(cb)'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'N/A',
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Subscribe to changes (returns unsubscribe fn)',
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Side effects, manual cleanup',
              ),
            ),
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('test(p)'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('$test(p)'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Test value against predicate/condition',
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Conditional visibility/styles',
              ),
            ),
            tag.tr(
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('call(m)'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                InlineCode('$call(m)'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Call methods on boxed primitives',
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Transform values for display',
              ),
            ),
          ),
        ),

        tag.h4(trait.style('marginTop', '20px'), 'Examples'),
        Code(`const count = State(0);

// Get value
count.val(); // 0

// Set value
count.set(5);

// Update based on previous value
count.reduce((n) => n + 1);

// Subscribe to changes
const unsub = count.sub((value) => {
  console.log('Count changed:', value);
});

// Test value
const isZero = count.test(0); // true/false
count.test((n) => n > 5); // function predicate

// Call methods on boxed primitives
const text = State('hello');
text.call('toUpperCase'); // 'HELLO'`),
      ),
    }),

    // ============================================
    // THE $ PATTERN
    // ============================================

    Section({
      title: 'Understanding the $ Pattern',
      type: 'main',
      subtitle: 'Why dollar-prefixed methods are essential for reactivity and clean syntax',
      content: Box(
        'column',
        20,
        tag.p(
          'The dollar sign (',
          InlineCode('$'),
          ') prefix on State methods (e.g., ',
          InlineCode('$val()'),
          ', ',
          InlineCode('$set(v)'),
          ', ',
          InlineCode('$reduce(fn)'),
          ') is essential for two reasons:',
        ),

        tag.h4(trait.style('marginTop', '20px'), '1. Reactive UI Updates'),
        tag.p(
          'When you use a ',
          InlineCode('$'),
          ' method inside a template function, the template automatically ',
          tag.strong('subscribes'),
          ' to that state. When the state changes, the UI updates automatically.',
        ),
        Code(`const count = State(0);

// This text auto-updates when count changes
tag.h1(count.$val)

// Conditional visibility based on state
tag.div(
  trait.style('display', 'block', count.$test(0, false)), // Hide when 0
  'Count is not zero'
)`),

        tag.h4(trait.style('marginTop', '20px'), '2. Clean Event Handlers'),
        tag.p(
          InlineCode('$'),
          ' methods return a ',
          tag.strong('closure'),
          ' (a function that executes later), allowing clean, wrapper-free event binding:',
        ),
        Code(`// Verbose: Needs an arrow function wrapper
tag.button(
  trait.event('click', () => count.set(0)),
  'Reset'
)

// Clean: Use the $ pattern
tag.button(
  trait.event('click', count.$set(0)),
  'Reset'
)`),

        tag.p(
          trait.style('marginTop', '20px'),
          tag.strong('Key Takeaway:'),
          ' ',
          InlineCode('$'),
          ' methods enable both reactive subscriptions and delayed execution, making your code cleaner and more reactive.',
        ),
      ),
    }),

    // ============================================
    // TEMPLATING: DOM CREATION
    // ============================================

    Section({
      title: 'Templating: DOM Creation',
      type: 'main',
      subtitle: 'The Template function creates the DOM-building tools by configuring Traits',
      content: Box(
        'column',
        20,
        tag.h4('Configuration'),
        tag.p(
          'The Template function takes a configuration object mapping trait names to trait functions:',
        ),
        Code(`import { Template } from '@linttrap/oem';
import { useStyleTrait } from '@linttrap/oem/traits/Style';
import { useEventTrait } from '@linttrap/oem/traits/Event';

// Returns [tag, trait] proxies
const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
});`),

        tag.h4(trait.style('marginTop', '20px'), 'The Tag Proxy'),
        tag.p(
          'Creates standard HTML and SVG elements (',
          InlineCode('tag.div()'),
          ', ',
          InlineCode('tag.h1()'),
          ', ',
          InlineCode('tag.svg()'),
          ', etc.) with full TypeScript support.',
        ),
        Code(`const div = tag.div();
const button = tag.button();
const svg = tag.svg();
const circle = tag.circle();

// All HTML and SVG elements available!`),

        tag.h4(trait.style('marginTop', '20px'), 'The Trait Proxy'),
        tag.p('Provides access to the configured trait functions:'),
        Code(`// After configuration, you have:
trait.style('color', 'red');
trait.event('click', handleClick);`),

        tag.h4(trait.style('marginTop', '20px'), 'Applying Traits and Children'),
        tag.p('Traits and children are simply arguments passed to tag functions:'),
        Code(`tag.div(
  trait.style('padding', '20px'),
  trait.style('color', 'blue'),
  tag.h1('Title'),
  tag.p('Description')
)`),

        tag.h4(trait.style('marginTop', '20px'), 'Components'),
        tag.p('Components are just functions that return elements:'),
        Code(`function Button(text: string, onClick: () => void) {
  return tag.button(
    trait.style('padding', '10px 20px'),
    trait.event('click', onClick),
    text
  );
}

// Use it
const app = tag.div(Button('Click me', () => console.log('clicked')));`),

        tag.h4(trait.style('marginTop', '20px'), 'Dynamic Children'),
        Code(`const msg = State('Hello, World!');
const items = State(['Apple', 'Banana', 'Orange']);

tag.div(msg.$val); // Reactive message

tag.ul(
  trait.html(
    items.$call('map', (item) => tag.li(item))
  )
)`),
      ),
    }),

    // ============================================
    // STORAGE: PERSISTENT STATE
    // ============================================

    Section({
      title: 'Storage: Persistent State',
      type: 'main',
      subtitle:
        'The Storage utility automatically manages and syncs state with web storage or custom methods',
      content: Box(
        'column',
        20,
        tag.h4('Basic Usage'),
        Code(`import { Storage, State } from '@linttrap/oem';

const storage = Storage({
  data: {
    username: {
      key: 'app-username',
      state: State(''),
      storage: 'localStorage', // Persists across sessions
    },
    sessionToken: {
      key: 'app-session',
      state: State(''),
      storage: 'sessionStorage', // Cleared when tab closes
    },
  },
});

// Access state directly
storage.data.username.set('Alice'); // Auto-saves to localStorage
console.log(storage.data.username.val());`),

        tag.h4(trait.style('marginTop', '20px'), 'Storage Types'),
        tag.ul(
          trait.style('marginTop', '10px'),
          tag.li(InlineCode('localStorage'), ' - Persists across browser sessions'),
          tag.li(InlineCode('sessionStorage'), ' - Cleared when tab/window closes'),
          tag.li(InlineCode('memory'), ' - No persistence, runtime only'),
        ),

        tag.h4(trait.style('marginTop', '20px'), 'Custom Sync Methods'),
        tag.p('Define custom methods for syncing with external sources like APIs:'),
        Code(`const storage = Storage({
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
      ),
    }),

    // ============================================
    // TRAITS: EXTENSIBLE BEHAVIOR
    // ============================================

    Section({
      title: 'Traits: Extensible Behavior',
      type: 'main',
      subtitle:
        'A Trait is a function that applies behavior to a DOM element - this is the extensibility point',
      content: Box(
        'column',
        20,
        tag.h4('Key Concept: Localized Behavior'),
        tag.p(
          'Traits keep behavior next to the markup in a clean, composable way (Locality of Behavior):',
        ),
        Code(`tag.input(
  trait.value(name.$val),           // Input value binding
  trait.event('input', handler),    // Event handler
  trait.style('color', 'red'),      // Style application
)`),

        tag.h4(trait.style('marginTop', '20px'), 'Trait Availability'),
        tag.p(
          tag.strong('Important:'),
          ' Traits are the "roll your own" part of the framework - ',
          tag.strong('you copy them from the source'),
          ' (',
          InlineCode('src/traits/'),
          ') into your project and customize them. They are NOT bundled with the core.',
        ),

        tag.h4(trait.style('marginTop', '20px'), 'Ready-Made Traits'),
        tag.p('Copy these from ', InlineCode('src/traits/'), ':'),
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
                'Apply HTML attributes (disabled, type, etc.)',
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
                InlineCode('useInputValueTrait'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                trait.style('borderBottom', '1px solid black'),
                'Bind input values to state',
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
                'Set innerHTML reactively (useful for lists)',
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
                InlineCode('useTextContentTrait'),
              ),
              tag.td(
                trait.style('padding', '10px'),
                'Set text content reactively',
              ),
            ),
          ),
        ),

        tag.h4(trait.style('marginTop', '20px'), 'Example Usage'),
        Code(`// Apply styles
trait.style('padding', '20px')
trait.style('color', 'red')
trait.style('--custom-var', 'blue') // CSS variables
trait.style('display', 'block', isVisible.$test(true)) // Conditional

// Event handlers
trait.event('click', handleClick)

// HTML attributes
trait.attr('type', 'text')
trait.attr('placeholder', 'Enter name')
trait.attr('disabled', 'true', isDisabled.$val)

// Reactive lists
trait.html(items.$call('map', item => tag.li(item)))`),
      ),
    }),

    // ============================================
    // HOW IT ALL WORKS TOGETHER
    // ============================================

    Section({
      title: 'How It All Works Together',
      type: 'main',
      subtitle: 'Understanding the complete reactive loop',
      content: Box(
        'column',
        20,
        tag.p(
          "Let's connect the dots on how OEM's pieces create a reactive UI:",
        ),

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
          ' No virtual DOM diffing, no complex lifecycle hooks, no magic. Just pub/sub with smart subscription management via WeakMap and MutationObserver for automatic cleanup.',
        ),
      ),
    }),

    // ============================================
    // READY-MADE STATES
    // ============================================

    Section({
      title: 'Ready-Made States',
      type: 'main',
      subtitle: 'Pre-built state utilities you copy from src/states/ into your project',
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

// Desktop breakpoint
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

    // ============================================
    // CREATING CUSTOM TRAITS
    // ============================================

    Section({
      title: 'Creating Custom Traits',
      type: 'main',
      subtitle: "Here's the basic outline for creating a custom trait:",
      content: Box(
        'column',
        20,
        tag.p(
          'A trait function receives the element, required parameters, and any reactive State objects, returning an optional cleanup function:',
        ),
        Code(`function useMyCustomTrait(
  el: HTMLElement,
  text: string,
  ...rest: (StateType<any> | Condition)[]
) {
  // 1. Separate states and conditions
  const isStateObj = (i: any) => i && 'sub' in i;
  const states = rest.filter(isStateObj);
  const conditions = rest.filter(i => !isStateObj(i));

  // 2. Define the logic that applies the behavior
  const apply = () => {
    // Check conditions here (if your trait supports conditional logic)
    const applies = conditions.every(c =>
      typeof c === 'function' ? c() : c
    );
    if (applies) {
      // YOUR CODE GOES HERE: Apply text, change style, etc.
      el.setAttribute('data-text', text);
    }
  };

  // 3. Initial application
  apply();

  // 4. Subscribe to all passed State objects
  const unsubs = states.map(state => state.sub(apply));

  // 5. Return cleanup function (crucial for memory management)
  return () => unsubs.forEach(unsub => unsub());
}

// Use it
const [tag, trait] = Template({
  myTrait: useMyCustomTrait,
});

tag.div(trait.myTrait('Hello', someState.$val))`),

        tag.h4(trait.style('marginTop', '20px'), 'The Reactive Pattern'),
        tag.p(
          'All ready-made traits support reactive parameters. You can subscribe to state changes two ways:',
        ),
        Code(`// By using $ methods
trait.style('display', 'block', isVisible.$val)
trait.style('display', 'none', isVisible.$test(false))
trait.style('display', 'flex', isVisible.$call('toString'))

// By passing state objects as additional arguments
trait.style('opacity', () => 'computed value', stateObject1, stateObject2)`),
      ),
    }),

    // ============================================
    // EXAMPLES
    // ============================================

    Section({
      title: 'Examples',
      type: 'main',
      subtitle: 'Real-world examples showing how the pieces fit together',
      content: Box('column', 0),
    }),

    Section({
      title: 'Example: Counter App',
      subtitle: 'A simple counter demonstrating state and events:',
      content: Code(`import { State, Template } from '@linttrap/oem';
import { useEventTrait } from '@linttrap/oem/traits/Event';

// Create template with traits
const [tag, trait] = Template({
  event: useEventTrait,
});

// Create reactive state
const count = State(0);

// Build UI
const app = tag.div(
  tag.h1(count.$val),
  tag.button(
    trait.event('click', count.$reduce((n) => n + 1)),
    'Increment',
  ),
  tag.button(
    trait.event('click', count.$set(0)),
    'Reset',
  ),
);

document.body.appendChild(app);`),
    }),

    Section({
      title: 'Example: Todo List',
      subtitle: 'Complete todo app with localStorage persistence:',
      content: Code(`import { State, Storage, Template } from '@linttrap/oem';
import { useAttributeTrait } from '@linttrap/oem/traits/Attribute';
import { useEventTrait } from '@linttrap/oem/traits/Event';
import { useStyleTrait } from '@linttrap/oem/traits/Style';
import { useInnerHTMLTrait } from '@linttrap/oem/traits/InnerHTML';
import { useInputValueTrait } from '@linttrap/oem/traits/InputValue';

const [tag, trait] = Template({
  attr: useAttributeTrait,
  event: useEventTrait,
  style: useStyleTrait,
  value: useInputValueTrait,
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
          { id: Date.now(), title, completed: false }
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
});

const view = tag.div(
  tag.form(
    trait.event('submit', (e) => e!.preventDefault()),
    tag.input(
      trait.attr('type', 'text'),
      trait.attr('placeholder', 'New todo...'),
      trait.value(storage.data.newTodo.val, storage.data.newTodo),
    ),
    tag.button(
      trait.event('click', storage.sync.addTodo),
      'Add'
    ),
  ),
  tag.ul(
    trait.html(
      storage.data.todos.$call('map', (todo) =>
        tag.li(
          tag.span(
            trait.style('textDecoration', 'line-through', todo.completed),
            todo.title
          ),
          tag.button(
            trait.event('click', () => storage.sync.toggleTodo(todo.id)),
            'Toggle'
          ),
        ),
      ),
    ),
  ),
);

document.body.appendChild(view);`),
    }),

    Section({
      title: 'Example: SVG Support',
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

    // ============================================
    // METHOD REFERENCE
    // ============================================

    Section({
      title: 'Method Reference',
      type: 'main',
      subtitle: 'Complete API reference for core OEM functions',
      content: Box('column', 20),
    }),

    Section({
      title: 'State<T>(initialValue)',
      subtitle: 'Creates a reactive state object',
      content: Box(
        'column',
        0,
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

        tag.h4('$ Versions (Return Closures)'),
        tag.ul(
          trait.style('lineHeight', '1.8'),
          tag.li(
            InlineCode('$val()'),
            ', ',
            InlineCode('$set(v)'),
            ', ',
            InlineCode('$reduce(fn)'),
            ', ',
            InlineCode('$test(p)'),
            ', ',
            InlineCode('$call(m)'),
            ', ',
            InlineCode('$chain()'),
          ),
        ),
      ),
    }),

    Section({
      title: 'Template<P>(config)',
      subtitle: 'Creates tag and trait proxies for DOM construction',
      content: Box(
        'column',
        0,
        tag.h4('Signature'),
        Code(`Template<P>(config?: P): [TagProxy, TraitProxy]`),

        tag.h4('Returns'),
        tag.p('Tuple of [tag, trait] proxies:'),
        tag.ul(
          trait.style('lineHeight', '1.8'),
          tag.li(InlineCode('tag'), ' - Creates HTML/SVG elements (tag.div, tag.h1, tag.svg, etc.)'),
          tag.li(InlineCode('trait'), ' - Applies configured behaviors (trait.style, trait.event, etc.)'),
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
      subtitle: 'Creates persistent state with browser storage',
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
          tag.li(InlineCode('sync'), ' - Object with custom sync methods'),
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
