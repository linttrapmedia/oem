---
name: button
description: A reactive button component with multiple variants, sizes, and states. Supports theming, hover/active/focus states, and full-width layouts.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Button Component

The `button` function creates a fully-featured, reactive button element with built-in theming support, multiple variants, and interactive states.

## Props

```typescript
type ButtonProps = {
  label?: string;              // Button text
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost';
  size?: 'sm' | 'md' | 'lg';   // Button size
  disabled?: boolean;           // Disabled state
  fullWidth?: boolean;          // Stretch to full width
  onClick?: () => void;         // Click handler
  children?: HTMLElement[];     // Child elements (icons, etc.)
};
```

## Example Usage

### Basic Button

```typescript
import { button } from '@/elements/button';

// Simple primary button
const btn = button({
  label: 'Click me',
  onClick: () => console.log('Button clicked!')
});
```

### Variants

```typescript
// Primary button (default)
const primaryBtn = button({
  label: 'Primary',
  variant: 'primary'
});

// Secondary button
const secondaryBtn = button({
  label: 'Secondary',
  variant: 'secondary'
});

// Success button
const successBtn = button({
  label: 'Success',
  variant: 'success'
});

// Error button
const errorBtn = button({
  label: 'Delete',
  variant: 'error'
});

// Warning button
const warningBtn = button({
  label: 'Warning',
  variant: 'warning'
});

// Info button
const infoBtn = button({
  label: 'Info',
  variant: 'info'
});

// Ghost button (transparent background with border)
const ghostBtn = button({
  label: 'Ghost',
  variant: 'ghost'
});
```

### Sizes

```typescript
// Small button
const smallBtn = button({
  label: 'Small',
  size: 'sm'
});

// Medium button (default)
const mediumBtn = button({
  label: 'Medium',
  size: 'md'
});

// Large button
const largeBtn = button({
  label: 'Large',
  size: 'lg'
});
```

### States

```typescript
// Disabled button
const disabledBtn = button({
  label: 'Disabled',
  disabled: true
});

// Full width button
const fullWidthBtn = button({
  label: 'Full Width',
  fullWidth: true
});
```

### With Children (Icon Buttons)

```typescript
import { tag } from '@/elements/_base';

// Button with icon and text
const iconBtn = button({
  label: 'Download',
  children: [
    tag.span({ textContent: '📥' })
  ]
});

// Icon-only button (no label)
const iconOnlyBtn = button({
  children: [
    tag.span({ textContent: '⚙️' })
  ],
  size: 'sm',
  variant: 'ghost'
});
```

### Complete Example

```typescript
import { button } from '@/elements/button';
import { $signal } from '@/core/signal';
import { tag } from '@/elements/_base';

// Reactive button with state
const counter = $signal(0);

const incrementBtn = button({
  label: 'Increment',
  variant: 'primary',
  size: 'md',
  onClick: () => counter.update(c => c + 1)
});

const resetBtn = button({
  label: 'Reset',
  variant: 'secondary',
  size: 'md',
  onClick: () => counter.set(0)
});

const container = tag.div(
  tag.p(() => `Count: ${counter.value}`),
  incrementBtn,
  resetBtn
);
```

## Features

- **Theming**: Fully integrated with the OEM theme system using design tokens
- **Variants**: 7 built-in color variants for different use cases
- **Sizes**: Three size options (small, medium, large)
- **Interactive States**: Automatic hover, active, and focus states
- **Disabled State**: Proper visual feedback and interaction blocking
- **Full Width**: Option to stretch button to container width
- **Accessibility**: Proper disabled attribute and cursor states
- **Children Support**: Add icons or other elements inside buttons
- **Smooth Animations**: Built-in transitions for state changes
