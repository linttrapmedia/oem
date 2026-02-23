---
name: ThemeState
description: Centralized theme management with reactive design token access
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# ThemeState

A sophisticated state management system for handling multiple themes with reactive design token access. Supports dynamic theme switching and provides both immediate and deferred token getters.

## Features

- **Multi-theme support**: Manage multiple theme definitions
- **Dynamic switching**: Change themes at runtime
- **Type-safe tokens**: Full TypeScript support for design tokens
- **Reactive access**: Tokens update automatically when theme changes
- **Deferred getters**: Support for computed token values with `$` prefix
- **Validation**: Ensures themes exist before switching

## Usage

### Basic Setup

```typescript
import { ThemeState } from '@/states/ThemeState';
import { lightTheme, darkTheme } from '@/themes';

// Initialize with themes
const theme = ThemeState([lightTheme, darkTheme], 'light');

// Get current theme name
const currentTheme = theme.getTheme(); // 'light'

// Switch themes
theme.setTheme('dark');
```

### Token Access

#### Immediate Token Getter

```typescript
// Access token directly (evaluated immediately)
const primaryColor = theme.pmt_color_blue_500();
// Returns the current value: '#3B82F6'
```

#### Deferred Token Getter

```typescript
// Deferred token (starts with $, re-evaluates when theme changes)
const primaryColorDeferred = theme.$pmt_color_blue_500;
// Returns a function that always gets the current theme's value
```

### Reactive Updates

```typescript
// Subscribe to theme changes
theme.sub((value) => {
  console.log('Current theme:', value.currentTheme);
  console.log('Available themes:', value.themes);
});

// Change theme (triggers subscribers)
theme.setTheme('dark');
```

## Type Definition

### Theme Object

```typescript
type Theme = {
  name: string;
  tokens: DesignTokens;
};
```

### State Value

```typescript
type ThemeStateValue = {
  themes: Theme[];
  currentTheme: string;
};
```

## API

### Constructor

```typescript
ThemeState(themes: Theme[], initialTheme?: string)
```

**Parameters:**
- `themes`: Array of theme definitions (must have at least one)
- `initialTheme`: Optional initial theme name (defaults to first theme)

**Throws:**
- Error if themes array is empty

### Methods

#### `getTheme()`

Returns the name of the currently active theme.

```typescript
const currentTheme = theme.getTheme(); // 'light'
```

#### `setTheme(themeName: string)`

Sets the active theme by name.

```typescript
theme.setTheme('dark');
```

**Throws:**
- Error if theme name doesn't exist

### Token Getters

#### Immediate Getter Pattern

```typescript
theme.{tokenKey}()
```

Returns the current value of the token. Call immediately to get the value.

```typescript
const spacing = theme.sem_spc_inset_md(); // '1rem'
```

#### Deferred Getter Pattern

```typescript
theme.${tokenKey}
```

Returns a function that retrieves the token value when called. Use for reactive scenarios.

```typescript
const getSpacing = theme.$sem_spc_inset_md;
// Later...
const spacing = getSpacing(); // Always gets current theme value
```

## Implementation Details

### Proxy-Based Token Access

ThemeState uses a JavaScript Proxy to dynamically generate token getters:

- Properties in `baseState` are accessed normally
- Properties starting with `$` return deferred getters
- All other properties return immediate token getter functions

### Token Lookup

1. Finds the current theme from state
2. Looks up the token key in that theme's tokens
3. Returns the value or empty string if not found

## Common Patterns

### Theme Switcher Component

```typescript
const theme = ThemeState([lightTheme, darkTheme]);

const toggleTheme = () => {
  const current = theme.getTheme();
  theme.setTheme(current === 'light' ? 'dark' : 'light');
};
```

### Responsive Token Usage

```typescript
const theme = ThemeState([lightTheme, darkTheme]);

// Use deferred getter for reactive styling
const buttonBackground = theme.$cmp_btn_pri_bkg;

// Later in render
element.style.background = buttonBackground();
```

### Multi-Brand Support

```typescript
const theme = ThemeState([
  brandATheme,
  brandBTheme,
  brandCTheme
], 'brandA');

// Switch brands dynamically
theme.setTheme('brandB');
```

## Error Handling

### Theme Not Found

```typescript
theme.setTheme('nonexistent');
// Throws: Theme "nonexistent" not found
```

### Empty Themes Array

```typescript
ThemeState([]);
// Throws: At least one theme must be provided
```

## Performance Considerations

- Token getters are created lazily via Proxy
- No overhead for unused tokens
- Theme switching updates state once, triggering all subscribers
- Consider memoizing frequently accessed tokens in performance-critical paths

## Integration with Design Token System

ThemeState works seamlessly with the 6-layer design token architecture:

```typescript
// Access any layer's tokens
const primitive = theme.pmt_color_blue_500();
const expression = theme.exp_roundness_act();
const semantic = theme.sem_color_interactive_pri();
const element = theme.elm_btn_hgt_md();
const component = theme.cmp_btn_pri_bkg();
const feature = theme.ftr_checkout_cta_bkg();
```

All tokens are type-safe and validated at compile time.
