import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Header() {
  const { user, profile, logout, authEnabled } = useAuth();
  const router  = useRouter();
  const [menu, setMenu] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      toast.success('À bientôt !');
      router.push('/');
    } catch {
      toast.error('Erreur lors de la déconnexion');
    }
  }

  const nav = [
    { href: '/',           label: 'Accueil' },
    { href: '/categories', label: 'Catégories' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] backdrop-blur-xl bg-[#0f0f13]/80">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform">
            🧠
          </div>
          <span className="font-black text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 hidden sm:block">
            Quizify
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition-colors hover:text-white ${
                router.pathname === n.href ? 'text-white' : 'text-white/50'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenu(!menu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                  {(profile?.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate">
                  {profile?.displayName || 'Mon profil'}
                </span>
                <svg className={`w-4 h-4 transition-transform ${menu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {menu && (
                <div className="absolute right-0 mt-2 w-48 card shadow-2xl animate-scale-in overflow-hidden">
                  <Link href="/profile" onClick={() => setMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-sm">
                    <span>👤</span> Mon profil
                  </Link>
                  <Link href="/profile?tab=history" onClick={() => setMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-sm">
                    <span>📊</span> Mes résultats
                  </Link>
                  <Link href="/profile?tab=favorites" onClick={() => setMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-sm">
                    <span>❤️</span> Mes favoris
                  </Link>
                  <div className="border-t border-white/[0.07]" />
                  <button
                    onClick={() => { setMenu(false); handleLogout(); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-red-400 transition-colors text-sm w-full text-left"
                  >
                    <span>🚪</span> Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : authEnabled ? (
            <div className="flex items-center gap-2">
              <Link href="/login"
                className="text-sm font-medium text-white/60 hover:text-white transition-colors px-3 py-2">
                Connexion
              </Link>
              <Link href="/register"
                className="text-sm font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity">
                S'inscrire
              </Link>
            </div>
          ) : (
            <div className="hidden sm:block text-xs text-white/35 border border-white/10 rounded-xl px-3 py-2">
              Mode visiteur
            </div>
          )}

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenu(!menu)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menu
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menu && (
        <div className="md:hidden border-t border-white/[0.07] bg-[#0f0f13] animate-slide-up">
          {nav.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setMenu(false)}
              className="block px-4 py-3 text-sm font-medium hover:bg-white/5 transition-colors border-b border-white/[0.05]">
              {n.label}
            </Link>
          ))}
          {!user && authEnabled && (
            <>
              <Link href="/login" onClick={() => setMenu(false)}
                className="block px-4 py-3 text-sm font-medium hover:bg-white/5 transition-colors border-b border-white/[0.05]">
                Connexion
              </Link>
              <Link href="/register" onClick={() => setMenu(false)}
                className="block px-4 py-3 text-sm font-bold text-purple-400 hover:bg-white/5 transition-colors">
                S'inscrire gratuitement →
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
