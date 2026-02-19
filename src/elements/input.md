---
name: input
description: A composable input element using the trait-based pattern. Supports multiple types, variants, sizes, and validation states with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Input Element

The `input` element provides a composable, trait-based approach to creating input elements with built-in theming support, multiple variants, validation states, and event handling.

## API

The input element exports an object with the following methods:

```typescript
export const input = {
  create: (...children: Child[]) => HTMLInputElement;
  type: (type: InputType) => Applier;
  variant: (variant: Variant) => Applier;
  size: (size: Size) => Applier;
  disabled: (disabled: boolean) => Applier;
  readOnly: (readOnly: boolean) => Applier;
  required: (required: boolean) => Applier;
  fullWidth: (fullWidth: boolean) => Applier;
  error: (error: boolean) => Applier;
  value: (value: string) => Applier;
  placeholder: (placeholder: string) => Applier;
  onInput: (handler: (value: string) => void) => Applier;
  onChange: (handler: (value: string) => void) => Applier;
  onFocus: (handler: (e: Event) => void) => Applier;
  onBlur: (handler: (e: Event) => void) => Applier;
};
```

### Types

```typescript
type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week';
type Variant = 'outline' | 'filled' | 'flushed';
type Size = 'sm' | 'md' | 'lg';
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Input

```typescript
import { input } from '@/elements/input';

// Create a simple text input
input.create(input.type('text'), input.placeholder('Enter text...'));
```

### Complete Input

```typescript
// Create a fully configured input
input.create(
  input.type('email'),
  input.variant('outline'),
  input.size('md'),
  input.placeholder('Enter your email'),
  input.required(true),
  input.fullWidth(true),
  input.onInput((value) => console.log('Input value:', value)),
  input.onChange((value) => console.log('Changed value:', value)),
);
```

## Input Types

The `input.type()` applier sets the input type:

```typescript
// Text input
input.create(input.type('text'), input.placeholder('Enter text'));

// Email input with validation
input.create(input.type('email'), input.placeholder('Enter email'));

// Password input
input.create(input.type('password'), input.placeholder('Enter password'));

// Number input
input.create(input.type('number'), input.placeholder('Enter number'));

// Telephone input
input.create(input.type('tel'), input.placeholder('Enter phone'));

// URL input
input.create(input.type('url'), input.placeholder('Enter URL'));

// Search input
input.create(input.type('search'), input.placeholder('Search...'));

// Date input
input.create(input.type('date'));

// Time input
input.create(input.type('time'));

// Datetime-local input
input.create(input.type('datetime-local'));

// Month input
input.create(input.type('month'));

// Week input
input.create(input.type('week'));
```

## Variants

The `input.variant()` applier applies different visual styles:

```typescript
// Outline variant (default, bordered)
input.create(
  input.variant('outline'),
  input.placeholder('Outline input'),
);

// Filled variant (background color)
input.create(
  input.variant('filled'),
  input.placeholder('Filled input'),
);

// Flushed variant (bottom border only)
input.create(
  input.variant('flushed'),
  input.placeholder('Flushed input'),
);
```

### Variant Features

Each variant includes:

- Base border and background colors
- Focus state with color transition
- Hover state
- Automatic theme reactivity (updates when theme changes)

## Sizes

The `input.size()` applier controls padding, font size, and height:

```typescript
// Small input
input.create(input.size('sm'), input.placeholder('Small'));

// Medium input (default)
input.create(input.size('md'), input.placeholder('Medium'));

// Large input
input.create(input.size('lg'), input.placeholder('Large'));
```

## States

### Disabled State

```typescript
// Disabled input
input.create(
  input.variant('outline'),
  input.disabled(true),
  input.placeholder('Disabled input'),
);

// Conditionally disabled
const isProcessing = false;
input.create(
  input.variant('outline'),
  input.disabled(isProcessing),
  input.placeholder('Email'),
);
```

The `input.disabled()` applier:

- Reduces opacity
- Changes cursor to `not-allowed`
- Disables interaction
- Sets the `disabled` attribute on the element

### Read-Only State

```typescript
// Read-only input
input.create(
  input.variant('outline'),
  input.readOnly(true),
  input.value('Read-only value'),
);
```

The `input.readOnly()` applier:

- Prevents editing
- Sets the `readonly` attribute
- Maintains focusability

### Required State

```typescript
// Required input
input.create(
  input.variant('outline'),
  input.required(true),
  input.placeholder('Required field'),
);
```

The `input.required()` applier:

- Sets the `required` attribute
- Enables browser validation

### Error State

```typescript
// Input with error
input.create(
  input.variant('outline'),
  input.error(true),
  input.placeholder('Invalid input'),
);

// Conditional error state
const hasError = false;
input.create(
  input.variant('outline'),
  input.error(hasError),
  input.placeholder('Email'),
);
```

The `input.error()` applier:

- Changes border color to error color
- Provides visual feedback for validation errors

## Full Width

The `input.fullWidth()` applier makes the input span its container:

```typescript
// Full width input
input.create(
  input.variant('outline'),
  input.fullWidth(true),
  input.placeholder('Full width'),
);

