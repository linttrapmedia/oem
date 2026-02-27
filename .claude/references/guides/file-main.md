---
name: Main File
description: How to structure the application entry point in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Main File

## What This File Is

`main.ts` is the single entry point of the OEM application. It is the file that gets loaded by the HTML page's `<script>` tag. Its job is to initialize the application — wire the UI into the DOM and perform any one-time setup.

## Why It Must Be Its Own File

The entry point is the only file with side effects on import (it mounts the UI to the DOM). Keeping it minimal and separate ensures that all other files are pure and importable without side effects, which makes them testable and reusable.

## When to Create

Create `main.ts` as one of the first files in any new OEM application.

## When to Use

- **When starting the application**: This is what the browser loads.
- **When changing initialization logic**: Edit this file to modify what happens on app startup.
- **When adding global setup**: One-time side effects (loading from localStorage, adding global event listeners) go here.

## What Belongs Here

- Importing the root UI element from `ui.ts`
- Mounting the UI to the DOM via `tag.$(document.body)(...)` or `document.body.appendChild(...)`
- One-time initialization (loading persisted state from localStorage, setting initial theme, etc.)
- Global event listeners that don't belong to a specific element

## What Does NOT Belong Here

- State definitions (those go in `states.ts`)
- UI construction (that goes in `ui.ts`)
- Token definitions (those go in `theme.ts`)
- Template definitions (those go in `templates.ts`)
- Machine logic (that goes in `machines.ts`)

## Example

```typescript
// main.ts
import { tag, trait } from './templates';
import { app } from './ui';
import { todos } from './states';
import { STORAGE_KEY } from './constants';

// Load persisted state
const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  try {
    todos.set(JSON.parse(saved));
  } catch {
    // ignore invalid data
  }
}

// Persist state on changes
todos.sub((value) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
});

// Mount the app
tag.$(document.body)(
  trait.style('margin', '0'),
  trait.style('fontFamily', 'system-ui, sans-serif'),
  app,
);
```

## HTML Integration

The HTML file simply loads the entry point:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>
  <body>
    <script type="module" src="./main.ts"></script>
  </body>
</html>
```

## Rules

1. **One entry point per app.** There is exactly one `main.ts`.
2. **Keep it minimal.** Import, initialize, mount — nothing more.
3. **No UI construction.** The DOM tree is built in `ui.ts` and imported here.
4. **Side effects are OK here** — this is the only file where side effects on import are expected.
5. **Global listeners go here** — if a listener doesn't belong to a specific element (e.g., `window.onbeforeunload`), attach it in `main.ts`.
