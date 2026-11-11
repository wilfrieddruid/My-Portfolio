"use client";

import { ArrowDownRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { useLang } from "@/lib/use-lang";
import { useLocalizedPortfolio } from "@/lib/use-localized-portfolio";

export function AboutSection() {
  const { t } = useLang();
  const { about } = useLocalizedPortfolio();

  return (
    <section className="page-section about-section" id="about">
      <SectionHeading
        index="05"
        eyebrow={t.about.eyebrow}
        title={t.about.title}
      />
      <div className="about-grid">
        <div className="about-copy">
          <ArrowDownRight className="about-copy__arrow" aria-hidden="true" />
          <p className="about-copy__lead">{about.body}</p>
          <p className="about-copy__closing">{about.closing}</p>
          <span className="about-copy__signature" aria-hidden="true">{t.about.signature}</span>
        </div>
        <div className="principles-list" aria-label={t.about.principlesAria}>
          {about.principles.map((principle) => (
            <article key={principle.number}>
              <span className="principles-list__number">{principle.number}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
