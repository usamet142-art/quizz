# 🧠 Quizify — SaaS Quiz Viral & Monétisé

> Application web de quiz virale, addictive et monétisable via Google AdSense.
> Stack : Next.js 14 · Tailwind CSS · Firebase Auth + Firestore

---

## 🚀 Installation rapide

### 1. Cloner et installer

```bash
git clone <votre-repo>
cd quizify-app
npm install
```

### 2. Configurer Firebase

1. Aller sur [console.firebase.google.com](https://console.firebase.google.com)
2. Créer un nouveau projet
3. Activer **Authentication** → Email/Password + Google
4. Activer **Firestore Database** (mode production)
5. Copier les variables de config

```bash
cp .env.local.example .env.local
# Remplir les vraies valeurs Firebase
```

Contenu de `.env.local` :
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre-projet
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXXX
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
```

### 3. Déployer les règles Firestore

```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore:rules,firestore:indexes
```

### 4. Lancer en développement

```bash
npm run dev
# → http://localhost:3000
```

### 5. Build production

```bash
npm run build
npm start
```

---

## 📁 Structure du projet

```
quizify-app/
├── pages/
│   ├── index.js              # Accueil (feed TikTok)
│   ├── categories.js         # Page catégories
│   ├── quiz/[id].js          # Page quiz (intro + playing + résultats)
│   ├── login.js              # Connexion
│   ├── register.js           # Inscription
│   ├── forgot-password.js    # Reset MDP
│   ├── profile.js            # Profil utilisateur
│   └── 404.js                # Page 404
├── components/
│   ├── Layout.js             # Layout global (header, footer, ads)
│   ├── Header.js             # Navigation + auth menu
│   ├── QuizCard.js           # Carte quiz (grid + compact)
│   ├── AdBanner.js           # Google AdSense + interstitiel
│   ├── ShareButton.js        # Partage social
│   └── ProtectedRoute.js     # Protection des routes
├── context/
│   └── AuthContext.js        # État global d'authentification
├── lib/
│   ├── firebase.js           # Init Firebase
│   └── firestore.js          # Helpers DB (CRUD)
├── data/
│   ├── quizzes.js            # 10 quiz complets + logique scoring
│   └── generatedQuizzes.js   # Quiz générés automatiquement
├── styles/
│   └── globals.css           # Tailwind + styles custom
├── scripts/
│   └── generateQuizzes.js    # Générateur de 100+ quiz
├── firestore.rules           # Règles de sécurité
├── firestore.indexes.json    # Index Firestore
└── .env.local.example        # Template des variables d'env
```

---

## 🎯 10 Quiz inclus

| # | Titre | Type | Questions |
|---|-------|------|-----------|
| 1 | Quel type de personnalité es-tu vraiment ? | Personnalité | 12 |
| 2 | Seulement 2% obtiennent 20/20 à ce test | Culture générale | 15 |
| 3 | Quel est ton style amoureux ? | Personnalité/Amour | 10 |
| 4 | Ce que tes choix révèlent sur toi | Jugement social | 10 |
| 5 | Ton âge mental n'est pas ton âge réel | Fun | 10 |
| 6 | Pop Culture Challenge 2024 | Culture | 12 |
| 7 | Es-tu introverti(e) ou extraverti(e) ? | Personnalité | 8 |
| 8 | Quel type de lover es-tu ? | Amour | 10 |
| 9 | Ton intelligence émotionnelle | QI/EQ | 10 |
| 10 | Quelle énergie tu dégages ? | Social | 8 |

---

## 💰 Monétisation Google AdSense

### Emplacements publicitaires implémentés

| Position | Slot | Format |
|----------|------|--------|
| Homepage haut | `homepage-top` | Bannière |
| Avant quiz (interstitiel) | `before-quiz` | Rectangle |
| Après résultats | `after-results` | Rectangle |
| Entre questions (toutes les 5) | `between-questions` | Bannière |
| Sticky bas de page | `sticky-bottom` | Bannière |

### Configurer AdSense

1. Créer un compte [Google AdSense](https://adsense.google.com)
2. Soumettre le site pour approbation
3. Remplacer `ca-pub-XXXX` par votre vrai Publisher ID dans `.env.local`
4. Remplacer les numéros de slots dans `components/AdBanner.js`

### Estimation de revenus

| Trafic mensuel | RPM estimé | Revenus estimés |
|----------------|------------|-----------------|
| 10 000 vues | 2-5€ | 20-50€ |
| 100 000 vues | 2-5€ | 200-500€ |
| 1 000 000 vues | 2-5€ | 2000-5000€ |

---

## 🤖 Génération automatique de quiz

```bash
node scripts/generateQuizzes.js
# → Génère 100 quiz dans data/generatedQuizzes.js
```

Pour utiliser les quiz générés, importer dans `data/quizzes.js` :

```js
import { GENERATED_QUIZZES } from './generatedQuizzes';
export const ALL_QUIZZES = [...QUIZZES, ...GENERATED_QUIZZES];
```

---

## 🔐 Authentification Firebase

Fonctionnalités implémentées :
- ✅ Inscription email/mot de passe
- ✅ Vérification email automatique
- ✅ Connexion email/mot de passe
- ✅ Connexion Google OAuth
- ✅ Reset mot de passe par email
- ✅ Session persistante
- ✅ Routes protégées
- ✅ Profil utilisateur dans Firestore

---

## 📊 Base de données Firestore

### Collections

```
users/{uid}
  ├── displayName, email, photoURL
  ├── totalQuizzes, favorites[]
  └── results/{resultId}
        ├── quizId, score, percentage
        └── resultLabel, completedAt

quizStats/{quizId}
  └── plays, updatedAt

leaderboard/{uid_quizId}
  └── uid, displayName, percentage, updatedAt
```

---

## 🌐 Déploiement

### Vercel (recommandé)

```bash
npm i -g vercel
vercel --prod
```

Ajouter les variables d'environnement dans le dashboard Vercel.

### Netlify

```bash
npm run build
# Déployer le dossier .next/
```

---

## 📈 SEO

Chaque page inclut :
- `<title>` optimisé
- `<meta description>` unique
- Open Graph (og:title, og:description)
- Twitter Cards
- URLs propres (`/quiz/quel-type-de-personne-es-tu`)

---

## 🔒 Sécurité

- Headers sécurité (X-Frame-Options, X-Content-Type-Options, XSS Protection)
- Règles Firestore restrictives (users ne peuvent accéder qu'à leurs données)
- Validation des inputs côté client
- Sanitisation automatique via Firebase SDK

---

## ⚡ Performance

- Mobile-first design
- Animations CSS (pas JS-based)
- Images optimisées via Next.js `<Image>`
- Code splitting automatique Next.js
- Fonts Google préchargées

---

## 📞 Support

Pour toute question sur le déploiement ou la configuration, référez-vous à :
- [Documentation Firebase](https://firebase.google.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [Google AdSense Help](https://support.google.com/adsense)
