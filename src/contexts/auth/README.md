# AuthContext

The `AuthContext` module provides centralized authentication state management using `useReducer` and React Context. It enables consistent user tracking, loading states, and error messaging across components. This structure supports modularity, scalability, and future migration to Redux Toolkit or similar state libraries.

## State Shape

```js
authState = {
  currentUser: null, // Firebase user object
  isAuthLoading: false, // Tracks authentication flow status
  authError: null, // Authentication-related errors
  isAuthenticated: false, // Indicates valid signed-in state
};
```

## Usage

### Accessing State

```js
import { useAuthState } from '../../contexts/auth/useAuth';

const { currentUser, isAuthLoading, authError, isAuthenticated } = useAuthState();
```

### Dispatching Actions

```js
import { useAuthDispatch } from '../../contexts/auth/useAuth';
import { setCurrentUser, setAuthLoading, setAuthError } from '../../contexts/auth/authActions';

const authDispatch = useAuthDispatch();

authDispatch(setAuthLoading(true));
authDispatch(setCurrentUser(user));
authDispatch(setAuthError('Authentication failed'));
```

## Design Principles

- Reducer-based architecture for clean state transitions
- Split contexts to isolate state and dispatch
- Guarded hooks to prevent usage outside the provider
- Action creators for reusable, traceable mutations
- Domain isolation for scalability

## Validation

User payloads are validated using the `isValidUser()` utility to ensure `isAuthenticated` is based on reliable criteria such as `user.uid`. This prevents false positives from malformed objects and supports long-term security.

## Extension

The context supports future integration with role-based access control (RBAC), session persistence strategies, and scalable user metadata storage.

---
