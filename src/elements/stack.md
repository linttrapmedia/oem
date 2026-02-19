---
name: stack
description: A composable stack element using the trait-based pattern. Provides vertical flexbox layouts with customizable spacing, alignment, and justification.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Stack Element

The `stack` element provides a composable, trait-based approach to creating vertical flexbox layouts with built-in theming support, customizable spacing, and flexible alignment options.

## API

The stack element exports an object with the following methods:

```typescript
export const stack = {
  create: (...children: Child[]) => HTMLDivElement;
  spacing: (spacing: SpacingToken) => Applier;
  align: (align: Align) => Applier;
  justify: (justify: Justify) => Applier;
  wrap: (wrap: boolean) => Applier;
  fullWidth: (fullWidth: boolean) => Applier;
};
```

### Types

```typescript
type SpacingToken = string; // Theme spacing token (e.g., 'xs', 'sm', 'md', 'lg', 'xl')
type Align = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Stack

```typescript
import { stack } from '@/elements/stack';
import { tag } from '@/elements/_base';

// Create a simple vertical stack
stack.create(
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);
```

### Complete Stack

```typescript
// Create a fully configured stack
stack.create(
  stack.spacing('md'),
  stack.align('center'),
  stack.justify('flex-start'),
  stack.wrap(false),
  stack.fullWidth(true),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);
