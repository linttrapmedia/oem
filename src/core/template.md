## Template

### Overview

The template module allows you to create your own template engine. It is the core mechanism that supports OEM's unique approach to declarative, reactive applications that combine HTML, Styling, Logic and Behavior.

### Purpose

Template solves the problem of imperative DOM manipulation by providing a functional, declarative API for creating and configuring elements. Key features include:

- Proxy-based element creation (e.g., `tag.div()`, `tag.span()`)
- Trait system for all html manipulation (attirbutes, behaviors etc.) with automatic cleanup
- Automatic subscription cleanup using MutationObserver
- Seamless integration with reactive State objects (based on presence of .sub method)
- Support for both HTML and SVG elements

Use this module when you need to create DOM elements programmatically with reactive data binding and lifecycle management.

### Key Exports

#### `Template<P>`

- **Type**: Function
- **Signature**: `function Template<P extends Record<string, TemplateTraitFunc>>(config?: P): TemplateReturnType<P>`
- **Description**: Creates a tuple of [tagProxy, traitProxy] for element creation and trait application
- **Parameters**:
  - `config`: Optional object mapping trait names to trait implementation functions
- **Returns**: A tuple `[tagProxy, traitProxy]` typically destructured as `[tag, trait]`
- **Usage Example**:

```typescript
// An example of a custom trait, pre-existing traits should be used when possible
// in the case below the useEventTrait would be used instead of this custom implementation
function useOnClickTrait(el, handler) {
  el.addEventListener('click', handler);
  return () => el.removeEventListener('click', handler);
}

// Create template with custom trait
// The tag and trait proxies are destructured from the returned tuple for easy access
// traits can be anything from event handlers, to styles, to custom behaviors even entire components, html, etc.
const [tag, trait] = Template({
  onclick: useOnClickTrait,
});

// Now you can generate elements with the tag proxy and apply traits with the trait proxy
const button = tag.button(
  'Click me',
  trait.onclick(() => console.log('Clicked!')),
);
```

#### Tag Proxy (First element of tuple)

- **Type**: Proxy object
- **Description**: Creates HTML or SVG elements using property access
- **Usage**: Access any valid HTML or SVG tag name as a property, which returns a function that creates that element

##### Supported Element Types

- **HTML Elements**: All standard HTML tags (div, span, button, input, etc.)
- **SVG Elements**: svg, g, rect, circle, ellipse, line, polyline, polygon, path, text, defs, use, mask, clipPath

##### Element Creation Function

- **Signature**: `(...traits: Trait[]) => HTMLElement | SVGElement`
- **Parameters**: Variable number of traits (strings, numbers, functions, elements, or trait appliers)
- **Returns**: The created element

##### Trait Types Supported

1. **Static Values** (string/number): Appended as text content
2. **Elements**: Appended as children
3. **Trait Appliers**: Functions returned by the trait proxy
4. **State Objects**: Reactive values that automatically update
5. **Regular Functions**: Executed with element as argument, result is appended

**Usage Examples**:

```typescript
// Simple text content
tag.div('Hello World');

// Nested elements
// Creates <div><h1>Title</h1><p>Paragraph</p></div>
tag.div(tag.h1('Title'), tag.p('Paragraph'));

// Reactive state
const name = State('Alice');
tag.div(name.$val); // Automatically binds to state and updates on change

// Mixed
// Creates <button>Count: 0</button> and updates count on click
tag.button(
  trait.onclick(() => count.reduce((c) => c + 1)),
  'Count: ',
  count.$val,
);
```

#### Trait Proxy (Second element of tuple)

- **Type**: Proxy object
- **Description**: Creates trait applier functions from the config object
- **Usage**: Access trait names defined in config, which returns a function that creates a trait applier

##### Trait Applier Function

- **Signature**: `(...args: Parameters<TraitFunc>) => (el: HTMLElement) => void`
- **Parameters**: Arguments defined by the trait implementation (excluding the element parameter)
- **Returns**: A function that applies the trait to an element

##### Creating Custom Traits

Traits are defined in the config object passed to `Template()`:

```typescript
const [h, t] = Template({
  // Trait name: implementation function
  myTrait: (el, param1, param2) => {
    // Apply behavior to element
    el.style.color = param1;

    // Return cleanup function (called when element is removed)
    return () => {
      console.log('Element removed');
    };
  },
});

// Use the trait
h.div(t.myTrait('red', 'blue'));
```

#### Type Definitions

##### `TemplateTraitFunc`

- **Type**: Type alias
- **Description**: `(...args: Args) => Return` - Function type for trait implementations

##### `TemplateTraitApplier`

- **Type**: Type alias
- **Description**: `(el: HTMLElement | SVGElement) => void` - Function that applies a trait to an element

##### `TemplateReturnType<P>`

- **Type**: Type alias
- **Description**: Complex type defining the return value structure with proper TypeScript inference for element types

### Implementation Details

#### Automatic Cleanup System

The template module uses a sophisticated cleanup system:

- **WeakMap**: Stores cleanup functions keyed by element reference
- **MutationObserver**: Watches for element removal from the DOM
- When an element is removed, all its cleanup functions are executed automatically
- This prevents memory leaks from event listeners and subscriptions

#### Reactive State Integration

When a State object's `$val()` or anything method with a '.sub' method is passed as a trait, the template module:

1. A text node is created and appended to the element
2. The state value is read and set as the text content
3. A subscription is created to update the text on state changes
4. The subscription cleanup is registered in the cleanup system

#### SVG Element Detection

SVG elements are created using `createElementNS` with the SVG namespace. The module maintains a hardcoded set of common SVG tag names for detection.

### Traits

A trait is any function that takes an element as its first parameter, applies some behavior or configuration to it and returns a cleanup function. Traits can be defined in the config object passed to `Template()` and are accessed via the trait proxy.

Here's an example of the Style Trait

```typescript
export function useStyleTrait(
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number | undefined) | (string | number | undefined),
  ...rest: (StateType<any> | Condition)[]
) {
  const states = extractStates(val, ...rest);
  const conditions = extractConditions(...rest);
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
      (prop as string).startsWith('--')
        ? el.style.setProperty(prop as string, _val as string)
        : (el.style[prop as any] = _val as any);
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}
```

#### Trait System Architecture

1. **Trait Config**: User defines trait implementations in the config object
2. **Trait Proxy**: Intercepts property access to create trait appliers
3. **Trait Application**: When applied to an element, the trait function receives the element as first parameter
4. **Cleanup Registration**: Return value from trait function is registered for automatic cleanup

### Related Modules

- [state.ts](src/core/state.ts) - Provides reactive State objects that integrate with template
- [types.ts](src/core/types.ts) - Provides the `Tail` utility type used in trait parameter inference
