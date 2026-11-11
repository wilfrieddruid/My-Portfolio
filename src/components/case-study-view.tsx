"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, Layers, LockKeyhole } from "lucide-react";
import { useMemo } from "react";
import { getProjectBySlug } from "@/data/portfolio";
import { useLang } from "@/lib/use-lang";
import { useLocalizedCaseStudies } from "@/lib/use-localized-portfolio";

const sectionIds = ["overview", "features", "workflow", "technical-layers", "limitations", "evidence"] as const;

export function CaseStudyView({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const studies = useLocalizedCaseStudies();
  const project = getProjectBySlug(slug);
  const study = useMemo(() => studies[slug] ?? project?.caseStudy, [studies, slug, project]);
  const reviewedFormatter = useMemo(() => new Intl.DateTimeFormat(lang, {
    month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  }), [lang]);

  if (!project || !study) return null;

  const image = "visual" in project && project.visual.kind === "image" ? project.visual : undefined;
  const category = t.projects.categories[project.category];
  const sectionLabels = [
    t.caseStudy.sections.overview,
    t.caseStudy.sections.features,
    t.caseStudy.sections.workflow,
    t.caseStudy.sections.layers,
    t.caseStudy.sections.limitations,
    t.caseStudy.sections.evidence,
  ];

  return (
    <main className="case-study" id="main-content">
      <Link className="case-study__back" href="/#work"><ArrowLeft aria-hidden="true" />{t.caseStudy.back}</Link>
      <header className="case-study__hero">
        <p className="eyebrow">{t.caseStudy.eyebrow(category)}</p>
        <h1>{project.title}</h1>
        <p className="case-study__summary">{project.summary}</p>
        <p className="case-study__status">{study.status}</p>
        <ul className="case-study__stack" aria-label={t.caseStudy.technologies}>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
        <div className="case-study__links">
          {study.sourceAvailability === "public" && project.repo ? <a href={project.repo} target="_blank" rel="noreferrer"><Github aria-hidden="true" />{t.caseStudy.sourceOnGithub}<ArrowUpRight aria-hidden="true" /></a> : <span><LockKeyhole aria-hidden="true" />{t.caseStudy.privateRepository}</span>}
          {"live" in project && project.live ? <a href={project.live} target="_blank" rel="noreferrer">{t.caseStudy.openDemo}<ArrowUpRight aria-hidden="true" /></a> : null}
        </div>
      </header>
      {image ? (
        <figure className={`case-study__image case-study__image--${image.fit ?? "cover"}`}>
          <div><Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 92vw, 1040px" /></div>
          <figcaption>{image.alt}</figcaption>
        </figure>
      ) : null}
      <div className="case-study__layout">
        <nav className="case-study__contents" aria-label={t.caseStudy.contents}>
          <span>{t.caseStudy.contents}</span>
          {sectionLabels.map((title, index) => <a href={`#${sectionIds[index]}`} key={sectionIds[index]}><small>{String(index + 1).padStart(2, "0")}</small>{title}</a>)}
        </nav>
        <div className="case-study__sections">
          <section id={sectionIds[0]} aria-labelledby="overview-title">
            <p className="eyebrow">01 / {t.caseStudy.sections.overview}</p><h2 id="overview-title">{t.caseStudy.overviewTitle}</h2>
            <p>{study.purpose}</p>
            <div className="case-study__audience"><strong>{t.caseStudy.whoItServes}</strong><p>{study.audience}</p></div>
          </section>
          <section id={sectionIds[1]} aria-labelledby="features-title">
            <p className="eyebrow">02 / {t.caseStudy.sections.features}</p><h2 id="features-title">{t.caseStudy.featuresTitle}</h2>
            <div className="case-study__features">{study.features.map(feature => <article key={feature.title}><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
          </section>
          <section id={sectionIds[2]} aria-labelledby="workflow-title">
            <p className="eyebrow">03 / {t.caseStudy.sections.workflow}</p><h2 id="workflow-title">{t.caseStudy.workflowTitle}</h2>
            <ol className="case-study__workflow">{study.workflow.map((step, index) => <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
          </section>
          <section id={sectionIds[3]} aria-labelledby="layers-title">
            <p className="eyebrow">04 / {t.caseStudy.sections.layers}</p><h2 id="layers-title">{t.caseStudy.layersTitle}</h2>
            <div className="case-study__layers">{study.layers.map(layer => <article key={layer.name}><Layers aria-hidden="true" /><span className="eyebrow">{layer.name}</span><h3>{layer.technology}</h3><p>{layer.description}</p></article>)}</div>
          </section>
          <section id={sectionIds[4]} aria-labelledby="limitations-title">
            <p className="eyebrow">05 / {t.caseStudy.sections.limitations}</p><h2 id="limitations-title">{t.caseStudy.limitationsTitle}</h2>
            <ul className="case-study__limitations">{study.limitations.map(item => <li key={item}>{item}</li>)}</ul>
          </section>
          <section id={sectionIds[5]} aria-labelledby="evidence-title">
            <p className="eyebrow">06 / {t.caseStudy.sections.evidence}</p><h2 id="evidence-title">{t.caseStudy.evidenceTitle}</h2>
            {study.sources.length ? <><p>{t.caseStudy.reviewedIntro(study.reviewedAt ? reviewedFormatter.format(new Date(`${study.reviewedAt}T00:00:00Z`)) : t.caseStudy.reviewedFallback)}</p><ul className="case-study__sources">{study.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ArrowUpRight aria-hidden="true" /></a></li>)}</ul></> : <p>{t.caseStudy.privateNote}</p>}
          </section>
        </div>
      </div>
      <footer className="case-study__footer"><Link href="/#work"><ArrowLeft aria-hidden="true" />{t.caseStudy.exploreMore}</Link><Link href="/#contact">{t.caseStudy.sendMessage}<ArrowUpRight aria-hidden="true" /></Link></footer>
    </main>
  );
}
