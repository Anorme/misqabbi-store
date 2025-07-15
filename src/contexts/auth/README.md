# AuthContext (State Management)

This module manages global authentication state using `useReducer`, Context API, and custom hooks. It replaces scattered `useState` with centralized, predictable state logic — future-proofed for Redux Toolkit migration.

---

## Overview

The AuthContext provides:

- `currentUser` tracking
- Authentication flow status (`isAuthLoading`)
- Error messaging (`authError`)
- Modular access via `useAuthState` and `useAuthDispatch` hooks

---
