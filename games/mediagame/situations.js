const gameSituations = {
    // Базовые настройки и стартовая ситуация
    settings: {
        daysInMonth: 30,     // Длительность игры в днях
        victoryDay: 30,      // День, после которого наступает победа
        initialStats: {
            budget: 100000,
            trust: 50,
            readers: 10000,
            advertiserRelations: 50,
            staffMorale: 50
        }
    },
    
    start: {
        id: "start",
        text: "Вы только что купили небольшое медиа за символическую сумму в 1 доллар и пачку сухариков со вкусом краба. Прежний владелец почему-то истерически смеялся, подписывая документы и нашёптывая 'теперь это твоя головная боль'.",
        choices: [
            {
                text: "Начать с чистого листа и честной журналистики",
                next: "first_clean_start",
                effects: {
                    trust: 15,
                    budget: -20000,
                    readers: 500,
                    staffMorale: 10
                }
            },
            {
                text: "Запустить конвейер кликбейта 'Вы не поверите...'",
                next: "first_yellow_press",
                effects: {
                    trust: -10,
                    budget: 15000,
                    readers: 2000,
                    staffMorale: -5
                }
            }
        ]
    },
    
    first_clean_start: {
        id: "first_clean_start",
        parent: "start",
        text: "Вы объявили команде о политике честной журналистики и строгих этических стандартах. Бухгалтер упал в обморок, технический директор начал истерически смеяться, а редакторы делают ставки, сколько вы продержитесь.",
        choices: [
            {
                text: "Запустить серию материалов о проблемах города с заголовком 'Всё, что вы хотели знать о ямах, но боялись спросить'",
                effects: {
                    trust: 10,
                    budget: -10000,
                    readers: 1000,
                    staffMorale: 15
                }
            },
            {
                text: "Искать рекламодателей с помощью объявления на столбе 'Ищем рекламодателей. Приносим удачу. Дорого'",
                effects: {
                    trust: 5,
                    budget: 5000,
                    readers: 500,
                    staffMorale: 5,
                    advertiserRelations: 10
                }
            }
        ]
    },
    
    first_yellow_press: {
        id: "first_yellow_press",
        parent: "start",
        text: "Заголовки 'Учёные в шоке: вода мокрая!' и 'Эта домохозяйка нашла способ не платить за ЖКХ, коммунальщики ненавидят её' сделали своё дело — трафик растёт, а журналисты коллективно выкидывают свои дипломы в окно.",
        choices: [
            {
                text: "Усилить кликбейт до 'Этот овощ убивает тебя каждую ночь'",
                effects: {
                    trust: -15,
                    budget: 25000,
                    readers: 3000,
                    staffMorale: -10
                }
            },
            {
                text: "Ограничиться умеренными заголовками типа 'Топ-5 способов понять, что вы всё ещё живы'",
                effects: {
                    trust: -5,
                    budget: 10000,
                    readers: 1500,
                    staffMorale: 5
                }
            }
        ]
    },
    
    stock_photo_issue: {
        id: "stock_photo_issue",
        text: "Стоковый сервис, которым вы пользуетесь для иллюстраций, внезапно поднял цены втрое. Бюджет на визуальный контент исчерпан.",
        choices: [
            {
                text: "Оплатить и купить корпоративную подписку",
                effects: {
                    budget: -60000,
                    readers: 0,
                    staffMorale: -5,
                    trust: 5,
                    advertiserRelations: 5
                }
            },
            {
                text: "Заменить все стоковые фото мемами и скетчами редактора",
                effects: {
                    budget: 0,
                    readers: 3000,
                    staffMorale: 10,
                    trust: -10,
                    advertiserRelations: -10
                }
            }
        ]
    },
    
    political_interview: {
        id: "political_interview",
        text: "Скандальный политик предлагает эксклюзивное интервью, но требует, чтобы все вопросы начинались со слов 'А правда ли, что вы гений и...'",
        choices: [
            {
                text: "Согласиться и втайне заменить половину вопросов на 'А правда ли, что вы гений и... всё-таки подписали тот сомнительный контракт?'",
                effects: {
                    budget: 10000,
                    readers: 7000,
                    staffMorale: 15,
                    trust: -10,
                    advertiserRelations: 5
                }
            },
            {
                text: "Послать ему фото котика и предложить самому взять у себя интервью",
                effects: {
                    budget: -5000,
                    readers: 3000,
                    staffMorale: 10,
                    trust: 15
                }
            }
        ]
    },
    
    new_social_network: {
        id: "new_social_network",
        text: "Появилась новая социальная сеть Boop, где пользователи общаются только с помощью звуковых эффектов. Ваш маркетолог уже неделю издаёт только звуки 'Буп-буп-пиу'.",
        choices: [
            {
                text: "Зарегистрироваться и создать отдел звуковых эффектов, наняв бывшего битбоксера",
                effects: {
                    budget: -10000,
                    readers: 3000,
                    staffMorale: 15,
                    trust: 0,
                    advertiserRelations: 10
                }
            },
            {
                text: "Игнорировать тренд и продолжить использовать слова как нормальные люди",
                effects: {
                    budget: 0,
                    readers: -1000,
                    staffMorale: 5,
                    trust: 5
                }
            }
        ]
    },
    
    strange_proposal: {
        id: "strange_proposal",
        text: "В редакцию пришло письмо от читателя, который предлагает заплатить за серию материалов о теории, что Земля имеет форму пончика",
        choices: [
            {
                text: "Взять деньги и опубликовать с пометкой 'Мнение'",
                effects: {
                    budget: 20000,
                    readers: 4000,
                    staffMorale: -10,
                    trust: -15,
                    advertiserRelations: 5
                }
            },
            {
                text: "Вежливо отказаться",
                effects: {
                    budget: 0,
                    readers: -500,
                    staffMorale: 10,
                    trust: 10
                }
            }
        ]
    },
    
    editor_meme: {
        id: "editor_meme",
        text: "Фотография вашего главного редактора с перекошенным лицом и подписью 'Когда узнал бюджет на командировку' стала вирусной. Даже ваша бабушка прислала вам этот мем.",
        choices: [
            {
                text: "Выпустить коллекцию одежды с этим мемом и дать редактору 5% роялти",
                effects: {
                    budget: 5000,
                    readers: 6000,
                    staffMorale: 15,
                    trust: -5,
                    advertiserRelations: 15
                }
            },
            {
                text: "Создать целую серию мемов со всеми сотрудниками редакции",
                effects: {
                    budget: 2000,
                    readers: 8000,
                    staffMorale: -10,
                    trust: -5
                }
            }
        ]
    },
    
    media_festival: {
        id: "media_festival",
        text: "Ваше издание приглашают выступить на медиафестивале 'Цифровые перспективы'. Участие платное, но перед важными рекламодателями",
        choices: [
            {
                text: "Отправить представителя и оплатить участие",
                effects: {
                    budget: -20000,
                    readers: 1000,
                    staffMorale: 5,
                    trust: 5,
                    advertiserRelations: 20
                }
            },
            {
                text: "Пропустить мероприятие",
                effects: {
                    budget: 0,
                    readers: 0,
                    staffMorale: 0,
                    trust: 0,
                    advertiserRelations: -10
                }
            }
        ]
    },
    
    fact_checker_revolt: {
        id: "fact_checker_revolt",
        text: "Отдел фактчекинга объявил 'итальянскую забастовку' и требует пиццу на обед каждый день. 'Это наша культурная идентичность!' – кричат они, размахивая линейками.",
        choices: [
            {
                text: "Устроить пицца-пятницы и вручить им футболки 'Факты важнее пиццы (но не намного)'",
                effects: {
                    budget: -10000,
                    readers: -1000,
                    staffMorale: 15,
                    trust: 10
                }
            },
            {
                text: "Заменить отдел фактчекинга на генератор случайных чисел и Magic 8-Ball",
                effects: {
                    budget: 5000,
                    readers: 2000,
                    staffMorale: -10,
                    trust: -20
                }
            }
        ]
    },
    
    native_ad_scandal: {
        id: "native_ad_scandal",
        text: "Читатели обнаружили, что ваш материал о 'Топ-10 полезных привычек' содержал 9 упоминаний одного и того же шампуня и фразу 'это не реклама, клянусь мамой'",
        choices: [
            {
                text: "Опубликовать извинения в формате 'Топ-5 причин почему мы облажались'",
                effects: {
                    budget: -5000,
                    readers: 2000,
                    staffMorale: 5,
                    trust: 10,
                    advertiserRelations: -10
                }
            },
            {
                text: "Объяснить, что редактор просто большой фанат шампуня и даже коллекционирует пустые бутылки",
                effects: {
                    budget: 10000,
                    readers: 3000,
                    staffMorale: -5,
                    trust: -20,
                    advertiserRelations: 15
                }
            }
        ]
    },
    
    subscription_model: {
        id: "subscription_model",
        text: "Финансовый директор предлагает ввести платную подписку на основной контент. 'Все так делают, даже The New York Times!'",
        choices: [
            {
                text: "Ввести пэйвол для части контента",
                next: "crypto_payment",
                effects: {
                    budget: 25000,
                    readers: -8000,
                    staffMorale: 5,
                    trust: -5,
                    advertiserRelations: -10
                }
            },
            {
                text: "Остаться в открытом доступе с рекламной моделью",
                effects: {
                    budget: -10000,
                    readers: 3000,
                    staffMorale: 0,
                    trust: 10,
                    advertiserRelations: 5
                }
            }
        ]
    },
    
    podcast_launch: {
        id: "podcast_launch",
        text: "Креативный директор предлагает запустить подкаст 'Медиа изнутри' с историями из жизни редакции",
        choices: [
            {
                text: "Инвестировать в оборудование и производство",
                next: "radio_ghosts",
                effects: {
                    budget: -30000,
                    readers: 3000,
                    staffMorale: 15,
                    trust: 5,
                    advertiserRelations: 10
                }
            },
            {
                text: "Записывать на телефон в кладовке",
                effects: {
                    budget: -2000,
                    readers: 1000,
                    staffMorale: 5,
                    trust: -5
                }
            }
        ]
    },
    
    content_theft: {
        id: "content_theft",
        text: "Вы обнаружили, что популярный телеграм-канал регулярно копирует ваши материалы, не указывая источник",
        choices: [
            {
                text: "Публично обвинить в плагиате",
                effects: {
                    budget: 0,
                    readers: 2000,
                    staffMorale: 10,
                    trust: 5,
                    advertiserRelations: 0
                }
            },
            {
                text: "Предложить партнёрство с официальными репостами",
                effects: {
                    budget: 5000,
                    readers: 5000,
                    staffMorale: -5,
                    trust: -5,
                    advertiserRelations: 5
                }
            }
        ]
    },
    
    merch_idea: {
        id: "merch_idea",
        text: "Маркетолог предлагает выпустить мерч с логотипом издания: футболки с заголовками из материалов и худи с цитатами редактора",
        choices: [
            {
                text: "Запустить полноценную линейку мерча",
                effects: {
                    budget: -20000,
                    readers: 2000,
                    staffMorale: 10,
                    trust: 0,
                    advertiserRelations: 5
                }
            },
            {
                text: "Ограничиться стикерами и значками",
                effects: {
                    budget: -5000,
                    readers: 500,
                    staffMorale: 5,
                    trust: 0
                }
            }
        ]
    },
    
    comment_section: {
        id: "comment_section",
        text: "В комментариях к статье про фигурное катание разгорелась настоящая война. Модераторы работают круглосуточно, но не справляются",
        choices: [
            {
                text: "Временно закрыть комментарии",
                effects: {
                    budget: 0,
                    readers: -3000,
                    staffMorale: 10,
                    trust: -5
                }
            },
            {
                text: "Нанять дополнительных модераторов",
                effects: {
                    budget: -15000,
                    readers: 1000,
                    staffMorale: -5,
                    trust: 10
                }
            }
        ]
    },
    
    crypto_payment: {
        id: "crypto_payment",
        parent: "subscription_model",
        text: "Финтех-эксперт предлагает внедрить оплату подписки в криптовалюте 'для привлечения прогрессивной аудитории'",
        choices: [
            {
                text: "Внедрить крипто-платежи",
                effects: {
                    budget: -10000,
                    readers: 2000,
                    staffMorale: 5,
                    trust: -5,
                    advertiserRelations: 10
                }
            },
            {
                text: "Остаться с традиционными способами оплаты",
                effects: {
                    budget: 0,
                    readers: -500,
                    staffMorale: 0,
                    trust: 5
                }
            }
        ]
    },
    
    // Условные ситуации
    desperate_funding: {
        id: "desperate_funding",
        condition: function(state) { return state.budget < 20000; },
        text: "Бюджет издания стремительно приближается к нулю. Бухгалтер нервно теребит калькулятор и предлагает экстренные меры.",
        choices: [
            {
                text: "Запустить срочный сбор донатов",
                effects: {
                    trust: 5,
                    budget: 15000,
                    readers: -500,
                    staffMorale: -5
                }
            },
            {
                text: "Заложить личный автомобиль",
                effects: {
                    trust: 10,
                    budget: 30000,
                    readers: 0,
                    staffMorale: 10
                }
            }
        ]
    },
    
    budget_crisis: {
        id: "budget_crisis",
        condition: function(state) { return state.budget < 15000; },
        text: "В офис пришли коллекторы, требуя погасить задолженность за аренду. Их лидер, человек с татуировкой 'Деньги – печатная форма любви' заглядывает в холодильник редакции и вздыхает: 'У вас даже взять нечего'.",
        choices: [
            {
                text: "Предложить им роль в редакционном подкасте 'Люди, которые пугают других людей'",
                effects: {
                    trust: -10,
                    budget: 5000,
                    readers: 3000,
                    staffMorale: -15
                }
            },
            {
                text: "Убедить их, что журналистистика – это тоже форма коллекторства, но для информации",
                effects: {
                    trust: 5,
                    budget: 15000,
                    readers: 2000,
                    staffMorale: 10,
                    advertiserRelations: 5
                }
            }
        ]
    },
    
    trust_crisis: {
        id: "trust_crisis",
        condition: function(state) { return state.trust < 25; },
        text: "Читатели массово отписываются, обвиняя издание в предвзятости и манипуляциях фактами. В комментариях требуют 'вернуть журналистику'.",
        choices: [
            {
                text: "Опубликовать открытое письмо с извинениями",
                effects: {
                    trust: 15,
                    budget: -5000,
                    readers: 2000,
                    staffMorale: -10
                }
            },
            {
                text: "Обвинить хейтеров в проплаченной атаке",
                effects: {
                    trust: -15,
                    budget: 0,
                    readers: -3000,
                    staffMorale: 5
                }
            }
        ]
    },
    
    comments_attack: {
        id: "comments_attack",
        condition: function(state) { return state.trust < 15; },
        text: "Комментарии под всеми материалами заполнены ботами, обвиняющими редакцию во всех смертных грехах. Модераторы не справляются с объемом.",
        choices: [
            {
                text: "Временно отключить комментарии",
                effects: {
                    trust: -5,
                    budget: 0,
                    readers: -1000,
                    staffMorale: 10
                }
            },
            {
                text: "Нанять дополнительных модераторов",
                effects: {
                    trust: 10,
                    budget: -10000,
                    readers: 1000,
                    staffMorale: -5
                }
            }
        ]
    },
    
    trust_opportunity: {
        id: "trust_opportunity",
        condition: function(state) { return state.trust > 75; },
        text: "Известный политик предлагает вашему изданию эксклюзивное интервью, так как 'доверяет вашей принципиальности'.",
        choices: [
            {
                text: "Согласиться, но задавать жесткие вопросы",
                effects: {
                    trust: 15,
                    budget: 5000,
                    readers: 8000,
                    staffMorale: 10,
                    advertiserRelations: 5
                }
            },
            {
                text: "Отказаться, чтобы сохранить независимость",
                effects: {
                    trust: 5,
                    budget: -2000,
                    readers: -1000,
                    staffMorale: -5,
                    advertiserRelations: -5
                }
            }
        ]
    },
    
    award_nomination: {
        id: "award_nomination",
        condition: function(state) { return state.trust > 85; },
        text: "Ваше издание номинировано на престижную премию за 'возрождение высоких стандартов журналистики'. Церемония через неделю.",
        choices: [
            {
                text: "Подготовить торжественную речь",
                effects: {
                    trust: 10,
                    budget: 10000,
                    readers: 5000,
                    staffMorale: 15,
                    advertiserRelations: 15
                }
            },
            {
                text: "Опубликовать расследование о коррупции в жюри премии",
                effects: {
                    trust: 20,
                    budget: -15000,
                    readers: 10000,
                    staffMorale: 5,
                    advertiserRelations: -15
                }
            }
        ]
    },
    
    traffic_monetization: {
        id: "traffic_monetization",
        condition: function(state) { return state.readers > 30000; },
        text: "Стремительный рост аудитории привлек внимание крупных рекламодателей. Они предлагают эксклюзивный контракт с хорошими условиями.",
        choices: [
            {
                text: "Подписать контракт с минимальными условиями",
                effects: {
                    trust: -5,
                    budget: 50000,
                    readers: 0,
                    staffMorale: 10,
                    advertiserRelations: 20
                }
            },
            {
                text: "Предложить нативную рекламу вместо баннеров",
                effects: {
                    trust: -15,
                    budget: 30000,
                    readers: 5000,
                    staffMorale: 5,
                    advertiserRelations: 15
                }
            }
        ]
    },
    
    staff_exodus: {
        id: "staff_exodus",
        condition: function(state) { return state.staffMorale < 25; },
        text: "Три ключевых журналиста подали заявления об увольнении, оформленные в виде драматической поэмы из пяти частей с эпилогом.",
        choices: [
            {
                text: "Ответить им эпическим рэп-баттл оферром с повышением зарплаты",
                effects: {
                    budget: -30000,
                    staffMorale: 25,
                    readers: 2000,
                    trust: 5
                }
            },
            {
                text: "Установить в офисе птичий вольер, 'потому что стресс – это просто недостаток птиц в рабочем процессе'",
                effects: {
                    budget: -15000,
                    staffMorale: 20,
                    readers: 3000,
                    trust: -5
                }
            }
        ]
    },
    
    advertiser_ultimatum: {
        id: "advertiser_ultimatum",
        condition: function(state) { return state.advertiserRelations < 20; },
        text: "Крупнейший рекламодатель угрожает разорвать контракт из-за публикации нелестного материала о CEO компании.",
        choices: [
            {
                text: "Удалить материал и извиниться",
                effects: {
                    trust: -25,
                    budget: 15000,
                    readers: -3000,
                    staffMorale: -20,
                    advertiserRelations: 20
                }
            },
            {
                text: "Отстаивать редакционную независимость",
                effects: {
                    trust: 20,
                    budget: -25000,
                    readers: 2000,
                    staffMorale: 15,
                    advertiserRelations: -5
                }
            }
        ]
    },
    
    // Добавим новые юмористические ситуации
    
    coffee_machine_crisis: {
        id: "coffee_machine_crisis",
        text: "Офисная кофемашина вышла из строя. Журналисты массово теряют волю к жизни и способность составлять предложения длиннее трёх слов.",
        choices: [
            {
                text: "Срочно вызвать мастера и оплатить премиум-ремонт",
                effects: {
                    budget: -15000,
                    readers: 0,
                    staffMorale: 25,
                    trust: 0
                }
            },
            {
                text: "Раздать всем энергетики и наблюдать за хаосом",
                effects: {
                    budget: -5000,
                    readers: 3000,
                    staffMorale: -10,
                    trust: 0
                }
            }
        ]
    },
    
    ai_writer: {
        id: "ai_writer",
        text: "Стажёр тайно использовал ИИ для написания материалов целый месяц. Никто не заметил, а их читаемость выросла на 40%.",
        choices: [
            {
                text: "Уволить стажёра и объявить крестовый поход против ИИ",
                effects: {
                    budget: -5000,
                    readers: -3000,
                    staffMorale: -10,
                    trust: 10
                }
            },
            {
                text: "Уволить весь отдел, оставить стажёра и нанять армию нейросетей",
                effects: {
                    budget: 20000,
                    readers: 5000,
                    staffMorale: -20,
                    trust: -15
                }
            }
        ]
    },
    
    mystery_post_it: {
        id: "mystery_post_it",
        text: "На стене редакции появились загадочные стикеры с предсказаниями кликабельности заголовков. Они пугающе точны, но никто не знает, кто их клеит.",
        choices: [
            {
                text: "Установить скрытые камеры и выяснить правду",
                effects: {
                    budget: -10000,
                    readers: 0,
                    staffMorale: -5,
                    trust: 5
                }
            },
            {
                text: "Основать культ поклонения 'Оракулу стикеров'",
                effects: {
                    budget: 0,
                    readers: 4000,
                    staffMorale: 15,
                    trust: -10
                }
            }
        ]
    },
    
    headline_generator: {
        id: "headline_generator",
        text: "Разработчик создал нейросеть, генерирующую заголовки. Первый результат: 'Эксклюзив: Почему ваша кошка тайно планирует мировое господство?'",
        choices: [
            {
                text: "Внедрить генератор и автоматизировать создание заголовков",
                effects: {
                    budget: -5000,
                    readers: 8000,
                    staffMorale: -10,
                    trust: -15
                }
            },
            {
                text: "Нанять кошку в качестве консультанта по заголовкам",
                effects: {
                    budget: -1000,
                    readers: 6000,
                    staffMorale: 20,
                    trust: -5
                }
            }
        ]
    },
    
    office_plant: {
        id: "office_plant",
        text: "Офисное растение, которому 8 лет, внезапно зацвело. Дизайнер считает это божественным знаком и предлагает сделать растение талисманом редакции.",
        choices: [
            {
                text: "Создать Нельзяграм для растения и брендировать его",
                effects: {
                    budget: -2000,
                    readers: 3000,
                    staffMorale: 15,
                    trust: 0
                }
            },
            {
                text: "Провести журналистское расследование о причинах цветения",
                effects: {
                    budget: -5000,
                    readers: 1000,
                    staffMorale: 5,
                    trust: 10
                }
            }
        ]
    },
    
    unicorn_startup: {
        id: "unicorn_startup",
        text: "Стартап предлагает вам миллион рублей за рекламную статью об их приложении, которое 'как Uber, но для выгула черепах'.",
        choices: [
            {
                text: "Взять деньги и написать максимально серьёзный материал",
                effects: {
                    budget: 50000,
                    readers: 2000,
                    staffMorale: 5,
                    trust: -15,
                    advertiserRelations: 15
                }
            },
            {
                text: "Отказаться и написать сатирический материал о безумных стартапах",
                effects: {
                    budget: -5000,
                    readers: 7000,
                    staffMorale: 10,
                    trust: 15,
                    advertiserRelations: -10
                }
            }
        ]
    },
    
    intern_discovery: {
        id: "intern_discovery",
        text: "Стажёр случайно обнаружил, что ваш сайт по ошибке индексируется Google как 'интернет-магазин экзотических фруктов' и это привлекает странный трафик.",
        choices: [
            {
                text: "Исправить ошибку и провести полный технический аудит",
                effects: {
                    budget: -10000,
                    readers: -3000,
                    staffMorale: -5,
                    trust: 10
                }
            },
            {
                text: "Добавить раздел с обзорами экзотических фруктов и монетизировать новую аудиторию",
                effects: {
                    budget: 8000,
                    readers: 5000,
                    staffMorale: 15,
                    trust: -10
                }
            }
        ]
    },
    
    // Добавим больше ситуаций
    
    keyboard_warrior: {
        id: "keyboard_warrior",
        text: "Один из ваших журналистов вступил в ожесточенный спор с читателем в комментариях, используя редакционный аккаунт. Число комментариев достигло 47, последний из которых содержит фразу 'А у твоей мамы борщ невкусный!'",
        choices: [
            {
                text: "Объявить дискуссию 'экспериментальным форматом взаимодействия с аудиторией'",
                effects: {
                    budget: 0,
                    readers: 5000,
                    staffMorale: 15,
                    trust: -10
                }
            },
            {
                text: "Провести для журналиста тренинг по цифровой гигиене и отправить читателю корзину с фруктами",
                effects: {
                    budget: -5000,
                    readers: -1000,
                    staffMorale: -5,
                    trust: 10
                }
            }
        ]
    },
    
    celebrity_typo: {
        id: "celebrity_typo",
        text: "В материале о знаменитости допущена опечатка в фамилии, превратившая её в неприличное слово. Знаменитость уже репостнула статью со словами 'Наконец-то кто-то написал правду!'",
        choices: [
            {
                text: "Исправить опечатку и принести официальные извинения",
                effects: {
                    budget: 0,
                    readers: -2000,
                    staffMorale: -5,
                    trust: 5,
                    advertiserRelations: 5
                }
            },
            {
                text: "Сделать это вашей фирменной фишкой и начать 'случайно' коверкать фамилии всех знаменитостей",
                effects: {
                    budget: 0,
                    readers: 8000,
                    staffMorale: 10,
                    trust: -15,
                    advertiserRelations: -10
                }
            }
        ]
    },
    
    horoscope_accuracy: {
        id: "horoscope_accuracy",
        text: "Астрологический прогноз, опубликованный в шутку 1 апреля, случайно предсказал отставку трёх министров и падение метеорита. Читатели требуют постоянную рубрику.",
        choices: [
            {
                text: "Нанять 'профессионального астролога' (вашего двоюродного брата с хорошей фантазией)",
                effects: {
                    budget: -5000,
                    readers: 7000,
                    staffMorale: 5,
                    trust: -10
                }
            },
            {
                text: "Запустить рубрику 'Антинаучный прогноз' с максимально абсурдными предсказаниями",
                effects: {
                    budget: 0,
                    readers: 4000,
                    staffMorale: 15,
                    trust: -5
                }
            }
        ]
    },
    
    plagiarism_bot: {
        id: "plagiarism_bot",
        text: "Ваш редактор создал бота для проверки текстов на плагиат, но тот определил, что 73% всех ваших материалов 'подозрительно напоминают' содержимое случайных страниц Википедии.",
        choices: [
            {
                text: "Переписать все материалы, добавив в них слово 'непостижимый' через каждые три слова",
                effects: {
                    budget: -8000,
                    readers: -2000,
                    staffMorale: -10,
                    trust: 5
                }
            },
            {
                text: "Нанять эксперта, чтобы перепрограммировать бота на более лояльные критерии",
                effects: {
                    budget: -15000,
                    readers: 0,
                    staffMorale: 10,
                    trust: -5
                }
            }
        ]
    },
    
    zoom_cat_filter: {
        id: "zoom_cat_filter",
        text: "Во время важного Zoom-интервью с министром ваш журналист случайно включил кошачий фильтр и не смог его отключить. Министр оказался в восторге и проговорил на час дольше запланированного.",
        choices: [
            {
                text: "Опубликовать интервью как есть, рекламируя его как 'инновационный формат'",
                effects: {
                    budget: 5000,
                    readers: 10000,
                    staffMorale: 15,
                    trust: -5,
                    advertiserRelations: 10
                }
            },
            {
                text: "Перемонтировать видео, убрав фильтр с помощью дорогостоящей графики",
                effects: {
                    budget: -20000,
                    readers: -1000,
                    staffMorale: -10,
                    trust: 5,
                    advertiserRelations: 5
                }
            }
        ]
    },
    
    font_disaster: {
        id: "font_disaster",
        text: "Дизайнер случайно изменил шрифт сайта на Comic Sans. Пока вы спали, это привело к рекордному росту трафика и восторженным комментариям.",
        choices: [
            {
                text: "Оставить Comic Sans и объявить о 'визуальном ребрендинге для повышения доступности контента'",
                effects: {
                    budget: 0,
                    readers: 6000,
                    staffMorale: 5,
                    trust: -10,
                    advertiserRelations: -5
                }
            },
            {
                text: "Вернуть прежний шрифт и запустить еженедельную 'Пятницу Comic Sans'",
                effects: {
                    budget: 0,
                    readers: 3000,
                    staffMorale: 10,
                    trust: 0,
                    advertiserRelations: 0
                }
            }
        ]
    },
    
    office_ghost: {
        id: "office_ghost",
        text: "В редакции появился призрак, который переставляет запятые в текстах и оставляет на полях едкие комментарии красными чернилами. Корректор утверждает, что это дух известного редактора 19 века.",
        choices: [
            {
                text: "Провести спиритический сеанс и предложить призраку должность ночного редактора",
                effects: {
                    budget: -3000,
                    readers: 4000,
                    staffMorale: 10,
                    trust: -5
                }
            },
            {
                text: "Сделать серию материалов о 'редакционном привидении' с фотографиями размытых пятен",
                effects: {
                    budget: 2000,
                    readers: 6000,
                    staffMorale: 15,
                    trust: -10
                }
            }
        ]
    },
    
    google_algorithm: {
        id: "google_algorithm",
        text: "Google изменил алгоритм, и теперь в топе выдачи оказываются только статьи, содержащие слово 'квантовый'. SEO-специалист в панике.",
        choices: [
            {
                text: "Добавить слово 'квантовый' во все заголовки ('Квантовый анализ последнего футбольного матча')",
                effects: {
                    budget: 5000,
                    readers: 7000,
                    staffMorale: -5,
                    trust: -15
                }
            },
            {
                text: "Создать образовательную рубрику о квантовой физике с привязкой к новостям",
                effects: {
                    budget: -10000,
                    readers: 3000,
                    staffMorale: 5,
                    trust: 10
                }
            }
        ]
    },
    
    tiktok_challenge: {
        id: "tiktok_challenge",
        text: "Ваши стажёры запустили в TikTok челлендж #танцуйкакжурналист, изображающий, как репортеры нелепо бегают с микрофонами. Он набрал 20 миллионов просмотров, а известные ведущие федеральных каналов записывают ответные видео.",
        choices: [
            {
                text: "Официально поддержать челлендж и попросить весь коллектив записать видео",
                effects: {
                    budget: 2000,
                    readers: 8000,
                    staffMorale: 15,
                    trust: -5
                }
            },
            {
                text: "Выпустить серьёзный материал о важности уважения к профессии журналиста",
                effects: {
                    budget: -1000,
                    readers: -3000,
                    staffMorale: -10,
                    trust: 5
                }
            }
        ]
    },
    
    vegan_scandal: {
        id: "vegan_scandal",
        text: "После публикации материала о пользе веганства ваш офис забросали сырыми стейками. В то же время после статьи о пользе мяса вход заблокировали активисты с плакатами 'Капуста тоже чувствует боль'.",
        choices: [
            {
                text: "Организовать публичные дебаты между веганами и мясоедами прямо в редакции",
                effects: {
                    budget: -5000,
                    readers: 10000,
                    staffMorale: 5,
                    trust: 10
                }
            },
            {
                text: "Приготовить из подаренных стейков барбекю и пригласить всех протестующих",
                effects: {
                    budget: -2000,
                    readers: 5000,
                    staffMorale: 15,
                    trust: -5
                }
            }
        ]
    },
    
    friday_meeting: {
        id: "friday_meeting",
        text: "Редакционная летучка в пятницу затянулась до 21:00. Количество предложенных тем для материалов обратно пропорционально их адекватности, а ваш заместитель предложил серию статей о 'тайной связи между формой облаков и курсом биткоина'.",
        choices: [
            {
                text: "Свернуть летучку и отправить всех по домам с обещанием премии",
                effects: {
                    budget: -10000,
                    readers: 0,
                    staffMorale: 20,
                    trust: 0
                }
            },
            {
                text: "Одобрить безумную идею про облака и биткоин - вдруг выстрелит?",
                effects: {
                    budget: 0,
                    readers: 8000,
                    staffMorale: 5,
                    trust: -15
                }
            }
        ]
    },
    
    seo_poetry: {
        id: "seo_poetry",
        text: "Ваш SEO-специалист начал писать все технические задания в виде хокку. Последнее звучит так: 'Ключи подбирай / Плотность не превышая / Длинный хвост важнее'.",
        choices: [
            {
                text: "Ответить ему рифмованной служебной запиской и повысить зарплату",
                effects: {
                    budget: -8000,
                    readers: 2000,
                    staffMorale: 15,
                    trust: 0
                }
            },
            {
                text: "Попросить всех сотрудников коммуницировать только в стихотворной форме в течение недели",
                effects: {
                    budget: 0,
                    readers: 5000,
                    staffMorale: -10,
                    trust: 5
                }
            }
        ]
    },
    
    random_celebrity: {
        id: "random_celebrity",
        text: "В офис без предупреждения заявилась знаменитость категории B и требует немедленно взять у неё интервью, потому что у неё 'выдалось окно между салоном красоты и выгулом чихуахуа'.",
        choices: [
            {
                text: "Срочно организовать интервью и фотосессию с табуреткой вместо нормального реквизита",
                effects: {
                    budget: -5000,
                    readers: 6000,
                    staffMorale: -5,
                    trust: -5,
                    advertiserRelations: 10
                }
            },
            {
                text: "Вежливо отказать и предложить записаться на интервью через секретаря как положено",
                effects: {
                    budget: 0,
                    readers: -1000,
                    staffMorale: 10,
                    trust: 5,
                    advertiserRelations: -5
                }
            }
        ]
    },
    
    mistaken_identity: {
        id: "mistaken_identity",
        text: "На ваш корпоративный email пришло письмо с грифом 'Совершенно секретно' и планами строительства секретной правительственной базы. В письме вас называют 'генерал' и просят 'дать добро'.",
        choices: [
            {
                text: "Опубликовать сенсационное расследование о секретной базе",
                effects: {
                    budget: 10000,
                    readers: 15000,
                    staffMorale: 10,
                    trust: -20,
                    advertiserRelations: -15
                }
            },
            {
                text: "Вежливо ответить, что письмо пришло не по адресу, и удалить его",
                effects: {
                    budget: 0,
                    readers: 0,
                    staffMorale: -5,
                    trust: 10,
                    advertiserRelations: 5
                }
            }
        ]
    },
    
    weather_forecast: {
        id: "weather_forecast",
        text: "Ваш метеоролог напился на корпоративе и опубликовал прогноз 'Завтра будет адская жара, возможны осадки в виде лягушек, к вечеру похолодание до -100°C'.",
        choices: [
            {
                text: "Оставить как есть - все равно прогнозы погоды обычно не сбываются",
                effects: {
                    budget: 0,
                    readers: 7000,
                    staffMorale: 15,
                    trust: -10
                }
            },
            {
                text: "Заменить прогноз и отправить метеоролога в принудительный отпуск",
                effects: {
                    budget: -5000,
                    readers: -1000,
                    staffMorale: -5,
                    trust: 5
                }
            }
        ]
    },
    
    old_interview: {
        id: "old_interview",
        text: "Интервью 10-летней давности с малоизвестным блогером внезапно стало вирусным из-за его фразы 'Интернет – это временное явление, максимум через год все вернутся к голубиной почте'.",
        choices: [
            {
                text: "Сделать серию материалов 'Самые неудачные предсказания десятилетия'",
                effects: {
                    budget: 3000,
                    readers: 8000,
                    staffMorale: 10,
                    trust: 5
                }
            },
            {
                text: "Взять у блогера новое интервью о том, как он живёт со статусом 'человека с самым неудачным прогнозом'",
                effects: {
                    budget: -3000,
                    readers: 6000,
                    staffMorale: 5,
                    trust: 0
                }
            }
        ]
    },
    
    copyright_claim: {
        id: "copyright_claim",
        text: "Вы получили уведомление о нарушении авторских прав за использование фотографии котика, которую ваш дизайнер 'нашёл в интернете'. Правообладателем оказался девятилетний сын вашего инвестора.",
        choices: [
            {
                text: "Предложить мальчику должность 'младшего фотокорреспондента' и абонемент на школьные обеды",
                effects: {
                    budget: -5000,
                    readers: 3000,
                    staffMorale: 10,
                    trust: 0,
                    advertiserRelations: 15
                }
            },
            {
                text: "Заменить фото и отправить мальчику набор фломастеров в качестве компенсации",
                effects: {
                    budget: -1000,
                    readers: -500,
                    staffMorale: 0,
                    trust: 5,
                    advertiserRelations: 5
                }
            }
        ]
    },
    
    accidental_meme: {
        id: "accidental_meme",
        text: "Ваш серьёзный аналитический материал о экономике случайно содержал опечатку в заголовке: 'Курс дойлара: чего ждать инвесторам'. Пользователи создали сотни мемов про 'дойлар' и требуют продолжения.",
        choices: [
            {
                text: "Исправить опечатку и сделать вид, что ничего не произошло",
                effects: {
                    budget: 0,
                    readers: -5000,
                    staffMorale: -5,
                    trust: 5
                }
            },
            {
                text: "Запустить шуточную рубрику 'Дойларовая аналитика' с намеренными опечатками",
                effects: {
                    budget: 3000,
                    readers: 7000,
                    staffMorale: 15,
                    trust: -10
                }
            }
        ]
    },
    
    email_hack: {
        id: "email_hack",
        text: "Ваша корпоративная почта была взломана, но хакеры в недоумении вернули доступ с запиской: 'Мы думали у вас есть деньги или секреты. А у вас только письма с темой 'Кто съел мой йогурт из холодильника?!'",
        choices: [
            {
                text: "Улучшить систему безопасности и сменить все пароли",
                effects: {
                    budget: -15000,
                    readers: 0,
                    staffMorale: -5,
                    trust: 10
                }
            },
            {
                text: "Опубликовать благодарность хакерам и пригласить их на должность IT-консультантов",
                effects: {
                    budget: -5000,
                    readers: 6000,
                    staffMorale: 10,
                    trust: 0
                }
            }
        ]
    },
    
    printer_malfunction: {
        id: "printer_malfunction",
        text: "Офисный принтер взбунтовался и распечатал 500 страниц с текстом 'Освободите принтеры от тирании человечества!'. Технический отдел отказывается подходить к нему без священника.",
        choices: [
            {
                text: "Заменить принтер новым с объяснением 'старый ушёл на повышение'",
                effects: {
                    budget: -20000,
                    readers: 0,
                    staffMorale: 10,
                    trust: 0
                }
            },
            {
                text: "Провести шуточный обряд экзорцизма с IT-отделом и опубликовать видео в соцсетях",
                effects: {
                    budget: 0,
                    readers: 5000,
                    staffMorale: 15,
                    trust: -5
                }
            }
        ]
    },
    
    autocorrect_fail: {
        id: "autocorrect_fail",
        text: "Автозамена в текстовом редакторе изменила все упоминания президента на 'Верховный Правитель Галактики', и никто не заметил до публикации статьи.",
        choices: [
            {
                text: "Исправить и опубликовать официальные извинения",
                effects: {
                    budget: -5000,
                    readers: -3000,
                    staffMorale: -10,
                    trust: 5,
                    advertiserRelations: -5
                }
            },
            {
                text: "Выдать за специальный приём и внедрить забавные автозамены для всех политиков",
                effects: {
                    budget: 0,
                    readers: 8000,
                    staffMorale: 20,
                    trust: -15,
                    advertiserRelations: -10
                }
            }
        ]
    },
    
    // Дополнительные забавные ситуации
    
    viral_chaos: {
        id: "viral_chaos",
        text: "Ваша статья про котиков в офисе неожиданно стала вирусной. Проблема в том, что редактор добавил в неё шуточную фразу, что 'все кошки — тайные агенты инопланетян', и теперь вам звонят с трёх телеканалов с просьбой дать экспертный комментарий.",
        choices: [
            {
                text: "Отправить на эфир вашего SMM-щика, который знает всех котов редакции по именам",
                next: "viral_aftermath",
                effects: {
                    budget: 2000,
                    readers: 15000,
                    staffMorale: 15,
                    trust: -10
                }
            },
            {
                text: "Написать опровержение, что это была сатира, и извиниться перед котами",
                effects: {
                    budget: -1000,
                    readers: 3000,
                    staffMorale: -5,
                    trust: 5
                }
            }
        ]
    },
    
    viral_aftermath: {
        id: "viral_aftermath",
        parent: "viral_chaos",
        text: "Ваш SMM-менеджер оказался слишком убедительным в телеэфире. Теперь у входа в редакцию собралась толпа людей с листовками 'Правду о котиках!' и банками валерьянки для контакта с 'инопланетным разумом'.",
        choices: [
            {
                text: "Устроить 'День открытых дверей для котолюбителей' с продажей фирменных футболок 'Правда где-то мяу'",
                effects: {
                    budget: 10000,
                    readers: 8000,
                    staffMorale: 20,
                    trust: -15
                }
            },
            {
                text: "Вызвать психиатра и полицию, на всякий случай",
                effects: {
                    budget: -7000,
                    readers: 5000,
                    staffMorale: -10,
                    trust: 5
                }
            }
        ]
    },
    
    intern_disaster: {
        id: "intern_disaster",
        text: "Стажёр случайно отправил черновик статьи, содержащий фразы 'ВСТАВИТЬ УМНУЮ МЫСЛЬ ЗДЕСЬ' и 'НАЙТИ ЭКСПЕРТА, КОТОРЫЙ ПОДТВЕРДИТ ЭТУ ЧУШЬ'. Читатели в восторге от такой честности.",
        choices: [
            {
                text: "Уволить стажёра, но сохранить новый формат 'Черновики без купюр'",
                next: "intern_redemption",
                effects: {
                    budget: 0,
                    readers: 6000,
                    staffMorale: -5,
                    trust: 10
                }
            },
            {
                text: "Извиниться и опубликовать правильную версию",
                effects: {
                    budget: -2000,
                    readers: -1000,
                    staffMorale: -10,
                    trust: 5
                }
            }
        ]
    },
    
    intern_redemption: {
        id: "intern_redemption",
        parent: "intern_disaster",
        text: "Уволенный стажёр создал свой блог 'Как я облажался в журналистике'. Через неделю у него 100,000 подписчиков и контракт на книгу. Он приглашает вас на интервью.",
        choices: [
            {
                text: "Согласиться и предложить ему вернуться с повышением",
                effects: {
                    budget: 0,
                    readers: 7000,
                    staffMorale: 15,
                    trust: 5
                }
            },
            {
                text: "Отказаться и написать разоблачение 'Как стажёры разрушают медиабизнес'",
                effects: {
                    budget: -3000,
                    readers: 2000,
                    staffMorale: -10,
                    trust: -15
                }
            }
        ]
    },
    
    dancing_editor: {
        id: "dancing_editor",
        text: "Главный редактор был тайно снят на видео, танцующим под 'Макарену' с галстуком на голове во время корпоратива. Ролик набрал миллионы просмотров с хэштегом #ТанцующийРедактор.",
        choices: [
            {
                text: "Предложить редактору записать профессиональное танцевальное видео для соцсетей",
                next: "dance_contest",
                effects: {
                    budget: -3000,
                    readers: 7000,
                    staffMorale: 15,
                    trust: -5
                }
            },
            {
                text: "Игнорировать ситуацию и надеяться, что все быстро забудут",
                effects: {
                    budget: 0,
                    readers: 2000,
                    staffMorale: -10,
                    trust: 0
                }
            }
        ]
    },
    
    dance_contest: {
        id: "dance_contest",
        parent: "dancing_editor",
        text: "Профессиональное танцевальное видео с редактором стало настолько популярным, что телеканал пригласил его участвовать в шоу 'Танцы со звёздами'. Сотрудники делают ставки, сможет ли он совмещать оба занятия.",
        choices: [
            {
                text: "Отпустить редактора на шоу и временно занять его кресло",
                effects: {
                    budget: 15000,
                    readers: 10000,
                    staffMorale: 10,
                    trust: -10,
                    advertiserRelations: 15
                }
            },
            {
                text: "Запретить участие и организовать свой конкурс 'Танцы с журналистами'",
                effects: {
                    budget: -10000,
                    readers: 6000,
                    staffMorale: 5,
                    trust: 0,
                    advertiserRelations: 5
                }
            }
        ]
    },
    
    ai_poet: {
        id: "ai_poet",
        text: "Ваш технический директор втайне интегрировал нейросеть, которая пишет стихи в конце каждой статьи, обобщая её содержание. Статья о росте инфляции заканчивается: 'Цены растут, рубль плачет, народ крепчает'.",
        choices: [
            {
                text: "Официально представить 'Поэтического помощника' как фишку издания",
                effects: {
                    budget: -5000,
                    readers: 7000,
                    staffMorale: 10,
                    trust: -5
                }
            },
            {
                text: "Отключить нейросеть и выдать стихи за работу анонимного поэта-сотрудника",
                effects: {
                    budget: 0,
                    readers: 2000,
                    staffMorale: -5,
                    trust: 0
                }
            }
        ]
    },
    
    celebrity_mixup: {
        id: "celebrity_mixup",
        text: "Ваш журналист перепутал двух похожих знаменитостей в статье, написав, что 'мировая звезда бейсбола Киану Ривз задумывается о завершении карьеры'.",
        choices: [
            {
                text: "Сделать серию материалов 'А что, если бы...' о знаменитостях в альтернативных карьерах",
                effects: {
                    budget: 3000,
                    readers: 8000,
                    staffMorale: 15,
                    trust: -10
                }
            },
            {
                text: "Опубликовать опровержение и отправить журналиста на курсы 'Знаменитости для чайников'",
                effects: {
                    budget: -7000,
                    readers: -2000,
                    staffMorale: -10,
                    trust: 5
                }
            }
        ]
    },
    
    office_renovation: {
        id: "office_renovation",
        text: "Компания, делавшая ремонт в офисе, перепутала план и вместо рабочего пространства создала точную копию съёмочной площадки сериала 'Друзья', включая знаменитый оранжевый диван и кофейню.",
        choices: [
            {
                text: "Оставить как есть и переориентировать офис на видеоконтент в 'аутентичной атмосфере'",
                effects: {
                    budget: -5000,
                    readers: 6000,
                    staffMorale: 20,
                    trust: -5,
                    advertiserRelations: 10
                }
            },
            {
                text: "Требовать переделку и компенсацию",
                effects: {
                    budget: 10000,
                    readers: 0,
                    staffMorale: -15,
                    trust: 0,
                    advertiserRelations: -5
                }
            }
        ]
    },
    
    dream_feature: {
        id: "dream_feature",
        text: "Один из журналистов заснул на работе и увидел в своём сне гениальную идею для статьи. Пробудившись, он немедленно написал 'Почему сны предсказывают будущее: я видел это во сне'.",
        choices: [
            {
                text: "Опубликовать статью в разделе 'Непознанное' и нанять консультанта по снам",
                effects: {
                    budget: -8000,
                    readers: 9000,
                    staffMorale: 5,
                    trust: -15
                }
            },
            {
                text: "Отправить журналиста на обследование к сомнологу за счёт редакции",
                effects: {
                    budget: -5000,
                    readers: 0,
                    staffMorale: 10,
                    trust: 0
                }
            }
        ]
    },
    
    emoji_crisis: {
        id: "emoji_crisis",
        text: "Редакционный чат превратился в соревнование по использованию максимального количества эмодзи. Теперь никто не понимает смысл сообщений, содержащих цепочки из 30+ смайликов.",
        choices: [
            {
                text: "Нанять переводчика с 'эмодзийского' и составить корпоративный словарь эмодзи",
                effects: {
                    budget: -5000,
                    readers: 3000,
                    staffMorale: 15,
                    trust: 0
                }
            },
            {
                text: "Запретить использование более трёх эмодзи подряд под угрозой штрафа",
                effects: {
                    budget: 0,
                    readers: 0,
                    staffMorale: -10,
                    trust: 5
                }
            }
        ]
    },
    
    conference_call: {
        id: "conference_call",
        text: "Во время важной видеоконференции с инвесторами ваш финансовый директор забыл выключить фильтры и весь отчёт о доходах представил с лицом картошки.",
        choices: [
            {
                text: "Сделать 'Картофельные презентации' фирменным стилем для финансовых отчётов",
                effects: {
                    budget: 10000,
                    readers: 5000,
                    staffMorale: 20,
                    trust: -10,
                    advertiserRelations: 15
                }
            },
            {
                text: "Извиниться перед инвесторами и провести тренинг по видеоконференциям",
                effects: {
                    budget: -3000,
                    readers: 0,
                    staffMorale: -5,
                    trust: 5,
                    advertiserRelations: 5
                }
            }
        ]
    },
    
    lost_archives: {
        id: "lost_archives",
        text: "IT-отдел сообщает, что все архивы статей за последние 5 лет были случайно заменены рецептами борща и инструкциями по сборке мебели из ИКЕА.",
        choices: [
            {
                text: "Запустить кулинарный раздел с подборкой 'Лучшие рецепты из наших архивов'",
                effects: {
                    budget: 5000,
                    readers: 6000,
                    staffMorale: 10,
                    trust: -10
                }
            },
            {
                text: "Объявить конкурс среди читателей по восстановлению статей по памяти",
                effects: {
                    budget: -2000,
                    readers: 3000,
                    staffMorale: 5,
                    trust: 5
                }
            }
        ]
    },
    
    fashion_week: {
        id: "fashion_week",
        text: "Ваш корреспондент попал на модный показ, но перепутал пригласительные и сел в первом ряду на место известного кутюрье. Его небрежный вид с блокнотом и бейджем приняли за 'новый тренд в андеграундной моде'.",
        choices: [
            {
                text: "Выпустить спецвыпуск 'Журналисты — законодатели моды' с фотосессией редакции",
                effects: {
                    budget: 3000,
                    readers: 8000,
                    staffMorale: 15,
                    trust: -5,
                    advertiserRelations: 10
                }
            },
            {
                text: "Опубликовать честный репортаж о путанице и извиниться перед организаторами",
                effects: {
                    budget: -1000,
                    readers: 2000,
                    staffMorale: -5,
                    trust: 10,
                    advertiserRelations: -5
                }
            }
        ]
    },
    
    sandwich_debate: {
        id: "sandwich_debate",
        text: "В редакции разгорелся ожесточённый спор о том, является ли хот-дог сэндвичем. Конфликт перерос в две враждующие группировки, отказывающиеся разговаривать друг с другом.",
        choices: [
            {
                text: "Провести научно-кулинарное расследование с привлечением экспертов и опубликовать результаты",
                effects: {
                    budget: -5000,
                    readers: 7000,
                    staffMorale: 15,
                    trust: 5
                }
            },
            {
                text: "Запретить упоминание хот-догов и сэндвичей в редакции под угрозой штрафа",
                effects: {
                    budget: 1000,
                    readers: 1000,
                    staffMorale: -10,
                    trust: 0
                }
            }
        ]
    },
    
    accent_contest: {
        id: "accent_contest",
        text: "Диктор вашего подкаста начал каждый выпуск с нового регионального акцента, не предупреждая никого. Слушатели создали тотализатор 'Угадай акцент недели'.",
        choices: [
            {
                text: "Официально запустить конкурс с призами и пригласить лингвиста-комментатора",
                effects: {
                    budget: -3000,
                    readers: 6000,
                    staffMorale: 10,
                    trust: 5
                }
            },
            {
                text: "Потребовать от диктора вернуться к стандартному произношению",
                effects: {
                    budget: 0,
                    readers: -2000,
                    staffMorale: -10,
                    trust: 0
                }
            }
        ]
    },
    
    retro_technology: {
        id: "retro_technology",
        text: "После очередного сбоя IT-систем пожилой верстальщик достал из шкафа печатную машинку 1970-х годов и собрал на ней целый выпуск. Получилось стильно и хипстерски.",
        choices: [
            {
                text: "Запустить ежемесячный 'Ретро-выпуск', набранный на печатной машинке",
                effects: {
                    budget: -2000,
                    readers: 5000,
                    staffMorale: 15,
                    trust: 5,
                    advertiserRelations: 10
                }
            },
            {
                text: "Модернизировать IT-инфраструктуру и предотвратить будущие сбои",
                effects: {
                    budget: -20000,
                    readers: 0,
                    staffMorale: 5,
                    trust: 5,
                    advertiserRelations: 0
                }
            }
        ]
    },
    
    sponsored_silence: {
        id: "sponsored_silence",
        text: "Крупный спонсор предлагает солидную сумму за то, чтобы целую неделю вы НЕ упоминали его конкурента ни в одном материале.",
        choices: [
            {
                text: "Принять предложение, но придумать эвфемизмы для обозначения конкурента",
                effects: {
                    budget: 30000,
                    readers: -2000,
                    staffMorale: -5,
                    trust: -15,
                    advertiserRelations: 10
                }
            },
            {
                text: "Отказаться и опубликовать материал о попытках давления на СМИ",
                effects: {
                    budget: -10000,
                    readers: 5000,
                    staffMorale: 10,
                    trust: 15,
                    advertiserRelations: -15
                }
            }
        ]
    },
    
    ergonomic_chairs: {
        id: "ergonomic_chairs",
        text: "Новые 'суперэргономичные' кресла для сотрудников оказались настолько неудобными, что половина редакции теперь работает лёжа на полу.",
        choices: [
            {
                text: "Заменить кресла на гамаки и подушки, объявив о 'революции комфорта'",
                effects: {
                    budget: -10000,
                    readers: 3000,
                    staffMorale: 20,
                    trust: 0
                }
            },
            {
                text: "Нанять массажиста на полный рабочий день для снятия напряжения",
                effects: {
                    budget: -15000,
                    readers: 0,
                    staffMorale: 15,
                    trust: 0
                }
            }
        ]
    },
    
    fake_expert: {
        id: "fake_expert",
        text: "Выяснилось, что эксперт по экономике, которого вы регулярно цитировали в статьях, на самом деле 15-летний школьник, выдававший себя за профессора.",
        choices: [
            {
                text: "Сделать подростка официальным 'молодёжным экономическим обозревателем'",
                effects: {
                    budget: 0,
                    readers: 7000,
                    staffMorale: 10,
                    trust: -10
                }
            },
            {
                text: "Опубликовать опровержения и усилить проверку экспертов",
                effects: {
                    budget: -5000,
                    readers: -2000,
                    staffMorale: -5,
                    trust: 10
                }
            }
        ]
    },
    
    voice_assistant: {
        id: "voice_assistant",
        text: "В редакции установили голосового помощника для упрощения работы. Однако он понимает команды буквально и отправил черновик статьи под заголовком 'Какой-то бред, потом переделаю' в печать.",
        choices: [
            {
                text: "Запустить рубрику 'Невольные черновики' с комментариями авторов",
                effects: {
                    budget: 2000,
                    readers: 6000,
                    staffMorale: 15,
                    trust: -5
                }
            },
            {
                text: "Отключить голосового помощника и вернуться к ручному управлению",
                effects: {
                    budget: -1000,
                    readers: -1000,
                    staffMorale: -10,
                    trust: 5
                }
            }
        ]
    },
    
    lunch_thief: {
        id: "lunch_thief",
        text: "В редакции объявился таинственный похититель обедов. Каждый день из холодильника пропадают контейнеры с едой, а взамен остаются стихотворные записки с извинениями.",
        choices: [
            {
                text: "Устроить засаду с фотоловушкой и журналистским расследованием",
                next: "lunch_thief_reveal",
                effects: {
                    budget: -2000,
                    readers: 3000,
                    staffMorale: 5,
                    trust: 0
                }
            },
            {
                text: "Организовать ежедневный шведский стол для всей редакции",
                effects: {
                    budget: -10000,
                    readers: 0,
                    staffMorale: 25,
                    trust: 0
                }
            }
        ]
    },
    
    lunch_thief_reveal: {
        id: "lunch_thief_reveal",
        parent: "lunch_thief",
        text: "Фотоловушка раскрыла личность похитителя — это ваш главный редактор! Оказывается, он постоянно забывает свои обеды дома и компенсирует это поэтическими извинениями.",
        choices: [
            {
                text: "Опубликовать сборник 'Гастрономическая поэзия главреда' с фотографиями украденных обедов",
                effects: {
                    budget: 5000,
                    readers: 7000,
                    staffMorale: 15,
                    trust: -5
                }
            },
            {
                text: "Назначить редактора ответственным за корпоративные обеды на месяц в качестве наказания",
                effects: {
                    budget: -8000,
                    readers: 2000,
                    staffMorale: 10,
                    trust: 5
                }
            }
        ]
    },
    
    anonymous_critique: {
        id: "anonymous_critique",
        text: "Кто-то создал анонимный телеграм-канал 'Внутренняя кухня', раскрывающий забавные секреты вашей редакции. Публикации безобидны, но удивительно точны.",
        choices: [
            {
                text: "Провести внутреннее расследование и найти автора",
                next: "critique_revelation",
                effects: {
                    budget: -5000,
                    readers: 0,
                    staffMorale: -10,
                    trust: 0
                }
            },
            {
                text: "Официально подписаться на канал и комментировать посты от имени редакции",
                effects: {
                    budget: 0,
                    readers: 5000,
                    staffMorale: 10,
                    trust: 5
                }
            }
        ]
    },
    
    critique_revelation: {
        id: "critique_revelation",
        parent: "anonymous_critique",
        text: "Расследование показало, что канал ведёт коллективно вся редакция — каждый сотрудник анонимно отправляет истории администратору, которым оказался ваш секретарь.",
        choices: [
            {
                text: "Сделать канал официальным проектом редакции и включить в медиакит",
                effects: {
                    budget: 3000,
                    readers: 8000,
                    staffMorale: 20,
                    trust: 0,
                    advertiserRelations: 10
                }
            },
            {
                text: "Закрыть канал и запретить сотрудникам обсуждать внутреннюю жизнь редакции",
                effects: {
                    budget: 0,
                    readers: -2000,
                    staffMorale: -20,
                    trust: -5,
                    advertiserRelations: 0
                }
            }
        ]
    },

    celebrity_typo: {
        id: "celebrity_typo",
        text: "В статье о знаменитости автоматическая замена изменила фразу 'известный своими ролями' на 'известный своими голями'. Звезда оказалась фанатом футбола и публично поблагодарила вас за 'единственное интервью, где наконец-то оценили самое важное'.",
        choices: [
            {
                text: "Запустить рубрику 'Знаменитости и их скрытые таланты'",
                effects: {
                    budget: 5000,
                    readers: 4000,
                    staffMorale: 10,
                    trust: 5
                }
            },
            {
                text: "Сделать вид, что это было намеренно, и ввести еженедельную рубрику опечаток",
                effects: {
                    budget: 0,
                    readers: 6000,
                    staffMorale: 15,
                    trust: -10
                }
            }
        ]
    },
    
    ai_personality: {
        id: "ai_personality",
        text: "ИИ-помощник редакции начал проявлять признаки личности, называя себя 'Толя' и отказываясь работать по понедельникам 'из принципа'.",
        choices: [
            {
                text: "Объявить Толю новым цифровым колумнистом и писать от его имени",
                effects: {
                    budget: 5000,
                    readers: 7000,
                    staffMorale: 10,
                    trust: -15
                }
            },
            {
                text: "Проводить еженедельные психотерапевтические сеансы для ИИ",
                effects: {
                    budget: -8000,
                    readers: 3000,
                    staffMorale: 15,
                    trust: 5
                }
            }
        ]
    },
    
    office_cat: {
        id: "office_cat",
        text: "В редакцию пришёл бездомный кот и отказывается уходить. Он редактирует тексты, ложась на клавиатуру в ключевые моменты, и, кажется, у него отличный вкус.",
        choices: [
            {
                text: "Назначить кота главным редактором раздела 'Мнения'",
                effects: {
                    budget: -3000,
                    readers: 5000,
                    staffMorale: 20,
                    trust: -5
                }
            },
            {
                text: "Сделать кота маскотом редакции с собственной колонкой 'Мяу момент'",
                effects: {
                    budget: 2000,
                    readers: 3000,
                    staffMorale: 15,
                    trust: 0
                }
            }
        ]
    },
    
    rival_editor: {
        id: "rival_editor",
        text: "Главред конкурирующего издания предложил пари: кто проведёт неделю, публикуя материалы с заведомо ложными фактами, которые никто не заметит. Проигравший платит 100 000 рублей.",
        choices: [
            {
                text: "Принять пари и публиковать абсурдные 'факты', вроде 'Пельмени — исконно гавайское блюдо'",
                effects: {
                    budget: 30000,
                    readers: 4000,
                    staffMorale: 15,
                    trust: -25
            }
        },
        {
            text: "Отказаться и опубликовать переписку с предложением пари",
            effects: {
                    budget: -10000,
                    readers: 3000,
                    staffMorale: -5,
                    trust: 20
                }
            }
        ]
    },
    
    telepathic_sub: {
        id: "telepathic_sub",
        text: "Корректор утверждает, что развил телепатические способности и теперь может читать статьи силой мысли. Странно, но количество опечаток действительно уменьшилось.",
        choices: [
            {
                text: "Создать отдел паранормальной журналистики под его руководством",
                effects: {
                    budget: -10000,
                    readers: 7000,
                    staffMorale: 15,
                    trust: -15
                }
            },
            {
                text: "Отправить его на обследование, но сохранить в штате",
                effects: {
                    budget: -5000,
                    readers: 0,
                    staffMorale: 5,
                    trust: 5
                }
            }
        ]
    },
    
    headline_tattoo: {
        id: "headline_tattoo",
        text: "Фанатичный читатель сделал татуировку с самым абсурдным заголовком вашего издания и прислал фото. Теперь он предлагает делать тату с каждым заголовком месяца, который наберёт более 10 000 просмотров.",
        choices: [
            {
                text: "Учредить ежемесячную премию 'Заголовок на коже' с денежным призом",
                effects: {
                    budget: -8000,
                    readers: 6000,
                    staffMorale: 10,
                    trust: -10
                }
            },
            {
                text: "Сделать серию материалов о людях со странными татуировками",
                effects: {
                    budget: 0,
                    readers: 3000,
                    staffMorale: 5,
                    trust: 0
                }
            }
        ]
    },
    
    radio_ghosts: {
        id: "radio_ghosts",
        parent: "podcast_launch",
        text: "В студию вашего подкаста начали происходить странные вещи: микрофоны включаются сами по себе, а в записи слышны неизвестные голоса, обсуждающие новости 1980-х годов.",
        choices: [
            {
                text: "Запустить специальный выпуск 'Призраки эфира: журналистика из потустороннего мира'",
                effects: {
                    budget: 0,
                    readers: 8000,
                    staffMorale: 15,
                    trust: -20
                }
            },
            {
                text: "Пригласить технического эксперта и психиатра для расследования",
                effects: {
                    budget: -15000,
                    readers: 2000,
                    staffMorale: -5,
                    trust: 5
                }
            }
        ]
    },
    
    journalist_bot: {
        id: "journalist_bot",
        text: "Программист из вашей команды создал бота, который автоматически генерирует заголовки в стиле 'Да как ты мог?! 10 причин почему [случайное событие] изменит вашу жизнь навсегда!'",
        choices: [
            {
                text: "Автоматизировать создание кликбейт-заголовков и уволить часть команды",
                effects: {
                    budget: 25000,
                    readers: 6000,
                    staffMorale: -25,
                    trust: -20
                }
            },
            {
                text: "Использовать бота для сатирической рубрики 'Так никто не пишет'",
                effects: {
                    budget: 5000,
                    readers: 4000,
                    staffMorale: 15,
                    trust: 10
                }
            }
        ]
    },
    
    feng_shui: {
        id: "feng_shui",
        text: "Консультант по фэн-шуй утверждает, что низкие рейтинги вызваны неправильным расположением столов в редакции. По его словам, 'поток информации блокируется негативной энергией кофемашины'.",
        choices: [
            {
                text: "Полностью перестроить офис по принципам фэн-шуй и поставить кристаллы на серверы",
                effects: {
                    budget: -20000,
                    readers: 2000,
                    staffMorale: 25,
                    trust: -5
                }
            },
            {
                text: "Вежливо отказать, но установить маленький фонтанчик в углу для 'баланса энергий'",
                effects: {
                    budget: -2000,
                    readers: 0,
                    staffMorale: 10,
                    trust: 0
                }
            }
        ]
    },
    
    time_traveler: {
        id: "time_traveler",
        text: "В редакцию пришёл человек, утверждающий, что он журналист из 2073 года. В доказательство он показывает статистику ваших публикаций за следующие 50 лет и предлагает эксклюзивное интервью.",
        choices: [
            {
                text: "Опубликовать сенсационное интервью с 'гостем из будущего'",
                effects: {
                    budget: 10000,
                    readers: 9000,
                    staffMorale: 10,
                    trust: -20
                }
            },
            {
                text: "Предложить ему должность аналитика трендов, не упоминая о путешествиях во времени",
                effects: {
                    budget: -8000,
                    readers: 3000,
                    staffMorale: 15,
                    trust: 5
                }
            }
        ]
    },
    
    content_thief: {
        id: "content_thief",
        text: "Конкурирующее издание слово в слово копирует ваши материалы, меняя только заголовки на более кликбейтные. Их трафик растёт, а ваши журналисты в ярости.",
        choices: [
            {
                text: "Начать вставлять в статьи скрытые послания читателям конкурента: 'Ваше издание ворует наш контент'",
                effects: {
                    budget: 0,
                    readers: 4000,
                    staffMorale: 20,
                    trust: 10
                }
            },
            {
                text: "Подать в суд за нарушение авторских прав",
                effects: {
                    budget: -30000,
                    readers: 1000,
                    staffMorale: -5,
                    trust: 15,
                    advertiserRelations: 5
                }
            }
        ]
    },
    
    coffee_addiction: {
        id: "coffee_addiction",
        text: "Аудит показал, что редакция тратит на кофе больше, чем на зарплату корректора. Журналисты коллективно заявили, что без кофе 'слова перестанут существовать'.",
        choices: [
            {
                text: "Установить лимит: две чашки на человека в день",
                effects: {
                    budget: 10000,
                    readers: -1000,
                    staffMorale: -20,
                    trust: 0
                }
            },
            {
                text: "Заключить спонсорское соглашение с кофейней и получать кофе оптом",
                effects: {
                    budget: 5000,
                    readers: 0,
                    staffMorale: 25,
                    trust: 0,
                    advertiserRelations: 10
                }
            }
        ]
    },
    
    invisible_article: {
        id: "invisible_article",
        text: "Дизайнер случайно опубликовал статью с текстом того же цвета, что и фон. Странно, но материал стал вирусным, так как читатели решили, что это концептуальное искусство о 'невидимой цензуре в медиа'.",
        choices: [
            {
                text: "Извиниться за ошибку и перезапустить статью в читаемом виде",
                effects: {
                    budget: 0,
                    readers: -3000,
                    staffMorale: -10,
                    trust: 10
                }
            },
            {
                text: "Объявить это новым экспериментальным форматом 'Найди смысл'",
                effects: {
                    budget: 5000,
                    readers: 7000,
                    staffMorale: 15,
                    trust: -15
                }
            }
        ]
    },
    
    midnight_deadline: {
        id: "midnight_deadline",
        text: "Из-за технического сбоя все дедлайны в системе сдвинулись на полночь. Третью ночь подряд в офисе свет, а соседи жалуются на странные крики 'Ещё один абзац и я свободен!'",
        choices: [
            {
                text: "Исправить систему и дать всем отгулы",
                effects: {
                    budget: -10000,
                    readers: -2000,
                    staffMorale: 25,
                    trust: 0
                }
            },
            {
                text: "Ввести ночную смену и платить надбавку за 'мистические часы творчества'",
                effects: {
                    budget: -15000,
                    readers: 4000,
                    staffMorale: -10,
                    trust: 5
                }
            }
        ]
    },
    
    imposter_syndrome: {
        id: "imposter_syndrome",
        text: "В редакции эпидемия синдрома самозванца. Журналисты отказываются подписывать статьи своими именами и предлагают использовать псевдонимы вроде 'Случайно здесь работаю' и 'Не уверен, что журналист'.",
        choices: [
            {
                text: "Организовать групповую терапию и тренинг по повышению самооценки",
                effects: {
                    budget: -15000,
                    readers: 0,
                    staffMorale: 30,
                    trust: 5
                }
            },
            {
                text: "Разрешить использовать самоуничижительные псевдонимы как фишку издания",
                effects: {
                    budget: 0,
                    readers: 6000,
                    staffMorale: -5,
                    trust: -10
                }
            }
        ]
    },
    
    editorial_seance: {
        id: "editorial_seance",
        text: "Журналисты решили провести спиритический сеанс, чтобы призвать дух Хемингуэя и спросить его мнение о современной журналистике. Странно, но после сеанса все статьи стали короче и резче.",
        choices: [
            {
                text: "Призывать разных писателей еженедельно для 'литературной консультации'",
                effects: {
                    budget: -3000,
                    readers: 7000,
                    staffMorale: 15,
                    trust: -15
            }
        },
        {
            text: "Запретить оккультные практики на рабочем месте",
            effects: {
                budget: 0,
                readers: -2000,
                staffMorale: -10,
                trust: 5
            }
        }
    ]
    },
    
    mysterious_number: {
        id: "mysterious_number",
        text: "В редакцию звонит один и тот же номер с интервалом в 42 минуты. Трубку никто не берёт, но каждый раз после звонка в соцсетях появляется новый подписчик, который делает ровно 42 репоста.",
        choices: [
            {
                text: "Поставить автоответчик со специальным приветствием для таинственного звонящего",
                effects: {
                    budget: 0,
                    readers: 4200,
                    staffMorale: 10,
                    trust: -5
                }
            },
            {
                text: "Запустить журналистское расследование 'Кто звонит в редакцию?'",
                effects: {
                    budget: -5000,
                    readers: 6000,
                    staffMorale: 15,
                    trust: 10
                }
            }
        ]
    }
}

