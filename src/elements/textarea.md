---
name: textarea
description: A multi-line text input component with multiple variants, sizes, and states. Supports resize control, validation states, and event handlers.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Textarea Component

The `textarea` function creates a styled multi-line text input element with variants, sizes, resize options, and comprehensive state management.

## Props

```typescript
type TextareaProps = {
  value?: string;                  // Textarea value
  placeholder?: string;            // Placeholder text
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'flushed';
  rows?: number;                   // Number of visible rows
  disabled?: boolean;              // Disabled state
  readOnly?: boolean;              // Read-only state
  required?: boolean;              // Required field
  fullWidth?: boolean;             // Stretch to full width
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  error?: boolean;                 // Error state
  onInput?: (value: string) => void;   // Input event handler
  onChange?: (value: string) => void;  // Change event handler
  onFocus?: () => void;            // Focus event handler
  onBlur?: () => void;             // Blur event handler
};
```

## Example Usage

### Basic Textarea

```typescript
import { textarea } from '@/elements/textarea';

// Simple textarea
const commentBox = textarea({
  placeholder: 'Enter your comment'
});
```

### Variants

```typescript
// Outline (default) - with border
const outlineTextarea = textarea({
  variant: 'outline',
  placeholder: 'Outline variant'
});

// Filled - colored background
const filledTextarea = textarea({
  variant: 'filled',
  placeholder: 'Filled variant'
});

// Flushed - bottom border only
const flushedTextarea = textarea({
  variant: 'flushed',
  placeholder: 'Flushed variant'
});
```

### Sizes

```typescript
// Small
const smallTextarea = textarea({
  size: 'sm',
  placeholder: 'Small textarea'
});

// Medium (default)
const mediumTextarea = textarea({
  size: 'md',
  placeholder: 'Medium textarea'
});

// Large
const largeTextarea = textarea({
  size: 'lg',
  placeholder: 'Large textarea'
});
```

### Rows

```typescript
// Default rows (4)
const defaultRows = textarea({
  placeholder: '4 rows (default)'
});

// Custom rows
const customRows = textarea({
  rows: 8,
  placeholder: '8 rows'
});

// Compact
const compact = textarea({
  rows: 2,
  placeholder: '2 rows'
});
```

### Resize Control

```typescript
// Vertical resize (default)
const verticalResize = textarea({
  resize: 'vertical',
  placeholder: 'Resize vertically only'
});

// No resize
const noResize = textarea({
  resize: 'none',
  placeholder: 'Cannot be resized'
});

// Horizontal resize
const horizontalResize = textarea({
  resize: 'horizontal',
  placeholder: 'Resize horizontally only'
});

// Both directions
const bothResize = textarea({
  resize: 'both',
  placeholder: 'Resize in any direction'
});
```

### States

```typescript
// Disabled
const disabledTextarea = textarea({
  disabled: true,
  placeholder: 'Disabled textarea'
});

// Read-only
const readOnlyTextarea = textarea({
  value: 'This text cannot be edited',
  readOnly: true
});

// Required
const requiredTextarea = textarea({
  required: true,
  placeholder: 'Required field'
});

// Error state
const errorTextarea = textarea({
  error: true,
  placeholder: 'Invalid input',
  value: 'This content has errors'
});

// Full width
const fullWidthTextarea = textarea({
  fullWidth: true,
  placeholder: 'Full width textarea'
});
```

### With Event Handlers

```typescript
import { $signal } from '@/core/signal';

// Reactive textarea
const comment = $signal('');
const charCount = $signal(0);

const commentBox = textarea({
  value: comment.value,
  placeholder: 'Write your comment...',
  rows: 6,
  fullWidth: true,
  onInput: (value) => {
    comment.set(value);
    charCount.set(value.length);
  }
});
```

### Complete Example

