# O E M

[oem.js.org](https://oem.js.org)

## The Dependency-Free UI Framework

OEM is a dependency-free UI/UX framework and platform. It uses a unique declarative syntax to control style and behavior which is easy to read at scale. The core framework is only a handful of modules that are easy to grok while the _extended_ framework includes a library of take-it-or-leave it features which **includes a full-blown design system**. The overall architecture includes a set of highly configurable dev tasks which allows you to manage multiple apps as a monorepo and/or microfrontend.

## Setup

```
npm i
npm start
```

and http://localhost:3005/

## Example

```typescript
// Counter.ts
import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';

function CounterExample() {
  // 1. declare and manage state
  const count = State.Atom(0);
  const inc = () => count.set(count.get() + 1);
  const dec = () => count.set(count.get() - 1);

  // 2. declare and create your templating engine
  const { div, button } = Template.Html({
    flex: Trait.Flex,
    on_click: Trait.OnClick,
    on_count: Trait.Atom(count, Trait.InnerText),
  });

  // 3. declare and render your html
  return div(['flex', 'row', 30])(
    button(['on_click', dec])('-'),
    div(['on_count', count.get])(count.get()),
    button(['on_click', inc])('+'),
  );
}
```

## Goals & Features

- [x] 100% Dependency Free
- [x] 100% Typescript
- [x] 100% Secure
- [x] 100% Test Coverage (WIP)
- [x] Simple State Management
- [x] Simple Templating
- [x] Simple Styling
- [x] Simple Code
