---
name: spacer
description: A composable spacer element using the trait-based pattern. Creates flexible spacing between elements with support for horizontal, vertical, and bidirectional spacing.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Spacer Element

The `spacer` element provides a composable, trait-based approach to creating spacing elements with built-in theming support and flexible axis control.

## API

The spacer element exports an object with the following methods:

```typescript
export const spacer = {
  create: (...children: Child[]) => HTMLDivElement;
  size: (size: SpacingToken) => Applier;
  axis: (axis: Axis) => Applier;
};
```

### Types

```typescript
type Axis = 'horizontal' | 'vertical' | 'both';
type SpacingToken = string; // Theme spacing token (e.g., 'xs', 'sm', 'md', 'lg', 'xl')
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Spacer

```typescript
import { spacer } from '@/elements/spacer';

// Create a simple vertical spacer with default size
spacer.create(spacer.size('md'));
```

### Complete Spacer

```typescript
// Create a fully configured spacer
spacer.create(spacer.size('lg'), spacer.axis('vertical'));
```

## Size

The `spacer.size()` applier controls the spacing amount using theme tokens:

```typescript
// Extra small spacing
spacer.create(spacer.size('xs'));

// Small spacing
spacer.create(spacer.size('sm'));

// Medium spacing (default)
spacer.create(spacer.size('md'));

// Large spacing
spacer.create(spacer.size('lg'));

// Extra large spacing
spacer.create(spacer.size('xl'));
```

### Size Features

The size applier:

- Uses theme spacing tokens for consistent spacing across the app
- Automatically reactive to theme changes
- For vertical spacing: sets the height
- For horizontal spacing: sets the width
- For both axes: sets both width and height

## Axis Control

The `spacer.axis()` applier determines the direction of spacing:

```typescript
// Vertical spacing (default - creates height)
spacer.create(spacer.size('md'), spacer.axis('vertical'));

// Horizontal spacing (creates width)
spacer.create(spacer.size('md'), spacer.axis('horizontal'));

// Both axes (creates a square spacer)
spacer.create(spacer.size('lg'), spacer.axis('both'));
```

### Axis Features

Each axis mode:

- **vertical**: Sets height to the spacing token, width to 100% (default behavior)
- **horizontal**: Sets width to the spacing token, height to 100%
- **both**: Sets both width and height to the spacing token

## Advanced Examples

### Vertical Layout with Spacers

```typescript
import { spacer } from '@/elements/spacer';
import { tag } from '@/elements/_base';

tag.div(
  tag.h1('Title'),
  spacer.create(spacer.size('md')),
  tag.p('First paragraph'),
  spacer.create(spacer.size('sm')),
  tag.p('Second paragraph'),
  spacer.create(spacer.size('lg')),
  tag.button('Submit'),
);
```

### Horizontal Layout with Spacers

```typescript
import { spacer } from '@/elements/spacer';
import { tag } from '@/elements/_base';

tag.div(
  tag.button('Back'),
  spacer.create(spacer.size('sm'), spacer.axis('horizontal')),
  tag.button('Next'),
  spacer.create(spacer.size('md'), spacer.axis('horizontal')),
  tag.button('Cancel'),
);
```

### Responsive Spacing

```typescript
import { spacer } from '@/elements/spacer';
import { $state } from '@/core/state';

const isMobile = $state(true);

// Adjust spacing based on screen size
spacer.create(spacer.size(isMobile.get() ? 'sm' : 'lg'));
```

### Card Layout with Spacers

```typescript
tag.div(
  tag.img({ src: 'image.jpg' }),
  spacer.create(spacer.size('md')),
  tag.h2('Card Title'),
  spacer.create(spacer.size('sm')),
  tag.p('Card description goes here'),
  spacer.create(spacer.size('md')),
  tag.button('Read More'),
);
```

### Grid with Spacers

```typescript
// Create a grid-like layout using both axes
tag.div(
  tag.div(
    tag.div('Item 1'),
    spacer.create(spacer.size('md'), spacer.axis('horizontal')),
    tag.div('Item 2'),
  ),
  spacer.create(spacer.size('md'), spacer.axis('vertical')),
  tag.div(
    tag.div('Item 3'),
    spacer.create(spacer.size('md'), spacer.axis('horizontal')),
    tag.div('Item 4'),
  ),
);
```

### Form Layout with Consistent Spacing

```typescript
import { spacer } from '@/elements/spacer';
import { input } from '@/elements/input';
import { button } from '@/elements/button';

tag.form(
  tag.label('Name'),
  input.create(input.placeholder('Enter your name')),
  spacer.create(spacer.size('md')),
  tag.label('Email'),
  input.create(input.placeholder('Enter your email')),
  spacer.create(spacer.size('md')),
  tag.label('Message'),
  input.create(input.placeholder('Enter your message')),
  spacer.create(spacer.size('lg')),
  button.create(button.variant('primary'), button.text('Submit')),
);
```

## Trait-Based Pattern

The spacer element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`size`, `axis`) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how spacer.axis() works internally
axis: (axis: Axis) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    // Vertical: height from token, width 100%
    trait.style('height', theme.$token('spacing', size), $test(axis === 'vertical')),
    trait.style('width', '100%', $test(axis === 'vertical')),

    // Horizontal: width from token, height 100%
    trait.style('width', theme.$token('spacing', size), $test(axis === 'horizontal')),
    trait.style('height', '100%', $test(axis === 'horizontal')),

    // Both: both dimensions from token
    trait.style('width', theme.$token('spacing', size), $test(axis === 'both')),
    trait.style('height', theme.$token('spacing', size), $test(axis === 'both')),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up spacer styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **3 axis modes**: Vertical (default), horizontal, and both
- ✅ **Theme spacing tokens**: Uses consistent spacing values from theme
- ✅ **Flexible sizing**: Support for xs, sm, md, lg, xl and custom tokens
- ✅ **Zero visual impact**: Creates spacing without adding visual elements
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Simple API**: Just two appliers for maximum flexibility

## Best Practices

1. **Use theme tokens**: Prefer theme spacing tokens (xs, sm, md, lg, xl) over custom pixel values
2. **Default axis**: The default is vertical spacing with 100% width, which works for most layouts
3. **Consistent spacing**: Use the same spacing sizes throughout your app for visual consistency
4. **Alternative to margin**: Use spacer instead of margins for more predictable layouts
5. **Flexbox friendly**: Spacers work well within flex containers for flexible spacing

## Common Patterns

### Section Dividers

```typescript
// Large vertical space between major sections
spacer.create(spacer.size('xl'));
```

### Inline Spacing

```typescript
// Small horizontal space between inline elements
spacer.create(spacer.size('xs'), spacer.axis('horizontal'));
```

### Breathing Room

```typescript
// Medium vertical space for comfortable reading
spacer.create(spacer.size('md'));
```

## Migration from v2.0

If you're migrating from v2.0:

- Replace `<Spacer />` component with `spacer.create()`
- Replace props with applier functions: `size`, `axis`
- Update spacing values to use theme tokens
- Default behavior is vertical spacing with 100% width (same as v2.0)
