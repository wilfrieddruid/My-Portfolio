import { caseStudies, type ProjectCaseStudy } from "./case-studies";

/**
 * French case-study content. Sources, availability, and review dates are
 * shared with the English entries; only the prose is translated.
 */
export const caseStudiesFr: Record<string, ProjectCaseStudy> = {
  "odc-portal": {
    ...caseStudies["odc-portal"],
    status: "Portail de formation et d'innovation d'entreprise",
    audience: "Jeunes explorant les métiers du numérique, candidats aux programmes de l'ODC et entrepreneurs cherchant un accompagnement dans l'écosystème Orange Digital Center Côte d'Ivoire.",
    purpose: "Une plateforme web dédiée à la promotion des métiers du numérique, centralisant les programmes de formation, les appels à candidatures et les opportunités d'accompagnement entrepreneurial. Elle permet aux utilisateurs de découvrir les parcours proposés, consulter les conditions d'admission et postuler aux différents programmes de l'écosystème Orange Digital Center.",
    features: [
      { title: "Programmes de formation", description: "Parcourir le catalogue des programmes de formation proposés par l'écosystème Orange Digital Center." },
      { title: "Appels à candidatures", description: "Suivre les appels à candidatures ouverts et consulter les conditions d'admission de chaque programme." },
      { title: "Accompagnement entrepreneurial", description: "Découvrir les opportunités d'accompagnement et de coaching entrepreneurial de l'écosystème." },
      { title: "Candidatures", description: "Postuler aux programmes directement depuis la plateforme." },
    ],
    workflow: [
      "Parcourir les programmes de formation et les parcours proposés.",
      "Consulter les conditions d'admission du programme choisi.",
      "Postuler pendant l'appel à candidatures ouvert.",
      "Explorer les opportunités d'accompagnement entrepreneurial de l'écosystème.",
    ],
    layers: [
      { name: "Interface", technology: "Vue.js · React.js · TypeScript", description: "L'interface du portail est construite comme des applications Vue.js et React.js typées." },
      { name: "Accès aux données", technology: "Axios · TanStack Query · REST API", description: "Les appels REST via Axios sont mis en cache et synchronisés par TanStack Query pour les vues du portail." },
      { name: "Temps réel", technology: "WebSockets", description: "Les mises à jour en direct gardent les informations des programmes et candidatures à jour sans rafraîchissement manuel." },
      { name: "État local", technology: "LocalStorage", description: "L'état d'interface sélectionné et les préférences persistent sur l'appareil du visiteur." },
    ],
    limitations: [
      "C'est un projet d'entreprise privé ; le code source n'est pas publié.",
      "La plateforme en ligne est opérée par l'équipe Orange Digital Center Côte d'Ivoire et évolue avec leurs programmes.",
      "Cette page décrit la plateforme à partir du résumé et des captures d'écran approuvés par l'entreprise ; aucune donnée interne n'est affichée.",
    ],
  },
  "babiloca-back-office": {
    ...caseStudies["babiloca-back-office"],
    status: "Plateforme back-office d'entreprise privée",
    audience: "Administrateurs BabiLoca, équipes de modération et de finance, et équipes opérationnelles pilotant les activités locatives.",
    purpose: "Centraliser les annonces immobilières, les réservations, les utilisateurs, les paiements et les vérifications d'identité dans une seule plateforme intelligente, et donner au personnel un back-office administratif pour suivre les activités, modérer les annonces, gérer les finances et piloter les opérations en temps réel.",
    features: [
      { title: "Registres locatifs centralisés", description: "Les annonces immobilières, les réservations et les comptes utilisateurs sont gérés depuis un espace administratif unique." },
      { title: "Paiements et vérification", description: "Les enregistrements de paiement et les contrôles d'identité soutiennent le suivi financier et des interactions de confiance sur la plateforme." },
      { title: "Modération et suivi d'activité", description: "La modération des annonces et la surveillance des activités gardent les opérations supervisées au fil de l'eau." },
      { title: "Opérations en temps réel", description: "Des tableaux de bord en temps réel donnent aux administrateurs une vue actuelle des réservations, des activités et des opérations financières." },
    ],
    workflow: [
      "Examiner les annonces entrantes et les modérer avant publication.",
      "Suivre les réservations, les comptes utilisateurs et le statut des vérifications d'identité.",
      "Surveiller les paiements et suivre les opérations financières depuis le back-office.",
      "Observer l'activité en direct et piloter les opérations depuis le tableau de bord temps réel.",
    ],
    layers: [
      { name: "Interface", technology: "Next.js · React.js · TypeScript", description: "L'interface administrative est construite comme une application React typée avec Next.js." },
      { name: "Accès aux données", technology: "Axios · TanStack Query · REST API", description: "Les appels REST via Axios sont mis en cache et synchronisés par TanStack Query pour les vues du back-office." },
      { name: "Temps réel", technology: "WebSockets", description: "Les mises à jour en direct maintiennent le suivi d'activité et la surveillance opérationnelle à jour sans rafraîchissement manuel." },
      { name: "État local", technology: "LocalStorage", description: "L'état d'interface sélectionné et les préférences persistent sur l'appareil de l'administrateur." },
    ],
    limitations: [
      "C'est un projet d'entreprise privé ; le code source n'est pas publié et il n'existe pas de démo publique.",
      "Cette page décrit la plateforme à partir du résumé et des captures d'écran approuvés par l'entreprise ; aucune donnée interne n'est affichée.",
      "La disponibilité des fonctionnalités et les détails opérationnels suivent les décisions internes de l'entreprise et peuvent évoluer.",
    ],
  },
  "abidjan-quest": {
    ...caseStudies["abidjan-quest"],
    status: "Plateforme open-source d'exploration géographique du Grand Abidjan",
    audience: "Habitants et visiteurs du Grand Abidjan explorant des lieux, des itinéraires et des missions, ainsi que les développeurs lisant l'architecture documentée.",
    purpose: "Donner à la ville une plateforme web unique de navigation sur carte réelle, d'exploration urbaine et de gamification, construite uniquement sur des services basés sur OpenStreetMap et gardant chaque réponse géographique ancrée dans des données réelles.",
    features: [
      { title: "Carte immersive", description: "Explorer le Grand Abidjan sur une carte MapLibre GL avec tuiles vectorielles OpenFreeMap, bâtiments 3D, position GPS et points d'intérêt filtrables par catégorie." },
      { title: "Itinéraires et découverte", description: "Calculer des itinéraires voiture, vélo et à pied via OSRM, chercher des lieux avec le géocodage Nominatim et parcourir les points d'intérêt issus d'Overpass et de la base PostGIS locale." },
      { title: "Assistant géographique", description: "Demander à un assistant une pharmacie, un maquis ou un itinéraire ; un moteur d'intention déterministe répond depuis les services géo réels, avec une couche LLM optionnelle contrainte." },
      { title: "Gamification et avatars", description: "Accomplir des missions, gagner de l'XP et débloquer des pièces d'avatar ; les visites ne sont validées côté serveur qu'à moins de 150 mètres du lieu, avec délais anti-triche." },
    ],
    workflow: [
      "Ouvrir la carte et laisser la plateforme utiliser ou demander votre position.",
      "Parcourir les catégories ou demander à l'assistant géographique un lieu ou un itinéraire.",
      "Ouvrir un point d'intérêt et lancer un itinéraire vers celui-ci.",
      "Accomplir des missions pour gagner de l'XP et débloquer des pièces d'avatar dans le studio.",
    ],
    layers: [
      { name: "Interface web", technology: "Next.js 15 · React 19 · TypeScript · MapLibre GL", description: "Les pages App Router pour la carte, la découverte, l'assistant et l'avatar, livrées en build Docker standalone et en PWA installable." },
      { name: "Service API", technology: "FastAPI · Pydantic v2 · SQLAlchemy 2 async", description: "Une API Python async typée exposant les endpoints géo, gamification et social sous /api/v1." },
      { name: "Données géospatiales", technology: "PostgreSQL 16 · PostGIS · Alembic", description: "Points d'intérêt, itinéraires, missions et avatars vivent dans des tables PostGIS versionnées avec index spatiaux GiST." },
      { name: "Cache et temps réel", technology: "Redis · WebSockets", description: "Redis met en cache les réponses géo et applique la limitation de débit ; un canal WebSocket pousse notifications et mises à jour de progression." },
    ],
    limitations: [
      "Plateforme de phase 1 : les services publics Nominatim, OSRM et Overpass imposent des quotas d'usage qu'un déploiement en production devrait auto-héberger.",
      "La gamification est opt-in, et la validation des visites (150 mètres, délais, contrôles de vitesse) réduit sans éliminer la triche GPS.",
      "Aucune clé API privée n'est requise côté navigateur ; Mapbox, Google et les fournisseurs LLM restent des mises à niveau optionnelles côté serveur.",
    ],
  },
  "dict-e-app": {
    ...caseStudies["dict-e-app"],
    status: "Application d'apprentissage par la dictée gamifiée",
    audience: "Apprenants francophones pratiquant l'écriture, l'orthographe et la grammaire par la dictée sur Android.",
    purpose: "Transformer la pratique de la dictée en une expérience mobile motivante avec des dictées en synthèse vocale, une correction mot à mot, des indices, des explications grammaticales, de l'XP, des pièces, des séries et une progression par utilisateur.",
    features: [
      { title: "Exercices de dictée", description: "Écouter une dictée lue par la synthèse vocale avec vitesse et tonalité réglables, l'écrire puis soumettre la tentative." },
      { title: "Correction mot à mot", description: "Chaque tentative est notée par comparaison de mots basée sur la distance de Levenshtein, en comptant erreurs et mots corrects pour la précision." },
      { title: "Niveaux et progression", description: "Les dictées sont regroupées en niveaux avec difficulté, XP requise, seuils de déverrouillage et bonus de complétion." },
      { title: "Profil gamifié", description: "Les utilisateurs gagnent XP, pièces et séries ; les statistiques suivent les dictées terminées, la précision moyenne, les meilleures séries et les scores parfaits." },
    ],
    workflow: [
      "Créer un compte ou se connecter à l'application mobile.",
      "Choisir un niveau et une dictée, puis écouter le texte lu.",
      "Écrire la dictée et utiliser les indices disponibles si besoin.",
      "Consulter la correction mot à mot, l'explication grammaticale et l'XP gagnée.",
    ],
    layers: [
      { name: "Application mobile", technology: "Expo 54 · React Native · TypeScript", description: "React Navigation, React Native Paper, Redux Toolkit, retour haptique, graphiques et lecture expo-speech soutiennent le parcours d'apprentissage." },
      { name: "API", technology: "NestJS 11 · Swagger · Socket.IO", description: "Des services modulaires pour l'authentification, les dictées, les niveaux et les utilisateurs, documentés avec Swagger et durcis par Helmet et la limitation de débit." },
      { name: "Données", technology: "Prisma · PostgreSQL", description: "Un schéma versionné modélise utilisateurs, statistiques, niveaux, dictées, tentatives de progression et progression par niveau." },
      { name: "Authentification et correction", technology: "JWT · Passport · fastest-levenshtein", description: "Les jetons JWT d'accès et de rafraîchissement protègent les comptes ; la distance de Levenshtein pilote la correction et la notation mot à mot." },
    ],
    limitations: [
      "Le contenu d'apprentissage est livré avec un jeu de données français de départ ; le projet ne revendique aucune certification pédagogique.",
      "Les statistiques multijoueur sont modélisées en base tandis que le multijoueur en direct dépend de la couche WebSocket.",
      "Le dépôt public documente la stack et le schéma ; la publication sur store et les tests sur appareil physique ne sont pas inclus dans le code.",
    ],
  },
} satisfies { [K in keyof typeof caseStudies]: ProjectCaseStudy };
