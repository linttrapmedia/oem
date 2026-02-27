---
name: Templates File
description: How to define and organize Template instances in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Templates File

## What This File Is

`templates.ts` is the single file (or `templates/` folder) containing all `Template()` definitions for the application. Each `Template()` call creates a `[tag, trait]` pair — a custom template engine configured with a specific set of traits.

## Why It Must Be Its Own File

Templates are the bridge between OEM's trait system and the UI. They define _which_ traits are available in each part of the app. Centralizing template definitions makes it easy to see what capabilities each template has and ensures consistent trait naming across the application.

## When to Create

Create `templates.ts` at the start of any new OEM application, immediately after deciding which traits the app needs.

## When to Use

- **When writing UI code**: Import `[tag, trait]` from this file.
- **When adding new traits**: Register them in the appropriate Template definition here.
- **When starting a new view or module**: Decide whether to use an existing template or create a new one.

## What Belongs Here

- All `Template()` calls and their destructured `[tag, trait]` exports
- Imports of built-in traits from `@linttrap/oem`
- Imports of custom traits from `traits.ts`

## What Does NOT Belong Here

- Trait implementations (those go in `traits.ts` for custom traits, or come from `@linttrap/oem`)
- UI rendering code (that goes in `ui.ts`)
- State definitions (those go in `states.ts`)

## Example

```typescript
// templates.ts
import {
  Template,
  useStyleTrait,
  useStyleOnEventTrait,
  useEventTrait,
  useTextContentTrait,
  useAttributeTrait,
  useClassNameTrait,
  useInnerHTMLTrait,
  useInputValueTrait,
  useInputEventTrait,
  useFocusTrait,
} from '@linttrap/oem';

export const [tag, trait] = Template({
  style: useStyleTrait,
  styleOnEvent: useStyleOnEventTrait,
  event: useEventTrait,
  text: useTextContentTrait,
  attr: useAttributeTrait,
  className: useClassNameTrait,
  innerHTML: useInnerHTMLTrait,
  inputValue: useInputValueTrait,
  inputEvent: useInputEventTrait,
  focus: useFocusTrait,
});
```

## Multiple Templates

Most applications need only one template. Create additional templates only when different parts of the app need different trait sets (e.g., an SVG-heavy section that needs specialized traits):

```typescript
// A second template with a subset of traits
export const [svgTag, svgTrait] = Template({
  style: useStyleTrait,
  attr: useAttributeTrait,
  event: useEventTrait,
});
```

## Rules

1. **One file for all templates.** Only split into a folder if the file grows unmanageable.
2. **Most apps need exactly one template.** Don't create multiple unless there's a clear reason.
3. **Name trait keys consistently** across templates — `style`, `event`, `text`, `attr`, etc.
4. **Import traits, don't define them here.** This file wires traits together, it doesn't implement them.
5. **Export `[tag, trait]`** so UI files can import them directly.
