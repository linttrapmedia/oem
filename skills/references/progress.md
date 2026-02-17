---
name: progress
description: A visual progress indicator component with customizable colors, sizes, variants, and optional label. Supports striped and animated styles.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Progress Component

The `progress` function creates a progress bar element for visualizing completion percentage with multiple visual styles and optional animation.

## Props

```typescript
type ProgressProps = {
  value: number;                   // Current value (required)
  max?: number;                    // Maximum value (default: 100)
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'striped';
  color?: ColorToken;              // Progress bar color
  bg?: ColorToken;                 // Track background color
  showLabel?: boolean;             // Show percentage label
  animated?: boolean;              // Animate striped variant
};
```

## Example Usage

### Basic Progress

```typescript
import { progress } from '@/elements/progress';

// Simple progress bar
const progressBar = progress({
  value: 60
});
```

### Value and Max

```typescript
// Percentage (default max is 100)
const percentage = progress({
  value: 75,
  max: 100
});

// Custom max value
const customMax = progress({
  value: 30,
  max: 50
});
// Shows 60% (30/50)
```

### Sizes

```typescript
// Small (4px height)
const smallProgress = progress({
  value: 50,
  size: 'sm'
});

// Medium (8px height - default)
const mediumProgress = progress({
  value: 50,
  size: 'md'
});

// Large (12px height)
const largeProgress = progress({
  value: 50,
  size: 'lg'
});
```

### Variants

```typescript
// Default - solid bar
const defaultProgress = progress({
  value: 60,
  variant: 'default'
});

// Striped - diagonal stripes
const stripedProgress = progress({
  value: 60,
  variant: 'striped'
});
```

### Colors

```typescript
// Primary color (default)
const primaryProgress = progress({
  value: 70,
  color: 'primary'
});

// Success color
const successProgress = progress({
  value: 100,
  color: 'success'
});

// Warning color
const warningProgress = progress({
  value: 45,
  color: 'warning'
});

// Error color
const errorProgress = progress({
  value: 20,
  color: 'error'
});

// Custom background
const customBgProgress = progress({
  value: 60,
  color: 'primary',
  bg: 'bgTertiary'
});
```

### With Label

```typescript
// Show percentage label
const labeledProgress = progress({
  value: 75,
  showLabel: true
});

// Without label (default)
const noLabelProgress = progress({
  value: 75,
  showLabel: false
});
```

### Animated

```typescript
// Animated striped progress
const animatedProgress = progress({
  value: 60,
  variant: 'striped',
  animated: true
});

// Static striped progress
const staticProgress = progress({
  value: 60,
  variant: 'striped',
  animated: false
});
```

### Complete Example

```typescript
import { progress } from '@/elements/progress';
import { stack } from '@/elements/stack';
import { text } from '@/elements/text';
import { row } from '@/elements/row';
import { $signal } from '@/core/signal';

// Upload progress indicator
const uploadProgress = $signal(0);

// Simulate upload
setInterval(() => {
  uploadProgress.update(p => Math.min(p + 10, 100));
}, 500);

const uploadIndicator = stack({
  spacing: 'sm',
  children: [
    row({
      justify: 'space-between',
      children: [
        text({ content: 'Uploading file...' }),
        text({ content: () => `${uploadProgress.value}%` })
      ]
    }),
    progress({
      value: () => uploadProgress.value,
      max: 100,
      size: 'md',
      variant: 'striped',
      animated: true,
      color: 'primary'
    })
  ]
});

// Multi-step progress
const currentStep = $signal(2);
const totalSteps = 4;

const stepProgress = stack({
  spacing: 'md',
  children: [
    text({
      content: () => `Step ${currentStep.value} of ${totalSteps}`
    }),
    progress({
      value: () => currentStep.value,
      max: totalSteps,
      size: 'lg',
      showLabel: true,
      color: 'success'
    })
  ]
});

// Status indicators
const taskStatuses = $signal([
  { name: 'Design', progress: 100, color: 'success' },
  { name: 'Development', progress: 60, color: 'primary' },
  { name: 'Testing', progress: 30, color: 'warning' },
  { name: 'Deployment', progress: 0, color: 'error' }
]);

const statusDashboard = stack({
  spacing: 'lg',
  children: taskStatuses.value.map(task =>
    stack({
      spacing: 'xs',
      children: [
        row({
          justify: 'space-between',
          children: [
            text({ content: task.name }),
            text({ content: `${task.progress}%` })
          ]
        }),
        progress({
          value: task.progress,
          size: 'sm',
          color: task.color as any
        })
      ]
    })
  )
});
```

## Features

- **Percentage Display**: Automatic percentage calculation from value/max
- **Three Sizes**: Small (4px), medium (8px), large (12px)
- **Two Variants**: Solid and striped styles
- **Theme Colors**: Full design token color support
- **Optional Label**: Centered percentage overlay
- **Animation**: Animated striped bars for loading states
- **Custom Max**: Use any maximum value, not just 100
- **Smooth Transitions**: Width animates smoothly
- **Fully Rounded**: Pill-shaped track and bar
- **Responsive**: Full width by default
- **Accessible**: Proper markup for progress indication
