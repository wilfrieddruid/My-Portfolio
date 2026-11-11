import evidence from "./project-evidence.json";

export type ProjectCaseStudy = {
  status: string;
  audience: string;
  purpose: string;
  features: readonly { title: string; description: string }[];
  workflow: readonly string[];
  layers: readonly { name: string; technology: string; description: string }[];
  limitations: readonly string[];
  sources: readonly { label: string; url: string }[];
  sourceAvailability: "public" | "private";
  reviewedAt?: string;
};

function sources(slug: keyof typeof evidence) {
  const entry = evidence[slug];
  return entry.documents.map(path => ({
    label: path === "README.md" ? "Project documentation" : path,
    url: `${entry.repo}/blob/${entry.commit}/${path.split("/").map(encodeURIComponent).join("/")}`,
  }));
}

function study(slug: keyof typeof evidence, content: Omit<ProjectCaseStudy, "sources" | "sourceAvailability">): ProjectCaseStudy {
  return { ...content, sources: sources(slug), sourceAvailability: "public", reviewedAt: evidence[slug].checkedAt };
}

export const caseStudies = {
  "odc-portal": {
    status: "Enterprise training and innovation portal",
    audience: "Young people exploring digital careers, applicants to ODC programs, and entrepreneurs looking for support in the Orange Digital Center Côte d’Ivoire ecosystem.",
    purpose: "Promote digital careers through one web platform centralizing training programs, open calls for applications, and entrepreneurial support opportunities, so users can discover the proposed tracks, review admission requirements, and apply to programs of the Orange Digital Center ecosystem.",
    features: [
      { title: "Training programs", description: "Browse the catalog of training programs proposed by the Orange Digital Center ecosystem." },
      { title: "Calls for applications", description: "Follow open calls for applications and review the admission requirements of each program." },
      { title: "Entrepreneurial support", description: "Discover the ecosystem’s entrepreneurial support and coaching opportunities." },
      { title: "Applications", description: "Apply to programs directly from the platform." },
    ],
    workflow: ["Browse the training programs and their proposed tracks.", "Review the admission requirements of the chosen program.", "Apply during the open call for applications.", "Explore entrepreneurial support opportunities across the ecosystem."],
    layers: [
      { name: "Interface", technology: "Vue.js · React.js · TypeScript", description: "The portal interface is built as typed Vue.js and React.js applications." },
      { name: "Data access", technology: "Axios · TanStack Query · REST API", description: "REST calls through Axios are cached and synchronized by TanStack Query for the portal views." },
      { name: "Realtime", technology: "WebSockets", description: "Live updates keep program and application information current without manual refreshes." },
      { name: "Local state", technology: "LocalStorage", description: "Selected interface state and preferences persist on the visitor's device." },
    ],
    limitations: ["This is a private enterprise project; the source code is not published.", "The live platform is operated by the Orange Digital Center Côte d’Ivoire team and evolves with their programs.", "This page describes the platform from the company-approved summary and screenshots; internal data is not shown."],
    sources: [],
    sourceAvailability: "private",
  } satisfies ProjectCaseStudy,
  "babiloca-back-office": {
    status: "Private enterprise back-office platform",
    audience: "BabiLoca administrators, moderation and finance staff, and operations teams running rental activities.",
    purpose: "Centralize property listings, bookings, users, payments, and identity verification in one intelligent platform, and give staff an administrative back-office to track activity, moderate listings, manage finances, and steer operations in real time.",
    features: [
      { title: "Centralized rental records", description: "Property listings, reservations, and user accounts are managed from a single administrative workspace." },
      { title: "Payments and verification", description: "Payment records and identity checks support financial tracking and trusted interactions across the platform." },
      { title: "Moderation and activity tracking", description: "Listing moderation and activity monitoring keep operations supervised as they happen." },
      { title: "Real-time operations", description: "Real-time dashboards give administrators a current view of bookings, activity, and financial operations." },
    ],
    workflow: ["Review incoming listings and moderate them before publication.", "Track reservations, user accounts, and identity verification status.", "Monitor payments and follow financial operations from the back-office.", "Watch live activity and steer operations from the real-time dashboard."],
    layers: [
      { name: "Interface", technology: "Next.js · React.js · TypeScript", description: "The administrative interface is built as a typed React application with Next.js." },
      { name: "Data access", technology: "Axios · TanStack Query · REST API", description: "REST calls through Axios are cached and synchronized by TanStack Query for the back-office views." },
      { name: "Realtime", technology: "WebSockets", description: "Live updates keep activity tracking and operational monitoring current without manual refreshes." },
      { name: "Local state", technology: "LocalStorage", description: "Selected interface state and preferences persist on the administrator's device." },
    ],
    limitations: ["This is a private enterprise project; the source code is not published and there is no public demo.", "This page describes the platform from the company-approved summary and screenshots; internal data is not shown.", "Feature availability and operational details follow the company's internal decisions and may change."],
    sources: [],
    sourceAvailability: "private",
  } satisfies ProjectCaseStudy,
  "abidjan-quest": study("abidjan-quest", {
    status: "Open-source geographic exploration platform for Greater Abidjan",
    audience: "Residents and visitors of Greater Abidjan exploring places, routes, and missions, plus developers reading the documented architecture.",
    purpose: "Give the city one web platform for real-map navigation, urban exploration, and gamification, built only on OpenStreetMap-based services and keeping every geographic answer grounded in real data.",
    features: [
      { title: "Immersive map", description: "Explore Greater Abidjan on a MapLibre GL map with OpenFreeMap vector tiles, 3D buildings, GPS position, and category-filtered points of interest." },
      { title: "Routing and discovery", description: "Compute car, bike, and foot routes through OSRM, search places with Nominatim geocoding, and browse nearby points of interest from Overpass and the local PostGIS database." },
      { title: "Geo assistant", description: "Ask a chat assistant for a pharmacy, a maquis, or an itinerary; a deterministic intent engine answers from real geo services, with an optional constrained LLM layer." },
      { title: "Gamification and avatars", description: "Complete missions, earn XP, and unlock avatar pieces; visits only validate server-side within 150 meters of the place, with anti-cheat cooldowns." },
    ],
    workflow: ["Open the map and let the platform use or ask for your position.", "Browse categories or ask the geo assistant for a place or an itinerary.", "Open a point of interest and launch a route to it.", "Complete missions to earn XP and unlock avatar pieces in the studio."],
    layers: [
      { name: "Web interface", technology: "Next.js 15 · React 19 · TypeScript · MapLibre GL", description: "App Router pages for map, discover, assistant, and avatar, shipped as a standalone Docker build and an installable PWA." },
      { name: "API service", technology: "FastAPI · Pydantic v2 · SQLAlchemy 2 async", description: "A typed async Python API exposing geo, gamification, and social endpoints under /api/v1." },
      { name: "Geospatial data", technology: "PostgreSQL 16 · PostGIS · Alembic", description: "Points of interest, routes, missions, and avatars live in versioned PostGIS tables with GiST spatial indexes." },
      { name: "Cache and realtime", technology: "Redis · WebSockets", description: "Redis caches geo responses and applies rate limits; a WebSocket channel pushes notifications and progress updates." },
    ],
    limitations: ["Phase 1 platform: public Nominatim, OSRM, and Overpass services set usage quotas that a production deployment would need to self-host.", "Gamification is opt-in, and visit validation (150 meters, cooldowns, speed checks) reduces but does not eliminate GPS spoofing.", "No private API key is required in the browser; Mapbox, Google, and LLM providers remain optional server-side upgrades."],
  }),
  "dict-e-app": study("dict-e-app", {
    status: "Gamified dictation learning application",
    audience: "French-speaking learners practicing dictation writing, spelling, and grammar on Android.",
    purpose: "Turn dictation practice into a motivating mobile experience with text-to-speech dictations, word-by-word correction, hints, grammar explanations, XP, coins, streaks, and per-user progression.",
    features: [
      { title: "Dictation exercises", description: "Listen to a dictation read by text-to-speech with adjustable speed and pitch, write it down, and submit the attempt." },
      { title: "Word-by-word correction", description: "Each attempt is scored with Levenshtein-based word comparison, counting errors and correct words for the accuracy metric." },
      { title: "Levels and progression", description: "Dictations are grouped into levels with difficulty, XP requirements, unlock thresholds, and completion bonuses." },
      { title: "Gamified profile", description: "Users earn XP, coins, and streaks; statistics track completed dictations, average accuracy, best streaks, and perfect scores." },
    ],
    workflow: ["Register or log in to the mobile app.", "Pick a level and a dictation, then listen to the spoken text.", "Write the dictation and use the available hints when needed.", "Review the word-by-word correction, grammar explanation, and XP earned."],
    layers: [
      { name: "Mobile app", technology: "Expo 54 · React Native · TypeScript", description: "React Navigation, React Native Paper, Redux Toolkit, haptics, charts, and expo-speech playback support the learner workflow." },
      { name: "API", technology: "NestJS 11 · Swagger · Socket.IO", description: "Modular services for auth, dictations, levels, and users, documented with Swagger and hardened with Helmet and rate limiting." },
      { name: "Data", technology: "Prisma · PostgreSQL", description: "A versioned schema models users, statistics, levels, dictations, progress attempts, and per-level progression." },
      { name: "Auth and correction", technology: "JWT · Passport · fastest-levenshtein", description: "JWT access and refresh tokens protect accounts; Levenshtein distance drives word-level correction and scoring." },
    ],
    limitations: ["Learning content ships with a starter French dataset; the project claims no pedagogical certification.", "Multiplayer statistics are modeled in the database while live multiplayer depends on the WebSocket layer.", "The public repository documents the stack and schema; store publication and physical-device testing are not included in the code."],
  }),
} as const;
