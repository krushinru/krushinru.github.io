// Класс для обработки чит-кодов
class Cheats {
    constructor(game) {
        // Сохраняем ссылку на экземпляр игры
        this.game = game;
        
        // Массив для хранения последовательности нажатых клавиш
        this.keySequence = [];
        
        // Максимальная длина сохраняемой последовательности
        this.maxSequenceLength = 10;
        
        // Доступные чит-коды
        this.cheatCodes = {
            'aram': this.aramCheat.bind(this),
            'meduza': this.meduzaCheat.bind(this),
            'comicsans': this.comicSansCheat.bind(this),
            'thanos': this.thanosCheat.bind(this),
            'hardmode': this.hardmodeCheat.bind(this)
        };
        
        // Флаг для отслеживания, была ли активирована "медуза"
        this.meduzaActivated = false;
        
        // Флаг для отслеживания, включена ли тема Comic Sans
        this.comicSansThemeActive = false;
        
        // Флаг для отслеживания, активирован ли режим Hard Mode
        this.hardModeActive = false;
        
        // Флаг для блокировки повторного использования чита Thanos
        this.thanosUsed = false;
        
        // Инициализируем обработчик клавиш
        this.init();
        
        console.log('[Cheats] Cheat system initialized');
    }
    
    init() {
        // Добавляем обработчик нажатия клавиш
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }
    
    handleKeyPress(event) {
        // Получаем символ нажатой клавиши
        const key = event.key.toLowerCase();
        
        // Игнорируем клавиши, которые не являются буквами или цифрами
        if (!key.match(/[a-z0-9]/)) return;
        
        // Добавляем символ в последовательность
        this.keySequence.push(key);
        
        // Ограничиваем длину последовательности
        if (this.keySequence.length > this.maxSequenceLength) {
            this.keySequence.shift();
        }
        
        // Проверяем, соответствует ли последовательность какому-либо из чит-кодов
        this.checkForCheats();
    }
    
    checkForCheats() {
        // Получаем текущую последовательность в виде строки
        const sequence = this.keySequence.join('');
        
        // Проверяем каждый чит-код
        Object.entries(this.cheatCodes).forEach(([code, callback]) => {
            // Если последовательность заканчивается чит-кодом
            if (sequence.endsWith(code)) {
                console.log(`[Cheats] Cheat code activated: ${code}`);
                
                // Вызываем соответствующий метод
                callback();
                
                // Сбрасываем последовательность после активации чита
                this.keySequence = [];
                
                // Показываем уведомление о активации чита
                this.showCheatNotification(code);
            }
        });
    }
    
    showCheatNotification(code) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'cheat-notification';
        notification.textContent = `Активирован чит: ${code}`;
        
