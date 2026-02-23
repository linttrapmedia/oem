---
name: OEM examples
description: Reference application prompts and BDD scenarios for common OEM application patterns
---

# Example Applications

Reference prompts for building common application types with OEM.
Each includes requirements, BDD scenarios, and acceptance criteria.

## Chat Interface

_A real-time messaging interface with typing indicators and message history_

# Chat Interface

Build a conversational UI for real-time messaging with message history and user presence.

## Requirements

### Layout
1. **Sidebar** (left): User list with online status (hide on mobile)
2. **Chat Area** (center): Message history and input
3. **Header**: Current conversation name, connection status, menu button (mobile)

### User List (Sidebar)
- Display list of users/conversations
- Show avatar (emoji or image)
- Show online status indicator (green dot for online, yellow for away, gray for offline)
- Show last seen time for offline users
- Search bar to filter users/conversations
- Click user to switch conversations (future enhancement)

### Message Display
- Messages grouped by sender
- Show sender avatar on first message in group
- Show sender name above first message in group
- Timestamp headers when > 5 minutes between messages
- Different visual style for own messages vs received messages
- Own messages: right-aligned, primary color background
- Received messages: left-aligned, secondary background
- Message status indicators (sending, sent, delivered, read) for own messages

### Message Input
- Multi-line textarea that auto-expands (max 4 lines)
- "Send" button (enabled only when text is present)
- Enter key to send, Shift+Enter for new line
- Show character limit if applicable
- File attachment button (UI only, no upload required)

### Typing Indicator
- Show "User is typing..." when other user is typing
- Show animated dots during typing
- Hide when message is received
- Support multiple users typing: "User1 and User2 are typing..."

### Message Features
- Display text messages
- Display image attachments (thumbnails, click to expand)
- Display file attachments with download icon
- Relative timestamps: "Just now", "5m ago", "2h ago", or full time
- Double-click message to edit (own messages only)
- Hover to show message actions (edit, delete)

### Auto-Scroll
- Automatically scroll to bottom when new message arrives
- Automatically scroll to bottom when user sends message
- Don't auto-scroll if user has scrolled up to view history

### Demo Mode
- Simulate incoming messages after 2-3 seconds
- Show typing indicator before message appears
- At least 3 demo messages to showcase features

### Responsive Design
- **Mobile (< 768px)**: Full-screen chat, sidebar hidden (toggle with button)
- **Tablet (768px - 1024px)**: Collapsible sidebar
- **Desktop (> 1024px)**: Always-visible sidebar

## BDD Scenarios

### Scenario: Send a message
```gherkin
Given I am viewing the chat interface
When I type "Hello, how are you?" in the input field
And I click "Send"
Then I should see "Hello, how are you?" appear in the message area
And the message should be right-aligned with primary color background
And the message should show "Sending..." status briefly
And the input field should be cleared
And the chat should scroll to the bottom
```

### Scenario: Receive a message
```gherkin
Given I am viewing the chat interface
When a new message arrives from another user
Then I should see a typing indicator appear
And after 2 seconds, the typing indicator should disappear
And the message should appear left-aligned
And the message should show the sender's avatar and name
And the chat should scroll to the bottom
```

### Scenario: Message grouping
```gherkin
Given I send "Message 1"
When I immediately send "Message 2"
Then both messages should be grouped together
And only the first message should show my avatar
And no sender name should appear between them
```

### Scenario: Timestamp headers
```gherkin
Given the last message was sent 10 minutes ago
When a new message arrives
Then I should see a timestamp header before the new message
And the header should show the time like "2:45 PM"
```

### Scenario: Auto-expanding input
```gherkin
Given I am typing in the input field
When I press Enter without shift
Then the message should be sent
When I press Shift+Enter
Then a new line should be added
And the textarea should expand vertically
And the textarea should not expand beyond 4 lines
```

### Scenario: Mobile menu
```gherkin
Given I am viewing the chat on mobile
Then the sidebar should be hidden
When I click the menu button in the header
Then the sidebar should slide in
And I should see the user list
When I click outside the sidebar
Then the sidebar should close
```

## Acceptance Criteria