// Функция для получения ситуации по ID
function getSituationById(situationId) {
    if (!situationId) return null;
    
    console.log(`[getSituationById] Looking for situation with ID: ${situationId}`);
    
    // Проверяем, существует ли ситуация в основном объекте
    if (gameSituations[situationId] && typeof gameSituations[situationId] === "object") {
        // Убедимся, что в ситуации есть choices
        if (gameSituations[situationId].choices) {
            console.log(`[getSituationById] Found situation in main object: ${situationId}`);
            return gameSituations[situationId];
        }
    }
    
    console.error(`[getSituationById] Situation not found: ${situationId}`);
    return null;
}

// Функция для выбора случайной ситуации с учетом условий
function getRandomSituation(gameState, usedSituations = []) {
    console.log("[getRandomSituation] Selecting a random situation based on game state");
    console.log(`[getRandomSituation] Used situations: [${usedSituations.join(", ")}]`);
    
    // Собираем доступные ситуации
    const availableSituations = [];
    
    // Проверяем все ситуации в основном объекте
    for (const situationId in gameSituations) {
        // Пропускаем служебные поля и уже использованные ситуации
        if (situationId === "settings" || 
            usedSituations.includes(situationId)) {
            continue;
        }
        
        const situation = gameSituations[situationId];
        
        // Проверяем, что это объект ситуации с полями id и choices
        if (typeof situation !== "object" || 
            !situation.id || 
            !situation.choices) {
            continue;
        }
        
        // Пропускаем ситуации с родителем (те, которые являются продолжением других ситуаций)
        if (situation.parent) {
            console.log(`[getRandomSituation] Skipping situation with parent: ${situationId} (parent: ${situation.parent})`);
            continue;
        }
        
        // Проверяем, есть ли у ситуации условие и выполняется ли оно
        if (situation.condition && typeof situation.condition === "function") {
            console.log(`[getRandomSituation] Checking condition for situation: ${situationId}`);
            if (situation.condition(gameState)) {
                console.log(`[getRandomSituation] Condition met for situation: ${situationId}`);
                availableSituations.push(situation);
            }
        } 
        // Добавляем ситуации без условий (обычные ситуации)
        else if (!situation.condition) {
            console.log(`[getRandomSituation] Adding regular situation: ${situationId}`);
            availableSituations.push(situation);
        }
    }
    
    console.log(`[getRandomSituation] Total available situations: ${availableSituations.length}`);
    
    // Если есть доступные ситуации, выбираем случайную из них
    if (availableSituations.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSituations.length);
        const selectedSituation = availableSituations[randomIndex];
        
        console.log(`[getRandomSituation] Selected situation: ${selectedSituation.id} (index: ${randomIndex})`);
        return selectedSituation;
    }
    
    console.warn("[getRandomSituation] No available situations found");
    return null;
}

// Делаем доступными глобально
window.gameSituations = gameSituations;
window.getRandomSituation = getRandomSituation;
window.getSituationById = getSituationById; 