import type { About, ArchiveProject, Contact, Experience, Project, Skill } from "./portfolio";

/**
 * French content overlays for the English portfolio data.
 * Entries are matched by slug, organization, or skill name; the English
 * entry is used as a fallback for anything missing here.
 */
export type ExperienceFr = Pick<Experience, "role" | "summary" | "privacyNote" | "modules">;

export const experiencesFr: Record<string, ExperienceFr> = {
  "Orange Digital Center": {
    role: "Développeur Full Stack",
    summary:
      "Participation au développement d'applications web et mobiles, à l'intégration d'API et à des solutions digitales connectées.",
    privacyNote:
      "Activités de développement menées dans le cadre de projets logiciels collaboratifs.",
    modules: [
      "Développement d'applications web",
      "Développement backend et d'API REST",
      "Développement d'applications mobiles",
      "Conception et gestion de bases de données",
      "Solutions IoT et intégration de systèmes",
    ],
  },
  "Société Générale African Business Services": {
    role: "Testeur logiciel",
    summary:
      "Participation aux tests fonctionnels et d'intégration d'applications bancaires, à la validation de messages financiers et aux activités d'assurance qualité.",
    privacyNote:
      "Les informations bancaires confidentielles et les données internes de transactions ne sont pas divulguées.",
    modules: [
      "Tests fonctionnels et d'intégration",
      "Validation de messages ISO 20022",
      "Vérification PACS.008, PACS.009 et PACS.002",
      "Traitement des messages CAMT.056",
      "Identification et suivi des anomalies",
    ],
  },
};

export type ProjectFr = Partial<Pick<Project, "eyebrow" | "summary" | "note">> & {
  searchTerms?: readonly string[];
};

export const projectsFr: Record<string, ProjectFr> = {
  "babiloca-back-office": {
    eyebrow: "Gestion locative · back-office",
    searchTerms: ["BabiLoca", "back-office", "gestion locative", "immobilier", "location"],
    summary:
      "Une plateforme intelligente de gestion locative centralisant les annonces immobilières, les réservations, les utilisateurs, les paiements et les vérifications d'identité, avec un back-office administratif permettant le suivi des activités, la modération des annonces, la gestion financière et le pilotage des opérations en temps réel.",
    note: "Un projet d'entreprise privé. Le code source et une démo publique ne sont pas disponibles pour l'instant ; cette page présente le résumé et les ressources approuvés par l'entreprise.",
  },
  "odc-portal": {
    eyebrow: "Formation & innovation numériques · plateforme web",
    searchTerms: ["Orange Digital Center", "ODC", "portail", "formation", "innovation", "entrepreneuriat"],
    summary:
      "Une plateforme web dédiée à la promotion des métiers du numérique, centralisant les programmes de formation, les appels à candidatures et les opportunités d'accompagnement entrepreneurial. Elle permet aux utilisateurs de découvrir les parcours proposés, consulter les conditions d'admission et postuler aux différents programmes de l'écosystème Orange Digital Center.",
    note: "Un projet d'entreprise pour l'écosystème Orange Digital Center Côte d'Ivoire. Le code source n'est pas publié ; la plateforme en ligne est opérée par l'équipe ODC.",
  },
};

export type ArchiveProjectFr = Partial<Pick<ArchiveProject, "summary" | "note">>;

export const archiveProjectsFr: Record<string, ArchiveProjectFr> = {
  "abidjan-quest": {
    summary:
      "Une plateforme web de navigation géographique, d'exploration urbaine et de gamification du Grand Abidjan, construite sur des données OpenStreetMap réelles avec cartes MapLibre, itinéraires OSRM, assistant géographique et XP validée côté serveur.",
    note: "Un monorepo open-source : une application web Next.js 15 et un service FastAPI avec PostGIS, Redis et Docker Compose. Plateforme de phase 1 ; la gamification est opt-in et les visites sont validées côté serveur.",
  },
  "dict-e-app": {
    summary:
      "Une application d'apprentissage par la dictée gamifiée pour Android avec exercices en synthèse vocale, correction mot à mot, indices, explications grammaticales, niveaux, XP, pièces et séries, adossée à une API NestJS avec Prisma et PostgreSQL.",
    note: "Un monorepo open-source : une application mobile Expo/React Native et un backend NestJS avec authentification JWT, documentation Swagger et support WebSocket. Contenu d'apprentissage français avec statistiques de progression par utilisateur.",
  },
};

export type SkillFr = Pick<Skill, "note">;

export const skillsFr: Record<string, SkillFr> = {
  React: { note: "Interfaces et systèmes réutilisables" },
  TypeScript: { note: "Un code applicatif plus sûr" },
  "Next.js": { note: "Applications React full stack" },
  Tailwind: { note: "Un travail UI rapide et cohérent" },
  "Node.js": { note: "API et outillage" },
  Python: { note: "Automatisation, OCR et API" },
  FastAPI: { note: "Services Python typés" },
  Supabase: { note: "Données, authentification et temps réel" },
  Databases: { note: "Modélisation de données relationnelles" },
  Git: { note: "Gestion de versions au quotidien" },
  GitHub: { note: "Collaboration et livraison" },
  Vercel: { note: "Déploiement web" },
};

export const aboutFr: About = {
  body: "J'aime suivre une fonctionnalité de son interface jusqu'à l'API et la base de données, puis vérifier que les pièces fonctionnent ensemble. La plupart de mes projets naissent d'un workflow qui semble plus lent ou plus confus que nécessaire.",
  closing:
    "Je suis en début de carrière et je recherche des opportunités en ingénierie logicielle où je peux apprendre d'une équipe, contribuer aux interfaces, aux API, aux bases de données et aux tests, et continuer à construire des choses utiles.",
  principles: [
    { number: "01", title: "Partir du workflow", text: "Comprendre ce que quelqu'un fait déjà avant de changer l'écran." },
    { number: "02", title: "Rendre l'état évident", text: "Utiliser un langage simple, des retours clairs et des données vérifiables." },
    { number: "03", title: "Être honnête sur le prototype", text: "Montrer ce qui marche, dire ce qui ne marche pas et protéger le contexte autour des données." },
  ],
};

export const contactFr: Contact = {
  eyebrow: "Restons en contact",
  title: "Une idée",
  titleAccent: "utile en tête ?",
};
