import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading, authEnabled } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authEnabled) {
      router.push('/');
      return;
    }
    if (!loading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [user, loading, router, authEnabled]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          <p className="text-white/40 text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!authEnabled) return null;
  if (!user) return null;
  return children;
}
