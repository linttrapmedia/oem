---
name: skeleton
description: A composable skeleton element using the trait-based pattern. Provides loading placeholders with multiple variants, customizable dimensions, and optional pulse animation.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Skeleton Element

The `skeleton` element provides a composable, trait-based approach to creating loading placeholder elements with built-in theming support, multiple variants, and pulse animation.

## API

The skeleton element exports an object with the following methods:

```typescript
export const skeleton = {
  create: (...children: Child[]) => HTMLDivElement;
  variant: (variant: Variant) => Applier;
  width: (width: string) => Applier;
  height: (height: string) => Applier;
  bg: (bg: ColorToken) => Applier;
  borderRadius: (borderRadius: BorderRadiusToken) => Applier;
  animated: (animated: boolean) => Applier;
};
```

### Types

```typescript
type Variant = 'text' | 'circle' | 'rectangle';
type ColorToken = string; // Theme color token
type BorderRadiusToken = string; // Theme border radius token
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Skeleton

```typescript
import { skeleton } from '@/elements/skeleton';

// Create a simple text skeleton
skeleton.create(skeleton.variant('text'));
```

### Complete Skeleton

```typescript
// Create a fully configured skeleton
skeleton.create(
  skeleton.variant('rectangle'),
  skeleton.width('200px'),
  skeleton.height('100px'),
  skeleton.bg('gray.200'),
  skeleton.borderRadius('md'),
  skeleton.animated(true),
);
```

## Variants

The `skeleton.variant()` applier applies preset shapes for common use cases:

```typescript
// Text skeleton (default - thin horizontal bar)
skeleton.create(skeleton.variant('text'));

// Circle skeleton (for avatars)
skeleton.create(skeleton.variant('circle'));

// Rectangle skeleton (for cards, images, etc.)
skeleton.create(skeleton.variant('rectangle'));
```

### Variant Features

Each variant includes:

- Preset dimensions appropriate for the shape
- Default border radius
- Base background color from theme
- Automatic theme reactivity (updates when theme changes)

## Dimensions

The `skeleton.width()` and `skeleton.height()` appliers control the size:

```typescript
// Custom width
skeleton.create(skeleton.variant('text'), skeleton.width('300px'));

// Custom height
skeleton.create(skeleton.variant('text'), skeleton.height('20px'));

// Both dimensions
skeleton.create(
  skeleton.variant('rectangle'),
  skeleton.width('100%'),
  skeleton.height('200px'),
);
```

## Styling

### Background Color

```typescript
// Custom background color using theme token
skeleton.create(skeleton.variant('rectangle'), skeleton.bg('gray.300'));

// Different color for dark mode
skeleton.create(skeleton.variant('circle'), skeleton.bg('gray.700'));
```

### Border Radius

```typescript
// Small border radius
skeleton.create(skeleton.variant('rectangle'), skeleton.borderRadius('sm'));

// Medium border radius (default)
skeleton.create(skeleton.variant('rectangle'), skeleton.borderRadius('md'));

// Large border radius
skeleton.create(skeleton.variant('rectangle'), skeleton.borderRadius('lg'));

// Fully rounded (for circle variant)
skeleton.create(skeleton.variant('circle'), skeleton.borderRadius('full'));
```

## Animation

### Pulse Animation

```typescript
// Animated skeleton (default)
skeleton.create(skeleton.variant('text'), skeleton.animated(true));

// Static skeleton (no animation)
skeleton.create(skeleton.variant('text'), skeleton.animated(false));
```

The `skeleton.animated()` applier:

- Automatically injects CSS keyframes for pulse animation
- Animates opacity to create a subtle loading effect
- Respects user's motion preferences (`prefers-reduced-motion`)

## Advanced Examples

### User Profile Skeleton

```typescript
import { skeleton } from '@/elements/skeleton';
import { tag } from '@/elements/_base';

tag.div(
  // Avatar
  skeleton.create(
    skeleton.variant('circle'),
    skeleton.width('60px'),
    skeleton.height('60px'),
    skeleton.animated(true),
  ),
  // Name
  skeleton.create(
    skeleton.variant('text'),
    skeleton.width('150px'),
    skeleton.height('20px'),
    skeleton.animated(true),
  ),
  // Bio
  skeleton.create(
    skeleton.variant('text'),
    skeleton.width('250px'),
    skeleton.height('16px'),
    skeleton.animated(true),
  ),
);
```

### Card Skeleton

```typescript
tag.div(
  // Image placeholder
  skeleton.create(
    skeleton.variant('rectangle'),
    skeleton.width('100%'),
    skeleton.height('200px'),
    skeleton.borderRadius('lg'),
    skeleton.animated(true),
  ),
  // Title
  skeleton.create(
    skeleton.variant('text'),
    skeleton.width('80%'),
    skeleton.height('24px'),
    skeleton.animated(true),
  ),
  // Description lines
  skeleton.create(
    skeleton.variant('text'),
    skeleton.width('100%'),
    skeleton.height('16px'),
    skeleton.animated(true),
  ),
  skeleton.create(
    skeleton.variant('text'),
    skeleton.width('90%'),
    skeleton.height('16px'),
    skeleton.animated(true),
  ),
);
```

### Conditional Loading State

```typescript
import { skeleton } from '@/elements/skeleton';
import { $state } from '@/core/state';

const isLoading = $state(true);

// Show skeleton while loading
isLoading.get()
  ? skeleton.create(
      skeleton.variant('rectangle'),
      skeleton.width('100%'),
      skeleton.height('100px'),
      skeleton.animated(true),
    )
  : tag.div('Content loaded!');
```

### List Skeleton

```typescript
// Create multiple skeleton items for a list
const skeletonItems = Array.from({ length: 5 }, () =>
  tag.div(
    skeleton.create(
      skeleton.variant('text'),
      skeleton.width('100%'),
      skeleton.height('40px'),
      skeleton.animated(true),
    ),
  ),
);

tag.div(...skeletonItems);
```

## Trait-Based Pattern

The skeleton element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`variant`, `width`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how skeleton.animated() works internally
animated: (animated: boolean) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('animation', 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', $test(animated)),
    trait.style('animation', 'none', $test(!animated)),
  );

  // Automatically injects keyframes if animated is true
  if (animated) {
    injectKeyframes('pulse', /* ... */);
  }
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up skeleton styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **3 variants**: Text, circle, rectangle
- ✅ **Customizable dimensions**: Set width and height with any CSS unit
- ✅ **Custom styling**: Override background color and border radius
- ✅ **Pulse animation**: Optional smooth loading animation
- ✅ **Automatic keyframe injection**: CSS keyframes are injected only when needed
- ✅ **Accessibility**: Respects `prefers-reduced-motion` for animations
- ✅ **Conditional traits**: Uses `$test()` for conditional styling

## Best Practices

1. **Match content shape**: Use variants that match the content being loaded (circle for avatars, text for lines, rectangle for images)
2. **Consistent dimensions**: Make skeleton dimensions match the actual content as closely as possible
3. **Animation**: Use `animated(true)` for better user experience during loading
4. **Multiple skeletons**: Create multiple skeleton elements to represent complex layouts
5. **Theme colors**: Use theme tokens for background colors to ensure consistency

## Migration from v2.0

If you're migrating from v2.0:

- Replace `<Skeleton />` component with `skeleton.create()`
- Replace props with applier functions: `variant`, `width`, `height`, `bg`, `borderRadius`, `animated`
- Update color values to use theme tokens
- Update border radius values to use theme tokens
