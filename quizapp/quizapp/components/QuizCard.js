import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addFavorite, removeFavorite } from '../lib/firestore';
import toast from 'react-hot-toast';

export default function QuizCard({ quiz, isFavorite = false, onFavoriteToggle, compact = false }) {
  const { user } = useAuth();
  const [fav, setFav]       = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  async function handleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { toast('Connecte-toi pour sauvegarder !', { icon: '🔐' }); return; }
    setLoading(true);
    try {
      if (fav) {
        await removeFavorite(user.uid, quiz.id);
        setFav(false);
        toast.success('Retiré des favoris');
      } else {
        await addFavorite(user.uid, quiz.id);
        setFav(true);
        toast.success('Ajouté aux favoris ❤️');
      }
      onFavoriteToggle?.();
    } catch {
      toast.error('Erreur, réessaie');
    }
    setLoading(false);
  }

  if (compact) {
    return (
      <Link href={`/quiz/${quiz.id}`}
        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/[0.06] group">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${quiz.gradient} flex items-center justify-center text-lg flex-shrink-0`}>
          {quiz.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate group-hover:text-purple-300 transition-colors">{quiz.title}</p>
          <p className="text-xs text-white/40">{quiz.estimated_time} · {quiz.questions.length} questions</p>
        </div>
        <svg className="w-4 h-4 text-white/20 group-hover:text-purple-400 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </Link>
    );
  }

  return (
    <div className="group relative card hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1 overflow-hidden">
      {/* Gradient header */}
      <div className={`h-3 bg-gradient-to-r ${quiz.gradient}`} />

      <div className="p-4 sm:p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${quiz.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
            {quiz.emoji}
          </div>
          <button
            onClick={handleFavorite}
            disabled={loading}
            className={`p-1.5 rounded-lg transition-all ${fav ? 'text-pink-400 bg-pink-400/10' : 'text-white/20 hover:text-pink-400 hover:bg-pink-400/10'}`}
            aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            {fav ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Title */}
        <h3 className="font-bold text-sm sm:text-base leading-snug mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
          {quiz.title}
        </h3>

        {/* Viral hook */}
        {quiz.viral_hook && (
          <p className="text-xs text-amber-400/80 mb-2 italic">
            ✨ {quiz.viral_hook}
          </p>
        )}

        {/* Description */}
        <p className="text-xs text-white/40 line-clamp-2 mb-4">
          {quiz.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
          <span>⏱ {quiz.estimated_time}</span>
          <span>•</span>
          <span>❓ {quiz.questions.length} questions</span>
        </div>

        {/* CTA */}
        <Link href={`/quiz/${quiz.id}`}
          className={`block w-full py-3 rounded-xl bg-gradient-to-r ${quiz.gradient} font-bold text-sm text-center hover:opacity-90 transition-opacity shadow-lg`}>
          Faire le quiz →
        </Link>
      </div>
    </div>
  );
}
