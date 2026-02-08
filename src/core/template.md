# Template

## Overview
The template module provides a declarative, reactive DOM element creation system using JavaScript Proxies. It enables creating HTML and SVG elements with traits (reusable behaviors) and automatic cleanup when elements are removed from the DOM.

## Purpose
Template solves the problem of imperative DOM manipulation by providing a functional, declarative API for creating and configuring elements. Key features include:
- Proxy-based element creation (e.g., `h.div()`, `h.span()`)
- Trait system for reusable element behaviors
- Automatic subscription cleanup using MutationObserver
- Seamless integration with reactive State objects
- Support for both HTML and SVG elements

Use this module when you need to create DOM elements programmatically with reactive data binding and lifecycle management.

## Key Exports

### `Template<P>`
- **Type**: Function
- **Signature**: `function Template<P extends Record<string, TemplateTraitFunc>>(config?: P): TemplateReturnType<P>`
- **Description**: Creates a tuple of [tagProxy, traitProxy] for element creation and trait application
- **Parameters**:
  - `config`: Optional object mapping trait names to trait implementation functions
- **Returns**: A tuple `[tagProxy, traitProxy]` typically destructured as `[h, t]`
- **Usage Example**:
```typescript
const [h, t] = Template({
  onclick: (el, handler) => {
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }
});

// Create elements with traits
const button = h.button(
  'Click me',
  t.onclick(() => console.log('Clicked!'))
);
```

### Tag Proxy (First element of tuple)
- **Type**: Proxy object
- **Description**: Creates HTML or SVG elements using property access
- **Usage**: Access any valid HTML or SVG tag name as a property, which returns a function that creates that element

#### Supported Element Types
- **HTML Elements**: All standard HTML tags (div, span, button, input, etc.)
- **SVG Elements**: svg, g, rect, circle, ellipse, line, polyline, polygon, path, text, defs, use, mask, clipPath

#### Element Creation Function
- **Signature**: `(...traits: Trait[]) => HTMLElement | SVGElement`
- **Parameters**: Variable number of traits (strings, numbers, functions, elements, or trait appliers)
- **Returns**: The created element

#### Trait Types Supported
1. **Static Values** (string/number): Appended as text content
2. **Elements**: Appended as children
3. **Trait Appliers**: Functions returned by the trait proxy
4. **State Objects**: Reactive values that automatically update
5. **Regular Functions**: Executed with element as argument, result is appended

**Usage Examples**:
```typescript
// Simple text content
h.div('Hello World')

// Nested elements
h.div(
  h.h1('Title'),
  h.p('Paragraph')
)

// Reactive state
const name = State('Alice');
h.div(name.$val()) // Updates automatically when name changes

// Mixed
h.button(
  'Count: ',
  count.$val(),
  t.onclick(() => count.reduce(c => c + 1))
)
```

### Trait Proxy (Second element of tuple)
- **Type**: Proxy object
- **Description**: Creates trait applier functions from the config object
- **Usage**: Access trait names defined in config, which returns a function that creates a trait applier

#### Trait Applier Function
- **Signature**: `(...args: Parameters<TraitFunc>) => (el: HTMLElement) => void`
- **Parameters**: Arguments defined by the trait implementation (excluding the element parameter)
- **Returns**: A function that applies the trait to an element

#### Creating Custom Traits
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
  }
});

// Use the trait
h.div(t.myTrait('red', 'blue'))
```

### Type Definitions

#### `TemplateTraitFunc`
- **Type**: Type alias
- **Description**: `(...args: Args) => Return` - Function type for trait implementations

#### `TemplateTraitApplier`
- **Type**: Type alias
- **Description**: `(el: HTMLElement | SVGElement) => void` - Function that applies a trait to an element

#### `TemplateReturnType<P>`
- **Type**: Type alias
- **Description**: Complex type defining the return value structure with proper TypeScript inference for element types

## Implementation Details

### Automatic Cleanup System
The template module uses a sophisticated cleanup system:
- **WeakMap**: Stores cleanup functions keyed by element reference
- **MutationObserver**: Watches for element removal from the DOM
- When an element is removed, all its cleanup functions are executed automatically
- This prevents memory leaks from event listeners and subscriptions

### Reactive State Integration
When a State object's `$val()` or similar method is passed as a trait:
1. A text node is created and appended to the element
2. The state value is read and set as the text content
3. A subscription is created to update the text on state changes
4. The subscription cleanup is registered in the cleanup system

### SVG Element Detection
SVG elements are created using `createElementNS` with the SVG namespace. The module maintains a hardcoded set of common SVG tag names for detection.

### Trait System Architecture
1. **Trait Config**: User defines trait implementations in the config object
2. **Trait Proxy**: Intercepts property access to create trait appliers
3. **Trait Application**: When applied to an element, the trait function receives the element as first parameter
4. **Cleanup Registration**: Return value from trait function is registered for automatic cleanup

## Related Modules
- [state.ts](src/core/state.ts) - Provides reactive State objects that integrate with template
- [types.ts](src/core/types.ts) - Provides the `Tail` utility type used in trait parameter inference
