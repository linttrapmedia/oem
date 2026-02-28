---
name: Icons File
description: How to define and organize SVG icon functions in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Icons File

## What This File Is

`icons.ts` is the single file (or `icons/` folder) containing all SVG icon functions for the application. Each icon is an exported function that accepts a common `IconProps` argument and returns an `SVGElement`. The file has its own dedicated `Template` instance configured for SVG.

## Why It Must Be Its Own File

Icons are visual primitives referenced by the UI layer but distinct from layout, state, and behavior. Keeping them in a dedicated file makes icons discoverable, reusable, and easy to add or remove without touching UI code. Because SVG elements need `createElementNS` with the SVG namespace, icons use their own `Template` instance with only the traits relevant to SVG — keeping it separate from the main HTML template.

## When to Create

Create `icons.ts` when the application needs any SVG icons. Even a single icon belongs here.

## When to Use

- **When building UI**: Import icon functions into `ui.ts` and call them inline in the element tree.
- **When adding new icons**: Add a new exported function to this file.
- **When an icon needs to change size or color contextually**: Use the `IconProps` argument.

## What Belongs Here

- A dedicated `Template` instance for SVG (at the top of the file)
- The `IconProps` type (or import it from `types.ts`)
- Exported icon functions — one function per icon

## What Does NOT Belong Here

- The main HTML template (that goes in `templates.ts`)
- UI layout or composition (that goes in `ui.ts`)
- Design tokens (those go in `theme.ts`)
- Raster images or external asset URLs

## IconProps

Every icon function accepts the same `IconProps` object so that icons have a consistent API:

```typescript
type IconProps = {
  size?: string; // Width and height (e.g., '24px', '1em'). Defaults to '24px'.
  color?: string; // Fill/stroke color (e.g., 'currentColor', '#333'). Defaults to 'currentColor'.
};
```

Define `IconProps` in `types.ts` if your app already has a types file, or define it locally at the top of `icons.ts`.

## Template Instance

Icons need their own `Template` instance because `tag.svg`, `tag.path`, etc. create SVG-namespaced elements. Only include the traits you actually use on SVG elements — typically `style` and `attr`:

```typescript
import { Template, useStyleTrait, useAttributeTrait } from '@linttrap/oem';

const [svg, svgTrait] = Template({
  style: useStyleTrait,
  attr: useAttributeTrait,
});
```

This template is **private to the icons file** — it is not exported. UI code imports the icon _functions_, not the SVG template.

## Example

```typescript
// icons.ts
import { Template, useStyleTrait, useAttributeTrait } from '@linttrap/oem';

// --- Types ---

type IconProps = {
  size?: string;
  color?: string;
};

// --- SVG Template (private) ---

const [svg, svgTrait] = Template({
  style: useStyleTrait,
  attr: useAttributeTrait,
});

// --- Default props ---

const defaults: Required<IconProps> = {
  size: '24px',
  color: 'currentColor',
};

// --- Icons ---

export function CheckIcon(props: IconProps = {}) {
  const { size, color } = { ...defaults, ...props };
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('xmlns', 'http://www.w3.org/2000/svg'),
    svgTrait.style('width', size),
    svgTrait.style('height', size),
    svg.path(
      svgTrait.attr('d', 'M5 13l4 4L19 7'),
      svgTrait.attr('stroke', color),
      svgTrait.attr('stroke-width', '2'),
      svgTrait.attr('stroke-linecap', 'round'),
      svgTrait.attr('stroke-linejoin', 'round'),
    ),
  );
}

export function TrashIcon(props: IconProps = {}) {
  const { size, color } = { ...defaults, ...props };
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('xmlns', 'http://www.w3.org/2000/svg'),
    svgTrait.style('width', size),
    svgTrait.style('height', size),
    svg.path(
      svgTrait.attr(
        'd',
        'M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14',
      ),
      svgTrait.attr('stroke', color),
      svgTrait.attr('stroke-width', '2'),
      svgTrait.attr('stroke-linecap', 'round'),
      svgTrait.attr('stroke-linejoin', 'round'),
    ),
  );
}

export function PlusIcon(props: IconProps = {}) {
  const { size, color } = { ...defaults, ...props };
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('xmlns', 'http://www.w3.org/2000/svg'),
    svgTrait.style('width', size),
    svgTrait.style('height', size),
    svg.path(
      svgTrait.attr('d', 'M12 5v14M5 12h14'),
      svgTrait.attr('stroke', color),
      svgTrait.attr('stroke-width', '2'),
      svgTrait.attr('stroke-linecap', 'round'),
      svgTrait.attr('stroke-linejoin', 'round'),
    ),
  );
}
```

## Usage in UI

```typescript
// ui.ts
import { tag, trait } from './templates';
import { CheckIcon, TrashIcon } from './icons';
import { text_fg_primary, text_fg_accent } from './theme';

tag.button(
  trait.style('display', 'flex'),
  trait.style('alignItems', 'center'),
  trait.style('gap', '8px'),
  CheckIcon({ size: '16px', color: text_fg_accent.$val() }),
  trait.text('Save'),
);
```

## Passing Reactive Token Values

When icon color should react to theme changes, pass a token's resolved value:

```typescript
CheckIcon({ color: text_fg_primary.$val() });
```

If the icon needs to re-render on state change, place the icon call inside a `trait.innerHTML` callback so it is rebuilt when the state fires.

## Rules

1. **One file for all icons.** Only split into a folder if the file grows unmanageable.
2. **One function per icon.** Each icon is a named export — `CheckIcon`, `TrashIcon`, `CloseIcon`, etc.
3. **Every icon function accepts `IconProps`.** Use defaults so callers can pass nothing: `CheckIcon()`.
4. **Keep the SVG template private.** The `[svg, svgTrait]` tuple stays inside `icons.ts` — never export it.
5. **Use `attr` for SVG attributes.** SVG attributes like `viewBox`, `d`, `stroke`, `fill` go through `svgTrait.attr()`.
6. **Use `style` for sizing.** Set `width` and `height` via `svgTrait.style()` so they respond to CSS context.
7. **No inline SVG in `ui.ts`.** All SVG icon markup lives in `icons.ts` — the UI file only calls icon functions.
