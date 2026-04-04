// ═══════════════════════════════════════════════════════════════════
// DONNÉES DES QUIZ — 10 QUIZ COMPLETS
// Types: 'personality' (scoring par catégorie) | 'knowledge' (bonnes/mauvaises réponses)
// ═══════════════════════════════════════════════════════════════════

export const CATEGORIES = [
  { id: 'personality', label: 'Personnalité', emoji: '🧠', color: 'from-purple-500 to-pink-500', desc: 'Découvre qui tu es vraiment' },
  { id: 'love',        label: 'Amour',        emoji: '❤️', color: 'from-pink-500 to-red-500',    desc: 'Secrets de tes relations' },
  { id: 'iq',         label: 'Intelligence',  emoji: '💡', color: 'from-yellow-400 to-orange-500', desc: 'Teste ton cerveau' },
  { id: 'culture',    label: 'Pop Culture',   emoji: '🎬', color: 'from-blue-500 to-teal-500',   desc: 'Films, séries, musique' },
  { id: 'fun',        label: 'Fun & WTF',     emoji: '🤪', color: 'from-green-400 to-teal-500',  desc: 'Just for laughs' },
  { id: 'social',     label: 'Jugement',      emoji: '👥', color: 'from-orange-400 to-red-500',  desc: 'Ce que tu révèles' },
];

// ─── QUIZ 1 ────────────────────────────────────────────────────────────────────
const quiz1 = {
  id: 'quel-type-de-personne-es-tu',
  title: 'Quel type de personnalité es-tu vraiment ? (Test ultra-précis)',
  description: 'Répondez honnêtement — les résultats vont vous surprendre.',
  category: 'personality',
  type: 'personality',
  emoji: '🧠',
  gradient: 'from-purple-600 to-pink-600',
  tags: ['personnalité', 'psychologie', 'introspection'],
  viral_hook: 'Seulement 1 personne sur 5 obtient le profil "Visionnaire"',
  estimated_time: '3 min',
  questions: [
    {
      id: 'q1', text: 'Le vendredi soir, tu préfères généralement…',
      answers: [
        { id:'a', text:'Sortir dans un bar animé avec plein de gens', scores:{ E:3 } },
        { id:'b', text:'Soirée netflix tranquille à la maison',         scores:{ I:3 } },
        { id:'c', text:'Dîner intime avec 2-3 amis proches',            scores:{ I:1, E:1 } },
        { id:'d', text:'Découvrir un endroit / activité nouvelle',       scores:{ E:2, O:2 } },
      ]
    },
    {
      id: 'q2', text: 'Face à un problème difficile, tu…',
      answers: [
        { id:'a', text:'Cherches une solution logique étape par étape',  scores:{ T:3 } },
        { id:'b', text:'Fais confiance à ton instinct',                   scores:{ F:2, O:1 } },
        { id:'c', text:'Demandes l\'avis de plusieurs personnes',         scores:{ E:2, F:1 } },
        { id:'d', text:'Crées une carte mentale / brainstorm visuel',     scores:{ O:3 } },
      ]
    },
    {
      id: 'q3', text: 'Quel mot te décrit le mieux ?',
      answers: [
        { id:'a', text:'Ambitieux(se)',   scores:{ T:2, E:1 } },
        { id:'b', text:'Empathique',      scores:{ F:3 } },
        { id:'c', text:'Créatif(ve)',     scores:{ O:3 } },
        { id:'d', text:'Fiable',          scores:{ C:3 } },
      ]
    },
    {
      id: 'q4', text: 'Dans un groupe de travail, tu as tendance à…',
      answers: [
        { id:'a', text:'Prendre les rênes naturellement',          scores:{ E:3, T:1 } },
        { id:'b', text:'Écouter les autres et trouver le consensus', scores:{ F:3, I:1 } },
        { id:'c', text:'Proposer des idées originales',              scores:{ O:3 } },
        { id:'d', text:'T\'assurer que tout est bien organisé',      scores:{ C:3 } },
      ]
    },
    {
      id: 'q5', text: 'Quand quelqu\'un t\'énerve, tu…',
      answers: [
        { id:'a', text:'Le dis clairement et directement',    scores:{ T:2, E:1 } },
        { id:'b', text:'Gardes tout pour toi et rumines',     scores:{ I:2, F:1 } },
        { id:'c', text:'En parles à quelqu\'un d\'autre',     scores:{ F:2, E:1 } },
        { id:'d', text:'Trouves une activité pour décompresser', scores:{ I:2, C:1 } },
      ]
    },
    {
      id: 'q6', text: 'Ton rapport à l\'argent est…',
      answers: [
        { id:'a', text:'J\'adore économiser — la sécurité avant tout',   scores:{ C:3 } },
        { id:'b', text:'Je vis dans le moment — YOLO',                    scores:{ E:2, O:1 } },
        { id:'c', text:'J\'investis stratégiquement',                     scores:{ T:3 } },
        { id:'d', text:'Je dépense pour des expériences et des gens',     scores:{ F:2, E:1 } },
      ]
    },
    {
      id: 'q7', text: 'Dans ta tête, c\'est plutôt…',
      answers: [
        { id:'a', text:'Des idées abstraites et de grands concepts',  scores:{ O:3 } },
        { id:'b', text:'Des checklists et des plans concrets',        scores:{ C:3 } },
        { id:'c', text:'Les émotions et les relations',               scores:{ F:3 } },
        { id:'d', text:'Des analyses et des données',                  scores:{ T:3 } },
      ]
    },
    {
      id: 'q8', text: 'Tu reçois une critique sur ton travail. Ta réaction ?',
      answers: [
        { id:'a', text:'Tu l\'analyses objectivement et tu t\'améliores',   scores:{ T:2, C:1 } },
        { id:'b', text:'Tu te sens un peu blessé(e) mais tu la prends', scores:{ F:2 } },
        { id:'c', text:'Tu demandes des précisions avant de réagir',     scores:{ T:1, I:1 } },
        { id:'d', text:'Tu cherches une façon créative de répondre',     scores:{ O:2 } },
      ]
    },
    {
      id: 'q9', text: 'Ton environnement idéal de travail ?',
      answers: [
        { id:'a', text:'Open space animé, musique, interactions',    scores:{ E:3 } },
        { id:'b', text:'Bureau seul, calme, bien organisé',          scores:{ I:2, C:1 } },
        { id:'c', text:'N\'importe où — je m\'adapte',              scores:{ O:2 } },
        { id:'d', text:'Un espace créatif et inspirant',             scores:{ O:2, F:1 } },
      ]
    },
    {
      id: 'q10', text: 'En vacances, tu choisis…',
      answers: [
        { id:'a', text:'Un pays inconnu à explorer complètement',       scores:{ O:3, E:1 } },
        { id:'b', text:'L\'endroit que tu aimes déjà — retourner au même hôtel', scores:{ C:2, I:1 } },
        { id:'c', text:'Un road trip improvisé sans plan fixe',          scores:{ O:2, E:2 } },
        { id:'d', text:'Un spa / resort pour te ressourcer',             scores:{ I:2, F:1 } },
      ]
    },
    {
      id: 'q11', text: 'Ta plus grande peur ?',
      answers: [
        { id:'a', text:'L\'échec et la honte publique',    scores:{ E:1, T:1 } },
        { id:'b', text:'La solitude et le rejet',          scores:{ F:2, E:1 } },
        { id:'c', text:'Rater ta vie / tes rêves',         scores:{ O:2 } },
        { id:'d', text:'Le chaos et l\'imprévisible',      scores:{ C:3 } },
      ]
    },
    {
      id: 'q12', text: 'Quel super-pouvoir tu voudrais ?',
      answers: [
        { id:'a', text:'Lire dans les esprits',            scores:{ F:2, T:1 } },
        { id:'b', text:'Contrôler le temps',               scores:{ C:2, O:1 } },
        { id:'c', text:'Devenir invisible',                scores:{ I:3 } },
        { id:'d', text:'Voler / être partout à la fois',   scores:{ E:2, O:1 } },
      ]
    },
  ],
  scoring: {
    type: 'dominant',
    profiles: {
      E: {
        label:       '🦋 Le Connecteur',
        description: 'Tu es la vie du groupe ! Tu t\'épanouis dans les interactions sociales, tu charges ta batterie avec les autres et tu brilles naturellement dans n\'importe quelle salle. Ton énergie est contagieuse.',
        strengths:   ['Charisme naturel', 'Communication', 'Leadership', 'Enthousiasme'],
        weakness:    'Tu peux négliger le temps seul qui est pourtant essentiel',
        celebs:      ['Will Smith', 'Beyoncé', 'Barack Obama'],
      },
      I: {
        label:       '🦉 Le Penseur Profond',
        description: 'Tu traites le monde en profondeur. Tu préfères les conversations qui ont du sens aux petits talks. Tu recharges seul et c\'est une force, pas une faiblesse. Les meilleures idées viennent souvent de toi.',
        strengths:   ['Analyse', 'Créativité', 'Concentration', 'Profondeur'],
        weakness:    'Parfois tu peux paraître distant alors que tu es simplement en train de réfléchir',
        celebs:      ['Elon Musk', 'J.K. Rowling', 'Albert Einstein'],
      },
      O: {
        label:       '🚀 Le Visionnaire',
        description: 'Tu vois le monde différemment des autres — et c\'est ton super-pouvoir. Tu es toujours attiré par la nouveauté, les idées abstraites et les défis créatifs. Tu es fait(e) pour inventer le futur.',
        strengths:   ['Créativité', 'Vision long terme', 'Adaptabilité', 'Innovation'],
        weakness:    'Les détails pratiques peuvent parfois t\'échapper',
        celebs:      ['Steve Jobs', 'Lady Gaga', 'Frida Kahlo'],
      },
      F: {
        label:       '💖 L\'Empathique',
        description: 'Tu ressens les émotions comme personne. Tu as un radar émotionnel ultra-sensible qui te permet de comprendre les gens en profondeur. Ta force est dans les relations et la connexion humaine.',
        strengths:   ['Empathie', 'Sens des relations', 'Intuition', 'Bienveillance'],
        weakness:    'Tu absorbes parfois trop les émotions des autres',
        celebs:      ['Oprah Winfrey', 'Dalai Lama', 'Princess Diana'],
      },
      T: {
        label:       '🔬 Le Stratège',
        description: 'Ton cerveau est une machine à résoudre des problèmes. Tu analyses, tu structures, tu optimises. Là où les autres voient le chaos, tu vois des systèmes et des solutions. Un atout redoutable.',
        strengths:   ['Logique', 'Résolution de problèmes', 'Objectivité', 'Stratégie'],
        weakness:    'Tu peux parfois sembler froid(e) alors que tu es simplement en mode "solution"',
        celebs:      ['Sherlock Holmes', 'Mark Zuckerberg', 'Marie Curie'],
      },
      C: {
        label:       '🏆 L\'Architecte',
        description: 'Tu es la personne sur qui tout le monde peut compter. Organisé(e), fiable, méthodique — tu es le pilier silencieux qui fait que les choses se passent vraiment. Les gens te font une confiance absolue.',
        strengths:   ['Organisation', 'Fiabilité', 'Discipline', 'Constance'],
        weakness:    'Le changement imprévu peut te déstabiliser plus que les autres',
        celebs:      ['Angela Merkel', 'Warren Buffett', 'Tim Cook'],
      },
    }
  }
};

