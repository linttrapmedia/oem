## Template & Traits

### Overview

The template module allows you to create your own template engine. It is the core mechanism that supports OEM's unique approach to declarative, reactive applications that combine HTML, Styling, Logic and Behavior.

### Key Exports

#### `Template<P>`

- **Type**: Function
- **Signature**: `function Template<P extends Record<string, TemplateTraitFunc>>(config?: P): TemplateReturnType<P>`
- **Description**: Creates a tuple of [tagProxy, traitProxy] for element creation and trait application
- **Parameters**:
  - `config`: Optional object mapping trait names to trait implementation functions
- **Returns**: A tuple `[tagProxy, traitProxy]` typically destructured as `[tag, trait]`
- **Basic Example**:

```typescript
// Import Template and some traits from OEM
import { Template, useEventTrait, useTextContentTrait } from '@linttrap/oem';

// Create template and add traits
export const [tag, trait] = Template({
  event: useEventTrait,
  text: useTextContentTrait,
});

// Now you can generate elements with the tag proxy and apply available traits
const button = tag.button(
  trait.event('click', () => console.log('Clicked!')),
  trait.text('Click Me'),
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

#### Trait Proxy (Second element of tuple)

- **Type**: Proxy object
- **Description**: Creates trait applier functions from the config object
- **Usage**: Access trait names defined in config, which returns a function that creates a trait applier

##### Trait Applier Function

- **Signature**: `(...args: Parameters<TraitFunc>) => (el: HTMLElement) => void`
- **Parameters**: Arguments defined by the trait implementation (excluding the element parameter)
- **Returns**: A function that applies the trait to an element

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
