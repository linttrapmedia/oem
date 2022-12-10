🚧🚧🚧 DO NOT USE 🚧🚧🚧

12/10/2022 Update: After launching the OEM alpha I got some great feedback and decided to push the idea further in my effort to boil things down to the essence of OEM: a dependency free UI/UX framework that uses a single declarative syntax with a heuristic based on the native browser environment.

# O E M

[oem.js.org](https://oem.js.org)

OEM is a dependency-free UI/UX framework and platform. It uses a unique declarative syntax to control the dom, css and behavior. This syntax follows intuitive naming conventions based on the javascript and css you already know and the formulaic nature of it gives intellisense and AI a leg up.

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
