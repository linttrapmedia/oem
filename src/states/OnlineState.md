---
name: useOnlineState
description: Reactive state for tracking browser online/offline connectivity
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# OnlineState

A reactive state hook that tracks whether the browser is currently online or offline.

## Features

- **Connectivity tracking**: Automatically updates when the browser goes online or offline
- **Immediate evaluation**: Initializes to the current `navigator.onLine` value
- **Reactive**: Returns a State object that updates on `online` and `offline` window events

## Usage

```typescript
import { useOnlineState } from '@linttrap/oem';

const isOnline = useOnlineState();

// Read current connectivity
console.log(isOnline.val()); // true or false

// React to connectivity changes
isOnline.sub((online) => {
  console.log(online ? 'Back online' : 'Gone offline');
});
```

## Signature

```typescript
function useOnlineState(): StateType<boolean, {}>;
```

## Parameters

None.

## Return Value

Returns a `State<boolean>` that is `true` when the browser is online and `false` when offline.

## Behavior

- Initializes to `navigator.onLine`
- Listens for the `online` window event and sets state to `true`
- Listens for the `offline` window event and sets state to `false`
- Notifies all subscribers on each change

## Common Patterns

### Conditional UI based on connectivity

```typescript
const isOnline = useOnlineState();

// Show/hide an offline banner
trait.style('display', 'none', isOnline.$test(true));
trait.style('display', 'flex', isOnline.$test(false));
```

### Gate network actions

```typescript
const isOnline = useOnlineState();

trait.event(
  'click',
  () => fetchData(),
  isOnline.$test(true),
);
```

## Notes

- Event listeners are added globally and remain active for the lifetime of the page
- Uses the standard `navigator.onLine` API and `online`/`offline` window events
