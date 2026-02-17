---
name: badge
description: A compact badge component for status indicators, labels, and tags. Supports multiple variants, colors, sizes, and pill shape.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Badge Component

The `badge` function creates a versatile badge element perfect for displaying status, categories, counts, or labels with multiple visual styles and theming support.

## Props

```typescript
type BadgeProps = {
  content: string;                 // Badge text (required)
  variant?: 'solid' | 'subtle' | 'outline';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;                  // Fully rounded corners
  children?: HTMLElement[];        // Icons or other elements
};
```

## Example Usage

### Basic Badge

```typescript
import { badge } from '@/elements/badge';

// Simple badge
const statusBadge = badge({
  content: 'Active'
});
```

### Variants

```typescript
// Solid variant (default)
const solidBadge = badge({
  content: 'Solid',
  variant: 'solid',
  color: 'primary'
});

// Subtle variant (lighter background)
const subtleBadge = badge({
  content: 'Subtle',
  variant: 'subtle',
  color: 'primary'
});

// Outline variant (border only)
const outlineBadge = badge({
  content: 'Outline',
  variant: 'outline',
  color: 'primary'
});
```

### Colors

```typescript
// Primary
const primaryBadge = badge({
  content: 'Primary',
  color: 'primary'
});

// Secondary
const secondaryBadge = badge({
  content: 'Secondary',
  color: 'secondary'
});

// Success
const successBadge = badge({
  content: 'Success',
  color: 'success'
});

// Error
const errorBadge = badge({
  content: 'Error',
  color: 'error'
});

// Warning
const warningBadge = badge({
  content: 'Warning',
  color: 'warning'
});

// Info
const infoBadge = badge({
  content: 'Info',
  color: 'info'
});

// Neutral
const neutralBadge = badge({
  content: 'Neutral',
  color: 'neutral'
});
```

### Sizes

```typescript
// Small
const smallBadge = badge({
  content: 'Small',
  size: 'sm'
});

// Medium (default)
const mediumBadge = badge({
  content: 'Medium',
  size: 'md'
});

// Large
const largeBadge = badge({
  content: 'Large',
  size: 'lg'
});
```

### Pill Shape

```typescript
// Fully rounded pill shape
const pillBadge = badge({
  content: 'Pill',
  pill: true
});

// Regular rounded corners (default)
const regularBadge = badge({
  content: 'Regular',
  pill: false
});
```

### With Children

```typescript
import { tag } from '@/elements/_base';

// Badge with icon
const iconBadge = badge({
  content: 'New',
  color: 'success',
  children: [
    tag.span({ textContent: '✨' })
  ]
});
```

### Complete Example

```typescript
import { badge } from '@/elements/badge';
import { row } from '@/elements/row';
import { $signal } from '@/core/signal';

// Status indicator with reactive count
const notificationCount = $signal(5);

const statusBar = row({
  spacing: 'sm',
  align: 'center',
  children: [
    badge({
      content: 'Online',
      variant: 'solid',
      color: 'success',
      size: 'sm',
      pill: true
    }),
    badge({
      content: () => `${notificationCount.value} new`,
      variant: 'subtle',
      color: 'primary',
      size: 'md'
    }),
    badge({
      content: 'Beta',
      variant: 'outline',
      color: 'warning',
      size: 'sm'
    })
  ]
});

// Category tags
const categoryTags = row({
  spacing: 'xs',
  wrap: true,
  children: ['JavaScript', 'React', 'TypeScript'].map(category =>
    badge({
      content: category,
      variant: 'subtle',
      color: 'neutral',
      size: 'sm',
      pill: true
    })
  )
});
```

## Features

- **Three Variants**: Solid, subtle, and outline styles for different contexts
- **Seven Colors**: Primary, secondary, success, error, warning, info, and neutral
- **Three Sizes**: Small, medium, and large options
- **Pill Shape**: Optional fully rounded corners for pill-style badges
- **Theming**: Full integration with design tokens
- **Compact Design**: Space-efficient with appropriate padding
- **Children Support**: Add icons or other elements inside badges
- **No Wrap**: Text stays on one line with proper spacing
- **Semantic Colors**: Color variants match common status indicators
