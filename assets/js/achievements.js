(function () {
  const STORAGE_KEY = 'krushin_achievements_v1';
  const KNOWN_RARITIES = ['common', 'rare', 'epic', 'legendary'];

  const RARITY_LABELS = {
    common: 'Обычная',
    rare: 'Редкая',
    epic: 'Эпическая',
    legendary: 'Легендарная'
  };

  const ACHIEVEMENTS = [
    {
      id: 'first_visit',
      title: 'Первый шаг',
      description: 'Открыть любую страницу сайта.',
      group: 'Навигация',
      rarity: 'common',
      points: 10,
      symbol: 'ST',
      isUnlocked: (state) => state.metrics.pageViews >= 1,
      getProgress: (state) => progressValue(state.metrics.pageViews, 1)
    },
    {
      id: 'projects_page',
      title: 'Проектолог',
      description: 'Зайти на страницу проектов.',
      group: 'Навигация',
      rarity: 'common',
      points: 15,
      symbol: 'PR',
      isUnlocked: (state) => state.visitedPaths.includes('/projects/'),
      getProgress: (state) => progressValue(state.visitedPaths.includes('/projects/') ? 1 : 0, 1)
    },
    {
      id: 'notes_page',
      title: 'Читатель',
      description: 'Зайти на страницу заметок.',
      group: 'Навигация',
      rarity: 'common',
      points: 15,
      symbol: 'NT',
      isUnlocked: (state) => state.visitedPaths.includes('/notes/'),
      getProgress: (state) => progressValue(state.visitedPaths.includes('/notes/') ? 1 : 0, 1)
    },
    {
      id: 'project_detail',
      title: 'Исследователь',
      description: 'Открыть хотя бы один отдельный проект.',
      group: 'Контент',
      rarity: 'rare',
      points: 25,
      symbol: 'PD',
      isUnlocked: (state) => state.metrics.projectDetailViews >= 1,
      getProgress: (state) => progressValue(state.metrics.projectDetailViews, 1)
    },
    {
      id: 'note_detail',
      title: 'Авторский след',
      description: 'Открыть хотя бы одну отдельную заметку.',
      group: 'Контент',
      rarity: 'rare',
      points: 25,
      symbol: 'ND',
      isUnlocked: (state) => state.metrics.noteDetailViews >= 1,
      getProgress: (state) => progressValue(state.metrics.noteDetailViews, 1)
    },
    {
      id: 'profile_visit',
      title: 'Личный кабинет',
      description: 'Открыть страницу профиля.',
      group: 'Профиль',
      rarity: 'common',
      points: 10,
      symbol: 'PF',
      isUnlocked: (state) => state.visitedPaths.includes('/profile/'),
      getProgress: (state) => progressValue(state.visitedPaths.includes('/profile/') ? 1 : 0, 1)
    },
    {
      id: 'site_explorer',
      title: 'Навигатор',
      description: 'Посетить 3 разные страницы сайта.',
      group: 'Навигация',
      rarity: 'rare',
      points: 30,
      symbol: 'EX',
      isUnlocked: (state) => state.visitedPaths.length >= 3,
      getProgress: (state) => progressValue(state.visitedPaths.length, 3)
    },
    {
      id: 'returning_user',
      title: 'Постоянный гость',
      description: 'Вернуться на сайт в 3 разных дня.',
      group: 'Лояльность',
      rarity: 'epic',
      points: 50,
      symbol: 'RT',
      isUnlocked: (state) => state.visitedDays.length >= 3,
      getProgress: (state) => progressValue(state.visitedDays.length, 3)
    },
    {
      id: 'marathon',
      title: 'Марафон',
      description: 'Набрать 10 просмотров страниц.',
      group: 'Активность',
      rarity: 'epic',
      points: 60,
      symbol: '10X',
      isUnlocked: (state) => state.metrics.pageViews >= 10,
      getProgress: (state) => progressValue(state.metrics.pageViews, 10)
    },
    {
      id: 'telegram_click',
      title: 'На связи',
      description: 'Кликнуть по ссылке Telegram.',
      group: 'Контакт',
      rarity: 'rare',
      points: 20,
      symbol: 'TG',
      isUnlocked: (state) => state.metrics.telegramClicks >= 1,
      getProgress: (state) => progressValue(state.metrics.telegramClicks, 1)
    },
    {
      id: 'email_click',
      title: 'Контакт',
      description: 'Кликнуть по email-ссылке.',
      group: 'Контакт',
      rarity: 'rare',
      points: 20,
      symbol: 'ML',
      isUnlocked: (state) => state.metrics.emailClicks >= 1,
      getProgress: (state) => progressValue(state.metrics.emailClicks, 1)
    }
  ];

  let state = loadState();

  function getInitialState() {
    return {
      metrics: {
        pageViews: 0,
        projectDetailViews: 0,
        noteDetailViews: 0,
        telegramClicks: 0,
        emailClicks: 0
      },
      visitedPaths: [],
      visitedDays: [],
      unlocked: {},
      customCounters: {}
    };
  }

  function parseIntWithDefault(value, fallback) {
    const number = Number(value);
    if (!Number.isFinite(number) || number < 0) {
      return fallback;
    }
    return Math.floor(number);
  }

  function progressValue(current, total) {
    const normalizedTotal = Math.max(1, parseIntWithDefault(total, 1));
    return {
      current: Math.min(Math.max(0, parseIntWithDefault(current, 0)), normalizedTotal),
      total: normalizedTotal
    };
  }

  function normalizeProgress(value) {
    if (!value || typeof value !== 'object') {
      return progressValue(0, 1);
    }
    return progressValue(value.current, value.total);
  }

  function normalizeAchievementMeta(achievement) {
    const group = typeof achievement.group === 'string' && achievement.group.trim().length > 0
      ? achievement.group.trim()
      : 'Общее';
    const points = parseIntWithDefault(achievement.points, 10);
    const symbol = typeof achievement.symbol === 'string' && achievement.symbol.trim().length > 0
      ? achievement.symbol.trim().slice(0, 3).toUpperCase()
      : 'XP';
    const rarity = KNOWN_RARITIES.includes(achievement.rarity) ? achievement.rarity : 'common';

    return {
      ...achievement,
      group,
      points,
      symbol,
      rarity
    };
  }

  function normalizeState(rawValue) {
    const safeState = getInitialState();
    const input = rawValue && typeof rawValue === 'object' ? rawValue : {};
    const inputMetrics = input.metrics && typeof input.metrics === 'object' ? input.metrics : {};
    const inputUnlocked = input.unlocked && typeof input.unlocked === 'object' ? input.unlocked : {};
    const inputCustom = input.customCounters && typeof input.customCounters === 'object' ? input.customCounters : {};

    safeState.metrics.pageViews = parseIntWithDefault(inputMetrics.pageViews, 0);
    safeState.metrics.projectDetailViews = parseIntWithDefault(inputMetrics.projectDetailViews, 0);
    safeState.metrics.noteDetailViews = parseIntWithDefault(inputMetrics.noteDetailViews, 0);
    safeState.metrics.telegramClicks = parseIntWithDefault(inputMetrics.telegramClicks, 0);
    safeState.metrics.emailClicks = parseIntWithDefault(inputMetrics.emailClicks, 0);

    if (Array.isArray(input.visitedPaths)) {
      safeState.visitedPaths = input.visitedPaths
        .filter((item) => typeof item === 'string' && item.length > 0)
        .slice(0, 200);
    }

    if (Array.isArray(input.visitedDays)) {
      safeState.visitedDays = input.visitedDays
        .filter((item) => typeof item === 'string' && item.length > 0)
        .slice(0, 200);
    }

    Object.keys(inputUnlocked).forEach((id) => {
      if (typeof inputUnlocked[id] === 'string' && inputUnlocked[id].length > 0) {
        safeState.unlocked[id] = inputUnlocked[id];
      }
    });

    Object.keys(inputCustom).forEach((name) => {
      safeState.customCounters[name] = parseIntWithDefault(inputCustom[name], 0);
    });

    return safeState;
  }

  function loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return getInitialState();
      }
      return normalizeState(JSON.parse(raw));
    } catch (error) {
      return getInitialState();
    }
  }

  function saveState() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // No-op when localStorage is blocked by browser settings.
    }
  }

  function addUnique(list, value, maxItems) {
    if (!list.includes(value)) {
      list.push(value);
    }
    if (list.length > maxItems) {
      list.splice(0, list.length - maxItems);
    }
  }

  function normalizePath(pathname) {
    if (typeof pathname !== 'string' || pathname.length === 0) {
      return '/';
    }

    let normalized = pathname.replace(/\/{2,}/g, '/');
    if (!normalized.startsWith('/')) {
      normalized = '/' + normalized;
    }

    if (normalized !== '/' && !normalized.endsWith('/')) {
      normalized = normalized + '/';
    }

    return normalized;
  }

  function normalizeEventName(rawValue) {
    if (typeof rawValue !== 'string') {
      return '';
    }

    return rawValue
      .trim()
      .replace(/\s+/g, '_')
      .slice(0, 64);
  }

  function incrementCustomCounter(eventName, increment) {
    if (!eventName) {
      return;
    }
    const currentValue = parseIntWithDefault(state.customCounters[eventName], 0);
    state.customCounters[eventName] = currentValue + Math.max(1, parseIntWithDefault(increment, 1));
  }

  function getTodayKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function unlockAchievement(achievementId) {
    if (state.unlocked[achievementId]) {
      return;
    }
    state.unlocked[achievementId] = new Date().toISOString();
  }

  function evaluateAchievements() {
    ACHIEVEMENTS.forEach((achievementRaw) => {
      const achievement = normalizeAchievementMeta(achievementRaw);
      if (achievement.isUnlocked(state)) {
        unlockAchievement(achievement.id);
      }
    });
  }

  function trackCurrentPage() {
    const path = normalizePath(window.location.pathname);
    state.metrics.pageViews += 1;

    addUnique(state.visitedPaths, path, 200);
    addUnique(state.visitedDays, getTodayKey(), 200);

    if (path.startsWith('/projects/') && path !== '/projects/') {
      state.metrics.projectDetailViews += 1;
    }

    if (path.startsWith('/notes/') && path !== '/notes/') {
      state.metrics.noteDetailViews += 1;
    }
  }

  function onDocumentClick(event) {
    let hasChanges = false;
    const trackedElement = event.target.closest('[data-achievement-event]');
    if (trackedElement) {
      const eventName = normalizeEventName(trackedElement.getAttribute('data-achievement-event'));
      if (eventName) {
        const increment = trackedElement.getAttribute('data-achievement-increment') || 1;
        incrementCustomCounter(eventName, increment);
        hasChanges = true;
      }
    }

    const link = event.target.closest('a[href]');
    if (link) {
      const rawHref = link.getAttribute('href') || '';

      if (rawHref.startsWith('mailto:')) {
        state.metrics.emailClicks += 1;
        hasChanges = true;
      }

      const href = link.href || rawHref;
      if (/^https?:\/\/(t\.me|telegram\.me)\//i.test(href)) {
        state.metrics.telegramClicks += 1;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return;
    }

    evaluateAchievements();
    saveState();
    renderProfile();
  }

  function formatUnlockDate(rawDate) {
    if (!rawDate) {
      return '';
    }
    const date = new Date(rawDate);
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getProgressPercent(progress) {
    if (!progress || progress.total <= 0) {
      return 0;
    }
    return Math.min(100, Math.max(0, Math.round((progress.current / progress.total) * 100)));
  }

  function getAchievementStatuses() {
    return ACHIEVEMENTS.map((achievementRaw) => {
      const achievement = normalizeAchievementMeta(achievementRaw);
      const unlockedAt = state.unlocked[achievement.id];
      const isUnlocked = Boolean(unlockedAt);
      const progress = normalizeProgress(achievement.getProgress(state));
      const progressPercent = isUnlocked ? 100 : getProgressPercent(progress);

      return {
        achievement,
        unlockedAt,
        isUnlocked,
        progress,
        progressPercent
      };
    });
  }

  function sortAchievementStatuses(statuses) {
    return [...statuses].sort((left, right) => {
      if (left.isUnlocked !== right.isUnlocked) {
        return left.isUnlocked ? -1 : 1;
      }

      if (left.progressPercent !== right.progressPercent) {
        return right.progressPercent - left.progressPercent;
      }

      return right.achievement.points - left.achievement.points;
    });
  }

  function renderProfile() {
    const summaryEl = document.querySelector('[data-achievements-summary]');
    const gridEl = document.querySelector('[data-achievements-grid]');
    if (!summaryEl || !gridEl) {
      return;
    }

    const statuses = sortAchievementStatuses(getAchievementStatuses());
    const unlockedCount = statuses.filter((status) => status.isUnlocked).length;
    const totalCount = statuses.length;
    const totalPoints = statuses.reduce((sum, status) => sum + status.achievement.points, 0);
    const unlockedPoints = statuses.reduce((sum, status) => {
      return status.isUnlocked ? sum + status.achievement.points : sum;
    }, 0);
    const progressPercent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

    summaryEl.innerHTML = `
      <div class="achievements-overview__top">
        <div>
          <p class="achievements-overview__count">${unlockedCount} из ${totalCount} достижений открыто</p>
          <p class="achievements-overview__meta">XP: ${unlockedPoints} / ${totalPoints}</p>
        </div>
        <div class="achievements-overview__ring" style="--achievements-progress: ${progressPercent}%;">
          <span>${progressPercent}%</span>
        </div>
      </div>
      <div class="achievements-overview__bar" role="progressbar" aria-label="Общий прогресс достижений" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progressPercent}">
        <span style="width: ${progressPercent}%;"></span>
      </div>
    `;

    gridEl.innerHTML = statuses.map((status) => {
      const achievement = status.achievement;
      const unlockedText = status.isUnlocked ? `Открыто: ${formatUnlockDate(status.unlockedAt)}` : 'Условие пока не выполнено';
      const progressText = status.isUnlocked
        ? 'Достижение получено'
        : `${status.progress.current} / ${status.progress.total}`;
      const rarityLabel = RARITY_LABELS[achievement.rarity] || RARITY_LABELS.common;

      return `
        <article class="achievement-card ${status.isUnlocked ? 'is-unlocked' : 'is-locked'} rarity-${achievement.rarity}">
          <div class="achievement-card__head">
            <span class="achievement-card__symbol" aria-hidden="true">${escapeHtml(achievement.symbol)}</span>
            <div class="achievement-card__chips">
              <span class="achievement-chip">${escapeHtml(achievement.group)}</span>
              <span class="achievement-chip achievement-chip--rarity">${escapeHtml(rarityLabel)}</span>
            </div>
          </div>

          <h3 class="achievement-card__title">${escapeHtml(achievement.title)}</h3>
          <p class="achievement-card__description">${escapeHtml(achievement.description)}</p>

          <div class="achievement-card__progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${status.progressPercent}">
            <span class="achievement-card__progress-fill" style="width: ${status.progressPercent}%;"></span>
          </div>

          <div class="achievement-card__meta">
            <span class="achievement-card__progress-label">${escapeHtml(progressText)}</span>
            <span class="achievement-card__points">${achievement.points} XP</span>
          </div>

          <p class="achievement-card__date">${escapeHtml(unlockedText)}</p>
        </article>
      `;
    }).join('');
  }

  function attachResetHandler() {
    const resetButton = document.querySelector('[data-achievements-reset]');
    if (!resetButton) {
      return;
    }

    resetButton.addEventListener('click', () => {
      const approved = window.confirm('Сбросить весь прогресс ачивок?');
      if (!approved) {
        return;
      }

      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        // No-op when localStorage is blocked by browser settings.
      }

      state = getInitialState();
      trackCurrentPage();
      evaluateAchievements();
      saveState();
      renderProfile();
    });
  }

  function init() {
    trackCurrentPage();
    evaluateAchievements();
    saveState();

    document.addEventListener('click', onDocumentClick, true);
    attachResetHandler();
    renderProfile();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
