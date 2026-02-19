---
name: select
description: A composable dropdown select element using the trait-based pattern. Supports multiple variants, sizes, validation states, and option management with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Select Element

The `select` element provides a composable, trait-based approach to creating dropdown select elements with built-in theming support, multiple variants, and comprehensive state management.

## API

The select element exports an object with the following methods:

```typescript
export const select = {
  create: (...children: Child[]) => HTMLSelectElement;
  variant: (variant: Variant) => Applier;
  size: (size: Size) => Applier;
  disabled: (disabled: boolean) => Applier;
  required: (required: boolean) => Applier;
  fullWidth: (fullWidth: boolean) => Applier;
  error: (error: boolean) => Applier;
  value: (value: string) => Applier;
  options: (options: SelectOption[]) => Applier;
  placeholder: (placeholder: string) => Applier;
  onChange: (handler: (value: string) => void) => Applier;
  onFocus: (handler: () => void) => Applier;
};
```

### Types

```typescript
type Variant = 'outline' | 'filled' | 'flushed';
type Size = 'sm' | 'md' | 'lg';
type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Select

```typescript
import { select } from '@/elements/select';

// Create a simple dropdown select
const dropdown = select.create(
  select.options([
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]),
);
```

### Complete Select

```typescript
// Create a fully configured select element
const dropdown = select.create(
  select.variant('outline'),
  select.size('md'),
  select.placeholder('Choose a category'),
  select.options([
    { value: 'tech', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
  ]),
  select.value('tech'),
  select.fullWidth(true),
  select.onChange((value) => console.log('Selected:', value)),
);

document.body.appendChild(dropdown);
```

## Variants

The `select.variant()` applier applies visual styles:

```typescript
// Outline variant (default) - with border
const outlineSelect = select.create(
  select.variant('outline'),
  select.options([
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]),
);

// Filled variant - colored background
const filledSelect = select.create(
  select.variant('filled'),
  select.options([
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]),
);

// Flushed variant - bottom border only
const flushedSelect = select.create(
  select.variant('flushed'),
  select.options([
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]),
);
```

### Variant Features

Each variant includes:

- Base styling appropriate to the variant type
- Hover state with color transition
- Focus state with visual feedback
- Automatic theme reactivity (updates when theme changes)

## Sizes

The `select.size()` applier controls padding and font size:

```typescript
// Small select
const smallSelect = select.create(
  select.size('sm'),
  select.options([{ value: '1', label: 'Small' }]),
);

// Medium select (default)
const mediumSelect = select.create(
  select.size('md'),
  select.options([{ value: '1', label: 'Medium' }]),
);

// Large select
const largeSelect = select.create(
  select.size('lg'),
  select.options([{ value: '1', label: 'Large' }]),
);
```

## Options

The `select.options()` applier sets the dropdown options:

```typescript
// Basic options
const basicSelect = select.create(
  select.options([
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]),
);

// Options with disabled items
const selectWithDisabled = select.create(
  select.options([
    { value: 'active1', label: 'Active Option 1' },
    { value: 'disabled', label: 'Disabled Option', disabled: true },
    { value: 'active2', label: 'Active Option 2' },
  ]),
);
```

## Placeholder

The `select.placeholder()` applier adds a placeholder option:

```typescript
// Select with placeholder
const selectWithPlaceholder = select.create(
  select.placeholder('Choose an option'),
  select.options([
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]),
);
```

## Value

The `select.value()` applier sets the selected value:

```typescript
// Pre-selected value
const preselectedSelect = select.create(
  select.value('option2'),
  select.options([
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]),
);
```

## States

### Disabled State

```typescript
// Disabled select
const disabledSelect = select.create(
  select.disabled(true),
  select.options([{ value: '1', label: 'Disabled' }]),
);

// Conditionally disabled
const isProcessing = false;
const conditionalSelect = select.create(
  select.disabled(isProcessing),
  select.options([{ value: '1', label: 'Option' }]),
);
```

The `select.disabled()` applier:

- Reduces opacity to 0.6
- Changes cursor to `not-allowed`
- Disables interaction
- Sets the `disabled` attribute on the element

### Required State

```typescript
// Required select
const requiredSelect = select.create(
  select.required(true),
  select.placeholder('Select an option (required)'),
  select.options([
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]),
);
```

### Error State

```typescript
// Error state select (validation failed)
const errorSelect = select.create(
  select.error(true),
  select.value('invalid'),
  select.options([
    { value: 'valid', label: 'Valid Option' },
    { value: 'invalid', label: 'Invalid Option' },
  ]),
);
```

### Full Width

```typescript
// Full width select
const fullWidthSelect = select.create(
  select.fullWidth(true),
  select.options([{ value: '1', label: 'Full Width' }]),
);

// Auto width (default)
const autoWidthSelect = select.create(
  select.fullWidth(false),
  select.options([{ value: '1', label: 'Auto Width' }]),
);
```

## Event Handlers

### Change Handler

```typescript
const dropdown = select.create(
  select.options([
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]),
  select.onChange((value) => {
    console.log('Selected value:', value);
  }),
);
```

### Focus Handler

```typescript
const dropdown = select.create(
  select.options([
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]),
  select.onFocus(() => {
    console.log('Select focused');
  }),
);
```

## Advanced Examples

### Reactive Select with State

```typescript
import { select } from '@/elements/select';
import { $state } from '@/core/state';

const selectedCountry = $state('');

const countrySelect = select.create(
  select.value(selectedCountry.get()),
  select.placeholder('Select your country'),
  select.fullWidth(true),
  select.options([
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
  ]),
  select.onChange((value) => {
    selectedCountry.set(value);
    console.log('Selected country:', value);
  }),
);
```

### Cascading Selects

```typescript
import { tag } from '@/elements/_base';

const country = $state('');
const state = $state('');

const countrySelect = select.create(
  select.placeholder('Select country'),
  select.fullWidth(true),
  select.options([
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]),
  select.onChange((value) => {
    country.set(value);
    state.set(''); // Reset state when country changes
  }),
);

const stateSelect = select.create(
  select.placeholder('Select state'),
  select.fullWidth(true),
  select.disabled(country.get() === ''),
  select.options(
    country.get() === 'us'
      ? [
          { value: 'ca', label: 'California' },
          { value: 'ny', label: 'New York' },
          { value: 'tx', label: 'Texas' },
        ]
      : [],
  ),
  select.onChange((value) => state.set(value)),
);

const form = tag.div(countrySelect, stateSelect);
```

### Form with Validation

```typescript
const priority = $state('');
const submitted = $state(false);

const prioritySelect = select.create(
  select.value(priority.get()),
  select.placeholder('Select priority'),
  select.fullWidth(true),
  select.required(true),
  select.error(submitted.get() && !priority.get()),
  select.options([
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'critical', label: 'Critical' },
  ]),
  select.onChange((value) => priority.set(value)),
);
```

### Grouped Options Pattern

```typescript
// Using standard options for grouping
const categorySelect = select.create(
  select.placeholder('Choose a category'),
  select.fullWidth(true),
  select.options([
    { value: 'tech-frontend', label: 'Frontend Development' },
    { value: 'tech-backend', label: 'Backend Development' },
    { value: 'tech-mobile', label: 'Mobile Development' },
    { value: 'design-ui', label: 'UI Design' },
    { value: 'design-ux', label: 'UX Research' },
    { value: 'design-graphics', label: 'Graphic Design' },
  ]),
);
```

### Dynamic Options

```typescript
const categories = $state([
  { value: 'tech', label: 'Technology' },
  { value: 'design', label: 'Design' },
]);

