---
name: useTokenState
description: A simple State object to manage a single design token setting
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# TokenState

A derived state hook that selects between two token values based on the current theme.

## Features

- **Theme-aware**: Switches between light and dark values
- **Derived state**: Recomputes when the theme state changes
- **Generic**: Works with any token value type

## Usage

```typescript
import { useThemeState, useTokenState } from '@/registry';

const theme = useThemeState('light');
const primaryColor = useTokenState('#111827', '#f9fafb', theme);

// Read the current token value
const color = primaryColor.val();

// Switch theme and let token update
theme.set('dark');
```

## Signature

```typescript
function useTokenState<T>(lightVal: T, darkVal: T, themeState: StateType<Theme, {}>): State<T>;
```

## Parameters

| Parameter    | Type                   | Default | Description                                 |
| ------------ | ---------------------- | ------- | ------------------------------------------- |
| `lightVal`   | `T`                    | —       | Token value for the light theme             |
| `darkVal`    | `T`                    | —       | Token value for the dark theme              |
| `themeState` | `StateType<Theme, {}>` | —       | Theme state used to select the active token |

## Return Value

Returns a `State<T>` whose value updates when the theme changes.

## Behavior

- Initializes to `lightVal` or `darkVal` based on `themeState.val()`
- Subscribes to `themeState` and updates the token whenever the theme changes

## Common Patterns

```typescript
const theme = useThemeState('light');
const textColor = useTokenState('#111', '#eee', theme);
const bgColor = useTokenState('#fff', '#0b0f1a', theme);
```

## Notes

- The subscription remains active as long as `themeState` exists
- Ensure the `themeState` is shared across tokens to keep updates consistent
