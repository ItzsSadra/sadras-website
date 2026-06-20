import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="relative w-8 h-8 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-all duration-200"
      style={{ color: "var(--text-muted)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
      aria-label={`Switch to ${lang === "en" ? "Persian" : "English"}`}
    >
      {lang === "en" ? "FA" : "EN"}
    </button>
  );
}
