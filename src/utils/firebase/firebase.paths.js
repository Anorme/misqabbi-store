import { doc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

export function getUserDocRef(uid) {
  return doc(db, 'users', uid);
}

export function getUserCartItemsCollection(uid) {
  return collection(db, 'users', uid, 'cartItems');
}

export function getUserOrdersCollection(uid) {
  return collection(db, 'users', uid, 'previousOrders');
}
