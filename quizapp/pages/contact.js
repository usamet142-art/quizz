import Layout from '../components/Layout';

export default function ContactPage() {
  return (
    <Layout
      title="Contact"
      description="Contacte Mingquizz pour toute question sur le site, la confidentialite, ou les partenariats."
      noAds
    >
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="card p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            Contact
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4">Nous contacter</h1>
          <p className="text-white/55 leading-7 mb-8">
            Pour toute question concernant Mingquizz, les quiz, la confidentialite, un partenariat ou un
            signalement, tu peux nous ecrire directement.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/35 mb-2">Entreprise</p>
              <p className="text-white/85 text-lg font-semibold">Mingquizz</p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/35 mb-2">E-mail</p>
              <a href="mailto:usamet142@gmail.com" className="text-purple-300 hover:text-purple-200 transition-colors">
                usamet142@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <h2 className="text-lg font-bold mb-3">Delai de reponse</h2>
            <p className="text-white/60 leading-7">
              Nous essayons de repondre aux demandes serieuses dans les meilleurs delais, en particulier pour
              les sujets lies aux donnees personnelles, au contenu et aux annonces affichees sur le site.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
