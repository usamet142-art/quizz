import Layout from '../components/Layout';

const sections = [
  {
    title: '1. Donnees collectees',
    text: "Nous pouvons collecter les informations que tu fournis lors de l'inscription, comme ton adresse e-mail, ton nom d'affichage et les resultats de quiz que tu choisis de sauvegarder.",
  },
  {
    title: '2. Utilisation des donnees',
    text: "Ces donnees servent a faire fonctionner le compte utilisateur, enregistrer l'historique des quiz, securiser la plateforme et ameliorer l'experience globale.",
  },
  {
    title: '3. Cookies et consentement',
    text: "Mingquizz utilise des cookies essentiels pour le bon fonctionnement du site. Avec ton accord, nous pouvons aussi utiliser des cookies de mesure d'audience et des cookies publicitaires afin d'afficher des annonces via Google AdSense.",
  },
  {
    title: '4. Publicite Google AdSense',
    text: "Lorsque tu acceptes les cookies publicitaires, Google peut utiliser des cookies pour afficher des annonces personnalisees en fonction de tes visites sur ce site et sur d'autres sites.",
  },
  {
    title: '5. Partage avec des tiers',
    text: "Nous ne vendons pas tes donnees personnelles. Certaines informations techniques peuvent etre traitees par nos prestataires, notamment Firebase pour l'authentification et l'hebergement des donnees, et Google AdSense pour la diffusion des annonces.",
  },
  {
    title: '6. Duree de conservation',
    text: "Les donnees de compte et de quiz sont conservees tant que ton compte reste actif, sauf obligation legale ou demande de suppression de ta part.",
  },
  {
    title: '7. Tes droits',
    text: "Tu peux demander l'acces, la rectification ou la suppression de tes donnees personnelles. Tu peux aussi revenir sur ton choix concernant les cookies en effacant le stockage local du navigateur ou via un futur centre de preferences.",
  },
  {
    title: '8. Contact',
    text: "Pour toute question sur la vie privee ou l'utilisation des donnees, tu peux ecrire a usamet142@gmail.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <Layout
      title="Politique de confidentialite"
      description="Informations sur les donnees personnelles, les cookies et la publicite Google AdSense sur Mingquizz."
      noAds
    >
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="card p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            Confidentialite
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4">Politique de confidentialite</h1>
          <p className="text-white/55 leading-7 mb-8">
            Cette page explique quelles donnees peuvent etre traitees sur Mingquizz, pourquoi elles sont
            utilisees et comment la publicite et les cookies sont geres.
          </p>

          <div className="space-y-6">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-bold mb-2">{section.title}</h2>
                <p className="text-white/60 leading-7">{section.text}</p>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100/85">
            Contact de reference actuel : usamet142@gmail.com. Pense encore a verifier que cette politique
            correspond bien a tous les outils reels actifs sur le site avant soumission.
          </div>
        </div>
      </div>
    </Layout>
  );
}
