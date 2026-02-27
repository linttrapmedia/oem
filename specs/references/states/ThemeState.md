---
name: useThemeState
description: Centralized theme management with reactive design token access
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useThemeState

A state management system for handling multiple themes with reactive design token access. Supports dynamic theme switching and provides both immediate and deferred token getters through a Proxy-based API.

## Features

- **Multi-theme support**: Manage multiple theme definitions
- **Dynamic switching**: Change themes at runtime
- **Type-safe tokens**: Full TypeScript support for design tokens
- **Reactive access**: Tokens update automatically when theme changes
- **Deferred getters**: Support for computed token values with `$` prefix
- **Validation**: Ensures themes exist before switching

## Setup

```typescript
import { Template } from 'oem/core/template';
import { useThemeState } from 'oem/states/ThemeState';
import { darkTheme, lightTheme } from 'oem/themes';
import { useStyleTrait } from 'oem/traits/Style';
import { useTextContentTrait } from 'oem/traits/TextContent';
import { useEventTrait } from 'oem/traits/Event';
import { useInnerHTMLTrait } from 'oem/traits/InnerHTML';

import type { Theme } from 'oem/states/ThemeState';

const myDark: Theme = { name: 'dark', tokens: darkTheme };
const myLight: Theme = { name: 'light', tokens: lightTheme };

const theme = useThemeState([myDark, myLight], 'dark');
const { tag, trait } = Template({
  useStyleTrait,
  useTextContentTrait,
  useEventTrait,
  useInnerHTMLTrait,
});
```

## Type Definitions

```typescript
type Theme = {
  name: string;
  tokens: DesignTokens;
};

type ThemeStateValue = {
  themes: Theme[];
  currentTheme: string;
};
```

## API

### Constructor

```typescript
useThemeState(themes: Theme[], initialTheme?: string)
```

- `themes` — Array of theme definitions (must have at least one)
- `initialTheme` — Optional initial theme name (defaults to first theme's name)

Throws if `themes` is empty.

### `getTheme()`

Returns the name of the currently active theme.

```typescript
theme.getTheme(); // 'dark'
```

### `setTheme(themeName: string)`

Sets the active theme by name. Throws if `themeName` doesn't match any loaded theme.

```typescript
theme.setTheme('light');
```

### Immediate Token Getter — `theme.{tokenKey}()`

Returns the current value of the token by calling it as a function. Evaluates once at call time.

```typescript
theme.sem_color_bkg_pri(); // '#0a0a0a'
theme.sem_spc_inset_md(); // '1rem'
```

### Deferred Token Getter — `theme.${tokenKey}`

Returns a closure that retrieves the token value when called. Use in traits so the value re-evaluates on theme change.

```typescript
theme.$sem_color_bkg_pri; // () => '#0a0a0a' (re-evaluates on theme switch)
```

## Token Access in OEM Templates

### Static Token Values

Use the immediate getter when the value doesn't need to react to theme changes after initial render:

```typescript
tag.div(
  trait.style('backgroundColor', theme.sem_color_bkg_pri()),
  trait.style('color', theme.sem_color_txt_pri()),
  trait.style('padding', theme.sem_spc_inset_lg()),
  trait.textContent('Hello, OEM'),
);
```

### Reactive Token Values (Deferred Getters)

Use the `$`-prefixed deferred getter so the trait re-evaluates when the theme changes:

```typescript
tag.div(
  trait.style('backgroundColor', theme.$sem_color_bkg_pri),
  trait.style('color', theme.$sem_color_txt_pri),
  trait.style('padding', theme.$sem_spc_inset_lg),
  trait.textContent('This reacts to theme switches'),
);
```

### Theme Switcher

```typescript
tag.button(
  trait.style('backgroundColor', theme.$cmp_btn_pri_bkg),
  trait.style('color', theme.$cmp_btn_pri_txt_color),
  trait.style('height', theme.$cmp_btn_hgt_md),
  trait.style('paddingInline', theme.$cmp_btn_pad_x_md),
  trait.style('borderRadius', theme.$cmp_btn_bdr_rad),
  trait.style('cursor', 'pointer'),
  trait.textContent(() => `Theme: ${theme.getTheme()}`, theme),
  trait.event('click', () => {
    theme.setTheme(theme.getTheme() === 'dark' ? 'light' : 'dark');
  }),
);
```

### Themed Card

```typescript
tag.div(
  trait.style('backgroundColor', theme.$cmp_cdl_bkg),
  trait.style('borderColor', theme.$cmp_cdl_bdr_color),
  trait.style('borderWidth', theme.$cmp_cdl_bdr_wdt),
  trait.style('borderRadius', theme.$cmp_cdl_bdr_rad),
  trait.style('padding', theme.$cmp_cdl_pad),
  trait.style('boxShadow', theme.$cmp_cdl_shd),
  trait.innerHTML([
    tag.h2(
      trait.style('color', theme.$sem_color_txt_pri),
      trait.style('margin', '0 0 8px 0'),
      trait.textContent('Card Title'),
    ),
    tag.p(
      trait.style('color', theme.$sem_color_txt_sec),
      trait.textContent('Card body text styled entirely with design tokens.'),
    ),
  ]),
);
```

### Subscribing to Theme Changes

Since useThemeState extends State, you can subscribe to changes directly:

```typescript
theme.sub((value) => {
  console.log('Switched to:', value.currentTheme);
});
```

## Design Token Layers

useThemeState works with a 2-layer design token architecture. Access either layer through the same getter API:

```typescript
// Semantic — purpose-based values
trait.style('backgroundColor', theme.$sem_color_bkg_pri);
trait.style('color', theme.$sem_color_txt_pri);

// Component — all UI parts (structural + visual)
trait.style('height', theme.$cmp_btn_hgt_md);
trait.style('backgroundColor', theme.$cmp_btn_pri_bkg);
trait.style('borderRadius', theme.$cmp_cdl_bdr_rad);
```

**Token selection cascade:** `cmp_` → `sem_` → inline style

Always search for a `cmp_` token first. Fall back to `sem_` when no component token fits the need. Use an inline style only as an absolute last resort.

## Error Handling

```typescript
// Empty themes array
useThemeState([]);
// Throws: "At least one theme must be provided"

// Non-existent theme name
theme.setTheme('nonexistent');
// Throws: 'Theme "nonexistent" not found'
```
