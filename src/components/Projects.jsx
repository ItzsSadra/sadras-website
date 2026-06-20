import { useState, useRef, useCallback } from "react";
import {
  FaShoppingCart,
  FaServer,
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";
import useInView from "../hooks/useInView";
import { useLanguage } from "../context/LanguageContext";

function TiltCard({ children, className = "", style = {} }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const isTouchDevice = useRef(
    typeof window !== "undefined" && "ontouchstart" in window
  );

  const handleMouseMove = useCallback((e) => {
    if (isTouchDevice.current) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice.current) return;
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ ...style, transform, transition: "transform 0.2s ease-out", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [ref, inView] = useInView(0.1);

  const projectIcons = [<FaShoppingCart className="text-xl sm:text-3xl" />, <FaServer className="text-xl sm:text-3xl" />, <FaCode className="text-xl sm:text-3xl" />];
  const projectTags = [
    ["React", "TypeScript", "Tailwind", "Node.js"],
    ["Next.js", "Prisma", "PostgreSQL", "Docker"],
    ["React", "Tailwind", "Vite"],
  ];

  const projectsData = t("projects.items");

  const projects = projectsData.map((item, i) => ({
    ...item,
    icon: projectIcons[i],
    tags: projectTags[i],
    links: [
      { icon: <FaGithub />, href: "#" },
      { icon: <FaExternalLinkAlt />, href: "#" },
    ],
  }));

  return (
    <section
      id="projects"
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
          {t("projects.preTitle")}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight text-theme">
          {t("projects.title")}
        </h2>
        <div
          className="w-10 sm:w-12 h-1 rounded-full mb-8 sm:mb-12"
          style={{ background: "var(--accent)" }}
        />
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <TiltCard
            key={project.title}
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${200 + i * 150}ms` }}
          >
            <div className="group relative glass rounded-2xl overflow-hidden h-full flex flex-col card-glow">
              <div
                className="h-40 sm:h-44 flex items-center justify-center relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, var(--bg-elevated), transparent)" }}
              >
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center
                    group-hover:scale-110 transition-all duration-500"
                  style={{
                    background: "var(--bg-elevated)",
                    color: "var(--accent)",
                  }}
                >
                  {project.icon}
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100
                    transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, var(--accent-glow), transparent)",
                  }}
                />
              </div>

              <div className="p-5 sm:p-6 relative flex flex-col flex-1">
                <h3
                  className="text-base sm:text-lg font-semibold mb-2 text-theme transition-colors duration-200"
                  style={{ color: "var(--text)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
                >
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 line-clamp-3 flex-1 text-secondary">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-1 rounded-md font-mono text-muted"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project links */}
                <div className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-theme">
                  {project.links.map((link, j) => (
                    <a
                      key={j}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-mono transition-all duration-200"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-muted)";
                      }}
                    >
                      <span className="text-sm">{link.icon}</span>
                      <span>{j === 0 ? "Source" : "Live"}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      <div
        className="section-divider mt-16 sm:mt-20"
        style={{ background: "linear-gradient(90deg, transparent 0%, var(--accent-glow) 50%, transparent 100%)" }}
      />
    </section>
  );
}
