---
name: Folder & File Structure
description: Canonical folder and file structure for OEM applications, with links to detailed guides for each category.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Folder & File Structure

## When to Create This Structure

When starting a new OEM application or adding OEM to an existing project, create the following file/folder structure at the root of the app. Each category starts as a **single file** (e.g., `states.ts`, `actions.ts`). If a file grows too large to manage, convert it into a **folder** with multiple files (e.g., `states/todos.ts`, `states/auth.ts`). Always start with single files.

## When to Use This Structure

When the structure already exists, follow it. Every piece of application logic belongs in exactly one of these categories. Before creating a new file or adding code, identify which category it falls under and place it there. This keeps the codebase predictable for both humans and LLMs.

## Design Principles

- **High Cohesion, Low Coupling**: Each category groups logically related code — like a math library where functions share a role, not necessarily a dependency.
- **LLM-Optimized**: The structure is flat and predictable so LLMs can navigate, read, and generate code without ambiguity about where things belong.
- **Single Responsibility**: Each file/folder owns one concern. No mixing state definitions with UI templates or actions with type definitions.

## Categories

Each category below has its own detailed guide. Every category must be its own file (or folder of files if it grows large):

| File / Folder  | Purpose                                                     | Guide                           |
| -------------- | ----------------------------------------------------------- | ------------------------------- |
| `bdd/`         | Requirements, acceptance criteria, BDD scenarios            | [BDD Guide](bdd.md)             |
| `types.ts`     | Type definitions for state, actions, data structures        | [Types Guide](types.md)         |
| `constants.ts` | Fixed values (API endpoints, enums, config literals)        | [Constants Guide](constants.md) |
| `config.ts`    | Environment-aware settings, feature flags                   | [Config Guide](config.md)       |
| `data.ts`      | Static data (dropdown options, static content)              | [Data Guide](data.md)           |
| `states.ts`    | Reactive State objects shared across the app                | [States Guide](states.md)       |
| `actions.ts`   | Action creator functions returning `{ type, payload }`      | [Actions Guide](actions.md)     |
| `machines.ts`  | State machines as switch statements on state + action       | [Machines Guide](machines.md)   |
| `traits.ts`    | Custom trait functions (beyond the core trait library)      | [Traits Guide](traits.md)       |
| `templates.ts` | Template definitions using `Template()` → `[tag, trait]`    | [Templates Guide](templates.md) |
| `theme.ts`     | Design tokens (`useThemeState` + `useTokenState` instances) | [Theme Guide](theme.md)         |
| `ui.ts`        | UI rendering — the main template tree and helper functions  | [UI Guide](ui.md)               |
| `test/`        | Unit and integration tests                                  | [Test Guide](test.md)           |
| `main.ts`      | App entry point — initializes state, renders UI             | [Main Guide](main.md)           |

## Example Structure

```
my-app/
  bdd/
    todo-app.md
  types.ts
  constants.ts
  config.ts
  data.ts
  states.ts
  actions.ts
  machines.ts
  traits.ts
  templates.ts
  theme.ts
  ui.ts
  test/
    states.test.ts
    machines.test.ts
  main.ts
```

## Rules

1. **Every category is its own file.** Do not combine categories (e.g., do not put actions inside states.ts).
2. **Start with single files.** Only break into a folder when the file becomes unmanageable.
3. **No orphan code.** Every piece of logic must belong to one of these categories.
4. **Read before writing.** Before adding to a file, read its current contents to avoid duplication.
