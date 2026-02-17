---
name: divider
description: A visual separator component for dividing content. Supports horizontal and vertical orientations with multiple styles and customizable colors.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Divider Component

The `divider` function creates a customizable separator line element for visually dividing content sections with support for different orientations and styles.

## Props

```typescript
type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: ColorToken;              // Divider color
  thickness?: string;              // Line thickness
  spacing?: SpacingToken;          // Margin spacing
};
```

## Example Usage

### Basic Divider

```typescript
import { divider } from '@/elements/divider';

// Simple horizontal divider
const separator = divider({});
```

### Orientation

```typescript
// Horizontal (default)
const horizontalDiv = divider({
  orientation: 'horizontal'
});

// Vertical (for side-by-side content)
const verticalDiv = divider({
  orientation: 'vertical'
});
```

### Variants

```typescript
// Solid line (default)
const solidDiv = divider({
  variant: 'solid'
});

// Dashed line
const dashedDiv = divider({
  variant: 'dashed'
});

// Dotted line
const dottedDiv = divider({
  variant: 'dotted'
});
```

### Colors

```typescript
// Primary border color (default)
const defaultDiv = divider({
  color: 'borderPrimary'
});

// Secondary border color
const secondaryDiv = divider({
  color: 'borderSecondary'
});

// Custom color
const customDiv = divider({
  color: 'primary'
});
```

### Thickness

```typescript
// Thin (1px - default)
const thinDiv = divider({
  thickness: '1px'
});

// Medium
const mediumDiv = divider({
  thickness: '2px'
});

// Thick
const thickDiv = divider({
  thickness: '4px'
});
```

### Spacing

```typescript
// Small spacing
const smallSpacing = divider({
  spacing: 'sm'
});

// Medium spacing (default)
const mediumSpacing = divider({
  spacing: 'md'
});

// Large spacing
const largeSpacing = divider({
  spacing: 'lg'
});

// Extra large spacing
const xlSpacing = divider({
  spacing: 'xl'
});
```

### Complete Example

```typescript
import { divider } from '@/elements/divider';
import { stack } from '@/elements/stack';
import { row } from '@/elements/row';
import { heading } from '@/elements/heading';
import { text } from '@/elements/text';

// Content sections with dividers
const page = stack({
  spacing: '0',
  children: [
    heading({
      content: 'Section 1',
      level: 2
    }),
    text({
      content: 'Content for the first section.'
    }),

    divider({
      spacing: 'xl',
      variant: 'solid'
    }),

    heading({
      content: 'Section 2',
      level: 2
    }),
    text({
      content: 'Content for the second section.'
    }),

    divider({
      spacing: 'xl',
      variant: 'dashed',
      color: 'borderSecondary'
    }),

    heading({
      content: 'Section 3',
      level: 2
    })
  ]
});

// Vertical divider between columns
const columns = row({
  spacing: '0',
  children: [
    stack({
      padding: 'lg',
      children: [
        heading({ content: 'Column 1', level: 3 })
      ]
    }),

    divider({
      orientation: 'vertical',
      spacing: 'md'
    }),

    stack({
      padding: 'lg',
      children: [
        heading({ content: 'Column 2', level: 3 })
      ]
    })
  ]
});

// Decorative dividers
const fancySection = stack({
  spacing: 'lg',
  children: [
    text({ content: 'Content above' }),

    divider({
      variant: 'dashed',
      color: 'primary',
      thickness: '2px',
      spacing: 'lg'
    }),

    text({ content: 'Content below' })
  ]
});
```

## Features

- **Dual Orientation**: Horizontal for stacking, vertical for side-by-side
- **Three Variants**: Solid, dashed, and dotted line styles
- **Theme Colors**: Uses design token colors
- **Customizable Thickness**: Any CSS thickness value
- **Spacing Control**: Margin spacing using design tokens
- **Full Width**: Horizontal dividers stretch to container width
- **Full Height**: Vertical dividers stretch to container height
- **Inline Display**: Vertical dividers work inline
- **Pattern Support**: Dashed and dotted use CSS gradient patterns
- **Semantic HTML**: Uses `<hr>` element for accessibility
