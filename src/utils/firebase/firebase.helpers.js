/**
 * Generic Firestore helpers for interacting with documents and collections
 * These functions abstract repetitive Firestore operations and should be used
 * throughout the app to simplify data access and updates
 */

import { getDoc, setDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

/**
 * Retrieves the data from a document reference.
 *
 * @param {DocumentReference} docRef
 * @returns {Promise<object|null>} - Document data or null if not found
 */
export async function getDocumentData(docRef) {
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
}

/**
 * Creates or overwrites a document with the given data.
 *
 * @param {DocumentReference} docRef
 * @param {object} data
 * @returns {Promise<void>}
 */
export async function createDocument(docRef, data) {
  return await setDoc(docRef, data);
}

/**
 * Updates an existing document with the provided fields.
 *
 * @param {DocumentReference} docRef
 * @param {object} updates
 * @returns {Promise<void>}
 */
export async function updateDocument(docRef, updates) {
  return await updateDoc(docRef, updates);
}

/**
 * Deletes a document from Firestore.
 *
 * @param {DocumentReference} docRef
 * @returns {Promise<void>}
 */
export async function deleteDocument(docRef) {
  return await deleteDoc(docRef);
}

/**
 * Retrieves all documents from a collection and maps them to an array.
 *
 * @param {CollectionReference} collectionRef
 * @returns {Promise<Array<object>>}
 */
export async function getCollectionsData(collectionRef) {
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
