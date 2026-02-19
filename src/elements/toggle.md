---
name: toggle
description: A composable toggle switch element using the trait-based pattern. Supports multiple sizes, colors, and states with full theming integration and smooth animations.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Toggle Element

The `toggle` element provides a composable, trait-based approach to creating toggle switch elements with built-in theming support, multiple sizes, colors, and interactive states.

## API

The toggle element exports an object with the following methods:

```typescript
export const toggle = {
  create: (...children: Child[]) => HTMLLabelElement;
  size: (size: Size) => Applier;
  color: (color: ColorToken) => Applier;
  disabled: (disabled: boolean) => Applier;
  checked: (checked: boolean) => Applier;
  onChange: (handler: (checked: boolean) => void) => Applier;
  label: (label: string) => Applier;
};
```

### Types

```typescript
type Size = 'sm' | 'md' | 'lg';
type ColorToken = keyof DesignTokens['colors'];
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Toggle

```typescript
import { toggle } from '@/elements/toggle';

// Create a simple toggle
const tog = toggle.create();
```

### Complete Toggle

```typescript
// Create a fully configured toggle
const tog = toggle.create(
  toggle.size('md'),
  toggle.color('primary'),
  toggle.checked(false),
  toggle.label('Enable notifications'),
  toggle.onChange((checked) => console.log('Checked:', checked)),
);

document.body.appendChild(tog);
```

## Sizes

The `toggle.size()` applier controls the dimensions of the toggle switch:

```typescript
// Small toggle
const smallToggle = toggle.create(toggle.size('sm'), toggle.label('Small'));

// Medium toggle (default)
const mediumToggle = toggle.create(toggle.size('md'), toggle.label('Medium'));

// Large toggle
const largeToggle = toggle.create(toggle.size('lg'), toggle.label('Large'));
```

### Size Specifications

- **Small**: 32px × 18px (thumb: 14px)
- **Medium**: 44px × 24px (thumb: 20px)
- **Large**: 56px × 32px (thumb: 28px)

## Colors

The `toggle.color()` applier sets the color when the toggle is checked:

```typescript
// Primary color (default - brand color)
const primaryToggle = toggle.create(toggle.color('primary'), toggle.label('Primary'));

// Success color (green)
const successToggle = toggle.create(toggle.color('success'), toggle.label('Success'));

// Error color (red)
const errorToggle = toggle.create(toggle.color('error'), toggle.label('Error'));

// Warning color (yellow/amber)
const warningToggle = toggle.create(toggle.color('warning'), toggle.label('Warning'));

// Info color (blue)
const infoToggle = toggle.create(toggle.color('info'), toggle.label('Info'));
```

The color is applied to the track background when the toggle is in the checked state.

## States

### Checked State

```typescript
// Checked toggle
const checkedToggle = toggle.create(
  toggle.checked(true),
  toggle.label('Enabled'),
);

// Unchecked toggle
const uncheckedToggle = toggle.create(
  toggle.checked(false),
  toggle.label('Disabled'),
);
```

The `toggle.checked()` applier:

- Sets the checked state of the internal checkbox input
- Animates the thumb position
- Changes track background color

### Disabled State

```typescript
// Disabled toggle
const disabledToggle = toggle.create(
  toggle.disabled(true),
  toggle.label('Disabled toggle'),
);

// Conditionally disabled
const isLoading = false;
const settingToggle = toggle.create(
  toggle.disabled(isLoading),
  toggle.label('Auto-save'),
);
```

The `toggle.disabled()` applier:

- Reduces opacity to 0.6
- Changes cursor to `not-allowed`
- Sets the `disabled` attribute on the internal input element
- Prevents user interaction

## Label

### Adding a Label

```typescript
// Toggle with label text
const labeledToggle = toggle.create(
  toggle.size('md'),
  toggle.label('Enable dark mode'),
);
```

The `toggle.label()` applier:

- Creates a text span element
- Positions it next to the toggle switch
- Uses theme typography and spacing

## Event Handlers

### Change Handler

```typescript
const tog = toggle.create(
  toggle.label('Notifications'),
  toggle.onChange((checked) => {
    console.log('Toggle is now:', checked ? 'ON' : 'OFF');
  }),
);
```

The `toggle.onChange()` applier:

- Fires when the toggle state changes
- Receives the new checked state as a boolean
- Automatically updates the visual state (track color and thumb position)

## Advanced Examples

### Settings Toggle

```typescript
import { toggle } from '@/elements/toggle';

const darkModeToggle = toggle.create(
  toggle.size('md'),
  toggle.color('primary'),
  toggle.checked(false),
  toggle.label('Dark mode'),
  toggle.onChange((checked) => {
    document.body.classList.toggle('dark', checked);
  }),
);
```

### Reactive Toggle with State

```typescript
import { toggle } from '@/elements/toggle';
import { $state } from '@/core/state';

const isEnabled = $state(false);

const reactiveToggle = toggle.create(
  toggle.size('md'),
  toggle.color('success'),
  toggle.checked(isEnabled.get()),
  toggle.label('Enable feature'),
  toggle.onChange((checked) => {
    isEnabled.set(checked);
  }),
);

