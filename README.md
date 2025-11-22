# OEM

A tiny (~2KB) layer-one utility for building reactive UIs with vanilla TypeScript. Roll your own framework with just the features you need.

<img src="docs/assets/oem.png" width="200" style="border-radius:5px; margin:20px 0;" alt="OEM Logo" />

**🎯 Why OEM?**

- ✓ Lightweight (~2KB minified) with zero dependencies
- ✓ Reactive state management without virtual DOM overhead
- ✓ Build your own framework - copy only the traits and states you need
- ✓ Full TypeScript support with excellent type inference
- ✓ Locality of behavior with trait-based patterns

📚 **[Full Documentation at oem.js.org](https://oem.js.org)**

## Installation

```bash
npm install @linttrap/oem
```

## Quick Start

```typescript
import { State, Template } from '@linttrap/oem';
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
    trait.event(
      'click',
      count.$reduce((n) => n + 1),
    ),
    'Increment',
  ),
);

document.body.appendChild(app);
```

## Core Concepts

### State - Reactive State Management

Create reactive state with pub/sub pattern:

```typescript
const count = State(0);

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

// The $ Pattern - closures for delayed execution
const increment = count.$reduce((n) => n + 1);
button.onclick = increment;
```

### Template - Proxy-Based Element Creation

Create HTML/SVG elements with a trait-based behavior system:

```typescript
const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  attr: useAttributeTrait,
});

const button = tag.button(
  trait.style('padding', '10px 20px'),
  trait.style('backgroundColor', 'blue'),
  trait.event('click', handleClick),
  trait.attr('type', 'button'),
  'Click me',
);
```

### Storage - Persistent State

Sync state with localStorage, sessionStorage, or memory:

```typescript
const storage = Storage({
  data: {
    theme: {
      key: 'app-theme',
      state: State<'light' | 'dark'>('light'),
      storage: 'localStorage',
    },
  },
});

// Automatically persists to localStorage
storage.data.theme.set('dark');
```

## Ready-Made Traits

**Traits are NOT bundled** - you copy ready-made implementations from `src/traits/` or create your own. This keeps the core tiny and lets you customize everything.

### Available Traits

Copy these from `src/traits/`:

- `useAttributeTrait` - HTML attributes
- `useClassNameTrait` - CSS classes
- `useEventTrait` - Event listeners
- `useFocusTrait` - Element focus
- `useInnerHTMLTrait` - Inner HTML
- `useInputValueTrait` - Input value binding
- `useInputEventTrait` - Input events
- `useStyleTrait` - CSS styles
- `useTextContentTrait` - Text content

### Creating Custom Traits

```typescript
function useTooltipTrait(el: HTMLElement, text: string, ...rest: (StateType<any> | Condition)[]) {
  const isStateObj = (i: any) => Object.keys(i).includes('sub');
  const states = rest.filter(isStateObj);
  const conditions = rest.filter((i) => !isStateObj(i));

  const apply = () => {
    const applies = conditions.every((c) => (typeof c === 'function' ? c() : c));
    if (applies) {
      el.setAttribute('title', text);
    }
  };

  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}
```

## Ready-Made States

Like traits, **state utilities are NOT bundled** - you copy ready-made implementations from `src/states/` into your project.

### Available States

Copy these from `src/states/`:

- `useMediaQueryState` - Reactive media query state that updates on window resize

### Example Usage

```typescript
import { useMediaQueryState } from '@linttrap/oem/states/MediaQuery';

// Create reactive state for mobile breakpoint
const isMobile = useMediaQueryState({ maxWidth: 768 });

// Use in your UI
const nav = tag.nav(trait.style('display', 'block', isMobile.$test(true)), 'Mobile Navigation');

// Desktop breakpoint
const isDesktop = useMediaQueryState({ minWidth: 1024 });
```

**More coming soon!** We're adding router state, form state, async data state, and more. Check `src/states/` for updates.

## Component Pattern

Components are just functions that return elements:

```typescript
function Button(text: string, onClick: () => void) {
  return tag.button(
    trait.style('padding', '10px 20px'),
    trait.style('backgroundColor', 'blue'),
    trait.style('color', 'white'),
    trait.event('click', onClick),
    text,
  );
}

const app = tag.div(Button('Save', () => console.log('Saved!')));
```

## Development

This project uses [Bun](https://bun.sh) for development:

```bash
# Install dependencies
bun install

# Run tests
bun ./test/unit.html

# Build distribution
make dist

# Run documentation site in dev mode
make dev

# Run examples
make examples
```

## Philosophy

OEM is a "roll your own framework" framework. The core (~2KB) provides:

1. **State** - Reactive state management
2. **Template** - Element creation with trait system
3. **Storage** - Persistent state

Everything else is up to you. Copy ready-made traits and state utilities, modify them, or create your own. Understand every line of code in your framework.

## Browser Support

Requires ES6+ support:

- Chrome 49+
- Firefox 18+
- Safari 10+
- Edge 12+

## License

MIT License

©Copyright 2024. All rights reserved. Made in the USA 🇺🇸 by [Kevin Lint](http://kevinlint.com) as a product of [Lint Trap Media](http://linttrap.media).

OEM is part of the [Lint Trap UI Project](https://github.com/linttrapmedia).
