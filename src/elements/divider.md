---
name: divider
description: A composable divider element using the trait-based pattern. Supports horizontal and vertical orientations, multiple line styles, and custom spacing with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Divider Element

The `divider` element provides a composable, trait-based approach to creating visual separator elements with built-in theming support, multiple orientations, and customizable styling.

## API

The divider element exports an object with the following methods:

```typescript
export const divider = {
  create: (...children: Child[]) => HTMLHRElement;
  orientation: (orientation: Orientation) => Applier;
  variant: (variant: Variant) => Applier;
  color: (color: ColorToken) => Applier;
  thickness: (thickness: string) => Applier;
  spacing: (spacing: SpacingToken) => Applier;
  spacingVertical: (spacing: SpacingToken) => Applier;
};
```

### Types

```typescript
type Orientation = 'horizontal' | 'vertical';
type Variant = 'solid' | 'dashed' | 'dotted';
type ColorToken = string;
type SpacingToken = string;
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Divider

```typescript
import { divider } from '@/elements/divider';

// Create a simple horizontal divider
divider.create();
```

### Complete Divider

```typescript
// Create a fully configured divider
divider.create(
  divider.orientation('horizontal'),
  divider.variant('solid'),
  divider.color('gray.300'),
  divider.thickness('2px'),
  divider.spacing('md'),
);
```

## Orientation

The `divider.orientation()` applier controls whether the divider is horizontal or vertical:

```typescript
// Horizontal divider (default)
divider.create(divider.orientation('horizontal'));

// Vertical divider
divider.create(divider.orientation('vertical'));
```

### Orientation Features

- **Horizontal**: Spans full width with vertical spacing
- **Vertical**: Spans height with horizontal spacing
- Automatic display and dimension adjustments
- Theme-aware spacing

## Variants

The `divider.variant()` applier applies different line styles:

```typescript
// Solid line (default)
divider.create(divider.variant('solid'));

// Dashed line
divider.create(divider.variant('dashed'));

// Dotted line
divider.create(divider.variant('dotted'));
```

### Variant Features

Each variant includes:

- Border style configuration
- Consistent appearance across orientations
- Theme integration for colors
- Automatic responsiveness

## Color

The `divider.color()` applier sets the divider color using theme tokens:

```typescript
// Gray divider
divider.create(divider.color('gray.300'));

// Accent color divider
divider.create(divider.color('primary.500'));

// Custom color from theme
divider.create(divider.color('error.400'));
```

## Thickness

The `divider.thickness()` applier controls the line thickness:

```typescript
// Thin divider
divider.create(divider.thickness('1px'));

// Medium divider
divider.create(divider.thickness('2px'));

// Thick divider
divider.create(divider.thickness('4px'));
```

## Spacing

### Horizontal Divider Spacing

The `divider.spacing()` applier sets vertical spacing for horizontal dividers:

```typescript
// Small spacing
divider.create(divider.orientation('horizontal'), divider.spacing('sm'));

// Medium spacing
divider.create(divider.orientation('horizontal'), divider.spacing('md'));

// Large spacing
divider.create(divider.orientation('horizontal'), divider.spacing('lg'));
```

### Vertical Divider Spacing

The `divider.spacingVertical()` applier sets horizontal spacing for vertical dividers:

```typescript
// Small spacing
divider.create(divider.orientation('vertical'), divider.spacingVertical('sm'));

// Medium spacing
divider.create(divider.orientation('vertical'), divider.spacingVertical('md'));

// Large spacing
divider.create(divider.orientation('vertical'), divider.spacingVertical('lg'));
```

## Advanced Examples

### Section Divider

```typescript
import { divider } from '@/elements/divider';
import { tag } from '@/elements/_base';

tag.div(
  tag.h2('Section 1'),
  tag.p('Content for section 1...'),
  divider.create(divider.spacing('lg'), divider.color('gray.300')),
  tag.h2('Section 2'),
  tag.p('Content for section 2...'),
);
```

### Sidebar Divider

```typescript
import { divider } from '@/elements/divider';

// Vertical divider between sidebar and content
tag.div(
  tag.aside('Sidebar content'),
  divider.create(
    divider.orientation('vertical'),
    divider.spacingVertical('md'),
    divider.color('gray.200'),
  ),
  tag.main('Main content'),
);
```

### Styled Divider

```typescript
// Decorative divider with custom styling
divider.create(
  divider.variant('dashed'),
  divider.color('primary.300'),
  divider.thickness('2px'),
  divider.spacing('xl'),
);
```

### List Item Separators

```typescript
import { divider } from '@/elements/divider';

tag.ul(
  tag.li('Item 1'),
  divider.create(divider.variant('solid'), divider.color('gray.200'), divider.spacing('xs')),
  tag.li('Item 2'),
  divider.create(divider.variant('solid'), divider.color('gray.200'), divider.spacing('xs')),
  tag.li('Item 3'),
);
```

## Trait-Based Pattern

The divider element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`orientation`, `variant`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how divider.orientation() works internally
orientation: (orientation: Orientation) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('width', '100%', $test(orientation === 'horizontal')),
    trait.style('height', '1px', $test(orientation === 'horizontal')),
    trait.style('width', '1px', $test(orientation === 'vertical')),
    trait.style('height', '100%', $test(orientation === 'vertical')),
    trait.style('display', 'block'),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up divider styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **2 orientations**: Horizontal and vertical
- ✅ **3 variants**: Solid, dashed, and dotted line styles
- ✅ **Custom colors**: Use any theme color token
- ✅ **Adjustable thickness**: Control line weight
- ✅ **Flexible spacing**: Separate controls for horizontal and vertical spacing
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Subscriptions are cleaned up when elements are removed from DOM
