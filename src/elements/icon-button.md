---
name: icon-button
description: A composable icon button element using the trait-based pattern. Supports multiple variants, sizes, rounded styles, and accessibility features with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Icon Button Element

The `icon-button` element provides a composable, trait-based approach to creating icon button elements with built-in theming support, multiple variants, and interactive states optimized for icon-only buttons.

## API

The icon button element exports an object with the following methods:

```typescript
export const iconButton = {
  create: (...children: Child[]) => HTMLButtonElement;
  variant: (variant: IconButtonVariant, color: ColorToken) => Applier;
  size: (size: Size) => Applier;
  rounded: (isRounded: boolean) => Applier;
  disabled: (disabled: boolean) => Applier;
  ariaLabel: (label: string) => Applier;
  onClick: (handler: (e: Event) => void) => Applier;
};
```

### Types

```typescript
type IconButtonVariant = 'solid' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';
type ColorToken = string;
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Icon Button

```typescript
import { iconButton } from '@/elements/icon-button';

// Create a simple icon button with an icon
iconButton.create(
  tag.span('🔍'),
  iconButton.ariaLabel('Search'),
);
```

### Complete Icon Button

```typescript
// Create a fully configured icon button
iconButton.create(
  iconButton.variant('solid', 'primary.500'),
  iconButton.size('md'),
  iconButton.rounded(true),
  iconButton.ariaLabel('Settings'),
  iconButton.onClick((e) => console.log('Settings clicked!')),
  tag.span('⚙️'),
);
```

## Variants

The `iconButton.variant()` applier applies color schemes and styles with two parameters:

```typescript
// Solid icon button (filled background)
iconButton.create(
  iconButton.variant('solid', 'primary.500'),
  iconButton.ariaLabel('Primary'),
  tag.span('✓'),
);

// Outline icon button (border only)
iconButton.create(
  iconButton.variant('outline', 'secondary.500'),
  iconButton.ariaLabel('Secondary'),
  tag.span('✎'),
);

// Ghost icon button (transparent, minimal)
iconButton.create(
  iconButton.variant('ghost', 'gray.600'),
  iconButton.ariaLabel('Options'),
  tag.span('⋮'),
);
```

### Variant Features

Each variant includes:

- **Solid**: Filled background with contrasting icon color
- **Outline**: Border with transparent background
- **Ghost**: No border or background, minimal appearance
- Hover state with color transition
- Active/pressed state
- Automatic theme reactivity

### Color Tokens

Use any theme color token for the variant:

```typescript
// Success color
iconButton.create(iconButton.variant('solid', 'success.500'), tag.span('✓'));

// Error color
iconButton.create(iconButton.variant('solid', 'error.500'), tag.span('✕'));

// Warning color
iconButton.create(iconButton.variant('outline', 'warning.500'), tag.span('⚠'));

// Info color
iconButton.create(iconButton.variant('ghost', 'info.500'), tag.span('ⓘ'));
```

## Sizes

The `iconButton.size()` applier controls button dimensions and padding:

```typescript
// Small icon button
iconButton.create(iconButton.size('sm'), tag.span('✓'));

// Medium icon button (default)
iconButton.create(iconButton.size('md'), tag.span('✓'));

// Large icon button
iconButton.create(iconButton.size('lg'), tag.span('✓'));
```

### Size Features

- Consistent padding for square appearance
- Scales icon size appropriately
- Maintains aspect ratio
- Theme-aware sizing

## Rounded Style

The `iconButton.rounded()` applier controls border radius:

```typescript
// Fully rounded (circular) button
iconButton.create(iconButton.rounded(true), tag.span('✓'));

// Standard rounded corners (default)
iconButton.create(iconButton.rounded(false), tag.span('✓'));
```

### Rounded Features

- **true**: 50% border radius (circular)
- **false**: Uses theme borderRadiusButton token
- Perfect for icon-only buttons
- Maintains appearance across sizes

## States

### Disabled State

```typescript
// Disabled icon button
iconButton.create(
  iconButton.variant('solid', 'primary.500'),
  iconButton.disabled(true),
  iconButton.ariaLabel('Disabled'),
  tag.span('✓'),
);

// Conditionally disabled
const isProcessing = false;
iconButton.create(
  iconButton.variant('solid', 'primary.500'),
  iconButton.disabled(isProcessing),
  iconButton.ariaLabel('Submit'),
  tag.span('→'),
);
```

The `iconButton.disabled()` applier:

- Reduces opacity to 0.6
- Changes cursor to `not-allowed`
- Disables pointer events
- Sets the `disabled` attribute on the element

## Accessibility

### Aria Label

The `iconButton.ariaLabel()` applier provides accessible labels for screen readers:

```typescript
// Always provide aria-label for icon-only buttons
iconButton.create(
  iconButton.ariaLabel('Close dialog'),
  tag.span('✕'),
);