// ─── QUIZ 2 ────────────────────────────────────────────────────────────────────
const quiz2 = {
  id: 'test-qi-seulement-2-pourcent',
  title: 'Seulement 2% des gens obtiennent 20/20 à ce test',
  description: 'Le test de culture générale le plus difficile d\'Internet. Oses-tu relever le défi ?',
  category: 'iq',
  type: 'knowledge',
  emoji: '💡',
  gradient: 'from-yellow-500 to-orange-600',
  tags: ['QI', 'culture générale', 'défi'],
  viral_hook: 'Tes amis ne passeront pas les 5 premières questions',
  estimated_time: '5 min',
  questions: [
    {
      id:'q1', text:'Quelle est la capitale de l\'Australie ?',
      answers:[
        {id:'a', text:'Sydney',     correct:false},
        {id:'b', text:'Melbourne',  correct:false},
        {id:'c', text:'Canberra',   correct:true},
        {id:'d', text:'Brisbane',   correct:false},
      ],
      explanation:'Beaucoup pensent que c\'est Sydney, mais Canberra est la capitale depuis 1913 !'
    },
    {
      id:'q2', text:'Combien de cordes possède une guitare classique ?',
      answers:[
        {id:'a', text:'4', correct:false},
        {id:'b', text:'5', correct:false},
        {id:'c', text:'6', correct:true},
        {id:'d', text:'7', correct:false},
      ],
      explanation:'6 cordes : mi, la, ré, sol, si, mi (de la plus grave à la plus aiguë).'
    },
    {
      id:'q3', text:'Qui a peint "La Nuit étoilée" ?',
      answers:[
        {id:'a', text:'Picasso',        correct:false},
        {id:'b', text:'Monet',          correct:false},
        {id:'c', text:'Van Gogh',       correct:true},
        {id:'d', text:'Rembrandt',      correct:false},
      ],
      explanation:'Vincent Van Gogh l\'a peinte en juin 1889, lors de son séjour à l\'asile de Saint-Paul-de-Mausole.'
    },
    {
      id:'q4', text:'Quel élément chimique a pour symbole "Au" ?',
      answers:[
        {id:'a', text:'Argent',  correct:false},
        {id:'b', text:'Or',      correct:true},
        {id:'c', text:'Aluminium', correct:false},
        {id:'d', text:'Azote',   correct:false},
      ],
      explanation:'Au vient du latin "Aurum" — l\'or, métal précieux par excellence.'
    },
    {
      id:'q5', text:'Dans quel pays se trouve la Grande Barrière de Corail ?',
      answers:[
        {id:'a', text:'Philippines',  correct:false},
        {id:'b', text:'Indonésie',    correct:false},
        {id:'c', text:'Australie',    correct:true},
        {id:'d', text:'Brésil',       correct:false},
      ],
      explanation:'Situé dans la mer de Corail, au large du Queensland, c\'est le plus grand récif corallien du monde.'
    },
    {
      id:'q6', text:'Combien de zéros contient un milliard ?',
      answers:[
        {id:'a', text:'6', correct:false},
        {id:'b', text:'7', correct:false},
        {id:'c', text:'9', correct:true},
        {id:'d', text:'12', correct:false},
      ],
      explanation:'1 milliard = 1 000 000 000 — soit neuf zéros.'
    },
    {
      id:'q7', text:'Qui a écrit "Don Quichotte" ?',
      answers:[
        {id:'a', text:'Lope de Vega',     correct:false},
        {id:'b', text:'Miguel de Cervantes', correct:true},
        {id:'c', text:'Tirso de Molina',  correct:false},
        {id:'d', text:'Quevedo',          correct:false},
      ],
      explanation:'Publié en deux parties (1605 et 1615), c\'est l\'un des romans les plus importants de la littérature mondiale.'
    },
    {
      id:'q8', text:'Quel est le plus long fleuve du monde ?',
      answers:[
        {id:'a', text:'Amazone',  correct:false},
        {id:'b', text:'Congo',    correct:false},
        {id:'c', text:'Nil',      correct:true},
        {id:'d', text:'Yangtsé',  correct:false},
      ],
      explanation:'Le Nil mesure environ 6 650 km. Bien que le débat avec l\'Amazone subsiste, le Nil est officiellement reconnu le plus long.'
    },
    {
      id:'q9', text:'Quelle planète est surnommée la "Planète rouge" ?',
      answers:[
        {id:'a', text:'Vénus',   correct:false},
        {id:'b', text:'Jupiter', correct:false},
        {id:'c', text:'Mars',    correct:true},
        {id:'d', text:'Saturne', correct:false},
      ],
      explanation:'Sa couleur rouge est due aux oxydes de fer (rouille) présents à sa surface.'
    },
    {
      id:'q10', text:'En quelle année a eu lieu la Révolution française ?',
      answers:[
        {id:'a', text:'1776', correct:false},
        {id:'b', text:'1789', correct:true},
        {id:'c', text:'1799', correct:false},
        {id:'d', text:'1804', correct:false},
      ],
      explanation:'La Révolution française a débuté en 1789 avec la prise de la Bastille le 14 juillet.'
    },
    {
      id:'q11', text:'Combien de joueurs composent une équipe de basket-ball sur le terrain ?',
      answers:[
        {id:'a', text:'4',  correct:false},
        {id:'b', text:'5',  correct:true},
        {id:'c', text:'6',  correct:false},
        {id:'d', text:'7',  correct:false},
      ],
      explanation:'5 joueurs par équipe = 10 au total sur le terrain.'
    },
    {
      id:'q12', text:'Quel pays a le plus grand territoire du monde ?',
      answers:[
        {id:'a', text:'Canada',       correct:false},
        {id:'b', text:'Chine',        correct:false},
        {id:'c', text:'Russie',       correct:true},
        {id:'d', text:'États-Unis',   correct:false},
      ],
      explanation:'La Russie couvre 17 millions de km², soit deux fois la superficie du Canada (2ème).'
    },
    {
      id:'q13', text:'Quelle est la formule chimique de l\'eau ?',
      answers:[
        {id:'a', text:'HO2',  correct:false},
        {id:'b', text:'H2O',  correct:true},
        {id:'c', text:'H3O',  correct:false},
        {id:'d', text:'OH2',  correct:false},
      ],
      explanation:'Deux atomes d\'hydrogène et un atome d\'oxygène — la molécule la plus essentielle à la vie.'
    },
    {
      id:'q14', text:'Qui a composé la 5ème Symphonie ?',
      answers:[
        {id:'a', text:'Mozart',    correct:false},
        {id:'b', text:'Bach',      correct:false},
        {id:'c', text:'Beethoven', correct:true},
        {id:'d', text:'Chopin',    correct:false},
      ],
      explanation:'La Symphonie n°5 de Beethoven (1808) est l\'une des œuvres les plus connues de toute l\'histoire musicale.'
    },
    {
      id:'q15', text:'Quel animal est le mammifère terrestre le plus rapide ?',
      answers:[
        {id:'a', text:'Lion',      correct:false},
        {id:'b', text:'Guépard',   correct:true},
        {id:'c', text:'Pronghorn', correct:false},
        {id:'d', text:'Lévrier',   correct:false},
      ],
      explanation:'Le guépard peut atteindre 120 km/h sur de courtes distances — le sprint le plus rapide du règne animal.'
    },
  ],
  scoring: {
    type: 'percentage',
    levels: [
      { min:0,   max:33,  label:'🐣 En cours d\'apprentissage', description:'Pas de panique ! Même Einstein a commencé quelque part. La culture générale s\'acquiert avec le temps et la curiosité.' },
      { min:34,  max:59,  label:'📚 Niveau correct',            description:'Tu as de bonnes bases ! Avec un peu de lecture et de curiosité, tu peux facilement passer au niveau supérieur.' },
      { min:60,  max:79,  label:'🎓 Niveau avancé',             description:'Impressionnant ! Tu fais partie des 20% les plus cultivés. Tes amis doivent adorer jouer à des quiz avec toi.' },
      { min:80,  max:95,  label:'🧠 Génie en herbe',            description:'Seulement 5% des gens atteignent ce score. Tu as une mémoire exceptionnelle et une vraie soif de connaissance.' },
      { min:96, max:100, label:'👑 QI hors norme',              description:'SCORE PARFAIT ou quasi-parfait ! Tu fais partie du top 1%. On est officiellement intimidés. 🎉' },
    ]
  }
};

