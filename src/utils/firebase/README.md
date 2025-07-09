# Firebase Utilities

This folder contains modular utility files that abstract Firebase Authentication and Firestore logic. These utilities are designed to promote clean architecture, reduce duplication, and simplify integration across the application.

---

## File Overview

### `firebase.auth.js`

Handles all Firebase Authentication logic:

- `registerUserWithEmail(email, password, additionalData)`
- `loginUserWithEmail(email, password)`
- `logoutUser()`
- `onAuthStateChangedListener(callback)`

> Use these functions instead of calling Firebase Auth methods directly in components or context.

---

### `firebase.user.js`

Creates and manages user documents in Firestore:

- `createUserDocument(user, additionalData)`

> Called after registration to ensure each user has a corresponding Firestore document.

---

### `firebase.paths.js`

Centralized helpers for generating Firestore document and collection references:

- `getUserDocRef(uid)`
- `getUserCartItemsCollection(uid)`
- `getUserOrdersCollection(uid)`

> Use these to avoid hardcoding Firestore paths.

---

### `firebase.helpers.js`

Generic Firestore helpers for common operations:

- `getDocumentData(docRef)`
- `createDocument(docRef, data)`
- `updateDocument(docRef, updates)`
- `deleteDocument(docRef)`
- `getCollectionsData(collectionRef)`

> Use these for interacting with Firestore documents and collections in a consistent way.

---

## Usage Guidelines

- Always use these utilities instead of calling Firebase SDK methods directly in your components or context.
- If you need to extend functionality (e.g. add wishlist support), create new helpers in the appropriate file or add a new one.
- Keep logic modular and reusable—avoid duplicating Firebase logic across the app.

---

## Related Files

- `services/firebase.config.js`: Initializes and exports the Firebase app and services.
- `context/AuthContext.jsx`: Should consume `firebase.auth.js` utilities for all auth-related actions.
