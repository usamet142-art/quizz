import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail]   = useState('');
  const [sent, setSent]     = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Email invalide');
      return;
    }
    setSubmitting(true);
    try {
      await resetPassword(email.trim());
      setSent(true);
      toast.success('Email envoyé !');
    } catch {
      toast.error('Erreur. Vérifie ton email.');
    }
    setSubmitting(false);
  }

  return (
    <Layout title="Mot de passe oublié" noAds>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-scale-in">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl">🧠</div>
              <span className="font-black text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Quizify</span>
            </Link>
            <h1 className="text-2xl font-black">Mot de passe oublié 🔑</h1>
            <p className="text-white/40 mt-1 text-sm">On t'envoie un lien de réinitialisation</p>
          </div>

          <div className="card p-6 sm:p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📧</div>
                <h2 className="text-xl font-bold mb-2">Email envoyé !</h2>
                <p className="text-white/40 text-sm mb-6">Vérifie ta boîte mail et clique sur le lien de réinitialisation.</p>
                <Link href="/login" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold text-sm hover:opacity-90 transition-opacity">
                  Retour à la connexion
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1.5">Ton email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ton@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    autoComplete="email"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Envoi...</> : 'Envoyer le lien →'}
                </button>
                <p className="text-center text-sm text-white/30">
                  <Link href="/login" className="text-purple-400 hover:underline">← Retour connexion</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
