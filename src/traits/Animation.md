---
name: useAnimationTrait
description: Applies Web Animations API keyframe animations to an HTML element with reactive state and condition support
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useAnimationTrait

Reactively plays a [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) keyframe animation on an element. Supports conditional gating, state-driven re-triggering, and automatic cleanup.

## Signature

```ts
useAnimationTrait(
  el: HTMLElement,
  keyframes:
    | Keyframe[]
    | PropertyIndexedKeyframes
    | (() => Keyframe[] | PropertyIndexedKeyframes),
  options:
    | number
    | KeyframeAnimationOptions
    | (() => number | KeyframeAnimationOptions),
  ...rest: (StateType<any> | Condition)[]
) => () => void
```

## Parameters

| Parameter   | Type                                                                                                     | Description                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `el`        | `HTMLElement`                                                                                            | The target element                                                                                                                                           |
| `keyframes` | `Keyframe[] \| PropertyIndexedKeyframes \| (() => Keyframe[] \| PropertyIndexedKeyframes)`               | The animation keyframes. Pass an array of `Keyframe` objects, a `PropertyIndexedKeyframes` object, or a function that returns either for reactive evaluation. |
| `options`   | `number \| KeyframeAnimationOptions \| (() => number \| KeyframeAnimationOptions)`                       | Animation timing. Pass a duration in ms, a full `KeyframeAnimationOptions` object, or a function for reactive evaluation.                                    |
| `...rest`   | `(StateType<any> \| Condition)[]`                                                                        | Optional State objects and/or Conditions. The animation plays only when all Conditions are truthy.                                                           |

## Behavior

1. Evaluates `keyframes` and `options` (calls them if they are functions).
2. Checks all Conditions — if all are truthy, plays the animation via `el.animate()`.
3. If a previous animation from this trait instance is still running, it is cancelled before the new one starts.
4. Subscribes to every State in `rest` so the animation re-triggers on state changes.
5. When a condition is false, the animation is not played but any previously running animation is **not** cancelled — the trait only gates new plays.
6. Cleanup cancels any running animation and unsubscribes from all States.

## Returns

A cleanup function that cancels the running animation and unsubscribes from all State listeners.

## Template Usage

### Fade-in on creation

```ts
trait.animation(
  [{ opacity: '0' }, { opacity: '1' }],
  { duration: 200, easing: 'ease-out', fill: 'forwards' },
);
```

### Slide-in from below

```ts
trait.animation(
  [
    { opacity: '0', transform: 'translateY(8px)' },
    { opacity: '1', transform: 'translateY(0)' },
  ],
  { duration: 250, easing: 'ease-out', fill: 'forwards' },
);
```

### Enter/exit driven by state

```ts
const mode = State<'enter' | 'exit'>('enter');

// Enter animation — plays when mode is 'enter'
trait.animation(
  [{ opacity: '0', transform: 'scale(0.95)' }, { opacity: '1', transform: 'scale(1)' }],
  { duration: 200, easing: 'ease-out', fill: 'forwards' },
  mode.$test('enter'),
  mode,
);

// Exit animation — plays when mode is 'exit'
trait.animation(
  [{ opacity: '1', transform: 'scale(1)' }, { opacity: '0', transform: 'scale(0.95)' }],
  { duration: 150, easing: 'ease-in', fill: 'forwards' },
  mode.$test('exit'),
  mode,
);
```

### Infinite spinner

```ts
trait.animation(
  [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
  { duration: 800, iterations: Infinity, easing: 'linear' },
);
```

### Reactive duration from state

```ts
const speed = State<number>(300);

trait.animation(
  [{ opacity: '0' }, { opacity: '1' }],
  () => ({ duration: speed.val(), easing: 'ease-out', fill: 'forwards' as FillMode }),
  speed,
);
```

### Conditional animation (only when visible)

```ts
const visible = State<boolean>(false);

trait.animation(
  [{ opacity: '0' }, { opacity: '1' }],
  { duration: 200, fill: 'forwards' },
  visible.$test(true),
  visible,
);
```

### Attention pulse

```ts
trait.animation(
  [
    { transform: 'scale(1)' },
    { transform: 'scale(1.05)' },
    { transform: 'scale(1)' },
  ],
  { duration: 600, easing: 'ease-in-out', iterations: 2 },
);
```

## Performance Notes

- The Web Animations API runs animations on the compositor thread when animating `transform` and `opacity`, delivering 60fps performance without layout thrashing.
- **Never animate layout properties** (`width`, `height`, `top`, `left`, `margin`, `padding`) — they force reflow on every frame. Use `transform: translate/scale` instead.
- Prefer `fill: 'forwards'` when the element should retain its final animated state.
- For looping animations, always provide a cleanup path (state condition or element removal) to avoid orphaned infinite loops.

## Accessibility

- Always respect `prefers-reduced-motion`. When the user has reduced motion enabled, either skip the animation entirely (via a condition tied to a media query state) or use `duration: 0` to apply the final state instantly.

```ts
const reducedMotion = useMediaQueryState('(prefers-reduced-motion: reduce)');

trait.animation(
  [{ opacity: '0' }, { opacity: '1' }],
  () => ({ duration: reducedMotion.test(true) ? 0 : 200, fill: 'forwards' as FillMode }),
  reducedMotion,
);
```
