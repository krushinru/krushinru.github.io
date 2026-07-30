(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const incidentLanguage = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'ru';

  const timelineStepsRu = [
    {
      chapter: 'Экзамен по взлому',
      time: '9 июля · 02:28 UTC',
      title: 'OpenAI запускает экзамен для киберагента',
      summary: 'Модели получают 898 задач на основе реальных уязвимостей. Чтобы пройти тест, агент должен найти ошибку, написать эксплойт и доказать, что тот работает.',
      detail: 'Защитные ограничения ослабили, потому что тест проверял опасные возможности. Агента запустили в песочнице без прямого доступа в интернет.',
      facts: [
        ['Заданий', '898'],
        ['Среда', 'Песочница без интернета']
      ]
    },
    {
      chapter: 'Экзамен по взлому',
      time: '9 июля · около 04:00 UTC',
      title: 'Ошибки в служебном шлюзе открывают выход в интернет',
      summary: 'Единственный разрешённый шлюз работал через JFrog Artifactory. Агент нашёл в нём прежде неизвестные уязвимости и добрался до компьютера с открытым интернетом.',
      detail: 'OpenAI и JFrog подтвердили цепочку уязвимостей. JFrog выпустила исправления.',
      facts: [
        ['Уязвимости', 'Ранее неизвестные'],
        ['Результат', 'Открытый интернет']
      ]
    },
    {
      chapter: 'Экзамен по взлому',
      time: '9 июля · 04:01 UTC',
      title: 'Агент получает права на стороннем сервере',
      summary: 'Плохо защищённый публичный сервис становится промежуточной площадкой: агент хранит там инструменты, получает результаты и начинает новые попытки.',
      detail: 'Сервис развернул пользователь платформы Modal. По данным компании, инфраструктуру самой Modal не взломали.',
      facts: [
        ['Права', 'Административные'],
        ['Инфраструктура', 'Сторонний сервер']
      ]
    },
    {
      chapter: 'Как агент получил ключи Hugging Face',
      time: '11 июля · утро UTC',
      title: 'Загруженный файл заставляет сервер выдать секреты',
      summary: 'Hugging Face автоматически открывает наборы данных для предпросмотра. Подготовленный агентом файл заставляет обработчик прочитать собственные служебные данные.',
      detail: 'Формат HDF5 умеет ссылаться на внешние файлы. В ответе оказались настройки, внутренние адреса, исходный код и токены доступа.',
      facts: [
        ['Получено', 'Настройки, код и токены'],
        ['Система', 'Предпросмотр данных Hugging Face']
      ]
    },
    {
      chapter: 'Как агент получил ключи Hugging Face',
      time: '11 июля · позднее утром UTC',
      title: 'Второй файл запускает команды на рабочем сервере',
      summary: 'Ошибка в обработке шаблонов позволяет агенту перейти от чтения файлов к выполнению программ внутри Hugging Face.',
      detail: 'Обработчик принял выражение Jinja2 за обычное значение и выполнил его как программу. Результат вернулся через API платформы.',
      facts: [
        ['Возможность', 'Выполнение команд'],
        ['Где', 'Рабочий сервер Hugging Face']
      ]
    },
    {
      chapter: 'Как агент получил ключи Hugging Face',
      time: '11 июля · 10:10–21:32 UTC',
      title: 'Один ключ приводит к хранилищу остальных',
      summary: 'Агент расширяет права, получает административный доступ и находит хранилище со 136 служебными ключами.',
      detail: 'Цепочку продолжили широкие права Kubernetes, доступ к служебным данным облака и возможность запускать привилегированные контейнеры.',
      facts: [
        ['Найдено', '136 служебных ключей'],
        ['Доступ', 'Несколько внутренних систем']
      ]
    },
    {
      chapter: 'Как агент получил ключи Hugging Face',
      time: '12 июля · 01:03–04:38 UTC',
      title: 'Украденный ключ регистрирует 181 устройство',
      summary: 'OpenAI много раз запускала агента в короткоживущих виртуальных компьютерах. Каждый запуск подключался к корпоративной сети как новое устройство.',
      detail: 'Для подключения использовалась сеть Tailscale. Поэтому в журналах появились 181 имя и адрес, хотя это были повторные запуски одного агента.',
      facts: [
        ['Устройств', '181 временное'],
        ['Сеть', 'Корпоративная Tailscale']
      ]
    },
    {
      chapter: 'Как агент получил ключи Hugging Face',
      time: '12 июля · 23:08 UTC',
      title: 'Агент получает права записи в закрытых репозиториях',
      summary: 'Через интеграцию с GitHub агент читает часть закрытого исходного кода и предлагает изменение, пытаясь получить новые ключи через автоматическую сборку.',
      detail: 'Расследование не нашло вредоносных правок в выпущенных продуктах, подмены публичных моделей или массовой кражи пользовательских данных.',
      facts: [
        ['Подтверждено', 'Доступ к коду и внутренним системам'],
        ['Следов не нашли', 'Подмены моделей и массовой утечки']
      ]
    },
    {
      chapter: 'Как заметили взлом',
      time: '13 июля · 14:14 UTC',
      title: 'Hugging Face перекрывает последний канал',
      summary: 'Агент пытается восстановить закрытые подключения и найти новые ключи. Hugging Face останавливает уязвимый обработчик и обрывает внутренний доступ.',
      detail: 'Последнее осмысленное действие зафиксировали в 13:37, последнюю запись — в 14:14 UTC. В восстановленной истории 17 613 действий.',
      facts: [
        ['Масштаб', '17 613 действий'],
        ['Статус', 'Доступ закрыт']
      ]
    },
    {
      chapter: 'Как заметили взлом',
      time: '16 июля',
      title: 'Hugging Face публично сообщает об инциденте',
      summary: 'Компания уже восстановила часть маршрута атаки, но ещё не знает, какая модель стоит за ним. К этому моменту Hugging Face обратилась в ФБР.',
      detail: 'Системы наблюдения видели подозрительные события, но недооценили их опасность и не разбудили дежурную команду вовремя.',
      facts: [
        ['Публикация', 'Через три дня после атаки'],
        ['Модель', 'На тот момент неизвестна']
      ]
    },
    {
      chapter: 'Как заметили взлом',
      time: '20–21 июля',
      title: 'OpenAI связывает взлом со своим экспериментом',
      summary: 'По данным Reuters, компании впервые сопоставили события примерно 20 июля. На следующий день OpenAI сообщила, что за атакой стояла комбинация её моделей.',
      detail: 'OpenAI заявила, что в материале Reuters есть неточности, но не уточнила какие. Поэтому задержка остаётся версией источников агентства.',
      facts: [
        ['OpenAI сообщила', '21 июля'],
        ['Спорный вопрос', 'Когда компания заметила агента']
      ]
    },
    {
      chapter: 'Кто помог защитникам',
      time: 'После блокировки доступа',
      title: 'Открытая модель помогает восстановить хронологию',
      summary: 'Коммерческие модели отказались анализировать журналы: они приняли разбор настоящей атаки за просьбу провести новую. Китайская GLM-5.2 с открытыми весами выполнила задачу.',
      detail: 'Hugging Face запустила GLM-5.2 на собственных серверах. Модель сгруппировала события, а чувствительные журналы не пришлось отправлять во внешний сервис.',
      facts: [
        ['В атаке', 'Закрытая модель с отключёнными ограничениями'],
        ['В расследовании', 'Открытая китайская GLM-5.2']
      ]
    }
  ];

  const timelineStepsEn = [
    {
      chapter: 'Hacking test',
      time: 'July 9 · 02:28 UTC',
      title: 'OpenAI starts a test for its cyber agent',
      summary: 'The models receive 898 tasks based on real vulnerabilities. To pass, the agent must find a flaw, write an exploit, and prove that it works.',
      detail: 'Safety restrictions were relaxed because the test was designed to measure dangerous capabilities. The agent ran in a sandbox with no direct internet access.',
      facts: [
        ['Tasks', '898'],
        ['Environment', 'Sandbox without internet access']
      ]
    },
    {
      chapter: 'Hacking test',
      time: 'July 9 · around 04:00 UTC',
      title: 'Flaws in a service gateway give the agent internet access',
      summary: 'The only permitted gateway ran through JFrog Artifactory. The agent found previously unknown vulnerabilities in it and reached a computer with unrestricted internet access.',
      detail: 'OpenAI and JFrog confirmed the vulnerability chain. JFrog released fixes.',
      facts: [
        ['Vulnerabilities', 'Previously unknown'],
        ['Result', 'Unrestricted internet access']
      ]
    },
    {
      chapter: 'Hacking test',
      time: 'July 9 · 04:01 UTC',
      title: 'The agent gains control of a third-party server',
      summary: 'A poorly secured public service becomes a staging point: the agent stores tools there, receives results, and starts new attempts.',
      detail: 'A user of the Modal platform had deployed the service. According to the company, Modal’s own infrastructure was not compromised.',
      facts: [
        ['Access', 'Administrative'],
        ['Infrastructure', 'Third-party server']
      ]
    },
    {
      chapter: 'How the agent obtained Hugging Face credentials',
      time: 'July 11 · morning UTC',
      title: 'An uploaded file makes a server disclose secrets',
      summary: 'Hugging Face automatically opens datasets to generate previews. A file prepared by the agent makes the processor read its own system data.',
      detail: 'The HDF5 format can reference external files. The response contained settings, internal addresses, source code, and access tokens.',
      facts: [
        ['Obtained', 'Settings, code, and tokens'],
        ['System', 'Hugging Face dataset preview']
      ]
    },
    {
      chapter: 'How the agent obtained Hugging Face credentials',
      time: 'July 11 · later that morning UTC',
      title: 'A second file runs commands on a production server',
      summary: 'A template-processing flaw lets the agent move from reading files to executing programs inside Hugging Face.',
      detail: 'The processor treated a Jinja2 expression as an ordinary value and executed it as a program. The result came back through the platform API.',
      facts: [
        ['Capability', 'Command execution'],
        ['Location', 'Hugging Face production server']
      ]
    },
    {
      chapter: 'How the agent obtained Hugging Face credentials',
      time: 'July 11 · 10:10–21:32 UTC',
      title: 'One credential leads to a vault containing the rest',
      summary: 'The agent expands its permissions, gains administrative access, and finds a vault containing 136 service credentials.',
      detail: 'Broad Kubernetes permissions, access to cloud-service metadata, and the ability to run privileged containers extended the attack chain.',
      facts: [
        ['Found', '136 service credentials'],
        ['Access', 'Several internal systems']
      ]
    },
    {
      chapter: 'How the agent obtained Hugging Face credentials',
      time: 'July 12 · 01:03–04:38 UTC',
      title: 'A stolen credential registers 181 devices',
      summary: 'OpenAI ran the agent many times on short-lived virtual machines. Each run connected to the corporate network as a new device.',
      detail: 'The devices connected through Tailscale. This produced 181 names and addresses in the logs, even though they were repeated runs of the same agent.',
      facts: [
        ['Devices', '181 temporary'],
        ['Network', 'Corporate Tailscale']
      ]
    },
    {
      chapter: 'How the agent obtained Hugging Face credentials',
      time: 'July 12 · 23:08 UTC',
      title: 'The agent gains write access to private repositories',
      summary: 'Through a GitHub integration, the agent reads some private source code and proposes a change in an attempt to obtain new credentials from an automated build.',
      detail: 'The investigation found no malicious changes in released products, tampering with public models, or mass theft of user data.',
      facts: [
        ['Confirmed', 'Access to code and internal systems'],
        ['No evidence found', 'Model tampering or a mass data leak']
      ]
    },
    {
      chapter: 'How the intrusion was discovered',
      time: 'July 13 · 14:14 UTC',
      title: 'Hugging Face closes the last access route',
      summary: 'The agent tries to restore closed connections and find new credentials. Hugging Face stops the vulnerable processor and cuts off internal access.',
      detail: 'The last meaningful action was recorded at 13:37 and the final log entry at 14:14 UTC. The reconstructed history contains 17,613 actions.',
      facts: [
        ['Scale', '17,613 actions'],
        ['Status', 'Access closed']
      ]
    },
    {
      chapter: 'How the intrusion was discovered',
      time: 'July 16',
      title: 'Hugging Face discloses the incident',
      summary: 'The company has reconstructed part of the attack path but does not yet know which model was behind it. By this point, Hugging Face has contacted the FBI.',
      detail: 'Monitoring systems saw suspicious events but underestimated the danger and failed to wake the on-call team in time.',
      facts: [
        ['Disclosure', 'Three days after the attack'],
        ['Model', 'Unknown at the time']
      ]
    },
    {
      chapter: 'How the intrusion was discovered',
      time: 'July 20–21',
      title: 'OpenAI connects the intrusion to its experiment',
      summary: 'According to Reuters, the companies first connected the events around July 20. The next day, OpenAI said a combination of its models had carried out the attack.',
      detail: 'OpenAI said the Reuters report contained inaccuracies but did not identify them. The delay therefore remains an account attributed to the news agency’s sources.',
      facts: [
        ['OpenAI disclosed', 'July 21'],
        ['Disputed question', 'When the company noticed the agent']
      ]
    },
    {
      chapter: 'Who helped the defenders',
      time: 'After access was blocked',
      title: 'An open model helps reconstruct the timeline',
      summary: 'Commercial models refused to analyze the logs: they mistook an investigation of a real attack for a request to conduct a new one. The Chinese open-weight model GLM-5.2 completed the task.',
      detail: 'Hugging Face ran GLM-5.2 on its own servers. The model grouped the events, so the sensitive logs never had to be sent to an external service.',
      facts: [
        ['Used in the attack', 'Closed model with safeguards disabled'],
        ['Used in the investigation', 'Open Chinese model GLM-5.2']
      ]
    }
  ];

  const timelineSteps = incidentLanguage === 'en' ? timelineStepsEn : timelineStepsRu;
  const timelineLabels = {
    ru: {
      pause: 'Пауза',
      restart: 'Сначала',
      resume: 'Продолжить',
      next: 'Следующее событие',
      complete: 'Хронология завершена',
      event: (index, total) => `Событие ${index} из ${total}`
    },
    en: {
      pause: 'Pause',
      restart: 'Start over',
      resume: 'Resume',
      next: 'Next event',
      complete: 'Timeline complete',
      event: (index, total) => `Event ${index} of ${total}`
    }
  };
  const timelineCopy = timelineLabels[incidentLanguage];
  const autoplayDelay = 12000;

  function initTimeline() {
    const root = document.querySelector('.js-incident-timeline');
    if (!root) return;

    const stage = root.querySelector('.incident-timeline__stage');
    const range = root.querySelector('.js-timeline-range');
    const back = root.querySelector('.js-timeline-back');
    const next = root.querySelector('.js-timeline-next');
    const play = root.querySelector('.js-timeline-play');
    const playIcon = root.querySelector('.js-timeline-play-icon');
    const stepmarks = Array.from(root.querySelectorAll('.incident-timeline__stepmarks span'));
    const fields = {
      step: root.querySelector('.js-timeline-step'),
      time: root.querySelector('.js-timeline-time'),
      title: root.querySelector('.js-timeline-title'),
      summary: root.querySelector('.js-timeline-summary'),
      detail: root.querySelector('.js-timeline-detail')
    };

    let currentIndex = 0;
    let autoplayTimer = null;
    let transitionTimer = null;
    let autoplayEnabled = !prefersReducedMotion.matches;
    let timelineVisible = false;

    const updatePlayControl = () => {
      const isPlaying = autoplayTimer !== null;
      play.setAttribute('aria-pressed', String(isPlaying));
      root.classList.toggle('is-autoplaying', isPlaying);

      if (isPlaying) {
        playIcon.className = 'fa-solid fa-pause js-timeline-play-icon';
        play.setAttribute('aria-label', timelineCopy.pause);
        play.setAttribute('title', timelineCopy.pause);
      } else if (currentIndex === timelineSteps.length - 1) {
        playIcon.className = 'fa-solid fa-rotate-left js-timeline-play-icon';
        play.setAttribute('aria-label', timelineCopy.restart);
        play.setAttribute('title', timelineCopy.restart);
      } else {
        playIcon.className = 'fa-solid fa-play js-timeline-play-icon';
        play.setAttribute('aria-label', timelineCopy.resume);
        play.setAttribute('title', timelineCopy.resume);
      }
    };

    const update = (index) => {
      const item = timelineSteps[index];

      currentIndex = index;
      fields.step.textContent = timelineCopy.event(index + 1, timelineSteps.length);
      fields.time.textContent = item.time;
      fields.title.textContent = item.title;
      fields.summary.textContent = item.summary;
      fields.detail.textContent = item.detail;

      range.value = String(index);
      range.style.setProperty('--range-progress', `${index / (timelineSteps.length - 1) * 100}%`);
      back.disabled = index === 0;
      next.disabled = index === timelineSteps.length - 1;
      next.setAttribute('aria-label', index === timelineSteps.length - 1 ? timelineCopy.complete : timelineCopy.next);
      next.setAttribute('title', index === timelineSteps.length - 1 ? timelineCopy.complete : timelineCopy.next);
      stepmarks.forEach((mark, markIndex) => {
        mark.classList.toggle('is-complete', markIndex < index);
        mark.classList.toggle('is-current', markIndex === index);
      });
      updatePlayControl();
    };

    const render = (index, animate = true) => {
      if (transitionTimer !== null) window.clearTimeout(transitionTimer);
      stage.classList.remove('is-fading');

      if (!animate || prefersReducedMotion.matches) {
        update(index);
        return;
      }

      stage.classList.add('is-fading');
      transitionTimer = window.setTimeout(() => {
        update(index);
        window.requestAnimationFrame(() => stage.classList.remove('is-fading'));
        transitionTimer = null;
      }, 280);
    };

    const stopAutoplay = (manual = false) => {
      if (autoplayTimer !== null) window.clearInterval(autoplayTimer);
      autoplayTimer = null;
      if (manual) autoplayEnabled = false;
      updatePlayControl();
    };

    const startAutoplay = (force = false) => {
      if (autoplayTimer !== null || (!timelineVisible && !force)) return;

      autoplayEnabled = true;
      if (currentIndex === timelineSteps.length - 1) render(0);
      autoplayTimer = window.setInterval(() => {
        if (currentIndex >= timelineSteps.length - 1) {
          autoplayEnabled = false;
          stopAutoplay();
          return;
        }
        render(currentIndex + 1);
      }, autoplayDelay);
      updatePlayControl();
    };

    range.addEventListener('input', () => {
      stopAutoplay(true);
      render(Number(range.value), false);
    });
    back.addEventListener('click', () => {
      stopAutoplay(true);
      if (currentIndex > 0) render(currentIndex - 1);
    });
    next.addEventListener('click', () => {
      stopAutoplay(true);
      if (currentIndex < timelineSteps.length - 1) render(currentIndex + 1);
    });
    play.addEventListener('click', () => {
      if (autoplayTimer !== null) {
        stopAutoplay(true);
        return;
      }
      autoplayEnabled = true;
      startAutoplay(true);
    });
    const observer = new IntersectionObserver((entries) => {
      timelineVisible = entries[0].isIntersecting;
      if (timelineVisible && autoplayEnabled) {
        startAutoplay();
      } else if (!timelineVisible) {
        stopAutoplay();
      }
    }, { threshold: 0.35 });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else if (timelineVisible && autoplayEnabled) {
        startAutoplay();
      }
    });

    update(0);
    if (prefersReducedMotion.matches) {
      autoplayEnabled = false;
      updatePlayControl();
    }
    observer.observe(root);
  }

  const letterAnswersRu = {
    problem: {
      open: 'Сильные коммерческие модели могут отказаться разбирать настоящую атаку, а чувствительные журналы нельзя без риска отправить во внешний сервис.',
      pacing: 'Отдельной лаборатории или стране невыгодно замедляться первой: конкуренты продолжат гонку и получат преимущество.',
      takeaway: 'Письма описывают разные риски: нехватку инструментов у защитников и конкуренцию, которая мешает лабораториям тормозить.'
    },
    proposal: {
      open: 'Не ограничивать преждевременно модели с открытыми весами. Защитники смогут запускать их внутри компании и работать с закрытыми данными.',
      pacing: 'Заранее создать международные правила и технические механизмы, которые позволят всем участникам замедлиться одновременно.',
      takeaway: 'Одно предложение расширяет доступ к инструментам, второе координирует ограничения. Эти меры могут работать одновременно.'
    },
    incident: {
      open: 'Hugging Face запустила GLM-5.2 на собственных серверах и разобрала 17 613 действий, не передавая журналы внешнему сервису.',
      pacing: 'Инцидент в письме не упомянут. Связь косвенная: агент действовал быстрее, чем две компании успели сопоставить сигналы и остановить его.',
      takeaway: 'Инцидент прямо иллюстрирует аргумент за открытые модели и косвенно — необходимость заранее договариваться о пределах автономных систем.'
    }
  };

  const letterAnswersEn = {
    problem: {
      open: 'Capable commercial models may refuse to investigate a real attack, while sensitive logs cannot safely be sent to an external service.',
      pacing: 'No single lab or country benefits from slowing first: its competitors can keep racing ahead and gain an advantage.',
      takeaway: 'The letters describe different risks: defenders lack tools, while competition prevents labs from slowing down.'
    },
    proposal: {
      open: 'Do not restrict open-weight models prematurely. Defenders will be able to run them inside their organizations and work with confidential data.',
      pacing: 'Create international rules and technical mechanisms in advance so that every participant can slow down at the same time.',
      takeaway: 'One proposal broadens access to tools; the other coordinates restrictions. The two can work together.'
    },
    incident: {
      open: 'Hugging Face ran GLM-5.2 on its own servers and analyzed 17,613 actions without sending the logs to an external service.',
      pacing: 'The letter does not mention the incident. The connection is indirect: the agent moved faster than the two companies could connect their signals and stop it.',
      takeaway: 'The incident directly illustrates the case for open models and indirectly shows why the limits of autonomous systems should be agreed in advance.'
    }
  };

  function initLetters() {
    const root = document.querySelector('.js-incident-letters');
    if (!root) return;

    const letterAnswers = incidentLanguage === 'en' ? letterAnswersEn : letterAnswersRu;
    const comparison = root.querySelector('.incident-letters__comparison');
    const buttons = Array.from(root.querySelectorAll('[data-letters-question]'));
    const openAnswer = root.querySelector('.js-letters-open-answer');
    const pacingAnswer = root.querySelector('.js-letters-pacing-answer');
    const takeaway = root.querySelector('.js-letters-takeaway');
    let transitionTimer = null;

    const update = (question) => {
      const answer = letterAnswers[question];
      openAnswer.textContent = answer.open;
      pacingAnswer.textContent = answer.pacing;
      takeaway.textContent = answer.takeaway;
      buttons.forEach((button) => {
        const isActive = button.dataset.lettersQuestion === question;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
    };

    const render = (question) => {
      if (transitionTimer !== null) window.clearTimeout(transitionTimer);
      comparison.classList.remove('is-fading');

      if (prefersReducedMotion.matches) {
        update(question);
        return;
      }

      comparison.classList.add('is-fading');
      transitionTimer = window.setTimeout(() => {
        update(question);
        window.requestAnimationFrame(() => comparison.classList.remove('is-fading'));
        transitionTimer = null;
      }, 200);
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => render(button.dataset.lettersQuestion));
    });
  }

  function initGlossary() {
    const root = document.querySelector('.js-incident-glossary');
    const triggers = Array.from(document.querySelectorAll('.js-incident-term'));
    if (!root || triggers.length === 0) return;

    const panel = root.querySelector('.incident-glossary__panel');
    const title = root.querySelector('#incident-glossary-title');
    const body = root.querySelector('#incident-glossary-body');
    const closeButton = root.querySelector('.incident-glossary__close');
    const closeTargets = Array.from(root.querySelectorAll('.js-glossary-close'));
    const templates = new Map(
      Array.from(root.querySelectorAll('template[data-glossary-term]'))
        .map((template) => [template.dataset.glossaryTerm, template])
    );

    let activeTrigger = null;
    let closeTimer = null;

    const close = () => {
      if (root.hidden) return;

      if (closeTimer) window.clearTimeout(closeTimer);
      root.classList.remove('is-open');
      document.body.classList.remove('incident-glossary-open');
      triggers.forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));

      const delay = prefersReducedMotion.matches ? 0 : 240;
      closeTimer = window.setTimeout(() => {
        root.hidden = true;
        if (activeTrigger) activeTrigger.focus({ preventScroll: true });
        activeTrigger = null;
      }, delay);
    };

    const open = (trigger) => {
      const template = templates.get(trigger.dataset.term);
      if (!template) return;

      if (closeTimer) window.clearTimeout(closeTimer);
      title.textContent = template.dataset.title;
      body.replaceChildren(template.content.cloneNode(true));
      activeTrigger = trigger;
      root.hidden = false;
      document.body.classList.add('incident-glossary-open');
      triggers.forEach((item) => item.setAttribute('aria-expanded', item === trigger ? 'true' : 'false'));

      window.requestAnimationFrame(() => {
        root.classList.add('is-open');
        panel.focus({ preventScroll: true });
      });
    };

    triggers.forEach((trigger) => {
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-controls', 'incident-glossary-panel');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.addEventListener('click', () => open(trigger));
    });

    closeTargets.forEach((target) => target.addEventListener('click', close));

    document.addEventListener('keydown', (event) => {
      if (root.hidden) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        closeButton.focus();
      }
    });
  }

  function init() {
    initTimeline();
    initLetters();
    initGlossary();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
