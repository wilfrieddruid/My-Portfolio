"use client";

import { ArrowUp, ArrowUpRight, Github, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { GeometricGrid } from "@/components/geometric-grid";
import { portfolio } from "@/data/portfolio";
import { useLang } from "@/lib/use-lang";
import { useLocalizedPortfolio } from "@/lib/use-localized-portfolio";

export function ContactSection() {
  const { t } = useLang();
  const { contact } = useLocalizedPortfolio();

  return (
    <footer className="contact-section" id="contact">
      <GeometricGrid className="contact-section__grid" textSelector=".contact-section__inner" intensity={0.65} />
      <div className="contact-section__inner">
        <div className="contact-section__heading">
          <div className="contact-section__label">
            <span>06</span>
            <div>
              <p className="eyebrow">{contact.eyebrow}</p>
            </div>
          </div>
          {contact.body ? <p>{contact.body}</p> : null}
        </div>

        <h2>
          <span>{contact.title}</span>
          <strong>{contact.titleAccent}</strong>
        </h2>

        <div>
          <ContactForm email={portfolio.identity.email} formId={process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim()} captchaSiteKey={process.env.NEXT_PUBLIC_FORMSPREE_RECAPTCHA_SITE_KEY?.trim()} />
        </div>

        <div className="footer-row">
          <span>© 2026 {portfolio.identity.fullName}</span>
          <a href={portfolio.identity.phoneHref} aria-label={t.contact.phoneAria}>
            <Phone aria-hidden="true" /> {portfolio.identity.phone}
          </a>
          <a href={portfolio.socials.github} target="_blank" rel="noreferrer">
            <Github aria-hidden="true" /> GitHub <ArrowUpRight aria-hidden="true" />
          </a>
          <a href="#top">{t.contact.backToTop} <ArrowUp aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
