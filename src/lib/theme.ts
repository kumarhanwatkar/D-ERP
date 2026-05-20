export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";

const isTheme = (value: string | null): value is Theme => {
  return value === "light" || value === "dark";
};

export const getStoredTheme = (): Theme | null => {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
};

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.classList.toggle("dark", theme === "dark");

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore write failures in private/incognito contexts.
  }

  window.dispatchEvent(new CustomEvent<Theme>("themechange", { detail: theme }));
};

export const initializeTheme = (): Theme => {
  const initialTheme = getStoredTheme() ?? "light";
  applyTheme(initialTheme);
  return initialTheme;
};
