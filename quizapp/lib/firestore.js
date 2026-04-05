import {
  doc, setDoc, getDoc, updateDoc,
  collection, addDoc, getDocs, query, where,
  orderBy, limit, serverTimestamp, arrayUnion, arrayRemove,
  increment
} from 'firebase/firestore';
import { db, firebaseEnabled } from './firebase';

function ensureFirestore() {
  return firebaseEnabled && db;
}

export async function createUserProfile(uid, data) {
  if (!ensureFirestore()) return null;
  const ref = doc(db, 'users', uid);
  await setDoc(ref, {
    uid,
    displayName: data.displayName || 'Anonyme',
    email: data.email || '',
    photoURL: data.photoURL || '',
    createdAt: serverTimestamp(),
    totalQuizzes: 0,
    favorites: [],
    badges: [],
    ...data,
  }, { merge: true });
}

export async function getUserProfile(uid) {
  if (!ensureFirestore()) return null;
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function updateUserProfile(uid, data) {
  if (!ensureFirestore()) return null;
  await updateDoc(doc(db, 'users', uid), { ...data, updatedAt: serverTimestamp() });
}

export async function saveQuizResult(uid, quizId, result) {
  if (!ensureFirestore()) return null;
  const ref = collection(db, 'users', uid, 'results');
  const data = {
    quizId,
    score: result.score,
    maxScore: result.maxScore,
    percentage: result.percentage,
    resultLabel: result.label,
    resultDesc: result.description,
    answers: result.answers,
    completedAt: serverTimestamp(),
  };
  const docRef = await addDoc(ref, data);

  await updateDoc(doc(db, 'users', uid), {
    totalQuizzes: increment(1),
    updatedAt: serverTimestamp(),
  });

  const quizRef = doc(db, 'quizStats', quizId);
  await setDoc(quizRef, { plays: increment(1), updatedAt: serverTimestamp() }, { merge: true });

  return docRef.id;
}

export async function getUserResults(uid, limitCount = 20) {
  if (!ensureFirestore()) return [];
  const q = query(
    collection(db, 'users', uid, 'results'),
    orderBy('completedAt', 'desc'),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getQuizResult(uid, resultId) {
  if (!ensureFirestore()) return null;
  const snap = await getDoc(doc(db, 'users', uid, 'results', resultId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function addFavorite(uid, quizId) {
  if (!ensureFirestore()) return null;
  await updateDoc(doc(db, 'users', uid), {
    favorites: arrayUnion(quizId),
  });
}

export async function removeFavorite(uid, quizId) {
  if (!ensureFirestore()) return null;
  await updateDoc(doc(db, 'users', uid), {
    favorites: arrayRemove(quizId),
  });
}

export async function getUserFavorites(uid) {
  if (!ensureFirestore()) return [];
  const profile = await getUserProfile(uid);
  return profile?.favorites || [];
}

export async function getQuizStats(quizId) {
  if (!ensureFirestore()) return { plays: 0 };
  const snap = await getDoc(doc(db, 'quizStats', quizId));
  return snap.exists() ? snap.data() : { plays: 0 };
}

export async function getLeaderboard(quizId, limitCount = 10) {
  if (!ensureFirestore()) return [];
  const q = query(
    collection(db, 'leaderboard'),
    where('quizId', '==', quizId),
    orderBy('percentage', 'desc'),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function submitLeaderboardEntry(uid, displayName, quizId, percentage) {
  if (!ensureFirestore()) return null;
  const ref = doc(db, 'leaderboard', `${uid}_${quizId}`);
  const existing = await getDoc(ref);
  if (!existing.exists() || existing.data().percentage < percentage) {
    await setDoc(ref, { uid, displayName, quizId, percentage, updatedAt: serverTimestamp() });
  }
}
