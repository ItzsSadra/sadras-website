import { useTheme } from "../context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative w-9 h-9 rounded-lg flex items-center justify-center
        text-gray-400 hover:text-[var(--accent)] 
        hover:bg-[var(--bg-elevated)] transition-all duration-200"
    >
      <span
        className="absolute transition-all duration-500 ease-out"
        style={{
          transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
          opacity: theme === "dark" ? 1 : 0,
        }}
      >
        <HiMoon className="text-lg" />
      </span>
      <span
        className="absolute transition-all duration-500 ease-out"
        style={{
          transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
          opacity: theme === "light" ? 1 : 0,
        }}
      >
        <HiSun className="text-lg" />
      </span>
    </button>
  );
}
