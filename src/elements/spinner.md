---
name: spinner
description: An animated loading spinner component for indicating loading states. Supports multiple sizes, colors, speeds, and accessibility labels.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Spinner Component

The `spinner` function creates an animated circular loading indicator with customizable size, color, thickness, and rotation speed.

## Props

```typescript
type SpinnerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: ColorToken;              // Spinner color
  thickness?: string;              // Border thickness
  speed?: string;                  // Animation duration
  label?: string;                  // Accessibility label
};
```

## Example Usage

### Basic Spinner

```typescript
import { spinner } from '@/elements/spinner';

// Simple spinner
const loader = spinner({});
```

### Sizes

```typescript
// Extra small (16px)
const xsSpinner = spinner({
  size: 'xs'
});

// Small (24px)
const smSpinner = spinner({
  size: 'sm'
});

// Medium (32px - default)
const mdSpinner = spinner({
  size: 'md'
});

// Large (48px)
const lgSpinner = spinner({
  size: 'lg'
});

// Extra large (64px)
const xlSpinner = spinner({
  size: 'xl'
});
```

### Colors

```typescript
// Primary color (default)
const primarySpinner = spinner({
  color: 'primary'
});

// Secondary color
const secondarySpinner = spinner({
  color: 'secondary'
});

// Success color
const successSpinner = spinner({
  color: 'success'
});

// Error color
const errorSpinner = spinner({
  color: 'error'
});

// Custom color
const customSpinner = spinner({
  color: 'info'
});
```

### Thickness

```typescript
// Thin border
const thinSpinner = spinner({
  thickness: '2px'
});

// Default thickness (3px)
const defaultSpinner = spinner({
  thickness: '3px'
});

// Thick border
const thickSpinner = spinner({
  thickness: '5px'
});
```

### Speed

```typescript
// Fast rotation (0.5s)
const fastSpinner = spinner({
  speed: '0.5s'
});

// Default speed (0.8s)
const normalSpinner = spinner({
  speed: '0.8s'
});

// Slow rotation (1.5s)
const slowSpinner = spinner({
  speed: '1.5s'
});
```

### Accessibility

```typescript
// Custom accessibility label
const labeledSpinner = spinner({
  label: 'Loading user data'
});

// Default label
const defaultLabelSpinner = spinner({
  label: 'Loading'
});
```

### Complete Example

```typescript
import { spinner } from '@/elements/spinner';
import { box } from '@/elements/box';
import { stack } from '@/elements/stack';
import { text } from '@/elements/text';
import { button } from '@/elements/button';
import { $signal } from '@/core/signal';

// Loading overlay
const isLoading = $signal(false);

const loadingOverlay = box({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  bg: 'rgba(0, 0, 0, 0.5)',
  display: () => isLoading.value ? 'flex' : 'none',
  alignItems: 'center',
  justifyContent: 'center',
  children: [
    spinner({
      size: 'xl',
      color: 'textInverse'
    })
  ]
});

// Button with loading state
const submitButton = button({
  label: () => isLoading.value ? '' : 'Submit',
  disabled: () => isLoading.value,
  children: isLoading.value ? [
    spinner({
      size: 'sm',
      color: 'textInverse'
    })
  ] : [],
  onClick: async () => {
    isLoading.set(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    isLoading.set(false);
  }
});

// Loading message
const loadingMessage = stack({
  spacing: 'md',
  align: 'center',
  children: [
    spinner({
      size: 'lg',
      color: 'primary'
    }),
    text({
      content: 'Loading your data...',
      align: 'center'
    })
  ]
});

// Inline spinner
const inlineLoader = text({
  children: [
    text({ content: 'Loading ' }),
    spinner({
      size: 'xs',
      color: 'primary'
    })
  ]
});

// Card with loading state
const dataCard = box({
  bg: 'bgPrimary',
  border: 'borderPrimary',
  borderRadius: 'borderRadiusMd',
  padding: 'xl',
  minHeight: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  children: isLoading.value
    ? [
        stack({
          spacing: 'md',
          align: 'center',
          children: [
            spinner({ size: 'lg' }),
            text({
              content: 'Fetching latest data...',
              color: 'textSecondary'
            })
          ]
        })
      ]
    : [
        // Actual content when loaded
        text({ content: 'Data loaded successfully!' })
      ]
});

// Multiple loading states
const dashboard = stack({
  spacing: 'lg',
  children: [
    // Section 1 loading
    box({
      padding: 'lg',
      children: [
        spinner({ size: 'md', color: 'primary' })
      ]
    }),

    // Section 2 loading
    box({
      padding: 'lg',
      children: [
        spinner({ size: 'md', color: 'secondary' })
      ]
    }),

    // Section 3 loading
    box({
      padding: 'lg',
      children: [
        spinner({ size: 'md', color: 'success' })
      ]
    })
  ]
});
```

## Features

- **Five Sizes**: From extra small (16px) to extra large (64px)
- **Theme Colors**: Any design token color
- **Customizable Thickness**: Border width control
- **Speed Control**: Adjust rotation animation speed
- **Smooth Animation**: CSS keyframe animation
- **Accessibility**: ARIA role and label support
- **Inline Display**: Works inline or as block element
- **Performance**: Hardware-accelerated CSS animation
- **Global Keyframes**: Animation defined once in document
- **Color Contrast**: Spinner contrasts against background
