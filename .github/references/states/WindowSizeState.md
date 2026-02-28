---
name: useWindowSizeState
description: Reactive state for tracking viewport width and height
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# WindowSizeState

A reactive state hook that tracks the current viewport dimensions.

## Features

- **Viewport tracking**: Reports both width and height as numbers
- **Immediate evaluation**: Initializes to the current window size
- **Reactive**: Returns a State object that updates on window resize

## Usage

```typescript
import { useWindowSizeState } from '@linttrap/oem';

const windowSize = useWindowSizeState();

// Read current dimensions
const { width, height } = windowSize.val();

// Subscribe to size changes
windowSize.sub(({ width, height }) => {
  console.log(`${width}x${height}`);
});
```

## Signature

```typescript
function useWindowSizeState(): StateType<WindowSize, {}>;
```

## Parameters

None.

## Return Value

Returns a `State<WindowSize>` containing:

| Property | Type     | Description                         |
| -------- | -------- | ----------------------------------- |
| `width`  | `number` | Current viewport width in pixels    |
| `height` | `number` | Current viewport height in pixels   |

## Behavior

- Initializes to `{ width: window.innerWidth, height: window.innerHeight }`
- Listens for the `resize` window event
- Updates state with the new dimensions on every resize
- Notifies all subscribers on each change

## Common Patterns

### Dynamic canvas sizing

```typescript
const windowSize = useWindowSizeState();

windowSize.sub(({ width, height }) => {
  canvas.width = width;
  canvas.height = height;
});
```

### Computed column count

```typescript
const windowSize = useWindowSizeState();

trait.style('gridTemplateColumns', () => {
  const cols = Math.floor(windowSize.val().width / 300);
  return `repeat(${cols}, 1fr)`;
}, windowSize);
```

### Reactive dimension values

```typescript
const windowSize = useWindowSizeState();

trait.style('height', () => `${windowSize.val().height - 64}px`, windowSize);
```

## Comparison with useMediaQueryState

| Feature              | `useWindowSizeState`   | `useMediaQueryState`      |
| -------------------- | ---------------------- | ------------------------- |
| Return type          | `{ width, height }`   | `boolean`                 |
| Use case             | Computed layouts       | Breakpoint conditions     |
| Condition-friendly   | Requires `$test` fn   | Direct `$test(true/false)` |

Use `useMediaQueryState` for breakpoint-gated trait conditions. Use `useWindowSizeState` when you need raw pixel values for calculations.

## Notes

- The resize listener is added globally and remains active for the lifetime of the page
- For breakpoint-based boolean conditions, prefer `useMediaQueryState` instead
