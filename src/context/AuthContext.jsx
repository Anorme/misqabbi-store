import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase.config';
import {
  createUserWithEmailAndPasswordHelper,
  signInWithGooglePopup,
} from '../utils/firebase/firebase.auth';

const AuthContext = createContext(); // ✅ Default export

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const register = async (email, password) => {
    return createUserWithEmailAndPasswordHelper(email, password);
  };

  const signInWithGoogle = async () => {
    return signInWithGooglePopup();
  };

  return (
    <AuthContext.Provider value={{ user, register, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
