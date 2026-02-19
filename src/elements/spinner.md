---
name: spinner
description: A composable spinner element using the trait-based pattern. Provides loading indicators with multiple sizes, customizable colors, and smooth rotation animation.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Spinner Element

The `spinner` element provides a composable, trait-based approach to creating loading spinner elements with built-in theming support, multiple sizes, and smooth rotation animation.

## API

The spinner element exports an object with the following methods:

```typescript
export const spinner = {
  create: (...children: Child[]) => HTMLDivElement;
  size: (size: Size) => Applier;
  color: (color: ColorToken) => Applier;
  thickness: (thickness: string) => Applier;
  speed: (speed: string) => Applier;
  label: (label: string) => Applier;
};
```

### Types

```typescript
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ColorToken = string; // Theme color token
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Spinner

```typescript
import { spinner } from '@/elements/spinner';

// Create a simple spinner with default size
spinner.create(spinner.size('md'));
```

### Complete Spinner

```typescript
// Create a fully configured spinner
spinner.create(
  spinner.size('lg'),
  spinner.color('blue.500'),
  spinner.thickness('4px'),
  spinner.speed('0.8s'),
  spinner.label('Loading content'),
);
```

## Sizes

The `spinner.size()` applier controls the overall dimensions:

```typescript
// Extra small spinner
spinner.create(spinner.size('xs'));

// Small spinner
spinner.create(spinner.size('sm'));

// Medium spinner (default)
spinner.create(spinner.size('md'));

// Large spinner
spinner.create(spinner.size('lg'));

// Extra large spinner
spinner.create(spinner.size('xl'));
```

### Size Features

Each size includes:

- Preset dimensions (width and height)
- Default border thickness proportional to size
- Consistent aspect ratio
- Automatic theme reactivity

## Color

The `spinner.color()` applier sets the top border color (the visible spinning part):

```typescript
// Primary brand color
spinner.create(spinner.size('md'), spinner.color('primary.500'));

// Blue spinner
spinner.create(spinner.size('md'), spinner.color('blue.500'));

// Green spinner for success states
spinner.create(spinner.size('md'), spinner.color('green.500'));

// Red spinner for error states
spinner.create(spinner.size('md'), spinner.color('red.500'));

// Custom theme token
spinner.create(spinner.size('md'), spinner.color('accent.600'));
```

### Color Features

The color applier:

- Uses theme color tokens for consistency
- Automatically reactive to theme changes
- Only colors the top border (creates the spinner effect)
- Bottom, left, and right borders remain transparent

## Customization

### Border Thickness

```typescript
// Thin spinner
spinner.create(spinner.size('md'), spinner.thickness('2px'));

// Default thickness (varies by size)
spinner.create(spinner.size('md'), spinner.thickness('3px'));

// Thick spinner
spinner.create(spinner.size('md'), spinner.thickness('5px'));

// Extra thick for large spinners
spinner.create(spinner.size('xl'), spinner.thickness('8px'));
```

### Animation Speed

```typescript
// Fast spinner
spinner.create(spinner.size('md'), spinner.speed('0.5s'));

// Default speed
spinner.create(spinner.size('md'), spinner.speed('1s'));

// Slow spinner
spinner.create(spinner.size('md'), spinner.speed('2s'));

// Very slow for subtle effect
spinner.create(spinner.size('lg'), spinner.speed('3s'));
```

The `spinner.speed()` applier:

- Accepts any CSS time value (e.g., '1s', '500ms')
- Lower values = faster rotation
- Higher values = slower rotation
- Automatically injects CSS keyframes for spin animation

## Accessibility

### ARIA Label

```typescript
// Descriptive label for screen readers
spinner.create(spinner.size('md'), spinner.label('Loading user data'));

// Context-specific labels
spinner.create(spinner.size('sm'), spinner.label('Submitting form'));

spinner.create(spinner.size('lg'), spinner.label('Processing payment'));
```

The `spinner.label()` applier:

- Sets the `aria-label` attribute for screen reader users
- Provides context about what is loading
- Important for accessibility compliance
- Does not affect visual appearance

## Advanced Examples

### Loading Button

```typescript
import { spinner } from '@/elements/spinner';
import { button } from '@/elements/button';
import { $state } from '@/core/state';

const isLoading = $state(false);

button.create(
  button.variant('primary'),
  button.disabled(isLoading.get()),
  isLoading.get()
    ? spinner.create(
        spinner.size('sm'),
        spinner.color('white'),
        spinner.label('Loading'),
      )
    : button.text('Submit'),
  button.onClick(async () => {
    isLoading.set(true);
    try {
      await submitForm();
    } finally {
      isLoading.set(false);
    }
  }),
);
```

### Centered Loading State

```typescript
import { spinner } from '@/elements/spinner';
import { tag } from '@/elements/_base';

