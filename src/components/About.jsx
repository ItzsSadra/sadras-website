import useInView from "../hooks/useInView";
import useCountUp from "../hooks/useCountUp";
import { useLanguage } from "../context/LanguageContext";
import { FaCode, FaRocket, FaLayerGroup } from "react-icons/fa";

function StatCard({ value, suffix, label, start, icon }) {
  const count = useCountUp(value, 2000, start);
  return (
    <div className="glass-liquid rounded-2xl p-4 sm:p-5 text-center card-glow group hover:scale-[1.02]">
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
        style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
      >
        {icon}
      </div>
      <div
        className="text-2xl sm:text-3xl font-bold mb-1 transition-transform duration-300"
        style={{ color: "var(--accent)" }}
      >
        {count}
        {suffix}
      </div>
      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const [ref, inView] = useInView(0.15);

  const stats = [
    { value: 3, suffix: "+", label: t("about.stats.years"), icon: <FaCode className="text-sm sm:text-base" /> },
    { value: 15, suffix: "+", label: t("about.stats.projects"), icon: <FaRocket className="text-sm sm:text-base" /> },
    { value: 5, suffix: "+", label: t("about.stats.technologies"), icon: <FaLayerGroup className="text-sm sm:text-base" /> },
  ];

  const highlights = t("about.highlights");

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-4 py-16 sm:py-24 max-w-5xl mx-auto"
    >
      <div
        className={`transition-all duration-700 delay-100 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p
          className="text-xs sm:text-sm tracking-[0.25em] uppercase mb-3 font-mono"
          style={{ color: "var(--accent)" }}
        >
          {t("about.preTitle")}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight text-theme">
          {t("about.title")}
        </h2>
        <div className="section-accent mb-10 sm:mb-12" />
      </div>

      <div className="grid md:grid-cols-5 gap-6 sm:gap-10">
        <div
          className={`md:col-span-3 space-y-5 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-secondary text-base sm:text-lg leading-relaxed">
            {t("about.bio1")}
          </p>
          <p className="text-muted leading-relaxed text-sm sm:text-base">
            {t("about.bio2")}
          </p>
          <p className="text-muted leading-relaxed text-sm sm:text-base">
            {t("about.bio3")}
          </p>

          <div className="space-y-3 pt-2">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`md:col-span-2 grid grid-cols-2 gap-3 sm:gap-4 content-start transition-all duration-700 delay-400 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              start={inView}
              icon={stat.icon}
            />
          ))}
          <div className="glass-liquid rounded-2xl p-4 sm:p-5 flex items-center justify-center card-glow group hover:scale-[1.02]">
            <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
              🚀
            </span>
          </div>
        </div>
      </div>

      <div className="section-divider mt-16 sm:mt-20" />
    </section>
  );
}
