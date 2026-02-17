---
name: radio
description: A radio button input component for mutually exclusive selections. Supports multiple sizes, disabled state, labels, and change handlers.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Radio Component

The `radio` function creates a styled radio input element for single-choice selections with optional label, theming support, and reactive state handling.

## Props

```typescript
type RadioProps = {
  name: string;                    // Radio group name (required)
  value: string;                   // Radio value (required)
  checked?: boolean;               // Checked state
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;              // Disabled state
  label?: string;                  // Optional label text
  onChange?: (value: string) => void;  // Change handler
};
```

## Example Usage

### Basic Radio

```typescript
import { radio } from '@/elements/radio';

// Simple radio button
const option1 = radio({
  name: 'choice',
  value: 'option1'
});
```

### Radio Group

```typescript
import { stack } from '@/elements/stack';

// Group of radio buttons (same name)
const radioGroup = stack({
  spacing: 'sm',
  children: [
    radio({
      name: 'plan',
      value: 'free',
      label: 'Free Plan',
      checked: true
    }),
    radio({
      name: 'plan',
      value: 'pro',
      label: 'Pro Plan'
    }),
    radio({
      name: 'plan',
      value: 'enterprise',
      label: 'Enterprise Plan'
    })
  ]
});
```

### Sizes

```typescript
// Small (16px)
const smallRadio = radio({
  name: 'size',
  value: 'small',
  size: 'sm',
  label: 'Small'
});

// Medium (20px - default)
const mediumRadio = radio({
  name: 'size',
  value: 'medium',
  size: 'md',
  label: 'Medium'
});

// Large (24px)
const largeRadio = radio({
  name: 'size',
  value: 'large',
  size: 'lg',
  label: 'Large'
});
```

### With Labels

```typescript
// Radio with label
const labeledRadio = radio({
  name: 'option',
  value: 'yes',
  label: 'Yes, I agree'
});

// Radio without label
const unlabeledRadio = radio({
  name: 'option',
  value: 'no'
});
```

### Checked State

```typescript
// Initially checked
const checkedRadio = radio({
  name: 'default',
  value: 'option1',
  checked: true,
  label: 'Default Option'
});

// Initially unchecked
const uncheckedRadio = radio({
  name: 'default',
  value: 'option2',
  checked: false,
  label: 'Other Option'
});
```

### Disabled State

```typescript
// Disabled unchecked
const disabledUnchecked = radio({
  name: 'disabled',
  value: 'option1',
  disabled: true,
  label: 'Disabled Option'
});

// Disabled checked
const disabledChecked = radio({
  name: 'disabled',
  value: 'option2',
  checked: true,
  disabled: true,
  label: 'Cannot Change'
});
```

### With Change Handler

```typescript
import { $signal } from '@/core/signal';

// Reactive radio group
const selectedPlan = $signal('free');

const planSelector = stack({
  spacing: 'md',
  children: ['free', 'pro', 'enterprise'].map(plan =>
    radio({
      name: 'plan',
      value: plan,
      checked: selectedPlan.value === plan,
      label: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
      onChange: (value) => {
        selectedPlan.set(value);
        console.log('Selected:', value);
      }
    })
  )
});
```

### Complete Example

```typescript
import { radio } from '@/elements/radio';
import { stack } from '@/elements/stack';
import { heading } from '@/elements/heading';
import { text } from '@/elements/text';
import { button } from '@/elements/button';
import { $signal } from '@/core/signal';

// Payment method selector
const paymentMethod = $signal('credit');

const paymentForm = stack({
  spacing: 'lg',
  children: [
    heading({
      content: 'Payment Method',
      level: 3
    }),

    stack({
      spacing: 'md',
      children: [
        radio({
          name: 'payment',
          value: 'credit',
          checked: paymentMethod.value === 'credit',
          label: 'Credit Card',
          size: 'md',
          onChange: (value) => paymentMethod.set(value)
        }),
        radio({
          name: 'payment',
          value: 'debit',
          checked: paymentMethod.value === 'debit',
          label: 'Debit Card',
          size: 'md',
          onChange: (value) => paymentMethod.set(value)
        }),
        radio({
          name: 'payment',
          value: 'paypal',
          checked: paymentMethod.value === 'paypal',
          label: 'PayPal',
          size: 'md',
          onChange: (value) => paymentMethod.set(value)
        }),
        radio({
          name: 'payment',
          value: 'crypto',
          checked: paymentMethod.value === 'crypto',
          label: 'Cryptocurrency',
          size: 'md',
          disabled: true
        })
      ]
    }),

    text({
      content: () => `Selected: ${paymentMethod.value}`,
      color: 'textSecondary',
      size: 'sm'
    }),

    button({
      label: 'Continue',
      variant: 'primary',
      onClick: () => {
        console.log('Processing payment with:', paymentMethod.value);
      }
    })
  ]
});

// Survey question
const satisfaction = $signal<string | null>(null);

const surveyQuestion = stack({
  spacing: 'md',
  children: [
    heading({
      content: 'How satisfied are you with our service?',
      level: 4
    }),
    stack({
      spacing: 'sm',
      children: [
        { value: 'very-satisfied', label: 'Very Satisfied' },
        { value: 'satisfied', label: 'Satisfied' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'dissatisfied', label: 'Dissatisfied' },
        { value: 'very-dissatisfied', label: 'Very Dissatisfied' }
      ].map(option =>
        radio({
          name: 'satisfaction',
          value: option.value,
          checked: satisfaction.value === option.value,
          label: option.label,
          onChange: (value) => satisfaction.set(value)
        })
      )
    })
  ]
});
```

## Features

- **Grouped Selection**: Use same name for mutually exclusive options
- **Label Support**: Optional text label with proper spacing
- **Three Sizes**: Small, medium, and large variants
- **Checked State**: Control initial and reactive checked state
- **Disabled State**: Proper visual feedback and interaction blocking
- **Change Handler**: Callback receives selected value
- **Theme Colors**: Uses primary color from theme system
- **Accessibility**: Native radio input for screen readers
- **Cursor States**: Pointer cursor when enabled, not-allowed when disabled
- **Label Positioning**: Label appears after radio with proper alignment
- **Standalone Mode**: Can be used without label for compact layouts
