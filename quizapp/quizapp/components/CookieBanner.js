import { useEffect, useState } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'quizify-cookie-consent';

export default function CookieBanner({ noAds = false }) {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    setConsent(storedConsent);
  }, []);

  function saveConsent(value) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent('quizify-cookie-consent-updated', { detail: value }));
    setConsent(value);
  }

  if (consent) {
    return null;
  }

  return (
    <div className={`fixed left-4 right-4 z-[60] ${noAds ? 'bottom-4' : 'bottom-24 md:bottom-4'}`}>
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#12121a]/95 backdrop-blur-xl shadow-2xl shadow-black/30">
        <div className="p-4 sm:p-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-white">Cookies et publicite</p>
            <p className="mt-1 text-sm leading-6 text-white/65">
              Nous utilisons des cookies pour mesurer l'audience, memoriser tes preferences et afficher
              des publicites via Google AdSense si tu les acceptes.
              {' '}
              <Link href="/politique-confidentialite" className="text-purple-300 hover:text-purple-200 underline underline-offset-4">
                Voir la politique de confidentialite
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <button
              onClick={() => saveConsent('denied')}
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors"
            >
              Refuser
            </button>
            <button
              onClick={() => saveConsent('granted')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-bold text-white hover:opacity-90 transition-opacity"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
