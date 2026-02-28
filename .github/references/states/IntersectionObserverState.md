---
name: useIntersectionObserverState
description: Reactive state for tracking element visibility within the viewport
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# IntersectionObserverState

A reactive state hook that tracks whether an element is visible within the viewport (or a specified root element) using the Intersection Observer API.

## Features

- **Visibility tracking**: Knows when an element enters or leaves the viewport
- **Intersection ratio**: Reports how much of the element is visible (0 to 1)
- **Bounding rect**: Exposes the element's bounding client rect on each observation
- **Configurable thresholds**: Supports all standard `IntersectionObserver` options
- **Reactive**: Returns a State object that updates on every intersection change

## Usage

```typescript
import { useIntersectionObserverState } from '@linttrap/oem';

const section = document.getElementById('hero')!;
const visibility = useIntersectionObserverState(section);

// Check if element is visible
visibility.sub(({ isIntersecting }) => {
  console.log(isIntersecting ? 'Visible' : 'Hidden');
});
```

## Signature

```typescript
function useIntersectionObserverState(
  el: Element,
  options?: IntersectionObserverInit,
): StateType<IntersectionObserverStateValue, {}>;
```

## Parameters

| Parameter | Type                      | Default | Description                                          |
| --------- | ------------------------- | ------- | ---------------------------------------------------- |
| `el`      | `Element`                 | —       | The DOM element to observe                           |
| `options` | `IntersectionObserverInit` | —       | Standard IntersectionObserver options (root, rootMargin, threshold) |

## Return Value

Returns a `State<IntersectionObserverStateValue>` with the following shape:

| Property              | Type                      | Description                                      |
| --------------------- | ------------------------- | ------------------------------------------------ |
| `isIntersecting`      | `boolean`                 | Whether the element is currently intersecting     |
| `intersectionRatio`   | `number`                  | Fraction of the element visible (0 to 1)         |
| `boundingClientRect`  | `DOMRectReadOnly \| null` | The element's bounding rect at observation time  |

## Behavior

- Creates an `IntersectionObserver` and immediately begins observing the target element
- Updates state on every intersection change (entry/exit, ratio change at thresholds)
- Notifies all subscribers with the new intersection data

## Common Patterns

### Lazy loading content

```typescript
const placeholder = document.getElementById('lazy-section')!;
const visibility = useIntersectionObserverState(placeholder, {
  threshold: 0.1,
});

visibility.sub(({ isIntersecting }) => {
  if (isIntersecting) loadContent();
});
```

### Scroll-spy navigation

```typescript
const sections = ['intro', 'features', 'pricing'].map((id) => ({
  id,
  visibility: useIntersectionObserverState(document.getElementById(id)!, {
    threshold: 0.5,
  }),
}));

sections.forEach(({ id, visibility }) => {
  visibility.sub(({ isIntersecting }) => {
    if (isIntersecting) activeSection.set(id);
  });
});
```

### Animate on scroll

```typescript
const el = document.getElementById('animate-me')!;
const visibility = useIntersectionObserverState(el, { threshold: 0.2 });

trait.style('opacity', '0');
trait.style(
  'opacity',
  '1',
  visibility.$test((v) => v.isIntersecting),
);
trait.style(
  'transition',
  'opacity 0.3s ease',
);
```

## Notes

- The observer remains active for the lifetime of the page
- Use `threshold` option to control when intersection callbacks fire (e.g., `[0, 0.25, 0.5, 0.75, 1]` for granular tracking)
- Uses the standard `IntersectionObserver` API — supported in all modern browsers
