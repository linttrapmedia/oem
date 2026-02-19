---
name: box
description: A composable box element using the trait-based pattern. Provides layout utilities for spacing, sizing, colors, and positioning with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Box Element

The `box` element provides a composable, trait-based approach to creating layout container elements with built-in theming support for spacing, sizing, colors, borders, and positioning.

## API

The box element exports an object with the following methods:

```typescript
export const box = {
  create: (...children: Child[]) => HTMLDivElement;
  padding: (padding: SpacingToken) => Applier;
  paddingX: (paddingX: SpacingToken) => Applier;
  paddingY: (paddingY: SpacingToken) => Applier;
  margin: (margin: SpacingToken) => Applier;
  marginX: (marginX: SpacingToken) => Applier;
  marginY: (marginY: SpacingToken) => Applier;
  bg: (bg: ColorToken) => Applier;
  border: (border: ColorToken) => Applier;
  borderRadius: (borderRadius: BorderRadiusToken) => Applier;
  width: (width: string) => Applier;
  height: (height: string) => Applier;
  maxWidth: (maxWidth: string) => Applier;
  maxHeight: (maxHeight: string) => Applier;
  minWidth: (minWidth: string) => Applier;
  minHeight: (minHeight: string) => Applier;
  display: (display: Display) => Applier;
  position: (position: Position) => Applier;
  overflow: (overflow: Overflow) => Applier;
  shadow: (shadow: ShadowToken) => Applier;
  onClick: (handler: (e: any) => void) => Applier;
};
```

### Types

```typescript
type Display = 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto';
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Box

```typescript
import { box } from '@/elements/box';

// Create a simple box container
box.create();
```

### Complete Box

```typescript
// Create a fully configured box
box.create(
  box.padding('md'),
  box.paddingX('lg'),
  box.paddingY('sm'),
  box.margin('md'),
  box.marginX('lg'),
  box.marginY('sm'),
  box.bg('bgPrimary'),
  box.border('borderPrimary'),
  box.borderRadius('borderRadiusMd'),
  box.width('300px'),
  box.height('200px'),
  box.maxWidth('100%'),
  box.maxHeight('500px'),
  box.minWidth('200px'),
  box.minHeight('100px'),
  box.display('flex'),
  box.position('relative'),
  box.overflow('hidden'),
  box.shadow('shadowMd'),
  box.onClick((e) => console.log('Box clicked!')),
);
```

## Spacing

### Padding

The `box.padding()`, `box.paddingX()`, and `box.paddingY()` appliers control internal spacing:

```typescript
// Uniform padding on all sides
box.create(box.padding('md'));

// Horizontal padding (left and right)
box.create(box.paddingX('lg'));

// Vertical padding (top and bottom)
box.create(box.paddingY('sm'));

// Combined padding
box.create(
  box.paddingX('lg'),
  box.paddingY('md'),
);
```

### Margin

The `box.margin()`, `box.marginX()`, and `box.marginY()` appliers control external spacing:

```typescript
// Uniform margin on all sides
box.create(box.margin('md'));

// Horizontal margin (left and right)
box.create(box.marginX('lg'));

// Vertical margin (top and bottom)
box.create(box.marginY('sm'));

// Combined margin
box.create(
  box.marginX('lg'),
  box.marginY('md'),
);
```

## Colors and Borders

### Background Color

```typescript
// Primary background
box.create(box.bg('bgPrimary'));

// Secondary background
box.create(box.bg('bgSecondary'));

// Tertiary background
box.create(box.bg('bgTertiary'));

// Success background
box.create(box.bg('success'));
```

### Border

```typescript
// Primary border
box.create(box.border('borderPrimary'));

// Secondary border
box.create(box.border('borderSecondary'));

// Success border
box.create(box.border('success'));

// Error border
box.create(box.border('error'));
```

### Border Radius

```typescript
// Small border radius
box.create(box.borderRadius('borderRadiusSm'));

// Medium border radius
box.create(box.borderRadius('borderRadiusMd'));

// Large border radius
box.create(box.borderRadius('borderRadiusLg'));

// Full border radius (circular)
box.create(box.borderRadius('borderRadiusFull'));
```

## Sizing

### Width and Height

```typescript
// Fixed dimensions
box.create(
  box.width('300px'),
  box.height('200px'),
);

// Percentage dimensions
box.create(
  box.width('100%'),
  box.height('50vh'),
);

// Viewport units
box.create(
  box.width('80vw'),
  box.height('60vh'),
);
```

### Min and Max Dimensions

```typescript
// Min dimensions
box.create(
  box.minWidth('200px'),
  box.minHeight('100px'),
);

// Max dimensions
box.create(
  box.maxWidth('800px'),
  box.maxHeight('600px'),
);

// Responsive container
box.create(
  box.width('100%'),
  box.maxWidth('1200px'),
  box.minWidth('300px'),
);
```

## Layout

### Display

```typescript
// Block display
box.create(box.display('block'));

