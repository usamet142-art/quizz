import Layout from '../components/Layout';

const faqs = [
  {
    question: 'Mingquizz est-il gratuit ?',
    answer:
      "Oui. Les quiz sont accessibles gratuitement. Le site peut etre finance en partie par la publicite afin de rester accessible sans abonnement.",
  },
  {
    question: 'Pourquoi voyez-vous une banniere cookies ?',
    answer:
      "La banniere permet de choisir si tu acceptes ou non les cookies publicitaires et certains cookies de mesure. Les annonces AdSense ne sont actives qu'apres acceptation.",
  },
  {
    question: 'Faut-il creer un compte pour jouer ?',
    answer:
      "Non, tu peux consulter et jouer a plusieurs quiz sans compte. Un compte peut etre utile si tu veux sauvegarder certains resultats.",
  },
  {
    question: 'Comment demander la suppression de mes donnees ?',
    answer:
      "Tu peux envoyer une demande a usamet142@gmail.com pour toute question liee a tes donnees personnelles ou a leur suppression.",
  },
  {
    question: 'Comment signaler un probleme sur le site ?',
    answer:
      "Envoie simplement un message a usamet142@gmail.com en decrivant le bug, la page concernee et, si possible, une capture d'ecran.",
  },
];

export default function FaqPage() {
  return (
    <Layout
      title="FAQ"
      description="Reponses aux questions frequentes sur Mingquizz, les cookies, les comptes et la publicite."
      noAds
    >
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="card p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            FAQ
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4">Questions frequentes</h1>
          <p className="text-white/55 leading-7 mb-8">
            Cette page repond aux questions les plus courantes sur le fonctionnement de Mingquizz, les
            cookies, la publicite et la gestion des donnees.
          </p>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <section key={faq.question} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <h2 className="text-lg font-bold mb-2">{faq.question}</h2>
                <p className="text-white/60 leading-7">{faq.answer}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
