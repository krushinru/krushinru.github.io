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
          'bento-hero',
          'bento-wide',
          'bento-tall',
          'bento-compact',
          'bento-muted',
          'hide-image',
          'hide-facts',
          'hide-quote',
          'hide-media'
        );
      });

      const pattern = [
        ['bento-hero', 'span-4'],
        ['bento-tall', 'span-2'],
        ['bento-wide', 'span-3'],
        ['bento-compact', 'span-3'],
        ['bento-wide', 'span-4'],
        ['bento-compact', 'span-2']
      ];

      cards.forEach((card, index) => {
        const [shapeClass, spanClass] = pattern[index % pattern.length];
        const hasImage = card.querySelector('.project-editorial-image') !== null;
        const hasIcon = card.querySelector('.project-editorial-app-icon') !== null;

        card.classList.add(shapeClass, spanClass);

        if (index === cards.length - 1 && cards.length % 2 === 1 && cards.length > 1) {
          card.classList.remove('span-2', 'span-3', 'span-4');
          card.classList.add('single', 'span-6');
        }

        if (shapeClass === 'bento-compact') {
          card.classList.add('hide-media');
        }

        if (shapeClass === 'bento-tall' && hasImage) {
          card.classList.add('hide-media');
        }

        if (!hasImage && !hasIcon && shapeClass !== 'bento-hero') {
          card.classList.add('bento-muted');
        }
      });
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

      if (!projectCards.length) {
        initProjectRotators(section);
        initDesktopEditorialRotators(section);
        section.dataset.initialized = 'true';
        return;
      }

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

      const sortHost = section.closest('section') || section.parentElement;
      const sortPills = sortHost
        ? sortHost.querySelectorAll('[data-projects-sort] .projects-sort-pill')
        : [];
      const grid = section.querySelector('.projects-editorial-grid');
      const marquee = grid ? grid.querySelector('.projects-side-marquee') : null;

      function compareFeatured(a, b) {
        const aFO = parseInt(a.dataset.featuredOrder, 10);
        const bFO = parseInt(b.dataset.featuredOrder, 10);
        const aHas = !Number.isNaN(aFO);
        const bHas = !Number.isNaN(bFO);
        if (aHas && bHas) return aFO - bFO;
        if (aHas) return -1;
        if (bHas) return 1;
        return (parseInt(b.dataset.launchYear, 10) || 0) - (parseInt(a.dataset.launchYear, 10) || 0);
      }

      function compareChrono(a, b) {
        return (parseInt(b.dataset.launchYear, 10) || 0) - (parseInt(a.dataset.launchYear, 10) || 0);
      }

      function applySort(mode) {
        if (!grid) return;
        const cards = Array.from(grid.querySelectorAll('.project-editorial-card'));
        if (!cards.length) return;

        cards.sort(mode === 'chrono' ? compareChrono : compareFeatured);
        cards.forEach((card) => grid.appendChild(card));

        if (marquee && cards.length >= 2) {
          grid.insertBefore(marquee, cards[1].nextSibling);
        } else if (marquee) {
          grid.appendChild(marquee);
        }

        applyPairLogic(cards.filter((c) => c.style.display !== 'none'));
      }

      sortPills.forEach((pill) => {
        pill.addEventListener('click', function () {
          const mode = this.dataset.sort;
          sortPills.forEach((p) => {
            p.classList.remove('is-active');
            p.setAttribute('aria-pressed', 'false');
          });
          this.classList.add('is-active');
          this.setAttribute('aria-pressed', 'true');
          applySort(mode);
        });
      });

      if (sortPills.length && marquee) {
        applySort('featured');
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
