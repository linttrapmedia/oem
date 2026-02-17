---
name: heading
description: A semantic heading component for hierarchical page structure. Supports six levels with automatic sizing, custom colors, and text alignment.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Heading Component

The `heading` function creates semantic HTML heading elements (h1-h6) with automatic typography scaling, theming support, and flexible styling options.

## Props

```typescript
type HeadingProps = {
  content?: string;                // Heading text
  level?: 1 | 2 | 3 | 4 | 5 | 6;   // Heading level (h1-h6)
  color?: ColorToken;              // Text color
  align?: 'left' | 'center' | 'right';  // Text alignment
  children?: HTMLElement[];        // Child elements
};
```

## Example Usage

### Basic Heading

```typescript
import { heading } from '@/elements/heading';

// Simple h1 heading
const title = heading({
  content: 'Page Title',
  level: 1
});
```

### Heading Levels

```typescript
// H1 (largest - 4xl font, bold)
const h1 = heading({
  content: 'Main Title',
  level: 1
});

// H2 (3xl font, bold)
const h2 = heading({
  content: 'Section Title',
  level: 2
});

// H3 (2xl font, semibold)
const h3 = heading({
  content: 'Subsection Title',
  level: 3
});

// H4 (xl font, semibold)
const h4 = heading({
  content: 'Minor Heading',
  level: 4
});

// H5 (lg font, medium)
const h5 = heading({
  content: 'Small Heading',
  level: 5
});

// H6 (base font, medium)
const h6 = heading({
  content: 'Smallest Heading',
  level: 6
});
```

### Colors

```typescript
// Primary text color (default)
const defaultHeading = heading({
  content: 'Default Color',
  level: 2
});

// Secondary text color
const secondaryHeading = heading({
  content: 'Secondary Color',
  level: 2,
  color: 'textSecondary'
});

// Custom color
const customHeading = heading({
  content: 'Custom Color',
  level: 2,
  color: 'primary'
});

// Error color
const errorHeading = heading({
  content: 'Error State',
  level: 3,
  color: 'error'
});
```

### Text Alignment

```typescript
// Left aligned (default)
const leftHeading = heading({
  content: 'Left Aligned',
  level: 2,
  align: 'left'
});

// Center aligned
const centerHeading = heading({
  content: 'Center Aligned',
  level: 2,
  align: 'center'
});

// Right aligned
const rightHeading = heading({
  content: 'Right Aligned',
  level: 2,
  align: 'right'
});
```

### With Children

```typescript
import { tag } from '@/elements/_base';

// Heading with icon
const iconHeading = heading({
  level: 2,
  children: [
    tag.span({ textContent: '🎉 ' }),
    tag.span({ textContent: 'Celebration Title' })
  ]
});

// Heading with mixed content
const mixedHeading = heading({
  content: 'Title with ',
  level: 3,
  children: [
    tag.span({
      textContent: 'emphasis',
      style: { fontStyle: 'italic' }
    })
  ]
});
```

### Complete Example

```typescript
import { heading } from '@/elements/heading';
import { stack } from '@/elements/stack';
import { text } from '@/elements/text';
import { divider } from '@/elements/divider';

// Document structure with proper heading hierarchy
const article = stack({
  spacing: 'lg',
  children: [
    heading({
      content: 'Article Title',
      level: 1,
      align: 'center'
    }),

    text({
      content: 'Introduction paragraph...',
      align: 'center'
    }),

    divider({ spacing: 'xl' }),

    heading({
      content: 'First Section',
      level: 2,
      color: 'primary'
    }),

    text({
      content: 'Section content...'
    }),

    heading({
      content: 'Subsection',
      level: 3
    }),

    text({
      content: 'Subsection content...'
    }),

    heading({
      content: 'Second Section',
      level: 2,
      color: 'primary'
    }),

    text({
      content: 'More content...'
    })
  ]
});

// Hero section
const hero = stack({
  spacing: 'md',
  align: 'center',
  children: [
    heading({
      content: 'Welcome to Our Platform',
      level: 1,
      align: 'center',
      color: 'primary'
    }),
    heading({
      content: 'Build amazing things with ease',
      level: 3,
      align: 'center',
      color: 'textSecondary'
    })
  ]
});
```

## Features

- **Semantic HTML**: Uses proper h1-h6 elements for accessibility
- **Automatic Sizing**: Font size scales appropriately per level
- **Weight Hierarchy**: Bold for h1-h2, semibold for h3-h4, medium for h5-h6
- **Theme Integration**: Uses design token typography and colors
- **Text Alignment**: Left, center, or right alignment
- **Color Control**: Any design token color
- **Tight Line Height**: Optimized for headings
- **Zero Margin**: No default margins for layout flexibility
- **Children Support**: Add icons, emphasis, or mixed content
- **Responsive Typography**: Font sizes work across screen sizes
