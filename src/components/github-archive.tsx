"use client";

import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import type { ArchiveProject } from "@/data/portfolio";
import { useLang } from "@/lib/use-lang";

type GithubArchiveProps = {
  projects: readonly ArchiveProject[];
  allProjects: readonly ArchiveProject[];
};

const posterPixels = Array.from({ length: 28 }, (_, index) => index);

export function GithubArchive({ projects, allProjects }: GithubArchiveProps) {
  const { t } = useLang();
  return (
    <section className="github-archive" aria-labelledby="github-archive-title">
      <header className="github-archive__header">
        <div className="github-archive__marker">
          <span>{t.archive.marker}</span>
          <small>{t.archive.markerSmall}</small>
        </div>
        <div className="github-archive__title">
          <p className="eyebrow">{t.archive.eyebrow}</p>
          <h3 id="github-archive-title">{t.archive.title}</h3>
        </div>
        <p className="github-archive__intro">{t.archive.intro}</p>
        <div className="github-archive__count" aria-label={t.archive.countAria(projects.length)}>
          <strong>{String(projects.length).padStart(2, "0")}</strong>
          <span>{t.archive.additionalProjects}</span>
        </div>
      </header>

      <ol className="github-archive__grid">
        {projects.map((project, index) => {
          const number = String(allProjects.findIndex((entry) => entry.repo === project.repo) + 1).padStart(2, "0");

          return (
            <li className={`archive-card archive-card--${project.tone}`} key={project.repo}>
              <article>
                <div
                  className={`archive-poster archive-poster--pattern-${(index % 4) + 1}`}
                  aria-hidden="true"
                >
                  <div className="archive-poster__meta">
                    <span>GH / {number}</span>
                    <span>{project.live ? t.archive.liveBuild : t.archive.sourceBuild}</span>
                  </div>
                  <div className="archive-poster__matrix">
                    {posterPixels.map((pixel) => <i key={pixel} />)}
                  </div>
                  <strong>{project.code}</strong>
                  <span className="archive-poster__signal">{t.archive.pixelSystem}</span>
                </div>

                <div className="archive-card__body">
                  <div className="archive-card__heading">
                    <span className="archive-card__number">{number}</span>
                    <div>
                      <p>{t.archive.ghBuild(t.projects.categories[project.category])}</p>
                      <h4>{project.title}</h4>
                    </div>
                  </div>

                  <p className="archive-card__summary">{project.summary}</p>
                  {project.note ? <p className="archive-card__note">{project.note}</p> : null}

                  <ul className="archive-card__stack" aria-label={t.projects.stackAria(project.title)}>
                    {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>

                  <div className="archive-card__links">
                    <Link href={`/projects/${project.slug}`} aria-label={t.projects.viewDetailsAria(project.title)}>
                      {t.projects.viewDetails} <ArrowUpRight aria-hidden="true" />
                    </Link>
                    <a href={project.repo} target="_blank" rel="noreferrer" aria-label={t.projects.sourceAria(project.title)}>
                      <Github aria-hidden="true" />
                      {t.projects.source}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                    {project.live ? (
                      <a href={project.live} target="_blank" rel="noreferrer" aria-label={t.projects.liveAria(project.title)}>
                        {t.projects.liveProject}
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
