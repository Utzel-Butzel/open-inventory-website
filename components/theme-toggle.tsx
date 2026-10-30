"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function resolvedTheme(): Theme {
  const explicitTheme = document.documentElement.dataset.theme;
  if (explicitTheme === "light" || explicitTheme === "dark") {
    return explicitTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function updateThemeColor(theme: Theme) {
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(
    (meta) => meta.setAttribute("content", theme === "dark" ? "#191b1f" : "#f6f5f1"),
  );
}

type ThemeToggleProps = {
  className?: string;
  lightLabel?: string;
  darkLabel?: string;
  pendingLabel?: string;
};

export function ThemeToggle({
  className,
  lightLabel = "Use light theme",
  darkLabel = "Use dark theme",
  pendingLabel = "Toggle color theme",
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => {
      if (!document.documentElement.dataset.theme) {
        const nextTheme = media.matches ? "dark" : "light";
        setTheme(nextTheme);
        updateThemeColor(nextTheme);
      }
    };

    const syncTheme = () => {
      const nextTheme = resolvedTheme();
      setTheme(nextTheme);
      updateThemeColor(nextTheme);
    };
    syncTheme();
    media.addEventListener("change", syncSystemTheme);
    window.addEventListener("inventory-theme-change", syncTheme);
    return () => {
      media.removeEventListener("change", syncSystemTheme);
      window.removeEventListener("inventory-theme-change", syncTheme);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = resolvedTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("inventory-theme", nextTheme);
    } catch {}
    window.dispatchEvent(new Event("inventory-theme-change"));
  }

  const dark = theme === "dark";
  const label = theme === null ? pendingLabel : dark ? lightLabel : darkLabel;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`grid size-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border ${className ?? ""}`}
      aria-label={label}
      title={label}
    >
      {theme === null ? (
        <span className="size-[17px] rounded-full border-2 border-current opacity-55" aria-hidden="true" />
      ) : dark ? (
        <Sun className="size-[17px]" aria-hidden="true" />
      ) : (
        <Moon className="size-[17px]" aria-hidden="true" />
      )}
    </button>
  );
}
