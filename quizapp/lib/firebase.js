import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const hasFirebaseConfig = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID
);

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialise une seule instance de Firebase
const app = hasFirebaseConfig
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const firebaseEnabled = hasFirebaseConfig;
export const auth = app ? getAuth(app) : null;
export const db   = app ? getFirestore(app) : null;
export const googleProvider = app ? new GoogleAuthProvider() : null;

if (googleProvider) {
  googleProvider.setCustomParameters({ prompt: 'select_account' });
}

// Analytics uniquement côté client
export let analytics = null;
if (app && typeof window !== 'undefined') {
  import('firebase/analytics')
    .then(({ getAnalytics, isSupported }) =>
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      })
    )
    .catch(() => {
      analytics = null;
    });
}

export default app;
