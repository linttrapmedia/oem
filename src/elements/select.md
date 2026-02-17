---
name: select
description: A styled dropdown select component with multiple variants, sizes, and states. Supports options, placeholders, and validation states.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Select Component

The `select` function creates a fully-styled dropdown select element with custom arrow, multiple variants, sizes, and comprehensive state management.

## Props

```typescript
type SelectProps = {
  options: SelectOption[];        // Options array (required)
  value?: string;                  // Selected value
  placeholder?: string;            // Placeholder text
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'flushed';
  disabled?: boolean;              // Disabled state
  required?: boolean;              // Required field
  fullWidth?: boolean;             // Stretch to full width
  error?: boolean;                 // Error state
  onChange?: (value: string) => void;  // Change handler
};

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;              // Disabled option
};
```

## Example Usage

### Basic Select

```typescript
import { select } from '@/elements/select';

// Simple select
const countrySelect = select({
  options: [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' }
  ]
});
```

### With Placeholder

```typescript
// Select with placeholder
const categorySelect = select({
  placeholder: 'Choose a category',
  options: [
    { value: 'tech', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' }
  ]
});
```

### Variants

```typescript
// Outline (default) - with border
const outlineSelect = select({
  variant: 'outline',
  options: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]
});

// Filled - colored background
const filledSelect = select({
  variant: 'filled',
  options: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]
});

// Flushed - bottom border only
const flushedSelect = select({
  variant: 'flushed',
  options: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]
});
```

### Sizes

```typescript
// Small
const smallSelect = select({
  size: 'sm',
  options: [
    { value: '1', label: 'Small' }
  ]
});

// Medium (default)
const mediumSelect = select({
  size: 'md',
  options: [
    { value: '1', label: 'Medium' }
  ]
});

// Large
const largeSelect = select({
  size: 'lg',
  options: [
    { value: '1', label: 'Large' }
  ]
});
```

### With Selected Value

```typescript
// Pre-selected value
const preselected = select({
  value: 'option2',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]
});
```

### States

```typescript
// Disabled
const disabledSelect = select({
  disabled: true,
  options: [
    { value: '1', label: 'Disabled' }
  ]
});

// Required
const requiredSelect = select({
  required: true,
  placeholder: 'Select an option (required)',
  options: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]
});

// Error state
const errorSelect = select({
  error: true,
  value: 'invalid',
  options: [
    { value: 'valid', label: 'Valid Option' },
    { value: 'invalid', label: 'Invalid Option' }
  ]
});

// Full width
const fullWidthSelect = select({
  fullWidth: true,
  options: [
    { value: '1', label: 'Full Width' }
  ]
});
```

### Disabled Options

```typescript
// Some options disabled
const mixedOptions = select({
  placeholder: 'Choose one',
  options: [
    { value: 'active1', label: 'Active Option 1' },
    { value: 'disabled', label: 'Disabled Option', disabled: true },
    { value: 'active2', label: 'Active Option 2' }
  ]
});
```

### With Change Handler

```typescript
import { $signal } from '@/core/signal';

// Reactive select
const selectedCountry = $signal('');

const countrySelector = select({
  value: selectedCountry.value,
  placeholder: 'Select your country',
  fullWidth: true,
  options: [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' }
  ],
  onChange: (value) => {
    selectedCountry.set(value);
    console.log('Selected country:', value);
  }
});
```

### Complete Example

```typescript
import { select } from '@/elements/select';
import { label } from '@/elements/label';
import { stack } from '@/elements/stack';
import { button } from '@/elements/button';
import { text } from '@/elements/text';
import { $signal } from '@/core/signal';

// Form with multiple selects
const formData = $signal({
  country: '',
  state: '',
  city: ''
});

const locationForm = stack({
  spacing: 'lg',
  children: [
    // Country
    stack({
      spacing: 'xs',
      children: [
        label({
          content: 'Country',
          htmlFor: 'country',
          required: true
        }),
        select({
          id: 'country',
          value: formData.value.country,
          placeholder: 'Select country',
          fullWidth: true,
          options: [
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' }
          ],
          onChange: (value) => {
            formData.update(d => ({ ...d, country: value, state: '', city: '' }));
          }
        })
      ]
    }),

    // State (disabled if no country)
    stack({
      spacing: 'xs',
      children: [
        label({
          content: 'State/Province',
          htmlFor: 'state'
        }),
        select({
          id: 'state',
          value: formData.value.state,
          placeholder: 'Select state',
          fullWidth: true,
          disabled: !formData.value.country,
          options: formData.value.country === 'us'
            ? [
                { value: 'ca', label: 'California' },
                { value: 'ny', label: 'New York' },
                { value: 'tx', label: 'Texas' }
              ]
            : [],
          onChange: (value) => {
            formData.update(d => ({ ...d, state: value, city: '' }));
          }
        })
      ]
    }),

    // Submit button
    button({
      label: 'Continue',
      variant: 'primary',
      fullWidth: true,
      disabled: () => !formData.value.country || !formData.value.state,
      onClick: () => {
        console.log('Form data:', formData.value);
      }
    })
  ]
});

// Priority selector with validation
const priority = $signal('');
const submitted = $signal(false);

const priorityForm = stack({
  spacing: 'md',
  children: [
    label({
      content: 'Priority',
      required: true
    }),
    select({
      value: priority.value,
      placeholder: 'Select priority',
      fullWidth: true,
      error: submitted.value && !priority.value,
      options: [
        { value: 'low', label: 'Low Priority' },
        { value: 'medium', label: 'Medium Priority' },
        { value: 'high', label: 'High Priority' },
        { value: 'critical', label: 'Critical' }
      ],
      onChange: (value) => priority.set(value)
    }),
    submitted.value && !priority.value
      ? text({
          content: 'Please select a priority',
          color: 'error',
          size: 'sm'
        })
      : null,
    button({
      label: 'Submit',
      onClick: () => {
        submitted.set(true);
        if (priority.value) {
          console.log('Submitted with priority:', priority.value);
        }
      }
    })
  ].filter(Boolean)
});
```

## Features

- **Custom Arrow**: SVG dropdown arrow that matches text color
- **Three Variants**: Outline, filled, and flushed styles
- **Three Sizes**: Small, medium, and large options
- **State Management**: Disabled, required, and error states
- **Full Width**: Optional full-width mode for layouts
- **Placeholder**: Optional placeholder option (disabled)
- **Disabled Options**: Individual options can be disabled
- **Change Handler**: Callback receives selected value
- **Interactive States**: Hover, focus with smooth transitions
- **Theme Integration**: Full design token support
- **Error State**: Visual feedback for validation errors
- **Accessibility**: Proper select attributes and states
