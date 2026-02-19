---
name: textarea
description: A composable textarea element using the trait-based pattern. Supports multiple variants, sizes, and states with full theming integration and event handling.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Textarea Element

The `textarea` element provides a composable, trait-based approach to creating textarea elements with built-in theming support, multiple variants, sizes, and interactive states.

## API

The textarea element exports an object with the following methods:

```typescript
export const textarea = {
  create: (...children: Child[]) => HTMLTextAreaElement;
  variant: (variant: Variant) => Applier;
  size: (size: Size) => Applier;
  disabled: (disabled: boolean) => Applier;
  readOnly: (readOnly: boolean) => Applier;
  required: (required: boolean) => Applier;
  fullWidth: (fullWidth: boolean) => Applier;
  resize: (resize: Resize) => Applier;
  rows: (rows: number) => Applier;
  error: (error: boolean) => Applier;
  value: (value: string) => Applier;
  placeholder: (placeholder: string) => Applier;
  onInput: (handler: (value: string) => void) => Applier;
  onChange: (handler: (value: string) => void) => Applier;
  onFocus: (handler: () => void) => Applier;
  onBlur: (handler: () => void) => Applier;
};
```

### Types

```typescript
type Variant = 'outline' | 'filled' | 'flushed';
type Size = 'sm' | 'md' | 'lg';
type Resize = 'none' | 'vertical' | 'horizontal' | 'both';
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Textarea

```typescript
import { textarea } from '@/elements/textarea';

// Create a simple textarea
const txt = textarea.create(textarea.placeholder('Enter text...'));
```

### Complete Textarea

```typescript
// Create a fully configured textarea
const txt = textarea.create(
  textarea.variant('outline'),
  textarea.size('md'),
  textarea.rows(4),
  textarea.placeholder('Enter your message...'),
  textarea.onInput((value) => console.log('Input:', value)),
);

document.body.appendChild(txt);
```

## Variants

The `textarea.variant()` applier applies different visual styles:

```typescript
// Outline textarea (default - border with background)
const outlineTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.placeholder('Outline'),
);

// Filled textarea (background with no border)
const filledTextarea = textarea.create(
  textarea.variant('filled'),
  textarea.placeholder('Filled'),
);

// Flushed textarea (bottom border only)
const flushedTextarea = textarea.create(
  textarea.variant('flushed'),
  textarea.placeholder('Flushed'),
);
```

### Variant Features

Each variant includes:

- **Outline**: Border with primary background color
- **Filled**: Secondary background color with no border
- **Flushed**: Transparent background with bottom border only, no padding-left, no border-radius

## Sizes

The `textarea.size()` applier controls padding and font size:

```typescript
// Small textarea
const smallTextarea = textarea.create(textarea.size('sm'), textarea.placeholder('Small'));

// Medium textarea (default)
const mediumTextarea = textarea.create(textarea.size('md'), textarea.placeholder('Medium'));

// Large textarea
const largeTextarea = textarea.create(textarea.size('lg'), textarea.placeholder('Large'));
```

## States

### Disabled State

```typescript
// Disabled textarea
const disabledTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.disabled(true),
  textarea.placeholder('Disabled'),
);

// Conditionally disabled
const isProcessing = false;
const commentTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.disabled(isProcessing),
  textarea.placeholder('Enter comment...'),
);
```

The `textarea.disabled()` applier:

- Reduces opacity to 0.6
- Changes cursor to `not-allowed`
- Sets the `disabled` attribute on the element

### Read-Only State

```typescript
// Read-only textarea
const readOnlyTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.readOnly(true),
  textarea.value('This text cannot be edited'),
);
```

The `textarea.readOnly()` applier:

- Sets background to disabled color
- Changes cursor to `default`
- Sets the `readonly` attribute on the element

### Required State

```typescript
// Required textarea
const requiredTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.required(true),
  textarea.placeholder('Required field *'),
);
```

The `textarea.required()` applier:

- Sets the `required` attribute on the element
- Works with HTML5 form validation

### Error State

```typescript
// Textarea with error
const errorTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.error(true),
  textarea.placeholder('Invalid input'),
);
```

The `textarea.error()` applier:

- Changes border color to error color
- Changes border color to error hover color on mouse enter

## Layout

### Full Width

```typescript
// Full width textarea
const fullWidthTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.fullWidth(true),
  textarea.placeholder('Full width'),
);

// Auto width textarea (default)
const autoWidthTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.fullWidth(false),
  textarea.placeholder('Auto width'),
);
```

### Resize Control

```typescript
// No resize (fixed size)
const noResizeTextarea = textarea.create(
  textarea.resize('none'),
  textarea.placeholder('No resize'),
);

// Vertical resize only (default)
const verticalTextarea = textarea.create(
  textarea.resize('vertical'),
  textarea.placeholder('Vertical resize'),
);

// Horizontal resize only
const horizontalTextarea = textarea.create(
  textarea.resize('horizontal'),
  textarea.placeholder('Horizontal resize'),
);

