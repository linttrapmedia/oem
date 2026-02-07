# OEM Code Generation Skill

You are an expert at generating code using OEM, a minimal reactive UI framework. Follow these guidelines when generating OEM code.

## Core Principles

1. **State-First**: Always create State objects before using them in templates
2. **Dollar Pattern**: Use `$` methods (`$val`, `$set`, `$reduce`, `$test`) for reactive bindings and clean event handlers
3. **Trait Configuration**: Configure Template with only the traits you need
4. **Trait Creation**: Create any traits from scratch that are not included by default
5. **Component Functions**: Components are just functions that return elements
6. **No Virtual DOM**: OEM uses direct DOM manipulation with reactive subscriptions

## Import Pattern

```typescript
// Import core
import { State, Template } from '@linttrap/oem';

// Import traits you need
import { useStyleTrait } from '@linttrap/oem';
import { useEventTrait } from '@linttrap/oem';
import { useClassNameTrait } from '@linttrap/oem';
import { useAttributeTrait } from '@linttrap/oem';
import { useInnerHTMLTrait } from '@linttrap/oem';
import { useInputValueTrait } from '@linttrap/oem';
import { useTextContentTrait } from '@linttrap/oem';
import { useFocusTrait } from '@linttrap/oem';
import { useInputEventTrait } from '@linttrap/oem';
import { useStyleOnEventTrait } from '@linttrap/oem';

// Import state utilities if needed
import { useMediaQueryState } from '@linttrap/oem';
```

## State Management

### Creating State

```typescript
// Primitives
const count = State(0);
const name = State('');
const isVisible = State(true);

// Objects
const user = State<{
  name: string;
  age: number;
}>({ name: 'Alice', age: 30 });

// Arrays
const items = State<string[]>(['Apple', 'Banana', 'Orange']);
```

### State Methods

- **Reading**: `state.val()` - Get current value
- **Writing**: `state.set(newValue)` - Set new value
- **Updating**: `state.reduce(prev => prev + 1)` - Update based on previous value
- **Testing**: `state.test(predicate)` - Test value against predicate/regex/function
- **Calling**: `state.call('map', fn)` - Call methods on boxed primitives

### Dollar Methods (Reactive)

Use `$` methods for:

1. **Event handlers** - Returns a closure to avoid verbose arrow functions
2. **Reactive UI updates** - Template automatically subscribes to these

```typescript
// Event handlers - clean syntax
trait.event('click', count.$set(0));
trait.event(
  'click',
  count.$reduce((n) => n + 1),
);

// Reactive text content
tag.h1(count.$val); // Auto-updates when count changes

// Conditional traits
trait.style('display', 'block', isVisible.$test(true));
trait.style(
  'color',
  'red',
  count.$test((n) => n > 10),
);
```

## Template Configuration

Always configure Template with the traits you'll use. **IMPORTANT**: Include `html: useInnerHTMLTrait` if you'll be rendering lists or conditional content:

```typescript
const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  class: useClassNameTrait,
  attr: useAttributeTrait,
  html: useInnerHTMLTrait, // ← Required for lists and conditional rendering!
  value: useInputValueTrait,
});
```

Create any missing traits from scratch as needed.

```typescript
function useCustomTrait(el: HTMLElement, arg1: any, arg2: any) {
  // Custom trait logic here
  return () => {
    // Cleanup logic here
  };
}

const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  custom: useCustomTrait,
});
```

## Element Creation Pattern

```typescript
// Basic element with children
tag.div(tag.h1('Title'), tag.p('Paragraph text'));

// Element with traits
tag.button(trait.style('padding', '10px 20px'), trait.event('click', handleClick), 'Click Me');

// Reactive text
tag.span(count.$val);

// Mixed children
tag.div('Static text ', count.$val, ' more text', tag.span('nested'));
```

**IMPORTANT**: For arrays, lists, or conditional rendering, always use `trait.html()`:

```typescript
// ❌ DON'T use spread operator with map
tag.div(...items.map((item) => tag.li(item)));

// ✅ DO use trait.html() for lists
tag.div(trait.html(() => items.map((item) => tag.li(item)), itemsState));

// ✅ DO use trait.html() for conditional content
tag.div(
  trait.html(() => {
    if (condition) return [tag.span('Shown')];
    return [tag.span('Hidden')];
  }, conditionState),
);
```

