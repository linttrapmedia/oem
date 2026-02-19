---
name: radio
description: A composable radio button element using the trait-based pattern. Supports multiple sizes, checked and disabled states, labels, and change handlers with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Radio Element

The `radio` element provides a composable, trait-based approach to creating radio button elements with built-in theming support, multiple sizes, and interactive states for mutually exclusive selections.

## API

The radio element exports an object with the following methods:

```typescript
export const radio = {
  create: (...children: Child[]) => HTMLInputElement;
  size: (size: Size) => Applier;
  disabled: (disabled: boolean) => Applier;
  checked: (checked: boolean) => Applier;
  name: (name: string) => Applier;
  value: (value: string) => Applier;
  onChange: (handler: (value: string) => void) => Applier;
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

### Basic Radio

```typescript
import { radio } from '@/elements/radio';

// Create a simple radio button
const radioBtn = radio.create(
  radio.name('choice'),
  radio.value('option1'),
);
```

### Complete Radio

```typescript
// Create a fully configured radio button
const radioBtn = radio.create(
  radio.name('plan'),
  radio.value('pro'),
  radio.size('md'),
  radio.checked(false),
  radio.label('Pro Plan'),
  radio.onChange((value) => console.log('Selected:', value)),
);

document.body.appendChild(radioBtn);
```

## Radio Groups

Radio buttons with the same name form a mutually exclusive group:

```typescript
import { tag } from '@/elements/_base';

// Create a radio group
const radioGroup = tag.div(
  radio.create(
    radio.name('plan'),
    radio.value('free'),
    radio.checked(true),
    radio.label('Free Plan'),
  ),
  radio.create(
    radio.name('plan'),
    radio.value('pro'),
    radio.label('Pro Plan'),
  ),
  radio.create(
    radio.name('plan'),
    radio.value('enterprise'),
    radio.label('Enterprise Plan'),
  ),
);
```

### Name and Value

The `radio.name()` and `radio.value()` appliers set the radio button's group name and value:

```typescript
// Radio buttons with same name are mutually exclusive
const radio1 = radio.create(
  radio.name('option'),
  radio.value('yes'),
  radio.label('Yes'),
);

const radio2 = radio.create(
  radio.name('option'),
  radio.value('no'),
  radio.label('No'),
);
```

## Sizes

The `radio.size()` applier controls button dimensions:

```typescript
// Small radio button (16px)
const smallRadio = radio.create(
  radio.size('sm'),
  radio.name('size'),
  radio.value('small'),
  radio.label('Small'),
);

// Medium radio button (20px - default)
const mediumRadio = radio.create(
  radio.size('md'),
  radio.name('size'),
  radio.value('medium'),
  radio.label('Medium'),
);

// Large radio button (24px)
const largeRadio = radio.create(
  radio.size('lg'),
  radio.name('size'),
  radio.value('large'),
  radio.label('Large'),
);
```

## States

### Checked State

```typescript
// Initially checked radio
const checkedRadio = radio.create(
  radio.name('default'),
  radio.value('option1'),
  radio.checked(true),
  radio.label('Default Option'),
);

// Initially unchecked radio
const uncheckedRadio = radio.create(
  radio.name('default'),
  radio.value('option2'),
  radio.checked(false),
  radio.label('Other Option'),
);
```

### Disabled State

```typescript
// Disabled radio button
const disabledRadio = radio.create(
  radio.name('disabled'),
  radio.value('option1'),
  radio.disabled(true),
  radio.label('Disabled Option'),
);

// Disabled and checked
const disabledCheckedRadio = radio.create(
  radio.name('disabled'),
  radio.value('option2'),
  radio.checked(true),
  radio.disabled(true),
  radio.label('Cannot Change'),
);

// Conditionally disabled
const isProcessing = false;
const conditionalRadio = radio.create(
  radio.name('conditional'),
  radio.value('option'),
  radio.disabled(isProcessing),
  radio.label('Option'),
);
```

The `radio.disabled()` applier:

- Reduces opacity to 0.6
- Changes cursor to `not-allowed`
- Disables pointer events
- Sets the `disabled` attribute on the element

## Labels

The `radio.label()` applier wraps the radio with a label:

```typescript
// Radio with label
const labeledRadio = radio.create(
  radio.name('option'),
  radio.value('yes'),
  radio.label('Yes, I agree'),
);