// Update toggle when state changes externally
isEnabled.subscribe((value) => {
  // Re-apply checked state
  toggle.checked(value)(reactiveToggle);
});
```

### Form Toggle with Validation

```typescript
const acceptTerms = $state(false);
const canSubmit = $state(false);

const termsToggle = toggle.create(
  toggle.size('sm'),
  toggle.color('primary'),
  toggle.checked(false),
  toggle.label('I accept the terms and conditions'),
  toggle.onChange((checked) => {
    acceptTerms.set(checked);
    canSubmit.set(checked);
  }),
);
```

### Conditional Styling

```typescript
const isActive = $state(false);

const statusToggle = toggle.create(
  toggle.size('md'),
  toggle.color(isActive.get() ? 'success' : 'error'),
  toggle.checked(isActive.get()),
  toggle.label(isActive.get() ? 'Active' : 'Inactive'),
  toggle.onChange((checked) => {
    isActive.set(checked);
  }),
);
```

### Toggle Group

```typescript
import { tag } from '@/elements/_base';
import { stack } from '@/elements/stack';

const toggleGroup = stack.create(
  stack.direction('column'),
  stack.spacing('md'),
  toggle.create(toggle.label('Email notifications'), toggle.checked(true)),
  toggle.create(toggle.label('Push notifications'), toggle.checked(false)),
  toggle.create(toggle.label('SMS notifications'), toggle.checked(false)),
);
```

### Toggle with Description

```typescript
import { tag } from '@/elements/_base';
import { text } from '@/elements/text';

const toggleWithDescription = tag.div(
  toggle.create(
    toggle.size('md'),
    toggle.color('primary'),
    toggle.label('Enable analytics'),
  ),
  text.create(
    text.variant('caption'),
    text.color('textSecondary'),
    text.content('Help us improve by sharing anonymous usage data'),
  ),
);
```

### Disabled Toggle with Tooltip

```typescript
const isAvailable = false;

const premiumToggle = toggle.create(
  toggle.size('md'),
  toggle.disabled(!isAvailable),
  toggle.label('Premium feature (upgrade required)'),
);
```

### Loading State Toggle

```typescript
const isSaving = $state(false);

const autoSaveToggle = toggle.create(
  toggle.size('md'),
  toggle.color('primary'),
  toggle.disabled(isSaving.get()),
  toggle.label(isSaving.get() ? 'Saving...' : 'Auto-save'),
  toggle.onChange(async (checked) => {
    isSaving.set(true);
    try {
      await saveSettings({ autoSave: checked });
    } finally {
      isSaving.set(false);
    }
  }),
);
```

## Internal Structure

The toggle element creates a composite structure:

```typescript
<label>
  <div class="track">
    <input type="checkbox" (hidden) />
    <div class="thumb"></div>
  </div>
  <span>Label text</span>
</label>
```

### Internal References

The toggle stores references to its internal elements:

- `_toggleInput`: The hidden checkbox input
- `_toggleTrack`: The track container div
- `_toggleThumb`: The animated thumb div
- `_toggleColor`: Stored color token for checked state
- `_thumbOffset`: Calculated offset for thumb animation based on size

## Trait-Based Pattern

The toggle element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`size`, `color`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how toggle.checked() works internally
checked: (checked: boolean) => (el: HTMLElement | SVGElement) => {
  const input = (el as any)._toggleInput as HTMLInputElement;
  const track = (el as any)._toggleTrack;
  const thumb = (el as any)._toggleThumb;
  const color = (el as any)._toggleColor || 'primary';
  const thumbOffset = (el as any)._thumbOffset || '22px';

  input.checked = checked;

  tag.$(track)(
    trait.style('backgroundColor', theme.$token('colors', color), $test(checked)),
    trait.style('backgroundColor', theme.$token('colors', 'bgSecondary'), $test(!checked)),
  );

  tag.$(thumb)(
    trait.style('transform', `translateX(${thumbOffset}) translateY(-50%)`, $test(checked)),
    trait.style('transform', 'translateY(-50%)', $test(!checked)),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up toggle styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **3 sizes**: Small, medium, large
- ✅ **Color tokens**: Use any theme color token for checked state
- ✅ **Interactive states**: Checked, unchecked, disabled
- ✅ **Smooth animations**: 0.2s ease-in-out transitions for thumb and track
- ✅ **Event handling**: Change handler with checked state callback
- ✅ **Label support**: Add text labels via `toggle.label()`
- ✅ **Accessibility**: Uses native checkbox input for keyboard support
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM

## Accessibility

The toggle element includes built-in accessibility features:

- Uses a hidden native checkbox input for keyboard navigation
- Supports keyboard interaction (Space, Enter)
- Label element provides click target for the entire component
- Disabled state prevents interaction and updates cursor

## Migration from v2.0

If you're migrating from the props-based API:

**Old (v2.0):**

```typescript
toggle({
  size: 'md',
  color: 'primary',
  checked: false,
  disabled: false,
  label: 'Toggle me',
  onChange: (checked) => {},
});
```

**New (v3.0):**

```typescript
toggle.create(
  toggle.size('md'),
  toggle.color('primary'),
  toggle.checked(false),
  toggle.disabled(false),
  toggle.label('Toggle me'),
  toggle.onChange((checked) => {}),
);
```
