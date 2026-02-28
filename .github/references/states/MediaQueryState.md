---
name: useMediaQueryState
description: Reactive state for tracking media query matches based on viewport width and media type
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# MediaQueryState

A reactive state hook that tracks whether the current viewport matches specified media query conditions.

## Features

- **Responsive tracking**: Automatically updates when window is resized
- **Width-based queries**: Support for min and max width constraints
- **Media type support**: Filter by screen, print, or all media types
- **Reactive**: Returns a State object that updates when conditions change

## Usage

```typescript
import { useMediaQueryState } from '@linttrap/oem';

// Track mobile viewport (max 768px)
const isMobile = useMediaQueryState({
  maxWidth: 768,
});

// Track tablet viewport (768px - 1024px)
const isTablet = useMediaQueryState({
  minWidth: 768,
  maxWidth: 1024,
});

// Track desktop viewport (min 1024px)
const isDesktop = useMediaQueryState({
  minWidth: 1024,
});

// Track print media
const isPrint = useMediaQueryState({
  type: 'print',
});
```

## Props

| Property   | Type                           | Default    | Description                      |
| ---------- | ------------------------------ | ---------- | -------------------------------- |
| `type`     | `'screen' \| 'print' \| 'all'` | `'all'`    | Media type to match against      |
| `minWidth` | `number`                       | `0`        | Minimum viewport width in pixels |
| `maxWidth` | `number`                       | `Infinity` | Maximum viewport width in pixels |

## Return Value

Returns a `State<boolean>` that is `true` when the media query matches and `false` otherwise.

## Behavior

The state automatically:

- Evaluates the media query on initialization
- Adds a resize event listener to track viewport changes
- Updates the state value when conditions change
- Checks both width constraints AND media type (both must match)

## Common Patterns

### Responsive Breakpoints

```typescript
// Define standard breakpoints
const isMobile = useMediaQueryState({ maxWidth: 639 });
const isTablet = useMediaQueryState({ minWidth: 640, maxWidth: 1023 });
const isDesktop = useMediaQueryState({ minWidth: 1024 });
```

### Conditional Rendering

```typescript
const isMobile = useMediaQueryState({ maxWidth: 768 });

if (isMobile.val()) {
  // Render mobile layout
} else {
  // Render desktop layout
}
```

## Notes

- The resize listener is added globally and will remain active
- Consider cleanup if using in components that mount/unmount frequently
- Width boundaries are inclusive (>= minWidth, <= maxWidth)
