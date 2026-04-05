import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import AdBanner, { AdInterstitial } from '../../components/AdBanner';
import { getQuizById, calculateResult } from '../../data/quizzes';
import { useAuth } from '../../context/AuthContext';
import { saveQuizResult, submitLeaderboardEntry } from '../../lib/firestore';
import toast from 'react-hot-toast';

// ─── STATE MACHINE ────────────────────────────────────────────────────────────
// states: 'intro' | 'ad' | 'playing' | 'results'

export default function QuizPage() {
  const router = useRouter();
  const { id }  = router.query;
  const { user, profile } = useAuth();

  const [quiz, setQuiz]           = useState(null);
  const [phase, setPhase]         = useState('intro');   // intro | ad | playing | results
  const [currentQ, setCurrentQ]   = useState(0);
  const [answers, setAnswers]      = useState({});
  const [selected, setSelected]    = useState(null);     // answer id chosen in current Q
  const [revealed, setRevealed]    = useState(false);    // for knowledge quizzes
  const [result, setResult]        = useState(null);
  const [saving, setSaving]        = useState(false);
  const [savedId, setSavedId]      = useState(null);

  useEffect(() => {
    if (id) {
      const q = getQuizById(id);
      if (!q) { router.replace('/'); return; }
      setQuiz(q);
    }
  }, [id]);

  // Reset when quiz changes
  useEffect(() => {
    setPhase('intro');
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
    setRevealed(false);
    setResult(null);
    setSavedId(null);
  }, [quiz?.id]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleStart() {
    setPhase('ad');
  }

  function handleAdClose() {
    setPhase('playing');
  }

  function handleSelectAnswer(answerId) {
    if (revealed) return; // already answered
    setSelected(answerId);

    if (quiz.type === 'knowledge') {
      setRevealed(true);
      // Auto-advance after 1.5s
      setTimeout(() => advanceQuestion(answerId), 1600);
    }
    // For personality quizzes, user must click "Suivant"
  }

  function handleNextQuestion() {
    if (!selected) {
      toast('Choisis une réponse !', { icon: '👆' });
      return;
    }
    advanceQuestion(selected);
  }

  function advanceQuestion(answerId) {
    const newAnswers = { ...answers, [quiz.questions[currentQ].id]: answerId };
    setAnswers(newAnswers);
    setSelected(null);
    setRevealed(false);

    if (currentQ + 1 < quiz.questions.length) {
      setCurrentQ(prev => prev + 1);
    } else {
      // All questions done — compute result
      const r = calculateResult(quiz, newAnswers);
      setResult(r);
      setPhase('results');
      saveResult(r, newAnswers);
    }
  }

  async function saveResult(r, answersData) {
    if (!user) return;
    setSaving(true);
    try {
      const docId = await saveQuizResult(user.uid, quiz.id, r);
      setSavedId(docId);
      await submitLeaderboardEntry(
        user.uid,
        profile?.displayName || 'Anonyme',
        quiz.id,
        r.percentage
      );
    } catch (e) {
      console.error('Save error:', e);
    }
    setSaving(false);
  }

  function handleReplay() {
    setPhase('intro');
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
    setRevealed(false);
    setResult(null);
    setSavedId(null);
  }

  // ── Loading ───────────────────────────────────────────────────────────────

  if (!quiz) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
        </div>
      </Layout>
    );
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <Layout title={quiz.title} description={quiz.description} noAds>
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
            ← Retour
          </Link>

          <div className="card overflow-hidden animate-scale-in">
            <div className={`h-2 bg-gradient-to-r ${quiz.gradient}`} />
            <div className="p-6 sm:p-8">

              {/* Emoji + category */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${quiz.gradient} flex items-center justify-center text-3xl shadow-xl`}>
                  {quiz.emoji}
                </div>
                <div>
                  <span className="text-xs text-white/30 uppercase tracking-wider font-medium">
                    {quiz.category}
                  </span>
                  <div className="flex items-center gap-3 mt-1 text-sm text-white/40">
                    <span>⏱ {quiz.estimated_time}</span>
                    <span>•</span>
                    <span>❓ {quiz.questions.length} questions</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-3">
                {quiz.title}
              </h1>

              {/* Viral hook */}
              {quiz.viral_hook && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium mb-4">
                  ✨ {quiz.viral_hook}
                </div>
              )}

              <p className="text-white/50 mb-8 text-base leading-relaxed">
                {quiz.description}
              </p>

              {/* Instructions */}
              <div className="bg-white/[0.03] rounded-xl p-4 mb-8 border border-white/[0.06]">
                <p className="text-sm text-white/50 font-medium mb-3">📋 Comment ça marche :</p>
                <ul className="space-y-2 text-sm text-white/40">
                  <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> {quiz.questions.length} questions — réponds honnêtement</li>
                  <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Résultat personnalisé à la fin</li>
                  {!user && <li className="flex items-center gap-2"><span className="text-amber-400">💡</span> Connecte-toi pour sauvegarder tes résultats</li>}
                </ul>
              </div>

              <button
                onClick={handleStart}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r ${quiz.gradient} font-black text-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-2xl`}
              >
                🚀 Commencer le quiz
              </button>

              {!user && (
                <p className="text-center text-xs text-white/20 mt-4">
                  <Link href="/login" className="text-purple-400 hover:underline">Connexion</Link> pour sauvegarder tes résultats
                </p>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── AD INTERSTITIAL ───────────────────────────────────────────────────────
  if (phase === 'ad') {
    return (
      <Layout noAds>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4 animate-bounce">⏳</div>
            <p className="text-white/50">Préparation du quiz...</p>
          </div>
        </div>
        <AdInterstitial onClose={handleAdClose} />
      </Layout>
    );
  }

  // ── PLAYING ───────────────────────────────────────────────────────────────
  if (phase === 'playing') {
    const q        = quiz.questions[currentQ];
    const progress = Math.round(((currentQ) / quiz.questions.length) * 100);
    const isKnowledge = quiz.type === 'knowledge';

    return (
      <Layout title={quiz.title} noAds>
        <div className="max-w-2xl mx-auto px-4 py-8">

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-white/40 mb-2">
              <span>Question {currentQ + 1} / {quiz.questions.length}</span>
              <span>{progress}% complété</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Ad every 5 questions */}
          {currentQ > 0 && currentQ % 5 === 0 && (
            <div className="mb-6">
              <AdBanner slot="between-questions" className="rounded-xl overflow-hidden" />
            </div>
          )}

          {/* Question card */}
          <div className="card p-6 sm:p-8 animate-slide-up" key={currentQ}>
            <div className="flex items-start gap-3 mb-6">
              <span className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${quiz.gradient} flex items-center justify-center text-sm font-bold`}>
                {currentQ + 1}
              </span>
              <h2 className="text-lg sm:text-xl font-bold leading-snug pt-0.5">
                {q.text}
              </h2>
            </div>

            <div className="space-y-3">
              {q.answers.map(ans => {
                let cls = 'answer-btn';
                if (selected === ans.id && !isKnowledge) cls += ' selected';
                if (isKnowledge && revealed) {
                  if (ans.correct) cls += ' correct';
                  else if (selected === ans.id && !ans.correct) cls += ' wrong';
                }

                return (
                  <button
                    key={ans.id}
                    className={cls}
                    onClick={() => handleSelectAnswer(ans.id)}
                    disabled={isKnowledge && revealed}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg border border-current/30 flex items-center justify-center text-xs font-bold flex-shrink-0 uppercase">
                        {ans.id}
                      </span>
                      {ans.text}
                    </span>
                    {isKnowledge && revealed && ans.correct && (
                      <span className="float-right text-green-400">✓</span>
                    )}
                    {isKnowledge && revealed && selected === ans.id && !ans.correct && (
                      <span className="float-right text-red-400">✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation for knowledge quizzes */}
            {isKnowledge && revealed && q.explanation && (
              <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-200 animate-fade-in">
                💡 {q.explanation}
              </div>
            )}

            {/* Next button for personality quizzes */}
            {!isKnowledge && (
              <button
                onClick={handleNextQuestion}
                disabled={!selected}
                className={`mt-6 w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                  selected
                    ? `bg-gradient-to-r ${quiz.gradient} hover:opacity-90 shadow-xl`
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                {currentQ + 1 === quiz.questions.length ? '🎯 Voir mon résultat' : 'Question suivante →'}
              </button>
            )}
          </div>

          {/* Quit link */}
          <div className="text-center mt-6">
            <button onClick={handleReplay} className="text-xs text-white/20 hover:text-white/40 transition-colors">
              ✕ Abandonner le quiz
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // ── RESULTS ───────────────────────────────────────────────────────────────
  if (phase === 'results' && result) {
    const shareText = `J'ai obtenu "${result.label}" sur Quizify ! Fais le test aussi 👉`;
    const shareUrl  = typeof window !== 'undefined' ? window.location.origin + `/quiz/${quiz.id}` : '';

    return (
      <Layout title={`Résultat : ${result.label}`} noAds>
        <div className="max-w-2xl mx-auto px-4 py-8">

          {/* Results card */}
          <div className="card overflow-hidden animate-scale-in">
            <div className={`p-8 bg-gradient-to-br ${quiz.gradient} text-center`}>
              <div className="text-6xl mb-3">{quiz.emoji}</div>
              <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-2">Ton résultat</p>
              <h2 className="text-2xl sm:text-3xl font-black">{result.label}</h2>

              {/* Score display */}
              {result.type === 'knowledge' ? (
                <div className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-2xl">
                  <span className="text-3xl font-black">{result.score}/{result.maxScore}</span>
                  <span className="text-white/70">({result.percentage}%)</span>
                </div>
              ) : (
                <div className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-2xl">
                  <span className="text-white/70">Score de</span>
                  <span className="text-2xl font-black">{result.percentage}%</span>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-white/70 leading-relaxed mb-6 text-base">
                {result.description}
              </p>

              {/* Profile details for personality */}
              {result.profile?.strengths && (
                <div className="bg-white/[0.03] rounded-xl p-4 mb-6 border border-white/[0.06]">
                  <p className="text-sm font-semibold text-white/60 mb-3">💪 Tes points forts :</p>
                  <div className="flex flex-wrap gap-2">
                    {result.profile.strengths.map(s => (
                      <span key={s} className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.profile?.advice && (
                <div className="bg-amber-500/5 rounded-xl p-4 border border-amber-500/20 mb-6">
                  <p className="text-sm font-semibold text-amber-400/80 mb-1">💡 Conseil :</p>
                  <p className="text-sm text-white/50">{result.profile.advice}</p>
                </div>
              )}

              {result.profile?.celebs && (
                <div className="mb-6">
                  <p className="text-sm text-white/30 mb-2">Personnalités similaires :</p>
                  <div className="flex flex-wrap gap-2">
                    {result.profile.celebs.map(c => (
                      <span key={c} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                        ⭐ {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ad after results */}
              <AdBanner slot="after-results" className="rounded-xl overflow-hidden mb-6" />

              {/* Share */}
              <div className="space-y-3 mb-6">
                <p className="text-center text-sm font-semibold text-white/60">🚀 Partage ton résultat !</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label:'WhatsApp', icon:'💬', bg:'bg-green-600 hover:bg-green-500',
                      href:`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}` },
                    { label:'Twitter',  icon:'🐦', bg:'bg-sky-600 hover:bg-sky-500',
                      href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}` },
                    { label:'Facebook', icon:'📘', bg:'bg-blue-700 hover:bg-blue-600',
                      href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
                    { label:'Snapchat', icon:'👻', bg:'bg-yellow-400 hover:bg-yellow-300 text-black',
                      href:`https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(shareUrl)}` },
                  ].map(btn => (
                    <a key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl ${btn.bg} font-medium text-sm transition-colors text-white`}>
                      <span>{btn.icon}</span>
                      <span className="hidden sm:inline">{btn.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleReplay}
                  className="py-3 rounded-xl bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors border border-white/10"
                >
                  🔄 Rejouer
                </button>
                <Link href="/"
                  className="py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 font-semibold text-sm transition-opacity text-center">
                  ✨ Autres quiz
                </Link>
              </div>

              {/* Save status */}
              {user && (
                <p className="text-center text-xs text-white/20 mt-4">
                  {saving ? '💾 Sauvegarde en cours...' : savedId ? '✅ Résultat sauvegardé dans ton profil' : ''}
                </p>
              )}
              {!user && (
                <p className="text-center text-xs text-white/20 mt-4">
                  <Link href={`/register`} className="text-purple-400 hover:underline">Crée un compte</Link> pour sauvegarder tes résultats
                </p>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
}
