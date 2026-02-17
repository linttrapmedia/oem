---
name: toggle
description: A switch/toggle input component for binary on/off states. Supports multiple sizes, colors, disabled state, and labels.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Toggle Component

The `toggle` function creates an animated switch element for toggling between on and off states with smooth transitions and theming support.

## Props

```typescript
type ToggleProps = {
  checked?: boolean;               // Checked state
  size?: 'sm' | 'md' | 'lg';
  color?: ColorToken;              // Active color
  disabled?: boolean;              // Disabled state
  label?: string;                  // Optional label text
  onChange?: (checked: boolean) => void;  // Change handler
};
```

## Example Usage

### Basic Toggle

```typescript
import { toggle } from '@/elements/toggle';

// Simple toggle
const switch = toggle({
  checked: false
});
```

### With Label

```typescript
// Toggle with label
const labeledToggle = toggle({
  checked: false,
  label: 'Enable notifications'
});
```

### Sizes

```typescript
// Small (32x18px)
const smallToggle = toggle({
  size: 'sm',
  label: 'Small'
});

// Medium (44x24px - default)
const mediumToggle = toggle({
  size: 'md',
  label: 'Medium'
});

// Large (56x32px)
const largeToggle = toggle({
  size: 'lg',
  label: 'Large'
});
```

### Checked State

```typescript
// Initially checked
const checkedToggle = toggle({
  checked: true,
  label: 'Auto-save enabled'
});

// Initially unchecked
const uncheckedToggle = toggle({
  checked: false,
  label: 'Dark mode'
});
```

### Colors

```typescript
// Primary color (default)
const primaryToggle = toggle({
  checked: true,
  color: 'primary',
  label: 'Primary'
});

// Success color
const successToggle = toggle({
  checked: true,
  color: 'success',
  label: 'Completed'
});

// Warning color
const warningToggle = toggle({
  checked: true,
  color: 'warning',
  label: 'Warning'
});

// Error color
const errorToggle = toggle({
  checked: true,
  color: 'error',
  label: 'Critical'
});
```

### Disabled State

```typescript
// Disabled unchecked
const disabledUnchecked = toggle({
  checked: false,
  disabled: true,
  label: 'Disabled option'
});

// Disabled checked
const disabledChecked = toggle({
  checked: true,
  disabled: true,
  label: 'Cannot toggle'
});
```

### With Change Handler

```typescript
import { $signal } from '@/core/signal';

// Reactive toggle
const notificationsEnabled = $signal(false);

const notificationToggle = toggle({
  checked: notificationsEnabled.value,
  label: 'Push notifications',
  onChange: (checked) => {
    notificationsEnabled.set(checked);
    console.log('Notifications:', checked ? 'enabled' : 'disabled');
  }
});
```

### Complete Example

```typescript
import { toggle } from '@/elements/toggle';
import { stack } from '@/elements/stack';
import { heading } from '@/elements/heading';
import { text } from '@/elements/text';
import { divider } from '@/elements/divider';
import { $signal } from '@/core/signal';

// Settings panel
const settings = $signal({
  notifications: true,
  darkMode: false,
  autoSave: true,
  sounds: false
});

const settingsPanel = stack({
  spacing: 'lg',
  children: [
    heading({
      content: 'Settings',
      level: 3
    }),

    divider(),

    stack({
      spacing: 'md',
      children: [
        toggle({
          checked: settings.value.notifications,
          label: 'Push Notifications',
          size: 'md',
          onChange: (checked) => {
            settings.update(s => ({ ...s, notifications: checked }));
          }
        }),

        toggle({
          checked: settings.value.darkMode,
          label: 'Dark Mode',
          size: 'md',
          onChange: (checked) => {
            settings.update(s => ({ ...s, darkMode: checked }));
          }
        }),

        toggle({
          checked: settings.value.autoSave,
          label: 'Auto-save',
          size: 'md',
          onChange: (checked) => {
            settings.update(s => ({ ...s, autoSave: checked }));
          }
        }),

        toggle({
          checked: settings.value.sounds,
          label: 'Sound Effects',
          size: 'md',
          onChange: (checked) => {
            settings.update(s => ({ ...s, sounds: checked }));
          }
        })
      ]
    })
  ]
});

// Feature toggles with descriptions
const featureFlags = $signal({
  betaFeatures: false,
  analytics: true
});

const featurePanel = stack({
  spacing: 'lg',
  children: [
    // Beta Features
    stack({
      spacing: 'xs',
      children: [
        toggle({
          checked: featureFlags.value.betaFeatures,
          label: 'Beta Features',
          color: 'warning',
          onChange: (checked) => {
            featureFlags.update(f => ({ ...f, betaFeatures: checked }));
          }
        }),
        text({
          content: 'Enable experimental features that are still in testing',
          size: 'sm',
          color: 'textSecondary'
        })
      ]
    }),

    // Analytics
    stack({
      spacing: 'xs',
      children: [
        toggle({
          checked: featureFlags.value.analytics,
          label: 'Analytics',
          onChange: (checked) => {
            featureFlags.update(f => ({ ...f, analytics: checked }));
          }
        }),
        text({
          content: 'Help us improve by sharing anonymous usage data',
          size: 'sm',
          color: 'textSecondary'
        })
      ]
    })
  ]
});

// Permission toggles
const permissions = $signal({
  camera: false,
  microphone: false,
  location: true
});

const permissionsPanel = stack({
  spacing: 'lg',
  children: [
    heading({
      content: 'Permissions',
      level: 4
    }),

    stack({
      spacing: 'md',
      children: [
        toggle({
          checked: permissions.value.camera,
          label: 'Camera Access',
          size: 'lg',
          onChange: (checked) => {
            permissions.update(p => ({ ...p, camera: checked }));
          }
        }),

        toggle({
          checked: permissions.value.microphone,
          label: 'Microphone Access',
          size: 'lg',
          onChange: (checked) => {
            permissions.update(p => ({ ...p, microphone: checked }));
          }
        }),

        toggle({
          checked: permissions.value.location,
          label: 'Location Access',
          size: 'lg',
          color: 'success',
          onChange: (checked) => {
            permissions.update(p => ({ ...p, location: checked }));
          }
        })
      ]
    })
  ]
});

// Conditional features
const isPremium = $signal(false);
const advancedMode = $signal(false);

const conditionalToggle = stack({
  spacing: 'md',
  children: [
    toggle({
      checked: advancedMode.value,
      label: 'Advanced Mode',
      disabled: !isPremium.value,
      onChange: (checked) => advancedMode.set(checked)
    }),

    !isPremium.value
      ? text({
          content: 'Upgrade to Premium to access advanced features',
          size: 'sm',
          color: 'warning'
        })
      : null
  ].filter(Boolean)
});
```

## Features

- **Animated Switch**: Smooth thumb sliding animation
- **Three Sizes**: Small, medium, and large variants
- **Custom Colors**: Any design token color when active
- **Label Support**: Optional text label with proper spacing
- **Checked State**: Control initial and reactive checked state
- **Disabled State**: Proper visual feedback and interaction blocking
- **Change Handler**: Callback receives new checked state
- **Smooth Transitions**: All state changes are animated
- **Circular Thumb**: White thumb with shadow for depth
- **Theme Integration**: Uses design tokens for colors and spacing
- **Accessibility**: Hidden checkbox for screen readers
- **Cursor States**: Pointer cursor when enabled, not-allowed when disabled
