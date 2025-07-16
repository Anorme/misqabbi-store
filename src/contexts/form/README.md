# FormContext

The `FormContext` module provides centralized management of form state across components. It replaces scattered `useState` implementations with a reducer-based system to ensure predictable input handling, validation, and submission flows.

## Overview

Form state is managed using `useReducer`, with split contexts for state and dispatch. Action creators simplify reducer transitions, and custom hooks enforce safe access to context values.

## State Shape

```js
formState = {
  values: {}, // Input fields and their values
  errors: {}, // Field-specific error messages
  isSubmitting: false, // Submission status
  isDirty: false, // Tracks user interaction
};
```

## Usage

### Accessing State

```js
import { useFormState } from '../../contexts/form/useForm';

const { values, errors, isSubmitting } = useFormState();
```

### Dispatching Actions

```js
import { useFormDispatch } from '../../contexts/form/useForm';
import {
  updateField,
  setErrors,
  clearErrors,
  startSubmit,
  stopSubmit,
  resetForm,
} from '../../contexts/form/formActions';

const formDispatch = useFormDispatch();

formDispatch(updateField('email', 'user@example.com'));
formDispatch(setErrors({ email: 'Invalid email' }));
formDispatch(startSubmit());
formDispatch(resetForm());
```

## Design Principles

- Reducer-backed transitions for form consistency
- Action creators for traceable state mutations
- Split contexts to isolate state and dispatch logic
- Guarded hooks to prevent misuse outside provider
- Domain isolation for scalability across forms

## Extension

This module is extensible to multi-step forms, field-level validation tracking, draft persistence, and role-based field visibility.

---
