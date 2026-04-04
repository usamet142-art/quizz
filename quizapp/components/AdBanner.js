import { useEffect, useRef } from 'react';

const AD_SLOTS = {
  'homepage-top':    { format: 'auto',        style: { display: 'block', height: '90px' }, slot: process.env.NEXT_PUBLIC_ADSENSE_HOMEPAGE_TOP_SLOT || '1234567890' },
  'before-quiz':     { format: 'auto',        style: { display: 'block', height: '250px' }, slot: process.env.NEXT_PUBLIC_ADSENSE_BEFORE_QUIZ_SLOT || '2345678901' },
  'after-results':   { format: 'auto',        style: { display: 'block', height: '250px' }, slot: process.env.NEXT_PUBLIC_ADSENSE_AFTER_RESULTS_SLOT || '3456789012' },
  'sticky-bottom':   { format: 'auto',        style: { display: 'block', height: '60px', width: '100%' }, slot: process.env.NEXT_PUBLIC_ADSENSE_STICKY_BOTTOM_SLOT || '4567890123' },
  'banner':          { format: 'horizontal',  style: { display: 'block', height: '60px' }, slot: process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT || '5678901234' },
  'between-questions': { format: 'auto',      style: { display: 'block', height: '100px' }, slot: process.env.NEXT_PUBLIC_ADSENSE_BETWEEN_QUESTIONS_SLOT || '6789012345' },
};

const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-XXXXXXXXXXXXXXXXX';
const COOKIE_CONSENT_KEY = 'quizify-cookie-consent';

export default function AdBanner({ slot = 'banner', size = 'normal', className = '' }) {
  const adRef  = useRef(null);
  const config = AD_SLOTS[slot] || AD_SLOTS['banner'];
  const hasRealPublisher = publisherId.startsWith('ca-pub-') && !publisherId.includes('XXXX');
  const hasConsent =
    typeof window !== 'undefined' && window.localStorage.getItem(COOKIE_CONSENT_KEY) === 'granted';

  useEffect(() => {
    if (!hasRealPublisher || !hasConsent || typeof window === 'undefined' || !window.adsbygoogle || !adRef.current) {
      return;
    }

    if (adRef.current.dataset.adStatus === 'done') {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Ignore AdSense errors in dev
    }
  }, [hasConsent, hasRealPublisher, slot]);

  // En développement ou si pas de vrai ID, montrer placeholder
  const isDev = !hasRealPublisher;

  if (isDev) {
    return (
      <div className={`ad-slot rounded-xl ${className}`} style={config.style}>
        <div className="flex flex-col items-center gap-1 opacity-30">
          <span className="text-xs uppercase tracking-widest">Publicité</span>
          <span className="text-[10px]">Espace publicitaire {slot}</span>
        </div>
      </div>
    );
  }

  if (!hasConsent) {
    return (
      <div className={`ad-slot rounded-xl ${className}`} style={config.style}>
        <div className="flex flex-col items-center gap-1 opacity-50 text-center px-3">
          <span className="text-xs uppercase tracking-widest">Cookies requis</span>
          <span className="text-[10px]">Accepte les cookies publicitaires pour activer cet emplacement</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={config.style}
        data-ad-client={publisherId}
        data-ad-slot={config.slot}
        data-ad-format={config.format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Composant interstitiel (avant le quiz)
export function AdInterstitial({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto-close après 5s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-lg w-full mx-4">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-white/30 uppercase tracking-wider">Publicité</span>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors text-xl">✕</button>
          </div>
          <AdBanner slot="before-quiz" className="w-full" />
          <button
            onClick={onClose}
            className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold hover:opacity-90 transition-opacity"
          >
            Commencer le quiz →
          </button>
          <p className="text-center text-xs text-white/30 mt-2">Fermeture automatique dans quelques secondes</p>
        </div>
      </div>
    </div>
  );
}
