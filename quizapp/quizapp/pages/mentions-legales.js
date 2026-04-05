import Layout from '../components/Layout';

const publisherInfo = [
  { label: 'Editeur du site', value: 'Mingquizz' },
  { label: 'Responsable de la publication', value: 'Mingquizz' },
  { label: 'E-mail de contact', value: 'usamet142@gmail.com' },
  { label: 'Adresse', value: 'Adresse a completer si necessaire selon ton statut et ton pays' },
  { label: 'Hebergement', value: 'Hebergeur a completer avant mise en ligne (ex. Vercel ou Netlify)' },
];

export default function LegalNoticePage() {
  return (
    <Layout
      title="Mentions legales"
      description="Informations legales concernant l'editeur du site Mingquizz, l'hebergement et les contacts."
      noAds
    >
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="card p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4">Mentions legales</h1>
          <p className="text-white/55 leading-7 mb-8">
            Cette page doit identifier clairement l'editeur du site, le responsable de publication et
            l'hebergeur. C'est aussi l'endroit a utiliser pour afficher une adresse de contact fiable.
          </p>

          <div className="grid gap-4">
            {publisherInfo.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/35 mb-2">{item.label}</p>
                <p className="text-white/80">{item.value}</p>
              </div>
            ))}
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-bold mb-2">Propriete intellectuelle</h2>
            <p className="text-white/60 leading-7">
              Les contenus, visuels, textes, quiz et elements graphiques publies sur Mingquizz sont proteges
              par le droit applicable. Toute reproduction ou reutilisation non autorisee est interdite.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-bold mb-2">Activite publicitaire</h2>
            <p className="text-white/60 leading-7">
              Le site peut afficher des annonces fournies par Google AdSense. Certaines annonces peuvent
              etre personnalisees selon le consentement donne par l'utilisateur via la banniere cookies.
            </p>
          </section>

          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100/85">
            Il reste surtout a renseigner l'adresse postale exacte et le nom de l'hebergeur utilise en
            production. Une fois ces deux informations ajoutees, la page sera beaucoup plus solide pour une
            soumission AdSense.
          </div>
        </div>
      </div>
    </Layout>
  );
}
