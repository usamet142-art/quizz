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
import { auth, googleProvider } from '../lib/firebase';
import { createUserProfile, getUserProfile } from '../lib/firestore';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null);
  const [profile, setProfile]     = useState(null);
  const [loading, setLoading]     = useState(true);

  // Charger le profil Firestore quand l'utilisateur change
  useEffect(() => {
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

  // ── Inscription email/mot de passe ──────────────────────────────────────────
  async function register(email, password, displayName) {
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

  // ── Connexion email/mot de passe ────────────────────────────────────────────
  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const p    = await getUserProfile(cred.user.uid);
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

  // ── Connexion Google ────────────────────────────────────────────────────────
  async function loginWithGoogle() {
    const cred = await signInWithPopup(auth, googleProvider);
    const p    = await getUserProfile(cred.user.uid);
    if (!p) {
      await createUserProfile(cred.user.uid, {
        displayName: cred.user.displayName || 'Utilisateur',
        email:       cred.user.email,
        photoURL:    cred.user.photoURL || '',
      });
      const np = await getUserProfile(cred.user.uid);
      setProfile(np);
    } else {
      setProfile(p);
    }
    return cred.user;
  }

  // ── Déconnexion ─────────────────────────────────────────────────────────────
  async function logout() {
    await signOut(auth);
    setUser(null);
    setProfile(null);
  }

  // ── Reset mot de passe ──────────────────────────────────────────────────────
  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  // ── Rafraîchir le profil ────────────────────────────────────────────────────
  async function refreshProfile() {
    if (user) {
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
