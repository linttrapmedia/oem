🚧🚧🚧 DO NOT USE 🚧🚧🚧

12/10/2022 Update: After launching the OEM alpha I got some great feedback and decided to push the idea further in my effort to boil things down to the essence of OEM: a dependency free UI/UX framework that uses a single declarative syntax with a heuristic based on the native browser environment.

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
function CounterExample() {
  const count = NUMBER(100);
  return DIV.onClick(count.inc, 1)
    .style('fontSize', '24px')
    .style('cursor', 'pointer')
    .innerText(count.get, count);
}
```

## Goals & Features

- [x] Dependency Free
- [x] Typescript
- [x] Design System
- [x] Single syntax for html, css and js
- [x] Utility Library
- [x] Architecture Agnostic
- [x] Browser-native heuristic (Example: if you're looking to add the native "onClick" event, it's called "onClick" 😊)