**CRITICAL WARNING**: Never pass StateType objects directly to tag elements as children:

```typescript
// ❌ WRONG - StateType passed directly to tag
tag.span(() => count.val() * 2, count); // NEVER DO THIS!
tag.div(someFunction, someState); // NEVER DO THIS!

// ✅ CORRECT - Use $val for reactive text
tag.span(count.$val); // Simple reactive text

// ✅ CORRECT - Use trait.html() for computed/complex values
tag.span(trait.html(() => count.val() * 2, count));
tag.div(trait.html(() => someFunction(), someState));
```

## Common Patterns

### Counter

```typescript
const count = State(0);

const Counter = () =>
  tag.div(
    trait.style('padding', '20px'),
    tag.h1(count.$val),
    tag.button(
      trait.event(
        'click',
        count.$reduce((n) => n + 1),
      ),
      'Increment',
    ),
    tag.button(
      trait.event(
        'click',
        count.$reduce((n) => n - 1),
      ),
      'Decrement',
    ),
    tag.button(trait.event('click', count.$set(0)), 'Reset'),
  );
```

### Form Input

```typescript
const name = State('');

const Input = () =>
  tag.input(
    trait.attr('type', 'text'),
    trait.attr('placeholder', 'Enter name'),
    trait.value(name.$val, name),
    trait.event('input', (e?: any) => name.set((e?.target as HTMLInputElement).value)),
  );
```

### Conditional Visibility

```typescript
const isVisible = State(true);

const Content = () =>
  tag.div(
    tag.button(
      trait.event(
        'click',
        isVisible.$reduce((v) => !v),
      ),
      'Toggle',
    ),
    tag.div(
      trait.style('display', 'block', isVisible.$test(true)),
      trait.style('display', 'none', isVisible.$test(false)),
      'This content toggles',
    ),
  );
```

### Lists

**Always use `trait.html()` for rendering arrays:**

```typescript
const items = State(['Apple', 'Banana', 'Orange']);

const List = () =>
  tag.div(
    tag.ul(trait.html(() => items.val().map((item) => tag.li(item)), items)),
    tag.button(
      trait.event('click', () => {
        items.reduce((list) => [...list, 'New Item']);
      }),
      'Add Item',
    ),
  );
```

**For complex list items:**

```typescript
const todos = State<Todo[]>([]);

const TodoList = () =>
  tag.div(
    trait.html(
      () =>
        todos.val().map((todo) =>
          tag.div(
            trait.style('padding', '10px'),
            trait.style('background', todo.completed ? '#e0e0e0' : 'white'),
            tag.span(todo.text),
            tag.button(
              trait.event('click', () => deleteTodo(todo.id)),
              'Delete',
            ),
          ),
        ),
      todos,
    ),
  );
```

### Conditional Styling

```typescript
const temperature = State(20);

const Thermometer = () =>
  tag.div(
    tag.h1(
      trait.style(
        'color',
        'blue',
        temperature.$test((t) => t < 0),
      ),
      trait.style(
        'color',
        'green',
        temperature.$test((t) => t >= 0 && t < 30),
      ),
      trait.style(
        'color',
        'red',
        temperature.$test((t) => t >= 30),
      ),
      temperature.$val,
      '°C',
    ),
  );
```

### Component with Props

```typescript
function Button(text: string, onClick: () => void, variant: 'primary' | 'secondary' = 'primary') {
  const baseStyles = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  };

  return tag.button(
    trait.style('padding', baseStyles.padding),
    trait.style('borderRadius', baseStyles.borderRadius),
    trait.style('border', baseStyles.border),
    trait.style('cursor', baseStyles.cursor),
    trait.style('background', variant === 'primary' ? '#007bff' : '#6c757d'),
    trait.style('color', 'white'),
    trait.event('click', onClick),
    text,
  );
}

// Usage
Button('Save', () => console.log('Saved'), 'primary');
```

### Responsive UI with Media Query State