- [ ] Messages send when clicking Send button or pressing Enter
- [ ] Own messages appear right-aligned with distinct styling
- [ ] Received messages appear left-aligned with avatar
- [ ] Message grouping works (same sender, < 5 min apart)
- [ ] Timestamp headers appear between message groups
- [ ] Typing indicator shows before demo messages arrive
- [ ] User list displays with online status indicators
- [ ] Message status updates (sending → sent → delivered)
- [ ] Auto-scroll works for new messages
- [ ] Auto-scroll disabled when user scrolls up
- [ ] Input field clears after sending
- [ ] Multi-line input expands up to 4 lines
- [ ] Search bar filters user list
- [ ] Mobile menu toggles sidebar visibility
- [ ] Responsive layout adapts to screen size
- [ ] Uses theme tokens for all styling

---

## Analytics Dashboard

_A data visualization dashboard with metrics, charts, and tables_

# Analytics Dashboard

Build an analytics dashboard displaying key metrics, charts, and data tables with real-time updates.

## Requirements

### Layout Sections
1. **Header**: Title, last updated time, time period selector
2. **Metrics Cards**: 4 key metrics in a grid
3. **Charts Section**: Line chart and donut chart
4. **Activity Feed**: Recent activity items
5. **Data Table**: Top products/items with sorting

### Metrics Cards
Display 4 cards showing:
- Total Revenue (with % change indicator)
- Total Users (with % change indicator)
- Conversion Rate (with % change indicator)
- Growth Rate (with % change indicator)

Each card shows:
- Icon or emoji
- Metric value (formatted)
- Trend indicator (up/down arrow)
- Percentage change vs previous period
- Color-coded trend (green for positive, red for negative)

### Time Period Selector
- Buttons for: Day / Week / Month / Year
- Highlight active period
- Update all data when period changes

### Charts
1. **Line Chart**: Revenue trend over time (simplified visualization)
2. **Distribution Chart**: Category breakdown (can be simple bars)

### Activity Feed
- Display recent 5-10 activity items
- Each item shows:
  - Activity type icon
  - Description
  - Time ago (e.g., "2h ago")
  - Amount/value if applicable

### Data Table
- Sortable columns (click header to sort)
- Display top 5-10 items
- Columns: Product name, Revenue, Orders, Conversion rate
- Hover effect on rows

### Data Updates
- Show loading skeletons while fetching data
- Auto-refresh every 30 seconds
- Manual refresh button

### Responsive Design
- **Mobile (< 768px)**: Single column, stacked cards
- **Tablet (768px - 1024px)**: 2-column grid for metrics
- **Desktop (> 1024px)**: 4-column grid for metrics, side-by-side charts

## BDD Scenarios

### Scenario: View dashboard with loaded data
```gherkin
Given I navigate to the dashboard
When the page loads
Then I should see 4 metric cards with values
And I should see a revenue trend chart
And I should see an activity feed with recent items
And I should see a data table with products
```

### Scenario: Change time period
```gherkin
Given I am viewing the dashboard with "Week" selected
When I click "Month"
Then the "Month" button should be highlighted
And all metrics should update with monthly data
And the chart should show monthly data points
And loading skeletons should appear briefly during the update
```

### Scenario: Sort data table
```gherkin
Given I am viewing the data table
When I click the "Revenue" column header
Then the table should sort by revenue in ascending order
When I click the "Revenue" header again
Then the table should sort by revenue in descending order
And an arrow indicator should show the sort direction
```

### Scenario: Auto-refresh
```gherkin
Given I am viewing the dashboard
When 30 seconds pass
Then the dashboard should automatically fetch new data
And the "Last updated" time should be updated
```

### Scenario: Loading states
```gherkin
Given the dashboard is loading data
When data is being fetched
Then I should see skeleton loaders for metrics cards
And I should see skeleton loaders for charts
And the content should not jump when data loads
```

## Acceptance Criteria

- [ ] All 4 metric cards display correctly
- [ ] Trend indicators show correct direction and color
- [ ] Time period selector updates all data
- [ ] Charts render with sample data
- [ ] Activity feed displays recent items
- [ ] Data table supports column sorting
- [ ] Loading skeletons appear during data fetch
- [ ] Auto-refresh works every 30 seconds
- [ ] Last updated timestamp updates correctly
- [ ] Responsive grid adapts to screen size
- [ ] All components use theme tokens
- [ ] Hover states provide visual feedback

---

## Todo App

_A full-featured todo application with filtering and persistence_

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

---

## Multi-Step Wizard

_A multi-step form wizard with validation and progress tracking_

# Multi-Step Wizard Form

Build a multi-step form wizard that guides users through a complex data entry process.

## Requirements

