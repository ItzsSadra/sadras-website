/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import en from "../translations/en.json";
import fa from "../translations/fa.json";

const translations = { en, fa };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", lang === "fa" ? "fa_IR" : "en_US");
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "fa" : "en"));
  }, []);

  const t = useCallback(
    (key, params = {}) => {
      let value = translations[lang][key];
      if (value === undefined) return key;
      if (typeof value === "string") {
        return value.replace(/\{(\w+)\}/g, (_, p) => params[p] ?? `{${p}}`);
      }
      return value;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