```typescript
import { useMediaQueryState } from '@linttrap/oem';

const isMobile = useMediaQueryState({ maxWidth: 768 });
const isDesktop = useMediaQueryState({ minWidth: 1024 });

const ResponsiveNav = () =>
  tag.nav(
    trait.style('display', 'block', isMobile.$test(true)),
    trait.style('background', '#333'),
    trait.style('padding', '10px'),
    'Mobile Navigation',
  );
```

## Dynamic Content with trait.html()

**CRITICAL**: Any dynamic lists, arrays, or conditional content MUST use `trait.html()`. Never use spread operators or ternaries directly in elements.

### Why Use trait.html()?

- Properly manages DOM updates and cleanup
- Enables reactive rendering when state changes
- Prevents memory leaks
- Follows OEM's reactive pattern

### List Rendering

```typescript
const items = State(['A', 'B', 'C']);

// Correct: Use trait.html()
tag.ul(trait.html(() => items.val().map((item) => tag.li(item)), items));
```

### Conditional Rendering

```typescript
const isLoggedIn = State(false);

// Correct: Use trait.html() with array return
tag.div(
  trait.html(() => {
    if (isLoggedIn.val()) {
      return [tag.span('Welcome!')];
    }
    return [tag.span('Please log in')];
  }, isLoggedIn),
);
```

### Multiple Items with Conditions

```typescript
const todos = State<Todo[]>([]);

tag.div(
  trait.html(() => {
    const list = todos.val();
    const elements = list.map((todo) =>
      tag.div(trait.style('padding', '10px'), tag.span(todo.text)),
    );

    if (list.length === 0) {
      elements.push(tag.p('No items'));
    }

    return elements;
  }, todos),
);
```

## Styling Patterns

**IMPORTANT**: CSS property names must be camelCased in JavaScript, not kebab-cased:

- Use `backgroundColor` not `background-color`
- Use `fontSize` not `font-size`
- Use `borderRadius` not `border-radius`
- Use `maxWidth` not `max-width`
- Use `flexDirection` not `flex-direction`
- etc.

### Inline Styles

```typescript
tag.div(
  trait.style('padding', '20px'),
  trait.style('margin', '10px'),
  trait.style('backgroundColor', '#f0f0f0'),
  trait.style('borderRadius', '5px'),
);
```

### CSS Variables

```typescript
tag.div(trait.style('--primary-color', '#007bff'), trait.style('color', 'var(--primary-color)'));
```

### Conditional Classes

```typescript
const isActive = State(false);

tag.div(trait.class('button', true), trait.class('active', isActive.$val));
```

### Hover/Focus Effects

```typescript
tag.button(
  trait.styleOnEvent('mouseover', 'background', '#0056b3'),
  trait.styleOnEvent('mouseout', 'background', '#007bff'),
  'Hover Me',
);
```

## Event Handling

### Basic Events

**NOTE**: Event handler parameters should be optional `any` type to match the trait signature:

```typescript
trait.event('click', () => console.log('clicked'));
trait.event('input', (e?: any) => name.set((e?.target as HTMLInputElement).value));
trait.event('submit', (e?: any) => {
  e?.preventDefault();
  handleSubmit();
});
trait.event('keydown', (e?: any) => {
  if (e?.key === 'Enter') handleEnter();
});
```

### Using $ Methods

```typescript
// Instead of: () => count.set(0)
trait.event('click', count.$set(0));

// Instead of: () => count.reduce(n => n + 1)
trait.event(
  'click',
  count.$reduce((n) => n + 1),
);
```

## Application Structure

### Typical App Pattern

```typescript
import { State, Template } from '@linttrap/oem';
import { useStyleTrait, useEventTrait } from '@linttrap/oem';

// Configure template
const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
});

// Create state
const appState = State({
  user: null,
  loading: false,
});

// Create components
function Header() {
  return tag.header(
    trait.style('padding', '20px'),
    trait.style('background', '#333'),
    trait.style('color', 'white'),
    tag.h1('My App'),
  );
}

function Main() {
  return tag.main(trait.style('padding', '20px'), tag.p('Main content here'));
}

function Footer() {
  return tag.footer(
    trait.style('padding', '20px'),
    trait.style('textAlign', 'center'),
    tag.p('© 2024'),
  );
}

// Compose app
const app = tag.div(Header(), Main(), Footer());

// Mount to DOM
document.body.appendChild(app);
```

