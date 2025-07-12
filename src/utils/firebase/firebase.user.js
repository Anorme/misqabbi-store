/**
 * Utility for creating and managing user documents in Firestore.
 * This module is used in conjunction with Firebase Authentication to ensure
 * that each authenticated user has a corresponding Firestore document.
 *
 * Related: See `firebase.paths.js` for Firestore path helpers
 */

import { getDoc, setDoc } from 'firebase/firestore';
import { getUserDocRef } from './firebase.paths';

/**
 * Creates a Firestore user document if it doesn't already exist.
 *
 * @param {User} user - The Firebase Auth user object
 * @param {object} additionalData - Optional additional fields (e.g. fullName)
 * @returns {Promise<DocumentReference>} - Reference to the user document
 */
export async function createUserDocument(user, additionalData) {
  if (!user) return;

  const userRef = getUserDocRef(user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email } = user;
    const createdAt = new Date();

    await setDoc(userRef, {
      email,
      role: 'user', // Default role assignment
      createdAt,
      ...additionalData,
    });
  }

  return userRef;
}
