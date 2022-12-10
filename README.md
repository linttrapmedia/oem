⚠️ DO NOT USE: Experimental ⚠️

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

## Example (Alpha)

```typescript
import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';

function CounterExample() {
  const count = State.Number(0);

  const { div, button } = Template.Html({
    on_count: Trait.State(count, Trait.InnerText),
  });

  return div(['flex', 'row', 30])(
    button(['on_click', count.bind('subtract', 1)])('-'),
    div(['on_count', count.get])(count.get()),
    button(['on_click', count.bind('add', 1)])('+'),
  );
}
```

## New Beta Syntax

```typescript
const count = $number(1);
return $div
  .column(10)
  .append(
    $div
      .row(10)
      .append(
        $button.onClick(count.dec, 2).innerText('–'),
        $div.innerText(count.get, count),
        $button.onClick(count.inc, 1).innerText('+'),
      ),
  );
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
