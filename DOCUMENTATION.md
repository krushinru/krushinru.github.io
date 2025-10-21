# Jekyll Theme Personal - Документация

## Быстрый старт

### 1. Установка зависимостей

```bash
bundle install
```

### 2. Запуск локального сервера

```bash
bundle exec jekyll serve
```

Сайт будет доступен по адресу: http://localhost:4000

### 3. Структура проекта

```
jekyll-theme-personal/
├── _layouts/          # Шаблоны страниц
├── _includes/         # Переиспользуемые компоненты
├── _sass/            # SCSS стили
├── assets/           # CSS и другие ресурсы
├── example-site/     # Пример использования темы
└── README.md         # Основная документация
```

## Создание контента

### Главная страница

Файл `index.md` с layout: home автоматически покажет:
- Информацию о вас из _config.yml
- Последние 3 проекта
- Последние 5 постов

### Проекты

Создайте файлы в директории `_projects/`:

```markdown
---
title: Название проекта
description: Краткое описание
meta: 2025 • Категория
---

Подробное описание проекта...
```

### Посты блога

Создайте файлы в директории `_posts/` с именем `YYYY-MM-DD-название.md`:

```markdown
---
layout: post
title: Заголовок поста
date: 2025-10-21
tags: [тег1, тег2]
---

Содержание поста...
```

## Настройка темы

### Изменение цветов

Отредактируйте файл `_sass/base.scss`:

```scss
:root {
  --main-bg: #0a0a0a;      // Основной фон
  --card-bg: #141414;      // Фон карточек
  --white: #fff;           // Цвет текста
  --afisha-red: #E31E24;   // Акцентный цвет 1
  --rambler-blue: #315efb; // Акцентный цвет 2
}
```

### Изменение шрифтов

Отредактируйте `_includes/head.html` и измените ссылку на Google Fonts.

### Изменение максимальной ширины

В `_sass/base.scss` измените:

```scss
:root {
  --max-width: 940px; // Ваша ширина
}
```

## Деплой

### GitHub Pages

1. Создайте репозиторий на GitHub
2. Добавьте файл `.github/workflows/jekyll.yml`:

```yaml
name: Deploy Jekyll site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
      - run: bundle exec jekyll build
      - uses: actions/upload-pages-artifact@v2

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v2
        id: deployment
```

3. В настройках репозитория включите GitHub Pages

### Netlify

1. Подключите репозиторий к Netlify
2. Build command: `bundle exec jekyll build`
3. Publish directory: `_site`

## Кастомизация

### Добавление новых секций

Создайте файл в `_includes/` и включите его в нужный layout:

```liquid
{% include my-section.html %}
```

### Изменение навигации

Отредактируйте `_config.yml`:

```yaml
navigation:
  - title: Новый пункт
    url: /new-page/
```

### Добавление социальных ссылок

В `_config.yml` добавьте:

```yaml
social:
  - name: GitHub
    url: https://github.com/yourusername
    icon: fa-github
  - name: Twitter
    url: https://twitter.com/yourusername
    icon: fa-twitter
```

Затем создайте include для их отображения.

## Поддержка

Если у вас возникли вопросы или проблемы:

1. Проверьте документацию Jekyll: https://jekyllrb.com/docs/
2. Посмотрите пример в директории `example-site/`
3. Создайте issue в репозитории проекта

## Лицензия

MIT License - используйте свободно!