// Radio with label and size
const sizedLabelRadio = radio.create(
  radio.name('option'),
  radio.value('no'),
  radio.label('No, I disagree', 'lg'),
  radio.size('lg'),
);

// Radio without label
const unlabeledRadio = radio.create(
  radio.name('option'),
  radio.value('maybe'),
);
```

## Event Handlers

### Change Handler

```typescript
const radioBtn = radio.create(
  radio.name('choice'),
  radio.value('option1'),
  radio.label('Option 1'),
  radio.onChange((value) => {
    console.log('Selected value:', value);
  }),
);
```

## Advanced Examples

### Reactive Radio Group with State

```typescript
import { radio } from '@/elements/radio';
import { $state } from '@/core/state';
import { tag } from '@/elements/_base';

const selectedPlan = $state('free');

const plans = ['free', 'pro', 'enterprise'];

const radioGroup = tag.div(
  ...plans.map(plan =>
    radio.create(
      radio.name('plan'),
      radio.value(plan),
      radio.checked(selectedPlan.get() === plan),
      radio.label(`${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`),
      radio.onChange((value) => selectedPlan.set(value)),
    ),
  ),
);
```

### Conditional Styling

```typescript
const selectedMethod = $state('credit');

const paymentRadio = radio.create(
  radio.name('payment'),
  radio.value('credit'),
  radio.checked(selectedMethod.get() === 'credit'),
  radio.label('Credit Card'),
  radio.size('md'),
  radio.onChange((value) => {
    selectedMethod.set(value);
    console.log('Payment method:', value);
  }),
);
```

### Survey Form

```typescript
import { tag } from '@/elements/_base';

const satisfaction = $state<string | null>(null);

const options = [
  { value: 'very-satisfied', label: 'Very Satisfied' },
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'dissatisfied', label: 'Dissatisfied' },
  { value: 'very-dissatisfied', label: 'Very Dissatisfied' },
];

const surveyGroup = tag.div(
  tag.h4('How satisfied are you with our service?'),
  ...options.map(option =>
    radio.create(
      radio.name('satisfaction'),
      radio.value(option.value),
      radio.checked(satisfaction.get() === option.value),
      radio.label(option.label),
      radio.onChange((value) => satisfaction.set(value)),
    ),
  ),
);
```

### Radio Group with Descriptions

```typescript
import { tag } from '@/elements/_base';

const selectedFeature = $state('basic');

const features = [
  { value: 'basic', label: 'Basic', description: 'Essential features only' },
  { value: 'standard', label: 'Standard', description: 'Most popular choice' },
  { value: 'premium', label: 'Premium', description: 'All features included' },
];

const featureSelector = tag.div(
  ...features.map(feature =>
    tag.div(
      radio.create(
        radio.name('feature'),
        radio.value(feature.value),
        radio.checked(selectedFeature.get() === feature.value),
        radio.label(feature.label),
        radio.onChange((value) => selectedFeature.set(value)),
      ),
      tag.span(feature.description),
    ),
  ),
);
```

## Trait-Based Pattern

The radio element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`size`, `checked`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how radio.size() works internally
size: (size: Size) => (el: HTMLElement | SVGElement) => {
  const sizeConfig = {
    sm: { width: '16px', height: '16px' },
    md: { width: '20px', height: '20px' },
    lg: { width: '24px', height: '24px' },
  };

  tag.$(el)(
    trait.style('width', sizeConfig[size].width),
    trait.style('height', sizeConfig[size].height),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up radio button styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **3 sizes**: Small, medium, large
- ✅ **Mutually exclusive**: Radio buttons with same name form groups
- ✅ **Interactive states**: Checked, unchecked, and disabled states
- ✅ **Label support**: Optional label wrapping with customizable size
- ✅ **Event handling**: Change handlers via `radio.onChange()`
- ✅ **Value management**: Name and value attributes for form integration
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM

## Migration from v2.0

If you're migrating from the props-based API:

**Old (v2.0):**

```typescript
radio({
  name: 'plan',
  value: 'pro',
  checked: false,
  size: 'md',
  label: 'Pro Plan',
  onChange: (value) => {},
});
```

**New (v3.0):**

```typescript
radio.create(
  radio.name('plan'),
  radio.value('pro'),
  radio.checked(false),
  radio.size('md'),
  radio.label('Pro Plan'),
  radio.onChange((value) => {}),
);
```
