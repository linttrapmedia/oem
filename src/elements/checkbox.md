---
name: checkbox
description: A reactive checkbox input component with label support. Supports multiple sizes, disabled state, and change handlers.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Checkbox Component

The `checkbox` function creates a styled checkbox input element with optional label, theming support, and reactive state handling.

## Props

```typescript
type CheckboxProps = {
  checked?: boolean;               // Checked state
  size?: 'sm' | 'md' | 'lg';      // Checkbox size
  disabled?: boolean;              // Disabled state
  label?: string;                  // Optional label text
  onChange?: (checked: boolean) => void;  // Change handler
};
```

## Example Usage

### Basic Checkbox

```typescript
import { checkbox } from '@/elements/checkbox';

// Simple checkbox
const check = checkbox({
  checked: false
});
```

### With Label

```typescript
// Checkbox with label
const labeledCheck = checkbox({
  checked: false,
  label: 'Accept terms and conditions'
});
```

### Sizes

```typescript
// Small (16px)
const smallCheck = checkbox({
  size: 'sm',
  label: 'Small'
});

// Medium (20px - default)
const mediumCheck = checkbox({
  size: 'md',
  label: 'Medium'
});

// Large (24px)
const largeCheck = checkbox({
  size: 'lg',
  label: 'Large'
});
```

### Checked State

```typescript
// Initially checked
const checkedBox = checkbox({
  checked: true,
  label: 'Subscribe to newsletter'
});

// Initially unchecked
const uncheckedBox = checkbox({
  checked: false,
  label: 'Receive updates'
});
```

### Disabled State

```typescript
// Disabled unchecked
const disabledUnchecked = checkbox({
  checked: false,
  disabled: true,
  label: 'Disabled option'
});

// Disabled checked
const disabledChecked = checkbox({
  checked: true,
  disabled: true,
  label: 'Cannot uncheck'
});
```

### With Change Handler

```typescript
import { $signal } from '@/core/signal';

// Reactive checkbox
const isAccepted = $signal(false);

const acceptCheck = checkbox({
  checked: isAccepted.value,
  label: 'I accept the terms',
  onChange: (checked) => {
    isAccepted.set(checked);
    console.log('Checkbox changed:', checked);
  }
});
```

### Complete Example

```typescript
import { checkbox } from '@/elements/checkbox';
import { stack } from '@/elements/stack';
import { button } from '@/elements/button';
import { $signal } from '@/core/signal';

// Multi-checkbox form
const preferences = $signal({
  email: true,
  sms: false,
  push: false
});

const preferencesForm = stack({
  spacing: 'md',
  children: [
    checkbox({
      checked: preferences.value.email,
      label: 'Email notifications',
      onChange: (checked) => {
        preferences.update(p => ({ ...p, email: checked }));
      }
    }),
    checkbox({
      checked: preferences.value.sms,
      label: 'SMS notifications',
      onChange: (checked) => {
        preferences.update(p => ({ ...p, sms: checked }));
      }
    }),
    checkbox({
      checked: preferences.value.push,
      label: 'Push notifications',
      onChange: (checked) => {
        preferences.update(p => ({ ...p, push: checked }));
      }
    }),
    button({
      label: 'Save Preferences',
      onClick: () => {
        console.log('Saving:', preferences.value);
      }
    })
  ]
});

// Checkbox list
const options = ['Option 1', 'Option 2', 'Option 3'];
const selected = $signal<string[]>([]);

const checkboxList = stack({
  spacing: 'sm',
  children: options.map(option =>
    checkbox({
      checked: selected.value.includes(option),
      label: option,
      onChange: (checked) => {
        if (checked) {
          selected.update(s => [...s, option]);
        } else {
          selected.update(s => s.filter(o => o !== option));
        }
      }
    })
  )
});
```

## Features

- **Label Support**: Optional text label with proper spacing
- **Three Sizes**: Small, medium, and large variants
- **Checked State**: Control initial and reactive checked state
- **Disabled State**: Proper visual feedback and interaction blocking
- **Change Handler**: Callback receives new checked state
- **Theme Colors**: Uses primary color from theme system
- **Accessibility**: Native checkbox input for screen readers
- **Cursor States**: Pointer cursor when enabled, not-allowed when disabled
- **Label Positioning**: Label appears after checkbox with proper alignment
- **Standalone Mode**: Can be used without label for compact layouts