// Descriptive labels for context
iconButton.create(
  iconButton.ariaLabel('Add new item'),
  tag.span('+'),
);

// Action-oriented labels
iconButton.create(
  iconButton.ariaLabel('Delete item'),
  tag.span('🗑'),
);
```

### Accessibility Best Practices

- **Always use ariaLabel**: Icon-only buttons need text alternatives
- **Be descriptive**: Explain the action, not just the icon
- **Keep it concise**: Short, clear descriptions
- **Use action verbs**: "Delete", "Edit", "Close", etc.

## Event Handlers

### Click Handler

```typescript
iconButton.create(
  iconButton.ariaLabel('Like'),
  tag.span('♥'),
  iconButton.onClick((e) => {
    console.log('Liked!');
  }),
);
```

## Advanced Examples

### Action Toolbar

```typescript
import { iconButton } from '@/elements/icon-button';
import { tag } from '@/elements/_base';

tag.div(
  iconButton.create(
    iconButton.variant('ghost', 'gray.600'),
    iconButton.size('sm'),
    iconButton.ariaLabel('Edit'),
    tag.span('✎'),
  ),
  iconButton.create(
    iconButton.variant('ghost', 'gray.600'),
    iconButton.size('sm'),
    iconButton.ariaLabel('Delete'),
    tag.span('🗑'),
  ),
  iconButton.create(
    iconButton.variant('ghost', 'gray.600'),
    iconButton.size('sm'),
    iconButton.ariaLabel('Share'),
    tag.span('↗'),
  ),
);
```

### Circular Icon Buttons

```typescript
// Circular action buttons
iconButton.create(
  iconButton.variant('solid', 'primary.500'),
  iconButton.size('lg'),
  iconButton.rounded(true),
  iconButton.ariaLabel('Add'),
  tag.span('+'),
);

iconButton.create(
  iconButton.variant('solid', 'error.500'),
  iconButton.size('lg'),
  iconButton.rounded(true),
  iconButton.ariaLabel('Remove'),
  tag.span('−'),
);
```

### Modal Close Button

```typescript
// Top-right close button
iconButton.create(
  iconButton.variant('ghost', 'gray.600'),
  iconButton.size('md'),
  iconButton.rounded(false),
  iconButton.ariaLabel('Close modal'),
  iconButton.onClick(() => closeModal()),
  tag.span('✕'),
);
```

### Icon Button Group

```typescript
// Grouped icon buttons with consistent styling
tag.div(
  iconButton.create(
    iconButton.variant('outline', 'gray.600'),
    iconButton.size('md'),
    iconButton.ariaLabel('Bold'),
    tag.span('B'),
  ),
  iconButton.create(
    iconButton.variant('outline', 'gray.600'),
    iconButton.size('md'),
    iconButton.ariaLabel('Italic'),
    tag.span('I'),
  ),
  iconButton.create(
    iconButton.variant('outline', 'gray.600'),
    iconButton.size('md'),
    iconButton.ariaLabel('Underline'),
    tag.span('U'),
  ),
);
```

### Reactive Icon Button

```typescript
import { iconButton } from '@/elements/icon-button';
import { $state } from '@/core/state';

const isLiked = $state(false);

iconButton.create(
  iconButton.variant('ghost', 'error.500'),
  iconButton.size('md'),
  iconButton.rounded(true),
  iconButton.ariaLabel(isLiked.get() ? 'Unlike' : 'Like'),
  iconButton.onClick(() => isLiked.set(!isLiked.get())),
  tag.span(isLiked.get() ? '♥' : '♡'),
);
```

### Floating Action Button

```typescript
// FAB-style icon button
iconButton.create(
  iconButton.variant('solid', 'primary.500'),
  iconButton.size('lg'),
  iconButton.rounded(true),
  iconButton.ariaLabel('Create new'),
  iconButton.onClick(() => createNew()),
  tag.span('+'),
);
```

## Trait-Based Pattern

The icon button element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`variant`, `size`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how iconButton.variant() works internally
variant: (variant: IconButtonVariant, color: ColorToken) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('backgroundColor', theme.$token('colors', color), $test(variant === 'solid')),
    trait.style('color', 'white', $test(variant === 'solid')),
    trait.style('border', `1px solid ${theme.$token('colors', color)}`, $test(variant === 'outline')),
    trait.style('backgroundColor', 'transparent', $test(variant === 'ghost')),
    trait.style_on_event('mouseenter', 'opacity', '0.8'),
    trait.style_on_event('mouseleave', 'opacity', '1'),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up icon button styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **3 variants**: Solid, outline, and ghost styles
- ✅ **3 sizes**: Small, medium, large
- ✅ **Rounded option**: Circular or standard border radius
- ✅ **Interactive states**: Hover, active, and disabled states
- ✅ **Accessibility**: Built-in aria-label support
- ✅ **Event handling**: Click handlers via `iconButton.onClick()`
- ✅ **Flexible colors**: Use any theme color token
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM
