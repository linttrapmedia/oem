---
name: label
description: A form label component with size variants, colors, and required indicator. Associates with form inputs for accessibility.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Label Component

The `label` function creates a semantic form label element with size options, color control, required indicator, and proper form control association.

## Props

```typescript
type LabelProps = {
  content: string;                 // Label text (required)
  htmlFor?: string;                // Associated input ID
  size?: 'sm' | 'md' | 'lg';
  color?: ColorToken;              // Text color
  required?: boolean;              // Show required indicator (*)
  disabled?: boolean;              // Disabled state
  children?: HTMLElement[];        // Additional content
};
```

## Example Usage

### Basic Label

```typescript
import { label } from '@/elements/label';

// Simple label
const fieldLabel = label({
  content: 'Username'
});
```

### Associated with Input

```typescript
import { label } from '@/elements/label';
import { input } from '@/elements/input';
import { stack } from '@/elements/stack';

// Label linked to input
const field = stack({
  spacing: 'xs',
  children: [
    label({
      content: 'Email Address',
      htmlFor: 'email-input'
    }),
    input({
      id: 'email-input',
      type: 'email'
    })
  ]
});
```

### Sizes

```typescript
// Small
const smallLabel = label({
  content: 'Small Label',
  size: 'sm'
});

// Medium (default)
const mediumLabel = label({
  content: 'Medium Label',
  size: 'md'
});

// Large
const largeLabel = label({
  content: 'Large Label',
  size: 'lg'
});
```

### Colors

```typescript
// Primary text color (default)
const defaultLabel = label({
  content: 'Default Color'
});

// Secondary text color
const secondaryLabel = label({
  content: 'Secondary Color',
  color: 'textSecondary'
});

// Custom color
const customLabel = label({
  content: 'Custom Color',
  color: 'primary'
});
```

### Required Indicator

```typescript
// With required asterisk
const requiredLabel = label({
  content: 'Required Field',
  required: true
});
// Displays: "Required Field *"

// Without required indicator
const optionalLabel = label({
  content: 'Optional Field',
  required: false
});
```

### Disabled State

```typescript
// Disabled label
const disabledLabel = label({
  content: 'Disabled Field',
  disabled: true
});
```

### With Children

```typescript
import { tag } from '@/elements/_base';

// Label with additional content
const labelWithIcon = label({
  content: 'Username',
  children: [
    tag.span({
      textContent: ' (required)',
      style: { fontStyle: 'italic', fontSize: '0.875em' }
    })
  ]
});
```

### Complete Example

```typescript
import { label } from '@/elements/label';
import { input } from '@/elements/input';
import { textarea } from '@/elements/textarea';
import { select } from '@/elements/select';
import { stack } from '@/elements/stack';
import { $signal } from '@/core/signal';

// Complete form with labels
const formData = $signal({
  name: '',
  email: '',
  country: '',
  message: ''
});

const contactForm = stack({
  spacing: 'lg',
  children: [
    // Name field
    stack({
      spacing: 'xs',
      children: [
        label({
          content: 'Full Name',
          htmlFor: 'name',
          required: true
        }),
        input({
          id: 'name',
          type: 'text',
          value: formData.value.name,
          fullWidth: true,
          onInput: (value) => formData.update(d => ({ ...d, name: value }))
        })
      ]
    }),

    // Email field
    stack({
      spacing: 'xs',
      children: [
        label({
          content: 'Email Address',
          htmlFor: 'email',
          required: true,
          size: 'md'
        }),
        input({
          id: 'email',
          type: 'email',
          value: formData.value.email,
          fullWidth: true,
          onInput: (value) => formData.update(d => ({ ...d, email: value }))
        })
      ]
    }),

    // Country field
    stack({
      spacing: 'xs',
      children: [
        label({
          content: 'Country',
          htmlFor: 'country',
          required: false,
          color: 'textSecondary'
        }),
        select({
          id: 'country',
          options: [
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' }
          ],
          fullWidth: true,
          onChange: (value) => formData.update(d => ({ ...d, country: value }))
        })
      ]
    }),

    // Message field
    stack({
      spacing: 'xs',
      children: [
        label({
          content: 'Message',
          htmlFor: 'message',
          required: true
        }),
        textarea({
          id: 'message',
          value: formData.value.message,
          rows: 4,
          fullWidth: true,
          onInput: (value) => formData.update(d => ({ ...d, message: value }))
        })
      ]
    })
  ]
});
```

## Features

- **Form Association**: Links to inputs via htmlFor attribute
- **Three Sizes**: Small, medium, and large variants
- **Color Control**: Any design token color
- **Required Indicator**: Automatic red asterisk for required fields
- **Disabled State**: Visual feedback with reduced opacity
- **Theme Integration**: Uses design token typography and colors
- **Cursor States**: Pointer when linked, default otherwise
- **Bottom Margin**: Built-in spacing below label
- **Children Support**: Add additional content or icons
- **Accessibility**: Proper semantic HTML for screen readers
- **Inline Block**: Proper display mode for form layouts
