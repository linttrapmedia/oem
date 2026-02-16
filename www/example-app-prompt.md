# Goal:

Create an app called {}

## View States:

- dashboard
  - create
  - read
  - update
  - delete
  - list

## File Structure

actions.ts:
A library of all the actions that can be dispatched in the app. Each action is a function that returns an object with a type and a payload.

machines.ts:
State machines that define the behavior of the app. Each machine has a state, a set of transitions, and a set of actions that can be dispatched. Implement them as simple switch statements, switching on the current state and the dispatched action.

main.ts:
The entry point of the app. It initializes the state machine and sets up the event listeners for the UI. It also renders the UI based on the current state of the machine.

templates.ts:
A library of templates (using Template and it's destructured [tag, trait]) that can be used to render the UI.

traits.ts:
Any custom traits that are needed for the app that aren't already provided by the core library or that could dramatically simplify the implementation. For example, a trait for handling form input or a trait for managing a list of items.

types.ts:
Type definitions for the app. This can include types for the state, actions, and any other relevant data structures.

ui.ts:
Functions for rendering the UI based on the current state of the machine. This can include functions for rendering different components of the UI, such as a list of todo items or a form for adding new items.

theme.ts:
A set of semantic tokens for styling the app. This can include colors, fonts, spacing, and any other design elements that are used throughout the app.
