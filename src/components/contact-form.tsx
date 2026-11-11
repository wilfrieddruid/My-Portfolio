"use client";

import { useForm, ValidationError } from "@formspree/react";
import Script from "next/script";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { DirectMessageForm } from "@/components/direct-message-form";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLang } from "@/lib/use-lang";

declare global {
  interface Window {
    grecaptcha?: { ready: (callback: () => void) => void; execute: (siteKey: string, options: { action: string }) => Promise<string> };
  }
}

function MessageForm({ formId, captchaSiteKey }: { formId: string; captchaSiteKey?: string }) {
  const { t } = useLang();
  const [state, submit, reset] = useForm(formId);
  const [inputError, setInputError] = useState("");
  const [preparing, setPreparing] = useState(false);
  const inFlight = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (state.succeeded) successRef.current?.focus(); }, [state.succeeded]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    for (const field of ["name", "email", "message"]) {
      const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
      input.value = input.value.trim();
    }
    if (!form.checkValidity()) {
      setInputError(t.form.validationError);
      form.reportValidity();
      return;
    }
    setInputError("");
    const data = new FormData(form);
    inFlight.current = true;
    try {
      if (captchaSiteKey) {
        setPreparing(true);
        const token = await new Promise<string>((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error(t.form.captchaTimeout)), 10000);
          const captcha = window.grecaptcha;
          if (!captcha) { clearTimeout(timeout); reject(new Error(t.form.captchaLoad)); return; }
          captcha.ready(() => {
            captcha.execute(captchaSiteKey, { action: "contact" }).then(resolve, reject).finally(() => clearTimeout(timeout));
          });
        });
        data.set("g-recaptcha-response", token);
      }
      setPreparing(false);
      await submit(data);
    } catch {
      setInputError(t.form.submitFailed);
    } finally {
      setPreparing(false);
      inFlight.current = false;
    }
  }

  if (state.succeeded) {
    return (
      <div ref={successRef} className="message-form__success" role="status" tabIndex={-1}>
        <Check aria-hidden="true" />
        <h3>{t.form.successTitle}</h3>
        <p>{t.form.successBody}</p>
        <button className="button" type="button" onClick={() => { reset(); requestAnimationFrame(() => document.getElementById("contact-name")?.focus()); }}>{t.form.another}</button>
      </div>
    );
  }

  return (
    <>
    {captchaSiteKey ? <Script src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(captchaSiteKey)}`} strategy="afterInteractive" /> : null}
    <form className="message-form" onSubmit={handleSubmit} aria-label={t.form.formAria} aria-busy={state.submitting || preparing}>
      <div className="message-form__row">
        <label htmlFor="contact-name">{t.form.name}
          <input id="contact-name" name="name" autoComplete="name" required maxLength={100} aria-describedby="contact-name-error" aria-invalid={Boolean(state.errors?.getFieldErrors("name").length)} />
          <ValidationError id="contact-name-error" field="name" prefix={t.form.name} errors={state.errors} />
        </label>
        <label htmlFor="contact-email">{t.form.email}
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} aria-describedby="contact-email-error" aria-invalid={Boolean(state.errors?.getFieldErrors("email").length)} />
          <ValidationError id="contact-email-error" field="email" prefix={t.form.email} errors={state.errors} />
        </label>
      </div>
      <label htmlFor="contact-message">{t.form.message}
        <textarea id="contact-message" name="message" rows={6} required maxLength={5000} placeholder={t.form.messagePlaceholder} aria-describedby="contact-message-error" aria-invalid={Boolean(state.errors?.getFieldErrors("message").length)} />
        <ValidationError id="contact-message-error" field="message" prefix={t.form.message} errors={state.errors} />
      </label>
      <input type="text" name="_gotcha" className="message-form__honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="hidden" name="subject" value={t.form.subject} />
      <div className="message-form__errors" role="alert">
        {inputError ? <p>{inputError}</p> : null}
        <ValidationError errors={state.errors} />
        {state.errors ? <p>{t.form.submitFailedProvider}</p> : null}
      </div>
      <div className="message-form__actions">
        <button className="button message-form__submit" type="submit" disabled={state.submitting || preparing}>
          {preparing ? t.form.verifying : state.submitting ? t.form.sending : t.form.send}<ArrowUpRight aria-hidden="true" />
        </button>
        <p>{t.form.formspreeNote} <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noreferrer">{t.form.privacyPolicy}</a></p>
      </div>
      {captchaSiteKey ? <p className="message-form__captcha-note">{t.form.captchaNotePre}<a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">{t.form.googlePrivacy}</a>{t.form.captchaNoteMid}<a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">{t.form.googleTerms}</a>{t.form.captchaNotePost}</p> : null}
    </form>
    </>
  );
}

export function ContactForm({ email, formId, captchaSiteKey }: { email: string; formId?: string; captchaSiteKey?: string }) {
  const { t } = useLang();
  const addressRef = useRef<HTMLInputElement>(null);
  const [copyStatus, setCopyStatus] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus(t.form.copied);
    } catch {
      addressRef.current?.focus();
      addressRef.current?.select();
      setCopyStatus(t.form.copiedSelected);
    }
  }
  return (
    <div className="contact-panel">
      <p className="contact-panel__intro">{t.form.intro}</p>
      {formId ? <MessageForm formId={formId} captchaSiteKey={captchaSiteKey} /> : <DirectMessageForm email={email} />}
      <div className="contact-address">
        <label className="sr-only" htmlFor="contact-address">{t.form.emailLabel}</label>
        <input ref={addressRef} id="contact-address" value={email} readOnly />
        <button type="button" onClick={copyEmail}><Copy aria-hidden="true" />{t.form.copyEmail}</button>
      </div>
      <p className="contact-address__status" role="status" aria-atomic="true">{copyStatus}</p>
    </div>
  );
}
