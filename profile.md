---
layout: default
title: Достижения
permalink: /profile/
---

<section class="section profile-page">
  <header class="achievements-hero">
    <p class="achievements-hero__kicker">Геймификация</p>
    <h1 class="section-title achievements-hero__title">Привет, %username%</h1>
    <p class="profile-intro">Открывай ачивки за действия на сайте. Прогресс хранится в браузере через localStorage и остаётся на этом устройстве.</p>
  </header>

  <div class="achievements-overview" data-achievements-summary aria-live="polite">
    <p class="achievements-overview__count">Загрузка прогресса...</p>
  </div>

  <div class="achievements-toolbar">
    <p class="achievements-toolbar__hint">Прогресс хранится в браузере и остаётся на этом устройстве</p>
    <button type="button" class="achievements-reset-btn" data-achievements-reset>Сбросить</button>
  </div>

  <div class="achievements-grid" data-achievements-grid></div>
</section>