        // Добавляем на страницу
        document.body.appendChild(notification);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 2500);
    }
    
    aramCheat() {
        console.log('[Cheats] Executing ARAM cheat');
        
        // Увеличиваем бюджет до 200 000
        this.game.state.budget = 200000;
        
        // Устанавливаем доверие на 50%
        this.game.state.trust = 50;
        
        // Обновляем отображение игрового состояния
        this.game.updateGameState();
        
        console.log('[Cheats] ARAM cheat completed');
    }
    
    meduzaCheat() {
        console.log('[Cheats] Executing MEDUZA cheat');
        
        // Устанавливаем доверие на 100%
        this.game.state.trust = 100;
        
        // Добавляем 50 000 читателей
        this.game.state.readers += 50000;
        
        // Обновляем отображение игрового состояния
        this.game.updateGameState();
        
        // Устанавливаем флаг для создания события в следующем ходу
        this.meduzaActivated = true;
        
        // Регистрируем перехватчик для makeChoice, чтобы вставить нашу ситуацию на следующий ход
        this.hookNextTurn();
        
        console.log('[Cheats] MEDUZA cheat completed');
    }
    
    hookNextTurn() {
        // Сохраняем оригинальный метод
        const originalShowSituation = this.game.showSituation;
        
        // Создаем переменную для доступа к this внутри замыкания
        const self = this;
        
        // Заменяем метод своей версией, которая вызовет спец. событие
        this.game.showSituation = function(situationId, alreadyUsed = false) {
            // Проверяем условие для вставки нашего события
            if (self.meduzaActivated) {
                console.log('[Cheats] Triggering MEDUZA aftermath event');
                
                // Сбрасываем флаг
                self.meduzaActivated = false;
                
                // Восстанавливаем оригинальный метод
                self.game.showSituation = originalShowSituation;
                
                // Создаем специальную ситуацию
                const meduzaEvent = {
                    id: 'meduza_aftermath',
                    text: 'Ваш главный редактор ущипнул на корпоративе за мягкое место жену сотрудника. Скандал разгорелся моментально.',
                    choices: [
                        {
                            text: 'Уволить главреда',
                            effects: {
                                trust: -50,
                                readers: -25000,
                                // Особый эффект обрабатывается в методе makeChoice
                                _staffMoraleSet: 10
                            }
                        },
                        {
                            text: 'Замять скандал',
                            effects: {
                                trust: -50,
                                readers: -25000,
                                // Особый эффект обрабатывается в методе makeChoice
                                _staffMoraleSet: 10
                            }
                        }
                    ]
                };
                
                // Сохраняем оригинальный метод makeChoice
                const originalMakeChoice = self.game.makeChoice;
                
                // Заменяем метод своей версией, которая обрабатывает особый эффект _staffMoraleSet
                self.game.makeChoice = function(choice) {
                    console.log('[Cheats] Processing special choice from meduza_aftermath');
                    
                    // Проверяем наличие особого эффекта
                    if (choice.effects && choice.effects._staffMoraleSet !== undefined) {
                        console.log(`[Cheats] Setting staff morale to ${choice.effects._staffMoraleSet}`);
                        
                        // Устанавливаем значение напрямую
                        self.game.state.staffMorale = choice.effects._staffMoraleSet;
                        
                        // Применяем остальные эффекты немедленно и напрямую
                        if (choice.effects.trust) {
                            console.log(`[Cheats] Applying trust effect: ${choice.effects.trust}`);
                            self.game.state.trust = Math.max(0, Math.min(100, self.game.state.trust + choice.effects.trust));
                        }
                        
                        if (choice.effects.readers) {
                            console.log(`[Cheats] Applying readers effect: ${choice.effects.readers}`);
                            self.game.state.readers = Math.max(0, self.game.state.readers + choice.effects.readers);
                        }
                        
                        // Удаляем эффекты, которые мы уже применили вручную
                        delete choice.effects._staffMoraleSet;
                        delete choice.effects.trust;
                        delete choice.effects.readers;
                        
                        // Обновляем отображение игрового состояния сразу после изменений
                        self.game.updateGameState();
                    }
                    
                    // Добавляем индикатор для перехода к случайной ситуации после обработки
                    const needRandomSituation = choice.effects && !choice.effects.next;
                    
                    // Вызываем оригинальный метод для любых оставшихся эффектов
                    originalMakeChoice.call(self.game, choice);
                    
                    // Восстанавливаем оригинальный метод после обработки
                    self.game.makeChoice = originalMakeChoice;
                    
                    // Если выбор не имеет явного указания следующей ситуации,
                    // то принудительно переходим к случайной ситуации
                    if (needRandomSituation) {
                        console.log('[Cheats] Forcing transition to random situation');
                        setTimeout(() => {
                            if (self.game.state.currentSituation === 'meduza_aftermath') {
                                self.game.showRandomSituation();
                            }
                        }, 100);
                    }
                };
                
                // Вызываем оригинальный метод с нашей ситуацией
                originalShowSituation.call(self.game, meduzaEvent, true);
            } else {
                // Если условие не выполнено, просто вызываем оригинальный метод
                originalShowSituation.call(self.game, situationId, alreadyUsed);
            }
        };
    }
    
    comicSansCheat() {
        console.log('[Cheats] Executing COMICSANS cheat');
        
        // Проверяем, активна ли уже тема Comic Sans
        if (this.comicSansThemeActive) {
            // Если активна, отключаем тему
            this.disableComicSansTheme();
        } else {
            // Если не активна, включаем тему
            this.enableComicSansTheme();
        }
    }
    
    enableComicSansTheme() {
        console.log('[Cheats] Enabling Comic Sans theme');
        
        // Проверяем, существует ли уже элемент стилей Comic Sans
        const existingStyle = document.getElementById('comicsans-theme-style');
        if (existingStyle) {
            existingStyle.disabled = false;
            this.comicSansThemeActive = true;
            console.log('[Cheats] Comic Sans theme enabled (existing stylesheet)');
            this.applyComicSansTextEffects();
            return;
        }
        
        // Создаем элемент link для загрузки стилей
        const linkElement = document.createElement('link');
        linkElement.id = 'comicsans-theme-style';
        linkElement.rel = 'stylesheet';
        linkElement.type = 'text/css';
        linkElement.href = 'comicsans-theme.css';
        
        // Добавляем обработчик загрузки стилей
        linkElement.onload = () => {
            console.log('[Cheats] Comic Sans theme loaded successfully');
            // Добавляем класс к body для возможности дополнительных стилей
            document.body.classList.add('comicsans-theme');
            document.body.classList.add('loaded');
            this.comicSansThemeActive = true;
            
            // Применяем дополнительные эффекты
            this.applyComicSansTextEffects();
            
            // Показываем уведомление об успешной загрузке с характерным для темы сообщением
            this.showCheatNotification('ВаУ!! КоМиК сАнС АкТиВиРоВаН!!!1!!');
            
            // Добавляем аудио-эффект активации
            this.playActivationSound();
        };
        
        // Добавляем обработчик ошибки загрузки
        linkElement.onerror = () => {
            console.error('[Cheats] Failed to load Comic Sans theme');
            // Удаляем элемент из DOM
            linkElement.remove();
            // Показываем уведомление об ошибке
            this.showCheatNotification('Упс! Не удалось загрузить Comic Sans :(');
        };
        
        // Добавляем элемент на страницу
        document.head.appendChild(linkElement);
        console.log('[Cheats] Comic Sans theme stylesheet added to document');
    }
    
    disableComicSansTheme() {
        console.log('[Cheats] Disabling Comic Sans theme');
        
        // Находим элемент стилей Comic Sans
        const comicSansStyle = document.getElementById('comicsans-theme-style');
        if (comicSansStyle) {
            // Отключаем стили
            comicSansStyle.disabled = true;
            console.log('[Cheats] Comic Sans theme disabled');
        }
        
        // Удаляем класс с body
        document.body.classList.remove('comicsans-theme');
        document.body.classList.remove('loaded');
        
        // Удаляем обработчик обновления текста
        if (this.comicSansObserver) {
            this.comicSansObserver.disconnect();
            this.comicSansObserver = null;
        }
        
        // Восстанавливаем текст
        this.restoreOriginalText();
        
        // Обновляем флаг
        this.comicSansThemeActive = false;
        
        // Показываем уведомление об отключении
        this.showCheatNotification('Comic Sans отключен. Наконец-то!');
    }
    
    // Применение эффектов к тексту для Comic Sans темы
    applyComicSansTextEffects() {
        console.log('[Cheats] Applying Comic Sans text effects');
        
        // Функция для обработки текста
        const processTextNode = (textNode) => {
            const situationText = document.getElementById('situation-text');
            if (!situationText) return;
            
            // Сохраняем оригинальный текст
            if (!situationText.getAttribute('data-original')) {
                situationText.setAttribute('data-original', situationText.textContent);
            }
            
            // Получаем текст
            const text = situationText.textContent;
            
            // Разбиваем на слова и оборачиваем их в span
            const words = text.split(' ');
            situationText.innerHTML = words.map((word, index) => {
                return `<span style="--word-index: ${index};">${this.comicSansifyText(word)}</span>`;
            }).join(' ');
        };
        
        // Обрабатываем текущий текст
        processTextNode();
        
        // Настраиваем MutationObserver для отслеживания изменений в DOM
        this.comicSansObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && document.getElementById('situation-text')) {
                    processTextNode();
                }
            });
        });
        
        // Наблюдаем за изменениями в #situation-text
        const situationText = document.getElementById('situation-text');
        if (situationText) {
            this.comicSansObserver.observe(situationText.parentNode, {
                childList: true,
                subtree: true
            });
        }
    }
    
    // Восстановление оригинального текста
    restoreOriginalText() {
        const situationText = document.getElementById('situation-text');
        if (!situationText) return;
        
        const originalText = situationText.getAttribute('data-original');
        if (originalText) {
            situationText.textContent = originalText;
        }
    }
    
    // Превращение текста в "вСрАтЫй" стиль
    comicSansifyText(text) {
        return text.split('').map((char, index) => {
            // Случайно меняем регистр букв
            if (char.match(/[a-zA-Zа-яА-Я]/)) {
                return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
            }
            return char;
        }).join('');
    }
    
    // Воспроизведение звука активации
    playActivationSound() {
        // Создаем элемент аудио
        const audio = new Audio('https://www.myinstants.com/media/sounds/anime-wow-sound-effect.mp3');
        
        // Воспроизводим с небольшой задержкой
        setTimeout(() => {
            audio.volume = 0.5;
            audio.play().catch(err => {
                console.warn('[Cheats] Audio could not be played:', err);
            });
        }, 300);
    }
    
    thanosCheat() {
        console.log('[Cheats] Executing THANOS cheat');
        
        // Если чит Thanos уже был использован, показываем сообщение
        if (this.thanosUsed) {
            this.showCheatNotification('Камни бесконечности можно использовать только раз!');
            return;
        }
        
        // Активируем чит
        this.thanosUsed = true;
        
        // Воспроизводим звук щелчка
        this.playSnapSound();
        
        // Запускаем эффект щелчка
        this.showThanosEffect().then(() => {
            // После окончания анимации выполняем эффект чита
            
            // Сохраняем старые значения для сообщения
            const oldBudget = this.game.state.budget;
            const oldReaders = this.game.state.readers;
            const oldTrust = this.game.state.trust;
            const oldAdRelations = this.game.state.advertiserRelations;
            
            // Уменьшаем бюджет и читателей вдвое
            this.game.state.budget = Math.floor(this.game.state.budget / 2);
            this.game.state.readers = Math.floor(this.game.state.readers / 2);
            
            // Удваиваем доверие и отношения с рекламодателями (но не больше 100)
            this.game.state.trust = Math.min(100, this.game.state.trust * 2);
            this.game.state.advertiserRelations = Math.min(100, this.game.state.advertiserRelations * 2);
            
            // Обновляем отображение игры
            this.game.updateGameState();
            
        });
    }
    
    // Визуальный эффект щелчка Таноса
    showThanosEffect() {
        return new Promise((resolve) => {
            console.log('[Cheats] Showing Thanos snap effect');
            
            // Создаем элемент для эффекта
            const effectContainer = document.createElement('div');
            effectContainer.className = 'thanos-effect-container';
            
            // Стиль для контейнера эффекта
            effectContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.5s ease;
            `;
            
            // Добавляем элемент для перчатки
            const gauntlet = document.createElement('div');
            gauntlet.className = 'thanos-gauntlet';
            gauntlet.style.cssText = `
                width: 100px;
                height: 100px;
                background-image: url('https://www.pngkey.com/png/full/10-101456_infinity-gauntlet-png-thanos-infinity-gauntlet.png');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                transform: scale(0);
                transition: transform 0.5s ease;
            `;
            
            // Добавляем перчатку в контейнер
            effectContainer.appendChild(gauntlet);
            
            // Добавляем контейнер на страницу
            document.body.appendChild(effectContainer);
            
            // Запускаем анимацию
            setTimeout(() => {
                effectContainer.style.opacity = '1';
                setTimeout(() => {
                    gauntlet.style.transform = 'scale(1)';
                    
                    // Звук щелчка (если не воспроизведен ранее)
                    setTimeout(() => {
                        // Эффект вспышки
                        const flash = document.createElement('div');
                        flash.className = 'thanos-flash';
                        flash.style.cssText = `
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: white;
                            opacity: 0;
                            transition: opacity 0.2s ease;
                        `;
                        
                        effectContainer.appendChild(flash);
                        
                        setTimeout(() => {
                            flash.style.opacity = '1';
                            setTimeout(() => {
                                flash.style.opacity = '0';
                                
                                // Эффект распада элементов (упрощенная версия)
                                this.disintegrateElements();
                                
                                setTimeout(() => {
                                    // Удаляем эффект
                                    effectContainer.style.opacity = '0';
                                    setTimeout(() => {
                                        effectContainer.remove();
                                        resolve();
                                    }, 500);
                                }, 1500);
                            }, 200);
                        }, 100);
                    }, 1000);
                }, 500);
            }, 100);
        });
    }
    
    // Эффект распада элементов
    disintegrateElements() {
        // Получаем все карточки и элементы статистики
        const elements = document.querySelectorAll('.card, .stat, .metric');
        
        elements.forEach(element => {
            // Клонируем элемент
            const clone = element.cloneNode(true);
            const rect = element.getBoundingClientRect();
            
            // Создаем контейнер для "пепла"
            const dustContainer = document.createElement('div');
            dustContainer.className = 'dust-container';
            dustContainer.style.cssText = `
                position: absolute;
                top: ${rect.top}px;
                left: ${rect.left}px;
                width: ${rect.width}px;
                height: ${rect.height}px;
                z-index: 9998;
                overflow: hidden;
                pointer-events: none;
            `;
            
            // Создаем частицы "пепла"
            for (let i = 0; i < 50; i++) {
                const dust = document.createElement('div');
                dust.className = 'dust-particle';
                
                // Рандомное положение частицы внутри элемента
                const x = Math.random() * rect.width;
                const y = Math.random() * rect.height;
                
                // Рандомное направление движения
                const dx = (Math.random() - 0.5) * 10;
                const dy = (Math.random() - 0.5) * 10;
                
                // Рандомная задержка
                const delay = Math.random() * 1.5;
                
                dust.style.cssText = `
                    position: absolute;
                    top: ${y}px;
                    left: ${x}px;
                    width: 2px;
                    height: 2px;
                    background-color: #000;
                    opacity: 0.8;
                    border-radius: 50%;
                    animation: float 1.5s ease-out ${delay}s;
                `;
                
                dustContainer.appendChild(dust);
            }
            
            // Добавляем контейнер с "пеплом" на страницу
            document.body.appendChild(dustContainer);
            
            // Создаем и добавляем стили для анимации
            if (!document.getElementById('thanos-dust-animation')) {
                const style = document.createElement('style');
                style.id = 'thanos-dust-animation';
                style.textContent = `
                    @keyframes float {
                        0% {
                            transform: translateX(0) translateY(0) scale(1);
                            opacity: 0.8;
                        }
                        100% {
                            transform: translateX(${Math.random() > 0.5 ? '+' : '-'}100px) translateY(-100px) scale(0);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Удаляем контейнер с "пеплом" через 3 секунды
            setTimeout(() => {
                dustContainer.remove();
            }, 3000);
        });
    }
    
    // Воспроизведение звука щелчка
    playSnapSound() {
        // Создаем элемент аудио
        const audio = new Audio('https://www.myinstants.com/media/sounds/thanos-snap.mp3');
        
        // Воспроизводим с небольшой задержкой
        setTimeout(() => {
            audio.volume = 0.5;
            audio.play().catch(err => {
                console.warn('[Cheats] Audio could not be played:', err);
            });
        }, 1500);
    }
    
    hardmodeCheat() {
        console.log('[Cheats] Executing HARDMODE cheat');
        
        // Переключаем режим
        this.hardModeActive = !this.hardModeActive;
        
        if (this.hardModeActive) {
            // Включаем режим сложности
            this.enableHardMode();
        } else {
            // Отключаем режим сложности
            this.disableHardMode();
        }
    }
    
    enableHardMode() {
        console.log('[Cheats] Enabling Hard Mode');
        
        // Добавляем класс для стилизации
        document.body.classList.add('hard-mode');
        
        // Показываем уведомление
        this.showCheatNotification('hardcore');
        
        // Воспроизводим звук
        this.playHardModeSound();
        
        // Модифицируем оригинальный метод makeChoice чтобы удваивать эффекты
        this.hookHardModeEffects();
        
        // Добавляем стили для хард-мода, если их еще нет
        if (!document.getElementById('hard-mode-styles')) {
            const hardModeStyles = document.createElement('style');
            hardModeStyles.id = 'hard-mode-styles';
            hardModeStyles.textContent = `
                body.hard-mode {
                    filter: saturate(0.8) contrast(1.2);
                    background-color: #250000;
                    background-image: linear-gradient(rgba(20, 0, 0, 0.8), rgba(20, 0, 0, 0.8));
                }
                
                body.hard-mode .card, 
                body.hard-mode .stats-panel,
                body.hard-mode .hidden-metrics {
                    box-shadow: 0 0 10px #ff0000;
                }
                
                body.hard-mode #situation-text {
                    text-shadow: 0 0 5px #ff0000;
                    animation: hard-mode-text-pulse 2s infinite;
                }
                
                @keyframes hard-mode-text-pulse {
                    0% { text-shadow: 0 0 5px #ff0000; }
                    50% { text-shadow: 0 0 10px #ff0000; }
                    100% { text-shadow: 0 0 5px #ff0000; }
                }
                
                body.hard-mode .choice-button {
                    border: 1px solid #ff0000;
                }
                
                body.hard-mode .metric-bar::after {
                    box-shadow: 0 0 5px #ff0000;
                }
                
                /* Индикатор Hard Mode */
                body.hard-mode::after {
                    content: "HARD MODE";
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    padding: 5px 10px;
                    background-color: #ff0000;
                    color: white;
                    font-weight: bold;
                    font-size: 14px;
                    border-radius: 4px;
                    pointer-events: none;
                    z-index: 9999;
                    animation: hard-mode-indicator 2s infinite;
                }
                
                @keyframes hard-mode-indicator {
                    0% { opacity: 0.7; }
                    50% { opacity: 1; }
                    100% { opacity: 0.7; }
                }
            `;
            document.head.appendChild(hardModeStyles);
        }
    }
    
    disableHardMode() {
        console.log('[Cheats] Disabling Hard Mode');
        
        // Удаляем класс стилизации
        document.body.classList.remove('hard-mode');
                
        // Восстанавливаем оригинальный метод makeChoice
        this.unhookHardModeEffects();
    }
    
    // Перехватываем метод makeChoice для удвоения эффектов
    hookHardModeEffects() {
        // Сохраняем оригинальный метод
        if (!this.originalMakeChoice) {
            this.originalMakeChoice = this.game.makeChoice;
        }
        
        // Создаем переменную для доступа к this внутри замыкания
        const self = this;
        
        // Заменяем метод своей версией, которая удваивает эффекты
        this.game.makeChoice = function(choice) {
            console.log('[Cheats] Processing choice in Hard Mode');
            
            // Если у выбора есть эффекты, удваиваем их
            if (choice.effects) {
                const doubledEffects = {};
                
                Object.entries(choice.effects).forEach(([stat, value]) => {
                    // Пропускаем next и специальные эффекты
                    if (stat === 'next' || stat.startsWith('_')) {
                        doubledEffects[stat] = value;
                        return;
                    }
                    
                    // Удваиваем эффект
                    const doubledValue = value * 2;
                    console.log(`[Cheats] Hard Mode: Doubling effect ${stat} from ${value} to ${doubledValue}`);
                    doubledEffects[stat] = doubledValue;
                });
                
                // Заменяем эффекты удвоенными
                choice.effects = doubledEffects;
            }
            
            // 10% шанс вызвать критическую ситуацию
            if (Math.random() < 0.1) {
                setTimeout(() => {
                    self.triggerCriticalEvent();
                }, 1000);
            }
            
            // Вызываем оригинальный метод
            self.originalMakeChoice.call(self.game, choice);
        };
    }
    
    // Восстанавливаем оригинальный метод
    unhookHardModeEffects() {
        if (this.originalMakeChoice) {
            this.game.makeChoice = this.originalMakeChoice;
            this.originalMakeChoice = null;
        }
    }
    
    // Создаем критическую ситуацию для Hard Mode
    triggerCriticalEvent() {
        console.log('[Cheats] Triggering critical event in Hard Mode');
        
        // Массив возможных критических ситуаций
        const criticalEvents = [
            {
                text: "КРИТИЧЕСКАЯ СИТУАЦИЯ: Ваш сервер взломан! Хакеры требуют выкуп.",
                choices: [
                    {
                        text: "Заплатить выкуп",
                        effects: {
                            budget: -10000,
                            trust: -5
                        }
                    },
                    {
                        text: "Отказаться платить",
                        effects: {
                            readers: -5000,
                            trust: -10,
                            staffMorale: -10
                        }
                    }
                ]
            },
            {
                text: "КРИТИЧЕСКАЯ СИТУАЦИЯ: Налоговая проверка! В бухгалтерии обнаружены несоответствия.",
                choices: [
                    {
                        text: "Заплатить штраф",
                        effects: {
                            budget: -15000
                        }
                    },
                    {
                        text: "Судиться с налоговой",
                        effects: {
                            budget: -5000,
                            advertiserRelations: -15,
                            staffMorale: -10
                        }
                    }
                ]
            },
            {
                text: "КРИТИЧЕСКАЯ СИТУАЦИЯ: Крупный рекламодатель обвиняет вас в нарушении договора!",
                choices: [
                    {
                        text: "Принести извинения",
                        effects: {
                            advertiserRelations: -10,
                            trust: -5,
                            budget: -5000
                        }
                    },
                    {
                        text: "Опубликовать расследование о рекламодателе",
                        effects: {
                            advertiserRelations: -25,
                            trust: 15,
                            budget: -20000
                        }
                    }
                ]
            }
        ];
        
        // Выбираем случайную ситуацию
        const randomEvent = criticalEvents[Math.floor(Math.random() * criticalEvents.length)];
        
        // Добавляем id для события
        randomEvent.id = 'critical_event_' + Date.now();
        
        // Показываем уведомление о критической ситуации
        this.showDangerNotification("ВНИМАНИЕ! КРИТИЧЕСКАЯ СИТУАЦИЯ!");
        
        // Запускаем вибрацию экрана
        this.shakeScreen();
        
        // Показываем критическую ситуацию с небольшой задержкой
        setTimeout(() => {
            // Сохраняем текущую ситуацию
            const currentSituation = this.game.state.currentSituation;
            
            // Показываем критическую ситуацию
            this.game.showSituation(randomEvent);
            
            // Восстанавливаем текущую ситуацию в игровом состоянии
            this.game.state.currentSituation = currentSituation;
        }, 1000);
    }
    
    // Показываем опасное уведомление
    showDangerNotification(message) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'danger-notification';
        notification.textContent = message;
        
        // Стили для уведомления
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #ff0000;
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
            z-index: 9999;
            animation: danger-pulse 0.5s infinite;
        `;
        
        // Добавляем стили для анимации
        const style = document.createElement('style');
        style.textContent = `
            @keyframes danger-pulse {
                0% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.05); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        // Добавляем на страницу
        document.body.appendChild(notification);
        
        // Воспроизводим звук тревоги
        this.playAlarmSound();
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Эффект вибрации экрана
    shakeScreen() {
        const gameContainer = document.querySelector('.game-container');
        
        if (gameContainer) {
            // Добавляем класс для анимации
            gameContainer.classList.add('shake');
            
            // Добавляем стили, если их еще нет
            if (!document.getElementById('shake-animation')) {
                const style = document.createElement('style');
                style.id = 'shake-animation';
                style.textContent = `
                    .shake {
                        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                    }
                    
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                        20%, 40%, 60%, 80% { transform: translateX(5px); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Удаляем класс после окончания анимации
            setTimeout(() => {
                gameContainer.classList.remove('shake');
            }, 500);
        }
    }
    
    // Воспроизведение звука тревоги
    playAlarmSound() {
        // Создаем элемент аудио
        const audio = new Audio('https://www.myinstants.com/media/sounds/eas-attention-signal-loud-original.mp3');
        
        // Воспроизводим с небольшой задержкой
        setTimeout(() => {
            audio.volume = 0.3;
            audio.play().catch(err => {
                console.warn('[Cheats] Audio could not be played:', err);
            });
        }, 300);
    }
    
    // Воспроизведение звука для Hard Mode
    playHardModeSound() {
        // Создаем элемент аудио
        const audio = new Audio('https://www.myinstants.com/media/sounds/doom-e1m1-hq.mp3');
        
        // Воспроизводим с небольшой задержкой
        setTimeout(() => {
            audio.volume = 0.2;
            audio.play().catch(err => {
                console.warn('[Cheats] Audio could not be played:', err);
            });
        }, 300);
    }
}

// Инициализируем чит-систему при загрузке страницы
window.addEventListener('load', () => {
    // Ждем небольшую задержку, чтобы убедиться, что игра проинициализирована
    setTimeout(() => {
        if (window.game) {
            window.cheats = new Cheats(window.game);
            
            // Добавляем стили для уведомлений
            const style = document.createElement('style');
            style.textContent = `
                .cheat-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background-color: rgba(0, 0, 0, 0.8);
                    color: #fff;
                    padding: 10px 15px;
                    border-radius: 5px;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                }
                
                .cheat-notification.fade-out {
                    animation: fadeOut 0.5s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
            
            console.log('[Cheats] Cheat system loaded');
        } else {
            console.error('[Cheats] Game instance not found');
        }
    }, 500);
}); 