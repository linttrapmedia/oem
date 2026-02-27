---
name: Data File
description: How to define and organize static data in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Data File

## What This File Is

`data.ts` is the single file (or `data/` folder) containing static data used in the application. This is data that is known at build time, does not change at runtime, and does not need to trigger re-renders.

## Why It Must Be Its Own File

Static data (dropdown options, navigation items, static content) is referenced by UI code but is conceptually separate from both the UI structure and the reactive state. Isolating it makes it easy to update content without touching logic, and gives LLMs a clear place to look for reference data.

## When to Create

Create `data.ts` when the application has any static data sets — lists, lookup tables, menu items, or content that is hardcoded rather than fetched.

## When to Use

- **When rendering static lists**: Import data arrays and `.map()` over them in `trait.innerHTML`.
- **When populating dropdowns or menus**: Import option arrays from this file.
- **When displaying static content**: Import text blocks or structured content objects.

## What Belongs Here

- Arrays of options for dropdowns, radio groups, or select menus
- Navigation item definitions (label + route)
- Static content strings or structured content objects
- Lookup tables and mappings
- Seed data or default data sets

## What Does NOT Belong Here

- Data fetched from an API at runtime (that goes into State objects in `states.ts`)
- Reactive values (those go in `states.ts`)
- Configuration settings (those go in `config.ts`)
- Single constant values (those go in `constants.ts`)

## Example

```typescript
// data.ts

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
] as const;

export const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
] as const;

export const defaultTodos = [
  { id: '1', text: 'Learn OEM', completed: false },
  { id: '2', text: 'Build an app', completed: false },
];
```

## Rules

1. **One file for all static data.** Only split into a folder if the file grows unmanageable.
2. **Use `as const`** for arrays and objects that should have literal types.
3. **No runtime logic.** This file only contains data declarations.
4. **No reactive values.** If data changes at runtime, it belongs in `states.ts`.
5. **Keep data flat and simple.** Complex nested structures are harder for LLMs to parse.
