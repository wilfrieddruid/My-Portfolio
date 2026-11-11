import { caseStudies, type ProjectCaseStudy } from "./case-studies";

/**
 * Portfolio content lives here on purpose.
 * Edit these values, duplicate a project/skill object, or swap an image path
 * without touching the page layout.
 */

export const projectCategories = [
  "All",
  "Business",
  "Community",
  "Research",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectVisual =
  | {
      kind: "image";
      src: string;
      alt: string;
      fit?: "cover" | "contain";
      tone?: "institution" | "product" | "agriculture";
    }
  | {
      kind: "interface";
      label: string;
      detail: string;
      tone: "signal" | "market";
    };

export type Project = {
  slug: string;
  caseStudy: ProjectCaseStudy;
  title: string;
  eyebrow: string;
  category: Exclude<ProjectCategory, "All">;
  featured: boolean;
  spotlight?: boolean;
  summary: string;
  searchTerms?: readonly string[];
  note?: string;
  stack: readonly string[];
  repo?: string;
  live?: string;
  visual: ProjectVisual;
};

export type ArchiveProject = {
  slug: string;
  caseStudy: ProjectCaseStudy;
  title: string;
  code: string;
  category: Exclude<ProjectCategory, "All">;
  summary: string;
  searchTerms?: readonly string[];
  note?: string;
  stack: readonly string[];
  repo: string;
  live?: string;
  tone: "ruby" | "research" | "field" | "loyalty" | "local" | "hardware" | "hospitality";
};

export type Experience = {
  organization: string;
  shortOrganization: string;
  role: string;
  period: string;
  summary: string;
  privacyNote: string;
  logo: string;
  modules: readonly string[];
};

export type AboutPrinciple = { number: string; title: string; text: string };

export type About = {
  body: string;
  closing: string;
  principles: readonly AboutPrinciple[];
};

export type Contact = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  body?: string;
};

export type SkillIcon =
  | "react"
  | "typescript"
  | "nextjs"
  | "tailwind"
  | "node"
  | "python"
  | "fastapi"
  | "laravel"
  | "php"
  | "supabase"
  | "database"
  | "git"
  | "github"
  | "vercel"
  | "arduino";

export type Skill = {
  name: string;
  icon: SkillIcon;
  color: string;
  note: string;
};

