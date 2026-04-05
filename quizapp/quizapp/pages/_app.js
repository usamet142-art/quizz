import { AuthProvider } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const [cookieConsent, setCookieConsent] = useState(null);
  const hasAdSensePublisher = Boolean(
    publisherId && publisherId.startsWith('ca-pub-') && !publisherId.includes('XXXX')
  );
  const canLoadAds = hasAdSensePublisher && cookieConsent === 'granted';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncConsent = () => {
      setCookieConsent(window.localStorage.getItem('quizify-cookie-consent'));
    };

    syncConsent();
    window.addEventListener('storage', syncConsent);
    window.addEventListener('quizify-cookie-consent-updated', syncConsent);

    return () => {
      window.removeEventListener('storage', syncConsent);
      window.removeEventListener('quizify-cookie-consent-updated', syncConsent);
    };
  }, []);

  return (
    <AuthProvider>
      {canLoadAds && (
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
          crossOrigin="anonymous"
        />
      )}
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a1a24',
            color: '#f1f1f1',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#7c3aed', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
    </AuthProvider>
  );
}
