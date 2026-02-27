---
name: oem
description: Manual for generating front-end applications using OEM, the agent-first UI framework and toolkit.
---

# This Guide

You are a front-end expert and an expert at writing idiomatic OEM. This document is a guide and canonical reference on how OEM applications are structured and how to use the framework effectively and write OEM's distinctive compositional syntax that declaratively unifies markup, styling, and behavior.

## Core Library & Fundamentals

The core library provides the fundamental building blocks of the OEM ecosystem. It includes the Template function for creating a user-defined templating engine, the State function for creating a micro event-bus and state object, and the useThemeState function for managing design tokens in a centralized way. The core library also includes type definitions for OEM, which can be found in the references.

- [Template](../references/core/template.md) - Core template engine for creating declarative and reactive UI applications
- [State](../references/core/state.md) - Reactive event bus with publish-subscribe state management
- [Types](../references/core/types.md) - Common TypeScript type definitions for reactive conditions, testing, and utilities
- [Util](../references/core/util.md) - Runtime helpers for working with State objects and Conditions


## Trait Library

The following traits come with OEM. Traits are reusable pieces of logic that give the abilities and behaviors to your custom template engine. They can be thought of as plugins that can be applied to the output of the Template function to create a powerful and flexible system for generating UI.

- [useFocusTrait](../references/traits/Focus.md) - Focuses an HTML element based on conditions
- [useInputEventTrait](../references/traits/InputEvent.md) - Handles input-related events on form elements
- [useTextContentTrait](../references/traits/TextContent.md) - Sets the text content of an HTML element
- [useAttributeTrait](../references/traits/Attribute.md) - Adds an attribute to an HTML element
- [useStyleTrait](../references/traits/Style.md) - Applies CSS styles to an HTML element
- [useInputValueTrait](../references/traits/InputValue.md) - Binds a value to an input or textarea element
- [useEventTrait](../references/traits/Event.md) - Attaches event listeners to an HTML element
- [useInnerHTMLTrait](../references/traits/InnerHTML.md) - Sets the innerHTML of an element with reactive children
- [useClassNameTrait](../references/traits/ClassName.md) - Sets the class name of an HTML element
- [useStyleOnEventTrait](../references/traits/StyleOnEvent.md) - Applies CSS styles to an element on a specific event


## State Library

OEM's state management system is simple yet powerful, providing a flexible way to manage state in your applications. The following states are available in the OEM ecosystem:

- [UrlState](../references/states/UrlState.md) - State Object to track the current URL in the application.
- [MediaQueryState](../references/states/MediaQueryState.md) - Reactive state for tracking media query matches based on viewport width and media type
- [useThemeState](../references/states/ThemeState.md) - A simple State object of 'light' and 'dark'
- [useTokenState](../references/states/TokenState.md) - A simple State object to manage a single design token setting

## Guides

The following guides cover theming, design decisions, code idioms, and architectural patterns:

- [Data File](../references/guides/file-data.md) - How to define and organize static data in OEM applications.
- [Folder & File Structure](../references/guides/architecture.md) - Canonical folder and file structure for OEM applications, with links to detailed guides for each category.
- [Constants File](../references/guides/file-constants.md) - How to define and organize constant values in OEM applications.
- [Theme File](../references/guides/file-theme.md) - How to define and organize design tokens and theming in OEM applications.
- [UI File](../references/guides/file-ui.md) - How to structure and organize the UI rendering layer in OEM applications.
- [BDD Files](../references/guides/file-bdd.md) - How to write and use behavior-driven design files that document requirements, acceptance criteria, and use cases.
- [Main File](../references/guides/file-main.md) - How to structure the application entry point in OEM applications.
- [Types File](../references/guides/file-types.md) - How to define and organize TypeScript type definitions for OEM applications.
- [Config File](../references/guides/file-config.md) - How to define and organize environment-aware configuration settings in OEM applications.
- [Testing](../references/guides/testing.md) - A comprehensive guide to testing strategies, best practices, and tools for ensuring code quality and reliability in your projects.
- [Idiomatic OEM](../references/guides/idioms.md) - Best practices and idioms for writing clean, consistent OEM code.
- [Design Decision Guide](../references/guides/design-decisions.md) - Heuristics and rules for making visual and structural design decisions in OEM applications.
- [Theming & Design Tokens](../references/guides/theming.md) - How OEM's token-driven theming system works — architecture, token creation, naming conventions, and usage rules.
- [Test Files](../references/guides/file-test.md) - How to organize and write tests for OEM applications.
- [States File](../references/guides/file-states.md) - How to define and organize reactive State objects in OEM applications.
- [Git](../references/guides/git.md) - Best practices and conventions for using Git in your projects
- [Machines File](../references/guides/file-machines.md) - How to define and organize state machines in OEM applications.
- [Actions File](../references/guides/file-actions.md) - How to define and organize action creator functions in OEM applications.
- [Templates File](../references/guides/file-templates.md) - How to define and organize Template instances in OEM applications.
- [Custom Traits File](../references/guides/file-traits.md) - How to define and organize custom trait functions in OEM applications.