```typescript
import { textarea } from '@/elements/textarea';
import { label } from '@/elements/label';
import { text } from '@/elements/text';
import { stack } from '@/elements/stack';
import { row } from '@/elements/row';
import { button } from '@/elements/button';
import { $signal } from '@/core/signal';

// Feedback form
const feedback = $signal('');
const charLimit = 500;
const errorMsg = $signal('');

const feedbackForm = stack({
  spacing: 'md',
  children: [
    label({
      content: 'Your Feedback',
      required: true
    }),

    textarea({
      value: feedback.value,
      placeholder: 'Tell us what you think...',
      rows: 6,
      fullWidth: true,
      error: errorMsg.value.length > 0,
      onInput: (value) => {
        feedback.set(value);
        if (value.length > charLimit) {
          errorMsg.set(`Maximum ${charLimit} characters allowed`);
        } else {
          errorMsg.set('');
        }
      }
    }),

    row({
      justify: 'space-between',
      children: [
        text({
          content: () => `${feedback.value.length}/${charLimit}`,
          size: 'sm',
          color: () => feedback.value.length > charLimit ? 'error' : 'textSecondary'
        }),
        errorMsg.value
          ? text({
              content: errorMsg.value,
              size: 'sm',
              color: 'error'
            })
          : null
      ].filter(Boolean)
    }),

    button({
      label: 'Submit Feedback',
      variant: 'primary',
      disabled: () => !feedback.value || feedback.value.length > charLimit,
      onClick: () => {
        console.log('Feedback submitted:', feedback.value);
        feedback.set('');
      }
    })
  ]
});

// Message composer
const message = $signal('');

const composer = stack({
  spacing: 'sm',
  children: [
    textarea({
      value: message.value,
      placeholder: 'Type your message...',
      rows: 4,
      fullWidth: true,
      resize: 'none',
      onInput: (value) => message.set(value)
    }),

    row({
      justify: 'flex-end',
      spacing: 'sm',
      children: [
        button({
          label: 'Cancel',
          variant: 'ghost',
          onClick: () => message.set('')
        }),
        button({
          label: 'Send',
          variant: 'primary',
          disabled: () => !message.value.trim(),
          onClick: () => {
            console.log('Sending:', message.value);
            message.set('');
          }
        })
      ]
    })
  ]
});

// Note editor
const note = $signal('');
const lastSaved = $signal<Date | null>(null);

const noteEditor = stack({
  spacing: 'md',
  children: [
    row({
      justify: 'space-between',
      align: 'center',
      children: [
        label({ content: 'Notes' }),
        lastSaved.value
          ? text({
              content: `Saved at ${lastSaved.value.toLocaleTimeString()}`,
              size: 'sm',
              color: 'textSecondary'
            })
          : null
      ].filter(Boolean)
    }),

    textarea({
      value: note.value,
      placeholder: 'Write your notes here...',
      rows: 12,
      fullWidth: true,
      variant: 'filled',
      onInput: (value) => note.set(value),
      onBlur: () => {
        // Auto-save on blur
        lastSaved.set(new Date());
        console.log('Auto-saved:', note.value);
      }
    })
  ]
});

// Review form
const review = $signal('');
const minLength = 50;

const reviewForm = stack({
  spacing: 'md',
  children: [
    label({
      content: 'Write Your Review',
      required: true
    }),

    textarea({
      value: review.value,
      placeholder: `Please write at least ${minLength} characters...`,
      rows: 8,
      fullWidth: true,
      error: review.value.length > 0 && review.value.length < minLength,
      onInput: (value) => review.set(value)
    }),

    text({
      content: () => {
        const remaining = minLength - review.value.length;
        if (remaining > 0) {
          return `${remaining} more characters required`;
        }
        return 'Looks good!';
      },
      size: 'sm',
      color: () => review.value.length >= minLength ? 'success' : 'textSecondary'
    }),

    button({
      label: 'Submit Review',
      variant: 'primary',
      fullWidth: true,
      disabled: () => review.value.length < minLength,
      onClick: () => {
        console.log('Review submitted:', review.value);
      }
    })
  ]
});
```

## Features

- **Three Variants**: Outline, filled, and flushed styles
- **Three Sizes**: Small, medium, and large options
- **Row Control**: Set number of visible rows
- **Resize Options**: None, vertical, horizontal, or both
- **State Management**: Disabled, read-only, required, and error states
- **Full Width**: Optional full-width mode for layouts
- **Event Handlers**: onInput, onChange, onFocus, and onBlur
- **Error State**: Visual feedback for validation errors
- **Interactive States**: Hover, focus with smooth transitions
- **Theme Integration**: Full design token support
- **Accessibility**: Proper textarea attributes and states
- **Multi-line**: Native multi-line text input
