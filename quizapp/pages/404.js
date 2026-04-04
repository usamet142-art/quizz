import Link from 'next/link';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout title="Page introuvable" noAds>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center animate-scale-in">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="text-4xl font-black mb-3">Oops ! Page introuvable</h1>
          <p className="text-white/40 mb-8 max-w-sm mx-auto">
            Cette page n'existe pas ou a été déplacée. Pas de panique, il y a plein de quiz à faire !
          </p>
          <Link href="/"
            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold hover:opacity-90 transition-opacity">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </Layout>
  );
}
