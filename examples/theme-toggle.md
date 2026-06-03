---
name: Theme Toggle Example
description: A theme toggle component built with OEM.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Theme Toggle Example

```typescript
import { useThemeState, useTokenState } from '@linttrap/oem';

const theme = useThemeState('light');
const bg = useTokenState('#c7c7c7', '#222222', theme);
const fg = useTokenState('#222222', '#c7c7c7', theme);
const accent = useTokenState('#555555', '#999999', theme);

const app = tag.div(
  trait.style('backgroundColor', bg.$val),
  trait.style('color', fg.$val),
  trait.style('transition', 'all 0.3s ease'),
  tag.button(
    trait.text('☀️ Light', theme.$test('dark')),
    trait.text('🌙 Dark', theme.$test('light')),
    trait.event('click', () => theme.reduce((t) => (t === 'dark' ? 'light' : 'dark'))),
    trait.style('color', accent.$val),
  ),
);
```
