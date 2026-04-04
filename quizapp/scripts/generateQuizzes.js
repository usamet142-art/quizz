#!/usr/bin/env node
// ═══════════════════════════════════════════════════════
// SCRIPT DE GÉNÉRATION AUTOMATIQUE DE QUIZ
// Usage : node scripts/generateQuizzes.js
// Génère 100 quiz supplémentaires dans data/generatedQuizzes.js
// ═══════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

// ─── TEMPLATES DE QUIZ ────────────────────────────────────────────────────────

const PERSONALITY_TEMPLATES = [
  {
    category: 'personality',
    emoji: '🌈',
    type: 'personality',
    gradient: 'from-violet-600 to-indigo-600',
    profiles: {
      Lion:    { label: '🦁 Le Lion', description: 'Tu as une personnalité forte et audacieuse. Tu prends les devants naturellement.', strengths: ['Leadership', 'Courage', 'Détermination'] },
      Dauphin: { label: '🐬 Le Dauphin', description: 'Créatif et sociable, tu apportes de la joie partout où tu vas.', strengths: ['Créativité', 'Sociabilité', 'Optimisme'] },
      Hibou:   { label: '🦉 Le Hibou', description: 'Sage et analytique, tu préfères observer avant d\'agir.', strengths: ['Sagesse', 'Analyse', 'Patience'] },
      Aigle:   { label: '🦅 L\'Aigle', description: 'Visionnaire et indépendant, tu vois grand et loin.', strengths: ['Vision', 'Indépendance', 'Ambition'] },
    }
  },
  {
    category: 'fun',
    emoji: '🎭',
    type: 'personality',
    gradient: 'from-pink-600 to-rose-600',
    profiles: {
      Feu:  { label: '🔥 Personnalité Feu', description: 'Intense, passionné(e) et magnétique. Tu brûles de l\'intérieur.', strengths: ['Passion', 'Intensité', 'Énergie'] },
      Eau:  { label: '🌊 Personnalité Eau', description: 'Fluide, adaptable et profond(e). Tu t\'adaptes à tout.', strengths: ['Adaptabilité', 'Profondeur', 'Fluidité'] },
      Terre:{ label: '🌱 Personnalité Terre', description: 'Stable, fiable et ancré(e). Les autres comptent sur toi.', strengths: ['Stabilité', 'Fiabilité', 'Ancrage'] },
      Air:  { label: '💨 Personnalité Air', description: 'Libre, curieux(se) et imprévisible. Tu adores la nouveauté.', strengths: ['Liberté', 'Curiosité', 'Légèreté'] },
    }
  },
];

const KNOWLEDGE_TEMPLATES = [
  {
    category: 'iq',
    emoji: '🧩',
    type: 'knowledge',
    gradient: 'from-cyan-600 to-blue-600',
    levels: [
      { min: 0,   max: 40,  label: '📚 Débutant',     description: 'Continue à apprendre — chaque quiz t\'apprend quelque chose !' },
      { min: 41,  max: 70,  label: '🎓 Intermédiaire', description: 'Bon niveau ! Tu as de solides connaissances de base.' },
      { min: 71,  max: 90,  label: '🏆 Avancé',        description: 'Excellent ! Tu es clairement au-dessus de la moyenne.' },
      { min: 91,  max: 100, label: '👑 Expert',         description: 'PARFAIT ou quasi-parfait. Tu es une référence.' },
    ]
  },
];

// ─── BANQUE DE QUESTIONS PAR THÈME ────────────────────────────────────────────

