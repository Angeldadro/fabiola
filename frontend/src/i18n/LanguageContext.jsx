import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

const getInitialLang = () => {
  if (typeof window === "undefined") return "es";
  const saved = window.localStorage.getItem("dc_lang");
  if (saved === "es" || saved === "en") return saved;
  const browser = (navigator.language || "es").toLowerCase();
  return browser.startsWith("en") ? "en" : "es";
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    window.localStorage.setItem("dc_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((l) => (l === "es" ? "en" : "es"));
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
