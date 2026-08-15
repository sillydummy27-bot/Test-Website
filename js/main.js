(() => {
  const header = document.querySelector('[data-site-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-navigation]');
  const yearElements = document.querySelectorAll('[data-current-year]');

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    navigation?.classList.toggle('is-open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });

  navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      menuButton?.focus();
    }
  });

  const desktopNavigation = window.matchMedia('(min-width: 851px)');
  desktopNavigation.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
})();
