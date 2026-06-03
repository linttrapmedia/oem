---
name: Counter Example
description: A simple counter component built with OEM.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Counter Example

```typescript
const count = State(0);

const counter = tag.div(
  trait.style('display', 'flex'),
  trait.style('alignItems', 'center'),
  trait.style('gap', '16px'),
  tag.button(
    trait.text('−'),
    trait.event(
      'click',
      count.$reduce((n) => n - 1),
    ),
    trait.style('fontSize', '24px'),
  ),
  tag.span(
    trait.text(count.$val),
    trait.style('fontSize', '48px'),
    trait.style('fontWeight', '700'),
    trait.style('color', '#555555'),
  ),
  tag.button(
    trait.text('+'),
    trait.event(
      'click',
      count.$reduce((n) => n + 1),
    ),
    trait.style('fontSize', '24px'),
  ),
);
```
