"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/use-lang";
import "./intro-splash.css";

// Stays true during client-side navigation, so the intro only plays on a full page load.
let introPlayed = false;

export function IntroSplash({ name }: { name: string }) {
  const { t } = useLang();
  const [visible, setVisible] = useState(() => !introPlayed);

  useEffect(() => {
    if (!visible) return;
    introPlayed = true;
    // With reduced motion the CSS hides the intro, so the page is never locked.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="intro"
      role="status"
      aria-label={name}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setVisible(false);
      }}
    >
      <div className="intro__stage" aria-hidden="true">
        <span className="intro__logo">&gt;_</span>
        <div className="intro__text">
          <div className="intro__lines">
            <span className="intro__line intro__name">
              <span className="intro__type">{name}</span>
            </span>
            <span className="intro__line intro__role">
              <span className="intro__type">{t.header.role}</span>
            </span>
          </div>
        </div>
      </div>
      <span className="intro__bar" aria-hidden="true" />
    </div>
  );
}