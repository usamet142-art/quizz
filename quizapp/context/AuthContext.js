import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { auth, googleProvider, firebaseEnabled } from '../lib/firebase';
import { createUserProfile, getUserProfile } from '../lib/firestore';

const AuthContext = createContext({});
const FIREBASE_DISABLED_ERROR = 'Les comptes sont temporairement desactives sur cette version du site.';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseEnabled || !auth) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return undefined;
    }

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const p = await getUserProfile(firebaseUser.uid);
        setProfile(p);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsub;
  }, []);

  async function register(email, password, displayName) {
    if (!firebaseEnabled || !auth) throw new Error(FIREBASE_DISABLED_ERROR);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    await sendEmailVerification(cred.user);
    await createUserProfile(cred.user.uid, {
      displayName,
      email,
      photoURL: cred.user.photoURL || '',
    });
    const p = await getUserProfile(cred.user.uid);
    setProfile(p);
    return cred.user;
  }

  async function login(email, password) {
    if (!firebaseEnabled || !auth) throw new Error(FIREBASE_DISABLED_ERROR);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const p = await getUserProfile(cred.user.uid);
    if (!p) {
      await createUserProfile(cred.user.uid, {
        displayName: cred.user.displayName || 'Utilisateur',
        email,
        photoURL: cred.user.photoURL || '',
      });
    }
    setProfile(p);
    return cred.user;
  }

  async function loginWithGoogle() {
    if (!firebaseEnabled || !auth || !googleProvider) throw new Error(FIREBASE_DISABLED_ERROR);
    const cred = await signInWithPopup(auth, googleProvider);
    const p = await getUserProfile(cred.user.uid);
    if (!p) {
      await createUserProfile(cred.user.uid, {
        displayName: cred.user.displayName || 'Utilisateur',
        email: cred.user.email,
        photoURL: cred.user.photoURL || '',
      });
      const np = await getUserProfile(cred.user.uid);
      setProfile(np);
    } else {
      setProfile(p);
    }
    return cred.user;
  }

  async function logout() {
    if (!firebaseEnabled || !auth) return;
    await signOut(auth);
    setUser(null);
    setProfile(null);
  }

  async function resetPassword(email) {
    if (!firebaseEnabled || !auth) throw new Error(FIREBASE_DISABLED_ERROR);
    await sendPasswordResetEmail(auth, email);
  }

  async function refreshProfile() {
    if (firebaseEnabled && user) {
      const p = await getUserProfile(user.uid);
      setProfile(p);
    }
  }

  const value = {
    user,
    profile,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    refreshProfile,
    isAuthenticated: !!user,
    authEnabled: firebaseEnabled,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
