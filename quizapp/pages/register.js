import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register, loginWithGoogle, authEnabled } = useAuth();
  const router = useRouter();

  const [form, setForm]     = useState({ displayName: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  function validate() {
    const e = {};
    if (!form.displayName.trim() || form.displayName.trim().length < 2) e.displayName = 'Pseudo requis (min 2 caractères)';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (!form.password || form.password.length < 6) e.password = 'Minimum 6 caractères';
    if (form.password !== form.confirm) e.confirm = 'Les mots de passe ne correspondent pas';
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitting(true);
    try {
      await register(form.email.trim(), form.password, form.displayName.trim());
      toast.success('Compte créé ! Bienvenue sur Quizify 🎉');
      router.push('/');
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use'
        ? 'Cet email est déjà utilisé'
        : err.code === 'auth/weak-password'
        ? 'Mot de passe trop faible (min 6 caractères)'
        : 'Erreur lors de la création du compte';
      toast.error(msg);
      setErrors({ general: msg });
    }
    setSubmitting(false);
  }

  async function handleGoogle() {
    setSubmitting(true);
    try {
      await loginWithGoogle();
      toast.success('Compte créé avec Google ! 🎉');
      router.push('/');
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') toast.error('Erreur Google. Réessaie.');
    }
    setSubmitting(false);
  }

  function update(field, val) {
    setForm({ ...form, [field]: val });
    setErrors(prev => ({ ...prev, [field]: undefined, general: undefined }));
  }

  return (
    <Layout title="Inscription" noAds>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-scale-in">

          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl">🧠</div>
              <span className="font-black text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Quizify</span>
            </Link>
            <h1 className="text-2xl font-black">Crée ton compte 🚀</h1>
            <p className="text-white/40 mt-1 text-sm">Gratuit pour toujours</p>
          </div>

          <div className="card p-6 sm:p-8">
            {!authEnabled && (
              <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm">
                La creation de compte est temporairement desactivee pendant la mise en ligne. Tu peux deja
                parcourir les quiz librement.
              </div>
            )}
            <button
              onClick={handleGoogle}
              disabled={submitting || !authEnabled}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 font-semibold text-sm transition-all mb-6 disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
                <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 12 4.96c1.83 0 3.47.66 4.76 1.74l3.54-3.54A11.95 11.95 0 0 0 12 .97C7.31.97 3.26 3.82 1.28 7.97l3.99 1.79Z"/>
                <path fill="#34A853" d="M16.04 18.01A7.08 7.08 0 0 1 12 19.04a7.07 7.07 0 0 1-6.72-4.82l-3.99 1.78A11.95 11.95 0 0 0 12 23.03c3.19 0 6.24-1.18 8.51-3.26l-4.47-1.76Z"/>
                <path fill="#4A90D9" d="M20.51 19.77A11.96 11.96 0 0 0 23.03 12c0-.88-.1-1.74-.28-2.57H12v4.85h6.22a5.32 5.32 0 0 1-2.18 3.17l4.47 2.32Z"/>
                <path fill="#FBBC05" d="M5.28 14.22A7.1 7.1 0 0 1 4.96 12c0-.78.12-1.53.32-2.24L1.28 7.97A11.9 11.9 0 0 0 .97 12c0 1.41.25 2.77.7 4.02l3.61-1.8Z"/>
              </svg>
              Continuer avec Google
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-white/30">ou</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {errors.general && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{errors.general}</div>
              )}

              {[
                { field:'displayName', label:'Pseudo', type:'text',  placeholder:'Ton pseudo', auto:'username' },
                { field:'email',       label:'Email',  type:'email', placeholder:'ton@email.com', auto:'email' },
              ].map(f => (
                <div key={f.field}>
                  <label className="block text-sm font-medium text-white/60 mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    value={form[f.field]}
                    onChange={e => update(f.field, e.target.value)}
                    placeholder={f.placeholder}
                    autoComplete={f.auto}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors[f.field] ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition-colors text-sm`}
                  />
                  {errors[f.field] && <p className="text-red-400 text-xs mt-1">{errors[f.field]}</p>}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => update('password', e.target.value)}
                    placeholder="Minimum 6 caractères"
                    autoComplete="new-password"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition-colors text-sm pr-12`}
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-lg">
                    {showPwd ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Confirmer le mot de passe</label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={e => update('confirm', e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.confirm ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition-colors text-sm`}
                />
                {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting || !authEnabled}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {submitting ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Création du compte...</>
                ) : 'Créer mon compte gratuitement →'}
              </button>

              <p className="text-center text-xs text-white/20 mt-2">
                En créant un compte, tu acceptes nos{' '}
                <span className="text-white/40">conditions d'utilisation</span>.
              </p>
            </form>

            <p className="text-center text-sm text-white/30 mt-6">
              Déjà un compte ?{' '}
              <Link href="/login" className="text-purple-400 font-semibold hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
