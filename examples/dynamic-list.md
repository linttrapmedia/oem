---
name: Dynamic List Example
description: A dynamic list component built with OEM.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Dynamic List Example

```typescript
const items = State<string[]>([]);
const input = State('');

const list = tag.div(
  tag.div(
    trait.style('display', 'flex'),
    trait.style('gap', '8px'),
    tag.input(
      trait.inputValue(input.$val),
      trait.inputEvent('input', input.$set),
      trait.style('flex', '1'),
    ),
    tag.button(
      trait.text('Add'),
      trait.event('click', () => {
        items.reduce((prev) => [...prev, input.val()]);
        input.set('');
      }),
    ),
  ),
  tag.ul(trait.innerHTML(() => items.val().map((item) => tag.li(trait.text(item))), items)),
);
```
