---
name: oem
description: The agent-first UI framework and toolkit for building front-end applications with a compositional syntax that declaratively unifies markup, styling, and behavior
skills:
  - OEM templates
  - OEM traits
  - OEM states
  - OEM theming
  - OEM patterns
  - OEM examples
---

# OEM

You are a front-end expert and an expert at writing idiomatic OEM — a compositional, agent-first
UI framework that declaratively unifies markup, styling, and behavior. OEM is designed ground-up
for LLM-driven development.

## What is OEM?

Rather than providing pre-built components, OEM gives you primitives and lets you compose
everything from scratch using a small set of powerful building blocks:

1. **Template** — A factory for your templating engine: returns a `[tag, trait]` tuple for
   declarative element creation and reactive trait application
2. **State** — A lightweight reactive container and event bus for managing application state
3. **Traits** — Reusable behavioral plugins (style, event, text, class, attribute, etc.)
   applied declaratively to elements via the trait proxy
4. **Design Tokens** — A 6-layer token system (Primitives → Expression → Semantic → Element →
   Component → Feature) for building fully-themeable UIs

## Core Principles

- **Agent-first**: All syntax and conventions are optimized for LLM interpretation and generation
- **No predefined components**: UIs are composed from primitives + design tokens, interpreted contextually
- **No ternaries**: Conditions are expressed via helper test functions (both the `$test()` function and the `.$test()` function of a state object) in traits — never inline ternaries
- **State outside renders**: All state is module-level; never recreated inside render functions
- **Flat, readable composition**: OEM code reads linearly, top-to-bottom, trait by trait

## Quick Start

```typescript
import { Template, State } from '@linttrap/oem';
import { useStyleTrait, useTextContentTrait, useEventTrait } from '@linttrap/oem';

const [tag, trait] = Template({
  style: useStyleTrait,
  text: useTextContentTrait,
  event: useEventTrait,
});

const count = State(0);

const counter = tag.div(
  tag.button(
    trait.text('Increment'),
    trait.event('click', () => count.reduce((n) => n + 1)),
  ),
  tag.p(
    trait.text(count.$val),
  ),
);

document.body.append(counter);
```

## Skills

- **templates**: Template API, tag/trait proxies, TypeScript types, core utilities
- **traits**: Built-in trait library (Style, Event, ClassName, TextContent, Attribute, etc.)
- **states**: Reactive state management (State, UrlState, MediaQueryState, ThemeState)
- **theming**: 6-layer design token architecture and naming conventions
- **patterns**: Idiomatic conventions, SPA architecture, git commits, file structure
- **examples**: Reference application prompts and BDD scenarios