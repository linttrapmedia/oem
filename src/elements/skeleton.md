---
name: skeleton
description: A loading placeholder component that displays a pulsing skeleton while content loads. Supports text, circle, and rectangle variants with animation.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Skeleton Component

The `skeleton` function creates an animated loading placeholder element that mimics the shape of content being loaded for better perceived performance.

## Props

```typescript
type SkeletonProps = {
  variant?: 'text' | 'circle' | 'rectangle';
  width?: string;                  // CSS width value
  height?: string;                 // CSS height value
  bg?: ColorToken;                 // Background color
  borderRadius?: BorderRadiusToken;
  animated?: boolean;              // Pulse animation
};
```

## Example Usage

### Basic Skeleton

```typescript
import { skeleton } from '@/elements/skeleton';

// Simple text skeleton
const textSkeleton = skeleton({
  variant: 'text'
});
```

### Variants

```typescript
// Text skeleton (default) - for single lines
const textLine = skeleton({
  variant: 'text',
  width: '100%'
});

// Circle skeleton - for avatars, icons
const circleSkeleton = skeleton({
  variant: 'circle',
  width: '48px'
});

// Rectangle skeleton - for images, cards
const rectangleSkeleton = skeleton({
  variant: 'rectangle',
  width: '200px',
  height: '150px'
});
```

### Dimensions

```typescript
// Text with custom width
const customWidth = skeleton({
  variant: 'text',
  width: '60%'
});

// Circle with size
const avatar = skeleton({
  variant: 'circle',
  width: '64px'
});

// Rectangle with dimensions
const card = skeleton({
  variant: 'rectangle',
  width: '300px',
  height: '200px'
});
```

### Background Color

```typescript
// Default background
const defaultBg = skeleton({
  variant: 'text'
});

// Custom background color
const customBg = skeleton({
  variant: 'rectangle',
  width: '200px',
  height: '100px',
  bg: 'bgTertiary'
});
```

### Border Radius

```typescript
// Text with custom radius
const roundedText = skeleton({
  variant: 'text',
  borderRadius: 'borderRadiusLg'
});

// Rectangle with custom radius
const roundedRect = skeleton({
  variant: 'rectangle',
  width: '200px',
  height: '150px',
  borderRadius: 'borderRadiusXl'
});
```

### Animation

```typescript
// Animated (default)
const animated = skeleton({
  variant: 'text',
  animated: true
});

// Static (no animation)
const static = skeleton({
  variant: 'text',
  animated: false
});
```

### Complete Example

```typescript
import { skeleton } from '@/elements/skeleton';
import { stack } from '@/elements/stack';
import { row } from '@/elements/row';
import { box } from '@/elements/box';

// User card skeleton
const userCardSkeleton = box({
  bg: 'bgPrimary',
  border: 'borderPrimary',
  borderRadius: 'borderRadiusMd',
  padding: 'lg',
  children: [
    row({
      spacing: 'md',
      align: 'center',
      children: [
        // Avatar
        skeleton({
          variant: 'circle',
          width: '48px'
        }),

        // User info
        stack({
          spacing: 'xs',
          children: [
            skeleton({
              variant: 'text',
              width: '120px'
            }),
            skeleton({
              variant: 'text',
              width: '80px'
            })
          ]
        })
      ]
    })
  ]
});

// Article skeleton
const articleSkeleton = stack({
  spacing: 'lg',
  children: [
    // Featured image
    skeleton({
      variant: 'rectangle',
      width: '100%',
      height: '300px'
    }),

    // Title
    stack({
      spacing: 'sm',
      children: [
        skeleton({
          variant: 'text',
          width: '90%'
        }),
        skeleton({
          variant: 'text',
          width: '70%'
        })
      ]
    }),

    // Meta info
    row({
      spacing: 'md',
      children: [
        skeleton({
          variant: 'circle',
          width: '32px'
        }),
        skeleton({
          variant: 'text',
          width: '100px'
        }),
        skeleton({
          variant: 'text',
          width: '80px'
        })
      ]
    }),

    // Content
    stack({
      spacing: 'sm',
      children: Array.from({ length: 5 }, () =>
        skeleton({
          variant: 'text',
          width: Math.random() > 0.5 ? '100%' : `${60 + Math.random() * 30}%`
        })
      )
    })
  ]
});

// List item skeletons
const listSkeletons = stack({
  spacing: 'md',
  children: Array.from({ length: 5 }, () =>
    row({
      spacing: 'md',
      align: 'center',
      children: [
        skeleton({
          variant: 'rectangle',
          width: '60px',
          height: '60px'
        }),
        stack({
          spacing: 'xs',
          children: [
            skeleton({
              variant: 'text',
              width: '200px'
            }),
            skeleton({
              variant: 'text',
              width: '150px'
            })
          ]
        })
      ]
    })
  )
});

// Loading state with conditional rendering
import { $signal } from '@/core/signal';

const isLoading = $signal(true);
const data = $signal(null);

// Simulate data loading
setTimeout(() => {
  data.set({ /* actual data */ });
  isLoading.set(false);
}, 2000);

const content = stack({
  spacing: 'md',
  children: [
    isLoading.value
      ? skeleton({ variant: 'text', width: '100%' })
      : text({ content: data.value?.title })
  ]
});
```

## Features

- **Three Variants**: Text lines, circles, and rectangles
- **Pulse Animation**: Smooth opacity animation by default
- **Customizable Size**: Any CSS width and height
- **Theme Colors**: Background from design tokens
- **Border Radius**: Custom or variant-specific rounding
- **Animation Control**: Enable or disable pulse effect
- **Loading States**: Perfect for content placeholders
- **Responsive**: Works with percentage widths
- **Performance**: CSS-only animation
- **Accessibility**: Indicates loading state visually
