---
name: label
description: A composable label element using the trait-based pattern. Supports sizing, colors, required states, and form associations with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Label Element

The `label` element provides a composable, trait-based approach to creating label elements with built-in theming support, form associations, and accessibility features.

## API

The label element exports an object with the following methods:

```typescript
export const label = {
  create: (...children: Child[]) => HTMLLabelElement;
  size: (size: Size) => Applier;
  color: (color: ColorToken) => Applier;
  htmlFor: (htmlFor: string) => Applier;
  required: (required: boolean) => Applier;
  disabled: (disabled: boolean) => Applier;
  text: (text: string) => Applier;
};
```

### Types

```typescript
type Size = 'sm' | 'md' | 'lg';
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Label

```typescript
import { label } from '@/elements/label';

// Create a simple label
label.create(label.text('Username'));
```

### Complete Label

```typescript
// Create a fully configured label
label.create(
  label.text('Email Address'),
  label.size('md'),
  label.color('gray.700'),
  label.htmlFor('email-input'),
  label.required(true),
);
```

## Text Content

The `label.text()` applier sets the label's text content:

```typescript
// Simple text label
label.create(label.text('First Name'));

// Label with description
label.create(label.text('Email Address'));
```

## Sizes

The `label.size()` applier controls font size:

```typescript
// Small label
label.create(label.size('sm'), label.text('Small Label'));

// Medium label (default)
label.create(label.size('md'), label.text('Medium Label'));

// Large label
label.create(label.size('lg'), label.text('Large Label'));
```

## Colors

The `label.color()` applier sets the text color using theme tokens:

```typescript
// Default gray
label.create(label.color('gray.700'), label.text('Username'));

// Brand color
label.create(label.color('brand.600'), label.text('Important Field'));

// Custom color
label.create(label.color('blue.500'), label.text('Info Label'));

// Error color
label.create(label.color('error.500'), label.text('Error Label'));
```

## Form Association

The `label.htmlFor()` applier associates the label with an input element:

```typescript
import { label } from '@/elements/label';
import { input } from '@/elements/input';

// Label with htmlFor attribute
label.create(label.text('Email'), label.htmlFor('email-input'));

// Associated input
input.create(
  input.type('email'),
  input.variant('outline'),
  (el) => {
    (el as HTMLInputElement).id = 'email-input';
  },
);
```

### htmlFor Features

When `label.htmlFor()` is used:

- Sets the `for` attribute to associate with an input's `id`
- Changes cursor to `pointer` for better UX
- Clicking the label focuses the associated input

## States

### Required State

```typescript
// Required field label
label.create(label.text('Email'), label.required(true));

// Conditionally required
const isRequired = true;
label.create(label.text('Phone'), label.required(isRequired));
```

The `label.required()` applier:

- Changes text color to error color
- Provides visual indication that the field is required
- Often combined with `label.htmlFor()` for form fields

### Disabled State

```typescript
// Disabled label
label.create(label.text('Disabled Field'), label.disabled(true));

// Conditionally disabled
const isDisabled = false;
label.create(label.text('Field'), label.disabled(isDisabled));
```

The `label.disabled()` applier:

- Reduces opacity
- Changes cursor to `not-allowed`
- Provides visual feedback that the associated field is disabled

## Advanced Examples

### Form Field with Label

```typescript
import { label } from '@/elements/label';
import { input } from '@/elements/input';
import { tag } from '@/elements/_base';

// Complete form field
tag.div(
  label.create(
    label.text('Email Address'),
    label.size('md'),
    label.htmlFor('email'),
    label.required(true),
  ),
  input.create(
    input.type('email'),
    input.variant('outline'),
    input.size('md'),
    input.fullWidth(true),
    input.placeholder('you@example.com'),
    (el) => {
      (el as HTMLInputElement).id = 'email';
    },
  ),
);
```

### Label with Required Indicator

```typescript
import { label } from '@/elements/label';
import { tag } from '@/elements/_base';

