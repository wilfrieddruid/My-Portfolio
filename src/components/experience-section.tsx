"use client";

import Image from "next/image";
import {
  Building2,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { useLang } from "@/lib/use-lang";
import { useLocalizedPortfolio } from "@/lib/use-localized-portfolio";

export function ExperienceSection() {
  const { t } = useLang();
  const { experiences } = useLocalizedPortfolio();

  const validExperiences = (experiences ?? []).filter(
    (item): item is NonNullable<typeof item> =>
      Boolean(item && item.organization && item.logo)
  );

  return (
    <section
      className="page-section experience-section"
      id="experience"
    >
      <SectionHeading
        index="02"
        eyebrow={t.experience.eyebrow}
        title={t.experience.title}
        description={t.experience.description}
      />

      {validExperiences.map((item, index) => (
        <div
          className="experience-layout"
          key={`${item.organization}-${index}`}
        >
          <div className="experience-identity">
            <div className="experience-identity__logo">
              <Image
                src={item.logo}
                alt={t.experience.logoAlt(item.organization)}
                width={160}
                height={160}
                sizes="112px"
                style={{ objectFit: "contain" }}
              />
            </div>

            <div>
              <p className="eyebrow">
                {item.role}
              </p>

              <h3>
                {item.organization}
              </h3>

              <div className="experience-meta">
                <span>
                  <Building2 aria-hidden="true" />
                  {item.shortOrganization}
                </span>

                <span>
                  <CalendarDays aria-hidden="true" />
                  {item.period}
                </span>
              </div>
            </div>
          </div>

          <div className="experience-body">
            <p className="experience-body__summary">
              {item.summary}
            </p>

            <ol
              className="module-list"
              aria-label={t.experience.responsibilitiesAria(item.organization)}
            >
              {item.modules.map((module, moduleIndex) => (
                <li key={`${index}-${moduleIndex}`}>
                  <span>
                    {String(moduleIndex + 1).padStart(2, "0")}
                  </span>

                  <strong>
                    {module}
                  </strong>
                </li>
              ))}
            </ol>

            <p className="privacy-note">
              <ShieldCheck aria-hidden="true" />

              <span>
                {item.privacyNote}
              </span>
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
