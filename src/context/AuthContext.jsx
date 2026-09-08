import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Email + Password Signup with Email Verification
  const signup = async (email, password, extraDetails = {}) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send verification email safely
    try {
      await sendEmailVerification(user);
    } catch (err) {
      console.warn("Verification email notice:", err);
    }

    const userProfile = {
      uid: user.uid,
      fullName: extraDetails.fullName || '',
      email: email,
      phone: extraDetails.phone || '',
      board: extraDetails.board || 'UP Board',
      class: extraDetails.targetClass || 'Class 10th',
      role: 'student',
      purchasedMaterials: [],
      enrolledBatches: [],
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

  // 3. Google Sign In (Handled with Account Picker & Error Fallback)
  const loginWithGoogle = async () => {
    try {
      googleProvider.setCustomParameters({ prompt: 'select_account' });
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
          purchasedMaterials: [],
          enrolledBatches: [],
          createdAt: new Date().toISOString(),
          isActive: true
        };
        await setDoc(userRef, newProfile);
        setUserData(newProfile);
      } else {
        setUserData(docSnap.data());
      }
      return result;
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.warn("User or browser closed the Google Sign-in popup.");
        return null;
      }
      throw error;
    }
  };

  // 4. Resend Verification Email
  const resendVerificationEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  // 5. Password Reset Email Handler
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // 6. Logout
  const logout = async () => {
    setUserData(null);
    setCurrentUser(null);
    return signOut(auth);
  };

  // Auth State Listener
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

    return unsubscribe;
  }, []);

  // Dynamic Role Cleaner
  const cleanRole = (userData?.role || '').trim().toLowerCase();
  const isAdmin = cleanRole === 'admin';

  const value = {
    currentUser,
    userData,
    isAdmin,
    loading,
    signup,
    login,
    loginWithGoogle,
    resendVerificationEmail,
    resetPassword,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};