export const portfolio = {
  identity: {
    fullName: "Ange Wilfried Druid",
    shortName: "Wilfried Druid",
    initials: ">_",
    role: "Full Stack Developer & Designer",
    email: "wilfrieddruid@gmail.com",
    phone: "+225 07 58 90 80 29",
    phoneHref: "tel:+2250758908029",
    headline: "Building digital solutions. Turning ideas into reality.",
    intro:
      "I'm Wilfried, a Full Stack Developer and Designer specializing in web and mobile application development. I build modern, scalable and secure digital solutions, combining frontend engineering, backend architecture, database management and user-centered design.",
    portrait: "/images/profile.webp",
    cv: "/cv/CV-Wilfried-Druid.pdf",
  },
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  socials: {
    github: "https://github.com/wilfrieddruid",
  },
  experiences: [
  {
    organization: "Orange Digital Center",
    shortOrganization: "Orange · Abidjan",
    role: "Full Stack Developer",
    period: "April 2025 — April 2026",
    summary:
      "Contributed to the development of web and mobile applications, API integrations and connected digital solutions.",
    privacyNote:
      "Development activities across collaborative software projects.",
    logo: "/images/orange-digital-center.webp",
    modules: [
      "Web application development",
      "Backend and REST API development",
      "Mobile application development",
      "Database design and management",
      "IoT solutions and system integration",
    ],
  },
  {
    organization: "Société Générale African Business Services",
    shortOrganization: "Société Générale · Abidjan",
    role: "Software Tester",
    period: "July 2026 — Present",
    summary:
      "Participate in functional and integration testing of banking applications, financial message validation and quality assurance activities.",
    privacyNote:
      "Confidential banking information and internal transaction data are not disclosed.",
    logo: "/images/societe-generale-cote-divoire.png",
    modules: [
      "Functional and integration testing",
      "ISO 20022 message validation",
      "PACS.008, PACS.009 and PACS.002 verification",
      "CAMT.056 message processing",
      "Anomaly identification and tracking",
    ],
  },
],


  projects: [
    {
      title: "BabiLoca Back-Office",
      slug: "babiloca-back-office",
      searchTerms: ["BabiLoca", "Back-office", "back office", "rental management", "locative"],
      caseStudy: caseStudies["babiloca-back-office"],
      eyebrow: "Rental management · back-office",
      category: "Business",
      featured: true,
      summary:
        "An intelligent rental management platform centralizing property listings, bookings, users, payments, and identity verification, with an administrative back-office for activity tracking, listing moderation, financial management, and real-time operations.",
      note: "A private enterprise project. The source code and a public demo are not available for now; this page presents the company-approved summary and assets.",
      stack: ["Next.js", "React.js", "TypeScript", "Axios", "TanStack Query", "REST API", "WebSockets", "LocalStorage"],
      visual: {
        kind: "image",
        src: "/images/BabiLoca_Back-office.png",
        alt: "BabiLoca back-office rental management dashboard",
        fit: "cover",
        tone: "product",
      },
    },
    {
      title: "Orange Digital Center Portal",
      slug: "odc-portal",
      searchTerms: ["Orange Digital Center", "ODC", "portail", "formation", "innovation", "entrepreneuriat"],
      caseStudy: caseStudies["odc-portal"],
      eyebrow: "Digital training & innovation · web platform",
      category: "Business",
      featured: true,
      summary:
        "A web platform promoting digital careers, centralizing training programs, open calls for applications, and entrepreneurial support opportunities. Users can discover the proposed tracks, review admission requirements, and apply to programs across the Orange Digital Center ecosystem.",
      note: "An enterprise project for the Orange Digital Center Côte d’Ivoire ecosystem. The source code is not published; the live platform is operated by the ODC team.",
      stack: ["Vue.js", "React.js", "TypeScript", "Axios", "TanStack Query", "REST API", "WebSockets", "LocalStorage"],
      live: "https://portail.odc.ci/",
      visual: {
        kind: "image",
        src: "/images/odc-portal.png",
        alt: "Orange Digital Center training and innovation portal",
        fit: "cover",
        tone: "product",
      },
    },
  ] satisfies readonly Project[],
  archiveProjects: [
    {
      title: "Abidjan Quest",
      slug: "abidjan-quest",
      searchTerms: ["Abidjan", "Quest", "Abidjan Quest", "carte", "exploration", "gamification", "OSM", "MapLibre"],
      caseStudy: caseStudies["abidjan-quest"],
      code: "AQ",
      category: "Community",
      summary:
        "A geographic navigation, urban exploration, and gamification web platform for Greater Abidjan, built on real OpenStreetMap data with MapLibre maps, OSRM routing, a geo assistant, and server-validated XP.",
      note: "An open-source monorepo: a Next.js 15 web app and a FastAPI service with PostGIS, Redis, and Docker Compose. Phase 1 platform; gamification is opt-in and visits are validated server-side.",
      stack: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "PostGIS", "Redis", "Docker"],
      repo: "https://github.com/wilfrieddruid/Abidjan-Quest",
      tone: "field",
    },
    {
      title: "Dict-e-App",
      slug: "dict-e-app",
      searchTerms: ["Dictée", "Dict e App", "dictation", "apprentissage", "Expo", "NestJS", "gamification"],
      caseStudy: caseStudies["dict-e-app"],
      code: "DA",
      category: "Community",
      summary:
        "A gamified dictation learning app for Android with text-to-speech exercises, word-by-word correction, hints, grammar explanations, levels, XP, coins, and streaks, backed by a NestJS API with Prisma and PostgreSQL.",
      note: "An open-source monorepo: an Expo/React Native mobile app and a NestJS backend with JWT auth, Swagger docs, and WebSocket support. French-first learning content with per-user progress statistics.",
      stack: ["React Native", "Expo", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "Socket.IO"],
      repo: "https://github.com/wilfrieddruid/Dict-e-App",
      tone: "local",
    },
  ] satisfies readonly ArchiveProject[],
  skills: [
    { name: "React", icon: "react", color: "#61dafb", note: "Interfaces and reusable systems" },
    { name: "TypeScript", icon: "typescript", color: "#4f9cf9", note: "Safer application code" },
    { name: "Next.js", icon: "nextjs", color: "#f5f5f0", note: "Full-stack React apps" },
    { name: "Tailwind", icon: "tailwind", color: "#38bdf8", note: "Fast, consistent UI work" },
    { name: "Node.js", icon: "node", color: "#75b85a", note: "APIs and tooling" },
    { name: "Python", icon: "python", color: "#f3cb4d", note: "Automation, OCR, and APIs" },
    { name: "FastAPI", icon: "fastapi", color: "#37d3ae", note: "Typed Python services" },
    { name: "Supabase", icon: "supabase", color: "#4be39c", note: "Data, auth, and realtime" },
    { name: "Databases", icon: "database", color: "#d6fa63", note: "Relational data modeling" },
    { name: "Git", icon: "git", color: "#f06a4b", note: "Everyday version control" },
    { name: "GitHub", icon: "github", color: "#f2f2ed", note: "Collaboration and shipping" },
    { name: "Vercel", icon: "vercel", color: "#f5f5f0", note: "Web deployment" },
  ] satisfies readonly Skill[],
  about: {
    body:
      "I enjoy building end-to-end applications that combine technical thinking, user experience, and creativity. From interface design to backend architecture, APIs, and databases, I strive to create solutions that are useful, scalable, and reliable. For me, every project is an opportunity to turn a real-world need into a seamless digital experience.",
    closing:
      "I’m early in my career and looking for software engineering opportunities where I can learn from a team, contribute to interfaces, APIs, databases, and testing, and keep building useful things.",
    principles: [
      { number: "01", title: "Start with the workflow", text: "Understand what someone is already doing before changing the screen." },
      { number: "02", title: "Make the state obvious", text: "Use plain language, clear feedback, and data people can verify." },
      { number: "03", title: "Be honest about the prototype", text: "Show what works, say what does not, and protect the context around the data." },
    ],
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Have something",
    titleAccent: "useful in mind?",
    // body: "I’m open to early-career software engineering roles, collaborations, and conversations about practical software. I’m looking for a team where I can contribute and keep learning.",
  },
} as const;

export const allProjects: readonly (Project | ArchiveProject)[] = [...portfolio.projects, ...portfolio.archiveProjects];

export function getProjectBySlug(slug: string) {
  return allProjects.find(project => project.slug === slug);
}
