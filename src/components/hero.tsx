"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { GeometricGrid } from "@/components/geometric-grid";
import { useLang } from "@/lib/use-lang";
import profilePortrait from "../../public/images/Portrait.png";

type HeroProps = {
  identity: { fullName: string; role: string; email: string; headline: string; intro: string; cv: string };
  projectCount: number;
};

export function Hero({ identity, projectCount }: HeroProps) {
  const { t } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const sunOffset = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const sunY = useSpring(sunOffset, { stiffness: 100, damping: 28 });

  return (
    <section className="folio-hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
      <GeometricGrid className="folio-hero__grid" textSelector=".folio-hero__copy > :not(h1)" />
      <div className="folio-hero__edition">
        <span>{t.hero.edition}</span>
        <span className="folio-hero__year">© 2026</span>
      </div>
      <div className="folio-hero__layout">
        <div className="folio-hero__copy">
          <div className="folio-hero__greeting">{t.hero.greeting}</div>
          <h1 id="hero-title" aria-label={identity.fullName}>
            <span className="folio-hero__name" aria-hidden="true">Wilfried</span>
            <span className="folio-hero__name folio-hero__name--accent" aria-hidden="true">Druid<span className="folio-hero__period">.</span></span>
          </h1>
          <p className="folio-hero__role"><span className="folio-hero__dash" aria-hidden="true" /> {t.hero.role}</p>
          <p className="folio-hero__headline">{t.hero.headline}</p>
          <p className="folio-hero__intro">{t.hero.intro}</p>
          <div className="folio-hero__actions">
            <a className="button button--primary" href={identity.cv} download>{t.hero.cv} <Download aria-hidden="true" /></a>
            <a className="button button--quiet" href="#contact">{t.hero.talk} <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <div className="folio-art">
          <m.div className="folio-art__sun" style={{ y: reduceMotion ? 0 : sunY }} aria-hidden="true" />
          <span className="folio-art__vertical" aria-hidden="true">{t.hero.vertical}</span>
          <figure className="folio-art__portrait">
            <div className="folio-art__photo">
              <div className="folio-art__image-wrap">
                <Image src={profilePortrait} alt={t.hero.portraitAlt(identity.fullName)} preload placeholder="blur" sizes="(max-width: 600px) 68vw, (max-width: 1000px) 38vw, 360px" />
                <span className="folio-art__shutter folio-art__shutter--left" aria-hidden="true" />
                <span className="folio-art__shutter folio-art__shutter--right" aria-hidden="true" />
              </div>
              <span className="folio-art__seal" aria-hidden="true"><span>&gt;_</span><small>{t.hero.seal}</small></span>
            </div>
            <figcaption><span>Wilfried Druid</span><span>{t.hero.caption}</span></figcaption>
          </figure>
          <div className="folio-art__caption"><span>{t.hero.keepRefining}</span><span>{t.hero.learn[0]}<br />{t.hero.learn[1]}</span></div>
        </div>
      </div>
      <div className="folio-hero__footer">
        <a href="#work">{String(projectCount).padStart(2, "0")} {t.hero.projects} <ArrowDown aria-hidden="true" /></a>
        <span className="folio-hero__craft">{t.hero.craft}</span>
      </div>
    </section>
  );
}