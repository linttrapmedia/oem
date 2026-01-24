# Todo Calendar Example

A fully-featured todo application with calendar and list views built with OEM.

## Features

- **Calendar View**: Visual calendar showing todos organized by date
- **List View**: Traditional list view of all todos sorted by date
- **Add Todos**: Add todos to specific dates
- **Toggle Complete**: Mark todos as complete/incomplete
- **Delete Todos**: Remove todos
- **Month Navigation**: Browse through different months
- **Date Selection**: Click calendar days to select date for new todos
- **Today Highlight**: Current date is highlighted in the calendar
- **Visual Feedback**: Hover effects, transitions, and responsive design

## Running the Example

```bash
# From the root of the OEM project
bun ./examples/todoCalendar/index.html --watch
```

Or using make:
```bash
make examples
```

Then navigate to the todoCalendar example in your browser.

## OEM Patterns Used

### State Management
- Multiple state objects for todos, view mode, selected date, and input
- State arrays for todo list
- Complex state updates using `reduce()`

### Dollar Pattern
- `$val` for reactive text rendering
- `$test` for conditional styling and visibility
- `$set` for direct state updates in event handlers
- `$reduce` for state transformations

### Template Configuration
- Configured with multiple traits: style, event, attr, class, html
- Single `[tag, trait]` tuple shared across entire app

### Component Pattern
- Pure functions returning elements
- Props passed as function parameters
- Nested component composition

### Reactive Rendering
- Calendar grid re-renders on month change or todo updates
- List view dynamically updates on todo changes
- Selected date display updates reactively

### Event Handling
- Click handlers for buttons and calendar days
- Input events for text field
- Keyboard events (Enter to add todo)
- Hover events for visual feedback

### Styling Techniques
- Inline styles with trait.style()
- Conditional styling based on state
- Dynamic hover effects
- Gradient backgrounds
- Responsive layout with flexbox and grid

## Code Structure

- **State**: All application state defined at top
- **Utility Functions**: Helper functions for date manipulation
- **Actions**: State update functions
- **Components**: Reusable UI component functions
- **Main App**: Composition of all components
- **Mount**: Single `appendChild` to attach to DOM

## Key Concepts Demonstrated

1. **Single File Application**: Entire app in one file
2. **Type Safety**: TypeScript types for todos and state
3. **Functional Components**: No classes, just functions
4. **Reactive UI**: Automatic updates via $ methods
5. **Clean Event Handlers**: Using $ methods to avoid verbose arrow functions
6. **Component Composition**: Building complex UI from simple functions
7. **State-First Design**: Define state before building UI
8. **No Virtual DOM**: Direct DOM manipulation with reactive subscriptions
