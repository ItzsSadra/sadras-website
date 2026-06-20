import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FaPaperPlane, FaSpinner, FaCheck, FaExclamation, FaUser, FaEnvelope, FaComment } from "react-icons/fa";

export default function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  const inputStyle = {
    background: "var(--glass-bg)",
    border: "1px solid var(--glass-border)",
    color: "var(--text)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  };

  const fieldIcons = {
    name: <FaUser className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }} />,
    email: <FaEnvelope className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }} />,
    message: <FaComment className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }} />,
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-4 sm:space-y-5">
      <div>
        <label
          className="block text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-1.5 sm:mb-2 font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          {t("contact.form.name")}
        </label>
        <div className="relative">
          <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
            {fieldIcons.name}
          </span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full pl-9 sm:pl-11 pr-4 py-3.5 sm:py-3 rounded-xl font-sans text-sm outline-none transition-all duration-200 placeholder:text-muted"
            style={inputStyle}
            placeholder={t("contact.form.namePlaceholder")}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)";
              e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--glass-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      <div>
        <label
          className="block text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-1.5 sm:mb-2 font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          {t("contact.form.email")}
        </label>
        <div className="relative">
          <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
            {fieldIcons.email}
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full pl-9 sm:pl-11 pr-4 py-3.5 sm:py-3 rounded-xl font-sans text-sm outline-none transition-all duration-200 placeholder:text-muted"
            style={inputStyle}
            placeholder={t("contact.form.emailPlaceholder")}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)";
              e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--glass-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      <div>
        <label
          className="block text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-1.5 sm:mb-2 font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          {t("contact.form.message")}
        </label>
        <div className="relative">
          <span className="absolute left-3 sm:left-4 top-4 sm:top-3.5">
            {fieldIcons.message}
          </span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full pl-9 sm:pl-11 pr-4 py-3.5 sm:py-3 rounded-xl font-sans text-sm outline-none transition-all duration-200 resize-none placeholder:text-muted"
            style={inputStyle}
            placeholder={t("contact.form.messagePlaceholder")}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)";
              e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--glass-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative w-full px-8 py-3.5 sm:py-3.5 text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        style={{
          background: "var(--accent)",
          "--tw-ring-color": "var(--accent)",
          "--tw-ring-offset-color": "var(--bg)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 30px var(--accent-glow)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 0 0px var(--accent-glow)";
        }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {status === "loading" ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaPaperPlane className="group-hover:scale-110 transition-transform" />
          )}
          {status === "loading" ? t("contact.form.sending") : t("contact.form.submit")}
        </span>
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "var(--accent)", filter: "brightness(0.85)" }}
        />
      </button>

      {status === "success" && (
        <div
          className="flex items-center gap-2 text-sm font-sans px-4 py-3 rounded-xl animate-fade-in-up"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--accent-glow)",
            color: "var(--accent)",
          }}
        >
          <FaCheck />
          {t("contact.form.success")}
        </div>
      )}

      {status === "error" && (
        <div
          className="flex items-center gap-2 text-sm font-sans px-4 py-3 rounded-xl animate-fade-in-up"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#ef4444",
          }}
        >
          <FaExclamation />
          {errorMsg || t("contact.form.error")}
        </div>
      )}
    </form>
  );
}