### Steps
1. **Personal Information**: Name, email, phone, date of birth, account type
2. **Address**: Shipping address, optional separate billing address
3. **Payment**: Card details, save card option
4. **Review**: Summary of all entered information
5. **Success**: Confirmation screen

### Progress Indicator
- Visual progress bar showing completion percentage
- Step indicators showing: completed, current, and upcoming steps
- Step labels: Personal / Address / Payment / Review
- Click on completed steps to navigate back
- Cannot skip ahead to unvisited steps

### Navigation
- "Next" button advances to next step (validates current step first)
- "Previous" button goes back one step (no validation)
- "Submit" button on review step
- Cannot proceed if current step has validation errors

### Step 1: Personal Information
- First name (required, min 2 chars)
- Last name (required, min 2 chars)
- Email (required, valid format)
- Phone (required, valid format)
- Date of birth (required, date picker)
- Account type (required, radio buttons: Personal / Business)

### Step 2: Address
- Street address (required)
- City (required)
- State (required)
- ZIP code (required, format: XXXXX or XXXXX-XXXX)
- Country (default: US)
- Checkbox: "Billing address same as shipping"
- If unchecked, show additional billing address fields

### Step 3: Payment
- Card number (required, 16 digits)
- Cardholder name (required)
- Expiry date (required, format: MM/YY)
- CVV (required, 3-4 digits)
- Checkbox: "Save card for future purchases"

### Step 4: Review
- Display all entered information in sections
- Each section has an "Edit" button to go back to that step
- Clear visual hierarchy
- Submit button at bottom

### Step 5: Success
- Success icon/checkmark
- Confirmation message
- "Start Over" button to reset wizard

### Validation
- Validate each step before allowing navigation to next
- Show field-level error messages
- Highlight fields with errors
- Display summary of errors at top if multiple fields invalid

### Responsive Design
- **Mobile (< 768px)**: Compact progress bar, stacked form fields
- **Tablet (768px - 1024px)**: Horizontal progress bar, wider form
- **Desktop (> 1024px)**: Centered form with side progress indicator option

## BDD Scenarios

### Scenario: Complete wizard successfully
```gherkin
Given I am on step 1 of the wizard
When I fill in all personal information correctly
And I click "Next"
Then I should be on step 2
When I fill in the address information
And I check "Billing address same as shipping"
And I click "Next"
Then I should be on step 3
When I fill in valid payment information
And I click "Next"
Then I should see a review of all my information
When I click "Submit"
Then I should see a success confirmation
```

### Scenario: Validation prevents navigation
```gherkin
Given I am on step 1 of the wizard
When I leave the email field empty
And I click "Next"
Then I should see "Email is required" error
And I should remain on step 1
```

### Scenario: Navigate back to edit
```gherkin
Given I am on the review step
When I click "Edit" on the Personal Information section
Then I should navigate back to step 1
And my previously entered data should still be filled in
When I update the email address
And I click "Next" through to review again
Then I should see the updated email address
```

### Scenario: Conditional billing address
```gherkin
Given I am on step 2 (Address)
When I uncheck "Billing address same as shipping"
Then I should see additional billing address fields appear
When I check the box again
Then the billing address fields should hide
```

### Scenario: Progress indicator
```gherkin
Given I am on step 2 of the wizard
Then the progress bar should show 50% complete
And step 1 should be marked as completed
And step 2 should be marked as current
And steps 3-4 should be marked as upcoming
```

## Acceptance Criteria

- [ ] All 5 steps render correctly
- [ ] Progress bar updates with each step
- [ ] Step validation prevents invalid navigation
- [ ] Previous button navigates back without validation
- [ ] Next button validates before advancing
- [ ] Can navigate to previously visited steps via progress indicator
- [ ] Cannot skip ahead to unvisited steps
- [ ] Conditional billing address fields work
- [ ] Review step displays all entered data
- [ ] Edit buttons on review step navigate correctly
- [ ] Submit button only appears on review step
- [ ] Success screen displays after submission
- [ ] Form data persists when navigating between steps
- [ ] Responsive layout adapts to screen size
- [ ] Uses theme tokens for styling

---

## Contact Form

_A responsive contact form with validation and submission feedback_

# Contact Form

Build a professional contact form using OEM that collects user information and provides clear feedback.

## Requirements

### Form Fields
1. Full name (required, min 2 characters)
2. Email address (required, valid email format)
3. Subject (required)
4. Message (required, min 10 characters, max 500 characters with counter)
5. Phone number (optional, but validate if provided)

