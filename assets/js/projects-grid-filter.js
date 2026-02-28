document.addEventListener('DOMContentLoaded', function () {
  const statusDropdown = document.getElementById('statusDropdown');
  const statusMenu = document.getElementById('statusMenu');
  const statusValue = document.querySelector('.dropdown-value');
  const projectCards = document.querySelectorAll('.project-editorial-card');
  const roleSpans = document.querySelectorAll('.sentence-role');

  if (!projectCards.length) return;

  let currentStatus = 'all';
  let activeRoles = new Set();

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

  filterProjects();
});