## Project Organization

For larger applications, organize your code using this recommended structure:

### File Structure

```
src/
├── state.ts         # All global state objects and state manipulation methods
├── types.ts         # All TypeScript types and interfaces
├── template.ts      # Template configuration (tag, trait)
├── traits/          # Custom trait implementations
│   ├── useCustomTrait.ts
│   └── useAnotherTrait.ts
├── elements/        # Atomic UI elements (buttons, inputs, etc.)
│   ├── Button.ts
│   ├── Input.ts
│   └── Badge.ts
├── components/      # Composite UI components (cards, accordions, modals)
│   ├── Card.ts
│   ├── Accordion.ts
│   └── Modal.ts
├── features/        # Complex features and layouts (forms, dashboards)
│   ├── SignInForm.ts
│   ├── Dashboard.ts
│   └── UserProfile.ts
└── index.ts         # App entry point
```

### state.ts - Global State Management

Centralize all global state objects and their manipulation methods:

```typescript
import { State, StateType } from '@linttrap/oem';

// Global state objects
export const user = State<User | null>(null);
export const isAuthenticated = State(false);
export const theme = State<'light' | 'dark'>('light');
export const notifications = State<Notification[]>([]);

// State manipulation methods
export function login(userData: User) {
  user.set(userData);
  isAuthenticated.set(true);
}

export function logout() {
  user.set(null);
  isAuthenticated.set(false);
}

export function toggleTheme() {
  theme.reduce((current) => (current === 'light' ? 'dark' : 'light'));
}

export function addNotification(notification: Notification) {
  notifications.reduce((list) => [...list, notification]);
}
```

### types.ts - Type Definitions

Define all TypeScript interfaces and types:

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: number;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type ThemeType = 'light' | 'dark';
```

### template.ts - App-Level Template Configuration (Optional)

You can optionally create a template configuration for app-level composition, but **each element, component, and feature should create its own Template instance** for proper isolation:

```typescript
import { Template } from '@linttrap/oem';
import {
  useStyleTrait,
  useEventTrait,
  useInnerHTMLTrait,
} from '@linttrap/oem';

// Optional: App-level template for composition in index.ts
export const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  html: useInnerHTMLTrait,
});
```

**Important**: This is only for app-level composition. All reusable elements, components, and features should create their own Template instances within their files.

### traits/ - Custom Trait Implementations

Create custom traits for specialized behaviors:

```typescript
// traits/useTooltipTrait.ts
export function useTooltipTrait(el: HTMLElement, text: string, position: 'top' | 'bottom' = 'top') {
  const tooltip = document.createElement('div');
  tooltip.textContent = text;
  Object.assign(tooltip.style, {
    position: 'absolute',
    background: '#333',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    display: 'none',
  });

  el.style.position = 'relative';
  el.appendChild(tooltip);

  const show = () => (tooltip.style.display = 'block');
  const hide = () => (tooltip.style.display = 'none');

  el.addEventListener('mouseenter', show);
  el.addEventListener('mouseleave', hide);

  return () => {
    el.removeEventListener('mouseenter', show);
    el.removeEventListener('mouseleave', hide);
    tooltip.remove();
  };
}
```

### elements/ - Atomic UI Components

Build reusable atomic elements with consistent styling. **Each element creates its own Template instance:**

```typescript
// elements/Button.ts
import { Template } from '@linttrap/oem';
import { useStyleTrait, useEventTrait, useStyleOnEventTrait } from '@linttrap/oem';

const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  styleOnEvent: useStyleOnEventTrait,
});

