(function () {
  const tabs = Array.from(document.querySelectorAll('[data-shelf-tab]'));
  if (!tabs.length) return;

  const activate = (tab, moveFocus = false) => {
    tabs.forEach((candidate) => {
      const isActive = candidate === tab;
      const panel = document.getElementById(candidate.getAttribute('aria-controls'));

      candidate.classList.toggle('is-active', isActive);
      candidate.setAttribute('aria-selected', String(isActive));
      candidate.tabIndex = isActive ? 0 : -1;

      if (panel) {
        panel.hidden = !isActive;
        panel.classList.toggle('is-hidden', !isActive);
      }
    });

    if (moveFocus) tab.focus();
    window.history.replaceState(null, '', `#${tab.dataset.shelfTab}`);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      activate(tabs[nextIndex], true);
    });
  });

  const requestedTab = window.location.hash.slice(1);
  const initialTab = tabs.find((tab) => tab.dataset.shelfTab === requestedTab);
  if (initialTab) activate(initialTab);
})();