// Both directions resize
const bothTextarea = textarea.create(
  textarea.resize('both'),
  textarea.placeholder('Resize both'),
);
```

### Rows

```typescript
// Set number of visible rows
const multilineTextarea = textarea.create(
  textarea.rows(5),
  textarea.placeholder('5 rows tall'),
);
```

## Content

### Value

```typescript
// Set textarea value
const valueTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.value('Pre-filled text content'),
);
```

### Placeholder

```typescript
// Set placeholder text
const placeholderTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.placeholder('Enter your text here...'),
);
```

## Event Handlers

### Input Handler

Fires on every keystroke:

```typescript
const txt = textarea.create(
  textarea.placeholder('Type something...'),
  textarea.onInput((value) => {
    console.log('Current value:', value);
  }),
);
```

### Change Handler

Fires when the value changes and the textarea loses focus:

```typescript
const txt = textarea.create(
  textarea.placeholder('Enter text...'),
  textarea.onChange((value) => {
    console.log('Final value:', value);
  }),
);
```

### Focus Handler

Fires when the textarea receives focus:

```typescript
const txt = textarea.create(
  textarea.placeholder('Focus me...'),
  textarea.onFocus(() => {
    console.log('Textarea focused');
  }),
);
```

The `textarea.onFocus()` applier also:

- Changes border color to primary color on focus
- Adds focus shadow on focus

### Blur Handler

Fires when the textarea loses focus:

```typescript
const txt = textarea.create(
  textarea.placeholder('Focus and blur...'),
  textarea.onBlur(() => {
    console.log('Textarea blurred');
  }),
);
```

## Advanced Examples

### Form Textarea

```typescript
import { textarea } from '@/elements/textarea';

const commentTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.size('md'),
  textarea.rows(6),
  textarea.fullWidth(true),
  textarea.required(true),
  textarea.placeholder('Enter your comment...'),
  textarea.onInput((value) => console.log('Typing:', value)),
  textarea.onChange((value) => console.log('Submitted:', value)),
);
```

### Reactive Textarea with State

```typescript
import { textarea } from '@/elements/textarea';
import { $state } from '@/core/state';

const message = $state('');
const isValid = $state(true);

const messageTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.size('md'),
  textarea.rows(4),
  textarea.placeholder('Enter message...'),
  textarea.error(!isValid.get()),
  textarea.onInput((value) => {
    message.set(value);
    isValid.set(value.length >= 10);
  }),
);
```

### Character Counter

```typescript
import { textarea } from '@/elements/textarea';
import { text } from '@/elements/text';
import { tag } from '@/elements/_base';
import { $state } from '@/core/state';

const charCount = $state(0);
const maxChars = 200;

const countedTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.rows(4),
  textarea.onInput((value) => {
    charCount.set(value.length);
  }),
);

const counter = text.create(
  text.variant('caption'),
  text.color('textSecondary'),
  text.content(`${charCount.get()}/${maxChars}`),
);

const textareaGroup = tag.div(countedTextarea, counter);
```

### Conditional Styling

```typescript
const hasError = $state(false);
const isSubmitting = $state(false);

const feedbackTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.size('md'),
  textarea.rows(5),
  textarea.disabled(isSubmitting.get()),
  textarea.error(hasError.get()),
  textarea.placeholder(isSubmitting.get() ? 'Submitting...' : 'Enter feedback...'),
  textarea.onInput((value) => {
    hasError.set(value.length === 0);
  }),
);
```

### Auto-Growing Textarea

```typescript
const autoGrowTextarea = textarea.create(
  textarea.variant('outline'),
  textarea.resize('none'),
  textarea.rows(3),
  textarea.onInput((value) => {
    // Auto-grow logic
    const lines = value.split('\n').length;
    autoGrowTextarea.rows = Math.max(3, lines);
  }),
);
```

### Textarea with Label

```typescript
import { tag } from '@/elements/_base';
import { text } from '@/elements/text';

const textareaGroup = tag.div(
  text.create(text.variant('body'), text.weight('medium'), text.content('Description')),
  textarea.create(
    textarea.variant('outline'),
    textarea.size('md'),
    textarea.rows(4),
    textarea.required(true),
    textarea.placeholder('Enter description...'),
  ),
);
```

## Trait-Based Pattern

The textarea element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`variant`, `size`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how textarea.variant() works internally
variant: (variant: Variant) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    // Outline variant
    trait.style(
      'border',
      () => `${theme.token('borders', 'borderWidthThin')} ${theme.token('borders', 'borderStyleSolid')} ${theme.token('colors', 'borderPrimary')}`,
      $test(variant === 'outline'),
      theme,
    ),
    trait.style('backgroundColor', theme.$token('colors', 'bgPrimary'), $test(variant === 'outline')),
    // ... other variants
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up textarea styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **3 variants**: Outline, filled, flushed
- ✅ **3 sizes**: Small, medium, large
- ✅ **Multiple states**: Disabled, read-only, required, error
- ✅ **Layout control**: Full width, resize control, rows
- ✅ **Event handling**: Input, change, focus, blur handlers
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Form integration**: Works with HTML5 form validation
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM

## Migration from v2.0

If you're migrating from the props-based API:

**Old (v2.0):**

```typescript
textarea({
  variant: 'outline',
  size: 'md',
  rows: 4,
  placeholder: 'Enter text...',
  disabled: false,
  fullWidth: true,
  onInput: (value) => {},
});
```

**New (v3.0):**

```typescript
textarea.create(
  textarea.variant('outline'),
  textarea.size('md'),
  textarea.rows(4),
  textarea.placeholder('Enter text...'),
  textarea.disabled(false),
  textarea.fullWidth(true),
  textarea.onInput((value) => {}),
);
```
