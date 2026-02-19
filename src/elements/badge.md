---
name: badge
description: A composable badge element using the trait-based pattern. Supports multiple variants, colors, and sizes with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Badge Element

The `badge` element provides a composable, trait-based approach to creating badge elements with built-in theming support, multiple variants, colors, and sizes.

## API

The badge element exports an object with the following methods:

```typescript
export const badge = {
  create: (...children: Child[]) => HTMLSpanElement;
  variant: (variant: BadgeVariant, color: BadgeColor) => Applier;
  size: (size: BadgeSize) => Applier;
  pill: (isPill: boolean) => Applier;
  text: (text: string) => Applier;
};
```

### Types

```typescript
type BadgeVariant = 'solid' | 'subtle' | 'outline';
type BadgeColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Badge

```typescript
import { badge } from '@/elements/badge';

// Create a simple badge with text
badge.create(badge.text('New'));
```

### Complete Badge

```typescript
// Create a fully configured badge
badge.create(
  badge.variant('solid', 'primary'),
  badge.size('md'),
  badge.text('New'),
  badge.pill(true),
);
```

## Variants

The `badge.variant()` applier applies color schemes based on the variant and color combination:

### Solid Variant

```typescript
// Primary solid badge
badge.create(badge.variant('solid', 'primary'), badge.text('Primary'));

// Secondary solid badge
badge.create(badge.variant('solid', 'secondary'), badge.text('Secondary'));

// Success solid badge (green)
badge.create(badge.variant('solid', 'success'), badge.text('Success'));

// Error solid badge (red)
badge.create(badge.variant('solid', 'error'), badge.text('Error'));

// Warning solid badge (yellow/amber)
badge.create(badge.variant('solid', 'warning'), badge.text('Warning'));

// Info solid badge (blue)
badge.create(badge.variant('solid', 'info'), badge.text('Info'));

// Neutral solid badge (gray)
badge.create(badge.variant('solid', 'neutral'), badge.text('Neutral'));
```

### Subtle Variant

```typescript
// Primary subtle badge
badge.create(badge.variant('subtle', 'primary'), badge.text('Primary'));

// Secondary subtle badge
badge.create(badge.variant('subtle', 'secondary'), badge.text('Secondary'));

// Success subtle badge
badge.create(badge.variant('subtle', 'success'), badge.text('Success'));

// Error subtle badge
badge.create(badge.variant('subtle', 'error'), badge.text('Error'));

// Warning subtle badge
badge.create(badge.variant('subtle', 'warning'), badge.text('Warning'));

// Info subtle badge
badge.create(badge.variant('subtle', 'info'), badge.text('Info'));

// Neutral subtle badge
badge.create(badge.variant('subtle', 'neutral'), badge.text('Neutral'));
```

### Outline Variant

```typescript
// Primary outline badge
badge.create(badge.variant('outline', 'primary'), badge.text('Primary'));

// Secondary outline badge
badge.create(badge.variant('outline', 'secondary'), badge.text('Secondary'));

// Success outline badge
badge.create(badge.variant('outline', 'success'), badge.text('Success'));

// Error outline badge
badge.create(badge.variant('outline', 'error'), badge.text('Error'));

// Warning outline badge
badge.create(badge.variant('outline', 'warning'), badge.text('Warning'));

// Info outline badge
badge.create(badge.variant('outline', 'info'), badge.text('Info'));

// Neutral outline badge
badge.create(badge.variant('outline', 'neutral'), badge.text('Neutral'));
```

### Variant Features

Each variant includes:

- **Solid**: Full background color with inverse text color
- **Subtle**: Light background color with matching text color
- **Outline**: Transparent background with colored border and text
- Automatic theme reactivity (updates when theme changes)

## Sizes

The `badge.size()` applier controls padding, font size, and border radius:

```typescript
// Small badge
badge.create(badge.variant('solid', 'primary'), badge.size('sm'), badge.text('Small'));

