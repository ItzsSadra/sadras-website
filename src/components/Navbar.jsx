import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  const links = [
    { href: "#about", label: t("nav.about") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["about", "skills", "projects", "contact"];
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 safe-area-top ${
        scrolled
          ? "border-b border-theme"
          : ""
      }`}
      style={{ background: scrolled ? "var(--nav-bg)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", WebkitBackdropFilter: scrolled ? "blur(20px)" : "none" }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <a
          href="#"
          className="relative z-10 text-xl font-bold tracking-tight"
          style={{ color: "var(--accent)" }}
        >
          <span className="text-theme transition-colors duration-300">&lt;</span>
          SH
          <span className="text-theme transition-colors duration-300">
            {" "}/&gt;
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm transition-colors duration-200 group"
                style={{
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? "60%" : "0%",
                    background: "var(--accent)",
                  }}
                />
              </a>
            );
          })}
          <div className="ml-3 pl-3 border-l border-theme transition-colors duration-300 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <button
            className="relative z-10 p-2 rounded-lg transition-all duration-200"
            style={{ color: "var(--text-muted)" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={t("nav.toggleMenu")}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className="block h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{
                  background: "var(--text)",
                  transform: isOpen ? "rotate(45deg) translateY(7px)" : "",
                }}
              />
              <span
                className="block h-[2px] rounded-full transition-all duration-300"
                style={{
                  background: "var(--text)",
                  opacity: isOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{
                  background: "var(--text)",
                  transform: isOpen ? "rotate(-45deg) translateY(-7px)" : "",
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 z-[1] h-full w-[280px] max-w-[85vw] transform transition-all duration-300 ease-out md:hidden safe-area-bottom ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "var(--bg)",
          borderLeft: "1px solid var(--border)",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          <ul className="flex flex-col gap-2">
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`block w-full px-4 py-4 text-base rounded-xl transition-all duration-200 font-sans font-medium ${
                      isActive ? "text-accent" : ""
                    }`}
                    style={{
                      color: isActive ? "var(--accent)" : "var(--text-secondary)",
                      background: isActive ? "var(--accent-glow)" : "transparent",
                    }}
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = "var(--bg-elevated)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div className="flex items-center justify-between">
                      {link.label}
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--accent)" }}
                        />
                      )}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pb-10 px-4">
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
            >
              <p className="text-xs text-muted font-mono">
                sadra@portfolio:~$
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
