---
name: grid
description: A composable grid layout element using the trait-based pattern. Supports flexible column and row configuration, gap controls, and alignment with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Grid Element

The `grid` element provides a composable, trait-based approach to creating CSS Grid layout elements with built-in theming support, flexible configuration, and responsive alignment options.

## API

The grid element exports an object with the following methods:

```typescript
export const grid = {
  create: (...children: Child[]) => HTMLDivElement;
  columns: (columns: number | string) => Applier;
  rows: (rows: number | string) => Applier;
  gap: (gap: SpacingToken) => Applier;
  columnGap: (gap: SpacingToken) => Applier;
  rowGap: (gap: SpacingToken) => Applier;
  alignItems: (align: AlignItems) => Applier;
  justifyItems: (justify: JustifyItems) => Applier;
  fullWidth: (fullWidth: boolean) => Applier;
};
```

### Types

```typescript
type AlignItems = 'start' | 'center' | 'end' | 'stretch';
type JustifyItems = 'start' | 'center' | 'end' | 'stretch';
type SpacingToken = string;
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Grid

```typescript
import { grid } from '@/elements/grid';

// Create a simple grid with children
grid.create(
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);
```

### Complete Grid

```typescript
// Create a fully configured grid
grid.create(
  grid.columns(3),
  grid.rows('auto'),
  grid.gap('md'),
  grid.alignItems('center'),
  grid.justifyItems('stretch'),
  tag.div('Item 1'),
  tag.div('Item 2'),
  tag.div('Item 3'),
);
```

## Columns

The `grid.columns()` applier sets the grid column template:

```typescript
// Fixed number of columns
grid.create(grid.columns(3));

// Equal width columns
grid.create(grid.columns('1fr 1fr 1fr'));

// Mixed column widths
grid.create(grid.columns('200px 1fr 1fr'));

// Responsive columns
grid.create(grid.columns('repeat(auto-fit, minmax(250px, 1fr))'));
```

### Column Configuration

- **Number**: Creates equal-width columns using `repeat()`
- **String**: Direct CSS grid-template-columns value
- Supports fr units, px, auto, minmax(), and repeat()
- Fully responsive with auto-fit and auto-fill

## Rows

The `grid.rows()` applier sets the grid row template:

```typescript
// Fixed number of rows
grid.create(grid.rows(2));

// Equal height rows
grid.create(grid.rows('1fr 1fr'));

// Mixed row heights
grid.create(grid.rows('100px auto 1fr'));

// Auto-sized rows
grid.create(grid.rows('auto'));
```

## Gap

### Uniform Gap

The `grid.gap()` applier sets both column and row gaps:

```typescript
// Small gap
grid.create(grid.gap('sm'));

// Medium gap
grid.create(grid.gap('md'));

// Large gap
grid.create(grid.gap('lg'));

// Custom gap
grid.create(grid.gap('2rem'));
```

### Individual Gap Controls

The `grid.columnGap()` and `grid.rowGap()` appliers set gaps independently:

```typescript
// Different column and row gaps
grid.create(grid.columnGap('lg'), grid.rowGap('sm'));

// Column gap only
grid.create(grid.columnGap('md'));

// Row gap only
grid.create(grid.rowGap('md'));
```

## Alignment

### Align Items

The `grid.alignItems()` applier controls vertical alignment of items:

```typescript
// Align to start
grid.create(grid.alignItems('start'));

// Center vertically
grid.create(grid.alignItems('center'));

// Align to end
grid.create(grid.alignItems('end'));

// Stretch to fill (default)
grid.create(grid.alignItems('stretch'));
```

### Justify Items

The `grid.justifyItems()` applier controls horizontal alignment of items:

```typescript
// Justify to start
grid.create(grid.justifyItems('start'));

// Center horizontally
grid.create(grid.justifyItems('center'));

// Justify to end
grid.create(grid.justifyItems('end'));

// Stretch to fill (default)
grid.create(grid.justifyItems('stretch'));
```

## Full Width

The `grid.fullWidth()` applier sets the grid to span full container width:

```typescript
// Full width grid
grid.create(grid.fullWidth(true));

// Content-based width (default)
grid.create(grid.fullWidth(false));
```

## Advanced Examples

### Card Grid

```typescript
import { grid } from '@/elements/grid';
import { tag } from '@/elements/_base';

grid.create(
  grid.columns('repeat(auto-fit, minmax(300px, 1fr))'),
  grid.gap('lg'),
  grid.fullWidth(true),
  tag.div('Card 1'),
  tag.div('Card 2'),
  tag.div('Card 3'),
  tag.div('Card 4'),
);
```

### Dashboard Layout

```typescript
// Complex dashboard grid
grid.create(
  grid.columns('250px 1fr 1fr'),
  grid.rows('auto 1fr auto'),
  grid.gap('md'),
  grid.fullWidth(true),
  tag.header('Header'),
  tag.aside('Sidebar'),
  tag.main('Main Content'),
  tag.aside('Right Panel'),
  tag.footer('Footer'),
);
```

### Centered Grid Items

```typescript
// Center all items both vertically and horizontally
grid.create(
  grid.columns(3),
  grid.gap('md'),
  grid.alignItems('center'),
  grid.justifyItems('center'),
  tag.div('Centered 1'),
  tag.div('Centered 2'),
  tag.div('Centered 3'),
);
```

### Responsive Image Grid

```typescript
import { grid } from '@/elements/grid';

grid.create(
  grid.columns('repeat(auto-fill, minmax(200px, 1fr))'),
  grid.gap('sm'),
  grid.alignItems('stretch'),
  tag.img({ src: 'image1.jpg' }),
  tag.img({ src: 'image2.jpg' }),
  tag.img({ src: 'image3.jpg' }),
  tag.img({ src: 'image4.jpg' }),
);
```

### Form Layout

```typescript
// Two-column form layout
grid.create(
  grid.columns('1fr 1fr'),
  grid.columnGap('lg'),
  grid.rowGap('md'),
  tag.label('First Name'),
  tag.input(),
  tag.label('Last Name'),
  tag.input(),
  tag.label('Email'),
  tag.input(),
);
```

## Trait-Based Pattern

The grid element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`columns`, `rows`, `gap`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how grid.columns() works internally
columns: (columns: number | string) => (el: HTMLElement | SVGElement) => {
  const templateValue = typeof columns === 'number'
    ? `repeat(${columns}, 1fr)`
    : columns;
  tag.$(el)(
    trait.style('display', 'grid'),
    trait.style('gridTemplateColumns', templateValue),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up grid layout
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **Flexible columns**: Support for number or custom CSS values
- ✅ **Flexible rows**: Support for number or custom CSS values
- ✅ **Gap controls**: Unified and individual gap settings
- ✅ **Alignment**: Both vertical and horizontal alignment controls
- ✅ **Full width mode**: Easy container-spanning layouts
- ✅ **Responsive**: Supports auto-fit and auto-fill patterns
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Subscriptions are cleaned up when elements are removed from DOM
