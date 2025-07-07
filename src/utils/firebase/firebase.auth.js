/**
 * Centralized utility functions for handling Firebase Authentication.
 * These functions abstract away direct Firebase SDK calls ans should be the only interface used for authentication throughout the application
 * Related: See `firebase.user.js` for user document creation logic.
 */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '../../services/firebase.config';
import { createUserDocument } from './firebase.user';

/**
 * Registers a new user using email and password.
 * Also creates a corresponding user document in Firestore.
 *
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {object} additionalData - Additional user data (e.g. fullName)
 * @returns {Promise<User>} - The Firebase user object
 */

export async function registerUserWithEmail(email, password, additionalData) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await createUserDocument(user, additionalData);
  return user;
}

/**
 * Logs in an existing user using email and password
 *
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<User>} - The Firebase user object
 */
export async function loginUserWithEmail(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Logs out the currently authenticated user.
 *
 * @returns {Promise<void>}
 */
export async function logoutUser() {
  await signOut(auth);
}

/**
 * Subscribes to authentication state changes.
 *
 * @param {function} callback  - Function to call with the user object or null
 * @returns {function} - Unsubscribe function
 */
export async function onAuthStateChangedListener(callback) {
  return onAuthStateChanged(auth, callback);
}
