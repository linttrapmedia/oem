---
name: Analytics Dashboard
description: A data visualization dashboard with metrics, charts, and tables
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
  pattern: data-visualization
---

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
