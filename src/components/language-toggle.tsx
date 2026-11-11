"use client";

import { useLang } from "@/lib/use-lang";

export function LanguageToggle({ mobile = false }: { mobile?: boolean }) {
  const { lang, t, setLang } = useLang();
  const french = lang === "fr";
  return (
    <button
      className={`lang-switch${mobile ? " lang-switch--mobile" : ""}`}
      type="button"
      role="switch"
      aria-checked={french}
      aria-label={t.header.langLabel}
      title={t.header.langLabel}
      onClick={() => setLang(french ? "en" : "fr")}
    >
      <span className="lang-switch__label" data-active={!french}>EN</span>
      <span className="lang-switch__track" aria-hidden="true">
        <span className="lang-switch__thumb" />
      </span>
      <span className="lang-switch__label" data-active={french}>FR</span>
    </button>
  );
}