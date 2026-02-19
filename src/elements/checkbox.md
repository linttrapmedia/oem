---
name: checkbox
description: A composable checkbox element using the trait-based pattern. Supports multiple sizes, disabled state, and label integration with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Checkbox Element

The `checkbox` element provides a composable, trait-based approach to creating checkbox input elements with built-in theming support, multiple sizes, and label integration.

## API

The checkbox element exports an object with the following methods:

```typescript
export const checkbox = {
  create: (...children: Child[]) => HTMLInputElement;
  size: (size: Size) => Applier;
  disabled: (disabled: boolean) => Applier;
  checked: (checked: boolean) => Applier;
  onChange: (handler: (checked: boolean) => void) => Applier;
  label: (label: string, size?: Size) => Applier;
};
```

### Types

```typescript
type Size = 'sm' | 'md' | 'lg';
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Checkbox

```typescript
import { checkbox } from '@/elements/checkbox';

// Create a simple checkbox
checkbox.create();
```

### Complete Checkbox

```typescript
// Create a fully configured checkbox
checkbox.create(
  checkbox.size('md'),
  checkbox.disabled(false),
  checkbox.checked(true),
  checkbox.onChange((checked) => console.log('Checked:', checked)),
  checkbox.label('Accept terms and conditions', 'md'),
);
```

## Sizes

The `checkbox.size()` applier controls the dimensions of the checkbox:

```typescript
// Small checkbox
checkbox.create(checkbox.size('sm'));

// Medium checkbox (default)
checkbox.create(checkbox.size('md'));

// Large checkbox
checkbox.create(checkbox.size('lg'));
```

### Size Specifications

- **Small**: 16px × 16px
- **Medium**: 20px × 20px
- **Large**: 24px × 24px

## States

### Checked State

The `checkbox.checked()` applier sets the initial checked state:

```typescript
// Unchecked checkbox
checkbox.create(checkbox.checked(false));

// Checked checkbox
checkbox.create(checkbox.checked(true));
```

### Disabled State

The `checkbox.disabled()` applier disables the checkbox:

```typescript
// Enabled checkbox (default)
checkbox.create(checkbox.disabled(false));

// Disabled checkbox
checkbox.create(checkbox.disabled(true));

// Disabled and checked
checkbox.create(
  checkbox.disabled(true),
  checkbox.checked(true),
);
```

The `checkbox.disabled()` applier:

- Changes cursor to `not-allowed`
- Sets the `disabled` attribute on the element
- Prevents interaction

## Labels

The `checkbox.label()` applier wraps the checkbox in a label element with text:

```typescript
// Checkbox with label
checkbox.create(
  checkbox.size('md'),
  checkbox.label('Accept terms'),
);

// Checkbox with label and specific size
checkbox.create(
  checkbox.size('lg'),
  checkbox.label('Accept terms', 'lg'),
);
```

### Label Features

- Automatically creates a wrapping `<label>` element
- Aligns checkbox and text vertically
- Adds proper spacing between checkbox and text
- Makes the entire label clickable
- Font size adjusts based on size parameter

## Event Handlers

### Change Handler

The `checkbox.onChange()` applier attaches a change event handler:

```typescript
checkbox.create(
  checkbox.onChange((checked) => {
    console.log('Checkbox is now:', checked ? 'checked' : 'unchecked');
  }),
);
```

The handler receives a boolean parameter indicating the new checked state.

## Advanced Examples

### Checkbox with Label

```typescript
import { checkbox } from '@/elements/checkbox';

checkbox.create(
  checkbox.size('md'),
  checkbox.checked(false),
  checkbox.onChange((checked) => {
    console.log('Newsletter subscription:', checked);
  }),
  checkbox.label('Subscribe to newsletter'),
);
```

### Controlled Checkbox with State

```typescript
import { checkbox } from '@/elements/checkbox';
import { $state } from '@/core/state';

const isAgreed = $state(false);

checkbox.create(
  checkbox.size('md'),
  checkbox.checked(isAgreed.get()),
  checkbox.onChange((checked) => {
    isAgreed.set(checked);
    console.log('Terms agreed:', checked);
  }),
  checkbox.label('I agree to the terms and conditions'),
);
```

### Checkbox Group

```typescript
import { checkbox } from '@/elements/checkbox';
import { tag } from '@/elements/_base';
import { $state } from '@/core/state';

const preferences = {
  email: $state(true),
  sms: $state(false),
  push: $state(false),
};

