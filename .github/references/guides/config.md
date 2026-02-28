---
name: Config File
description: How to define and organize environment-aware configuration settings in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Config File

## What This File Is

`config.ts` is the single file (or `config/` folder) containing environment-aware configuration settings for the application. These are values that may differ between development, staging, and production environments but do not need to trigger re-renders when they change.

## Why It Must Be Its Own File

Configuration is separate from constants because config values are environment-dependent. Isolating them makes it easy for LLMs and developers to see what can be changed per deployment without touching application logic.

## When to Create

Create `config.ts` when the application has any settings that vary by environment (e.g., API URLs, feature flags, debug toggles).

## When to Use

- **When setting up API calls**: Import the base URL or environment-specific endpoints from config.
- **When toggling features**: Check feature flags defined in config.
- **When deploying**: Review this file to confirm environment-specific settings.

## What Belongs Here

- Environment-specific API URLs
- Feature flags (boolean toggles for unreleased features)
- Debug/logging settings
- Environment detection logic (`isDev`, `isProd`)
- Third-party service keys (non-secret, client-side only)

## What Does NOT Belong Here

- Fixed values that never change per environment (those go in `constants.ts`)
- Reactive values (those go in `states.ts`)
- Design tokens (those go in `theme.ts`)
- Type definitions (those go in `types.ts`)

## Example

```typescript
// config.ts

const ENV = import.meta.env?.MODE ?? 'development';

export const config = {
  isDev: ENV === 'development',
  isProd: ENV === 'production',
  apiBaseUrl: ENV === 'production' ? 'https://api.example.com/v1' : 'http://localhost:3000/v1',
  enableAnalytics: ENV === 'production',
  logLevel: ENV === 'production' ? 'error' : 'debug',
} as const;
```

## Rules

1. **One file for all config.** Only split into a folder if the file grows unmanageable.
2. **Export a single `config` object** or named exports — keep access patterns consistent.
3. **No reactive values.** Config does not trigger re-renders. If it needs to, use a State object in `states.ts`.
4. **No secrets.** Never put API keys, passwords, or tokens in client-side config.
5. **Keep it declarative.** Config should be a set of values, not logic or side effects.
