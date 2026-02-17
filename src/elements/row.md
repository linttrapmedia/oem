---
name: row
description: A horizontal flexbox layout component for arranging children in a row. Control spacing, alignment, wrapping, and width with design tokens.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Row Component

The `row` function creates a horizontal flexbox container for laying out elements side-by-side with control over spacing, alignment, and wrapping.

## Props

```typescript
type RowProps = {
  spacing?: SpacingToken;          // Gap between children
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: boolean;                  // Allow wrapping to multiple rows
  fullWidth?: boolean;             // Stretch to full width
  children?: HTMLElement[];
};
```

## Example Usage

### Basic Row

```typescript
import { row } from '@/elements/row';

// Simple horizontal layout
const buttons = row({
  spacing: 'md',
  children: [/* child elements */]
});
```

### Spacing

```typescript
// Small spacing
const smallSpacing = row({
  spacing: 'sm',
  children: [/* children */]
});

// Medium spacing (default)
const mediumSpacing = row({
  spacing: 'md',
  children: [/* children */]
});

// Large spacing
const largeSpacing = row({
  spacing: 'lg',
  children: [/* children */]
});

// Extra large spacing
const xlSpacing = row({
  spacing: 'xl',
  children: [/* children */]
});
```

### Vertical Alignment

```typescript
// Center aligned (default)
const centerAligned = row({
  align: 'center',
  children: [/* children of different heights */]
});

// Top aligned
const topAligned = row({
  align: 'flex-start',
  children: [/* children */]
});

// Bottom aligned
const bottomAligned = row({
  align: 'flex-end',
  children: [/* children */]
});

// Stretch to same height
const stretched = row({
  align: 'stretch',
  children: [/* children */]
});

// Baseline aligned (text alignment)
const baseline = row({
  align: 'baseline',
  children: [/* text elements */]
});
```

### Horizontal Justification

```typescript
// Start (default)
const startJustified = row({
  justify: 'flex-start',
  children: [/* children */]
});

// Center
const centerJustified = row({
  justify: 'center',
  children: [/* children */]
});

// End
const endJustified = row({
  justify: 'flex-end',
  children: [/* children */]
});

// Space between
const spaceBetween = row({
  justify: 'space-between',
  children: [/* children */]
});

// Space around
const spaceAround = row({
  justify: 'space-around',
  children: [/* children */]
});

// Space evenly
const spaceEvenly = row({
  justify: 'space-evenly',
  children: [/* children */]
});
```

### Wrapping

```typescript
// No wrap (default) - single row
const noWrap = row({
  wrap: false,
  spacing: 'sm',
  children: [/* many children */]
});

// Allow wrapping to multiple rows
const wrapped = row({
  wrap: true,
  spacing: 'sm',
  children: [/* many children that will wrap */]
});
```

### Full Width

```typescript
// Full width
const fullWidth = row({
  fullWidth: true,
  justify: 'space-between',
  children: [/* children */]
});

// Auto width (default)
const autoWidth = row({
  fullWidth: false,
  children: [/* children */]
});
```

### Complete Example

```typescript
import { row } from '@/elements/row';
import { button } from '@/elements/button';
import { iconButton } from '@/elements/icon-button';
import { badge } from '@/elements/badge';
import { text } from '@/elements/text';
import { box } from '@/elements/box';
import { tag } from '@/elements/_base';

// Action bar with buttons
const actionBar = row({
  spacing: 'sm',
  align: 'center',
  justify: 'space-between',
  fullWidth: true,
  children: [
    row({
      spacing: 'sm',
      children: [
        button({
          label: 'Save',
          variant: 'primary'
        }),
        button({
          label: 'Cancel',
          variant: 'secondary'
        })
      ]
    }),
    row({
      spacing: 'xs',
      children: [
        iconButton({
          icon: tag.span({ textContent: '⚙️' }),
          'aria-label': 'Settings',
          variant: 'ghost'
        }),
        iconButton({
          icon: tag.span({ textContent: '?' }),
          'aria-label': 'Help',
          variant: 'ghost'
        })
      ]
    })
  ]
});

// Tag list with wrapping
const tags = row({
  spacing: 'xs',
  wrap: true,
  children: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'CSS', 'HTML'].map(tag =>
    badge({
      content: tag,
      variant: 'subtle',
      size: 'sm',
      pill: true
    })
  )
});

// Header with logo and navigation
const header = row({
  spacing: 'lg',
  align: 'center',
  justify: 'space-between',
  fullWidth: true,
  children: [
    text({
      content: 'Logo',
      size: 'xl',
      weight: 'bold'
    }),
    row({
      spacing: 'md',
      children: [
        text({ content: 'Home' }),
        text({ content: 'About' }),
        text({ content: 'Services' }),
        text({ content: 'Contact' })
      ]
    }),
    button({
      label: 'Sign In',
      variant: 'primary'
    })
  ]
});

// Card footer with actions
const cardFooter = row({
  spacing: 'sm',
  justify: 'flex-end',
  children: [
    button({
      label: 'Dismiss',
      variant: 'ghost'
    }),
    button({
      label: 'Confirm',
      variant: 'primary'
    })
  ]
});

// Stats display
const stats = row({
  spacing: 'xl',
  justify: 'space-evenly',
  fullWidth: true,
  children: [
    box({
      children: [
        text({ content: '1,234', size: 'xl', weight: 'bold' }),
        text({ content: 'Users', color: 'textSecondary' })
      ]
    }),
    box({
      children: [
        text({ content: '567', size: 'xl', weight: 'bold' }),
        text({ content: 'Projects', color: 'textSecondary' })
      ]
    }),
    box({
      children: [
        text({ content: '89', size: 'xl', weight: 'bold' }),
        text({ content: 'Teams', color: 'textSecondary' })
      ]
    })
  ]
});
```

## Features

- **Flexbox Layout**: Modern horizontal layout system
- **Spacing Control**: Gap between children using design tokens
- **Vertical Alignment**: Five alignment options for cross-axis
- **Horizontal Justification**: Six justification options for main axis
- **Wrapping**: Optional multi-row wrapping
- **Full Width**: Optional container width control
- **Theme Spacing**: All gaps use design token spacing
- **Center Default**: Sensible defaults for common use cases
- **Responsive**: Works with any child element types
- **No Wrap Default**: Maintains single row unless specified
