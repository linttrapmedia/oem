---
name: BDD Files
description: How to write and use behavior-driven design files that document requirements, acceptance criteria, and use cases.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# BDD Files

## What This File Is

The `bdd/` folder contains behavior-driven design files — markdown documents that describe **what the application should do** in terms of requirements, acceptance criteria, and concrete scenarios. Each feature or major use case gets its own `.md` file inside this folder.

## Why It Must Be Its Own File

BDD files are the **source of truth for intent**. They exist so that LLMs (and humans) can read the expected behavior before writing or modifying code. Mixing requirements with implementation would make it impossible to reason about what the app _should_ do vs. what it _currently_ does.

## When to Create

Create a `bdd/` folder at the start of any new OEM application. Add a `.md` file for each distinct feature or user story before writing implementation code.

## When to Use

- **Before coding**: Read the relevant BDD file to understand what needs to be built.
- **During coding**: Reference the scenarios to ensure the implementation matches the specification.
- **After coding**: Verify the implementation satisfies every scenario in the BDD file.
- **When adding features**: Create a new BDD file for the new feature before writing any code.

## File Structure

Each BDD file should contain:

1. **Feature title** — a clear, descriptive name
2. **Requirements** — a numbered list of what the feature must do
3. **Properties / Data model** — what data the feature works with
4. **BDD Scenarios** — Gherkin-style Given/When/Then blocks

## Example

```markdown
# User Authentication

## Requirements

1. Users can sign in with email and password
2. Failed sign-in shows an error message
3. Successful sign-in redirects to the dashboard
4. Users can sign out from any page

## Data Model

- Email: string
- Password: string
- Auth token: string | null
- Error message: string | null

## Scenarios

### Scenario: Successful sign-in

Given I am on the sign-in page
When I enter a valid email and password
And I click "Sign In"
Then I should be redirected to the dashboard
And I should see my username in the header

### Scenario: Failed sign-in

Given I am on the sign-in page
When I enter an invalid password
And I click "Sign In"
Then I should see "Invalid credentials" error message
And I should remain on the sign-in page
```

## Rules

1. **One file per feature or major use case.** Do not combine unrelated features into a single BDD file.
2. **Write BDD before implementation.** The BDD file drives what gets built.
3. **Use Gherkin format** (Given/When/Then) for scenarios — it is unambiguous and parseable by LLMs.
4. **Keep scenarios concrete.** Use specific values, not vague descriptions.
5. **Update BDD files when requirements change.** They must stay in sync with the current expected behavior.
