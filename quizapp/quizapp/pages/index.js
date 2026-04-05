import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import QuizCard from '../components/QuizCard';
import AdBanner from '../components/AdBanner';
import { QUIZZES, CATEGORIES, getQuizzesByCategory } from '../data/quizzes';

const trustPoints = [
  {
    title: 'A propos de Mingquizz',
    desc: 'Mingquizz propose des quiz de personnalite, de culture generale et des formats ludiques pensés pour divertir sans compliquer l experience.',
  },
  {
    title: 'Transparence',
    desc: 'Des pages publiques expliquent la confidentialite, les cookies, les mentions legales et les moyens de contact du site.',
  },
  {
    title: 'Site gratuit',
    desc: 'Le site peut etre finance par la publicite afin de garder un acces libre aux quiz, sans abonnement obligatoire.',
  },
];

const editorialHighlights = [
  'Quiz gratuits accessibles rapidement depuis mobile ou ordinateur',
  'Resultats ludiques, categories variees et experience simple a partager',
  'Informations de contact, FAQ et politique de confidentialite accessibles publiquement',
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = getQuizzesByCategory(activeCategory);

  return (
    <Layout
      title="Accueil"
      description="Mingquizz propose des quiz viraux, tests de personnalite et quiz de culture generale gratuits avec pages d'information claires et experience simple."
    >
      <section className="relative overflow-hidden py-12 sm:py-20 px-4">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-purple-700/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-pink-700/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-indigo-700/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            {QUIZZES.length} quiz disponibles · Nouveaux ajouts reguliers
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 animate-slide-up">
            Decouvre des quiz
            {' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              fun et partageables
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/50 mb-8 max-w-2xl mx-auto animate-fade-in">
            Mingquizz rassemble des tests de personnalite, quiz de culture generale et formats viraux dans
            une experience gratuite, simple et optimisee pour le mobile.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-scale-in">
            <Link
              href="/quiz/quel-type-de-personne-es-tu"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-lg hover:opacity-90 transition-opacity shadow-2xl shadow-purple-900/40"
            >
              Commencer un quiz
            </Link>
            <Link
              href="/categories"
              className="px-8 py-4 rounded-2xl bg-white/10 font-bold text-lg hover:bg-white/15 transition-colors border border-white/10"
            >
              Voir les categories
            </Link>
          </div>

          <div className="flex justify-center gap-8 mt-12 text-center">
            {[
              { value: '50K+', label: 'Participants' },
              { value: '150+', label: 'Quiz' },
              { value: '4.9/5', label: 'Satisfaction' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-white/30">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 mb-8">
        <AdBanner slot="homepage-top" className="rounded-xl overflow-hidden" />
      </div>

      <section className="max-w-6xl mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trustPoints.map((item) => (
            <div key={item.title} className="card p-5">
              <h2 className="text-lg font-bold mb-2">{item.title}</h2>
              <p className="text-sm text-white/50 leading-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/[0.06]'
            }`}
          >
            Tous
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeCategory === cat.id
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-bold">
            {activeCategory === 'all'
              ? 'Selection de quiz'
              : `${CATEGORIES.find((c) => c.id === activeCategory)?.emoji} ${CATEGORIES.find((c) => c.id === activeCategory)?.label}`}
          </h2>
          <span className="text-sm text-white/30">{filtered.length} quiz</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((quiz, idx) => (
            <div key={quiz.id} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
              <QuizCard quiz={quiz} />
              {idx === 5 && (
                <div className="col-span-full mt-2">
                  <AdBanner slot="homepage-top" className="rounded-xl overflow-hidden" />
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <div className="text-5xl mb-4">Recherche</div>
            <p>Aucun quiz dans cette categorie pour l'instant.</p>
          </div>
        )}
      </section>

      <section className="border-t border-white/[0.07] py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
          <div className="card p-6 sm:p-8">
            <h2 className="text-3xl font-black mb-4">A propos de Mingquizz</h2>
            <p className="text-white/50 leading-7 mb-6">
              Mingquizz est un site de quiz grand public concu pour proposer des formats courts, ludiques et
              faciles a partager. L'objectif est d'offrir une experience divertissante tout en gardant un site
              simple, lisible et transparent sur les sujets de confidentialite et de publicite.
            </p>
            <div className="space-y-3">
              {editorialHighlights.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-white/60">
                  <span className="mt-1 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl font-black mb-4">Infos utiles</h2>
            <div className="space-y-3 text-sm text-white/60">
              <p>
                Pour toute question, partenariat ou demande relative aux donnees personnelles, tu peux ecrire a
                {' '}
                <a href="mailto:usamet142@gmail.com" className="text-purple-300 hover:text-purple-200 transition-colors">
                  usamet142@gmail.com
                </a>
                .
              </p>
              <p>Les annonces publicitaires ne s'activent qu'apres acceptation des cookies correspondants.</p>
              <p>Les pages FAQ, Contact, Mentions legales et Politique de confidentialite sont accessibles en bas du site.</p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/faq" className="px-5 py-3 rounded-xl bg-white/8 hover:bg-white/12 border border-white/10 transition-colors text-sm font-semibold text-center">
                Consulter la FAQ
              </Link>
              <Link href="/contact" className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity text-sm font-bold text-center">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
