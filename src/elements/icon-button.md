---
name: icon-button
description: A button component optimized for icons with minimal padding. Supports multiple variants, sizes, and interactive states with optional circular shape.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Icon Button Component

The `icon-button` function creates a compact button designed specifically for icons with smooth animations, multiple visual styles, and full theming support.

## Props

```typescript
type IconButtonProps = {
  icon: HTMLElement;               // Icon element (required)
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  color?: ColorToken;              // Button color
  disabled?: boolean;              // Disabled state
  rounded?: boolean;               // Circular shape
  'aria-label': string;            // Accessibility label (required)
  onClick?: () => void;            // Click handler
};
```

## Example Usage

### Basic Icon Button

```typescript
import { iconButton } from '@/elements/icon-button';
import { tag } from '@/elements/_base';

// Simple icon button
const btn = iconButton({
  icon: tag.span({ textContent: '⚙️' }),
  'aria-label': 'Settings',
  onClick: () => console.log('Settings clicked')
});
```

### Variants

```typescript
// Solid variant (filled background)
const solidBtn = iconButton({
  icon: tag.span({ textContent: '✓' }),
  variant: 'solid',
  color: 'primary',
  'aria-label': 'Confirm'
});

// Outline variant (border only)
const outlineBtn = iconButton({
  icon: tag.span({ textContent: '✏️' }),
  variant: 'outline',
  color: 'secondary',
  'aria-label': 'Edit'
});

// Ghost variant (transparent - default)
const ghostBtn = iconButton({
  icon: tag.span({ textContent: '×' }),
  variant: 'ghost',
  'aria-label': 'Close'
});
```

### Sizes

```typescript
// Small (32px)
const smallBtn = iconButton({
  icon: tag.span({ textContent: '👁️' }),
  size: 'sm',
  'aria-label': 'View'
});

// Medium (40px - default)
const mediumBtn = iconButton({
  icon: tag.span({ textContent: '👁️' }),
  size: 'md',
  'aria-label': 'View'
});

// Large (48px)
const largeBtn = iconButton({
  icon: tag.span({ textContent: '👁️' }),
  size: 'lg',
  'aria-label': 'View'
});
```

### Colors

```typescript
// Primary (default)
const primaryBtn = iconButton({
  icon: tag.span({ textContent: '💾' }),
  color: 'primary',
  'aria-label': 'Save'
});

// Secondary
const secondaryBtn = iconButton({
  icon: tag.span({ textContent: '📤' }),
  color: 'secondary',
  'aria-label': 'Share'
});

// Success
const successBtn = iconButton({
  icon: tag.span({ textContent: '✓' }),
  color: 'success',
  'aria-label': 'Approve'
});

// Error
const errorBtn = iconButton({
  icon: tag.span({ textContent: '🗑️' }),
  color: 'error',
  'aria-label': 'Delete'
});
```

### Rounded Shape

```typescript
// Circular button (fully rounded)
const circularBtn = iconButton({
  icon: tag.span({ textContent: '+' }),
  rounded: true,
  variant: 'solid',
  'aria-label': 'Add'
});

// Regular rounded corners (default)
const regularBtn = iconButton({
  icon: tag.span({ textContent: '+' }),
  rounded: false,
  'aria-label': 'Add'
});
```

### Disabled State

```typescript
// Disabled button
const disabledBtn = iconButton({
  icon: tag.span({ textContent: '🔒' }),
  disabled: true,
  'aria-label': 'Locked'
});
```

### Complete Example

```typescript
import { iconButton } from '@/elements/icon-button';
import { row } from '@/elements/row';
import { tag } from '@/elements/_base';
import { $signal } from '@/core/signal';

// Action toolbar
const isEditing = $signal(false);

const toolbar = row({
  spacing: 'xs',
  children: [
    iconButton({
      icon: tag.span({ textContent: '✏️' }),
      variant: 'ghost',
      'aria-label': 'Edit',
      onClick: () => isEditing.set(true)
    }),
    iconButton({
      icon: tag.span({ textContent: '📋' }),
      variant: 'ghost',
      'aria-label': 'Copy',
      onClick: () => console.log('Copied')
    }),
    iconButton({
      icon: tag.span({ textContent: '🗑️' }),
      variant: 'ghost',
      color: 'error',
      'aria-label': 'Delete',
      onClick: () => confirm('Delete this item?')
    })
  ]
});

// Floating action buttons
const floatingActions = stack({
  spacing: 'sm',
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  children: [
    iconButton({
      icon: tag.span({ textContent: '💬' }),
      variant: 'solid',
      color: 'primary',
      size: 'lg',
      rounded: true,
      'aria-label': 'Chat',
      onClick: () => console.log('Open chat')
    }),
    iconButton({
      icon: tag.span({ textContent: '+' }),
      variant: 'solid',
      color: 'secondary',
      size: 'lg',
      rounded: true,
      'aria-label': 'Add new',
      onClick: () => console.log('Add new item')
    })
  ]
});

// Media controls
const mediaControls = row({
  spacing: 'sm',
  align: 'center',
  justify: 'center',
  children: [
    iconButton({
      icon: tag.span({ textContent: '⏮️' }),
      'aria-label': 'Previous',
      onClick: () => console.log('Previous')
    }),
    iconButton({
      icon: tag.span({ textContent: '▶️' }),
      variant: 'solid',
      color: 'primary',
      size: 'lg',
      rounded: true,
      'aria-label': 'Play',
      onClick: () => console.log('Play')
    }),
    iconButton({
      icon: tag.span({ textContent: '⏭️' }),
      'aria-label': 'Next',
      onClick: () => console.log('Next')
    })
  ]
});
```

## Features

- **Icon Optimized**: Perfectly sized container for icon elements
- **Three Variants**: Solid, outline, and ghost styles
- **Three Sizes**: Small (32px), medium (40px), large (48px)
- **Interactive States**: Hover, active, and focus effects with smooth animations
- **Rounded Option**: Square with border radius or fully circular
- **Theme Colors**: Full integration with design token colors
- **Disabled State**: Proper visual feedback and interaction blocking
- **Smooth Animations**: Scale and color transitions on interaction
- **Accessibility**: Required aria-label for screen readers
- **No Shrink**: Maintains size in flex containers
- **Type Attribute**: Proper button type for forms
