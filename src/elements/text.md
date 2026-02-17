---
name: text
description: A flexible text component with multiple variants, sizes, weights, colors, and text styling options. The fundamental component for displaying text content.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Text Component

The `text` function creates a versatile text element with complete control over typography, styling, and appearance using design tokens.

## Props

```typescript
type TextProps = {
  content?: string;                // Text content
  variant?: 'body' | 'caption' | 'overline' | 'subtitle';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  color?: ColorToken;              // Text color
  italic?: boolean;                // Italic style
  underline?: boolean;             // Underline decoration
  truncate?: boolean;              // Truncate with ellipsis
  children?: HTMLElement[];        // Child elements
};
```

## Example Usage

### Basic Text

```typescript
import { text } from '@/elements/text';

// Simple text
const paragraph = text({
  content: 'This is a paragraph of text.'
});
```

### Variants

```typescript
// Body (default) - normal text
const body = text({
  variant: 'body',
  content: 'Body text for paragraphs and content.'
});

// Caption - smaller text for captions
const caption = text({
  variant: 'caption',
  content: 'Caption or helper text'
});

// Overline - small uppercase text
const overline = text({
  variant: 'overline',
  content: 'OVERLINE TEXT'
});

// Subtitle - larger text for subtitles
const subtitle = text({
  variant: 'subtitle',
  content: 'Subtitle text'
});
```

### Sizes

```typescript
// Extra small
const xsText = text({
  size: 'xs',
  content: 'Extra small text'
});

// Small
const smText = text({
  size: 'sm',
  content: 'Small text'
});

// Medium (default)
const mdText = text({
  size: 'md',
  content: 'Medium text'
});

// Large
const lgText = text({
  size: 'lg',
  content: 'Large text'
});

// Extra large
const xlText = text({
  size: 'xl',
  content: 'Extra large text'
});
```

### Weight

```typescript
// Normal (default)
const normalWeight = text({
  weight: 'normal',
  content: 'Normal weight text'
});

// Medium
const mediumWeight = text({
  weight: 'medium',
  content: 'Medium weight text'
});

// Semibold
const semiboldWeight = text({
  weight: 'semibold',
  content: 'Semibold text'
});

// Bold
const boldWeight = text({
  weight: 'bold',
  content: 'Bold text'
});
```

### Alignment

```typescript
// Left aligned (default)
const leftAligned = text({
  align: 'left',
  content: 'Left aligned text'
});

// Center aligned
const centerAligned = text({
  align: 'center',
  content: 'Center aligned text'
});

// Right aligned
const rightAligned = text({
  align: 'right',
  content: 'Right aligned text'
});

// Justified
const justified = text({
  align: 'justify',
  content: 'Justified text that will be aligned to both left and right edges.'
});
```

### Colors

```typescript
// Primary text color (default)
const primaryText = text({
  content: 'Primary text color'
});

// Secondary text color
const secondaryText = text({
  content: 'Secondary text color',
  color: 'textSecondary'
});

// Custom color
const customText = text({
  content: 'Custom colored text',
  color: 'primary'
});

// Error color
const errorText = text({
  content: 'Error message',
  color: 'error'
});

// Success color
const successText = text({
  content: 'Success message',
  color: 'success'
});
```

### Text Styling

```typescript
// Italic
const italicText = text({
  content: 'Italic text',
  italic: true
});

// Underline
const underlineText = text({
  content: 'Underlined text',
  underline: true
});

// Combined styling
const styledText = text({
  content: 'Bold, italic, underlined',
  weight: 'bold',
  italic: true,
  underline: true
});
```

### Truncation

```typescript
// Truncate long text with ellipsis
const truncatedText = text({
  content: 'This is a very long piece of text that will be truncated with an ellipsis when it exceeds the container width',
  truncate: true
});
```

### With Children

```typescript
import { tag } from '@/elements/_base';

// Mixed content
const mixedText = text({
  children: [
    text({ content: 'Regular text ' }),
    text({ content: 'bold text ', weight: 'bold' }),
    text({ content: 'and ', color: 'textSecondary' }),
    text({ content: 'colored text', color: 'primary' })
  ]
});
```

### Complete Example

```typescript
import { text } from '@/elements/text';
import { stack } from '@/elements/stack';
import { heading } from '@/elements/heading';
import { divider } from '@/elements/divider';

// Article content
const article = stack({
  spacing: 'lg',
  children: [
    heading({
      content: 'Article Title',
      level: 1
    }),

    text({
      content: 'By John Doe • January 1, 2024',
      variant: 'caption',
      color: 'textSecondary'
    }),

    divider({ spacing: 'xl' }),

    text({
      content: 'First paragraph of the article with regular body text. This demonstrates the default text styling and spacing.',
      variant: 'body'
    }),

    text({
      content: 'Second paragraph with more content. Notice the consistent spacing and typography throughout the article.',
      variant: 'body'
    }),

    text({
      content: 'Important note: Pay attention to this highlighted information.',
      weight: 'semibold',
      color: 'warning'
    }),

    text({
      content: 'Final paragraph wrapping up the article content.',
      variant: 'body'
    })
  ]
});

// Status message
const statusMessage = stack({
  spacing: 'xs',
  children: [
    text({
      content: 'Success!',
      weight: 'bold',
      color: 'success',
      size: 'lg'
    }),
    text({
      content: 'Your changes have been saved successfully.',
      color: 'textSecondary'
    })
  ]
});

// Card metadata
const cardMeta = stack({
  spacing: 'xs',
  children: [
    text({
      content: 'CATEGORY',
      variant: 'overline',
      color: 'textSecondary'
    }),
    text({
      content: 'Technology',
      weight: 'medium',
      size: 'lg'
    }),
    text({
      content: 'Updated 2 hours ago',
      variant: 'caption',
      color: 'textSecondary'
    })
  ]
});

// Truncated list items
const listItem = text({
  content: 'This is a very long list item name that will be truncated when the container is too narrow to display the full text',
  truncate: true,
  color: 'textPrimary'
});

// Formatted text with emphasis
const formattedText = text({
  children: [
    text({ content: 'You have ' }),
    text({
      content: '3 unread messages',
      weight: 'bold',
      color: 'primary'
    }),
    text({ content: ' in your inbox.' })
  ]
});
```

## Features

- **Four Variants**: Body, caption, overline, and subtitle styles
- **Five Sizes**: Extra small to extra large
- **Four Weights**: Normal, medium, semibold, and bold
- **Four Alignments**: Left, center, right, and justify
- **Theme Colors**: Any design token color
- **Text Styling**: Italic and underline support
- **Truncation**: Ellipsis for overflowing text
- **Children Support**: Compose multiple text elements
- **Size Override**: Size prop overrides variant font size
- **Responsive**: Font sizes work across screen sizes
- **Span Element**: Inline element for flexible composition
