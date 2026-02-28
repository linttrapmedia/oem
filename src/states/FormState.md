---
name: useFormState
description: Reactive form state with validation, dirty tracking, and field-level control
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# FormState

A reactive state hook for managing form values, validation errors, touched fields, and dirty state.

## Features

- **Field-level control**: Set individual field values with automatic re-validation
- **Validation**: Optional per-field validators that run on every field change
- **Touched tracking**: Track which fields have been interacted with
- **Dirty tracking**: Knows when any field has been modified from initial values
- **Full validate**: Validate all fields at once (e.g., on submit)
- **Reset**: Return to initial values and clear all state
- **Deferred methods**: `$setField`, `$touch`, `$validate`, `$reset` for event wiring

## Usage

```typescript
import { useFormState } from '@linttrap/oem';

const form = useFormState(
  { email: '', password: '' },
  {
    email: (val) => (!val ? 'Required' : undefined),
    password: (val) => (val.length < 8 ? 'Min 8 characters' : undefined),
  },
);

// Set a field value
form.setField('email', 'user@example.com');

// Touch a field
form.touch('email');

// Validate all fields
const isValid = form.validate();

// Read state
const { values, errors, touched, dirty, valid } = form.val();

// Reset to initial
form.reset();
```

## Signature

```typescript
function useFormState<T extends Record<string, any>>(
  initialValues: T,
  validators?: Partial<Record<keyof T, (value: T[keyof T], values: T) => string | undefined>>,
): StateType<FormStateValue<T>, { setField; setError; touch; validate; reset }>;
```

## Parameters

| Parameter        | Type                | Default | Description                                              |
| ---------------- | ------------------- | ------- | -------------------------------------------------------- |
| `initialValues`  | `T`                 | —       | The initial form values                                  |
| `validators`     | `Partial<Record<keyof T, (value, values) => string \| undefined>>` | — | Optional validators per field. Return a string for errors, `undefined` for valid. |

## Return Value

Returns a `State<FormStateValue<T>>` with shape:

| Property  | Type                             | Description                                 |
| --------- | -------------------------------- | ------------------------------------------- |
| `values`  | `T`                              | Current field values                        |
| `errors`  | `Partial<Record<keyof T, string>>` | Validation error messages per field        |
| `touched` | `Partial<Record<keyof T, boolean>>` | Whether each field has been touched        |
| `dirty`   | `boolean`                        | `true` if any field has been modified       |
| `valid`   | `boolean`                        | `true` if there are no validation errors    |

### Custom Methods

| Method                        | Signature                                | Description                                               |
| ----------------------------- | ---------------------------------------- | --------------------------------------------------------- |
| `setField(field, value)`      | `(keyof T, T[keyof T]) => void`          | Updates a field value and re-runs validation              |
| `setError(field, error)`      | `(keyof T, string \| undefined) => void` | Manually set or clear an error on a field                 |
| `touch(field)`                | `(keyof T) => void`                      | Marks a field as touched                                  |
| `validate()`                  | `() => boolean`                          | Validates all fields, touches all, returns validity       |
| `reset()`                     | `() => void`                             | Resets values, errors, touched, dirty, and valid          |

Each method also has a `$`-prefixed deferred version.

## Behavior

- Initializes with the provided `initialValues`, no errors, no touched fields, `dirty: false`, `valid: true`
- On `setField`: updates the field value, runs all validators, updates `errors` and `valid`, sets `dirty: true`
- On `touch`: marks the field as touched (useful for showing errors only after interaction)
- On `validate`: runs all validators, marks all fields as touched, updates state, returns `boolean`
- On `reset`: returns to the exact initial state
- Validators receive both the field value and the full values object (for cross-field validation)

## Common Patterns

### Contact form

```typescript
const form = useFormState(
  { name: '', email: '', message: '' },
  {
    name: (v) => (!v ? 'Name is required' : undefined),
    email: (v) => (!v.includes('@') ? 'Invalid email' : undefined),
    message: (v) => (v.length < 10 ? 'Too short' : undefined),
  },
);
```

### Two-way binding with input traits

```typescript
trait.inputValue(() => form.val().values.email, form);
trait.inputEvent('input', (val) => form.setField('email', val), form);
trait.event('blur', form.$touch('email'));
```

### Show errors only for touched fields

```typescript
trait.textContent(
  () => {
    const { errors, touched } = form.val();
    return touched.email ? errors.email || '' : '';
  },
  form,
);
```

### Submit handler

```typescript
trait.event('click', () => {
  if (form.validate()) {
    submitForm(form.val().values);
  }
});
```

### Cross-field validation

```typescript
const form = useFormState(
  { password: '', confirmPassword: '' },
  {
    confirmPassword: (val, values) =>
      val !== values.password ? 'Passwords must match' : undefined,
  },
);
```

## Notes

- Validators run synchronously on every `setField` call
- The `valid` flag reflects the result of the most recent validation run
- `validate()` touches all fields so error messages become visible
- For async validation (e.g., server-side uniqueness checks), use `setError` manually after an async call