// Label with asterisk for required field
tag.div(
  label.create(
    label.text('Username'),
    label.size('md'),
    label.htmlFor('username'),
  ),
  tag.span(' *', (el) => {
    el.style.color = 'red';
  }),
);
```

### Conditional Label States

```typescript
import { label } from '@/elements/label';
import { $state } from '@/core/state';

const isFieldRequired = $state(true);
const isFieldDisabled = $state(false);

label.create(
  label.text('Dynamic Field'),
  label.size('md'),
  label.htmlFor('dynamic-field'),
  label.required(isFieldRequired.get()),
  label.disabled(isFieldDisabled.get()),
);
```

### Form with Multiple Labels

```typescript
import { label } from '@/elements/label';
import { input } from '@/elements/input';
import { tag } from '@/elements/_base';

// Registration form
tag.div(
  // First name field
  tag.div(
    label.create(label.text('First Name'), label.size('md'), label.htmlFor('first-name')),
    input.create(
      input.type('text'),
      input.variant('outline'),
      input.fullWidth(true),
      (el) => {
        (el as HTMLInputElement).id = 'first-name';
      },
    ),
  ),
  // Last name field
  tag.div(
    label.create(label.text('Last Name'), label.size('md'), label.htmlFor('last-name')),
    input.create(
      input.type('text'),
      input.variant('outline'),
      input.fullWidth(true),
      (el) => {
        (el as HTMLInputElement).id = 'last-name';
      },
    ),
  ),
  // Email field
  tag.div(
    label.create(
      label.text('Email'),
      label.size('md'),
      label.htmlFor('email'),
      label.required(true),
    ),
    input.create(
      input.type('email'),
      input.variant('outline'),
      input.fullWidth(true),
      (el) => {
        (el as HTMLInputElement).id = 'email';
      },
    ),
  ),
);
```

### Label with Description

```typescript
import { label } from '@/elements/label';
import { tag } from '@/elements/_base';
import { text } from '@/elements/text';

// Label with helper text
tag.div(
  label.create(label.text('Password'), label.size('md'), label.htmlFor('password')),
  text.create(
    text.size('sm'),
    text.color('gray.500'),
    text.text('Must be at least 8 characters'),
  ),
);
```

### Checkbox Label

```typescript
import { label } from '@/elements/label';
import { checkbox } from '@/elements/checkbox';
import { tag } from '@/elements/_base';

// Checkbox with clickable label
tag.div(
  checkbox.create(
    checkbox.checked(false),
    (el) => {
      (el as HTMLInputElement).id = 'terms';
    },
  ),
  label.create(
    label.text('I agree to the terms and conditions'),
    label.size('md'),
    label.htmlFor('terms'),
  ),
);
```

### Label with Custom Styling

```typescript
import { label } from '@/elements/label';
import { tag } from '@/elements/_base';

// Label with custom styles via trait
label.create(
  label.text('Custom Label'),
  label.size('md'),
  label.color('brand.600'),
  (el) => {
    tag.$(el)(
      trait.style('fontWeight', 'bold'),
      trait.style('textTransform', 'uppercase'),
      trait.style('letterSpacing', '0.5px'),
    );
  },
);
```

## Trait-Based Pattern

The label element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`size`, `color`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how label.color() works internally
color: (color: ColorToken) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(trait.style('color', theme.$token('colors', color)));
};

// Example of how label.htmlFor() works internally
htmlFor: (htmlFor: string) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.attr('for', htmlFor),
    trait.style('cursor', 'pointer'),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up label configuration
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **3 sizes**: Small, medium, large
- ✅ **Color theming**: Support for all theme color tokens
- ✅ **Form association**: htmlFor attribute for input association
- ✅ **Required state**: Visual indication for required fields
- ✅ **Disabled state**: Visual feedback for disabled fields
- ✅ **Accessibility**: Proper semantic HTML and ARIA attributes
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM

## Migration from v2.0
