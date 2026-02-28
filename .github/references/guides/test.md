---
name: Test Files
description: How to organize and write tests for OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Test Files

## What This File Is

`test/` is the folder containing all unit and integration tests for the application. Test files mirror the structure of the source code and verify that states, actions, machines, and UI behavior work as expected.

## Why It Must Be Its Own Folder

Tests are not application code — they are verification code. Isolating them in a `test/` folder keeps the main source clean and makes it clear which files are production code and which are test harnesses.

## When to Create

Create a `test/` folder as soon as the application has state or machine logic worth verifying. Tests should be written alongside implementation, not deferred until later.

## When to Use

- **After implementing state logic**: Write tests for State objects, custom methods, and reducers.
- **After implementing machines**: Write tests for each action/case in the machine.
- **After implementing actions**: Verify action creators return the correct shape.
- **When debugging**: Write a failing test that reproduces the bug, then fix it.

## What Belongs Here

- Unit tests for State objects (`.set()`, `.reduce()`, `.test()`, custom methods)
- Unit tests for machine dispatch functions
- Unit tests for action creators
- Integration tests for state + machine interactions
- Test utilities and mocks

## What Does NOT Belong Here

- Application code of any kind
- Production state or configuration

## Example Structure

```
test/
  states.test.ts
  machines.test.ts
  actions.test.ts
```

## Example Test

```typescript
// test/states.test.ts
import { State } from '@linttrap/oem';

const count = State(0);

// Test set
count.set(5);
console.assert(count.val() === 5, 'set should update value');

// Test reduce
count.reduce((prev) => prev + 1);
console.assert(count.val() === 6, 'reduce should transform value');

// Test subscription
let received: number | undefined;
const unsub = count.sub((v) => (received = v));
count.set(10);
console.assert(received === 10, 'subscriber should receive new value');
unsub();
count.set(20);
console.assert(received === 10, 'unsubscribed listener should not receive');

// Test $test
console.assert(count.test(20) === true, 'test should check equality');
console.assert(count.test((v) => v > 10) === true, 'test should accept predicates');
```

## Important Note

Test files need to interact with internals in ways that application code never should. **Do not use test files as examples of idiomatic OEM.** Tests may import from internal paths, directly manipulate subscriptions, or use patterns that are inappropriate for production UI code.

## Rules

1. **Tests live in the `test/` folder.** Not alongside source files, not in a root `__tests__` directory.
2. **Mirror source structure.** `states.ts` → `test/states.test.ts`, `machines.ts` → `test/machines.test.ts`.
3. **Test behavior, not implementation.** Verify what State values result from actions, not how they get there.
4. **Do not use test patterns as examples.** Tests interact with internals; production code should use the idiomatic `$val` / `$test` / `$reduce` patterns.
5. **Write tests alongside implementation.** Don't defer testing to a later phase.
