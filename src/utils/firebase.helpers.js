import { getDoc, setDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

export async function getDocumentData(docRef) {
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
}

export async function createDocument(docRef, data) {
  return await setDoc(docRef, data);
}

export async function updateDocument(docRef, updates) {
  return await updateDoc(docRef, updates);
}

export async function deleteDocument(docRef) {
  return await deleteDoc(docRef);
}

export async function getCollectionsData(collectionRef) {
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
