import { State } from '../src/registry';

// ─── Types ─────────────────────────────────────────────────────────────────

export type BDDStep = {
  type: 'Given' | 'When' | 'Then' | 'And';
  text: string;
};

export type BDDScenario = {
  id: string;
  title: string;
  steps: BDDStep[];
};

export type PromptTemplate = {
  id: string;
  name: string;
  icon: string;
  description: string;
  pattern: string;
  defaultRequirements: string;
};

export type WizardData = {
  templateId: string;
  name: string;
  description: string;
  pattern: string;
  requirements: string;
  scenarios: BDDScenario[];
};

// ─── Navigation State ───────────────────────────────────────────────────────

export const currentPage = State('introduction/what-is-oem');
export const expandedSections = State<Set<string>>(
  new Set(['introduction', 'core'])
);

// ─── Layout State ───────────────────────────────────────────────────────────

export const isDarkMode = State(false);
export const sidebarOpen = State(false);
export const searchQuery = State('');
export const searchOpen = State(false);
export const tocActive = State('');

// ─── BDD Manager State ──────────────────────────────────────────────────────

export const bddScenarios = State<BDDScenario[]>([
  {
    id: 'bdd-1',
    title: 'Navigate through documentation',
    steps: [
      { type: 'Given', text: 'I am on the documentation homepage' },
      { type: 'When', text: 'I click "Core" in the sidebar' },
      { type: 'Then', text: 'the "Core" section should expand' },
      { type: 'And', text: 'its child pages should become visible' },
      { type: 'When', text: 'I click "Templates & Traits"' },
      { type: 'Then', text: 'the main content should display the Templates documentation' },
    ],
  },
  {
    id: 'bdd-2',
    title: 'Toggle dark mode',
    steps: [
      { type: 'Given', text: 'I am viewing the documentation in light mode' },
      { type: 'When', text: 'I click the theme toggle button in the header' },
      { type: 'Then', text: 'the page should switch to dark mode' },
      { type: 'And', text: 'all text and backgrounds should update reactively' },
    ],
  },
  {
    id: 'bdd-3',
    title: 'Search documentation',
    steps: [
      { type: 'Given', text: 'I am viewing the documentation' },
      { type: 'When', text: 'I press Cmd+K' },
      { type: 'Then', text: 'the search input should be focused' },
      { type: 'When', text: 'I type "state"' },
      { type: 'Then', text: 'I should see matching results in a dropdown' },
      { type: 'When', text: 'I click a result' },
      { type: 'Then', text: 'I should navigate to that page' },
    ],
  },
]);

export const bddEditingId = State<string | null>(null);

export const bddFormData = State<BDDScenario>({
  id: '',
  title: '',
  steps: [{ type: 'Given', text: '' }],
});

// ─── Wizard State ───────────────────────────────────────────────────────────

export const wizardStep = State(1);
export const wizardData = State<WizardData>({
  templateId: '',
  name: '',
  description: '',
  pattern: '',
  requirements: '',
  scenarios: [],
});

