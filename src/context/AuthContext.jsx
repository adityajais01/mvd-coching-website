import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // Firestore User Document
  const [loading, setLoading] = useState(true);

  // 1. Email + Password Signup
  const signup = async (email, password, extraDetails) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userProfile = {
      uid: user.uid,
      fullName: extraDetails.fullName || '',
      email: email,
      phone: extraDetails.phone || '',
      board: extraDetails.board || 'UP Board',
      class: extraDetails.targetClass || 'Class 10th',
      role: 'student', // Default role strictly student
      createdAt: new Date().toISOString(),
      isActive: true
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    setUserData(userProfile);
    return userCredential;
  };

  // 2. Email + Password Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3. Google Sign In
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      const newProfile = {
        uid: user.uid,
        fullName: user.displayName || user.email.split('@')[0],
        email: user.email,
        phone: user.phoneNumber || '',
        board: 'UP Board',
        class: 'Class 10th',
        role: 'student',
        createdAt: new Date().toISOString(),
        isActive: true
      };
      await setDoc(userRef, newProfile);
      setUserData(newProfile);
    } else {
      setUserData(docSnap.data());
    }
    return result;
  };

  // 4. Logout
  const logout = async () => {
    setUserData(null);
    setCurrentUser(null);
    return signOut(auth);
  };

  // 🟢 Fix 1: Properly handle Auth State Listener and Cleanup
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Unsubscribe directly return kar diya
  }, []);

  // 🟢 Fix 2: Dynamic Role Cleaner
  const cleanRole = (userData?.role || '').trim().toLowerCase();
  const isAdmin = cleanRole === 'admin';

  const value = {
    currentUser,
    userData,
    isAdmin,
    signup,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};