export function Button(
  text: string,
  onClick: () => void,
  variant: 'primary' | 'secondary' | 'danger' = 'primary',
) {
  const colors = {
    primary: { bg: '#007bff', hover: '#0056b3' },
    secondary: { bg: '#6c757d', hover: '#5a6268' },
    danger: { bg: '#dc3545', hover: '#c82333' },
  };

  const color = colors[variant];

  return tag.button(
    trait.style('padding', '10px 20px'),
    trait.style('border', 'none'),
    trait.style('borderRadius', '5px'),
    trait.style('cursor', 'pointer'),
    trait.style('background', color.bg),
    trait.style('color', 'white'),
    trait.styleOnEvent('mouseover', 'background', color.hover),
    trait.styleOnEvent('mouseout', 'background', color.bg),
    trait.event('click', onClick),
    text,
  );
}

// elements/Input.ts
import { Template, StateType } from '@linttrap/oem';
import { useStyleTrait, useEventTrait, useAttributeTrait, useInputValueTrait } from '@linttrap/oem';

const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  attr: useAttributeTrait,
  value: useInputValueTrait,
});

export function Input(placeholder: string, value: StateType<string>, type: string = 'text') {
  return tag.input(
    trait.attr('type', type),
    trait.attr('placeholder', placeholder),
    trait.style('padding', '8px 12px'),
    trait.style('border', '1px solid #ccc'),
    trait.style('borderRadius', '4px'),
    trait.value(value.$val, value),
    trait.event('input', (e?: any) => value.set((e?.target as HTMLInputElement).value)),
  );
}
```

### components/ - Composite Components

Combine elements into more complex components. **Each component creates its own Template instance:**

```typescript
// components/Card.ts
import { Template } from '@linttrap/oem';
import { useStyleTrait } from '@linttrap/oem';

const [tag, trait] = Template({
  style: useStyleTrait,
});

export function Card(title: string, content: HTMLElement, footer?: HTMLElement) {
  return tag.div(
    trait.style('border', '1px solid #ddd'),
    trait.style('borderRadius', '8px'),
    trait.style('padding', '20px'),
    trait.style('boxShadow', '0 2px 4px rgba(0,0,0,0.1)'),

    // Header
    tag.div(
      trait.style('marginBottom', '15px'),
      tag.h3(trait.style('margin', '0'), trait.style('fontSize', '20px'), title),
    ),

    // Content
    tag.div(trait.style('marginBottom', footer ? '15px' : '0'), content),

    // Optional footer
    ...(footer
      ? [
          tag.div(
            trait.style('borderTop', '1px solid #eee'),
            trait.style('paddingTop', '15px'),
            footer,
          ),
        ]
      : []),
  );
}

// components/Accordion.ts
import { State, Template } from '@linttrap/oem';
import { useStyleTrait, useEventTrait, useInnerHTMLTrait } from '@linttrap/oem';

const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  html: useInnerHTMLTrait,
});

export function Accordion(title: string, content: HTMLElement) {
  const isOpen = State(false);

  return tag.div(
    trait.style('border', '1px solid #ddd'),
    trait.style('borderRadius', '4px'),
    trait.style('marginBottom', '10px'),

    // Header
    tag.div(
      trait.style('padding', '15px'),
      trait.style('cursor', 'pointer'),
      trait.style('background', '#f5f5f5'),
      trait.event(
        'click',
        isOpen.$reduce((v) => !v),
      ),
      tag.span(title),
      tag.span(
        trait.style('float', 'right'),
        trait.html(() => (isOpen.val() ? '▼' : '▶'), isOpen),
      ),
    ),

    // Content
    tag.div(
      trait.style('display', 'block', isOpen.$test(true)),
      trait.style('display', 'none', isOpen.$test(false)),
      trait.style('padding', '15px'),
      content,
    ),
  );
}
```

### features/ - Feature Modules

Build complete features and layouts. **Each feature creates its own Template instance:**

```typescript
// features/SignInForm.ts
import { State, Template } from '@linttrap/oem';
import { useStyleTrait, useEventTrait } from '@linttrap/oem';
import { Input } from '../elements/Input';
import { Button } from '../elements/Button';
import { login } from '../state';

const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
});