const QUESTION_BANKS = {
  personality_general: [
    {
      text: 'Face à l\'imprévu, tu…',
      answers: [
        { id:'a', text:'Paniques légèrement puis tu t\'adaptes', scores:{ Eau:2, Air:1 } },
        { id:'b', text:'Adores ça — l\'imprévu c\'est la vie', scores:{ Air:3 } },
        { id:'c', text:'Analyses la situation calmement', scores:{ Hibou:2 } },
        { id:'d', text:'Prends les commandes', scores:{ Lion:2, Feu:1 } },
      ]
    },
    {
      text: 'Ton espace de travail idéal ?',
      answers: [
        { id:'a', text:'Très organisé, rangé, minimaliste', scores:{ Hibou:2, Terre:1 } },
        { id:'b', text:'Créatif et coloré — inspirant', scores:{ Dauphin:2, Air:1 } },
        { id:'c', text:'N\'importe où pourvu que ça bouge', scores:{ Air:3 } },
        { id:'d', text:'Confortable et familier', scores:{ Terre:3 } },
      ]
    },
    {
      text: 'Comment tu célèbres une victoire ?',
      answers: [
        { id:'a', text:'Grande fête avec tous tes amis', scores:{ Dauphin:3, Lion:1 } },
        { id:'b', text:'Moment intime avec les proches', scores:{ Terre:2 } },
        { id:'c', text:'Réflexion solitaire sur ce qu\'il reste à accomplir', scores:{ Hibou:3 } },
        { id:'d', text:'Déjà passé à l\'objectif suivant', scores:{ Aigle:3, Feu:2 } },
      ]
    },
    {
      text: 'Ton rapport à la solitude ?',
      answers: [
        { id:'a', text:'Tu en as besoin pour recharger', scores:{ Hibou:2, Aigle:1 } },
        { id:'b', text:'Tu l\'apprécies parfois mais tu préfères la compagnie', scores:{ Dauphin:2 } },
        { id:'c', text:'Tu l\'évites — tu t\'ennuies seul(e)', scores:{ Lion:1, Air:1 } },
        { id:'d', text:'Tu es ton meilleur compagnon', scores:{ Aigle:2, Eau:1 } },
      ]
    },
    {
      text: 'Qu\'est-ce qui te motive le plus profondément ?',
      answers: [
        { id:'a', text:'La reconnaissance et l\'admiration', scores:{ Lion:2, Feu:1 } },
        { id:'b', text:'La croissance personnelle', scores:{ Hibou:2, Aigle:1 } },
        { id:'c', text:'Aider et connecter avec les autres', scores:{ Dauphin:3, Eau:1 } },
        { id:'d', text:'La liberté et l\'aventure', scores:{ Air:3 } },
      ]
    },
    {
      text: 'Tu apprends mieux…',
      answers: [
        { id:'a', text:'En faisant — l\'action d\'abord', scores:{ Lion:2, Air:1 } },
        { id:'b', text:'En observant d\'abord longuement', scores:{ Hibou:3 } },
        { id:'c', text:'En échangeant avec d\'autres', scores:{ Dauphin:3 } },
        { id:'d', text:'En expérimentant à ta façon', scores:{ Aigle:2, Eau:1 } },
      ]
    },
    {
      text: 'Ton talon d\'Achille ?',
      answers: [
        { id:'a', text:'L\'impatience — tu veux tout maintenant', scores:{ Lion:2, Feu:2 } },
        { id:'b', text:'La procrastination — tu remets à demain', scores:{ Eau:2 } },
        { id:'c', text:'La suranalyse — tu penses trop avant d\'agir', scores:{ Hibou:3 } },
        { id:'d', text:'La dispersion — tu as trop d\'idées', scores:{ Air:3 } },
      ]
    },
    {
      text: 'Si ta vie était un film, ce serait…',
      answers: [
        { id:'a', text:'Un film d\'action explosif', scores:{ Lion:3, Feu:2 } },
        { id:'b', text:'Une comédie romantique légère', scores:{ Dauphin:3 } },
        { id:'c', text:'Un drame psychologique profond', scores:{ Hibou:2, Eau:1 } },
        { id:'d', text:'Un film d\'aventure et de voyage', scores:{ Aigle:2, Air:2 } },
      ]
    },
  ],

  culture_generale: [
    { text:'Quelle est la plus haute montagne du monde ?', answers:[{id:'a',text:'K2',correct:false},{id:'b',text:'Everest',correct:true},{id:'c',text:'Mont Blanc',correct:false},{id:'d',text:'Aconcagua',correct:false}] },
    { text:'Combien y a-t-il de continents sur Terre ?', answers:[{id:'a',text:'5',correct:false},{id:'b',text:'6',correct:false},{id:'c',text:'7',correct:true},{id:'d',text:'8',correct:false}] },
    { text:'Qui a écrit "Les Misérables" ?', answers:[{id:'a',text:'Balzac',correct:false},{id:'b',text:'Zola',correct:false},{id:'c',text:'Victor Hugo',correct:true},{id:'d',text:'Flaubert',correct:false}] },
    { text:'Dans quel océan se trouve Madagascar ?', answers:[{id:'a',text:'Atlantique',correct:false},{id:'b',text:'Pacifique',correct:false},{id:'c',text:'Indien',correct:true},{id:'d',text:'Arctique',correct:false}] },
    { text:'Quel est le symbole chimique du fer ?', answers:[{id:'a',text:'Fe',correct:true},{id:'b',text:'Fr',correct:false},{id:'c',text:'Ir',correct:false},{id:'d',text:'Fi',correct:false}] },
    { text:'Combien d\'os y a-t-il dans le corps humain adulte ?', answers:[{id:'a',text:'178',correct:false},{id:'b',text:'206',correct:true},{id:'c',text:'224',correct:false},{id:'d',text:'189',correct:false}] },
    { text:'Quelle est la capitale de l\'Espagne ?', answers:[{id:'a',text:'Barcelone',correct:false},{id:'b',text:'Séville',correct:false},{id:'c',text:'Madrid',correct:true},{id:'d',text:'Valence',correct:false}] },
    { text:'En quelle année l\'homme a-t-il marché sur la Lune pour la première fois ?', answers:[{id:'a',text:'1965',correct:false},{id:'b',text:'1967',correct:false},{id:'c',text:'1969',correct:true},{id:'d',text:'1971',correct:false}] },
    { text:'Qui a peint la Joconde ?', answers:[{id:'a',text:'Michel-Ange',correct:false},{id:'b',text:'Raphaël',correct:false},{id:'c',text:'Léonard de Vinci',correct:true},{id:'d',text:'Titien',correct:false}] },
    { text:'Quelle est la langue la plus parlée au monde ?', answers:[{id:'a',text:'Anglais',correct:false},{id:'b',text:'Espagnol',correct:false},{id:'c',text:'Mandarin',correct:true},{id:'d',text:'Hindi',correct:false}] },
    { text:'Quel pays a la plus grande population ?', answers:[{id:'a',text:'Inde',correct:true},{id:'b',text:'Chine',correct:false},{id:'c',text:'États-Unis',correct:false},{id:'d',text:'Indonésie',correct:false}] },
    { text:'Quelle planète est la plus grande du système solaire ?', answers:[{id:'a',text:'Saturne',correct:false},{id:'b',text:'Neptune',correct:false},{id:'c',text:'Jupiter',correct:true},{id:'d',text:'Uranus',correct:false}] },
  ],
};

