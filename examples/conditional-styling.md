---
name: Conditional Styling Example
description: A conditional styling component built with OEM.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Conditional Styling Example

```typescript
const isActive = State(false);

tag.div(
  // Base styles — always applied
  trait.style('padding', '16px'),
  trait.style('borderRadius', '8px'),
  trait.style('cursor', 'pointer'),
  trait.style('transition', 'all 0.2s ease'),

  // Conditional branches — never ternaries
  trait.style('backgroundColor', '#555555', isActive.$test(true)),
  trait.style('backgroundColor', '#c7c7c7', isActive.$test(false)),
  trait.style('color', '#c7c7c7', isActive.$test(true)),
  trait.style('color', '#888888', isActive.$test(false)),
  trait.style('boxShadow', '0 0 20px rgba(80,80,80,0.3)', isActive.$test(true)),
  trait.style('boxShadow', 'none', isActive.$test(false)), isActive.$test(false)),
  trait.text('Active', isActive.$test(true)),
  trait.text('Inactive', isActive.$test(false)),
  trait.event('click', isActive.$reduce(v => !v)),
);
```
