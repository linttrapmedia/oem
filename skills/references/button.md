---
name: button
description: A composable button element using the trait-based pattern. Supports multiple variants, sizes, and states with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Button Element

The `button` element provides a composable, trait-based approach to creating button elements with built-in theming support, multiple variants, and interactive states.

## API

The button element exports an object with the following methods:

```typescript
export const button = {
  create: (...children: Child[]) => HTMLButtonElement;
  variant: (variant: Variant) => Applier;
  size: (size: Size) => Applier;
  disabled: (disabled: boolean) => Applier;
  text: (text: string) => Applier;
  onClick: (handler: (e: Event) => void) => Applier;
};
```

### Types

```typescript
type Variant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost';
type Size = 'sm' | 'md' | 'lg';
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Button

```typescript
import { button } from '@/elements/button';

// Create a simple button with text
const btn = button.el(button.text('Click me'));
```

### Complete Button

```typescript
// Create a fully configured button
const btn = button.el(
  button.variant('primary'),
  button.size('md'),
  button.text('Submit'),
  button.onClick((e) => console.log('Clicked!')),
);

document.body.appendChild(btn);
```

## Variants

The `button.variant()` applier applies color schemes and interactive states:

```typescript
// Primary button (default brand color)
const primaryBtn = button.el(button.variant('primary'), button.text('Primary'));

// Secondary button
const secondaryBtn = button.el(button.variant('secondary'), button.text('Secondary'));

// Success button (green)
const successBtn = button.el(button.variant('success'), button.text('Success'));

// Error button (red)
const errorBtn = button.el(button.variant('error'), button.text('Delete'));

// Warning button (yellow/amber)
const warningBtn = button.el(button.variant('warning'), button.text('Warning'));

// Info button (blue)
const infoBtn = button.el(button.variant('info'), button.text('Info'));

// Ghost button (transparent with border)
const ghostBtn = button.el(button.variant('ghost'), button.text('Ghost'));
```

### Variant Features

Each variant includes:

- Base background and text colors
- Hover state with color transition
- Active/pressed state
- Automatic theme reactivity (updates when theme changes)

## Sizes

The `button.size()` applier controls padding, font size, and height:

```typescript
// Small button
const smallBtn = button.el(button.size('sm'), button.text('Small'));

// Medium button (default)
const mediumBtn = button.el(button.size('md'), button.text('Medium'));

// Large button
const largeBtn = button.el(button.size('lg'), button.text('Large'));
```

## States

### Disabled State

```typescript
// Disabled button
const disabledBtn = button.el(
  button.variant('primary'),
  button.disabled(true),
  button.text('Disabled'),
);

// Conditionally disabled
const isProcessing = false;
const submitBtn = button.el(
  button.variant('primary'),
  button.disabled(isProcessing),
  button.text('Submit'),
);
```

The `button.disabled()` applier:

- Reduces opacity to 0.6
- Changes cursor to `not-allowed`
- Disables pointer events
- Sets the `disabled` attribute on the element

## Event Handlers

### Click Handler

```typescript
const btn = button.el(
  button.text('Click me'),
  button.onClick((e) => {
    console.log('Button clicked!');
  }),
);
```

## Composing with Child Elements

You can add child elements (like icons) directly:

```typescript
import { tag } from '@/elements/_base';

// Button with icon
const iconBtn = button.el(
  button.variant('primary'),
  button.size('md'),
  tag.span('📥'),
  button.text(' Download'),
);

// Icon-only button
const iconOnlyBtn = button.el(button.variant('ghost'), button.size('sm'), tag.span('⚙️'));
```

## Advanced Examples

### Reactive Button with State

```typescript
import { button } from '@/elements/button';
import { $state } from '@/core/state';

const counter = $state(0);

const incrementBtn = button.el(
  button.variant('primary'),
  button.size('md'),
  button.text('Increment'),
  button.onClick(() => counter.set(counter.get() + 1)),
);

const resetBtn = button.el(
  button.variant('secondary'),
  button.size('md'),
  button.text('Reset'),
  button.onClick(() => counter.set(0)),
);
```

### Conditional Styling

```typescript
const isSubmitting = $state(false);

const submitBtn = button.el(
  button.variant('primary'),
  button.disabled(isSubmitting.get()),
  button.text(isSubmitting.get() ? 'Submitting...' : 'Submit'),
  button.onClick(async () => {
    isSubmitting.set(true);
    try {
      await submitForm();
    } finally {
      isSubmitting.set(false);
    }
  }),
);
```

### Button Group

```typescript
import { tag } from '@/elements/_base';

const buttonGroup = tag.div(
  button.el(button.variant('primary'), button.text('Save')),
  button.el(button.variant('secondary'), button.text('Cancel')),
  button.el(button.variant('error'), button.text('Delete')),
);
```

## Trait-Based Pattern

The button element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`variant`, `size`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how button.variant() works internally
variant: (variant: Variant) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('backgroundColor', theme.$token('colors', config.bg)),
    trait.style('color', theme.$token('colors', config.text)),
    trait.style(
      'border',
      `1px solid ${theme.$token('colors', config.border!)}`,
      $test(config.border),
    ),
    trait.style('border', 'none', $test(!config.border)),
    trait.style_on_event('mouseenter', 'backgroundColor', theme.$token('colors', config.bgHover)),
    trait.style_on_event('mouseleave', 'backgroundColor', theme.$token('colors', config.bg)),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up button styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **7 variants**: Primary, secondary, success, error, warning, info, ghost
- ✅ **3 sizes**: Small, medium, large
- ✅ **Interactive states**: Hover, active, and disabled states
- ✅ **Event handling**: Click handlers via `button.onClick()`
- ✅ **Child elements**: Add icons or other elements as children
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM

## Migration from v2.0

If you're migrating from the props-based API:

**Old (v2.0):**

```typescript
button({
  label: 'Click me',
  variant: 'primary',
  size: 'md',
  disabled: false,
  onClick: () => {},
});
```

**New (v3.0):**

```typescript
button.el(
  button.variant('primary'),
  button.size('md'),
  button.disabled(false),
  button.text('Click me'),
  button.onClick(() => {}),
);
```
