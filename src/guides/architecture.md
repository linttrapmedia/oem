---
name: Architectural Patterns
description: File structure conventions and architectural patterns for OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Architectural Patterns

## Folder/File Structure

In order to keep a clean separation of concerns file structures should be based on High Cohesion and Low Coupling and optimized for LLM interpretation and management. The cohesion should exist as "logical coupling", like that of a Mathematical Library where each function is related to the other merely by category. For example "actions" is just a library of actions. They aren't necessarily meant to be "used together", only they share a common role in the code base (to carry out actions). Below is a list of the basic categories. Based on complexity, the following items could exist either as single files or folders with files. Start by making them single files, but if they grow too large, break them down into folders with multiple files.

- **bdd**:
  Behavior-driven design files that document requirements, acceptance criteria, and use cases for the app. These files should clearly articulate expected behaviors and scenarios to guide development and provide context for LLM-assisted coding sessions.

- **types**:
  Type definitions for the app. This can include types for the state, actions, and any other relevant data structures.

- **constants**:
  Any constant values that are used throughout the app. This can include things like API endpoints, fixed configuration values, or any other data that is truly constant and does not need to trigger re-renders when it changes.

- **config**:
  Configuration settings for the app. This can include things like feature flags, environment variables, or any other settings that may need to be changed based on the deployment environment but do not need to trigger re-renders when they change.

- **data**:
  Static data that is used in the app. This can include things like lists of options for dropdowns, static content for marketing pages, or any other data that is not expected to change frequently and does not need to trigger re-renders when it changes.

- **states**:
  State objects that can be used in the app. These can be simple reactive state objects created with the State function, they should be used to store any state that needs to be shared across multiple components or that needs to trigger re-renders when it changes.

- **actions**:
  A library of all the actions that can be dispatched in the app. Each action is a function that returns an object with a type and a payload.

- **machines**:
  State machines that define the behavior of the app. Each machine has a state, a set of transitions, and a set of actions that can be dispatched. Implement them as simple switch statements, switching on the current state and the dispatched action.

- **traits**:
  The default traits provided by the core library are often sufficient for most use cases, but you may find that you need to create custom traits to handle specific behaviors or patterns in your app. This file or folder can be used to store a library of any custom traits that you create for your app. These traits can then be imported and used in your templates to add functionality to your UI components.

- **templates**:
  A library of templates (using Template and it's destructured [tag, trait]) that can be used to render the UI. Multiple templates can be used in the app, but it's often best to keep them organized in a single file or folder.

- **theme**:
  A library of all the design tokens used in the app. Contains the single `useThemeState` instance and all `useTokenState` tokens generated during development. Each token must have a documentation comment (what / when to use / when not to use) so that future LLM sessions can reuse existing tokens or decide when to add new ones. Tokens follow the `<category>_<property>_<variant>` naming convention.

- **ui**:
  Using proper idiomatic OEM usually allows for their to be a single UI as one large template function that renders the entire app since state in OEM is made up of a number of reactive state objects that can be used anywhere and not tied to any single template or component. However, in more complex apps, you may want to break down the UI into smaller components for better organization and readability. This file or folder can be used to store these components, which can then be imported and used in the main UI template. Components are just regular functions no different then if they written inline in the main UI template, but breaking them out can help with organization and readability.

- **test**
  Unit and integration tests for the app. Test files should mirror the structure of the source code and use a testing framework appropriate for your environment (e.g., Jest, Vitest, or similar). Tests should cover state management, actions, machines, and UI components to ensure reliability and maintainability.

- **main**:
  The entry point of the app. It initializes the state machine and sets up the event listeners for the UI. It also renders the UI based on the current state of the machine.
