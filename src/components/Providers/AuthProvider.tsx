import React, { createContext, ReactNode, useState, useEffect } from "react";
import { auth } from "../../Firebase/firebase.config"; // Adjust path if necessary
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  signIn: (email: string, password: string) => Promise<any>;
  createUser: (email: string, password: string) => Promise<any>;
  updateUserProfile: (displayName: string, photoURL: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const createUser = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const updateUserProfile = (displayName: string, photoURL: string) =>
    updateProfile(auth.currentUser!, { displayName, photoURL });

  return (
    <AuthContext.Provider value={{ user, signIn, createUser, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export AuthProvider as the default export
export default AuthProvider;

// Export AuthContext as a named export
export { AuthContext };