// Inline-block display
box.create(box.display('inline-block'));

// Flex display
box.create(box.display('flex'));

// Grid display
box.create(box.display('grid'));

// None (hidden)
box.create(box.display('none'));
```

### Position

```typescript
// Static position (default)
box.create(box.position('static'));

// Relative position
box.create(box.position('relative'));

// Absolute position
box.create(box.position('absolute'));

// Fixed position
box.create(box.position('fixed'));

// Sticky position
box.create(box.position('sticky'));
```

### Overflow

```typescript
// Visible overflow (default)
box.create(box.overflow('visible'));

// Hidden overflow
box.create(box.overflow('hidden'));

// Scrollable overflow
box.create(box.overflow('scroll'));

// Auto overflow
box.create(box.overflow('auto'));
```

## Shadow

The `box.shadow()` applier applies shadow effects:

```typescript
// Small shadow
box.create(box.shadow('shadowSm'));

// Medium shadow
box.create(box.shadow('shadowMd'));

// Large shadow
box.create(box.shadow('shadowLg'));

// Extra large shadow
box.create(box.shadow('shadowXl'));
```

## Event Handlers

### Click Handler

```typescript
box.create(
  box.bg('bgSecondary'),
  box.padding('md'),
  box.borderRadius('borderRadiusMd'),
  box.onClick((e) => {
    console.log('Box clicked!');
  }),
);
```

The `box.onClick()` applier:

- Automatically sets cursor to `pointer`
- Attaches a click event listener
- Provides the event object to the handler

## Advanced Examples

### Card Component

```typescript
import { box } from '@/elements/box';
import { tag } from '@/elements/_base';

box.create(
  box.bg('bgPrimary'),
  box.border('borderPrimary'),
  box.borderRadius('borderRadiusLg'),
  box.padding('lg'),
  box.shadow('shadowMd'),
  box.maxWidth('400px'),
  tag.h3('Card Title'),
  tag.p('Card content goes here'),
);
```

### Centered Container

```typescript
box.create(
  box.display('flex'),
  box.width('100%'),
  box.height('100vh'),
  box.paddingX('lg'),
  box.maxWidth('1200px'),
  box.marginX('auto'),
);
```

### Scrollable Container

```typescript
box.create(
  box.width('100%'),
  box.height('400px'),
  box.overflow('auto'),
  box.border('borderPrimary'),
  box.borderRadius('borderRadiusMd'),
  box.padding('md'),
);
```

### Modal Overlay

```typescript
box.create(
  box.position('fixed'),
  box.width('100vw'),
  box.height('100vh'),
  box.display('flex'),
  box.bg('bgOverlay'),
  box.onClick((e) => {
    if (e.target === e.currentTarget) {
      console.log('Close modal');
    }
  }),
);
```

### Responsive Grid Cell

```typescript
box.create(
  box.padding('md'),
  box.bg('bgSecondary'),
  box.borderRadius('borderRadiusMd'),
  box.minWidth('200px'),
  box.maxWidth('400px'),
  box.height('300px'),
);
```

### Interactive Card

```typescript
import { box } from '@/elements/box';
import { $state } from '@/core/state';

const isHovered = $state(false);

box.create(
  box.bg('bgPrimary'),
  box.border('borderPrimary'),
  box.borderRadius('borderRadiusLg'),
  box.padding('lg'),
  box.shadow(isHovered.get() ? 'shadowXl' : 'shadowMd'),
  box.onClick(() => console.log('Card clicked!')),
);
```

## Composing with Child Elements

```typescript
import { tag } from '@/elements/_base';
import { text } from '@/elements/text';

box.create(
  box.bg('bgPrimary'),
  box.padding('lg'),
  box.borderRadius('borderRadiusMd'),
  tag.h2('Title'),
  text.create(text.content('This is a text element inside a box')),
  tag.button('Click me'),
);
```

## Trait-Based Pattern

The box element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`padding`, `margin`, `bg`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **Flexible**: Combine multiple appliers to create complex layouts

### Internal Structure

```typescript
// Example of how box.padding() works internally
padding: (padding: SpacingToken) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('padding', theme.$token('spacing', padding))
  );
};

// Example of how box.border() works internally
border: (border: ColorToken) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style(
      'border',
      `${theme.$token('borders', 'borderWidthThin')} ${theme.$token('borders', 'borderStyleSolid')} ${theme.$token('colors', border)}`
    )
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up box styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **Spacing utilities**: Padding and margin with X/Y variants
- ✅ **Color utilities**: Background and border colors from theme
- ✅ **Sizing utilities**: Width, height, min/max dimensions
- ✅ **Layout utilities**: Display, position, overflow
- ✅ **Border utilities**: Border radius from theme
- ✅ **Shadow utilities**: Box shadows from theme
- ✅ **Event handling**: Click handlers via `box.onClick()`
- ✅ **Child elements**: Add any elements as children
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM
