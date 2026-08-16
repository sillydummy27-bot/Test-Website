(() => {
  window.dataLayer = window.dataLayer || [];

  const pushEvent = (payload) => {
    window.dataLayer.push(payload);
  };

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
    if (event.key === 'Escape' && navigation?.classList.contains('is-open')) {
      closeMenu();
      menuButton?.focus();
    }
  });

  const desktopNavigation = window.matchMedia('(min-width: 851px)');
  desktopNavigation.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });

  document.querySelectorAll('[data-track="cta_click"]').forEach((link) => {
    link.addEventListener('click', () => {
      pushEvent({
        event: 'cta_click',
        cta_location: link.dataset.ctaLocation || 'unknown',
        cta_label: link.dataset.ctaLabel || 'unknown',
        destination: link.getAttribute('href') || ''
      });
    });
  });

  const form = document.querySelector('[data-demo-form]');
  if (form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('[data-submit-button]');
    const status = form.querySelector('[data-form-status]');
    let formStarted = false;
    let formSubmitted = false;

    form.addEventListener('focusin', () => {
      if (formStarted) return;
      formStarted = true;
      pushEvent({ event: 'form_start', form_name: 'checklist_demo_form' });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (formSubmitted) return;

      if (!form.checkValidity()) {
        status.textContent = 'Enter a valid email address to continue.';
        form.reportValidity();
        return;
      }

      formSubmitted = true;
      submitButton.disabled = true;
      submitButton.setAttribute('aria-disabled', 'true');
      status.textContent = 'Opening your checklist…';
      emailInput.value = '';

      let hasRedirected = false;
      const redirect = () => {
        if (hasRedirected) return;
        hasRedirected = true;
        window.location.assign('thank-you.html');
      };

      pushEvent({
        event: 'generate_lead',
        form_name: 'checklist_demo_form',
        lead_magnet: 'quiet_website_review_checklist',
        eventCallback: redirect,
        eventTimeout: 1000
      });

      window.setTimeout(redirect, 1100);
    });
  }

  document.querySelectorAll('[data-track="file_download"]').forEach((link) => {
    link.addEventListener('click', () => {
      const fileName = link.dataset.fileName || link.getAttribute('href')?.split('/').pop() || '';
      const fileExtension = fileName.includes('.') ? fileName.split('.').pop().toLowerCase() : '';
      pushEvent({
        event: 'file_download',
        file_name: fileName,
        file_extension: fileExtension,
        link_url: link.href
      });
    });
  });

  const dialog = document.querySelector('[data-pro-dialog]');
  let lastProTrigger = null;

  const closeDialog = () => {
    if (typeof dialog?.close === 'function') {
      dialog.close();
    } else {
      dialog?.removeAttribute('open');
      lastProTrigger?.focus();
    }
  };

  document.querySelectorAll('[data-pro-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      lastProTrigger = trigger;
      pushEvent({
        event: 'pro_click',
        cta_location: trigger.dataset.ctaLocation || 'unknown',
        offer_name: 'quiet_review_pro'
      });

      if (typeof dialog?.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog?.setAttribute('open', '');
      }
    });
  });

  dialog?.querySelectorAll('[data-dialog-close]').forEach((button) => {
    button.addEventListener('click', closeDialog);
  });

  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });

  dialog?.addEventListener('close', () => {
    lastProTrigger?.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog?.open) {
      event.preventDefault();
      closeDialog();
    }
  });

  const scrollThresholds = [25, 50, 75, 90];
  const reachedThresholds = new Set();
  const pageType = document.body.dataset.pageType || 'article';

  const trackScrollDepth = () => {
    const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollableDistance <= 0) return;
    const percentScrolled = Math.min(100, Math.round((window.scrollY / scrollableDistance) * 100));

    scrollThresholds.forEach((threshold) => {
      if (percentScrolled < threshold || reachedThresholds.has(threshold)) return;
      reachedThresholds.add(threshold);
      pushEvent({ event: 'scroll_depth', percent_scrolled: threshold, page_type: pageType });
    });
  };

  updateHeader();
  trackScrollDepth();
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('scroll', trackScrollDepth, { passive: true });
})();
