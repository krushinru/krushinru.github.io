# Достижения: как поддерживать и расширять

Документ описывает текущую систему ачивок на сайте:
- рендер страницы `/profile/`;
- хранение состояния в `localStorage`;
- правила добавления новых достижений и пользовательских событий.

## Где что лежит

- Логика и конфиг ачивок: `assets/js/achievements.js`
- Страница профиля: `profile.md`
- Стили: `_sass/_sections.scss` и `_sass/_responsive.scss`

## Контракт разметки страницы `/profile/`

Для корректной работы JS на странице должны быть элементы с атрибутами:

1. `data-achievements-summary` — контейнер сводки прогресса.
2. `data-achievements-grid` — контейнер списка карточек достижений.
3. `data-achievements-reset` — кнопка сброса прогресса.

Минимальный каркас:

```html
<div data-achievements-summary></div>
<div data-achievements-grid></div>
<button data-achievements-reset>Сбросить прогресс</button>
```

Если один из первых двух контейнеров отсутствует, рендер достижений не выполняется.

## Формат достижения в `ACHIEVEMENTS`

Каждая ачивка — объект в массиве `ACHIEVEMENTS`:

```js
{
  id: 'unique_id',
  title: 'Название',
  description: 'Что нужно сделать',
  group: 'Навигация',
  rarity: 'common', // common | rare | epic | legendary
  points: 20,       // XP
  symbol: 'PR',     // короткая метка до 3 символов
  isUnlocked: (state) => boolean,
  getProgress: (state) => progressValue(current, total)
}
```

Правила:

1. `id` должен быть уникальным и стабильным (не переименовывай без необходимости).
2. В `isUnlocked` должна быть только логика проверки условия.
3. В `getProgress` всегда возвращай `progressValue(...)`, чтобы UI получил валидные границы прогресса.
4. `rarity` лучше выбирать из `common/rare/epic/legendary` (иначе автоматически станет `common`).

## Как добавить новую ачивку

1. Открой `assets/js/achievements.js`.
2. В массив `ACHIEVEMENTS` добавь новый объект.
3. Привяжи его к уже существующим счётчикам в `state.metrics`/`visited*` или `customCounters`.
4. Пересобери сайт и проверь карточку на `/profile/`.

Пример:

```js
{
  id: 'deep_reader',
  title: 'Глубокое чтение',
  description: 'Открыть 5 заметок.',
  group: 'Контент',
  rarity: 'epic',
  points: 80,
  symbol: 'R5',
  isUnlocked: (state) => state.metrics.noteDetailViews >= 5,
  getProgress: (state) => progressValue(state.metrics.noteDetailViews, 5)
}
```

## Как трекать новые действия через разметку

В системе есть встроенный универсальный трекер на атрибуте `data-achievement-event`.

Пример разметки:

```html
<a href="/projects/" data-achievement-event="open_projects_list">Проекты</a>
<button data-achievement-event="cta_click" data-achievement-increment="2">CTA</button>
```

Что важно:

1. `data-achievement-event` — имя события (любая короткая строка).
2. `data-achievement-increment` — необязательный инкремент (по умолчанию `1`).
3. Событие увеличивает `state.customCounters[eventName]`.

После этого можно создать ачивку на пользовательский счётчик:

```js
{
  id: 'cta_master',
  title: 'Мастер CTA',
  description: 'Нажать CTA 10 раз.',
  group: 'Активность',
  rarity: 'rare',
  points: 40,
  symbol: 'CTA',
  isUnlocked: (state) => (state.customCounters.cta_click || 0) >= 10,
  getProgress: (state) => progressValue(state.customCounters.cta_click || 0, 10)
}
```

## Если нужен новый системный счётчик

Если метрика не покрывается существующими полями:

1. Добавь поле в `getInitialState().metrics`.
2. Добавь нормализацию в `normalizeState`.
3. Добавь логику инкремента (обычно в `trackCurrentPage` или `onDocumentClick`).
4. Используй поле в `isUnlocked/getProgress` новой ачивки.

## Сброс и версия хранилища

- Данные хранятся в `localStorage` по ключу `krushin_achievements_v1`.
- Кнопка с `data-achievements-reset` удаляет ключ и создаёт чистое состояние.
- Если структура данных меняется несовместимо, подними версию ключа (например, `..._v2`) и мигрируй состояние при необходимости.

## Чеклист перед коммитом

1. `node --check assets/js/achievements.js`
2. `bundle exec jekyll build`
3. Проверка `/profile/` на desktop и mobile.
4. Проверка, что новая ачивка:
   - отображается в карточках;
   - получает прогресс;
   - открывается и сохраняется после перезагрузки.