// ─── QUIZ 3 ────────────────────────────────────────────────────────────────────
const quiz3 = {
  id: 'quel-est-ton-style-amoureux',
  title: 'Quel est vraiment ton style amoureux ? (Test psychologique)',
  description: 'Basé sur les 6 styles d\'attachement — découvre comment tu aimes et comment tu es aimé(e).',
  category: 'love',
  type: 'personality',
  emoji: '❤️',
  gradient: 'from-pink-500 to-rose-600',
  tags: ['amour', 'relations', 'psychologie', 'attachement'],
  viral_hook: 'Ce test révèle des vérités que tu ne veux peut-être pas entendre',
  estimated_time: '4 min',
  questions: [
    {
      id:'q1', text:'Au début d\'une relation, tu as tendance à…',
      answers:[
        {id:'a', text:'Tomber vite et fort — tout de suite',               scores:{Passionné:3}},
        {id:'b', text:'Prendre ton temps — construire lentement',          scores:{Sécurisé:2}},
        {id:'c', text:'Te demander si l\'autre ressent la même chose',     scores:{Anxieux:3}},
        {id:'d', text:'Garder une certaine distance au début',             scores:{Évitant:3}},
      ]
    },
    {
      id:'q2', text:'Quand tu n\'as pas de nouvelles pendant une journée, tu…',
      answers:[
        {id:'a', text:'Trouves ça normal — tout le monde a sa vie',    scores:{Sécurisé:3, Évitant:1}},
        {id:'b', text:'Commences à t\'inquiéter un peu',               scores:{Anxieux:2}},
        {id:'c', text:'Envoies 3 messages "juste pour voir"',          scores:{Anxieux:3}},
        {id:'d', text:'Es soulagé(e) d\'avoir de l\'espace',           scores:{Évitant:3}},
      ]
    },
    {
      id:'q3', text:'Exprimer tes sentiments à quelqu\'un, c\'est…',
      answers:[
        {id:'a', text:'Naturel — tu le fais facilement',               scores:{Sécurisé:3}},
        {id:'b', text:'Difficile — tu as peur d\'être trop intense',   scores:{Anxieux:2, Évitant:1}},
        {id:'c', text:'Presque impossible — tu gardes tout en toi',    scores:{Évitant:3}},
        {id:'d', text:'Exaltant — tu le fais de manière intense',      scores:{Passionné:3}},
      ]
    },
    {
      id:'q4', text:'Ton plus grand cauchemar dans une relation ?',
      answers:[
        {id:'a', text:'Être abandonné(e) sans raison',        scores:{Anxieux:3}},
        {id:'b', text:'Perdre ton indépendance',              scores:{Évitant:3}},
        {id:'c', text:'La monotonie et l\'ennui',             scores:{Passionné:2}},
        {id:'d', text:'La trahison ou le mensonge',           scores:{Sécurisé:2}},
      ]
    },
    {
      id:'q5', text:'Pendant une dispute de couple, tu…',
      answers:[
        {id:'a', text:'Parles calmement et cherches une solution',        scores:{Sécurisé:3}},
        {id:'b', text:'T\'emballes et l\'escalade monte vite',            scores:{Anxieux:2, Passionné:1}},
        {id:'c', text:'Te refermes et tu as besoin de temps seul',        scores:{Évitant:3}},
        {id:'d', text:'Fais tout pour que ça se transforme en passion',   scores:{Passionné:2}},
      ]
    },
    {
      id:'q6', text:'Tu es en soirée avec ton/ta partenaire. Il/elle parle longuement avec quelqu\'un d\'attractif. Tu ressens…',
      answers:[
        {id:'a', text:'Rien de particulier — tu lui fais confiance',       scores:{Sécurisé:3}},
        {id:'b', text:'Une légère jalousie mais tu te contrôles',          scores:{Sécurisé:1, Anxieux:1}},
        {id:'c', text:'Une jalousie assez forte que tu essaies de cacher', scores:{Anxieux:3}},
        {id:'d', text:'Tu trouves ça excitant — ça pique ta jalousie',     scores:{Passionné:2}},
      ]
    },
    {
      id:'q7', text:'Quelle phrase résume le mieux ta vision de l\'amour ?',
      answers:[
        {id:'a', text:'"L\'amour, c\'est de la confiance et de la sécurité"',  scores:{Sécurisé:3}},
        {id:'b', text:'"L\'amour, c\'est du feu et de l\'intensité"',          scores:{Passionné:3}},
        {id:'c', text:'"L\'amour fait toujours un peu souffrir"',               scores:{Anxieux:2}},
        {id:'d', text:'"J\'aime, mais j\'ai besoin de ma liberté"',            scores:{Évitant:3}},
      ]
    },
    {
      id:'q8', text:'Combien de fois penses-tu à ta relation dans la journée ?',
      answers:[
        {id:'a', text:'Constamment — c\'est presque obsessionnel',    scores:{Anxieux:3}},
        {id:'b', text:'Souvent — avec tendresse et douceur',          scores:{Sécurisé:2}},
        {id:'c', text:'Quelques fois — tu as d\'autres choses en tête', scores:{Évitant:2}},
        {id:'d', text:'Tout le temps — avec désir et passion',         scores:{Passionné:3}},
      ]
    },
    {
      id:'q9', text:'Après une rupture difficile, tu…',
      answers:[
        {id:'a', text:'Analyses, apprends, et passes à autre chose',   scores:{Sécurisé:3}},
        {id:'b', text:'Restes longtemps à essayer de comprendre',      scores:{Anxieux:2}},
        {id:'c', text:'Te jettes dans le boulot pour oublier',         scores:{Évitant:2}},
        {id:'d', text:'Passes de l\'intensité à un vide total',        scores:{Passionné:2}},
      ]
    },
    {
      id:'q10', text:'L\'intimité émotionnelle avec ton partenaire, c\'est…',
      answers:[
        {id:'a', text:'La base — c\'est ce qui crée le vrai lien',     scores:{Sécurisé:3}},
        {id:'b', text:'Quelque chose que tu désires mais qui te fait peur', scores:{Anxieux:2, Évitant:1}},
        {id:'c', text:'Quelque chose que tu évites sans trop savoir pourquoi', scores:{Évitant:3}},
        {id:'d', text:'Magnifique mais tu veux aussi de la passion physique', scores:{Passionné:2}},
      ]
    },
  ],
  scoring: {
    type: 'dominant',
    profiles: {
      Sécurisé: {
        label:       '🌟 Style Sécurisé',
        description: 'Tu es le Graal des relations ! Tu aimes avec confiance, sans excessive jalousie ni peur d\'abandon. Tu sais communiquer tes besoins et tu es un pilier pour ton partenaire. Environ 55% des gens ont ce style.',
        strengths:   ['Confiance', 'Communication', 'Stabilité émotionnelle', 'Adaptabilité'],
        advice:      'Continue comme ça — tu mérites quelqu\'un qui corresponde à ton niveau émotionnel.',
      },
      Anxieux: {
        label:       '🌊 Style Anxieux',
        description: 'Tu aimes intensément et profondément — parfois trop. Tu as tendance à chercher des confirmations et à craindre l\'abandon. Cette hypersensibilité vient souvent de l\'enfance et peut se travailler.',
        strengths:   ['Passion', 'Dévouement', 'Empathie profonde', 'Intensité émotionnelle'],
        advice:      'Apprends à te rassurer toi-même avant de chercher la validation chez l\'autre.',
      },
      Évitant: {
        label:       '🦔 Style Évitant',
        description: 'Tu aimes profondément mais tu as du mal à le montrer. L\'intimité te fait un peu peur, et tu valorises ton indépendance par-dessus tout. Ce n\'est pas un défaut — c\'est une façon d\'être à apprivoiser.',
        strengths:   ['Indépendance', 'Autonomie', 'Force intérieure', 'Discernement'],
        advice:      'Essaie de t\'ouvrir progressivement — la vraie vulnérabilité est une force.',
      },
      Passionné: {
        label:       '🔥 Style Passionné',
        description: 'Pour toi, l\'amour c\'est de l\'électricité et de l\'intensité. Tu vis les relations de manière très intense — les hauts sont au sommet, les bas peuvent être douloureux. Tu cherches quelqu\'un qui peut suivre ton rythme.',
        strengths:   ['Intensité', 'Passion', 'Désir', 'Vivacité'],
        advice:      'Assure-toi que l\'intensité ne remplace pas la stabilité à long terme.',
      },
    }
  }
};