### Validation
- Real-time validation on blur for each field
- Display field-level error messages below inputs
- Prevent submission if validation fails
- Clear errors when user starts typing

### Submission
- Show loading state during submission (button text: "Sending...")
- Disable form during submission
- Display success message on successful submission
- Display error message on failure
- Clear form after successful submission

### Responsive Design
- **Mobile (< 768px)**: Single column, full-width inputs
- **Tablet (768px - 1024px)**: Single column with comfortable spacing
- **Desktop (> 1024px)**: Centered form with max-width 600px

### UI Elements
- Card container with shadow
- Labeled inputs with proper associations
- Character counter for message field (updates in real-time)
- Submit button with hover and disabled states
- Success/error message banner that auto-dismisses after 5 seconds

## BDD Scenarios

### Scenario: User submits valid form
```gherkin
Given I am on the contact form
When I fill in "Full Name" with "John Doe"
And I fill in "Email" with "john@example.com"
And I fill in "Subject" with "Website Inquiry"
And I fill in "Message" with "I would like to learn more about your services"
And I click "Send Message"
Then I should see "Sending..." on the button
And after submission I should see "Thank you! Your message has been sent successfully."
And the form should be cleared
```

### Scenario: User submits invalid email
```gherkin
Given I am on the contact form
When I fill in "Email" with "invalid-email"
And I tab to the next field
Then I should see "Invalid email format" below the email field
And the email field should have a red border
```

### Scenario: User tries to submit empty form
```gherkin
Given I am on the contact form
When I click "Send Message" without filling any fields
Then I should see validation errors for all required fields
And the form should not be submitted
```

### Scenario: Character counter updates
```gherkin
Given I am on the contact form
When I type "Hello" in the message field
Then I should see "5/500" as the character count
```

## Acceptance Criteria

- [ ] All required field validations work correctly
- [ ] Email validation uses proper regex pattern
- [ ] Character counter updates on every keystroke
- [ ] Form submits only when all validations pass
- [ ] Loading state prevents double submission
- [ ] Success message appears and auto-dismisses
- [ ] Form is keyboard accessible (tab navigation, enter to submit)
- [ ] Error messages are clear and actionable
- [ ] Responsive layout works on all breakpoints
- [ ] Theme tokens are used for all colors and spacing

---

## Data Table

_An advanced data table with sorting, filtering, pagination, and row selection_

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

---

## Documentation App

_A documentation browser with navigation, search, and syntax highlighting_

# Documentation App

Build a documentation viewer with sidebar navigation, full-text search, and content rendering.

## Requirements

### Layout Structure
1. **Sidebar** (left): Navigation tree with sections and pages
2. **Main Content** (center): Document viewer with formatted content
3. **Table of Contents** (right): On-page heading navigation (desktop only)
4. **Header**: Logo/title, search bar, theme toggle

### Sample Documentation Structure
```
Getting Started
  ├─ Introduction
  ├─ Installation
  └─ Quick Start

API Reference
  ├─ Components
  │   ├─ Button
  │   ├─ Input
  │   └─ Modal
  ├─ Utilities
  └─ Hooks

Guides
  ├─ Styling
  ├─ State Management
  └─ Testing

Examples
  └─ Sample Projects
```

### Sidebar Navigation
- Collapsible sections (click to expand/collapse)
- Highlight active page
- Show expand/collapse icons (▶ / ▼)
- Persist expanded state
- Smooth transitions for expand/collapse
- Auto-expand section containing current page
- Mobile: Hide sidebar, show menu button to toggle

