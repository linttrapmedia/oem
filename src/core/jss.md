---
name: jss
description: CSS-in-JS — scoped stylesheets from plain JavaScript objects
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## jss

### Overview

`jss` converts a plain JavaScript object into real CSS, injects it into the document `<head>` via a single `<style data-jss>` tag, and returns a map of scoped class names. Identical style blocks are automatically deduplicated — calling `jss()` twice with the same input only injects once.

### Purpose

Eliminates the need for external `.css` files or CSS module tooling while keeping styles co-located with components. Supports the full CSS specification surface through a JSON-like syntax.

### Key Exports

#### `jss<T>(sheet: T): ClassNameMap<T>`

- **Type**: Function
- **Description**: Creates a scoped stylesheet. Returns an object whose keys mirror the non-`@` keys in the input, with values being the generated scoped class name strings.
- **Parameters**:
  - `sheet` — An object where each key becomes a CSS rule block. Keys that begin with `@` are treated as at-rules (see below); all other keys become scoped class selectors.
- **Returns**: A `ClassNameMap<T>` — an object mapping each class name to its scoped equivalent (e.g. `"jss-button-a1b2c3"`).

### Syntax Reference

#### Basic class

```typescript
const s = jss({
  button: {
    backgroundColor: 'royalblue',
    color: 'white',
    fontSize: 14,
    borderRadius: 4,
  },
});
// s.button → "jss-button-a1b2c3"
```

Property names are written in **camelCase** and are converted to kebab-case automatically (`backgroundColor` → `background-color`).

#### Numeric values & px

Numeric values are auto-appended with `px` for most properties:

```typescript
{ width: 100 }   // → width: 100px
{ padding: 8 }   // → padding: 8px
```

Unitless properties are **not** px-suffixed:

```typescript
{ opacity: 0.5 }     // → opacity: 0.5
{ zIndex: 10 }       // → z-index: 10
{ fontWeight: 700 }   // → font-weight: 700
{ lineHeight: 1.5 }   // → line-height: 1.5
```

Full unitless list: `animationIterationCount`, `borderImageOutset`, `borderImageSlice`, `borderImageWidth`, `boxFlex`, `boxFlexGroup`, `boxOrdinalGroup`, `columnCount`, `columns`, `flex`, `flexGrow`, `flexPositive`, `flexShrink`, `flexNegative`, `flexOrder`, `gridArea`, `gridRow`, `gridRowEnd`, `gridRowSpan`, `gridRowStart`, `gridColumn`, `gridColumnEnd`, `gridColumnSpan`, `gridColumnStart`, `fontWeight`, `lineClamp`, `lineHeight`, `opacity`, `order`, `orphans`, `tabSize`, `widows`, `zIndex`, `zoom`, `fillOpacity`, `floodOpacity`, `stopOpacity`, `strokeDasharray`, `strokeDashoffset`, `strokeMiterlimit`, `strokeOpacity`, `strokeWidth`.

#### CSS Custom Properties (variables)

Custom properties are preserved as-is (no camelCase conversion):

```typescript
jss({
  root: {
    '--btn-bg': 'royalblue',
    '--btn-radius': '4px',
    backgroundColor: 'var(--btn-bg)',
    borderRadius: 'var(--btn-radius)',
  },
});
```

#### Pseudo-classes & pseudo-elements

Use `&` to refer to the parent selector:

```typescript
jss({
  link: {
    color: 'blue',
    '&:hover': { color: 'darkblue' },
    '&:focus': { outline: '2px solid blue' },
    '&::before': { content: '"→ "' },
    '&::after': { content: '""', display: 'block' },
  },
});
```

#### Comma-separated selectors

```typescript
jss({
  btn: {
    '&:focus, &:active': { outline: 'none' },
  },
});
```

#### Combinators & descendant selectors

```typescript
jss({
  parent: {
    '& > .child': { color: 'green' },    // child combinator
    '& + .sibling': { marginTop: 8 },    // adjacent sibling
    '& ~ .any': { opacity: 0.5 },        // general sibling
    span: { fontWeight: 700 },            // descendant (no & needed)
  },
});
```

#### Deep nesting

Nesting is supported to arbitrary depth:

```typescript
jss({
  card: {
    padding: 16,
    '&:hover': {
      backgroundColor: 'gray',
      '& > .title': {
        color: 'white',
      },
    },
  },
});
// Produces: .jss-card-xxx:hover > .title { color: white; }
```

#### @media queries (nested)

Media queries can be nested inside any class:

```typescript
jss({
  container: {
    display: 'flex',
    gap: 16,
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: 8,
    },
    '@media (max-width: 480px)': {
      padding: 8,
    },
  },
});
```

