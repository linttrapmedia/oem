---
name: Constants File
description: How to define and organize constant values in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Constants File

## What This File Is

`constants.ts` is the single file (or `constants/` folder) containing all fixed, immutable values used throughout the application. These are values that are truly constant — they never change at runtime and do not need to trigger re-renders.

## Why It Must Be Its Own File

Constants are referenced across multiple files (states, machines, UI, config). Centralizing them prevents magic literals scattered throughout the codebase and gives LLMs a single place to look up fixed values.

## When to Create

Create `constants.ts` when the application has any fixed values that are used in more than one place, or any value that should be named for clarity rather than inlined as a literal.

## When to Use

- **When writing state or machine logic**: Import constants instead of using magic strings or numbers.
- **When adding API calls**: Define endpoint URLs here.
- **When defining enums or fixed option sets**: Place them here if they don't need to be reactive.

## What Belongs Here

- API endpoint URLs
- Fixed configuration values (timeouts, limits, thresholds)
- Enum-like objects or frozen arrays
- Key names, storage keys, event names
- Any literal value used in more than one place

## What Does NOT Belong Here

- Reactive values (those are State objects in `states.ts`)
- Design tokens (those go in `theme.ts`)
- Environment-dependent settings (those go in `config.ts`)
- Type definitions (those go in `types.ts`)

## Example

```typescript
// constants.ts

export const API_BASE_URL = 'https://api.example.com/v1';
export const MAX_TODOS = 100;
export const STORAGE_KEY = 'todo-app-state';
export const DEBOUNCE_MS = 300;

export const FILTER_OPTIONS = ['all', 'active', 'completed'] as const;

export const KEYBOARD = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
} as const;
```

## Rules

1. **One file for all constants.** Only split into a folder if the file grows unmanageable.
2. **Use UPPER_SNAKE_CASE** for primitive constants and PascalCase or UPPER_SNAKE_CASE for object constants.
3. **Use `as const`** for literal types — this gives TypeScript the narrowest possible type.
4. **No runtime logic.** This file only contains value declarations.
5. **No reactive values.** If a value needs to trigger UI updates when it changes, it belongs in `states.ts`.