tag.div(
  checkbox.create(
    checkbox.size('md'),
    checkbox.checked(preferences.email.get()),
    checkbox.onChange((checked) => preferences.email.set(checked)),
    checkbox.label('Email notifications'),
  ),
  checkbox.create(
    checkbox.size('md'),
    checkbox.checked(preferences.sms.get()),
    checkbox.onChange((checked) => preferences.sms.set(checked)),
    checkbox.label('SMS notifications'),
  ),
  checkbox.create(
    checkbox.size('md'),
    checkbox.checked(preferences.push.get()),
    checkbox.onChange((checked) => preferences.push.set(checked)),
    checkbox.label('Push notifications'),
  ),
);
```

### Conditional Disabled State

```typescript
import { checkbox } from '@/elements/checkbox';
import { $state } from '@/core/state';

const isProcessing = $state(false);

checkbox.create(
  checkbox.size('md'),
  checkbox.disabled(isProcessing.get()),
  checkbox.onChange((checked) => {
    console.log('Selected:', checked);
  }),
  checkbox.label('Enable feature'),
);
```

### Checkbox with Different Sizes

```typescript
import { tag } from '@/elements/_base';

tag.div(
  checkbox.create(
    checkbox.size('sm'),
    checkbox.label('Small checkbox', 'sm'),
  ),
  checkbox.create(
    checkbox.size('md'),
    checkbox.label('Medium checkbox', 'md'),
  ),
  checkbox.create(
    checkbox.size('lg'),
    checkbox.label('Large checkbox', 'lg'),
  ),
);
```

### Form Validation

```typescript
import { checkbox } from '@/elements/checkbox';
import { button } from '@/elements/button';
import { $state } from '@/core/state';

const termsAccepted = $state(false);

const termsCheckbox = checkbox.create(
  checkbox.size('md'),
  checkbox.checked(termsAccepted.get()),
  checkbox.onChange((checked) => termsAccepted.set(checked)),
  checkbox.label('I accept the terms and conditions'),
);

const submitButton = button.create(
  button.variant('primary'),
  button.disabled(!termsAccepted.get()),
  button.text('Submit'),
  button.onClick(() => {
    if (termsAccepted.get()) {
      console.log('Form submitted');
    }
  }),
);
```

### Select All Pattern

```typescript
import { checkbox } from '@/elements/checkbox';
import { $state } from '@/core/state';

const items = ['Item 1', 'Item 2', 'Item 3'];
const selectedItems = $state<Set<string>>(new Set());

// Select all checkbox
const selectAll = checkbox.create(
  checkbox.size('md'),
  checkbox.checked(selectedItems.get().size === items.length),
  checkbox.onChange((checked) => {
    if (checked) {
      selectedItems.set(new Set(items));
    } else {
      selectedItems.set(new Set());
    }
  }),
  checkbox.label('Select all'),
);

// Individual item checkboxes
items.forEach((item) => {
  checkbox.create(
    checkbox.size('md'),
    checkbox.checked(selectedItems.get().has(item)),
    checkbox.onChange((checked) => {
      const current = new Set(selectedItems.get());
      if (checked) {
        current.add(item);
      } else {
        current.delete(item);
      }
      selectedItems.set(current);
    }),
    checkbox.label(item),
  );
});
```

## Trait-Based Pattern

The checkbox element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`size`, `disabled`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how checkbox.size() works internally
size: (size: Size) => (el: HTMLElement | SVGElement) => {
  const config = sizeConfig[size];

  tag.$(el)(
    trait.style('width', config.size),
    trait.style('height', config.size)
  );
};

// Example of how checkbox.disabled() works internally
disabled: (disabled: boolean) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('cursor', 'not-allowed', $test(disabled)),
    trait.style('cursor', 'pointer', $test(!disabled)),
    trait.attr('disabled', 'true', $test(disabled))
  );
};

// Example of how checkbox.label() works internally
label: (label: string, size: Size = 'md') => (el: HTMLElement | SVGElement) => {
  const config = sizeConfig[size];
  const wrapper = document.createElement('label');

  tag.$(wrapper)(
    trait.style('display', 'inline-flex'),
    trait.style('alignItems', 'center'),
    trait.style('gap', theme.$token('spacing', 'sm')),
    trait.style('cursor', 'pointer'),
    trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
    trait.style('fontSize', config.fontSize),
    trait.style('color', theme.$token('colors', 'textPrimary'))
  );

  // Wraps the checkbox and adds label text
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up checkbox styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **3 sizes**: Small, medium, large
- ✅ **States**: Checked and disabled states
- ✅ **Label integration**: Automatic label wrapping with proper styling
- ✅ **Event handling**: Change handlers via `checkbox.onChange()`
- ✅ **Accessible**: Proper semantic HTML with label elements
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM
