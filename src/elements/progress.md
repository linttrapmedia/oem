---
name: progress
description: A composable progress bar element using the trait-based pattern. Supports multiple variants, sizes, animated states, and optional percentage labels with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Progress Element

The `progress` element provides a composable, trait-based approach to creating progress bar elements with built-in theming support, multiple variants, and customizable visual states.

## API

The progress element exports an object with the following methods:

```typescript
export const progress = {
  create: (...children: Child[]) => HTMLDivElement;
  value: (value: number, max?: number) => Applier;
  size: (size: Size) => Applier;
  variant: (variant: Variant) => Applier;
  color: (color: ColorToken) => Applier;
  bg: (bg: ColorToken) => Applier;
  animated: (animated: boolean) => Applier;
  showLabel: (show: boolean, value?: number, max?: number) => Applier;
};
```

### Types

```typescript
type Variant = 'default' | 'striped';
type Size = 'sm' | 'md' | 'lg';
type ColorToken = string; // Theme color token
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Progress

```typescript
import { progress } from '@/elements/progress';

// Create a simple progress bar at 60%
const progressBar = progress.create(
  progress.value(60),
);
```

### Complete Progress

```typescript
// Create a fully configured progress bar
const progressBar = progress.create(
  progress.value(75, 100),
  progress.size('md'),
  progress.variant('striped'),
  progress.color('primary'),
  progress.animated(true),
  progress.showLabel(true, 75, 100),
);

document.body.appendChild(progressBar);
```

## Value and Max

The `progress.value()` applier sets the progress percentage:

```typescript
// Simple percentage (defaults to max of 100)
const simpleProgress = progress.create(progress.value(60));

// Custom max value (shows 60% calculated as 30/50)
const customProgress = progress.create(progress.value(30, 50));

// Full completion
const completedProgress = progress.create(
  progress.value(100),
  progress.color('success'),
);
```

## Variants

The `progress.variant()` applier applies visual styles:

```typescript
// Default variant - solid bar (default)
const defaultProgress = progress.create(
  progress.variant('default'),
  progress.value(60),
);

// Striped variant - diagonal stripes
const stripedProgress = progress.create(
  progress.variant('striped'),
  progress.value(60),
);
```

### Variant Features

Each variant includes:

- Base styling appropriate to the variant type
- Smooth width transitions
- Automatic theme reactivity (updates when theme changes)
- Optional animation support (striped variant)

## Sizes

The `progress.size()` applier controls bar height:

```typescript
// Small progress bar (4px height)
const smallProgress = progress.create(
  progress.size('sm'),
  progress.value(50),
);

// Medium progress bar (8px height - default)
const mediumProgress = progress.create(
  progress.size('md'),
  progress.value(50),
);

// Large progress bar (12px height)
const largeProgress = progress.create(
  progress.size('lg'),
  progress.value(50),
);
```

## Colors

### Bar Color

The `progress.color()` applier sets the progress bar color:

```typescript
// Primary color (default)
const primaryProgress = progress.create(
  progress.value(70),
  progress.color('primary'),
);

// Success color for completed state
const successProgress = progress.create(
  progress.value(100),
  progress.color('success'),
);

// Warning color for medium progress
const warningProgress = progress.create(
  progress.value(45),
  progress.color('warning'),
);

// Error color for low progress
const errorProgress = progress.create(
  progress.value(20),
  progress.color('error'),
);
```

### Track Background Color

The `progress.bg()` applier sets the track background color:

```typescript
// Custom track background
const customBgProgress = progress.create(
  progress.value(60),
  progress.color('primary'),
  progress.bg('bgTertiary'),
);
```

## Animation

The `progress.animated()` applier enables animation for striped variant:

```typescript
// Animated striped progress
const animatedProgress = progress.create(
  progress.variant('striped'),
  progress.value(60),
  progress.animated(true),
);

// Static striped progress
const staticProgress = progress.create(
  progress.variant('striped'),
  progress.value(60),
  progress.animated(false),
);
```

## Label Display

The `progress.showLabel()` applier displays percentage label:

```typescript
// Show percentage label
const labeledProgress = progress.create(
  progress.value(75),
  progress.showLabel(true, 75, 100),
);

// Without label (default)
const unlabeledProgress = progress.create(
  progress.value(75),
  progress.showLabel(false),
);
```

## Advanced Examples

### Reactive Progress with State

```typescript
import { progress } from '@/elements/progress';
import { $state } from '@/core/state';

const uploadProgress = $state(0);

// Simulate upload
setInterval(() => {
  uploadProgress.set(Math.min(uploadProgress.get() + 10, 100));
}, 500);

const uploadBar = progress.create(
  progress.value(uploadProgress.get()),
  progress.variant('striped'),
  progress.animated(true),
  progress.color('primary'),
  progress.showLabel(true, uploadProgress.get(), 100),
);
```

### Multi-Step Progress

```typescript
const currentStep = $state(2);
const totalSteps = 4;

const stepProgress = progress.create(
  progress.value(currentStep.get(), totalSteps),
  progress.size('lg'),
  progress.color('success'),
  progress.showLabel(true, currentStep.get(), totalSteps),
);
```

### Conditional Styling

```typescript
import { tag } from '@/elements/_base';

const taskProgress = $state(60);

// Change color based on progress value
const getProgressColor = (value: number) => {
  if (value < 30) return 'error';
  if (value < 70) return 'warning';
  return 'success';
};

const conditionalProgress = progress.create(
  progress.value(taskProgress.get()),
  progress.color(getProgressColor(taskProgress.get())),
  progress.variant('striped'),
  progress.animated(taskProgress.get() < 100),
);
```

### Progress Dashboard

```typescript
import { tag } from '@/elements/_base';

const tasks = [
  { name: 'Design', progress: 100, color: 'success' },
  { name: 'Development', progress: 60, color: 'primary' },
  { name: 'Testing', progress: 30, color: 'warning' },
  { name: 'Deployment', progress: 0, color: 'error' },
];

const dashboard = tag.div(
  ...tasks.map(task =>
    tag.div(
      tag.div(
        tag.span(`${task.name}: ${task.progress}%`),
      ),
      progress.create(
        progress.value(task.progress),
        progress.size('sm'),
        progress.color(task.color as ColorToken),
      ),
    ),
  ),
);
```

## Trait-Based Pattern

The progress element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`value`, `size`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how progress.value() works internally
value: (value: number, max: number = 100) => (el: HTMLElement | SVGElement) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const bar = el.querySelector('.progress-bar') as HTMLElement;

  tag.$(bar)(
    trait.style('width', `${percentage}%`),
    trait.style('transition', 'width 0.3s ease'),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up progress bar styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **2 variants**: Default and striped styles
- ✅ **3 sizes**: Small, medium, large
- ✅ **Custom colors**: Bar and track color customization
- ✅ **Animated stripes**: Optional animation for striped variant
- ✅ **Percentage label**: Optional centered label display
- ✅ **Smooth transitions**: Width changes animate smoothly
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM

## Migration from v2.0

If you're migrating from the props-based API:

**Old (v2.0):**

```typescript
progress({
  value: 60,
  max: 100,
  size: 'md',
  variant: 'striped',
  color: 'primary',
  animated: true,
  showLabel: true,
});
```

**New (v3.0):**

```typescript
progress.create(
  progress.value(60, 100),
  progress.size('md'),
  progress.variant('striped'),
  progress.color('primary'),
  progress.animated(true),
  progress.showLabel(true, 60, 100),
);
```
