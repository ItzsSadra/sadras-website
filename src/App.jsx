import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ContactForm from "./components/ContactForm";
import AmbientEffects from "./components/AmbientEffects";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import useTypewriter from "./hooks/useTypewriter";
import { useLanguage } from "./context/LanguageContext";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaChevronDown,
  FaArrowRight,
} from "react-icons/fa";
import { HiTerminal } from "react-icons/hi";

function AppContent() {
  const { t } = useLanguage();
  const roles = t("hero.roles");
  const { text } = useTypewriter(roles, {
    typeSpeed: 60,
    deleteSpeed: 35,
    pauseTime: 2500,
  });

  return (
    <>
      <ScrollProgress />
      <AmbientEffects />

      <div className="gradient-bg" />
      <div className="noise-overlay" />
      <div className="grid-pattern" />

      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center gap-6 sm:gap-8 px-4 text-center overflow-x-hidden">
        {/* Decorative blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-float hidden sm:block"
          style={{ background: "var(--accent-glow)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full blur-3xl animate-float-delayed hidden sm:block"
          style={{ background: "var(--accent-glow)", opacity: 0.5 }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full animate-spin-slow hidden sm:block"
          style={{ border: "1px solid var(--border)" }}
        />

        {/* Terminal badge */}
        <div className="relative animate-fade-in-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs mb-6 sm:mb-8 font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            <HiTerminal style={{ color: "var(--accent)" }} />
            <span className="typing-cursor">{t("hero.terminal")}</span>
          </div>
        </div>

        {/* Heading */}
        <div className="relative animate-fade-in-up" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
          <p
            className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4 font-mono"
            style={{ color: "var(--accent)" }}
          >
            {t("hero.greeting")}
          </p>
          <h1 className="hero-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-theme">
            <span className="block">{t("hero.name.first")}</span>
            <span
              className="block glow-text"
              style={{ color: "var(--accent)" }}
            >
              {t("hero.name.last")}
            </span>
          </h1>
        </div>

        {/* Typewriter */}
        <div className="h-10 sm:h-12 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
          <p className="text-base sm:text-lg md:text-xl font-sans text-secondary">
            <span className="font-medium text-theme">{text}</span>
            <span
              className="ml-0.5 inline-block w-[2px] h-4 sm:h-5 align-middle animate-pulse"
              style={{ background: "var(--accent)" }}
            />
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base max-w-lg leading-relaxed font-sans text-muted animate-fade-in-up" style={{ animationDelay: "0.45s", animationFillMode: "both" }}>
          {t("hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 animate-fade-in-up" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
          <a href="#about" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto text-sm sm:text-base">
              {t("hero.cta.work")}
              <FaArrowRight className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-mono rounded-full transition-all duration-200 group glass"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            {t("hero.cta.contact")}
            <span className="ml-1.5 inline-block group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          className="absolute bottom-6 sm:bottom-10 transition-colors duration-200 animate-fade-in-up"
          style={{ color: "var(--text-muted)", animationDelay: "0.8s", animationFillMode: "both" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          <FaChevronDown className="text-lg sm:text-xl animate-bounce" />
        </a>
      </section>

      <About />
      <Skills />
      <Projects />

      {/* Contact */}
      <section
        id="contact"
        className="min-h-[60vh] flex flex-col justify-center items-center px-4 py-16 sm:py-24 text-center relative overflow-x-hidden"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-sm:w-[300px] max-sm:h-[300px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "var(--accent-glow)" }}
        />

        <div className="relative w-full max-w-lg">
          <p
            className="text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-mono"
            style={{ color: "var(--accent)" }}
          >
            {t("contact.preTitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight text-theme">
            {t("contact.title")}
          </h2>
          <div
            className="w-10 sm:w-12 h-1 rounded-full mx-auto mb-6 sm:mb-8"
            style={{ background: "var(--accent)" }}
          />

          <p className="max-w-lg mx-auto mb-8 sm:mb-10 font-sans leading-relaxed text-muted text-sm sm:text-base">
            {t("contact.description")}
          </p>

          <ContactForm />

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 sm:gap-5 mt-10 sm:mt-12">
            {[
              { icon: <FaGithub className="text-lg sm:text-xl" />, href: "https://github.com/yourusername" },
              { icon: <FaLinkedin className="text-lg sm:text-xl" />, href: "https://linkedin.com/in/yourusername" },
              { icon: <FaTwitter className="text-lg sm:text-xl" />, href: "https://twitter.com/yourusername" },
            ].map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl glass flex items-center justify-center transition-all duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow = "0 0 20px var(--accent-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "var(--shadow-card)";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 sm:py-6"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono text-muted text-center">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("footer.builtWith")}</p>
          <p>{t("footer.codeWithPassion")}</p>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
