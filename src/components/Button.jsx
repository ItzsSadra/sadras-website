export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`group relative px-6 sm:px-8 py-3 sm:py-3 text-black font-semibold rounded-full 
        overflow-hidden transition-all duration-300
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2
        cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`}
      style={{
        background: "var(--accent)",
        boxShadow: "0 0 0px var(--accent-glow)",
        "--tw-ring-color": "var(--accent)",
        "--tw-ring-offset-color": "var(--bg)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 30px var(--accent-glow)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0px var(--accent-glow)";
      }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "var(--accent)", filter: "brightness(0.85)" }}
      />
    </button>
  );
}
