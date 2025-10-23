const THEME_STORAGE_KEY = "sz-theme-preference";
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

let themePreference = "system";
let themeToggleButton;

const preferenceLabels = {
  system: "Auto mode",
  light: "Light mode",
  dark: "Dark mode"
};

const resolveSystemTheme = () => (prefersDarkScheme.matches ? "dark" : "light");

const updateToggleButton = () => {
  if (!themeToggleButton) {
    return;
  }

  const label = preferenceLabels[themePreference] || preferenceLabels.system;
  const mode = themePreference === "system" ? resolveSystemTheme() : themePreference;

  themeToggleButton.setAttribute("data-theme-state", themePreference);
  themeToggleButton.setAttribute("aria-label", `Theme: ${label}`);
  themeToggleButton.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");

  const labelEl = themeToggleButton.querySelector(".theme-toggle__label");
  if (labelEl) {
    labelEl.textContent = label;
  }
};

const applyThemePreference = (preference, {persist = true} = {}) => {
  themePreference = preference;
  const themeToApply = preference === "system" ? resolveSystemTheme() : preference;

  document.documentElement.setAttribute("data-theme", themeToApply);
  document.documentElement.dataset.themePreference = preference;

  if (persist) {
    if (preference === "system") {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, preference);
    }
  }

  updateToggleButton();
};

const cyclePreference = (current) => {
  if (current === "system") {
    return "dark";
  }
  if (current === "dark") {
    return "light";
  }
  return "system";
};

const initThemePreference = () => {
  try {
    const storedPreference = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedPreference === "light" || storedPreference === "dark") {
      applyThemePreference(storedPreference, {persist: false});
      return;
    }
  } catch (error) {
    console.warn("Unable to access theme preference from storage.", error);
  }
  applyThemePreference("system", {persist: false});
};

prefersDarkScheme.addEventListener("change", () => {
  if (themePreference === "system") {
    applyThemePreference("system", {persist: false});
  }
});

initThemePreference();

document.addEventListener("DOMContentLoaded", () => {
  themeToggleButton = document.querySelector("[data-theme-toggle]");
  if (themeToggleButton) {
    updateToggleButton();
    themeToggleButton.addEventListener("click", () => {
      const nextPreference = cyclePreference(themePreference);
      applyThemePreference(nextPreference);
    });
  }

  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }
});
