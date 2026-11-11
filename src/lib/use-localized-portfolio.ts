"use client";

import { useMemo } from "react";
import { portfolio, type About, type ArchiveProject, type Contact, type Experience, type Project, type Skill } from "@/data/portfolio";
import {
  aboutFr,
  archiveProjectsFr,
  contactFr,
  experiencesFr,
  projectsFr,
  skillsFr,
} from "@/data/portfolio-fr";
import { caseStudies, type ProjectCaseStudy } from "@/data/case-studies";
import { caseStudiesFr } from "@/data/case-studies-fr";
import { useLang } from "@/lib/use-lang";
import type { Lang } from "@/lib/i18n";

export type LocalizedPortfolio = {
  readonly identity: typeof portfolio.identity;
  readonly navigation: typeof portfolio.navigation;
  readonly socials: typeof portfolio.socials;
  readonly experiences: readonly Experience[];
  readonly projects: readonly Project[];
  readonly archiveProjects: readonly ArchiveProject[];
  readonly skills: readonly Skill[];
  readonly about: About;
  readonly contact: Contact;
};

const englishCaseStudies: Record<string, ProjectCaseStudy> = caseStudies;

function localizedPortfolio(lang: Lang): LocalizedPortfolio {
  if (lang === "en") {
    return {
      identity: portfolio.identity,
      navigation: portfolio.navigation,
      socials: portfolio.socials,
      experiences: portfolio.experiences as readonly Experience[],
      projects: portfolio.projects as readonly Project[],
      archiveProjects: portfolio.archiveProjects as readonly ArchiveProject[],
      skills: portfolio.skills as readonly Skill[],
      about: portfolio.about as About,
      contact: portfolio.contact as Contact,
    };
  }

  return {
    identity: portfolio.identity,
    navigation: portfolio.navigation,
    socials: portfolio.socials,
    experiences: portfolio.experiences.map((experience) => ({
      ...experience,
      ...(experiencesFr[experience.organization] ?? {}),
    })),
    projects: portfolio.projects.map((project) => ({
      ...project,
      ...(projectsFr[project.slug] ?? {}),
    })),
    archiveProjects: portfolio.archiveProjects.map((project) => ({
      ...project,
      ...(archiveProjectsFr[project.slug] ?? {}),
    })),
    skills: portfolio.skills.map((skill) => ({
      ...skill,
      ...(skillsFr[skill.name] ?? {}),
    })),
    about: { ...portfolio.about, ...aboutFr },
    contact: { ...portfolio.contact, ...contactFr },
  };
}

export function useLocalizedPortfolio(): LocalizedPortfolio {
  const { lang } = useLang();
  return useMemo(() => localizedPortfolio(lang), [lang]);
}

export function useLocalizedCaseStudies(): Record<string, ProjectCaseStudy> {
  const { lang } = useLang();
  return lang === "fr" ? caseStudiesFr : englishCaseStudies;
}
