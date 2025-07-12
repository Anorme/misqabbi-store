import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../../services/firebase.config';
import { createUserDocument } from './firebase.user';

export async function registerUserWithEmail(email, password, additionalData) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await createUserDocument(user, additionalData);
  return user;
}

export async function loginUserWithEmail(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function logoutUser() {
  await signOut(auth);
}

 feature/registration-form
export function onAuthStateChangedListener(callback) {

/**
 * Subscribes to authentication state changes.
 *
 * @param {function} callback  - Function to call with the user object or null
 * @returns {function} - Unsubscribe function
 */
export function onAuthStateChangedListener(callback) {
 main
  return onAuthStateChanged(auth, callback);
}

export async function signInWithGooglePopup() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  await createUserDocument(user);
  return user;
}
