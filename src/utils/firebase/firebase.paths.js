/**
 * Centralized helpers for generating Firestore document and collection references
 * These functions abstract Firestore path construction and should be used
 * throughout the app to ensure consistency and avoid hardcoded paths.
 *
 * Related: See `firebase.user.js` for how these paths are used in user document creation
 */

import { doc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

/**
 * Returns a reference to the user's document in the 'users' collection.
 *
 * @param {string} uid - Firebase Auth user ID
 * @returns  {DocumentReference}
 */
export function getUserDocRef(uid) {
  return doc(db, 'users', uid);
}

/**
 * Returns a reference to the user's cart items subcollection.
 *
 * @param {string} uid - Firebase Auth user ID
 * @returns {CollectionReference}
 */
export function getUserCartItemsCollection(uid) {
  return collection(db, 'users', uid, 'cartItems');
}

/**
 * Returns a reference to the user's previous orders subcollection.
 *
 * @param {string} uid - Firebase Auth user ID
 * @returns {CollectionReference}
 */
export function getUserOrdersCollection(uid) {
  return collection(db, 'users', uid, 'previousOrders');
}
