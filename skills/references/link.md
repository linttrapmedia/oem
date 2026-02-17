---
name: link
description: A styled anchor link component with multiple variants, hover effects, and external link support. Supports disabled state and custom colors.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Link Component

The `link` function creates a styled anchor element with visual variants, underline control, external link support, and comprehensive theming.

## Props

```typescript
type LinkProps = {
  href: string;                    // Link URL (required)
  content?: string;                // Link text
  variant?: 'default' | 'subtle' | 'unstyled';
  color?: ColorToken;              // Link color
  underline?: boolean;             // Show underline
  external?: boolean;              // External link (opens in new tab)
  disabled?: boolean;              // Disabled state
  onClick?: (e: Event) => void;    // Click handler
  children?: HTMLElement[];        // Child elements
};
```

## Example Usage

### Basic Link

```typescript
import { link } from '@/elements/link';

// Simple link
const homeLink = link({
  href: '/',
  content: 'Home'
});
```

### Variants

```typescript
// Default - primary color, underlined
const defaultLink = link({
  href: '/page',
  content: 'Default Link',
  variant: 'default'
});

// Subtle - secondary color
const subtleLink = link({
  href: '/page',
  content: 'Subtle Link',
  variant: 'subtle'
});

// Unstyled - inherits text color, no underline
const unstyledLink = link({
  href: '/page',
  content: 'Unstyled Link',
  variant: 'unstyled'
});
```

### Colors

```typescript
// Primary color (default)
const primaryLink = link({
  href: '/page',
  content: 'Primary Link'
});

// Custom color
const customLink = link({
  href: '/page',
  content: 'Custom Color',
  color: 'success'
});

// Error color
const errorLink = link({
  href: '/delete',
  content: 'Delete',
  color: 'error'
});
```

### Underline

```typescript
// With underline (default)
const underlinedLink = link({
  href: '/page',
  content: 'Underlined',
  underline: true
});

// Without underline
const noUnderlineLink = link({
  href: '/page',
  content: 'No Underline',
  underline: false
});
```

### External Links

```typescript
// External link (opens in new tab)
const externalLink = link({
  href: 'https://example.com',
  content: 'Visit Example.com',
  external: true
});
// Automatically adds target="_blank" and rel="noopener noreferrer"

// Internal link
const internalLink = link({
  href: '/about',
  content: 'About Us',
  external: false
});
```

### Disabled State

```typescript
// Disabled link
const disabledLink = link({
  href: '/page',
  content: 'Disabled Link',
  disabled: true
});
```

### With Click Handler

```typescript
// Link with custom click handler
const trackedLink = link({
  href: '/page',
  content: 'Track Click',
  onClick: (e) => {
    console.log('Link clicked!');
    // Track analytics, etc.
  }
});

// Prevent default navigation
const customLink = link({
  href: '#',
  content: 'Custom Action',
  onClick: (e) => {
    e.preventDefault();
    console.log('Custom action without navigation');
  }
});
```

### With Children

```typescript
import { tag } from '@/elements/_base';

// Link with icon
const iconLink = link({
  href: 'https://github.com',
  external: true,
  children: [
    tag.span({ textContent: 'GitHub ' }),
    tag.span({ textContent: '→' })
  ]
});
```

### Complete Example

```typescript
import { link } from '@/elements/link';
import { row } from '@/elements/row';
import { stack } from '@/elements/stack';
import { heading } from '@/elements/heading';
import { text } from '@/elements/text';

// Navigation menu
const navigation = row({
  spacing: 'lg',
  children: [
    link({
      href: '/',
      content: 'Home',
      variant: 'default'
    }),
    link({
      href: '/about',
      content: 'About',
      variant: 'default'
    }),
    link({
      href: '/services',
      content: 'Services',
      variant: 'default'
    }),
    link({
      href: '/contact',
      content: 'Contact',
      variant: 'default'
    })
  ]
});

// Footer links
const footer = stack({
  spacing: 'md',
  children: [
    heading({
      content: 'Resources',
      level: 4
    }),
    stack({
      spacing: 'sm',
      children: [
        link({
          href: '/docs',
          content: 'Documentation',
          variant: 'subtle'
        }),
        link({
          href: 'https://github.com/example',
          content: 'GitHub',
          variant: 'subtle',
          external: true
        }),
        link({
          href: '/api',
          content: 'API Reference',
          variant: 'subtle'
        })
      ]
    })
  ]
});

// Inline text link
const paragraph = text({
  children: [
    text({ content: 'Read more about our ' }),
    link({
      href: '/privacy',
      content: 'privacy policy',
      underline: true
    }),
    text({ content: ' and ' }),
    link({
      href: '/terms',
      content: 'terms of service',
      underline: true
    }),
    text({ content: '.' })
  ]
});

// Breadcrumb navigation
const breadcrumb = row({
  spacing: 'xs',
  children: [
    link({
      href: '/',
      content: 'Home',
      variant: 'subtle'
    }),
    text({ content: ' / ' }),
    link({
      href: '/products',
      content: 'Products',
      variant: 'subtle'
    }),
    text({ content: ' / ' }),
    text({
      content: 'Product Name',
      color: 'textPrimary'
    })
  ]
});
```

## Features

- **Three Variants**: Default (primary), subtle (secondary), and unstyled
- **Custom Colors**: Any design token color
- **Underline Control**: Toggle underline decoration
- **External Links**: Automatic target and rel attributes for security
- **Disabled State**: Visual feedback and pointer-events blocking
- **Hover Effects**: Smooth color and underline transitions
- **Focus State**: Visible focus outline for accessibility
- **Click Handler**: Optional onClick callback
- **Theme Integration**: Full design token support
- **Inherits Size**: Font size from parent context
- **Children Support**: Add icons or mixed content
