import { FaReact, FaNodeJs, FaDocker } from "react-icons/fa";
import useInView from "../hooks/useInView";
import { useLanguage } from "../context/LanguageContext";

function SkillBar({ name, level, index, inView }) {
  return (
    <div
      className={`transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-secondary">{name}</span>
        <span className="text-xs text-muted font-mono">{level}%</span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{
            width: inView ? `${level}%` : "0%",
            background: "var(--accent)",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              backgroundSize: "200% 100%",
              animation: inView ? "shimmer 2s ease-in-out infinite" : "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function SkillCard({ category, index, inView }) {
  return (
    <div
      className={`glass rounded-2xl p-5 sm:p-6 card-glow transition-all duration-700 hover:scale-[1.02] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${200 + index * 150}ms` }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{ background: "var(--bg-elevated)" }}
        >
          {category.icon}
        </span>
        <h3 className="text-lg font-semibold text-theme">{category.title}</h3>
      </div>

      <div className="space-y-4">
        {category.skills.map((skill, j) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            index={j}
            inView={inView}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const [ref, inView] = useInView(0.1);

  const skillCategories = [
    {
      title: t("skills.frontend"),
      icon: <FaReact style={{ color: "var(--accent)" }} className="text-xl sm:text-2xl" />,
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 88 },
        { name: "shadcn", level: 75 },
      ],
    },
    {
      title: t("skills.backend"),
      icon: <FaNodeJs style={{ color: "var(--accent)" }} className="text-xl sm:text-2xl" />,
      skills: [
        { name: "Node.js", level: 82 },
        { name: "Flask", level: 70 },
        { name: "PostgreSQL", level: 78 },
        { name: "Python", level: 75 },
        { name: "REST APIs", level: 85 },
      ],
    },
    {
      title: t("skills.tools"),
      icon: <FaDocker style={{ color: "var(--accent)" }} className="text-xl sm:text-2xl" />,
      skills: [
        { name: "Git", level: 88 },
        { name: "Figma", level: 65 },
        { name: "Vercel", level: 80 },
        { name: "Linux", level: 75 },
        { name: "Docker", level: 72 },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-4 py-16 sm:py-24 max-w-5xl mx-auto"
    >
      <div
        className={`transition-all duration-700 delay-100 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p
          className="text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-mono"
          style={{ color: "var(--accent)" }}
        >
          {t("skills.preTitle")}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight text-theme">
          {t("skills.title")}
        </h2>
        <div
          className="w-10 sm:w-12 h-1 rounded-full mb-8 sm:mb-12"
          style={{ background: "var(--accent)" }}
        />
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {skillCategories.map((category, i) => (
          <SkillCard
            key={category.title}
            category={category}
            index={i}
            inView={inView}
          />
        ))}
      </div>

      <div
        className="section-divider mt-16 sm:mt-20"
        style={{ background: "linear-gradient(90deg, transparent 0%, var(--accent-glow) 50%, transparent 100%)" }}
      />
    </section>
  );
}