### Main Content Area
- Render markdown-style content (headers, paragraphs, lists, code blocks)
- Syntax highlighting for code blocks (use a simple color scheme)
- Copy button on code blocks
- Clickable anchor links on headings (# link icon on hover)
- Images with captions
- Info/warning/error callout boxes
- Breadcrumb navigation at top (Home > API Reference > Components > Button)
- Previous/Next page navigation at bottom

### Table of Contents (Desktop Only)
- Auto-generate from h2 and h3 headings in content
- Highlight current section as user scrolls
- Click to jump to section
- Sticky positioning
- Show/hide based on viewport width

### Search Feature
- Search input in header
- Keyboard shortcut to focus: Cmd/Ctrl + K
- Search across all page titles and content
- Display results in dropdown below search bar
- Highlight matching text in results
- Show page path for each result (e.g., "API Reference > Components")
- Click result to navigate to that page
- Show "No results" message if no matches
- Clear button (X) in search input
- Close search results when clicking outside

### Page Content Features
- H1: Page title
- H2: Major sections
- H3: Subsections
- Paragraphs with proper spacing
- Inline code formatting with background
- Code blocks with language label and copy button
- Unordered and ordered lists
- Blockquotes with left border
- Tables with header row styling
- Callout boxes: Info (blue), Warning (yellow), Error (red), Success (green)

### Keyboard Navigation
- Tab through navigation items
- Enter to navigate to page
- Space to expand/collapse section
- Arrow keys to move between navigation items
- Esc to close search results

### Responsive Design
- **Mobile (< 768px)**: Full-screen content, hidden sidebar (toggle with menu), no TOC
- **Tablet (768px - 1024px)**: Collapsible sidebar, no TOC
- **Desktop (> 1024px)**: Always-visible sidebar, sticky TOC on right

### URL Routing
- Each page has a unique URL path (e.g., /api-reference/components/button)
- Update URL when navigating without page reload
- Support browser back/forward buttons
- Load correct page on initial URL

## BDD Scenarios

### Scenario: Navigate through documentation
```gherkin
Given I am on the documentation homepage
When I click "API Reference" in the sidebar
Then the "API Reference" section should expand
When I click "Components"
Then the "Components" section should expand
When I click "Button"
Then the main content should display the Button documentation
And "Button" should be highlighted in the sidebar
And the URL should be "/api-reference/components/button"
```

### Scenario: Expand and collapse sections
```gherkin
Given I am viewing the sidebar
And the "API Reference" section is collapsed
When I click on "API Reference"
Then the section should expand
And an expand icon (▼) should be shown
And its child pages should become visible
When I click on "API Reference" again
Then the section should collapse
And a collapse icon (▶) should be shown
And its child pages should be hidden
```

### Scenario: Search documentation
```gherkin
Given I am viewing the documentation
When I press "Cmd+K"
Then the search input should be focused
When I type "state"
Then I should see a dropdown with matching results
And results should show page titles and snippets
And matches should be highlighted
When I click on a search result
Then I should navigate to that page
And the search dropdown should close
```

### Scenario: Table of contents navigation
```gherkin
Given I am viewing a documentation page on desktop
Then I should see a table of contents on the right
And it should list all h2 and h3 headings
When I click on a heading in the TOC
Then the page should scroll to that section
And the TOC item should be highlighted
When I scroll down the page
Then the TOC should update to highlight the current section
```

### Scenario: Copy code block
```gherkin
Given I am viewing a documentation page with code examples
When I hover over a code block
Then I should see a "Copy" button
When I click the "Copy" button
Then the code should be copied to my clipboard
And the button should change to "Copied!" briefly
```

### Scenario: Mobile navigation
```gherkin
Given I am viewing the docs on mobile
Then the sidebar should be hidden
And I should see a menu button in the header
When I click the menu button
Then the sidebar should slide in from the left
When I select a page
Then the sidebar should close
And the selected page should be displayed
```

### Scenario: Breadcrumb navigation
```gherkin
Given I am viewing "API Reference > Components > Button"
Then I should see a breadcrumb at the top: "Home > API Reference > Components > Button"
When I click "API Reference" in the breadcrumb
Then I should navigate to the API Reference overview page
```

### Scenario: Previous/Next navigation
```gherkin
Given I am viewing the "Installation" page
Then I should see a "Next: Quick Start" link at the bottom
When I click "Next: Quick Start"
Then I should navigate to the Quick Start page
And I should see "Previous: Installation" at the bottom
```

## Acceptance Criteria

- [ ] Sidebar displays nested navigation tree
- [ ] Sections expand and collapse on click
- [ ] Active page is highlighted in sidebar
- [ ] Main content renders formatted text
- [ ] Code blocks have syntax highlighting
- [ ] Copy button works on code blocks
- [ ] Table of contents generates from headings
- [ ] TOC highlights current section on scroll
- [ ] Search input focuses with Cmd/Ctrl+K
- [ ] Search returns relevant results
- [ ] Search results navigate to correct pages
- [ ] Breadcrumbs show current location
- [ ] Previous/Next links work correctly
- [ ] URLs update when navigating
- [ ] Browser back/forward buttons work
- [ ] Mobile menu toggles sidebar
- [ ] Responsive layout adapts to screen size
- [ ] Theme toggle switches between light/dark
- [ ] Uses theme tokens for all styling
- [ ] Keyboard navigation works throughout