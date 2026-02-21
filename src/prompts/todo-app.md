---
name: Todo App
description: A full-featured todo application with filtering and persistence
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
  pattern: crud-list
---

# Todo App

Build a complete todo application with CRUD operations, filtering, and local storage persistence.

## Requirements

### Core Features
1. Add new todos with text input (Enter key or button)
2. Toggle todo completion status (checkbox)
3. Edit todo text (double-click to edit, Enter to save, Escape to cancel)
4. Delete individual todos (delete button, shown on hover)
5. Filter todos: All / Active / Completed
6. Display count of active (incomplete) todos
7. Clear all completed todos at once
8. Toggle all todos complete/incomplete
9. Persist todos to localStorage
10. Load todos from localStorage on app start

### Todo Item Properties
- Unique ID
- Text content
- Completed status (boolean)
- Created timestamp
- Last edited timestamp (if edited)

### Filters
- **All**: Show all todos
- **Active**: Show only incomplete todos
- **Completed**: Show only completed todos
- Highlight active filter

### Responsive Design
- **Mobile (< 768px)**: Compact layout, stacked filter buttons
- **Tablet (768px - 1024px)**: Comfortable spacing
- **Desktop (> 1024px)**: Centered container, max-width 800px

### Visual States
- Completed todos: line-through text, reduced opacity
- Hover states: Show delete button, background change
- Empty state: Friendly message when no todos
- Edit mode: Show input with border, focus automatically

## BDD Scenarios

### Scenario: Add a new todo
```gherkin
Given I am on the todo app
When I type "Buy groceries" in the input field
And I press Enter
Then I should see "Buy groceries" in the todo list
And the input field should be cleared
And the active count should increase by 1
```

### Scenario: Complete a todo
```gherkin
Given I have a todo "Buy groceries"
When I click the checkbox next to "Buy groceries"
Then the todo should have a line-through style
And the active count should decrease by 1
And the todo should move to the completed section when filtered
```

### Scenario: Edit a todo
```gherkin
Given I have a todo "Buy groceries"
When I double-click on "Buy groceries"
Then I should see an input field with "Buy groceries" as the value
When I change it to "Buy organic groceries"
And I press Enter
Then the todo text should be updated to "Buy organic groceries"
And the edit mode should close
```

### Scenario: Filter todos
```gherkin
Given I have 3 todos: "Task 1", "Task 2" (completed), "Task 3"
When I click the "Active" filter
Then I should see only "Task 1" and "Task 3"
When I click the "Completed" filter
Then I should see only "Task 2"
```

### Scenario: Clear completed todos
```gherkin
Given I have 5 todos, 2 of which are completed
When I click "Clear completed"
Then the 2 completed todos should be removed
And I should see only the 3 active todos
```

### Scenario: Persistence
```gherkin
Given I have created 3 todos
When I refresh the page
Then I should still see all 3 todos
And their completion status should be preserved
```

## Acceptance Criteria

- [ ] Can add todos by pressing Enter or clicking button
- [ ] Can toggle todo completion with checkbox
- [ ] Can edit todos by double-clicking
- [ ] Can delete individual todos
- [ ] Filter buttons work correctly (All/Active/Completed)
- [ ] Active todo count updates correctly
- [ ] Can clear all completed todos at once
- [ ] Toggle all functionality works
- [ ] Todos persist to localStorage
- [ ] Todos load from localStorage on page load
- [ ] Empty state shows when no todos match filter
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Responsive layout adapts to screen size
- [ ] Uses theme tokens for styling
