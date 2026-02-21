---
name: Documentation App
description: A documentation browser with navigation, search, and syntax highlighting
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
  pattern: documentation
---

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
