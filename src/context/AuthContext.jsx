import { createContext, useState, useEffect } from 'react';
import {
  registerUserWithEmail,
  signInWithGooglePopup,
  onAuthStateChangedListener,
} from '../utils/firebase/firebase.auth';

const AuthContext = createContext(); // ✅ Default export

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(setUser);
    return () => unsubscribe();
  }, []);

  const register = async (email, password, fullName) => {
    return registerUserWithEmail(email, password, { fullName });
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
