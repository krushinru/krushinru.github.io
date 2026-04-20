---
layout: default
lang: ru
locale: ru_RU
translation_key: profile
title: Достижения
description: Ачивки и прогресс на сайте Александра Крушина
permalink: /ru/profile/
---

{% assign t = site.data.i18n[page.lang] %}

<section class="section profile-page">
  <header class="achievements-hero">
    <p class="achievements-hero__kicker">{{ t.profile.kicker }}</p>
    <h1 class="section-title achievements-hero__title">{{ t.profile.greeting }}</h1>
    <p class="profile-intro">{{ t.profile.intro }}</p>
  </header>

  <div class="achievements-overview" data-achievements-summary aria-live="polite">
    <p class="achievements-overview__count">{{ t.profile.loading }}</p>
  </div>

  <div class="achievements-toolbar">
    <p class="achievements-toolbar__hint">{{ t.profile.hint }}</p>
    <button type="button" class="achievements-reset-btn" data-achievements-reset>{{ t.profile.reset }}</button>
  </div>

  <div class="achievements-grid" data-achievements-grid></div>
</section>