// ─── Prompt Templates ───────────────────────────────────────────────────────

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'documentation-app',
    name: 'Documentation App',
    icon: '📚',
    description: 'Docs viewer with sidebar, search, TOC',
    pattern: 'documentation',
    defaultRequirements: `### Layout Structure
1. **Sidebar** (left): Navigation tree with sections and pages
2. **Main Content** (center): Document viewer with formatted content
3. **Table of Contents** (right): On-page heading navigation
4. **Header**: Logo/title, search bar, theme toggle

### Sidebar Navigation
- Collapsible sections with expand/collapse icons
- Highlight active page
- Smooth transitions
- Auto-expand active section

### Main Content Area
- Render markdown-style content
- Syntax highlighting for code blocks
- Copy button on code blocks
- Breadcrumb navigation at top
- Previous/Next page navigation at bottom

### Search Feature
- Keyboard shortcut: Cmd/Ctrl+K
- Search across all page titles
- Display results in dropdown
- Close when clicking outside

### URL Routing
- Each page has a unique hash-based URL
- Support browser back/forward buttons`,
  },
  {
    id: 'todo-app',
    name: 'Todo App',
    icon: '✅',
    description: 'CRUD todo list with filtering and persistence',
    pattern: 'crud-list',
    defaultRequirements: `### Core Features
1. Add new todos with text input (Enter key or button)
2. Toggle todo completion status (checkbox)
3. Edit todo text (double-click to edit)
4. Delete individual todos
5. Filter todos: All / Active / Completed
6. Display count of active todos
7. Clear all completed todos
8. Persist todos to localStorage

### Todo Item Properties
- Unique ID, text content, completed status, created timestamp

### Visual States
- Completed todos: line-through text, reduced opacity
- Hover states: show delete button
- Empty state: friendly message when no todos`,
  },
  {
    id: 'chat-interface',
    name: 'Chat Interface',
    icon: '💬',
    description: 'Messaging UI with typing indicators',
    pattern: 'conversational-ui',
    defaultRequirements: `### Layout
1. **Sidebar** (left): User list with online status
2. **Chat Area** (center): Message history and input
3. **Header**: Conversation name, connection status

### Message Display
- Messages grouped by sender
- Different style for own vs received messages
- Timestamp headers between message groups
- Typing indicator with animated dots

### Message Input
- Auto-expanding textarea (max 4 lines)
- Enter to send, Shift+Enter for new line
- Send button enabled only when text present

### Demo Mode
- Simulate incoming messages after 2-3 seconds
- Show typing indicator before message appears`,
  },
  {
    id: 'dashboard',
    name: 'Analytics Dashboard',
    icon: '📊',
    description: 'Metrics, charts, and data tables',
    pattern: 'data-visualization',
    defaultRequirements: `### Layout Sections
1. **Header**: Title, last updated, time period selector
2. **Metrics Cards**: 4 KPI cards in a grid
3. **Charts Section**: Line chart and bar chart
4. **Data Table**: Top items with sorting

### Metrics Cards
- Total Revenue, Total Users, Conversion Rate, Growth Rate
- Trend indicator (up/down arrow with color coding)

### Time Period Selector
- Day / Week / Month / Year buttons
- Update all data when period changes

### Data Table
- Sortable columns
- Hover effect on rows`,
  },
  {
    id: 'wizard-form',
    name: 'Multi-Step Wizard',
    icon: '🧙',
    description: 'Multi-step form with progress tracking',
    pattern: 'multi-step-flow',
    defaultRequirements: `### Steps
1. **Personal Information**: Name, email, phone, account type
2. **Address**: Street, city, state, ZIP, country
3. **Payment**: Card details, expiry, CVV
4. **Review**: Summary of all entered information
5. **Success**: Confirmation screen

### Progress Indicator
- Visual progress bar showing completion percentage
- Step indicators: completed, current, upcoming
- Click completed steps to navigate back

### Validation
- Validate each step before allowing navigation
- Show field-level error messages
- Disable Next button if errors present`,
  },
  {
    id: 'contact-form',
    name: 'Contact Form',
    icon: '📬',
    description: 'Validated contact form with submission feedback',
    pattern: 'form',
    defaultRequirements: `### Form Fields
1. Full name (required, min 2 characters)
2. Email address (required, valid format)
3. Subject (required)
4. Message (required, min 10 characters, max 500 with counter)
5. Phone number (optional, validate if provided)

### Validation
- Real-time validation on blur
- Field-level error messages below inputs
- Clear errors when user starts typing

### Submission
- Loading state during submission
- Success message on successful submission
- Error message on failure
- Clear form after successful submission`,
  },
  {
    id: 'data-table',
    name: 'Data Table',
    icon: '📋',
    description: 'Sortable, filterable table with pagination',
    pattern: 'data-display',
    defaultRequirements: `### Column Features
- Click header to sort (asc/desc/none cycle)
- Filter input row below headers
- Debounced filter (waits for typing to stop)

### Row Selection
- Checkbox per row + select-all in header
- Show selection count
- Bulk delete with confirmation

### Pagination
- Page size selector (10, 25, 50 rows)
- Previous/Next buttons, page info
- Disabled at boundaries

### Toolbar
- Selection info on left
- Export (CSV/JSON), Column toggle on right`,
  },
  {
    id: 'custom',
    name: 'Custom',
    icon: '✏️',
    description: 'Start from scratch with a blank template',
    pattern: 'custom',
    defaultRequirements: '',
  },
];