// Fixed width (default)
input.create(input.variant('outline'), input.fullWidth(false), input.placeholder('Fixed width'));
```

## Value and Placeholder

### Setting Value

```typescript
// Set initial value
input.create(input.variant('outline'), input.value('Initial value'));

// Dynamic value
const currentValue = 'User input';
input.create(input.variant('outline'), input.value(currentValue));
```

### Setting Placeholder

```typescript
// Set placeholder text
input.create(input.variant('outline'), input.placeholder('Enter your name...'));
```

## Event Handlers

### Input Handler

Fires on every keystroke:

```typescript
input.create(
  input.variant('outline'),
  input.placeholder('Type something'),
  input.onInput((value) => {
    console.log('Current value:', value);
  }),
);
```

### Change Handler

Fires when input loses focus:

```typescript
input.create(
  input.variant('outline'),
  input.placeholder('Type something'),
  input.onChange((value) => {
    console.log('Final value:', value);
  }),
);
```

### Focus Handler

```typescript
input.create(
  input.variant('outline'),
  input.placeholder('Focus me'),
  input.onFocus((e) => {
    console.log('Input focused');
  }),
);
```

### Blur Handler

```typescript
input.create(
  input.variant('outline'),
  input.placeholder('Click away'),
  input.onBlur((e) => {
    console.log('Input blurred');
  }),
);
```

## Advanced Examples

### Form Input with Validation

```typescript
import { input } from '@/elements/input';
import { $state } from '@/core/state';

const email = $state('');
const emailError = $state(false);

input.create(
  input.type('email'),
  input.variant('outline'),
  input.size('md'),
  input.fullWidth(true),
  input.placeholder('Enter your email'),
  input.required(true),
  input.error(emailError.get()),
  input.onInput((value) => {
    email.set(value);
    emailError.set(!value.includes('@'));
  }),
  input.onBlur((e) => {
    const value = (e.target as HTMLInputElement).value;
    emailError.set(!value.includes('@'));
  }),
);
```

### Search Input with Debouncing

```typescript
import { input } from '@/elements/input';
import { $state } from '@/core/state';

const searchQuery = $state('');
let debounceTimer: number;

input.create(
  input.type('search'),
  input.variant('filled'),
  input.size('md'),
  input.fullWidth(true),
  input.placeholder('Search...'),
  input.onInput((value) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery.set(value);
      console.log('Searching for:', value);
    }, 300);
  }),
);
```

### Password Input with Toggle

```typescript
import { input } from '@/elements/input';
import { button } from '@/elements/button';
import { $state } from '@/core/state';
import { tag } from '@/elements/_base';

const showPassword = $state(false);
const password = $state('');

tag.div(
  input.create(
    input.type(showPassword.get() ? 'text' : 'password'),
    input.variant('outline'),
    input.size('md'),
    input.placeholder('Enter password'),
    input.onInput((value) => password.set(value)),
  ),
  button.create(
    button.variant('ghost'),
    button.size('sm'),
    button.text(showPassword.get() ? 'Hide' : 'Show'),
    button.onClick(() => showPassword.set(!showPassword.get())),
  ),
);
```

### Number Input with Min/Max

```typescript
import { input } from '@/elements/input';
import { $state } from '@/core/state';

const quantity = $state(1);
const quantityError = $state(false);

input.create(
  input.type('number'),
  input.variant('outline'),
  input.size('md'),
  input.value(String(quantity.get())),
  input.placeholder('Quantity'),
  input.onInput((value) => {
    const num = parseInt(value);
    quantity.set(num);
    quantityError.set(num < 1 || num > 100);
  }),
  input.error(quantityError.get()),
);
```

### Form Field Group

```typescript
import { input } from '@/elements/input';
import { label } from '@/elements/label';
import { tag } from '@/elements/_base';

tag.div(
  label.create(label.text('Email'), label.htmlFor('email')),
  input.create(
    input.type('email'),
    input.variant('outline'),
    input.size('md'),
    input.fullWidth(true),
    input.placeholder('you@example.com'),
  ),
);
```

## Trait-Based Pattern

The input element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`variant`, `size`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how input.variant() works internally
variant: (variant: Variant) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('border', `1px solid ${theme.$token('colors', config.border)}`, $test(variant === 'outline')),
    trait.style('backgroundColor', theme.$token('colors', config.bg), $test(variant === 'filled')),
    trait.style('borderBottom', `1px solid ${theme.$token('colors', config.border)}`, $test(variant === 'flushed')),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up input configuration
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **12 input types**: Text, email, password, number, tel, url, search, date, time, datetime-local, month, week
- ✅ **3 variants**: Outline, filled, flushed
- ✅ **3 sizes**: Small, medium, large
- ✅ **Multiple states**: Disabled, read-only, required, error
- ✅ **Full width option**: Responsive sizing
- ✅ **Event handling**: Input, change, focus, blur handlers
- ✅ **Value management**: Initial value and placeholder support
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM

## Migration from v2.0