const dynamicSelect = select.create(
  select.options(categories.get()),
  select.onChange((value) => {
    console.log('Selected:', value);
  }),
);

// Update options dynamically
categories.set([
  ...categories.get(),
  { value: 'business', label: 'Business' },
]);
```

## Trait-Based Pattern

The select element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`variant`, `size`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how select.variant() works internally
variant: (variant: Variant) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('border', `1px solid ${theme.$token('colors', 'border')}`, $test(variant === 'outline')),
    trait.style('backgroundColor', theme.$token('colors', 'bgSecondary'), $test(variant === 'filled')),
    trait.style('borderBottom', `2px solid ${theme.$token('colors', 'border')}`, $test(variant === 'flushed')),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up select styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **3 variants**: Outline, filled, and flushed styles
- ✅ **3 sizes**: Small, medium, large
- ✅ **Interactive states**: Hover, focus, disabled, and error states
- ✅ **Option management**: Array-based options with disabled support
- ✅ **Placeholder support**: Optional placeholder text
- ✅ **Event handling**: Change and focus handlers
- ✅ **Validation states**: Required and error state support
- ✅ **Full width mode**: Optional full-width stretching
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM

## Migration from v2.0

If you're migrating from the props-based API:

**Old (v2.0):**

```typescript
select({
  options: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ],
  value: '1',
  variant: 'outline',
  size: 'md',
  placeholder: 'Choose',
  disabled: false,
  required: true,
  fullWidth: true,
  error: false,
  onChange: (value) => {},
});
```

**New (v3.0):**

```typescript
select.create(
  select.options([
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]),
  select.value('1'),
  select.variant('outline'),
  select.size('md'),
  select.placeholder('Choose'),
  select.disabled(false),
  select.required(true),
  select.fullWidth(true),
  select.error(false),
  select.onChange((value) => {}),
);
```
