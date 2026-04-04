import Head from 'next/head';
import Link from 'next/link';
import Header from './Header';
import AdBanner from './AdBanner';
import CookieBanner from './CookieBanner';

export default function Layout({ children, title, description, noAds = false }) {
  const pageTitle = title ? `${title} | Mingquizz` : 'Mingquizz - Quiz Viraux & Tests de Personnalite';
  const pageDescription =
    description ||
    'Decouvre qui tu es vraiment avec nos quiz de personnalite, tests de culture generale et challenges viraux. 100% gratuit.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mingquizz" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">{children}</main>

        {!noAds && (
          <div className="sticky bottom-0 z-40">
            <AdBanner slot="sticky-bottom" size="banner" />
          </div>
        )}

        <footer className="border-t border-white/[0.07] py-8 mt-16 mb-14 md:mb-0">
          <div className="max-w-6xl mx-auto px-4 text-center text-white/30 text-sm">
            <p className="mb-2">
              <strong className="text-white/50">Mingquizz</strong> - Quiz viraux, tests de personnalite & culture generale
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-3 text-white/45">
              <Link href="/politique-confidentialite" className="hover:text-white transition-colors">
                Politique de confidentialite
              </Link>
              <Link href="/mentions-legales" className="hover:text-white transition-colors">
                Mentions legales
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
            <p>© {new Date().getFullYear()} Mingquizz. Tous droits reserves.</p>
          </div>
        </footer>
      </div>

      <CookieBanner noAds={noAds} />
    </>
  );
}
