import Link from 'next/link';
import Layout from '../components/Layout';
import QuizCard from '../components/QuizCard';
import { CATEGORIES, getQuizzesByCategory } from '../data/quizzes';

export default function Categories() {
  return (
    <Layout title="Catégories" description="Explore tous nos quiz par catégorie : personnalité, amour, intelligence, pop culture et plus.">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-3">📂 Toutes les catégories</h1>
          <p className="text-white/40">Choisissez une catégorie et plongez dans le quiz parfait pour vous</p>
        </div>

        {CATEGORIES.map(cat => {
          const quizzes = getQuizzesByCategory(cat.id);
          if (!quizzes.length) return null;
          return (
            <section key={cat.id} className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl`}>
                    {cat.emoji}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{cat.label}</h2>
                    <p className="text-sm text-white/30">{cat.desc}</p>
                  </div>
                </div>
                <span className="text-sm text-white/30 font-medium">{quizzes.length} quiz</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quizzes.map(quiz => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Layout>
  );
}
