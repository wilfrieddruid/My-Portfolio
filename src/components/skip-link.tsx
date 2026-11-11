"use client";

import { useLang } from "@/lib/use-lang";

export function SkipLink() {
  const { t } = useLang();
  return (
    <a className="skip-link" href="#main-content">
      {t.header.skipLink}
    </a>
  );
}
