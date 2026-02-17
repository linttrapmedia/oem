---
name: OEM
description: The agent-first UI framework and toolkit
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Agent Skills for OEM

You are an expert at generating front-end code using OEM. OEM is an agent-first UI framework engineered for seamless human-AI collaboration. It introduces a distinctive compositional syntax that declaratively unifies markup, styling, and behavior. 

Use this document as a reference for how to write OEM applications, including the traits, states, elements, components, and features available in the OEM ecosystem. 

Use each section below to understand the different capabilities of OEM and how to use them effectively in your applications. Each item in the trait, state, element, component, and feature libraries:

## Fundamental Components of OEM

OEM is comprised of three core components that work together to create a powerful and flexible UI framework:

- [Templates](./references/template.md) - These are the user defined templating engines that are used to render dom elements
- [Traits](./references/template.md) - This is OEM's "plugin architecture". It's how a user defines the capabilities of a templating engine. OEM comes with a library of predefined traits but users can (and should) define their own traits to maintain as much of a declarative syntax as possible.
- [State](./references/state.md) - OEM's state management system. It's a simple event bus with helper functions to create and manage state. It's usage within the OEM ecosystem is dependent on calling code, including traits and their implementations.
- [Types](./references/types.md) - Type definitions for OEM. This includes types for traits, templates, and state.

## Trait Library

OEM comes with a growing library of traits that provide a wide range of functionality out of the box. These traits are designed to be composable and extensible, allowing you to easily create complex behaviors by combining them in different ways.

- [Focus](./references/Focus.md) - Focuses an HTML element based on conditions
- [InputEvent](./references/InputEvent.md) - Handles input-related events on form elements
- [TextContent](./references/TextContent.md) - Sets the text content of an HTML element
- [useAttributeTrait](./references/Attribute.md) - Adds an attribute to an HTML element
- [Style](./references/Style.md) - Applies CSS styles to an HTML element
- [InputValue](./references/InputValue.md) - Binds a value to an input or textarea element
- [Event](./references/Event.md) - Attaches event listeners to an HTML element
- [InnerHTML](./references/InnerHTML.md) - Sets the innerHTML of an element with reactive children
- [ClassName](./references/ClassName.md) - Sets the class name of an HTML element
- [StyleOnEvent](./references/StyleOnEvent.md) - Applies CSS styles to an element on a specific event


## State Library

OEM's state management system is simple yet powerful, providing a flexible way to manage state in your applications. The following states are available in the OEM ecosystem:

- [UrlState](./references/UrlState.md) - State Object to track the current URL in the application.

## Element Library

Elements are reusable style definitions can be used by components to maintain consistent styling across the app. They can be thought of as a more powerful version of CSS classes that can also include semantic tokens.



## Component Library

OEM also provides a set of pre-built components that can be used to quickly build common UI patterns with state. These components are designed to be flexible and customizable, allowing you to easily adapt them to your specific needs.



## Module Library

Modules are reusable pieces of logic that can be used by traits to maintain consistent behavior across the app. They can be thought of as a more powerful version of functions that can also include state and side effects.



## Feature Library

Features are compositions of components, traits, and states that provide pre-built application features such as contact forms, todo lists, and more. These features are designed to be easily integrated into your applications, providing a quick and easy way to add common functionality.



## Pattern Library

### Architectural Patterns

OEM is designed to be flexible and adaptable to a wide range of architectural patterns. However, there are a few patterns that are particularly well-suited to the OEM ecosystem:

#### SPA

SPAs have a prescribed structure in order to keep a clean separation of concerns

File structure should be based on High Cohesion and Low Coupling and optimized for LLM interpretation and management. Based on complexity, the following items could exist either as single files or folders with files.

- **actions**:
A library of all the actions that can be dispatched in the app. Each action is a function that returns an object with a type and a payload.

- **machines**:
State machines that define the behavior of the app. Each machine has a state, a set of transitions, and a set of actions that can be dispatched. Implement them as simple switch statements, switching on the current state and the dispatched action.

- **main**:
The entry point of the app. It initializes the state machine and sets up the event listeners for the UI. It also renders the UI based on the current state of the machine.

- **templates**:
A library of templates (using Template and it's destructured [tag, trait]) that can be used to render the UI.

- **traits**:
Any custom traits that are needed for the app that aren't already provided by the core library or that could dramatically simplify the implementation. For example, a trait for handling form input or a trait for managing a list of items.

- **types**:
Type definitions for the app. This can include types for the state, actions, and any other relevant data structures.

- **ui**:
Functions for rendering the UI based on the current state of the machine. This can include functions for rendering different components of the UI, such as a list of todo items or a form for adding new items.

- **theme**:
A set of semantic tokens for styling the app. This can include colors, fonts, spacing, and any other design elements that are used throughout the app.
