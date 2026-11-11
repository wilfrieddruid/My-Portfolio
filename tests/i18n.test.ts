import assert from "node:assert/strict";
import { test } from "node:test";
import { dictionaries } from "../src/lib/i18n";
import { portfolio } from "../src/data/portfolio";
import { caseStudies, type ProjectCaseStudy } from "../src/data/case-studies";
import { caseStudiesFr } from "../src/data/case-studies-fr";
import {
  aboutFr,
  archiveProjectsFr,
  contactFr,
  experiencesFr,
  projectsFr,
  skillsFr,
} from "../src/data/portfolio-fr";

function collectKeys(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return [prefix];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    collectKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

test("english and french dictionaries expose the same keys", () => {
  const english = collectKeys(dictionaries.en).sort();
  const french = collectKeys(dictionaries.fr).sort();
  assert.deepEqual(french, english);
});

test("french dictionary leaves are non-empty strings or functions", () => {
  const leaves = Object.entries(dictionaries.fr).flatMap(([, section]) =>
    Object.values(section as Record<string, unknown>),
  );
  for (const leaf of leaves) {
    if (typeof leaf === "string") assert.ok(leaf.trim().length > 0);
  }
});

test("every project category used in data is translated in both languages", () => {
  const categories = new Set<string>(portfolio.projects.map((project) => project.category));
  for (const project of portfolio.archiveProjects) categories.add(project.category);
  for (const lang of ["en", "fr"] as const) {
    const translated = dictionaries[lang].projects.categories;
    for (const category of categories) {
      assert.ok(
        typeof translated[category as keyof typeof translated] === "string",
        `${lang} is missing category ${category}`,
      );
    }
  }
});

test("french portfolio overlays cover every english entry", () => {
  for (const experience of portfolio.experiences) {
    assert.ok(experiencesFr[experience.organization], `missing FR experience: ${experience.organization}`);
  }
  for (const project of portfolio.projects) {
    assert.ok(projectsFr[project.slug], `missing FR project: ${project.slug}`);
  }
  for (const project of portfolio.archiveProjects) {
    assert.ok(archiveProjectsFr[project.slug], `missing FR archive project: ${project.slug}`);
  }
  for (const skill of portfolio.skills) {
    assert.ok(skillsFr[skill.name], `missing FR skill: ${skill.name}`);
  }
  assert.ok(aboutFr.body && aboutFr.closing && aboutFr.principles.length > 0);
  assert.ok(contactFr.eyebrow && contactFr.title);
});

test("french case studies cover every english study and keep shared fields identical", () => {
  const english: Record<string, ProjectCaseStudy> = caseStudies;
  for (const [slug, study] of Object.entries(english)) {
    const french = caseStudiesFr[slug];
    assert.ok(french, `missing FR case study: ${slug}`);
    assert.equal(french.sourceAvailability, study.sourceAvailability);
    assert.equal(french.reviewedAt, study.reviewedAt);
    assert.deepEqual(
      french.sources.map((source) => source.url),
      study.sources.map((source) => source.url),
      `${slug} sources must match between languages`,
    );
    assert.ok(french.purpose && french.audience);
    assert.equal(french.features.length, study.features.length);
    assert.equal(french.workflow.length, study.workflow.length);
    assert.equal(french.layers.length, study.layers.length);
    assert.equal(french.limitations.length, study.limitations.length);
  }
});