export function SignInForm() {
  const email = State('');
  const password = State('');
  const error = State('');

  const handleSubmit = async () => {
    error.set('');
    try {
      // Validation
      if (!email.val() || !password.val()) {
        error.set('All fields are required');
        return;
      }

      // Mock authentication
      const userData = {
        id: '1',
        name: 'User',
        email: email.val(),
        role: 'user' as const,
      };
      login(userData);
    } catch (e) {
      error.set('Login failed');
    }
  };

  return tag.div(
    trait.style('maxWidth', '400px'),
    trait.style('margin', '0 auto'),
    trait.style('padding', '40px'),

    tag.h2('Sign In'),

    tag.form(
      trait.event('submit', (e?: any) => {
        e?.preventDefault();
        handleSubmit();
      }),

      tag.div(trait.style('marginBottom', '20px'), Input('Email', email, 'email')),

      tag.div(trait.style('marginBottom', '20px'), Input('Password', password, 'password')),

      tag.div(
        trait.style(
          'display',
          'block',
          error.$test((v) => v !== ''),
        ),
        trait.style(
          'display',
          'none',
          error.$test((v) => v === ''),
        ),
        trait.style('color', 'red'),
        trait.style('marginBottom', '20px'),
        error.$val,
      ),

      Button('Sign In', handleSubmit, 'primary'),
    ),
  );
}

// features/Dashboard.ts
import { Template } from '@linttrap/oem';
import { useStyleTrait, useInnerHTMLTrait } from '@linttrap/oem';
import { user, notifications } from '../state';
import { Card } from '../components/Card';

const [tag, trait] = Template({
  style: useStyleTrait,
  html: useInnerHTMLTrait,
});

export function Dashboard() {
  return tag.div(
    trait.style('padding', '20px'),

    // Header
    tag.div(
      trait.style('marginBottom', '30px'),
      tag.h1(trait.html(() => `Welcome, ${user.val()?.name}!`, user)),
    ),

    // Stats Grid
    tag.div(
      trait.style('display', 'grid'),
      trait.style('gridTemplateColumns', 'repeat(auto-fit, minmax(250px, 1fr))'),
      trait.style('gap', '20px'),

      Card(
        'Notifications',
        tag.div(
          trait.html(() => [tag.span(`${notifications.val().length} unread`)], notifications),
        ),
      ),

      Card(
        'Profile',
        tag.div(
          trait.html(
            () => [tag.p(`Email: ${user.val()?.email}`), tag.p(`Role: ${user.val()?.role}`)],
            user,
          ),
        ),
      ),
    ),
  );
}
```

### Benefits of This Structure

1. **Separation of Concerns**: State, types, and UI are clearly separated
2. **Reusability**: Elements and components can be reused across features
3. **Scalability**: Easy to add new features without cluttering existing code
4. **Maintainability**: Changes to atomic elements propagate to all uses
5. **Testability**: Each layer can be tested independently
6. **Composition**: Build complex UIs from simple, well-tested pieces
7. **Isolation**: Each file creates its own Template instance, preventing cross-contamination
8. **Self-Contained**: Components can be moved or shared without external template dependencies

## Important Rules

1. **Always use $ methods for reactive bindings**: `count.$val` not `count.val()`
2. **Call val() when reading in non-reactive contexts**: `count.val()` for initial values
3. **Use trait.html() for lists and conditional rendering**: Never use spread operator with `.map()` or direct ternaries
4. **Include html trait when needed**: Configure `html: useInnerHTMLTrait` in Template if rendering lists
5. **Traits return cleanup functions**: OEM handles this automatically via MutationObserver
6. **Elements accept varied children**: strings, numbers, elements, functions, or $ closures
7. **Configure traits once**: Share the `[tag, trait]` tuple across your app
8. **Components are functions**: No class components, just functions returning elements
9. **State updates are synchronous**: Subscribers are notified immediately
10. **No JSX**: Use the tag proxy for all element creation
11. **Keep as much in a single file as possible**: OEM is lightweight and fast without complex bundling

## Type Safety

OEM is fully typed. When using TypeScript:

```typescript
// State is generic
const count: StateType<number> = State(0);
const user: StateType<User> = State({ name: 'Alice', age: 30 });

// Template configuration is typed
const [tag, trait] = Template({
  style: useStyleTrait, // TypeScript knows the trait signatures
  event: useEventTrait,
});