// ─── QUIZ 4 ────────────────────────────────────────────────────────────────────
const quiz4 = {
  id: 'ce-que-tes-choix-disent-de-toi',
  title: 'Ce que tes choix révèlent sur ta vraie personnalité',
  description: 'Des situations ordinaires, des choix révélateurs. Prêt(e) à découvrir ce que tu caches vraiment ?',
  category: 'social',
  type: 'personality',
  emoji: '👁️',
  gradient: 'from-slate-700 to-purple-700',
  tags: ['psychologie', 'comportement', 'révélation', 'caractère'],
  viral_hook: 'Ces choix banaux en disent plus sur toi que n\'importe quel test psy',
  estimated_time: '3 min',
  questions: [
    {
      id:'q1', text:'Tu arrives en avance à un rendez-vous. Que fais-tu ?',
      answers:[
        {id:'a', text:'Tu attends en regardant ton téléphone',                scores:{Adaptable:2}},
        {id:'b', text:'Tu observes les gens autour de toi',                   scores:{Curieux:3}},
        {id:'c', text:'Tu prépares mentalement la conversation à venir',      scores:{Stratège:3}},
        {id:'d', text:'Tu fais une courte promenade pour te détendre',        scores:{Zen:3}},
      ]
    },
    {
      id:'q2', text:'Au restaurant, quand le menu arrive…',
      answers:[
        {id:'a', text:'Tu choisis la même chose que d\'habitude',             scores:{Fidèle:3}},
        {id:'b', text:'Tu demandes conseil au serveur',                       scores:{Social:2}},
        {id:'c', text:'Tu prends ce qui te fait le plus envie sans hésiter',  scores:{Impulsif:2, Confiant:1}},
        {id:'d', text:'Tu lis tout le menu très attentivement',               scores:{Stratège:2, Curieux:1}},
      ]
    },
    {
      id:'q3', text:'Tu reçois un email d\'un inconnu qui propose une opportunité "extraordinaire". Tu…',
      answers:[
        {id:'a', text:'Supprimes immédiatement — c\'est une arnaque',   scores:{Prudent:3}},
        {id:'b', text:'Cherches les infos sur la personne avant',        scores:{Stratège:3}},
        {id:'c', text:'Répondras peut-être — on ne sait jamais',         scores:{Optimiste:2}},
        {id:'d', text:'Transmets à quelqu\'un de plus expérimenté',     scores:{Adaptable:2}},
      ]
    },
    {
      id:'q4', text:'Tu vois quelqu\'un tomber dans la rue. Ta première réaction ?',
      answers:[
        {id:'a', text:'Tu cours l\'aider sans réfléchir',                    scores:{Altruiste:3}},
        {id:'b', text:'Tu regardes d\'abord si quelqu\'un d\'autre aide',   scores:{Adaptable:2}},
        {id:'c', text:'Tu vas l\'aider après avoir évalué la situation',     scores:{Stratège:1, Altruiste:1}},
        {id:'d', text:'Tu t\'arrêtes et demandes si ça va',                 scores:{Altruiste:2, Social:1}},
      ]
    },
    {
      id:'q5', text:'Quelqu\'un te donne un compliment inattendu. Tu…',
      answers:[
        {id:'a', text:'Rougis et minimises "Oh, c\'est rien"',           scores:{Modeste:3}},
        {id:'b', text:'Remercies sincèrement et c\'est tout',            scores:{Confiant:2}},
        {id:'c', text:'Cherches s\'il y a une arrière-pensée',           scores:{Stratège:2, Prudent:1}},
        {id:'d', text:'Le retournes en compliment pour l\'autre',        scores:{Social:3}},
      ]
    },
    {
      id:'q6', text:'Tu as une grosse décision à prendre. Tu…',
      answers:[
        {id:'a', text:'Fais une liste avantages/inconvénients',          scores:{Stratège:3}},
        {id:'b', text:'En parles à tes proches',                         scores:{Social:3}},
        {id:'c', text:'Suis ton instinct, point final',                  scores:{Impulsif:2, Confiant:1}},
        {id:'d', text:'Dors dessus avant de décider',                   scores:{Zen:2, Prudent:1}},
      ]
    },
    {
      id:'q7', text:'Quelqu\'un est en retard à votre RDV. Après 15 min, tu…',
      answers:[
        {id:'a', text:'Envoies un message neutre "Tu es en chemin ?"',  scores:{Zen:2, Social:1}},
        {id:'b', text:'Es agacé(e) mais tu patientes encore',           scores:{Fidèle:2}},
        {id:'c', text:'Pars — ton temps est précieux',                   scores:{Confiant:2, Impulsif:1}},
        {id:'d', text:'Commandes un café et profites du moment seul',   scores:{Zen:3}},
      ]
    },
    {
      id:'q8', text:'Un ami te confie un secret. Quelques jours après, l\'info pourrait aider quelqu\'un d\'autre. Tu…',
      answers:[
        {id:'a', text:'Gardes le secret absolument — c\'est sacré',         scores:{Fidèle:3}},
        {id:'b', text:'Demandes d\'abord la permission à ton ami',          scores:{Social:2, Fidèle:1}},
        {id:'c', text:'Donnes l\'info de manière anonyme si c\'est urgent', scores:{Altruiste:2, Stratège:1}},
        {id:'d', text:'Ça dépend de la gravité de la situation',            scores:{Adaptable:3}},
      ]
    },
    {
      id:'q9', text:'Dans une réunion ennuyeuse, tu…',
      answers:[
        {id:'a', text:'Prends des notes pour rester concentré(e)',       scores:{Stratège:2}},
        {id:'b', text:'Griffonnes ou dessines sans t\'en rendre compte', scores:{Curieux:2}},
        {id:'c', text:'Vérifies tes messages discrètement',              scores:{Impulsif:2}},
        {id:'d', text:'Penses à autre chose mais restes attentif en surface', scores:{Adaptable:3}},
      ]
    },
    {
      id:'q10', text:'Tu as le choix entre deux vacances : expédition en jungle vs resort luxueux. Tu choisis…',
      answers:[
        {id:'a', text:'Expédition — l\'aventure d\'abord !',              scores:{Curieux:3, Impulsif:1}},
        {id:'b', text:'Resort — le confort et la détente',               scores:{Zen:2, Fidèle:1}},
        {id:'c', text:'Resort mais avec quelques excursions',            scores:{Adaptable:3}},
        {id:'d', text:'Tu negocies les deux dans le même voyage',        scores:{Stratège:3}},
      ]
    },
  ],
  scoring: {
    type: 'dominant',
    profiles: {
      Stratège: {
        label:       '♟️ Le Stratège Silencieux',
        description: 'Tu calcules, tu anticipes, tu optimises. Tes choix semblent spontanés mais ils sont en réalité le fruit d\'une réflexion rapide et précise. Tu es le genre de personne qui gagne aux échecs de la vie.',
        strengths:   ['Planification', 'Analyse', 'Anticipation', 'Maîtrise de soi'],
      },
      Altruiste: {
        label:       '🤝 L\'Altruiste Naturel',
        description: 'Tes choix révèlent une générosité profonde et sincère. Tu as ce don rare de mettre les autres en priorité sans même y réfléchir. Les gens se sentent bien en ta présence — et ce n\'est pas un hasard.',
        strengths:   ['Générosité', 'Bienveillance', 'Empathie', 'Sens du service'],
      },
      Curieux: {
        label:       '🔍 L\'Explorateur Curieux',
        description: 'Tu fonces vers ce qui est inconnu, différent, nouveau. Là où d\'autres voient le risque, tu vois l\'opportunité. Ta curiosité naturelle t\'a probablement mené à des endroits et des expériences que peu de gens vivent.',
        strengths:   ['Ouverture d\'esprit', 'Adaptabilité', 'Créativité', 'Apprentissage continu'],
      },
      Zen: {
        label:       '☮️ Le Sage Zen',
        description: 'Tu as une sérénité intérieure que beaucoup t\'envient. Face aux situations stressantes, tu trouves naturellement l\'équilibre. Tu n\'es pas passif — tu choisis simplement tes batailles avec sagesse.',
        strengths:   ['Calme', 'Équilibre', 'Perspective', 'Résilience'],
      },
      Social: {
        label:       '🌟 Le Connecteur Social',
        description: 'Tes choix reflètent une intelligence sociale hors du commun. Tu sais instinctivement comment créer des ponts entre les gens, désamorcer les tensions et faire que tout le monde se sente inclus.',
        strengths:   ['Intelligence sociale', 'Communication', 'Diplomatie', 'Charisme'],
      },
      Fidèle: {
        label:       '🏛️ La Roche Solide',
        description: 'Fiabilité, constance, loyauté — ce sont tes valeurs fondamentales. Les gens qui te connaissent vraiment savent qu\'ils peuvent compter sur toi en toute circonstance. C\'est une qualité rare et précieuse.',
        strengths:   ['Fiabilité', 'Loyauté', 'Intégrité', 'Constance'],
      },
      Adaptable: {
        label:       '🌊 L\'Adaptateur Fluide',
        description: 'Tu as une flexibilité mentale et émotionnelle remarquable. Tu n\'es pas indécis(e) — tu es ouvert(e) à toutes les options. Cette adaptabilité est une force énorme dans un monde qui change vite.',
        strengths:   ['Flexibilité', 'Polyvalence', 'Équilibre', 'Ouverture'],
      },
    }
  }
};

// ─── QUIZ 5 ────────────────────────────────────────────────────────────────────
const quiz5 = {
  id: 'quel-age-mental-as-tu',
  title: 'Ton âge mental n\'est pas ton âge réel — le test qui ne ment pas',
  description: 'Certains ont 30 ans et l\'âme d\'un enfant de 8 ans. D\'autres ont 20 ans et la sagesse de 70. Et toi ?',
  category: 'fun',
  type: 'personality',
  emoji: '🎂',
  gradient: 'from-teal-500 to-green-500',
  tags: ['âge mental', 'fun', 'personnalité', 'générations'],
  viral_hook: 'Ton entourage ne devinera jamais ton résultat',
  estimated_time: '3 min',
  questions: [
    {
      id:'q1', text:'À quelle heure tu te couches généralement ?',
      answers:[
        {id:'a', text:'Avant 22h — j\'ai besoin de mon sommeil',         scores:{Sage:3}},
        {id:'b', text:'Entre 22h et minuit',                             scores:{Adulte:2}},
        {id:'c', text:'Après minuit — la nuit est jeune',                scores:{Jeune:2}},
        {id:'d', text:'Je n\'ai pas vraiment d\'heure fixe',             scores:{Enfant:2}},
      ]
    },
    {
      id:'q2', text:'Quand quelqu\'un t\'énerve vraiment, tu…',
      answers:[
        {id:'a', text:'Prends du recul et attends de te calmer',         scores:{Sage:3}},
        {id:'b', text:'Lui dis calmement ce qui ne va pas',              scores:{Adulte:2}},
        {id:'c', text:'Exprimes ta frustration au moment même',          scores:{Jeune:2}},
        {id:'d', text:'Fais la tête ou disparais sans explications',     scores:{Enfant:3}},
      ]
    },
    {
      id:'q3', text:'Ta façon de gérer le ménage ?',
      answers:[
        {id:'a', text:'Programme régulier — je déteste le désordre',     scores:{Sage:2, Adulte:1}},
        {id:'b', text:'Je nettoie quand c\'est nécessaire',              scores:{Adulte:2}},
        {id:'c', text:'Je range en rafale quand des gens viennent',      scores:{Jeune:2}},
        {id:'d', text:'Le désordre est mon espace naturel',              scores:{Enfant:3}},
      ]
    },
    {
      id:'q4', text:'Un ami t\'appelle pour te dire qu\'il a besoin d\'aide. C\'est dans 30 min. Tu…',
      answers:[
        {id:'a', text:'Y vas immédiatement — les amis avant tout',       scores:{Jeune:2, Adulte:1}},
        {id:'b', text:'Demandes si c\'est vraiment urgent avant',        scores:{Sage:2}},
        {id:'c', text:'Y vas mais tu râles un peu',                      scores:{Adulte:2}},
        {id:'d', text:'Trouves une excuse — t\'as autre chose à faire',  scores:{Enfant:1}},
      ]
    },
    {
      id:'q5', text:'Tu reçois un cadeau inattendu que tu n\'aimes pas. Tu…',
      answers:[
        {id:'a', text:'Souris et remercies chaleureusement — c\'est l\'intention qui compte', scores:{Sage:3}},
        {id:'b', text:'Remercies poliment sans mentir',                  scores:{Adulte:2}},
        {id:'c', text:'Fais semblant d\'aimer avec un sourire forcé',   scores:{Jeune:2}},
        {id:'d', text:'Laisses voir ta déception',                       scores:{Enfant:2}},
      ]
    },
    {
      id:'q6', text:'Ton rapport aux films/séries ?',
      answers:[
        {id:'a', text:'J\'adore les documentaires et les drames profonds', scores:{Sage:3}},
        {id:'b', text:'Un bon mélange de tout selon l\'humeur',            scores:{Adulte:2}},
        {id:'c', text:'Action, comédie, horreur — plus c\'est intense mieux c\'est', scores:{Jeune:2}},
        {id:'d', text:'Dessins animés, films comiques — je me lasse vite', scores:{Enfant:3}},
      ]
    },
    {
      id:'q7', text:'Ton compte en banque ressemble à…',
      answers:[
        {id:'a', text:'Épargne bien organisée + investissements',         scores:{Sage:3}},
        {id:'b', text:'Pas parfait mais les factures sont payées',        scores:{Adulte:2}},
        {id:'c', text:'Fin de mois difficile mais ça passe',              scores:{Jeune:2}},
        {id:'d', text:'Un mystère que je préfère ne pas regarder',        scores:{Enfant:3}},
      ]
    },
    {
      id:'q8', text:'Quand tu es malade, tu…',
      answers:[
        {id:'a', text:'Gères seul(e) — tu connais ton corps',             scores:{Sage:2, Adulte:1}},
        {id:'b', text:'Vas chez le médecin si nécessaire',                scores:{Adulte:2}},
        {id:'c', text:'Cherches les symptômes sur Google',               scores:{Jeune:2}},
        {id:'d', text:'Veux que quelqu\'un s\'occupe de toi',            scores:{Enfant:3}},
      ]
    },
    {
      id:'q9', text:'Les réseaux sociaux, pour toi c\'est…',
      answers:[
        {id:'a', text:'Utile mais tu gardes une distance critique',       scores:{Sage:3}},
        {id:'b', text:'Sympa pour rester en contact mais tu modères',    scores:{Adulte:2}},
        {id:'c', text:'Indispensable — tu postes régulièrement',         scores:{Jeune:2}},
        {id:'d', text:'Une addiction que tu assumes totalement',          scores:{Enfant:2}},
      ]
    },
    {
      id:'q10', text:'Quelqu\'un pense différemment de toi sur un sujet important. Tu…',
      answers:[
        {id:'a', text:'L\'écoutes vraiment — peut-être qu\'il a raison',  scores:{Sage:3}},
        {id:'b', text:'Défends ton point de vue respectueusement',        scores:{Adulte:2}},
        {id:'c', text:'Argumentes avec passion — tu as raison tu le sais', scores:{Jeune:2}},
        {id:'d', text:'C\'est agaçant — tu n\'aimes pas qu\'on soit pas d\'accord avec toi', scores:{Enfant:2}},
      ]
    },
  ],
  scoring: {
    type: 'dominant',
    profiles: {
      Sage: {
        label:       '🦉 Âme de 65 ans',
        description: 'Tu as la sagesse d\'un grand-parent bienveillant dans un corps plus jeune. Tu vois loin, tu comprends les gens, et tu gères les situations avec une maturité qui impressionne. Les gens viennent naturellement chercher tes conseils.',
      },
      Adulte: {
        label:       '👔 Âme de 35 ans',
        description: 'Tu as trouvé un équilibre sain entre responsabilités et plaisir. Tu es mature sans être vieux/vieille, fun sans être immature. Cet équilibre est rare et précieux — beaucoup l\'envient.',
      },
      Jeune: {
        label:       '🎸 Âme de 20 ans',
        description: 'Tu vis avec intensité, passion et fougue. Tu n\'as pas encore la sagesse de l\'expérience mais tu as quelque chose de plus rare : l\'énergie de croire que tout est possible. Garde ça précieusement.',
      },
      Enfant: {
        label:       '🎠 Âme de 8 ans',
        description: 'Tu gardes une légèreté et une spontanéité enfantine qui font ta charme unique. Tu vis dans le présent, tu t\'émerveilles des petites choses, et tu fais rire les gens naturellement. Le monde a besoin de toi.',
      },
    }
  }
};