#### @supports queries

```typescript
jss({
  grid: {
    display: 'flex',
    '@supports (display: grid)': {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});
```

#### @container queries

```typescript
jss({
  card: {
    padding: 16,
    '@container (min-width: 400px)': {
      padding: 24,
    },
  },
});
```

#### @keyframes

Keyframe names are auto-scoped. The scoped name is returned in the class map:

```typescript
const s = jss({
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  box: {
    animationName: 'jss-fadeIn-xxx', // use s.fadeIn at runtime
    animationDuration: '300ms',
  },
});

// s.fadeIn → "jss-fadeIn-abc123"
```

In practice you would reference it dynamically:

```typescript
const s = jss({
  '@keyframes pulse': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.5 },
    '100%': { opacity: 1 },
  },
});

const s2 = jss({
  box: {
    animation: `${(s as any).pulse} 2s infinite`,
  },
});
```

#### @font-face

Injected globally (no scoping):

```typescript
jss({
  '@font-face': {
    fontFamily: '"MyFont"',
    src: 'url("/fonts/MyFont.woff2") format("woff2")',
    fontWeight: 400,
    fontStyle: 'normal',
  },
});
```

#### @global

Inject unscoped rules for resets, base styles, etc.:

```typescript
jss({
  '@global': {
    '*, *::before, *::after': { boxSizing: 'border-box' },
    html: { fontSize: '16px' },
    body: { margin: 0, fontFamily: 'system-ui, sans-serif' },
  },
});
```

#### Top-level @media (conditional at-rule)

For global media queries that aren't scoped to a single class:

```typescript
jss({
  '@media (prefers-color-scheme: dark)': {
    body: { backgroundColor: '#111', color: '#eee' },
  },
});
```

#### Vendor prefixes

camelCase vendor prefixes are converted automatically:

```typescript
jss({
  box: {
    WebkitTransform: 'rotate(45deg)',   // → -webkit-transform
    MozAppearance: 'none',              // → -moz-appearance
    msFlexAlign: 'center',              // → -ms-flex-align
  },
});
```

### Deduplication

`jss` tracks every injected block by its fingerprint (name + serialized props). Calling `jss()` again with identical input returns the same class names without injecting duplicate CSS:

```typescript
const a = jss({ btn: { color: 'red' } });
const b = jss({ btn: { color: 'red' } });
// a.btn === b.btn — CSS injected only once
```

### How it works internally

1. Each top-level key is hashed (`name:JSON.stringify(props)`) to produce a deterministic suffix.
2. Regular keys become `.jss-<name>-<hash>` selectors.
3. The `serialize()` function recursively walks the property tree, separating flat declarations from nested objects (child selectors, at-rules).
4. All generated CSS text is appended to a single `<style data-jss>` element in `<head>`.
5. A `Set<string>` of already-injected fingerprints ensures no duplicates.

### Tests

Tests are in `jss.test.ts` and cover:

| Test | What it verifies |
|------|-----------------|
| `CanCreateScopedClassName` | Returns a string starting with `jss-<name>-` |
| `CanInjectCSSIntoHead` | CSS text appears in the `<style data-jss>` tag |
| `CanConvertCamelCaseToKebab` | `backgroundColor` → `background-color` |
| `CanAppendPxToNumericValues` | `width: 100` → `width: 100px` |
| `WillNotAppendPxToUnitlessProperties` | `opacity: 0.5` stays `0.5`, not `0.5px` |
| `CanHandleCSSCustomProperties` | `--var` keys and `var()` values work |
| `CanHandleNestedPseudoClass` | `&:hover` produces correct selector |
| `CanHandleNestedPseudoElement` | `&::before` produces correct selector |
| `CanHandleNestedCombinator` | `& > span` produces correct selector |
| `CanHandleDescendantSelector` | Plain nested key produces descendant selector |
| `CanHandleNestedMediaQuery` | `@media` inside a class wraps rules correctly |
| `CanHandleKeyframes` | `@keyframes` are scoped and injected |
| `CanHandleFontFace` | `@font-face` is injected globally |
| `CanHandleGlobalStyles` | `@global` injects unscoped rules |
| `CanHandleVendorPrefixes` | `Webkit-`, `ms-` prefixes convert correctly |
| `CanHandleMultipleClasses` | Multiple keys produce distinct scoped names |
| `WillDeduplicateIdenticalSheets` | Same input does not inject twice |
| `CanHandleNestedSupportsQuery` | `@supports` inside a class works |
| `CanHandleCommaSelectors` | `&:focus, &:active` expands `&` in both |
| `CanHandleDeeplyNestedRules` | Multi-level nesting produces correct selectors |
