---
name: row
description: A composable horizontal layout element using the trait-based pattern. Provides flexbox-based row layout with spacing, alignment, justification, and wrapping control with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Row Element

The `row` element provides a composable, trait-based approach to creating horizontal flexbox layouts with built-in theming support and comprehensive alignment control.

## API

The row element exports an object with the following methods:

```typescript
export const row = {
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
type Align = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type SpacingToken = string; // Theme spacing token
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Row

```typescript
import { row } from '@/elements/row';
import { tag } from '@/elements/_base';

// Create a simple horizontal layout
const basicRow = row.create(
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);
```

### Complete Row

```typescript
// Create a fully configured row layout
const layout = row.create(
  row.spacing('md'),
  row.align('center'),
  row.justify('space-between'),
  row.wrap(false),
  row.fullWidth(true),
  tag.div('Left'),
  tag.div('Center'),
  tag.div('Right'),
);

document.body.appendChild(layout);
```

## Spacing

The `row.spacing()` applier sets the gap between child elements:

```typescript
// Extra small spacing
const xsRow = row.create(
  row.spacing('xs'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Small spacing
const smRow = row.create(
  row.spacing('sm'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Medium spacing (typical default)
const mdRow = row.create(
  row.spacing('md'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Large spacing
const lgRow = row.create(
  row.spacing('lg'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Extra large spacing
const xlRow = row.create(
  row.spacing('xl'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);
```

### Spacing Features

- Uses theme spacing tokens
- Consistent spacing across the design system
- Automatic theme reactivity

## Alignment

The `row.align()` applier controls vertical (cross-axis) alignment:

```typescript
// Start aligned (top)
const startRow = row.create(
  row.align('flex-start'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Center aligned (default)
const centerRow = row.create(
  row.align('center'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// End aligned (bottom)
const endRow = row.create(
  row.align('flex-end'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Stretch to same height
const stretchRow = row.create(
  row.align('stretch'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Baseline aligned (text alignment)
const baselineRow = row.create(
  row.align('baseline'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);
```

### Alignment Options

- `flex-start`: Align items to the top
- `center`: Center items vertically
- `flex-end`: Align items to the bottom
- `stretch`: Stretch items to fill container height
- `baseline`: Align items by their text baseline

## Justification

The `row.justify()` applier controls horizontal (main-axis) justification:

```typescript
// Start justified (left)
const startJustified = row.create(
  row.justify('flex-start'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Center justified
const centerJustified = row.create(
  row.justify('center'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// End justified (right)
const endJustified = row.create(
  row.justify('flex-end'),
  tag.div('Item 1'),
  tag.div('Item 2'),
);

// Space between - items spread with space between them
const spaceBetween = row.create(
  row.justify('space-between'),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);

// Space around - equal space around each item
const spaceAround = row.create(
  row.justify('space-around'),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);

// Space evenly - equal space between and around items
const spaceEvenly = row.create(
  row.justify('space-evenly'),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);
```

### Justification Options

- `flex-start`: Pack items to the start
- `center`: Center items horizontally
- `flex-end`: Pack items to the end
- `space-between`: Distribute items with space between
- `space-around`: Distribute items with space around
- `space-evenly`: Distribute items with even spacing

## Wrapping

The `row.wrap()` applier controls whether items wrap to multiple rows:

```typescript
// No wrap (default) - single row
const noWrapRow = row.create(
  row.wrap(false),
  row.spacing('sm'),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
  tag.div('Item 4'),
);

// Allow wrapping to multiple rows
const wrapRow = row.create(
  row.wrap(true),
  row.spacing('sm'),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
  tag.div('Item 4'),
);
```

## Full Width

The `row.fullWidth()` applier controls container width:

```typescript
// Full width - stretches to container width
const fullWidthRow = row.create(
  row.fullWidth(true),
  row.justify('space-between'),
  tag.div('Left'),
  tag.div('Right'),
);

// Auto width (default) - fits content
const autoWidthRow = row.create(
  row.fullWidth(false),
  tag.div('Item 1'),
  tag.div('Item 2'),
);
```

## Advanced Examples

### Action Bar

```typescript
import { row } from '@/elements/row';
import { tag } from '@/elements/_base';

const actionBar = row.create(
  row.spacing('sm'),
  row.align('center'),
  row.justify('space-between'),
  row.fullWidth(true),
  // Left actions
  row.create(
    row.spacing('sm'),
    tag.button('Save'),
    tag.button('Cancel'),
  ),
  // Right actions
  row.create(
    row.spacing('xs'),
    tag.button('Settings'),
    tag.button('Help'),
  ),
);
```

### Tag List with Wrapping

```typescript
const tags = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'CSS', 'HTML'];

const tagList = row.create(
  row.spacing('xs'),
  row.wrap(true),
  ...tags.map(tag => tag.span(tag)),
);
```

### Header Layout

```typescript
const header = row.create(
  row.spacing('lg'),
  row.align('center'),
  row.justify('space-between'),
  row.fullWidth(true),
  // Logo
  tag.div('Logo'),
  // Navigation
  row.create(
    row.spacing('md'),
    tag.a('Home'),
    tag.a('About'),
    tag.a('Services'),
    tag.a('Contact'),
  ),
  // Actions
  tag.button('Sign In'),
);
```

### Card Footer

```typescript
const cardFooter = row.create(
  row.spacing('sm'),
  row.justify('flex-end'),
  tag.button('Dismiss'),
  tag.button('Confirm'),
);
```

### Stats Display

```typescript
const stats = [
  { value: '1,234', label: 'Users' },
  { value: '567', label: 'Projects' },
  { value: '89', label: 'Teams' },
];

const statsDisplay = row.create(
  row.spacing('xl'),
  row.justify('space-evenly'),
  row.fullWidth(true),
  ...stats.map(stat =>
    tag.div(
      tag.div(stat.value),
      tag.div(stat.label),
    ),
  ),
);
```

### Responsive Button Group

```typescript
const buttonGroup = row.create(
  row.spacing('sm'),
  row.wrap(true),
  row.justify('center'),
  tag.button('Option 1'),
  tag.button('Option 2'),
  tag.button('Option 3'),
  tag.button('Option 4'),
);
```

## Trait-Based Pattern

The row element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`spacing`, `align`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how row.spacing() works internally
spacing: (spacing: SpacingToken) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('gap', theme.$token('spacing', spacing)),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up row layout
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **Flexbox layout**: Modern horizontal layout system
- ✅ **5 alignment options**: Vertical cross-axis alignment control
- ✅ **6 justification options**: Horizontal main-axis distribution
- ✅ **Spacing control**: Gap between children using design tokens
- ✅ **Wrapping support**: Optional multi-row wrapping
- ✅ **Width control**: Full width or auto width modes
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM

## Migration from v2.0

If you're migrating from the props-based API:

**Old (v2.0):**

```typescript
row({
  spacing: 'md',
  align: 'center',
  justify: 'space-between',
  wrap: false,
  fullWidth: true,
  children: [/* elements */],
});
```

**New (v3.0):**

```typescript
row.create(
  row.spacing('md'),
  row.align('center'),
  row.justify('space-between'),
  row.wrap(false),
  row.fullWidth(true),
  /* elements */
);
```
