"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, CornerDownLeft, Github, Search, X } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useLang } from "@/lib/use-lang";
import { useLocalizedPortfolio } from "@/lib/use-localized-portfolio";
import styles from "./project-index.module.css";

export function ProjectIndex() {
  const { t } = useLang();
  const { projects: featured, archiveProjects } = useLocalizedPortfolio();
  const projects = useMemo(
    () => [...featured, ...archiveProjects],
    [featured, archiveProjects]
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreScroll = useRef<(() => void) | null>(null);
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const id = useId();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = projects.filter((project) => {
    const text = [project.title, project.category, project.summary, ...(project.searchTerms ?? []), ...project.stack].join(" ").toLowerCase();
    return terms.every((term) => text.includes(term));
  });
  const selected = results.find((project) => project.slug === selectedSlug) ?? results[0];
  const number = selected ? String(projects.indexOf(selected) + 1).padStart(2, "0") : "00";
  const visual = selected && "visual" in selected ? selected.visual : null;

  function updateQuery(value: string) {
    setQuery(value);
    setSelectedSlug("");
  }

  const openIndex = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setQuery("");
    setSelectedSlug(projects[0]?.slug ?? "");
    dialog.showModal();
    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(document.body).paddingRight);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${padding + gutter}px`;
    restoreScroll.current = () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      restoreScroll.current = null;
    };
    inputRef.current?.focus();
  }, [projects]);

  const closeIndex = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  function visitProject(slug: string) {
    closeIndex();
    router.push(`/projects/${slug}`);
  }

  function navigateResults(event: KeyboardEvent<HTMLInputElement>) {
    if (!results.length || event.nativeEvent.isComposing) return;
    if (event.key === "Enter") {
      event.preventDefault();
      if (selected) visitProject(selected.slug);
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const current = results.findIndex((project) => project.slug === selected?.slug);
    const next = (current + (event.key === "ArrowDown" ? 1 : -1) + results.length) % results.length;
    setSelectedSlug(results[next].slug);
    document.getElementById(`${id}-${results[next].slug}`)?.scrollIntoView({ block: "nearest" });
  }

  function containTabFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button, input, a[href]"))
      .filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  useEffect(() => {
    function handleShortcut(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === "k") {
        if (document.querySelector("dialog[open]") && !dialogRef.current?.open) return;
        event.preventDefault();
        if (event.repeat) return;
        if (dialogRef.current?.open) closeIndex();
        else openIndex();
      }
    }
    document.addEventListener("keydown", handleShortcut);
    return () => {
      document.removeEventListener("keydown", handleShortcut);
      restoreScroll.current?.();
    };
  }, [openIndex, closeIndex]);

  return (
    <>
      <button className={styles.trigger} type="button" onClick={openIndex} aria-label={t.index.openAria} aria-haspopup="dialog" aria-controls={`${id}-dialog`} aria-keyshortcuts="Control+k Meta+k">
        <Search aria-hidden="true" />
        <span>{t.index.trigger}</span>
        <kbd aria-hidden="true">⌘ K</kbd>
      </button>

      <dialog className={styles.dialog} id={`${id}-dialog`} ref={dialogRef} aria-labelledby={`${id}-title`} onKeyDown={containTabFocus} onClose={() => restoreScroll.current?.()} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeIndex();
      }}>
        <header className={styles.header}>
          <div><span className={styles.eyebrow}>{t.index.eyebrow}</span><h2 id={`${id}-title`}>{t.index.title}<span>.</span></h2></div>
          <button className={styles.close} type="button" onClick={closeIndex} aria-label={t.index.closeAria}><X aria-hidden="true" /></button>
        </header>

        <div className={styles.search}>
          <Search aria-hidden="true" />
          <input ref={inputRef} type="text" role="combobox" aria-label={t.index.searchLabel} aria-autocomplete="list" aria-expanded="true" aria-controls={`${id}-results`} aria-activedescendant={selected ? `${id}-${selected.slug}` : undefined} placeholder={t.index.searchPlaceholder} value={query} onChange={(event) => updateQuery(event.target.value)} onKeyDown={navigateResults} autoComplete="off" spellCheck={false} />
          {query ? <button type="button" aria-label={t.index.clearAria} onClick={() => { updateQuery(""); inputRef.current?.focus(); }}><X aria-hidden="true" /></button> : <span className={styles.searchHint}>{t.index.searchHint}</span>}
        </div>

        <div className={styles.workspace}>
          <div className={styles.collection}>
            <div className={styles.collectionMeta}><span>{t.index.allWork}</span><span role="status" aria-live="polite" aria-atomic="true">{String(results.length).padStart(2, "0")} / {projects.length}</span></div>
            <div className={styles.results} id={`${id}-results`} role="listbox" aria-label={t.index.matching} tabIndex={-1}>
              {results.map((project) => (
                <button className={styles.result} type="button" key={project.slug} id={`${id}-${project.slug}`} role="option" aria-selected={project.slug === selected?.slug} tabIndex={-1} onPointerEnter={(event) => { if (event.pointerType === "mouse") setSelectedSlug(project.slug); }} onClick={() => visitProject(project.slug)}>
                  <span className={styles.resultNumber}>{String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
                  <span className={styles.resultCopy}><strong>{project.title}</strong><small>{t.projects.categories[project.category]} / {project.stack.slice(0, 2).join(" + ")}</small></span>
                  <ArrowUpRight aria-hidden="true" />
                </button>
              ))}
            </div>
            {!results.length ? <div className={styles.empty}><strong>{t.index.noResults}</strong><p>{t.index.tryHint}</p><button type="button" onClick={() => { updateQuery(""); inputRef.current?.focus(); }}>{t.index.showAll(projects.length)} <ArrowUpRight aria-hidden="true" /></button></div> : null}
          </div>

          {selected ? <aside className={styles.preview} aria-label={t.index.previewAria(selected.title)}>
            <m.div className={styles.poster} key={selected.slug} aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}>
              <div className={styles.posterMeta}><span>{t.index.posterMeta(number)}</span><span>{t.projects.categories[selected.category]}</span></div>
              <span className={styles.posterNumber}>{number}</span>
              {visual?.kind === "image" ? <div className={styles.posterImage}><Image src={visual.src} alt="" fill sizes="(max-width: 760px) 0px, 320px" style={{ objectFit: visual.fit ?? "cover" }} /></div> : <div className={styles.posterGrid}>{Array.from({ length: 16 }, (_, index) => <i key={index} />)}</div>}
              <strong className={styles.posterTitle}>{selected.title}</strong>
              <span className={styles.posterFooter}>{t.index.posterFooter}</span>
            </m.div>
            <div className={styles.previewCopy}><p>{selected.summary}</p><ul aria-label={t.projects.stackAria(selected.title)}>{selected.stack.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>
            <div className={styles.previewLinks}>
              <Link href={`/projects/${selected.slug}`} onClick={closeIndex}>{t.index.openCaseStudy} <ArrowUpRight aria-hidden="true" /></Link>
              {selected.repo ? <a href={selected.repo} target="_blank" rel="noreferrer"><Github aria-hidden="true" />{selected.caseStudy.sourceAvailability === "private" ? t.index.privateSource : t.index.source}<span className="sr-only">{t.index.sourceFor(selected.title, selected.caseStudy.sourceAvailability === "private")}</span></a> : null}
            </div>
          </aside> : <aside className={`${styles.preview} ${styles.blankPreview}`} aria-hidden="true"><span>{t.index.keepExploring}</span><p>{t.index.startQuestion}</p></aside>}
        </div>

        <footer className={styles.footer}><span><kbd>↑</kbd><kbd>↓</kbd> {t.index.footerBrowse} <kbd><CornerDownLeft aria-hidden="true" /></kbd> {t.index.footerOpen}</span><span>{t.index.footerClick} <kbd>esc</kbd> {t.index.footerClose}</span></footer>
      </dialog>
    </>
  );
}
