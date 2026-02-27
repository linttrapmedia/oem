---
name: useThemeState
description: A simple State object of 'light' and 'dark'
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# ThemeState

A small state hook for managing the current theme as a reactive `State` value.

## Features

- **Typed themes**: Constrains the theme to `'light'` or `'dark'`
- **Reactive**: Returns a `State` object that can be observed or updated
- **Minimal**: No side effects, no DOM reads, no global listeners

## Usage

```typescript
import { useThemeState } from '@/registry';

const theme = useThemeState('light');

// Read the current theme
const current = theme.val();

// Update the theme
theme.set('dark');
```

## Signature

```typescript
type Theme = 'light' | 'dark';

function useThemeState(theme: Theme): State<Theme>;
```

## Parameters

| Parameter | Type    | Default | Description                                 |
| --------- | ------- | ------- | ------------------------------------------- |
| `theme`   | `Theme` | —       | Initial theme value (`'light'` or `'dark'`) |

## Return Value

Returns a `State<Theme>` representing the current theme.

## Behavior

- Initializes with the provided theme value
- Updates whenever `set()` is called
- Subscribers receive the latest theme value

## Notes

- This hook does not persist to storage or read from the DOM
- Intended to be composed with other reactive state hooks