// ─── QUIZ 6 ────────────────────────────────────────────────────────────────────
const quiz6 = {
  id: 'pop-culture-2024-challenge',
  title: 'Pop Culture Challenge — Peux-tu tout reconnaître ?',
  description: 'Films, séries, musique, mèmes... Ce test sépare les vrais culturo des imposteurs.',
  category: 'culture',
  type: 'knowledge',
  emoji: '🎬',
  gradient: 'from-blue-600 to-indigo-600',
  tags: ['pop culture', 'cinéma', 'musique', 'séries'],
  viral_hook: 'La plupart des gens bloquent à la question 7',
  estimated_time: '4 min',
  questions: [
    {
      id:'q1', text:'Dans quelle série retrouve-t-on la famille Dutton et le ranch Yellowstone ?',
      answers:[
        {id:'a', text:'Succession',   correct:false},
        {id:'b', text:'Yellowstone',  correct:true},
        {id:'c', text:'1883',         correct:false},
        {id:'d', text:'Outer Range', correct:false},
      ]
    },
    {
      id:'q2', text:'Quel chanteur a sorti l\'album "Midnights" en 2022 ?',
      answers:[
        {id:'a', text:'Ariana Grande',  correct:false},
        {id:'b', text:'Billie Eilish',  correct:false},
        {id:'c', text:'Taylor Swift',   correct:true},
        {id:'d', text:'Dua Lipa',       correct:false},
      ]
    },
    {
      id:'q3', text:'Dans "Squid Game", quel jeu est joué en premier ?',
      answers:[
        {id:'a', text:'1, 2, 3 Soleil',  correct:true},
        {id:'b', text:'Le Jeu du foulard', correct:false},
        {id:'c', text:'La Bille',         correct:false},
        {id:'d', text:'Le Dalgona',       correct:false},
      ]
    },
    {
      id:'q4', text:'Qui joue le rôle de Barbie dans le film de 2023 ?',
      answers:[
        {id:'a', text:'Scarlett Johansson', correct:false},
        {id:'b', text:'Emma Stone',         correct:false},
        {id:'c', text:'Margot Robbie',      correct:true},
        {id:'d', text:'Florence Pugh',      correct:false},
      ]
    },
    {
      id:'q5', text:'"Bad Bunny" est originaire de quel pays ?',
      answers:[
        {id:'a', text:'Mexique',       correct:false},
        {id:'b', text:'Colombie',      correct:false},
        {id:'c', text:'Porto Rico',    correct:true},
        {id:'d', text:'République Dominicaine', correct:false},
      ]
    },
    {
      id:'q6', text:'Dans "The Last of Us", quel acteur joue Joel ?',
      answers:[
        {id:'a', text:'Pedro Pascal',   correct:true},
        {id:'b', text:'Oscar Isaac',    correct:false},
        {id:'c', text:'Nicolas Cage',   correct:false},
        {id:'d', text:'Jon Hamm',       correct:false},
      ]
    },
    {
      id:'q7', text:'"Oppenheimer" de Christopher Nolan est sorti la même semaine que quel autre film en 2023 ?',
      answers:[
        {id:'a', text:'Mission Impossible',  correct:false},
        {id:'b', text:'Barbie',              correct:true},
        {id:'c', text:'Indiana Jones',       correct:false},
        {id:'d', text:'Fast X',              correct:false},
      ]
    },
    {
      id:'q8', text:'Quel groupe de K-pop est composé de RM, Jin, Suga, J-Hope, Jimin, V et Jungkook ?',
      answers:[
        {id:'a', text:'BLACKPINK', correct:false},
        {id:'b', text:'EXO',       correct:false},
        {id:'c', text:'BTS',       correct:true},
        {id:'d', text:'Stray Kids',correct:false},
      ]
    },
    {
      id:'q9', text:'Quel film a remporté l\'Oscar du meilleur film en 2023 ?',
      answers:[
        {id:'a', text:'Tár',                  correct:false},
        {id:'b', text:'Everything Everywhere All at Once', correct:true},
        {id:'c', text:'The Banshees of Inisherin', correct:false},
        {id:'d', text:'Avatar 2',              correct:false},
      ]
    },
    {
      id:'q10', text:'"Wednesday" sur Netflix met en scène quel personnage iconique ?',
      answers:[
        {id:'a', text:'Lydia Deetz',         correct:false},
        {id:'b', text:'Wednesday Addams',    correct:true},
        {id:'c', text:'Sabrina Spellman',    correct:false},
        {id:'d', text:'Morticia Addams',     correct:false},
      ]
    },
    {
      id:'q11', text:'Drake et Kendrick Lamar ont eu un beef musical en 2024. Qui a sorti "Not Like Us" ?',
      answers:[
        {id:'a', text:'Drake',              correct:false},
        {id:'b', text:'Kendrick Lamar',     correct:true},
        {id:'c', text:'J. Cole',            correct:false},
        {id:'d', text:'Travis Scott',       correct:false},
      ]
    },
    {
      id:'q12', text:'Dans quelle ville se déroule la série "Emily in Paris" ?',
      answers:[
        {id:'a', text:'Milan',   correct:false},
        {id:'b', text:'Londres', correct:false},
        {id:'c', text:'Paris',   correct:true},
        {id:'d', text:'Rome',    correct:false},
      ]
    },
  ],
  scoring: {
    type: 'percentage',
    levels: [
      { min:0,  max:30,  label:'📱 Tu n\'es pas trop branché pop culture', description:'Ce n\'est pas un défaut ! Tu vis peut-être dans le monde réel plutôt que dans les séries et les tendances. Un peu d\'exploration de contenu s\'impose.' },
      { min:31, max:60,  label:'📺 Niveau correct — tu suis les grandes tendances', description:'Tu es au courant des grosses sorties et des trends majeurs. Bon niveau général pour briller en soirée !' },
      { min:61, max:85,  label:'🎬 Culture pop solide — chapeau !', description:'Tu maîtrises parfaitement la pop culture contemporaine. Tu peux débattre de n\'importe quel film, série ou artiste dans une conversation.' },
      { min:86, max:100, label:'👑 Pop Culture Encyclopédie vivante', description:'IMPRESSIONNANT. Tu es une référence absolue en culture pop. Ton entourage doit te poser des questions en permanence. Netflix devrait t\'employer.' },
    ]
  }
};

