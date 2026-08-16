(() => {
  const storageKey = 'quiet-form-theme';
  const systemPreference = window.matchMedia('(prefers-color-scheme: light)');

  const readStoredTheme = () => {
    try {
      const value = window.localStorage.getItem(storageKey);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  };

  const storeTheme = (theme) => {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // The theme still works for this page when storage is unavailable.
    }
  };

  let storedTheme = readStoredTheme();
  const preferredTheme = storedTheme || (systemPreference.matches ? 'light' : 'dark');
  document.documentElement.dataset.theme = preferredTheme;
  document.documentElement.style.colorScheme = preferredTheme;

  const updateControls = () => {
    const isLight = document.documentElement.dataset.theme === 'light';
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      button.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      const label = button.querySelector('[data-theme-label]');
      const icon = button.querySelector('[data-theme-icon]');
      if (label) label.textContent = isLight ? 'Dark' : 'Light';
      if (icon) icon.textContent = isLight ? '◐' : '☼';
    });
  };

  const applyTheme = (theme, persist = false) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    if (persist) {
      storedTheme = theme;
      storeTheme(theme);
    }
    updateControls();
  };

  document.addEventListener('DOMContentLoaded', () => {
    updateControls();
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme, true);
      });
    });
  });

  systemPreference.addEventListener('change', (event) => {
    if (!storedTheme) applyTheme(event.matches ? 'light' : 'dark');
  });
})();
