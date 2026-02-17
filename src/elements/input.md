---
name: input
description: A versatile text input component with multiple types, variants, sizes, and states. Supports validation states, event handlers, and full theming.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Input Component

The `input` function creates a fully-featured text input element with multiple input types, visual variants, sizes, and comprehensive state management.

## Props

```typescript
type InputProps = {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week';
  value?: string;                  // Input value
  placeholder?: string;            // Placeholder text
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'flushed';
  disabled?: boolean;              // Disabled state
  readOnly?: boolean;              // Read-only state
  required?: boolean;              // Required field
  fullWidth?: boolean;             // Stretch to full width
  error?: boolean;                 // Error state
  onInput?: (value: string) => void;   // Input event handler
  onChange?: (value: string) => void;  // Change event handler
  onFocus?: () => void;            // Focus event handler
  onBlur?: () => void;             // Blur event handler
};
```

## Example Usage

### Basic Input

```typescript
import { input } from '@/elements/input';

// Simple text input
const nameInput = input({
  placeholder: 'Enter your name'
});
```

### Input Types

```typescript
// Text (default)
const textInput = input({
  type: 'text',
  placeholder: 'Text input'
});

// Email
const emailInput = input({
  type: 'email',
  placeholder: 'email@example.com'
});

// Password
const passwordInput = input({
  type: 'password',
  placeholder: 'Enter password'
});

// Number
const numberInput = input({
  type: 'number',
  placeholder: '0'
});

// Telephone
const telInput = input({
  type: 'tel',
  placeholder: '+1 (555) 123-4567'
});

// URL
const urlInput = input({
  type: 'url',
  placeholder: 'https://example.com'
});

// Search
const searchInput = input({
  type: 'search',
  placeholder: 'Search...'
});

// Date
const dateInput = input({
  type: 'date'
});
```

### Variants

```typescript
// Outline (default) - with border
const outlineInput = input({
  variant: 'outline',
  placeholder: 'Outline variant'
});

// Filled - colored background
const filledInput = input({
  variant: 'filled',
  placeholder: 'Filled variant'
});

// Flushed - bottom border only
const flushedInput = input({
  variant: 'flushed',
  placeholder: 'Flushed variant'
});
```

### Sizes

```typescript
// Small
const smallInput = input({
  size: 'sm',
  placeholder: 'Small input'
});

// Medium (default)
const mediumInput = input({
  size: 'md',
  placeholder: 'Medium input'
});

// Large
const largeInput = input({
  size: 'lg',
  placeholder: 'Large input'
});
```

### States

```typescript
// Disabled
const disabledInput = input({
  disabled: true,
  placeholder: 'Disabled input'
});

// Read-only
const readOnlyInput = input({
  value: 'Read-only value',
  readOnly: true
});

// Required
const requiredInput = input({
  required: true,
  placeholder: 'Required field'
});

// Error state
const errorInput = input({
  error: true,
  placeholder: 'Invalid input',
  value: 'wrong@value'
});

// Full width
const fullWidthInput = input({
  fullWidth: true,
  placeholder: 'Full width input'
});
```

### With Event Handlers

```typescript
import { $signal } from '@/core/signal';

// Reactive input
const username = $signal('');

const usernameInput = input({
  value: username.value,
  placeholder: 'Username',
  onInput: (value) => {
    username.set(value);
    console.log('Input:', value);
  },
  onChange: (value) => {
    console.log('Changed:', value);
  }
});

// Input with validation
const email = $signal('');
const emailValid = $signal(true);

const emailInput = input({
  type: 'email',
  value: email.value,
  error: !emailValid.value,
  placeholder: 'email@example.com',
  onInput: (value) => {
    email.set(value);
    emailValid.set(value.includes('@'));
  },
  onBlur: () => {
    console.log('Email validation on blur');
  }
});
```

### Complete Example

```typescript
import { input } from '@/elements/input';
import { label } from '@/elements/label';
import { stack } from '@/elements/stack';
import { button } from '@/elements/button';
import { text } from '@/elements/text';
import { $signal } from '@/core/signal';

// Login form
const email = $signal('');
const password = $signal('');
const emailError = $signal(false);

const loginForm = stack({
  spacing: 'md',
  children: [
    // Email field
    stack({
      spacing: 'xs',
      children: [
        label({
          content: 'Email',
          required: true
        }),
        input({
          type: 'email',
          value: email.value,
          placeholder: 'Enter your email',
          fullWidth: true,
          error: emailError.value,
          onInput: (value) => {
            email.set(value);
            emailError.set(value.length > 0 && !value.includes('@'));
          }
        }),
        emailError.value
          ? text({
              content: 'Please enter a valid email',
              color: 'error',
              size: 'sm'
            })
          : null
      ].filter(Boolean)
    }),

    // Password field
    stack({
      spacing: 'xs',
      children: [
        label({
          content: 'Password',
          required: true
        }),
        input({
          type: 'password',
          value: password.value,
          placeholder: 'Enter your password',
          fullWidth: true,
          onInput: (value) => password.set(value)
        })
      ]
    }),

    // Submit button
    button({
      label: 'Sign In',
      variant: 'primary',
      fullWidth: true,
      disabled: () => !email.value || !password.value || emailError.value,
      onClick: () => {
        console.log('Login:', { email: email.value, password: password.value });
      }
    })
  ]
});

// Search bar
const searchTerm = $signal('');

const searchBar = input({
  type: 'search',
  value: searchTerm.value,
  placeholder: 'Search...',
  size: 'lg',
  fullWidth: true,
  onInput: (value) => {
    searchTerm.set(value);
    // Trigger search logic
  }
});
```

## Features

- **Multiple Types**: 13 input types for different data formats
- **Three Variants**: Outline, filled, and flushed styles
- **Three Sizes**: Small, medium, and large options
- **State Management**: Disabled, read-only, required, and error states
- **Full Width**: Optional full-width mode for layouts
- **Event Handlers**: onInput, onChange, onFocus, and onBlur
- **Error State**: Visual feedback for validation errors
- **Interactive States**: Hover, focus with smooth transitions
- **Theme Integration**: Full design token support
- **Accessibility**: Proper input attributes and states
- **Responsive**: Works across screen sizes
