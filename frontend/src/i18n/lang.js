import { useState, useEffect } from "react";
import { translations } from "./translations";

const STORAGE_KEY = "dc_lang";
const EVENT_NAME = "dc:langchange";

function getBrowserLang() {
  if (typeof window === "undefined") return "es";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "es" || saved === "en") return saved;
  return navigator.language?.startsWith("en") ? "en" : "es";
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
}

function persistLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* noop */
  }
}

export function getLang() {
  return getBrowserLang();
}

export function setLang(lang) {
  persistLang(lang);
  applyLang(lang);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { lang } }));
}

export function onLangChange(fn) {
  const handler = (e) => fn(e.detail.lang);
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}

export function useLang() {
  const [lang, setLangState] = useState(getLang);

  useEffect(() => {
    applyLang(lang); // ensure DOM matches on mount
    const unsub = onLangChange((l) => setLangState(l));
    return unsub;
  }, []);

  const toggle = () => setLang(lang === "es" ? "en" : "es");

  return { lang, toggle, t: translations[lang] };
}