// ─── QUIZ 7 ────────────────────────────────────────────────────────────────────
const quiz7 = {
  id: 'es-tu-introverti-extraverti',
  title: 'Es-tu introverti(e), extraverti(e) ou quelque chose de plus complexe ?',
  description: 'La réponse n\'est peut-être pas celle que tu crois. Les psychologues ont découvert une 3ème catégorie.',
  category: 'personality',
  type: 'personality',
  emoji: '🌗',
  gradient: 'from-indigo-600 to-cyan-600',
  tags: ['introverti', 'extraverti', 'ambivert', 'psychologie'],
  viral_hook: '70% des gens se trompent de catégorie — sont-ils vraiment introvertis ou extrovertis ?',
  estimated_time: '3 min',
  questions: [
    {
      id:'q1', text:'Après une longue journée sociale, tu te sens…',
      answers:[
        {id:'a', text:'Énergisé(e) — les interactions me rechargent',      scores:{E:3}},
        {id:'b', text:'Épuisé(e) — j\'ai besoin de temps seul',           scores:{I:3}},
        {id:'c', text:'Ça dépend vraiment des gens et du contexte',       scores:{A:3}},
        {id:'d', text:'En général bien mais avec besoin de décompression', scores:{A:2}},
      ]
    },
    {
      id:'q2', text:'Dans une conversation de groupe, tu as tendance à…',
      answers:[
        {id:'a', text:'Parler beaucoup et animer la discussion',           scores:{E:3}},
        {id:'b', text:'Écouter plus que parler',                          scores:{I:3}},
        {id:'c', text:'Intervenir quand tu as quelque chose d\'important', scores:{A:2, I:1}},
        {id:'d', text:'Alterner selon l\'énergie du groupe',              scores:{A:3}},
      ]
    },
    {
      id:'q3', text:'Ton week-end idéal ?',
      answers:[
        {id:'a', text:'Plein d\'activités avec du monde',                 scores:{E:3}},
        {id:'b', text:'Seul(e) avec un bon livre ou un projet perso',     scores:{I:3}},
        {id:'c', text:'Un mix : sortie le samedi + tranquillité dimanche', scores:{A:3}},
        {id:'d', text:'Avec 1-2 proches uniquement — ni trop ni trop peu', scores:{A:2, I:1}},
      ]
    },
    {
      id:'q4', text:'Tu arrives à une fête où tu ne connais pas grand monde. Tu…',
      answers:[
        {id:'a', text:'Adorerais ça — occasion de rencontres',             scores:{E:3}},
        {id:'b', text:'Resterais collé(e) aux quelques gens que tu connais', scores:{I:2}},
        {id:'c', text:'Serais un peu anxieux mais tu t\'en sortirais bien', scores:{A:2}},
        {id:'d', text:'Resterais un peu avant de trouver une excuse pour partir', scores:{I:3}},
      ]
    },
    {
      id:'q5', text:'Pour résoudre un problème, tu préfères…',
      answers:[
        {id:'a', text:'En parler avec d\'autres — les idées viennent en échangeant', scores:{E:2}},
        {id:'b', text:'Y réfléchir seul(e) longuement puis agir',         scores:{I:3}},
        {id:'c', text:'Réfléchir d\'abord seul puis valider avec les autres', scores:{A:3}},
        {id:'d', text:'Dépend de la nature du problème',                   scores:{A:2}},
      ]
    },
    {
      id:'q6', text:'Les silences dans une conversation, tu trouves ça…',
      answers:[
        {id:'a', text:'Gênant — tu combles naturellement le vide',        scores:{E:3}},
        {id:'b', text:'Confortable — pas besoin de remplir',              scores:{I:3}},
        {id:'c', text:'Dépend du contexte et de la personne',             scores:{A:3}},
        {id:'d', text:'Un peu inconfortable mais tu le gères',            scores:{A:1, E:1}},
      ]
    },
    {
      id:'q7', text:'Comment tu prends tes décisions importantes ?',
      answers:[
        {id:'a', text:'En en parlant à plein de gens pour avoir des avis', scores:{E:2}},
        {id:'b', text:'Seul(e) — c\'est une décision intime',             scores:{I:3}},
        {id:'c', text:'Avec 1-2 personnes de confiance seulement',        scores:{A:2, I:1}},
        {id:'d', text:'Tu réfléchis d\'abord puis tu valides avec d\'autres', scores:{A:2}},
      ]
    },
    {
      id:'q8', text:'Combien d\'amis proches est-ce que tu as (vraiment proches) ?',
      answers:[
        {id:'a', text:'Beaucoup — tu t\'entends bien avec énormément de monde', scores:{E:3}},
        {id:'b', text:'1 ou 2 — c\'est suffisant',                        scores:{I:3}},
        {id:'c', text:'3 à 5 — qualité plutôt que quantité',              scores:{A:2, I:1}},
        {id:'d', text:'Ça varie — tu as des cercles différents',          scores:{A:2, E:1}},
      ]
    },
  ],
  scoring: {
    type: 'dominant',
    profiles: {
      E: {
        label:       '🦁 Extraverti(e) pur(e)',
        description: 'Tu es clairement extraverti(e) — et tu le sais probablement déjà. Les autres sont ta source d\'énergie, d\'inspiration et de joie. Tu penses souvent en parlant, et les interactions sociales ne te coûtent rien. Le silence prolongé te pèse mais c\'est normal — tu es fait(e) pour te connecter.',
        percentage:  '30%',
        celebrities: ['Will Smith', 'Oprah', 'Jim Carrey'],
      },
      I: {
        label:       '🦔 Introverti(e) profond(e)',
        description: 'Tu es un introverti(e) authentique — et c\'est une vraie force. Ton monde intérieur est riche et profond. Tu préfères quelques relations profondes à beaucoup de relations superficielles. Tu recharges seul(e) et c\'est absolument correct. Les gens les plus créatifs et les plus brillants sont souvent introvertis.',
        percentage:  '30%',
        celebrities: ['Einstein', 'J.K. Rowling', 'Elon Musk'],
      },
      A: {
        label:       '🌊 Ambivert — La catégorie rare',
        description: 'Tu fais partie des 40% d\'ambiverts — des personnes qui ne sont ni vraiment introvertis ni vraiment extravertis. Tu t\'adaptes naturellement aux contextes, tu peux être la vie de la fête puis avoir besoin de solitude le lendemain. C\'est en réalité la combinaison la plus flexible et la plus puissante.',
        percentage:  '40%',
        celebrities: ['Barack Obama', 'Emma Watson', 'Bill Gates'],
      },
    }
  }
};

// ─── QUIZ 8 ────────────────────────────────────────────────────────────────────
const quiz8 = {
  id: 'quel-type-de-lover-es-tu',
  title: 'Quel type de lover es-tu vraiment ? (Test pour adultes 18+)',
  description: 'Romantique inconditionnel, séducteur naturel, libre électron ou âme sœur-seeker — lequel es-tu ?',
  category: 'love',
  type: 'personality',
  emoji: '💋',
  gradient: 'from-rose-600 to-pink-700',
  tags: ['relations', 'séduction', 'amour', 'romantisme'],
  viral_hook: 'Les vrais romantiques font souvent partie de la catégorie la moins commune',
  estimated_time: '4 min',
  questions: [
    {
      id:'q1', text:'Pour toi, la séduction c\'est…',
      answers:[
        {id:'a', text:'Un art subtil — les regards, les sous-entendus, les silences',    scores:{Mystère:3}},
        {id:'b', text:'Être authentique — montrer qui tu es vraiment',                    scores:{Romantique:2, Libre:1}},
        {id:'c', text:'Du fun et de la légèreté — pas besoin de compliquer',              scores:{Libre:3}},
        {id:'d', text:'Une connexion profonde qui se construit progressivement',           scores:{Romantique:3}},
      ]
    },
    {
      id:'q2', text:'Le premier rendez-vous idéal pour toi ?',
      answers:[
        {id:'a', text:'Un endroit original et insolite — mémorable avant tout',      scores:{Libre:2, Mystère:1}},
        {id:'b', text:'Dîner romantique aux chandelles',                              scores:{Romantique:3}},
        {id:'c', text:'Activité fun — bowling, escape game, karting',                 scores:{Libre:3}},
        {id:'d', text:'Promenade tranquille pour apprendre à se connaître vraiment',  scores:{Romantique:2, Mystère:1}},
      ]
    },
    {
      id:'q3', text:'Comment tu exprimes tes sentiments ?',
      answers:[
        {id:'a', text:'Par des gestes et des actes plutôt que des mots',     scores:{Mystère:2, Romantique:1}},
        {id:'b', text:'Directement et verbalement — tu dis ce que tu ressens', scores:{Romantique:2}},
        {id:'c', text:'De manière ludique et légère',                          scores:{Libre:2}},
        {id:'d', text:'Par des petites attentions et des surprises',           scores:{Romantique:3}},
      ]
    },
    {
      id:'q4', text:'Ton rapport à la jalousie en couple ?',
      answers:[
        {id:'a', text:'Tu n\'es pas jaloux(se) — tu fais confiance totalement',    scores:{Libre:3}},
        {id:'b', text:'Un peu de jalousie est signe d\'amour',                     scores:{Romantique:2}},
        {id:'c', text:'Tu la gères discrètement mais elle est là',               scores:{Mystère:2}},
        {id:'d', text:'Tu n\'aimes pas la jalousie — elle nourrit l\'insécurité', scores:{Libre:2, Romantique:1}},
      ]
    },
    {
      id:'q5', text:'La phrase qui te correspond le mieux en amour ?',
      answers:[
        {id:'a', text:'"L\'amour c\'est des petits moments qui durent toute une vie"',  scores:{Romantique:3}},
        {id:'b', text:'"L\'amour ne devrait pas rimer avec possession"',                 scores:{Libre:3}},
        {id:'c', text:'"Ce qu\'on ne dit pas est parfois plus puissant que ce qu\'on dit"', scores:{Mystère:3}},
        {id:'d', text:'"L\'amour c\'est d\'abord s\'amuser ensemble"',                  scores:{Libre:2}},
      ]
    },
    {
      id:'q6', text:'Ton partenaire idéal est quelqu\'un…',
      answers:[
        {id:'a', text:'Qui te comprend sans que tu aies besoin d\'expliquer',     scores:{Mystère:3}},
        {id:'b', text:'Qui partage tes valeurs et tes projets de vie',            scores:{Romantique:3}},
        {id:'c', text:'Qui te laisse ton espace et ta liberté',                   scores:{Libre:3}},
        {id:'d', text:'Qui te fait rire et avec qui tout est facile',             scores:{Libre:2, Romantique:1}},
      ]
    },
    {
      id:'q7', text:'Tu vis une relation à distance temporaire. Comment tu la gères ?',
      answers:[
        {id:'a', text:'Lettres, surprises envoyées par courrier, appels vidéo câlins', scores:{Romantique:3}},
        {id:'b', text:'Tu gères bien — l\'absence entretient le désir',               scores:{Mystère:2}},
        {id:'c', text:'C\'est dur mais tu profites de ton espace',                    scores:{Libre:2}},
        {id:'d', text:'C\'est compliqué — tu as besoin de proximité physique',        scores:{Romantique:2}},
      ]
    },
    {
      id:'q8', text:'Après une rupture, tu…',
      answers:[
        {id:'a', text:'Prends le temps de guérir avant de recommencer',      scores:{Romantique:2, Mystère:1}},
        {id:'b', text:'Passes à autre chose assez vite — la vie continue',   scores:{Libre:3}},
        {id:'c', text:'Restes longtemps dans les souvenirs',                  scores:{Romantique:3}},
        {id:'d', text:'Te jettes dans de nouvelles rencontres',              scores:{Libre:2}},
      ]
    },
    {
      id:'q9', text:'La chose la plus romantique pour toi c\'est…',
      answers:[
        {id:'a', text:'Un message du matin écrit à la main',                       scores:{Romantique:3}},
        {id:'b', text:'Un regard qui dit tout sans un mot',                         scores:{Mystère:3}},
        {id:'c', text:'Un voyage spontané décidé la veille',                       scores:{Libre:3}},
        {id:'d', text:'Cuisiner ensemble en musique',                              scores:{Romantique:2}},
      ]
    },
    {
      id:'q10', text:'Comment tu sais que tu aimes vraiment quelqu\'un ?',
      answers:[
        {id:'a', text:'Quand tu penses à lui/elle avant de t\'endormir',            scores:{Romantique:3}},
        {id:'b', text:'Quand tu veux lui montrer les côtés que tu caches aux autres', scores:{Mystère:3}},
        {id:'c', text:'Quand tu n\'as pas envie de ta liberté avec lui/elle',        scores:{Libre:2, Romantique:1}},
        {id:'d', text:'Quand tu peux être complètement toi-même',                   scores:{Romantique:2, Libre:1}},
      ]
    },
  ],
  scoring: {
    type: 'dominant',
    profiles: {
      Romantique: {
        label:       '🌹 Le Grand Romantique',
        description: 'Tu aimes à fond, avec tout ton cœur et toute ton âme. Pour toi, l\'amour c\'est sacré — les grands gestes, les petites attentions, les mots qui comptent. Tu es probablement le/la partenaire dont tout le monde rêve... mais tu cherches ton égal(e) qui aime avec la même intensité.',
        strengths:   ['Dévouement', 'Tendresse', 'Fidélité', 'Intensité émotionnelle'],
        advice:      'Fais attention à ne pas t\'oublier toi-même dans l\'amour des autres.',
      },
      Libre: {
        label:       '🦋 Le Libre Électron',
        description: 'Tu aimes profondément mais avec légèreté. Pour toi, l\'amour ne devrait pas rimer avec cage. Tu cherches quelqu\'un qui peut être ton partenaire ET ton ami(e), avec qui tout est naturel et jamais forcé. La liberté dans la relation EST ta façon d\'aimer.',
        strengths:   ['Légèreté', 'Joie', 'Respect de l\'espace', 'Non-possessivité'],
        advice:      'Assure-toi que ta légèreté ne soit pas perçue comme un manque d\'engagement.',
      },
      Mystère: {
        label:       '🌙 Le Séducteur Mystérieux',
        description: 'Tu fascines par ce que tu ne dis pas. Ta façon d\'aimer passe par le regard, les gestes subtils, les silences chargés de sens. Tu n\'as pas besoin de proclamer ta passion — elle se ressent. Le/la bon(ne) partenaire saura lire entre tes lignes.',
        strengths:   ['Charme', 'Profondeur', 'Subtilité', 'Intensité silencieuse'],
        advice:      'Apprends aussi à exprimer verbalement — certains partenaires ont besoin d\'entendre les mots.',
      },
    }
  }
};