// ─── TITRES ET ACCROCHES VIRALES ──────────────────────────────────────────────

const VIRAL_TITLES = {
  personality: [
    'Quel animal représente ta personnalité secrète ?',
    'Quel élément naturel es-tu intérieurement ?',
    'Quel super-héros corresponds à ta vraie personnalité ?',
    'Quelle couleur décrit exactement ton énergie ?',
    'Quel type de leader es-tu ?',
    'Quelle décennie correspond vraiment à ton âme ?',
    'Quel philosophe penserait comme toi ?',
    'Quelle saison es-tu intérieurement ?',
    'Quel type de cerveau as-tu ?',
    'Quelle ville dans le monde correspond à ta personnalité ?',
  ],
  fun: [
    'Quel mème de Internet es-tu ?',
    'Dans quelle ère historique aurais-tu dû naître ?',
    'Quel plat de cuisine tu es selon tes choix ?',
    'Si tu étais un film, lequel serais-tu ?',
    'Quel genre musical définit ton âme ?',
    'Quelle boisson es-tu réellement ?',
    'Si tu étais un emoji, lequel serais-tu ?',
  ],
  iq: [
    'Peux-tu battre 95% des gens sur ces questions ?',
    'Le quiz de culture générale qui colle aux doigts',
    'Seulement les vrais intellos passent ce test',
    'Test de culture générale : quel est ton niveau réel ?',
    'Ces questions semblent faciles mais 70% se trompent',
  ],
};

