---
name: Chat Interface
description: A real-time messaging interface with typing indicators and message history
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
  pattern: conversational-ui
---

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