```

## Spacing

The `stack.spacing()` applier controls the gap between child items:

```typescript
// Extra small spacing
stack.create(
  stack.spacing('xs'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Small spacing
stack.create(
  stack.spacing('sm'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Medium spacing (common default)
stack.create(
  stack.spacing('md'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Large spacing
stack.create(
  stack.spacing('lg'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Extra large spacing
stack.create(
  stack.spacing('xl'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);
```

### Spacing Features

The spacing applier:

- Uses theme spacing tokens for consistency
- Automatically reactive to theme changes
- Applied via CSS `gap` property
- Affects space between all children uniformly

## Alignment

The `stack.align()` applier controls cross-axis alignment (horizontal in vertical stacks):

```typescript
// Align items to the start (left)
stack.create(
  stack.align('flex-start'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Center items horizontally
stack.create(
  stack.align('center'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Align items to the end (right)
stack.create(
  stack.align('flex-end'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Stretch items to fill width (default)
stack.create(
  stack.align('stretch'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Align items by text baseline
stack.create(
  stack.align('baseline'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);
```

### Alignment Features

- **flex-start**: Items align to the left edge
- **center**: Items are horizontally centered
- **flex-end**: Items align to the right edge
- **stretch**: Items expand to fill the container width (default)
- **baseline**: Items align by their text baseline

## Justification

The `stack.justify()` applier controls main-axis justification (vertical in vertical stacks):

```typescript
// Justify items to the start (top)
stack.create(
  stack.justify('flex-start'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Center items vertically
stack.create(
  stack.justify('center'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Justify items to the end (bottom)
stack.create(
  stack.justify('flex-end'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Space between items (edges touch container)
stack.create(
  stack.justify('space-between'),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);

// Space around items (equal space around each)
stack.create(
  stack.justify('space-around'),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);

// Space evenly (equal space between and around)
stack.create(
  stack.justify('space-evenly'),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);
```

### Justification Features

- **flex-start**: Items pack to the top (default)
- **center**: Items are vertically centered
- **flex-end**: Items pack to the bottom
- **space-between**: Items evenly distributed, first at top, last at bottom
- **space-around**: Items evenly distributed with equal space around each
- **space-evenly**: Items evenly distributed with equal space between and on edges

## Wrapping

The `stack.wrap()` applier controls whether items can wrap to new lines:

```typescript
// No wrapping (default)
stack.create(
  stack.wrap(false),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);

// Allow wrapping
stack.create(
  stack.wrap(true),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);
```

The `stack.wrap()` applier:

- Default is `false` (no wrapping)
- When `true`, items wrap to new columns if they exceed container height
- Useful for responsive layouts

## Width Control

The `stack.fullWidth()` applier controls whether the stack spans full width:

```typescript
// Full width stack
stack.create(
  stack.fullWidth(true),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Natural width stack (fits content)
stack.create(
  stack.fullWidth(false),
  tag.div('Item 1'),
  tag.div('Item 2'),
);
```

## Advanced Examples

### Form Layout

```typescript
import { stack } from '@/elements/stack';
import { input } from '@/elements/input';
import { button } from '@/elements/button';

stack.create(
  stack.spacing('md'),
  stack.align('stretch'),
  stack.fullWidth(true),

  tag.label('Name'),
  input.create(input.placeholder('Enter your name')),

  tag.label('Email'),
  input.create(input.placeholder('Enter your email')),

  tag.label('Message'),
  input.create(input.placeholder('Enter your message')),

  button.create(button.variant('primary'), button.text('Submit')),
);
```

### Card Stack

```typescript
import { stack } from '@/elements/stack';
import { tag } from '@/elements/_base';

stack.create(
  stack.spacing('lg'),
  stack.align('stretch'),
  stack.fullWidth(true),

  tag.div('Card 1'),
  tag.div('Card 2'),
  tag.div('Card 3'),
);
```

### Centered Content Stack

```typescript
import { stack } from '@/elements/stack';
import { tag } from '@/elements/_base';

stack.create(
  stack.spacing('md'),
  stack.align('center'),
  stack.justify('center'),
  stack.fullWidth(true),

  trait.style('minHeight', '100vh'),

  tag.h1('Welcome'),
  tag.p('This content is centered both horizontally and vertically'),
  tag.button('Get Started'),
);
```

### Navigation Stack

```typescript
import { stack } from '@/elements/stack';
import { link } from '@/elements/link';

stack.create(
  stack.spacing('sm'),
  stack.align('flex-start'),

  link.create(link.href('/home'), link.text('Home')),
  link.create(link.href('/about'), link.text('About')),
  link.create(link.href('/services'), link.text('Services')),
  link.create(link.href('/contact'), link.text('Contact')),
);
```

### Responsive Stack

```typescript
import { stack } from '@/elements/stack';
import { $state } from '@/core/state';

const isMobile = $state(true);

stack.create(
  stack.spacing(isMobile.get() ? 'sm' : 'lg'),
  stack.align(isMobile.get() ? 'stretch' : 'center'),
  stack.fullWidth(isMobile.get()),

  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);
```

### Dashboard Layout

```typescript
import { stack } from '@/elements/stack';
import { tag } from '@/elements/_base';

stack.create(
  stack.spacing('lg'),
  stack.align('stretch'),
  stack.fullWidth(true),

  // Header
  tag.header('Dashboard Header'),

  // Main content area
  stack.create(
    stack.spacing('md'),
    stack.align('stretch'),

    tag.div('Widget 1'),
    tag.div('Widget 2'),
    tag.div('Widget 3'),
  ),

  // Footer
  tag.footer('Dashboard Footer'),
);
```

### Split Content Stack

```typescript
import { stack } from '@/elements/stack';
import { tag } from '@/elements/_base';

stack.create(
  stack.spacing('md'),
  stack.justify('space-between'),
  stack.fullWidth(true),

  trait.style('minHeight', '400px'),

  tag.div('Top content'),
  tag.div('Middle content'),
  tag.div('Bottom content'),
);
```

## Trait-Based Pattern

The stack element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`spacing`, `align`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how stack.align() works internally
align: (align: Align) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('display', 'flex'),
    trait.style('flexDirection', 'column'),
    trait.style('alignItems', align),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up stack styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **Vertical flexbox**: Column direction by default
- ✅ **Flexible spacing**: Uses theme spacing tokens
- ✅ **5 alignment options**: flex-start, center, flex-end, stretch (default), baseline
- ✅ **6 justification options**: flex-start (default), center, flex-end, space-between, space-around, space-evenly
- ✅ **Optional wrapping**: Control whether items wrap
- ✅ **Width control**: Full width or natural width
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Nested stacks**: Stack elements can be nested for complex layouts

## Best Practices

1. **Use theme spacing**: Prefer theme spacing tokens (xs, sm, md, lg, xl) for consistent spacing
2. **Default alignment**: Default `align` is `stretch`, which makes items fill the container width
3. **Default justification**: Default `justify` is `flex-start`, which packs items to the top
4. **Full width forms**: Use `stack.fullWidth(true)` for form layouts
5. **Nested stacks**: Nest stacks for more complex layouts instead of custom CSS
6. **Consistent spacing**: Use the same spacing value throughout a section for visual consistency

## Common Patterns

### Basic Vertical List

```typescript
stack.create(
  stack.spacing('sm'),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);
```

### Centered Panel

```typescript
stack.create(
  stack.spacing('md'),
  stack.align('center'),
  stack.justify('center'),
  tag.h2('Title'),
  tag.p('Description'),
  tag.button('Action'),
);
```

### Full-Width Form

```typescript
stack.create(
  stack.spacing('md'),
  stack.align('stretch'),
  stack.fullWidth(true),
  tag.input(),
  tag.textarea(),
  tag.button('Submit'),
);
```

## Migration from v2.0

If you're migrating from v2.0:

- Replace `<Stack />` component with `stack.create()`
- Replace props with applier functions: `spacing`, `align`, `justify`, `wrap`, `fullWidth`
- Update spacing values to use theme tokens
- Default behavior is vertical flexbox with `stretch` alignment and `flex-start` justification
- Nesting stacks is the preferred way to create complex layouts
