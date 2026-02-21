---
name: Data Table
description: An advanced data table with sorting, filtering, pagination, and row selection
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
  pattern: data-display
---

# Advanced Data Table

Build a feature-rich data table for displaying and managing tabular data.

## Requirements

### Sample Data
Display a table of users with columns:
- Name (sortable, filterable)
- Email (sortable, filterable)
- Role (sortable, filterable)
- Status (sortable, filterable, badge styling)
- Join Date (sortable)

Generate 50+ sample rows for testing pagination and filtering.

### Column Features
- Click column header to sort (ascending/descending/none)
- Show sort indicator (arrow) on sorted column
- Filter input row below headers
- Type to filter (debounced, waits for user to stop typing)
- Configurable column width
- Configurable text alignment (left/center/right)

### Row Selection
- Checkbox in first column of each row
- Checkbox in header to select/deselect all (on current page)
- Selected rows highlighted with different background
- Show selection count: "X of Y selected"
- Persist selection when switching pages

### Bulk Actions
- "Delete Selected" button (enabled only when rows selected)
- Confirmation dialog before deleting
- Clear selection after bulk action
- Update pagination if needed

### Pagination
- Show page size selector (10, 25, 50, 100 rows per page)
- Show current page and total pages: "Page 2 of 5"
- Previous/Next buttons (disabled at boundaries)
- Jump to specific page with page number buttons
- Update URL with current page (optional)

### Toolbar
- Selection info on left: "X of Y items selected"
- Action buttons on right: Export, Columns, Clear Filters
- "Export" dropdown: CSV / JSON
- "Columns" menu: Toggle column visibility
- "Clear Filters" button: Reset all filters (show only when filters active)

### Empty States
- Show friendly message when no data
- Show "No results" message when filters return empty
- Show loading skeleton while fetching data

### Responsive Design
- **Mobile (< 768px)**: Card-based layout instead of table
- **Tablet (768px - 1024px)**: Horizontal scroll if needed
- **Desktop (> 1024px)**: Full table layout

### Card Layout (Mobile)
- Each row becomes a card
- Show checkbox in card header
- Display all fields vertically
- Highlight key information (name)

## BDD Scenarios

### Scenario: Sort by column
```gherkin
Given I am viewing the data table
When I click on the "Name" column header
Then the table should sort by name in ascending order
And an up arrow should appear next to "Name"
When I click on the "Name" header again
Then the table should sort by name in descending order
And a down arrow should appear next to "Name"
When I click on the "Name" header a third time
Then the sort should be removed
And no arrow should appear
```

### Scenario: Filter data
```gherkin
Given I am viewing the data table
When I type "admin" in the Role filter input
Then the table should show only rows where role contains "admin"
And the pagination should update to reflect filtered results
And I should see "X of 50 items" where X is the filtered count
```

### Scenario: Select and delete rows
```gherkin
Given I am viewing the data table
When I check the boxes for 3 rows
Then I should see "3 of 50 selected"
And the "Delete Selected" button should be enabled
When I click "Delete Selected"
Then I should see a confirmation dialog
When I confirm the deletion
Then the 3 rows should be removed from the table
And the selection should be cleared
And the table should show 47 total items
```

### Scenario: Select all on page
```gherkin
Given I am viewing page 1 with 10 items per page
When I click the header checkbox
Then all 10 items on the current page should be selected
When I navigate to page 2
Then the page 2 items should not be selected
```

### Scenario: Change page size
```gherkin
Given I am viewing the table with 10 items per page
And I am on page 3
When I change the page size to 25
Then I should see 25 items per page
And I should be on page 2 (recalculated)
And the pagination should show "Page 2 of 2"
```

### Scenario: Export to CSV
```gherkin
Given I am viewing the data table
When I click "Export"
And I select "CSV"
Then a CSV file should be downloaded
And it should contain all filtered data
And it should include only visible columns
```

### Scenario: Mobile card view
```gherkin
Given I am viewing the table on mobile
Then I should see cards instead of table rows
And each card should show all user information
When I select a card's checkbox
Then the card should be highlighted
And the selection count should update
```

## Acceptance Criteria

- [ ] Table displays sample data correctly
- [ ] Column sorting works (asc/desc/none cycle)
- [ ] Sort indicator shows on active column
- [ ] Filter inputs filter data correctly
- [ ] Filters are debounced (don't filter on every keystroke)
- [ ] Row selection works with checkboxes
- [ ] Select all checkbox works for current page
- [ ] Selection count displays correctly
- [ ] Delete selected removes rows after confirmation
- [ ] Pagination shows correct page info
- [ ] Page size selector updates table
- [ ] Previous/Next buttons work correctly
- [ ] Buttons disabled at page boundaries
- [ ] Export to CSV downloads file
- [ ] Export to JSON downloads file
- [ ] Column toggle hides/shows columns
- [ ] Clear filters button resets all filters
- [ ] Empty state shows when no data
- [ ] Loading skeletons appear during data fetch
- [ ] Mobile card layout displays correctly
- [ ] Responsive layout adapts to screen size
- [ ] Uses theme tokens for all styling
