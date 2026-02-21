---
name: Contact Form
description: A responsive contact form with validation and submission feedback
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
  pattern: form
---

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
