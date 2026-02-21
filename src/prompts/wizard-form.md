---
name: Multi-Step Wizard
description: A multi-step form wizard with validation and progress tracking
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
  pattern: multi-step-flow
---

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