// Elements are properly typed
const button: HTMLButtonElement = tag.button('Click');
const div: HTMLDivElement = tag.div('Content');
```

## Testing Pattern

```typescript
export const TestCounter: Test = async (sandbox) => {
  const count = State(0);
  const button = tag.button(
    trait.event(
      'click',
      count.$reduce((n) => n + 1),
    ),
    'Click',
  );

  sandbox.appendChild(button);
  button.click();

  return {
    pass: count.val() === 1,
    message: `Expected 1, got ${count.val()}`,
  };
};
```

## Common Mistakes to Avoid

❌ **Don't do this:**

```typescript
// Using val() in reactive context
tag.h1(count.val()); // Won't update!

// Verbose event handlers
trait.event('click', () => count.set(0)); // Use $ method instead

// Forgetting to call val() for initial values
trait.value(name, name); // Wrong!

// Using kebab-case CSS properties
trait.style('background-color', 'red'); // Wrong!
trait.style('font-size', '16px'); // Wrong!

// Event handlers with required parameters
trait.event('click', (e: Event) => {}); // Wrong! Parameter must be optional

// Using spread operator for lists
tag.div(...items.map((item) => tag.li(item))); // Wrong!

// Ternary operators for conditional rendering
tag.div(condition ? tag.span('Yes') : tag.span('No')); // Wrong for reactive content!

// Passing StateType objects directly to tags
tag.span(() => someComputation(), someState); // Wrong! StateType as child
tag.div(myFunction, myState); // Wrong! Never pass State objects to tags
```

✅ **Do this:**

```typescript
// Use $ methods for reactive bindings
tag.h1(count.$val); // Updates automatically

// Use $ methods for event handlers
trait.event('click', count.$set(0)); // Clean syntax

// Call val() for initial values
trait.value(name.val(), name); // Correct!

// Use camelCase CSS properties
trait.style('backgroundColor', 'red'); // Correct!
trait.style('fontSize', '16px'); // Correct!

// Event handlers with optional any parameters
trait.event('click', (e?: any) => {}); // Correct!

// Use trait.html() for lists
tag.div(trait.html(() => items.map((item) => tag.li(item)), itemsState)); // Correct!

// Use trait.html() for conditional rendering
tag.div(trait.html(() => (condition ? [tag.span('Yes')] : [tag.span('No')]), conditionState)); // Correct!

// Use $val for simple reactive text
tag.span(count.$val); // Correct!

// Use trait.html() for computed/complex reactive content
tag.span(trait.html(() => count.val() * 2, count)); // Correct!
tag.div(trait.html(() => myFunction(), myState)); // Correct!
```

## Summary Checklist

When generating OEM code, ensure:

**Core Patterns:**

- [ ] Imports are from '@linttrap/oem'
- [ ] State objects are created before use
- [ ] Template is configured with needed traits (including `html: useInnerHTMLTrait` for lists)
- [ ] `$` methods are used for reactive bindings
- [ ] `val()` is called for reading initial/non-reactive values
- [ ] Event handlers use `$` methods when possible
- [ ] Event handler parameters are optional `any` type: `(e?: any) => {}`
- [ ] CSS properties are camelCased: `backgroundColor` not `background-color`
- [ ] **Lists and arrays use `trait.html()` - never use spread operator with map**
- [ ] **Conditional rendering uses `trait.html()` for reactive updates**
- [ ] Components are simple functions returning elements
- [ ] All elements are created via the `tag` proxy
- [ ] Traits are applied via the `trait` proxy
- [ ] Code follows the reactive patterns shown above
- [ ] Entire code is contained in a single file unless absolutely necessary

**Project Organization (for larger apps):**

- [ ] Global state and manipulation methods are in `state.ts`
- [ ] All TypeScript types/interfaces are in `types.ts`
- [ ] Custom traits are organized in `traits/` folder
- [ ] Atomic UI elements (Button, Input, etc.) are in `elements/` folder
- [ ] Composite components (Card, Accordion, Modal) are in `components/` folder
- [ ] Complex features and layouts (forms, dashboards) are in `features/` folder
- [ ] **Each element, component, and feature creates its own Template instance**
- [ ] Template configuration matches the traits needed for that specific file
- [ ] Components are self-contained and don't depend on shared template configuration