// ─── QUIZ 9 ────────────────────────────────────────────────────────────────────
const quiz9 = {
  id: 'test-intelligence-emotionnelle',
  title: 'Ton intelligence émotionnelle est-elle au-dessus de la moyenne ?',
  description: 'L\'IE (intelligence émotionnelle) est un meilleur prédicteur de succès que le QI. Où te situes-tu ?',
  category: 'iq',
  type: 'knowledge',
  emoji: '🎯',
  gradient: 'from-emerald-500 to-teal-600',
  tags: ['intelligence émotionnelle', 'EQ', 'empathie', 'leadership'],
  viral_hook: 'Les études montrent que l\'IE prédit le succès 2x mieux que le QI',
  estimated_time: '5 min',
  questions: [
    {
      id:'q1', text:'Un collègue fait une erreur grave qui t\'impacte directement. Ta première réaction est…',
      answers:[
        {id:'a', text:'Exprimer ta frustration immédiatement',              correct:false, feedback:'Une réaction immédiate sous l\'émotion est rarement constructive.'},
        {id:'b', text:'Prendre un moment, puis en parler calmement',        correct:true,  feedback:'Excellent ! Gérer ses émotions avant d\'agir est la clé de l\'IE.'},
        {id:'c', text:'Lui en parler dans le dos à un autre collègue',      correct:false, feedback:'Parler dans le dos crée de la méfiance et ne résout rien.'},
        {id:'d', text:'Ignorer complètement pour éviter le conflit',        correct:false, feedback:'Éviter le conflit peut paraître facile mais laisse le problème non résolu.'},
      ]
    },
    {
      id:'q2', text:'Tu remarques qu\'un ami est triste mais il dit "ça va". Tu…',
      answers:[
        {id:'a', text:'Le crois — il dit que ça va',                        correct:false, feedback:'Les gens masquent souvent leurs émotions. Un vrai EQ lit au-delà des mots.'},
        {id:'b', text:'Lui dis "je suis là si tu veux parler" sans insister', correct:true, feedback:'Parfait ! Tu ouvres la porte sans mettre de pression.'},
        {id:'c', text:'Insistes jusqu\'à ce qu\'il te dise ce qui ne va pas', correct:false, feedback:'Insister peut faire sentir à l\'autre qu\'il n\'a pas d\'espace.'},
        {id:'d', text:'Changes de sujet pour alléger l\'atmosphère',         correct:false, feedback:'Changer de sujet peut être perçu comme un manque d\'intérêt.'},
      ]
    },
    {
      id:'q3', text:'Tu es en désaccord profond avec quelqu\'un. Comment tu formules ta réponse ?',
      answers:[
        {id:'a', text:'"Tu as tort et voilà pourquoi..."',                  correct:false, feedback:'Commencer par "tu as tort" met l\'autre sur la défensive.'},
        {id:'b', text:'"Je comprends ton point de vue. Pour moi, c\'est différent parce que..."', correct:true, feedback:'Excellent ! Valider d\'abord, puis partager ta perspective — c\'est la communication non-violente.'},
        {id:'c', text:'"Je suis d\'accord" pour éviter la confrontation',   correct:false, feedback:'Feindre l\'accord détruit la confiance et empêche la vraie communication.'},
        {id:'d', text:'Tu ne répondras pas — ça ne vaut pas la peine',      correct:false, feedback:'Éviter peut accumuler des tensions non exprimées.'},
      ]
    },
    {
      id:'q4', text:'Dans une réunion, quelqu\'un t\'interrompt pour s\'approprier ton idée. Tu…',
      answers:[
        {id:'a', text:'Rectifies immédiatement avec force "C\'était mon idée"', correct:false, feedback:'Vrai mais peut créer une confrontation inutile en public.'},
        {id:'b', text:'Laisses passer — ça n\'en vaut pas la peine',            correct:false, feedback:'Laisser passer nourrit le ressentiment et encourage le comportement.'},
        {id:'c', text:'Dis calmement "Je suis content(e) que tu développes mon idée de tout à l\'heure"', correct:true, feedback:'Brillant ! Tu reprends la paternité de l\'idée sans créer de conflit ouvert.'},
        {id:'d', text:'En parles après la réunion uniquement avec le boss',     correct:false, feedback:'Passer par-dessus peut être perçu comme du jeu politique.'},
      ]
    },
    {
      id:'q5', text:'Tu reçois un feedback très négatif sur un projet personnel. Comment tu réagis intérieurement ?',
      answers:[
        {id:'a', text:'Tu te défends mentalement — le critique a tort',         correct:false, feedback:'La défensivité est le principal obstacle à l\'amélioration personnelle.'},
        {id:'b', text:'Tu ressens de la douleur mais tu cherches ce qui est vrai dans la critique', correct:true, feedback:'C\'est exactement ça l\'IE : ressentir ET garder la lucidité.'},
        {id:'c', text:'Tu ignores — l\'opinion des autres ne compte pas',       correct:false, feedback:'Ignorer tous les feedbacks prive de précieuses informations.'},
        {id:'d', text:'Tu te sens écrasé(e) et remets tout en question',        correct:false, feedback:'Laisser une critique tout remettre en cause manque de résilience émotionnelle.'},
      ]
    },
    {
      id:'q6', text:'Un employé ou ami te demande conseil sur un problème. Tu commences par…',
      answers:[
        {id:'a', text:'Donner des conseils pratiques directement',              correct:false, feedback:'Attention ! Les gens ont souvent besoin d\'être entendus avant d\'être conseillés.'},
        {id:'b', text:'Poser des questions pour vraiment comprendre la situation', correct:true, feedback:'Excellent ! Comprendre avant de conseiller est la marque d\'un EQ élevé.'},
        {id:'c', text:'Raconter une expérience similaire pour montrer que tu comprends', correct:false, feedback:'Ramener à soi peut détourner l\'attention de la personne qui a besoin d\'aide.'},
        {id:'d', text:'Écouter passivement sans intervenir',                    correct:false, feedback:'L\'écoute pure sans engagement actif peut sembler un manque d\'intérêt.'},
      ]
    },
    {
      id:'q7', text:'Tu te sens très anxieux avant un événement important. Que fais-tu ?',
      answers:[
        {id:'a', text:'Tu essaies de ne pas y penser',                         correct:false, feedback:'Supprimer les émotions les amplifie souvent.'},
        {id:'b', text:'Tu reconnais l\'anxiété et tu l\'utilises comme énergie', correct:true, feedback:'Parfait ! Recadrer l\'anxiété en excitation est une technique validée scientifiquement.'},
        {id:'c', text:'Tu te forces à te calmer complètement',                  correct:false, feedback:'Forcer la sérénité est rarement efficace face à une vraie anxiété.'},
        {id:'d', text:'Tu évites l\'événement si possible',                     correct:false, feedback:'L\'évitement renforce l\'anxiété à long terme.'},
      ]
    },
    {
      id:'q8', text:'Quelqu\'un exprime une opinion très différente de tes valeurs. Ta réaction spontanée ?',
      answers:[
        {id:'a', text:'Curiosité — qu\'est-ce qui l\'a amené(e) à penser comme ça ?', correct:true, feedback:'Bravo ! La curiosité avant le jugement est le signe d\'une IE développée.'},
        {id:'b', text:'Tu essaies de le/la convaincre que tu as raison',          correct:false, feedback:'Chercher à convaincre sans comprendre d\'abord est peu efficace.'},
        {id:'c', text:'Tu évites le sujet pour ne pas créer de friction',         correct:false, feedback:'Éviter les sujets difficiles empêche les vraies connexions.'},
        {id:'d', text:'Tu te sens agacé(e) et clos la discussion',               correct:false, feedback:'La fermeture aux opinions différentes limite la compréhension du monde.'},
      ]
    },
    {
      id:'q9', text:'Tu observes ton chef qui stresse visiblement avant une grande présentation. Tu…',
      answers:[
        {id:'a', text:'Ne dis rien — ce n\'est pas ton problème',              correct:false, feedback:'Ignorer un collègue en difficulté est une opportunité manquée de créer de la confiance.'},
        {id:'b', text:'Lui dis "Tu vas gérer, tu l\'as déjà fait avant"',      correct:true, feedback:'Bien ! Tu offres un ancrage positif sans minimiser le stress.'},
        {id:'c', text:'Lui fais remarquer qu\'il semble stressé',              correct:false, feedback:'Nommer le stress sans solution peut augmenter la pression.'},
        {id:'d', text:'Lui proposes de l\'aide pratique concrète',             correct:true, feedback:'Très bien ! Action concrète = soutien réel.'},
      ]
    },
    {
      id:'q10', text:'Tu fais une grosse erreur devant tout le monde. Ensuite, tu…',
      answers:[
        {id:'a', text:'Te flagelles intérieurement pendant des jours',          correct:false, feedback:'L\'auto-flagellation excessive est destructrice et peu productive.'},
        {id:'b', text:'Minimises — "c\'était pas si grave"',                     correct:false, feedback:'Minimiser empêche de tirer les vraies leçons.'},
        {id:'c', text:'L\'analyses calmement, en tires une leçon, puis tu passes', correct:true, feedback:'C\'est la réponse de quelqu\'un avec une haute IE — apprentissage sans auto-destruction.'},
        {id:'d', text:'N\'en parles plus jamais pour l\'oublier',               correct:false, feedback:'L\'oubli volontaire ne crée pas d\'apprentissage durable.'},
      ]
    },
  ],
  scoring: {
    type: 'percentage',
    levels: [
      { min:0,  max:40,  label:'📈 IE en développement', description:'Bonne nouvelle : l\'intelligence émotionnelle s\'apprend et se développe tout au long de la vie. Tu as identifié des axes d\'amélioration précieux.' },
      { min:41, max:65,  label:'💛 IE solide — au-dessus de la moyenne', description:'Tu as une bonne base d\'intelligence émotionnelle. Tu sais généralement gérer tes émotions et comprendre celles des autres. Avec de la pratique, tu peux atteindre l\'excellence.' },
      { min:66, max:85,  label:'🧡 Haute IE — Leader naturel(le)', description:'Tu fais partie des 20% avec une haute intelligence émotionnelle. Tu navigues les relations complexes avec aisance et les gens te font naturellement confiance.' },
      { min:86, max:100, label:'❤️ IE exceptionnelle — Top 5%', description:'Félicitations — tu as une intelligence émotionnelle exceptionnelle. Tu comprends les émotions (les tiennes et celles des autres) à un niveau profond. C\'est l\'une des compétences les plus précieuses du 21ème siècle.' },
    ]
  }
};

