---
name: grid
description: A CSS Grid layout component for creating responsive two-dimensional layouts. Control columns, rows, gaps, and alignment with design tokens.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Grid Component

The `grid` function creates a CSS Grid container for powerful two-dimensional layouts with control over columns, rows, gaps, and item alignment.

## Props

```typescript
type GridProps = {
  columns?: number | string;       // Grid columns (number or template string)
  rows?: number | string;          // Grid rows (number or template string)
  gap?: SpacingToken;              // Gap between all grid items
  columnGap?: SpacingToken;        // Gap between columns
  rowGap?: SpacingToken;           // Gap between rows
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  fullWidth?: boolean;             // Stretch to full width
  children?: HTMLElement[];
};
```

## Example Usage

### Basic Grid

```typescript
import { grid } from '@/elements/grid';

// Simple 3-column grid
const basicGrid = grid({
  columns: 3,
  gap: 'md',
  children: [/* grid items */]
});
```

### Columns

```typescript
// Number of equal columns
const threeColumns = grid({
  columns: 3,
  children: [/* 3 equal columns */]
});

// Custom column template
const customColumns = grid({
  columns: '200px 1fr 2fr',
  children: [/* custom sized columns */]
});

// Auto-fit responsive columns
const responsiveGrid = grid({
  columns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 'md',
  children: [/* auto-fitting columns */]
});
```

### Rows

```typescript
// Number of equal rows
const threeRows = grid({
  rows: 3,
  children: [/* 3 equal rows */]
});

// Custom row template
const customRows = grid({
  rows: '100px auto 200px',
  children: [/* custom sized rows */]
});
```

### Gap

```typescript
// Uniform gap
const uniformGap = grid({
  columns: 3,
  gap: 'lg'
});

// Different column and row gaps
const differentGaps = grid({
  columns: 3,
  columnGap: 'xl',
  rowGap: 'sm'
});
```

### Alignment

```typescript
// Center items
const centeredGrid = grid({
  columns: 3,
  alignItems: 'center',
  justifyItems: 'center',
  gap: 'md'
});

// Stretch items (default)
const stretchGrid = grid({
  columns: 2,
  alignItems: 'stretch',
  justifyItems: 'stretch'
});

// Start alignment
const startGrid = grid({
  columns: 3,
  alignItems: 'start',
  justifyItems: 'start'
});
```

### Full Width

```typescript
// Full width grid
const fullWidthGrid = grid({
  columns: 4,
  gap: 'md',
  fullWidth: true
});

// Auto width (default)
const autoWidthGrid = grid({
  columns: 3,
  gap: 'md',
  fullWidth: false
});
```

### Complete Example

```typescript
import { grid } from '@/elements/grid';
import { box } from '@/elements/box';
import { heading } from '@/elements/heading';
import { text } from '@/elements/text';

// Responsive card grid
const cardGrid = grid({
  columns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 'lg',
  fullWidth: true,
  children: [
    box({
      bg: 'bgPrimary',
      border: 'borderPrimary',
      borderRadius: 'borderRadiusMd',
      padding: 'lg',
      children: [
        heading({ content: 'Card 1', level: 3 }),
        text({ content: 'Card content here' })
      ]
    }),
    box({
      bg: 'bgPrimary',
      border: 'borderPrimary',
      borderRadius: 'borderRadiusMd',
      padding: 'lg',
      children: [
        heading({ content: 'Card 2', level: 3 }),
        text({ content: 'More content' })
      ]
    }),
    box({
      bg: 'bgPrimary',
      border: 'borderPrimary',
      borderRadius: 'borderRadiusMd',
      padding: 'lg',
      children: [
        heading({ content: 'Card 3', level: 3 }),
        text({ content: 'Even more content' })
      ]
    })
  ]
});

// Dashboard layout
const dashboard = grid({
  columns: '250px 1fr',
  rows: 'auto 1fr auto',
  gap: 'md',
  fullWidth: true,
  children: [
    // Sidebar spans 3 rows
    box({
      style: 'grid-row: 1 / 4',
      bg: 'bgSecondary',
      padding: 'lg'
    }),
    // Header
    box({
      bg: 'bgPrimary',
      padding: 'md'
    }),
    // Main content
    box({
      padding: 'lg'
    }),
    // Footer
    box({
      bg: 'bgTertiary',
      padding: 'sm'
    })
  ]
});

// Image gallery
const gallery = grid({
  columns: 4,
  gap: 'sm',
  alignItems: 'center',
  justifyItems: 'center',
  children: Array.from({ length: 12 }, (_, i) =>
    box({
      width: '100%',
      height: '150px',
      bg: 'bgSecondary',
      borderRadius: 'borderRadiusSm'
    })
  )
});
```

## Features

- **CSS Grid Layout**: Modern two-dimensional grid system
- **Flexible Columns**: Number or custom template string
- **Flexible Rows**: Number or custom template string
- **Gap Control**: Unified or separate column/row gaps with design tokens
- **Item Alignment**: Control vertical and horizontal alignment
- **Responsive**: Works with auto-fit and minmax for responsive layouts
- **Full Width**: Optional container width control
- **Theme Spacing**: All gaps use design token spacing
- **Grid Template**: Full support for CSS grid-template syntax
- **Auto Placement**: Automatic item placement in grid cells
