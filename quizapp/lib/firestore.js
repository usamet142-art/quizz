import {
  doc, setDoc, getDoc, updateDoc, deleteDoc,
  collection, addDoc, getDocs, query, where,
  orderBy, limit, serverTimestamp, arrayUnion, arrayRemove,
  increment, writeBatch
} from 'firebase/firestore';
import { db } from './firebase';

// ─── UTILISATEURS ────────────────────────────────────────────────────────────

export async function createUserProfile(uid, data) {
  const ref = doc(db, 'users', uid);
  await setDoc(ref, {
    uid,
    displayName: data.displayName || 'Anonyme',
    email:       data.email || '',
    photoURL:    data.photoURL || '',
    createdAt:   serverTimestamp(),
    totalQuizzes: 0,
    favorites:   [],
    badges:      [],
    ...data,
  }, { merge: true });
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function updateUserProfile(uid, data) {
  await updateDoc(doc(db, 'users', uid), { ...data, updatedAt: serverTimestamp() });
}

// ─── RÉSULTATS DE QUIZ ────────────────────────────────────────────────────────

export async function saveQuizResult(uid, quizId, result) {
  const ref  = collection(db, 'users', uid, 'results');
  const data = {
    quizId,
    score:         result.score,
    maxScore:      result.maxScore,
    percentage:    result.percentage,
    resultLabel:   result.label,
    resultDesc:    result.description,
    answers:       result.answers,
    completedAt:   serverTimestamp(),
  };
  const docRef = await addDoc(ref, data);

  // Incrémenter le compteur sur l'utilisateur
  await updateDoc(doc(db, 'users', uid), {
    totalQuizzes: increment(1),
    updatedAt:    serverTimestamp(),
  });

  // Incrémenter les stats du quiz
  const quizRef = doc(db, 'quizStats', quizId);
  await setDoc(quizRef, { plays: increment(1), updatedAt: serverTimestamp() }, { merge: true });

  return docRef.id;
}

export async function getUserResults(uid, limitCount = 20) {
  const q = query(
    collection(db, 'users', uid, 'results'),
    orderBy('completedAt', 'desc'),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getQuizResult(uid, resultId) {
  const snap = await getDoc(doc(db, 'users', uid, 'results', resultId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// ─── FAVORIS ─────────────────────────────────────────────────────────────────

export async function addFavorite(uid, quizId) {
  await updateDoc(doc(db, 'users', uid), {
    favorites: arrayUnion(quizId),
  });
}

export async function removeFavorite(uid, quizId) {
  await updateDoc(doc(db, 'users', uid), {
    favorites: arrayRemove(quizId),
  });
}

export async function getUserFavorites(uid) {
  const profile = await getUserProfile(uid);
  return profile?.favorites || [];
}

// ─── STATS QUIZ ───────────────────────────────────────────────────────────────

export async function getQuizStats(quizId) {
  const snap = await getDoc(doc(db, 'quizStats', quizId));
  return snap.exists() ? snap.data() : { plays: 0 };
}

// ─── CLASSEMENT ──────────────────────────────────────────────────────────────

export async function getLeaderboard(quizId, limitCount = 10) {
  const q = query(
    collection(db, 'leaderboard'),
    where('quizId', '==', quizId),
    orderBy('percentage', 'desc'),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function submitLeaderboardEntry(uid, displayName, quizId, percentage) {
  // Un seul document par utilisateur/quiz — on écrase si meilleur score
  const ref = doc(db, 'leaderboard', `${uid}_${quizId}`);
  const existing = await getDoc(ref);
  if (!existing.exists() || existing.data().percentage < percentage) {
    await setDoc(ref, { uid, displayName, quizId, percentage, updatedAt: serverTimestamp() });
  }
}
