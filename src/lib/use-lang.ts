"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { dictionaries, isLang, LANG_CHANGE_EVENT, LANG_STORAGE_KEY, type Dictionary, type Lang } from "@/lib/i18n";

function readLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch { /* Storage is optional. */ }
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function subscribe(callback: () => void) {
  window.addEventListener(LANG_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LANG_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useLang(): { lang: Lang; t: Dictionary; setLang: (lang: Lang) => void } {
  // The server always renders English; the browser preference applies right after hydration.
  const lang = useSyncExternalStore(subscribe, readLang, () => "en" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    try { localStorage.setItem(LANG_STORAGE_KEY, next); } catch { /* The page still switches for this visit. */ }
    window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
  }, []);

  return { lang, t: dictionaries[lang], setLang };
}