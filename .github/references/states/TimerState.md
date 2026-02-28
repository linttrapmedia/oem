---
name: useTimerState
description: Reactive interval-driven counter state with start, stop, and reset controls
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# TimerState

A reactive state hook that increments a counter at a fixed interval. Provides custom methods to start, stop, and reset the timer.

## Features

- **Interval counter**: Increments a numeric value at a configurable interval
- **Start/stop/reset**: Custom methods for full timer lifecycle control
- **Auto-start**: Starts automatically by default (configurable)
- **Deferred methods**: `$start`, `$stop`, `$reset` for use in event handlers
- **Reactive**: Returns a State object that updates on every tick

## Usage

```typescript
import { useTimerState } from '@linttrap/oem';

// Tick every second, auto-starts
const timer = useTimerState(1000);

// Read current tick count
console.log(timer.val()); // 0, 1, 2, ...

// Control the timer
timer.stop();
timer.reset();
timer.start();

// Subscribe to ticks
timer.sub((count) => {
  console.log('Tick:', count);
});
```

## Signature

```typescript
function useTimerState(
  intervalMs: number,
  options?: { autoStart?: boolean },
): StateType<number, { start; stop; reset }>;
```

## Parameters

| Parameter    | Type                        | Default | Description                                                |
| ------------ | --------------------------- | ------- | ---------------------------------------------------------- |
| `intervalMs` | `number`                    | —       | Interval between ticks in milliseconds                     |
| `options`    | `{ autoStart?: boolean }`   | —       | Configuration. `autoStart` defaults to `true` if omitted.  |

## Return Value

Returns a `State<number>` with these additional custom methods:

| Method    | Signature    | Description                                      |
| --------- | ------------ | ------------------------------------------------ |
| `start()` | `() => void` | Starts the interval (no-op if already running)   |
| `stop()`  | `() => void` | Stops the interval                               |
| `reset()` | `() => void` | Stops the interval and resets the counter to `0` |

Each method also has a `$`-prefixed deferred version (`$start`, `$stop`, `$reset`) that returns `() => void`.

## Behavior

- Initializes the counter to `0`
- If `autoStart` is not explicitly `false`, starts the interval immediately
- Each tick increments the counter by `1` and notifies all subscribers
- `start()` is a no-op if the timer is already running (prevents double intervals)
- `stop()` clears the interval; `start()` can resume from the current count
- `reset()` clears the interval AND sets the counter back to `0`

## Common Patterns

### Auto-save indicator

```typescript
const timer = useTimerState(30000); // every 30 seconds

timer.sub(() => {
  saveDocument();
});
```

### Countdown display

```typescript
const DURATION = 60;
const timer = useTimerState(1000);

trait.textContent(() => `${DURATION - timer.val()}s remaining`);
```

### Polling with deferred controls

```typescript
const timer = useTimerState(5000, { autoStart: false });

timer.sub(() => fetchUpdates());

// Wire start/stop to buttons
trait.event('click', timer.$start());
trait.event('click', timer.$stop());
```

### Session timeout

```typescript
const idle = useTimerState(1000);

idle.sub((seconds) => {
  if (seconds >= 300) logout();
});

// Reset on user activity
document.addEventListener('mousemove', () => idle.reset());
```

## Notes

- The interval uses `setInterval` under the hood
- Timer remains active until explicitly stopped or reset
- The counter is a simple incrementing integer — for elapsed time, multiply by `intervalMs`
