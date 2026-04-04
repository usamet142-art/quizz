import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import QuizCard from '../components/QuizCard';
import { useAuth } from '../context/AuthContext';
import { getUserResults, getUserFavorites, updateUserProfile } from '../lib/firestore';
import { getQuizById, QUIZZES } from '../data/quizzes';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user, profile, logout, refreshProfile } = useAuth();
  const router  = useRouter();
  const tabParam = router.query.tab || 'stats';

  const [activeTab, setActiveTab] = useState(tabParam);
  const [results,   setResults]   = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [editing, setEditing]     = useState(false);
  const [newName, setNewName]     = useState('');

  const tabs = [
    { id: 'stats',     label: '📊 Stats'    },
    { id: 'history',   label: '🏆 Historique' },
    { id: 'favorites', label: '❤️ Favoris'   },
  ];

  useEffect(() => { setActiveTab(tabParam); }, [tabParam]);

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoadingData(true);
    try {
      const [r, f] = await Promise.all([
        getUserResults(user.uid, 30),
        getUserFavorites(user.uid),
      ]);
      setResults(r);
      setFavorites(f);
    } catch (e) {
      console.error(e);
    }
    setLoadingData(false);
  }, [user]);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleLogout() {
    await logout();
    toast.success('À bientôt !');
    router.push('/');
  }

  async function handleUpdateName() {
    if (!newName.trim() || newName.trim().length < 2) { toast.error('Pseudo trop court'); return; }
    try {
      await updateUserProfile(user.uid, { displayName: newName.trim() });
      await refreshProfile();
      toast.success('Pseudo mis à jour ✅');
      setEditing(false);
    } catch { toast.error('Erreur'); }
  }

  const quizzesDone = results.length;
  const bestScore   = results.reduce((best, r) => Math.max(best, r.percentage || 0), 0);
  const avgScore    = results.length
    ? Math.round(results.reduce((s, r) => s + (r.percentage || 0), 0) / results.length)
    : 0;

  const favQuizzes = favorites.map(id => getQuizById(id)).filter(Boolean);

  return (
    <Layout title="Mon profil">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Profile header */}
        <div className="card p-6 mb-6 animate-slide-up">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-3xl font-black flex-shrink-0 shadow-xl">
              {(profile?.displayName || user?.email || 'U')[0].toUpperCase()}
            </div>
            <div className="flex-1 text-center sm:text-left">
              {editing ? (
                <div className="flex gap-2 mb-1">
                  <input
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-purple-500 flex-1"
                    autoFocus
                    maxLength={30}
                    onKeyDown={e => e.key === 'Enter' && handleUpdateName()}
                  />
                  <button onClick={handleUpdateName} className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-semibold transition-colors">✓</button>
                  <button onClick={() => setEditing(false)} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-colors">✕</button>
                </div>
              ) : (
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="text-xl font-black">{profile?.displayName || 'Utilisateur'}</h1>
                  <button onClick={() => { setEditing(true); setNewName(profile?.displayName || ''); }}
                    className="text-white/30 hover:text-white/60 transition-colors text-sm">✏️</button>
                </div>
              )}
              <p className="text-white/30 text-sm mb-3">{user?.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
                  🎯 {quizzesDone} quiz complétés
                </span>
                {profile?.totalQuizzes > 0 && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
                    🏆 Meilleur score : {bestScore}%
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-semibold transition-colors"
            >
              🚪 Déconnexion
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 p-1 rounded-xl mb-6 border border-white/[0.06]">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); router.push(`/profile?tab=${t.id}`, undefined, { shallow: true }); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === t.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {loadingData ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            {/* STATS */}
            {activeTab === 'stats' && (
              <div className="animate-fade-in space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: quizzesDone, label: 'Quiz complétés', emoji: '🎯' },
                    { value: `${avgScore}%`, label: 'Score moyen', emoji: '📊' },
                    { value: `${bestScore}%`, label: 'Meilleur score', emoji: '🏆' },
                  ].map(s => (
                    <div key={s.label} className="card p-4 text-center">
                      <div className="text-2xl mb-1">{s.emoji}</div>
                      <div className="text-2xl font-black text-white">{s.value}</div>
                      <div className="text-xs text-white/30 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="card p-6">
                  <h3 className="font-bold mb-4">🔥 Quiz à essayer</h3>
                  <div className="space-y-2">
                    {QUIZZES.filter(q => !results.find(r => r.quizId === q.id)).slice(0, 3).map(q => (
                      <QuizCard key={q.id} quiz={q} compact />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* HISTORY */}
            {activeTab === 'history' && (
              <div className="animate-fade-in space-y-3">
                {results.length === 0 ? (
                  <div className="text-center py-16 text-white/30">
                    <div className="text-5xl mb-4">📊</div>
                    <p className="font-medium mb-2">Aucun quiz complété</p>
                    <Link href="/" className="text-purple-400 hover:underline text-sm">
                      Faire ton premier quiz →
                    </Link>
                  </div>
                ) : (
                  results.map(r => {
                    const q = getQuizById(r.quizId);
                    return (
                      <div key={r.id} className="card p-4 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${q?.gradient || 'from-purple-600 to-pink-600'} flex items-center justify-center text-xl flex-shrink-0`}>
                          {q?.emoji || '🎯'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{q?.title || r.quizId}</p>
                          <p className="text-xs text-white/40 mt-0.5">{r.resultLabel}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className={`text-lg font-black ${r.percentage >= 80 ? 'text-green-400' : r.percentage >= 50 ? 'text-amber-400' : 'text-white/60'}`}>
                            {r.percentage}%
                          </div>
                          <p className="text-xs text-white/20">
                            {r.completedAt?.toDate?.()?.toLocaleDateString('fr-FR') || ''}
                          </p>
                        </div>
                        {q && (
                          <Link href={`/quiz/${q.id}`}
                            className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/30 hover:text-white">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                          </Link>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* FAVORITES */}
            {activeTab === 'favorites' && (
              <div className="animate-fade-in">
                {favQuizzes.length === 0 ? (
                  <div className="text-center py-16 text-white/30">
                    <div className="text-5xl mb-4">❤️</div>
                    <p className="font-medium mb-2">Aucun favori</p>
                    <p className="text-sm text-white/20 mb-4">Clique sur 🤍 sur les cartes de quiz pour les sauvegarder</p>
                    <Link href="/" className="text-purple-400 hover:underline text-sm">
                      Explorer les quiz →
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favQuizzes.map(q => (
                      <QuizCard key={q.id} quiz={q} isFavorite={true} onFavoriteToggle={loadData} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
