---
name: stack
description: A vertical flexbox layout component for stacking elements in a column. Control spacing, alignment, wrapping, and width with design tokens.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Stack Component

The `stack` function creates a vertical flexbox container for laying out elements in a column with control over spacing, alignment, and wrapping.

## Props

```typescript
type StackProps = {
  spacing?: SpacingToken;          // Gap between children
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: boolean;                  // Allow wrapping to multiple columns
  fullWidth?: boolean;             // Stretch to full width
  children?: HTMLElement[];
};
```

## Example Usage

### Basic Stack

```typescript
import { stack } from '@/elements/stack';

// Simple vertical layout
const verticalLayout = stack({
  spacing: 'md',
  children: [/* child elements */]
});
```

### Spacing

```typescript
// Small spacing
const smallSpacing = stack({
  spacing: 'sm',
  children: [/* children */]
});

// Medium spacing (default)
const mediumSpacing = stack({
  spacing: 'md',
  children: [/* children */]
});

// Large spacing
const largeSpacing = stack({
  spacing: 'lg',
  children: [/* children */]
});

// Extra large spacing
const xlSpacing = stack({
  spacing: 'xl',
  children: [/* children */]
});
```

### Horizontal Alignment

```typescript
// Stretch to full width (default)
const stretched = stack({
  align: 'stretch',
  children: [/* children */]
});

// Center aligned
const centerAligned = stack({
  align: 'center',
  children: [/* children */]
});

// Left aligned
const leftAligned = stack({
  align: 'flex-start',
  children: [/* children */]
});

// Right aligned
const rightAligned = stack({
  align: 'flex-end',
  children: [/* children */]
});

// Baseline aligned
const baseline = stack({
  align: 'baseline',
  children: [/* text elements */]
});
```

### Vertical Justification

```typescript
// Start (default)
const startJustified = stack({
  justify: 'flex-start',
  children: [/* children */]
});

// Center
const centerJustified = stack({
  justify: 'center',
  children: [/* children */]
});

// End
const endJustified = stack({
  justify: 'flex-end',
  children: [/* children */]
});

// Space between
const spaceBetween = stack({
  justify: 'space-between',
  children: [/* children */]
});

// Space around
const spaceAround = stack({
  justify: 'space-around',
  children: [/* children */]
});

// Space evenly
const spaceEvenly = stack({
  justify: 'space-evenly',
  children: [/* children */]
});
```

### Wrapping

```typescript
// No wrap (default) - single column
const noWrap = stack({
  wrap: false,
  spacing: 'sm',
  children: [/* many children */]
});

// Allow wrapping to multiple columns
const wrapped = stack({
  wrap: true,
  spacing: 'sm',
  children: [/* many children that will wrap */]
});
```

### Full Width

```typescript
// Full width
const fullWidth = stack({
  fullWidth: true,
  children: [/* children */]
});

// Auto width (default)
const autoWidth = stack({
  fullWidth: false,
  children: [/* children */]
});
```

### Complete Example

```typescript
import { stack } from '@/elements/stack';
import { heading } from '@/elements/heading';
import { text } from '@/elements/text';
import { input } from '@/elements/input';
import { button } from '@/elements/button';
import { divider } from '@/elements/divider';
import { label } from '@/elements/label';

// Form layout
const loginForm = stack({
  spacing: 'lg',
  fullWidth: true,
  children: [
    heading({
      content: 'Sign In',
      level: 2,
      align: 'center'
    }),

    stack({
      spacing: 'xs',
      children: [
        label({
          content: 'Email',
          required: true
        }),
        input({
          type: 'email',
          placeholder: 'Enter your email',
          fullWidth: true
        })
      ]
    }),

    stack({
      spacing: 'xs',
      children: [
        label({
          content: 'Password',
          required: true
        }),
        input({
          type: 'password',
          placeholder: 'Enter your password',
          fullWidth: true
        })
      ]
    }),

    button({
      label: 'Sign In',
      variant: 'primary',
      fullWidth: true
    }),

    divider({ spacing: 'md' }),

    text({
      content: 'Don\'t have an account? Sign up',
      align: 'center',
      color: 'textSecondary'
    })
  ]
});

// Card content
const productCard = stack({
  spacing: 'md',
  children: [
    heading({
      content: 'Product Name',
      level: 3
    }),
    text({
      content: 'Product description goes here. This is a detailed explanation of the product features and benefits.',
      color: 'textSecondary'
    }),
    text({
      content: '$99.99',
      size: 'xl',
      weight: 'bold',
      color: 'primary'
    }),
    button({
      label: 'Add to Cart',
      variant: 'primary',
      fullWidth: true
    })
  ]
});

// Centered content
const centeredPage = stack({
  spacing: 'xl',
  align: 'center',
  justify: 'center',
  fullWidth: true,
  minHeight: '100vh',
  children: [
    heading({
      content: '404',
      level: 1
    }),
    text({
      content: 'Page not found',
      size: 'lg'
    }),
    button({
      label: 'Go Home',
      variant: 'primary'
    })
  ]
});

// Navigation sidebar
const sidebar = stack({
  spacing: 'sm',
  fullWidth: true,
  children: [
    heading({
      content: 'Menu',
      level: 4
    }),
    divider(),
    text({ content: 'Dashboard' }),
    text({ content: 'Products' }),
    text({ content: 'Orders' }),
    text({ content: 'Customers' }),
    divider(),
    text({ content: 'Settings' }),
    text({ content: 'Logout' })
  ]
});

// Blog post layout
const blogPost = stack({
  spacing: 'lg',
  maxWidth: '800px',
  children: [
    heading({
      content: 'Article Title',
      level: 1
    }),
    text({
      content: 'Posted on January 1, 2024',
      color: 'textSecondary',
      size: 'sm'
    }),
    divider({ spacing: 'xl' }),
    text({
      content: 'Paragraph 1 content...'
    }),
    text({
      content: 'Paragraph 2 content...'
    }),
    text({
      content: 'Paragraph 3 content...'
    })
  ]
});
```

## Features

- **Flexbox Layout**: Modern vertical layout system
- **Spacing Control**: Gap between children using design tokens
- **Horizontal Alignment**: Five alignment options for cross-axis
- **Vertical Justification**: Six justification options for main axis
- **Wrapping**: Optional multi-column wrapping
- **Full Width**: Optional container width control
- **Theme Spacing**: All gaps use design token spacing
- **Stretch Default**: Sensible defaults for common use cases
- **Responsive**: Works with any child element types
- **No Wrap Default**: Maintains single column unless specified
