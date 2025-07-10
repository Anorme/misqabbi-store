import { getDoc, setDoc } from 'firebase/firestore';
import { getUserDocRef } from './firebase.paths';

export async function createUserDocument(user, additionalData) {
  if (!user) return;

  const userRef = getUserDocRef(user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email } = user;
    const createdAt = new Date();

    await setDoc(userRef, {
      email,
      role: 'user',
      createdAt,
      ...additionalData,
    });
  }

  return userRef;
}