const VIRAL_HOOKS = [
  'Seulement 5% obtiennent le profil rare',
  'Tes amis vont être surpris de ton résultat',
  'Plus de 10 000 personnes ont fait ce test',
  'Le résultat est plus surprenant qu\'on ne le croit',
  'Partage et compare avec tes amis !',
  'Scientifiquement validé par des psychologues',
  'Tu ne devineras jamais ton résultat',
];

// ─── GÉNÉRATEUR PRINCIPAL ─────────────────────────────────────────────────────

function generateQuiz(index, category, style) {
  const isPersonality = style === 'personality';
  const template = isPersonality
    ? PERSONALITY_TEMPLATES[index % PERSONALITY_TEMPLATES.length]
    : KNOWLEDGE_TEMPLATES[0];

  const titleBank = VIRAL_TITLES[category] || VIRAL_TITLES.personality;
  const title = titleBank[index % titleBank.length] + (index > titleBank.length ? ` (Édition ${Math.floor(index/titleBank.length) + 1})` : '');

  const questionBank = isPersonality
    ? QUESTION_BANKS.personality_general
    : QUESTION_BANKS.culture_generale;

  // Pick 10-12 questions from bank (cycling)
  const numQuestions = 10 + (index % 3);
  const questions = Array.from({ length: numQuestions }, (_, qi) => ({
    id: `q${qi + 1}`,
    ...questionBank[(qi + index) % questionBank.length],
  }));

  return {
    id: `generated-quiz-${index + 1}`,
    title,
    description: `Découvre ce que tes réponses révèlent vraiment sur toi. Le résultat te surprendra peut-être !`,
    category,
    type: style,
    emoji: template.emoji,
    gradient: template.gradient,
    tags: [category, style, 'viral'],
    viral_hook: VIRAL_HOOKS[index % VIRAL_HOOKS.length],
    estimated_time: `${2 + (numQuestions > 12 ? 2 : 1)} min`,
    generated: true,
    questions,
    scoring: isPersonality
      ? { type: 'dominant', profiles: template.profiles }
      : { type: 'percentage', levels: template.levels },
  };
}

// ─── GÉNÉRATION DE MASSE ──────────────────────────────────────────────────────

function generateBatch(count = 100) {
  const configs = [
    { category: 'personality', style: 'personality' },
    { category: 'fun',         style: 'personality' },
    { category: 'iq',          style: 'knowledge'   },
    { category: 'culture',     style: 'knowledge'   },
    { category: 'social',      style: 'personality' },
  ];

  const quizzes = [];
  for (let i = 0; i < count; i++) {
    const cfg = configs[i % configs.length];
    quizzes.push(generateQuiz(i, cfg.category, cfg.style));
  }
  return quizzes;
}

// ─── EXPORT FICHIER ───────────────────────────────────────────────────────────

const quizzes = generateBatch(100);

const output = `// AUTO-GENERATED — DO NOT EDIT MANUALLY
// Généré le ${new Date().toLocaleDateString('fr-FR')} via scripts/generateQuizzes.js

export const GENERATED_QUIZZES = ${JSON.stringify(quizzes, null, 2)};
`;

const outPath = path.join(__dirname, '../data/generatedQuizzes.js');
fs.writeFileSync(outPath, output, 'utf-8');
console.log(`✅ ${quizzes.length} quiz générés dans data/generatedQuizzes.js`);
console.log(`   Tailles: ${quizzes.map(q => q.questions.length + 'q').slice(0,5).join(', ')}...`);
