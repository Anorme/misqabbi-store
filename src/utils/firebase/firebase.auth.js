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
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { auth } from '../../services/firebase.config';
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
 * Initiates email link authentication for a user.
 *
 * Sends a passwordless sign-in link to the specified email address using Firebase Authentication.
 * Stores the email in localStorage to simplify sign-in on the same device.
 * Stores email in localStorage
 * The user will be redirected to the configured route after clicking the email link.
 *
 * @param {string} email - The user's email address to receive the authentication link.
 * @returns {Promise<void>}
 */
export async function startSignInWithEmailLink(email) {
  const actionCodeSettings = {
    url: 'http://localhost:5173/finishSignUp',
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
  } catch (error) {
    console.error('Error sending user email link for sign-in: ', error);
  }
}

/**
 * Completes the email link authentication flow.
 *
 * Verifies that the current URL contains a valid email sign-in link.
 * Attempts to retrieve the email from localStorage, or prompts the user if unavailable.
 * Signs in the user and returns the Firebase user object.
 * Cleans up stored email from localStorage.
 *
 * @returns {Promise<User|null>} - The authenticated Firebase user object, or null on failure.
 */
export async function completeSignInWithEmailLink() {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    try {
      const userCredential = await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem('emailForSignIn');
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in user with email link: ', error);
      return null;
    }
  }
  return null;
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
export function onAuthStateChangedListener(callback) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Signs in a user using Google authentication popup.
 * Also creates a corresponding user document in Firestore if the user doesn't exist.
 *
 * @returns {Promise<object>} - The Firebase user object
 */
export async function signInWithGooglePopup() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  await createUserDocument(user);
  return user;
}
