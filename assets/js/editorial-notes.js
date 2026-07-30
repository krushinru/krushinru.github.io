(function () {
  'use strict';

  const root = document.querySelector('.js-editorial-notes');
  const triggers = Array.from(document.querySelectorAll('.js-editorial-note-trigger'));
  if (!root || triggers.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const panel = root.querySelector('.editorial-notes__panel');
  const title = root.querySelector('#editorial-notes-title');
  const body = root.querySelector('#editorial-notes-body');
  const closeTargets = Array.from(root.querySelectorAll('.js-editorial-note-close'));
  const templates = new Map(
    Array.from(root.querySelectorAll('template[data-editorial-note]'))
      .map((template) => [template.dataset.editorialNote, template])
  );
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  let activeTrigger = null;
  let closeTimer = null;

  const close = () => {
    if (root.hidden) return;

    if (closeTimer !== null) window.clearTimeout(closeTimer);
    root.classList.remove('is-open');
    document.body.classList.remove('editorial-notes-open');
    triggers.forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));

    const delay = reducedMotion.matches ? 0 : 260;
    closeTimer = window.setTimeout(() => {
      root.hidden = true;
      if (activeTrigger) activeTrigger.focus({ preventScroll: true });
      activeTrigger = null;
      closeTimer = null;
    }, delay);
  };

  const open = (trigger) => {
    const template = templates.get(trigger.dataset.editorialNote);
    if (!template) return;

    if (closeTimer !== null) window.clearTimeout(closeTimer);
    title.textContent = template.dataset.title;
    body.replaceChildren(template.content.cloneNode(true));
    activeTrigger = trigger;
    root.hidden = false;
    document.body.classList.add('editorial-notes-open');
    triggers.forEach((item) => {
      item.setAttribute('aria-expanded', String(item === trigger));
    });

    window.requestAnimationFrame(() => {
      root.classList.add('is-open');
      panel.focus({ preventScroll: true });
    });
  };

  triggers.forEach((trigger) => {
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', 'editorial-notes-panel');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', () => open(trigger));
  });

  closeTargets.forEach((target) => target.addEventListener('click', close));

  document.addEventListener('keydown', (event) => {
    if (root.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = Array.from(panel.querySelectorAll(focusableSelector));
    if (focusable.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