// Medium badge (default)
badge.create(badge.variant('solid', 'primary'), badge.size('md'), badge.text('Medium'));

// Large badge
badge.create(badge.variant('solid', 'primary'), badge.size('lg'), badge.text('Large'));
```

## Pill Shape

The `badge.pill()` applier creates a fully rounded badge:

```typescript
// Regular badge with default border radius
badge.create(
  badge.variant('solid', 'primary'),
  badge.size('md'),
  badge.text('Regular'),
  badge.pill(false),
);

// Pill badge with fully rounded corners
badge.create(
  badge.variant('solid', 'primary'),
  badge.size('md'),
  badge.text('Pill'),
  badge.pill(true),
);
```

## Advanced Examples

### Status Indicator

```typescript
import { badge } from '@/elements/badge';

// Online status
badge.create(badge.variant('solid', 'success'), badge.size('sm'), badge.text('Online'), badge.pill(true));

// Offline status
badge.create(badge.variant('subtle', 'neutral'), badge.size('sm'), badge.text('Offline'), badge.pill(true));

// Busy status
badge.create(badge.variant('solid', 'warning'), badge.size('sm'), badge.text('Busy'), badge.pill(true));
```

### Notification Count

```typescript
// Unread count badge
badge.create(
  badge.variant('solid', 'error'),
  badge.size('sm'),
  badge.text('3'),
  badge.pill(true),
);
```

### Category Tags

```typescript
import { tag } from '@/elements/_base';

tag.div(
  badge.create(badge.variant('subtle', 'primary'), badge.size('md'), badge.text('JavaScript')),
  badge.create(badge.variant('subtle', 'secondary'), badge.size('md'), badge.text('TypeScript')),
  badge.create(badge.variant('subtle', 'success'), badge.size('md'), badge.text('React')),
);
```

### Reactive Badge with State

```typescript
import { badge } from '@/elements/badge';
import { $state } from '@/core/state';

const status = $state<'active' | 'inactive' | 'pending'>('active');

const statusBadge = badge.create(
  badge.variant('solid', status.get() === 'active' ? 'success' : status.get() === 'pending' ? 'warning' : 'neutral'),
  badge.size('md'),
  badge.text(status.get()),
  badge.pill(true),
);
```

### Badge with Icon

```typescript
import { tag } from '@/elements/_base';

badge.create(
  badge.variant('solid', 'info'),
  badge.size('md'),
  tag.span('✓ '),
  badge.text('Verified'),
);
```

## Trait-Based Pattern

The badge element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`variant`, `size`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how badge.variant() works internally
variant: (variant: BadgeVariant, color: BadgeColor) => (el: HTMLElement | SVGElement) => {
  const config = colorConfig[color];

  tag.$(el)(
    // Variant: solid
    trait.style('backgroundColor', theme.$token('colors', config.solid.bg), $test(variant === 'solid')),
    trait.style('color', theme.$token('colors', config.solid.text), $test(variant === 'solid')),
    trait.style('border', 'none', $test(variant === 'solid')),

    // Variant: subtle
    trait.style('backgroundColor', theme.$token('colors', config.subtle.bg), $test(variant === 'subtle')),
    trait.style('color', theme.$token('colors', config.subtle.text), $test(variant === 'subtle')),
    trait.style('border', 'none', $test(variant === 'subtle')),

    // Variant: outline
    trait.style('backgroundColor', 'transparent', $test(variant === 'outline')),
    trait.style('color', theme.$token('colors', config.outline.text), $test(variant === 'outline')),
    trait.style('border', `1px solid ${theme.$token('colors', config.outline.border)}`, $test(variant === 'outline')),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up badge styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **3 variants**: Solid, subtle, outline
- ✅ **7 colors**: Primary, secondary, success, error, warning, info, neutral
- ✅ **3 sizes**: Small, medium, large
- ✅ **Pill shape**: Fully rounded corners option
- ✅ **Child elements**: Add icons or other elements as children
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Subscriptions are cleaned up when elements are removed from DOM