tag.div(
  spinner.create(
    spinner.size('lg'),
    spinner.color('primary.500'),
    spinner.speed('1s'),
    spinner.label('Loading application'),
  ),
  // Center the spinner
  trait.style('display', 'flex'),
  trait.style('justifyContent', 'center'),
  trait.style('alignItems', 'center'),
  trait.style('minHeight', '200px'),
);
```

### Inline Spinner with Text

```typescript
import { spinner } from '@/elements/spinner';
import { tag } from '@/elements/_base';

tag.div(
  spinner.create(
    spinner.size('sm'),
    spinner.color('gray.600'),
    spinner.label('Loading'),
  ),
  tag.span('Loading...'),
  // Inline layout
  trait.style('display', 'flex'),
  trait.style('alignItems', 'center'),
  trait.style('gap', '8px'),
);
```

### Conditional Spinner

```typescript
import { spinner } from '@/elements/spinner';
import { $state } from '@/core/state';

const isLoading = $state(true);

// Show spinner while loading
isLoading.get()
  ? spinner.create(
      spinner.size('md'),
      spinner.color('primary.500'),
      spinner.label('Loading content'),
    )
  : tag.div('Content loaded!');
```

### Overlay Spinner

```typescript
import { spinner } from '@/elements/spinner';
import { tag } from '@/elements/_base';

tag.div(
  // Semi-transparent overlay
  trait.style('position', 'fixed'),
  trait.style('top', '0'),
  trait.style('left', '0'),
  trait.style('right', '0'),
  trait.style('bottom', '0'),
  trait.style('backgroundColor', 'rgba(0, 0, 0, 0.5)'),
  trait.style('display', 'flex'),
  trait.style('justifyContent', 'center'),
  trait.style('alignItems', 'center'),
  trait.style('zIndex', '9999'),

  // Centered spinner
  spinner.create(
    spinner.size('xl'),
    spinner.color('white'),
    spinner.thickness('6px'),
    spinner.speed('1s'),
    spinner.label('Loading application'),
  ),
);
```

### Multiple Spinners for Different States

```typescript
import { spinner } from '@/elements/spinner';

// Success state (fast green spinner)
spinner.create(
  spinner.size('md'),
  spinner.color('green.500'),
  spinner.speed('0.6s'),
  spinner.label('Processing'),
);

// Error state (slow red spinner)
spinner.create(
  spinner.size('md'),
  spinner.color('red.500'),
  spinner.speed('1.5s'),
  spinner.label('Retrying'),
);

// Loading state (normal blue spinner)
spinner.create(
  spinner.size('md'),
  spinner.color('blue.500'),
  spinner.speed('1s'),
  spinner.label('Loading'),
);
```

## Trait-Based Pattern

The spinner element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`size`, `color`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how spinner.speed() works internally
speed: (speed: string) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('animation', `spin ${speed} linear infinite`),
  );

  // Automatically injects keyframes
  injectKeyframes('spin', /* rotation keyframes */);
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up spinner styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **5 sizes**: Extra small, small, medium, large, extra large
- ✅ **Customizable color**: Use any theme color token
- ✅ **Adjustable thickness**: Control border width
- ✅ **Variable speed**: Control rotation speed
- ✅ **Smooth animation**: CSS-based infinite rotation
- ✅ **Automatic keyframe injection**: CSS keyframes are injected only when needed
- ✅ **Accessibility**: ARIA label support for screen readers
- ✅ **Conditional traits**: Uses `$test()` for conditional styling

## Best Practices

1. **Always add labels**: Use `spinner.label()` for accessibility
2. **Match context**: Use appropriate sizes and colors for the loading context
3. **Consistent speed**: Use standard speeds (0.8s-1.2s) for familiarity
4. **Color contrast**: Ensure spinner color contrasts well with background
5. **Loading states**: Pair spinners with disabled states on interactive elements
6. **Timeout handling**: Always handle loading timeouts to prevent infinite spinners

## Common Patterns

### Small Inline Spinner

```typescript
spinner.create(
  spinner.size('sm'),
  spinner.color('gray.600'),
  spinner.label('Loading'),
);
```

### Large Centered Spinner

```typescript
spinner.create(
  spinner.size('xl'),
  spinner.color('primary.500'),
  spinner.thickness('6px'),
  spinner.label('Loading application'),
);
```

### Button Spinner

```typescript
spinner.create(
  spinner.size('sm'),
  spinner.color('white'),
  spinner.speed('0.8s'),
  spinner.label('Submitting'),
);
```

## Migration from v2.0

If you're migrating from v2.0:

- Replace `<Spinner />` component with `spinner.create()`
- Replace props with applier functions: `size`, `color`, `thickness`, `speed`, `label`
- Update color values to use theme tokens
- Animation is always enabled (no need for `animated` prop)
- Keyframes are automatically injected