// ─── QUIZ 10 ────────────────────────────────────────────────────────────────────
const quiz10 = {
  id: 'quelle-energie-degage-tu',
  title: 'Quelle énergie tu dégages ? Les gens te perçoivent-ils comme tu le crois ?',
  description: 'Comment les gens te voient-ils vraiment ? Le résultat te surprendra (ou confirmera ce que tu sais déjà).',
  category: 'social',
  type: 'personality',
  emoji: '✨',
  gradient: 'from-amber-500 to-yellow-500',
  tags: ['énergie', 'perception', 'charisme', 'aura'],
  viral_hook: 'Envoie ce test à tes amis — compare les résultats avec ce qu\'ils pensent de toi',
  estimated_time: '3 min',
  questions: [
    {
      id:'q1', text:'Quand tu entres dans une pièce, tu…',
      answers:[
        {id:'a', text:'Les gens le remarquent naturellement',               scores:{Magnétique:3}},
        {id:'b', text:'Tu t\'installes discrètement',                       scores:{Mystérieux:2}},
        {id:'c', text:'Tu vas vers les gens et dis bonjour',                scores:{Chaleureux:3}},
        {id:'d', text:'Tu observes d\'abord avant de t\'intégrer',         scores:{Mystérieux:2, Sage:1}},
      ]
    },
    {
      id:'q2', text:'Les gens viennent souvent te voir pour…',
      answers:[
        {id:'a', text:'Des conseils et de la sagesse',                      scores:{Sage:3}},
        {id:'b', text:'Du soutien émotionnel',                              scores:{Chaleureux:3}},
        {id:'c', text:'De l\'inspiration et de la motivation',              scores:{Magnétique:3}},
        {id:'d', text:'Comprendre des situations complexes',               scores:{Mystérieux:2, Sage:1}},
      ]
    },
    {
      id:'q3', text:'Comment les gens te décrivent-ils généralement ?',
      answers:[
        {id:'a', text:'"Il/elle est tellement charismatique"',             scores:{Magnétique:3}},
        {id:'b', text:'"Il/elle est tellement bienveillant(e)"',           scores:{Chaleureux:3}},
        {id:'c', text:'"Il/elle est tellement profond(e)"',                scores:{Mystérieux:3}},
        {id:'d', text:'"Il/elle est tellement sage"',                      scores:{Sage:3}},
      ]
    },
    {
      id:'q4', text:'Dans une photo de groupe, tu es généralement…',
      answers:[
        {id:'a', text:'Au centre ou facilement repérable',                 scores:{Magnétique:3}},
        {id:'b', text:'Souriant(e) avec tout le monde autour de toi',     scores:{Chaleureux:3}},
        {id:'c', text:'Un peu en retrait, regard pensif',                  scores:{Mystérieux:2}},
        {id:'d', text:'Détendu(e) et naturel(le) peu importe la place',   scores:{Sage:2}},
      ]
    },
    {
      id:'q5', text:'Qu\'est-ce qui te rend le plus attractif(ve) selon toi ?',
      answers:[
        {id:'a', text:'Ton énergie et ta présence',                        scores:{Magnétique:3}},
        {id:'b', text:'Ta chaleur et ton authenticité',                    scores:{Chaleureux:3}},
        {id:'c', text:'Ton mystère et ta profondeur',                      scores:{Mystérieux:3}},
        {id:'d', text:'Ta sagesse et ta sérénité',                         scores:{Sage:3}},
      ]
    },
    {
      id:'q6', text:'Lors d\'un premier contact avec quelqu\'un, tu…',
      answers:[
        {id:'a', text:'Crées une impression forte et mémorable',           scores:{Magnétique:3}},
        {id:'b', text:'Les mets immédiatement à l\'aise',                  scores:{Chaleureux:3}},
        {id:'c', text:'Restes un peu mystérieux(se) — tu en donnes peu',  scores:{Mystérieux:3}},
        {id:'d', text:'Écoutes plus que tu ne parles',                     scores:{Sage:2, Mystérieux:1}},
      ]
    },
    {
      id:'q7', text:'Tes anciens ex ou ex-amis parlent de toi comme…',
      answers:[
        {id:'a', text:'"C\'était quelqu\'un de difficile à oublier"',      scores:{Magnétique:3}},
        {id:'b', text:'"C\'était quelqu\'un de tellement gentil"',         scores:{Chaleureux:3}},
        {id:'c', text:'"Je n\'ai jamais vraiment su qui il/elle était"',   scores:{Mystérieux:3}},
        {id:'d', text:'"C\'était quelqu\'un de vraiment posé et sensé"',  scores:{Sage:3}},
      ]
    },
    {
      id:'q8', text:'Si tu étais un phénomène naturel, tu serais…',
      answers:[
        {id:'a', text:'Un orage magnétique — puissant et électrisant',     scores:{Magnétique:3}},
        {id:'b', text:'Le soleil — chaud et lumineux',                     scores:{Chaleureux:3}},
        {id:'c', text:'La lune — mystérieux(se) et changeant(e)',          scores:{Mystérieux:3}},
        {id:'d', text:'Une montagne — stable, solide, perpétuel(le)',      scores:{Sage:3}},
      ]
    },
  ],
  scoring: {
    type: 'dominant',
    profiles: {
      Magnétique: {
        label:       '⚡ Énergie Magnétique',
        description: 'Tu as une présence qui électrise les pièces. Les gens te remarquent, te suivent, t\'admirent — souvent sans même savoir pourquoi. Ce charisme naturel est un don rare. Utilise-le avec responsabilité car il peut autant attirer que fasciner.',
        aura:        'Rouge-Orange intense',
        celebs:      ['Rihanna', 'LeBron James', 'Shakira'],
      },
      Chaleureux: {
        label:       '☀️ Énergie Chaleureuse',
        description: 'Tu es le soleil de ton entourage. Ta bienveillance authentique crée une zone de sécurité autour de toi où les gens se sentent acceptés et aimés. C\'est une énergie rare et précieuse — tu fais du monde un endroit meilleur simplement en étant là.',
        aura:        'Dorée et lumineuse',
        celebs:      ['Keanu Reeves', 'Jennifer Aniston', 'Tom Hanks'],
      },
      Mystérieux: {
        label:       '🌙 Énergie Mystérieuse',
        description: 'Tu fascines sans forcer. Les gens veulent te comprendre, te percer à jour, découvrir ce qui se cache derrière ce regard profond. Cette aura mystérieuse est un pouvoir silencieux — elle attire irrésistiblement ceux qui cherchent la profondeur.',
        aura:        'Violet-Indigo profond',
        celebs:      ['Johnny Depp', 'Angelina Jolie', 'Joaquin Phoenix'],
      },
      Sage: {
        label:       '🏔️ Énergie de Sage',
        description: 'Tu dégages une sérénité et une profondeur qui inspirent confiance. Les gens sentent instinctivement que tu as quelque chose d\'important à transmettre. Cette énergie de sage est la plus respectée sur le long terme — elle traverse le temps.',
        aura:        'Blanc-Argenté paisible',
        celebs:      ['Morgan Freeman', 'Michelle Obama', 'Dalai Lama'],
      },
    }
  }
};

// ─── EXPORT PRINCIPAL ─────────────────────────────────────────────────────────
export const QUIZZES = [quiz1, quiz2, quiz3, quiz4, quiz5, quiz6, quiz7, quiz8, quiz9, quiz10];

export function getQuizById(id) {
  return QUIZZES.find(q => q.id === id) || null;
}

export function getQuizzesByCategory(category) {
  if (!category || category === 'all') return QUIZZES;
  return QUIZZES.filter(q => q.category === category);
}

export function getFeaturedQuizzes(limit = 6) {
  return QUIZZES.slice(0, limit);
}

// ─── CALCUL DU SCORE ─────────────────────────────────────────────────────────
export function calculateResult(quiz, answers) {
  if (quiz.type === 'knowledge') {
    return calculateKnowledgeResult(quiz, answers);
  }
  return calculatePersonalityResult(quiz, answers);
}

function calculateKnowledgeResult(quiz, answers) {
  let correct = 0;
  const questions = quiz.questions;
  questions.forEach(q => {
    const chosen = answers[q.id];
    const ans = q.answers.find(a => a.id === chosen);
    if (ans?.correct) correct++;
  });
  const percentage = Math.round((correct / questions.length) * 100);
  const level = quiz.scoring.levels.find(l => percentage >= l.min && percentage <= l.max)
    || quiz.scoring.levels[quiz.scoring.levels.length - 1];
  return {
    type:        'knowledge',
    score:       correct,
    maxScore:    questions.length,
    percentage,
    label:       level.label,
    description: level.description,
    answers,
  };
}

function calculatePersonalityResult(quiz, answers) {
  const totals = {};
  Object.values(quiz.scoring.profiles).forEach(p => {
    const key = Object.keys(quiz.scoring.profiles).find(k => quiz.scoring.profiles[k] === p);
    totals[key] = 0;
  });

  quiz.questions.forEach(q => {
    const chosen = answers[q.id];
    const ans = q.answers.find(a => a.id === chosen);
    if (ans?.scores) {
      Object.entries(ans.scores).forEach(([k, v]) => {
        totals[k] = (totals[k] || 0) + v;
      });
    }
  });

  const dominant = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
  const profile  = quiz.scoring.profiles[dominant];
  const total    = Object.values(totals).reduce((a, b) => a + b, 0);
  const percentage = total > 0 ? Math.round((totals[dominant] / total) * 100) : 50;

  return {
    type:        'personality',
    score:       totals[dominant],
    maxScore:    total,
    percentage,
    profileKey:  dominant,
    label:       profile.label,
    description: profile.description,
    profile,
    allScores:   totals,
    answers,
  };
}
