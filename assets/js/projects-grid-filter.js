if (!window.__editorialGridInitialized) {
  window.__editorialGridInitialized = true;

  document.addEventListener('DOMContentLoaded', function () {
    const gridSections = document.querySelectorAll('[data-editorial-grid]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!gridSections.length) return;

    function applyPairLogic(cards) {
      cards.forEach((card) => {
        card.classList.remove(
          'pair-left',
          'pair-right',
          'single',
          'span-2',
          'span-3',
          'span-4',
          'span-6',
          'hide-image',
          'hide-facts',
          'hide-quote',
          'hide-media'
        );
      });

      for (let i = 0; i < cards.length; i += 2) {
        const leftCard = cards[i];
        const rightCard = cards[i + 1];

        if (!rightCard) {
          leftCard.classList.add('single', 'span-6');
          continue;
        }

        const leftHasImage = leftCard.querySelector('.project-editorial-image') !== null;
        const rightHasImage = rightCard.querySelector('.project-editorial-image') !== null;
        const leftHasFacts = leftCard.querySelector('.project-editorial-stats') !== null;
        const rightHasFacts = rightCard.querySelector('.project-editorial-stats') !== null;

        leftCard.classList.add('pair-left');
        rightCard.classList.add('pair-right');

        if (leftHasImage && !rightHasImage) {
          leftCard.classList.add('span-4', 'hide-facts');
          rightCard.classList.add('span-2', 'hide-image', 'hide-media');
        } else if (!leftHasImage && rightHasImage) {
          leftCard.classList.add('span-2', 'hide-media');
          rightCard.classList.add('span-4', 'hide-facts');
        } else if (leftHasImage && rightHasImage) {
          leftCard.classList.add('span-4', 'hide-facts');
          rightCard.classList.add('span-2', 'hide-image', 'hide-media');
        } else {
          leftCard.classList.add('span-3');
          rightCard.classList.add('span-3');

          if (leftHasFacts) {
            leftCard.classList.add('hide-media');
          }
          if (rightHasFacts) {
            rightCard.classList.add('hide-media');
          }
        }
      }
    }

    function initProjectRotators(section) {
      const rotators = section.querySelectorAll('.project-editorial-rotator');

      rotators.forEach((rotator) => {
        if (rotator.dataset.initialized === 'true') return;

        const items = rotator.querySelectorAll('.project-rotator-item');
        if (!items.length) return;

        let currentIndex = 0;
        items[currentIndex].classList.add('is-active');

        if (items.length > 1 && !prefersReducedMotion) {
          window.setInterval(() => {
            items[currentIndex].classList.remove('is-active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('is-active');
          }, 6000);
        }

        rotator.dataset.initialized = 'true';
      });
    }

    function initDesktopRotatingGroup(container, itemSelector, datasetFlag) {
      if (container.dataset[datasetFlag] === 'true') return;

      const items = Array.from(container.querySelectorAll(itemSelector));
      if (!items.length) return;

      items.forEach((item) => item.classList.remove('is-active'));
      items[0].classList.add('is-active');

      if (items.length > 1 && !prefersReducedMotion) {
        let maxHeight = 0;
        items.forEach((item) => {
          const itemHeight = Math.ceil(item.getBoundingClientRect().height);
          if (itemHeight > maxHeight) maxHeight = itemHeight;
        });

        if (maxHeight > 0) {
          container.style.minHeight = `${maxHeight}px`;
        }

        container.classList.add('rotator-enabled');

        let currentIndex = 0;
        window.setInterval(() => {
          items[currentIndex].classList.remove('is-active');
          currentIndex = (currentIndex + 1) % items.length;
          items[currentIndex].classList.add('is-active');
        }, 6000);
      }

      container.dataset[datasetFlag] = 'true';
    }

    function initDesktopEditorialRotators(section) {
      if (!window.matchMedia('(min-width: 769px)').matches) return;

      const statsGroups = section.querySelectorAll('.project-editorial-stats');
      statsGroups.forEach((statsGroup) => {
        initDesktopRotatingGroup(statsGroup, '.editorial-stat-item', 'desktopStatsRotator');
      });

      const mediaGroups = section.querySelectorAll('.project-editorial-media');
      mediaGroups.forEach((mediaGroup) => {
        initDesktopRotatingGroup(mediaGroup, '.editorial-media-item', 'desktopMediaRotator');
      });
    }

    function initEditorialSection(section) {
      if (section.dataset.initialized === 'true') {
        initDesktopEditorialRotators(section);
        return;
      }

      const statusDropdown = section.querySelector('[data-status-dropdown]');
      const statusMenu = section.querySelector('[data-status-menu]');
      const statusValue = section.querySelector('[data-status-value]');
      const projectCards = Array.from(section.querySelectorAll('.project-editorial-card'));
      const roleSpans = section.querySelectorAll('.sentence-role');

      if (!projectCards.length) return;

      let currentStatus = 'all';
      let activeRoles = new Set();

      function filterProjects() {
        const visibleCards = [];

        projectCards.forEach((card) => {
          const cardStatus = card.dataset.status;
          const cardRoles = (card.dataset.roles || '').toLowerCase().split(',');

          const matchStatus = currentStatus === 'all' || cardStatus === currentStatus;
          const matchRoles =
            activeRoles.size === 0 ||
            [...activeRoles].some((role) => cardRoles.includes(role));

          if (matchStatus && matchRoles) {
            card.style.display = '';
            visibleCards.push(card);
          } else {
            card.style.display = 'none';
          }
        });

        applyPairLogic(visibleCards);
      }

      if (statusDropdown && statusMenu) {
        statusDropdown.addEventListener('click', function (e) {
          e.stopPropagation();
          statusMenu.classList.toggle('active');
        });

        document.addEventListener('click', function () {
          statusMenu.classList.remove('active');
        });

        statusMenu.querySelectorAll('.dropdown-item').forEach((item) => {
          item.addEventListener('click', function (e) {
            e.stopPropagation();
            currentStatus = this.dataset.status;

            statusMenu.querySelectorAll('.dropdown-item').forEach((menuItem) => {
              menuItem.classList.remove('active');
            });
            this.classList.add('active');

            if (statusValue) statusValue.textContent = this.textContent;
            statusMenu.classList.remove('active');

            filterProjects();
          });
        });
      }

      roleSpans.forEach((span) => {
        span.addEventListener('click', function () {
          const role = this.dataset.role;

          if (activeRoles.has(role)) {
            activeRoles.delete(role);
            this.classList.remove('active');
          } else {
            activeRoles.add(role);
            this.classList.add('active');
          }

          filterProjects();
        });
      });

      filterProjects();
      initProjectRotators(section);
      initDesktopEditorialRotators(section);
      section.dataset.initialized = 'true';
    }

    gridSections.forEach(initEditorialSection);
    window.addEventListener('resize', function () {
      gridSections.forEach(initEditorialSection);
    });
  });
}
