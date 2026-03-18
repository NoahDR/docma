export const THEME_STORAGE_KEY = "theme"
export const THEME_CHANGE_EVENT = "autosaas:theme-change"

export type Theme = "light" | "dark"

export const themeInitScript = `
(() => {
  try {
    const root = document.documentElement;
    const stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme === "dark" ? "dark" : "light";
  } catch (_) {}
})();
`

export function readThemeFromDom(): Theme {
  if (typeof document === "undefined") {
    return "light"
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return
  }

  const root = document.documentElement
  const isDark = theme === "dark"

  root.classList.toggle("dark", isDark)
  root.style.colorScheme = isDark ? "dark" : "light"

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Ignore storage errors (e.g., private mode restrictions).
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
  }
}
