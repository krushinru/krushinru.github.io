---
layout: post
title: Твоя жизнь в неделях
date: 2024-11-02
lead: 90 лет это 4680 недель. Каждая клетка ниже — одна неделя твоей жизни. Визуализация вдохновлена [статьей](https://waitbutwhy.com/2014/05/life-weeks.html) Тима Урбана

---

<html>
    <style>


        :root {
            --bg: #0a0a0a;
            --fg: #fafafa;
            --gray-1: #1a1a1a;
            --gray-2: #2a2a2a;
            --gray-3: #3a3a3a;
            --gray-4: #8a8a8a;
            --accent: #fafafa;
        }

        /* Landing Screen */
        .landing {
            min-height: 50vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px 24px;
        }

        .landing-content {
            max-width: 520px;
            width: 100%;
        }

        .landing h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: clamp(2.5rem, 8vw, 5rem);
            font-weight: 600;
            letter-spacing: -0.04em;
            line-height: 1.05;
            margin-bottom: 80px;
            text-align: center;
        }

        .date-picker-wrapper {
            position: relative;
        }

        .date-label {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: var(--gray-4);
            font-weight: 500;
            margin-bottom: 32px;
            text-align: center;
        }

        .date-selects {
            display: grid;
            grid-template-columns: 1fr 2fr 1.2fr;
            gap: 16px;
            margin-bottom: 60px;
        }

        .select-wrapper {
            position: relative;
        }

        .select-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--gray-4);
            font-weight: 500;
            margin-bottom: 12px;
            display: block;
        }

        select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            font-family: 'Space Grotesk', sans-serif;
            font-size: clamp(1.2rem, 3vw, 1.6rem);
            font-weight: 500;
            letter-spacing: -0.01em;
            padding: 16px 0;
            background: transparent;
            border: none;
            border-bottom: 2px solid var(--gray-2);
            color: var(--fg);
            outline: none;
            transition: border-color 0.2s ease;
            width: 100%;
            cursor: pointer;
        }

        select:focus {
            border-bottom-color: var(--fg);
        }

        select option {
            background: var(--bg);
            color: var(--fg);
            font-size: 16px;
            padding: 12px;
        }

        .select-wrapper::after {
            content: '';
            position: absolute;
            right: 0;
            bottom: 20px;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid var(--gray-4);
            pointer-events: none;
            transition: transform 0.2s ease;
        }

        select:focus + .select-wrapper::after {
            transform: rotate(180deg);
        }

        .landing button {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 0.02em;
            padding: 20px 0;
            background: var(--fg);
            color: var(--bg);
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        .landing button.visible {
            opacity: 1;
            pointer-events: all;
        }

        .landing button:hover {
            opacity: 0.9;
        }

        .landing button:active {
            transform: scale(0.98);
        }

        h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 600;
            letter-spacing: -0.04em;
            line-height: 1.1;
            margin-bottom: 24px;
        }

        .subtitle {
            font-size: 18px;
            color: var(--gray-4);
            font-weight: 300;
            line-height: 1.7;
            max-width: 540px;
        }

        .subtitle a {
            color: var(--fg);
            text-decoration: none;
            border-bottom: 1px solid var(--gray-3);
            transition: border-color 0.2s ease;
        }

        .subtitle a:hover {
            border-bottom-color: var(--fg);
        }

        /* Grid Section */
        .grid-section {
            display: none;
            margin-bottom: 80px;
            padding-bottom: 80px;
            border-bottom: 1px solid var(--gray-2);
        }

        .grid-section.visible {
            display: block;
        }

        .grid-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 40px;
            flex-wrap: wrap;
            gap: 16px;
        }

        .grid-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 20px;
            margin-top: 0 !important;
            font-weight: 500;
            letter-spacing: -0.01em;
        }

        .grid-meta {
            font-size: 13px;
            color: var(--gray-4);
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(52, 1fr);
            gap: 2px;
            margin-bottom: 40px;
        }

        .cell {
            aspect-ratio: 1;
            background: var(--gray-1);
            transition: background 0.15s ease;
        }

        .cell:hover {
            background: var(--gray-2);
        }

        .cell.lived {
            background: var(--fg);
        }

        .cell.lived:hover {
            background: var(--gray-4);
        }

        .legend {
            display: flex;
            gap: 32px;
            font-size: 13px;
            color: var(--gray-4);
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .legend-box {
            width: 14px;
            height: 14px;
        }

        .legend-box.lived {
            background: var(--fg);
        }

        .legend-box.future {
            background: var(--gray-1);
        }

        /* Stats Section */
        .stats {
            display: none;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 32px;
            margin-bottom: 80px;
        }

        .stats.visible {
            display: grid;
        }

        .stat {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .stat-value {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 36px;
            font-weight: 600;
            letter-spacing: -0.02em;
            line-height: 1;
        }

        .stat-label {
            font-size: 13px;
            color: var(--gray-4);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 400;
        }

        /* Actions */
        .actions {
            text-align: center;
            padding-top: 40px;
            border-top: 1px solid var(--gray-2);
            display: none;
        }

        .actions.visible {
            display: block;
        }

        .reset {
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            color: var(--gray-4);
            text-decoration: none;
            letter-spacing: 0.02em;
            transition: color 0.2s ease;
        }

        .reset:hover {
            color: var(--fg);
        }

        .main-content {
            display: none;
        }

        .main-content.visible {
            display: block;
        }

        @media (max-width: 768px) {

            .landing h1 {
                margin-bottom: 60px;
            }

            .date-selects {
                gap: 12px;
                margin-bottom: 40px;
            }

            select {
                font-size: 1.2rem;
                padding: 12px 0;
            }

            .select-wrapper::after {
                bottom: 16px;
            }

            header {
                margin-bottom: 60px;
                padding-bottom: 32px;
            }

            h1 {
                margin-bottom: 20px;
            }

            .grid-section {
                margin-bottom: 60px;
                padding-bottom: 60px;
            }

            .stats {
                margin-bottom: 60px;
            }

            .grid {
                gap: 1px;
            }

            .legend {
                flex-direction: column;
                gap: 16px;
            }
        }

        @media (max-width: 480px) {
            .grid {
                gap: 1px;
            }

            .date-selects {
                grid-template-columns: 80px 1fr 100px;
                gap: 10px;
            }

            select {
                font-size: 1rem;
            }
        }
    </style>

    <!-- Landing Screen -->
    <div class="landing" id="landing">
        <div class="landing-content">            
            <div class="date-picker-wrapper">
                <div class="date-label">Дата рождения</div>
                
                <div class="date-selects">
                    <div class="select-wrapper">
                        <label class="select-label">День</label>
                        <select id="daySelect">
                            <option value="" disabled selected>––</option>
                        </select>
                    </div>
                    
                    <div class="select-wrapper">
                        <label class="select-label">Месяц</label>
                        <select id="monthSelect">
                            <option value="" disabled selected>––––––</option>
                            <option value="1">Январь</option>
                            <option value="2">Февраль</option>
                            <option value="3">Март</option>
                            <option value="4">Апрель</option>
                            <option value="5">Май</option>
                            <option value="6">Июнь</option>
                            <option value="7">Июль</option>
                            <option value="8">Август</option>
                            <option value="9">Сентябрь</option>
                            <option value="10">Октябрь</option>
                            <option value="11">Ноябрь</option>
                            <option value="12">Декабрь</option>
                        </select>
                    </div>
                    
                    <div class="select-wrapper">
                        <label class="select-label">Год</label>
                        <select id="yearSelect">
                            <option value="" disabled selected>––––</option>
                        </select>
                    </div>
                </div>
            </div>

            <button id="submitButton">Продолжить</button>
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content" id="mainContent">
        <section class="grid-section" id="gridSection">
            <div class="grid-header">
                <h2 class="grid-title">Календарь жизни</h2>
                <span class="grid-meta">52 недели × 90 лет</span>
            </div>
            
            <div class="grid" id="grid"></div>
            
            <div class="legend">
                <div class="legend-item">
                    <div class="legend-box lived"></div>
                    <span>Прожитые недели</span>
                </div>
                <div class="legend-item">
                    <div class="legend-box future"></div>
                    <span>Будущие недели</span>
                </div>
            </div>
        </section>

        <section class="stats" id="stats"></section>

        <div class="actions" id="actions">
            <a href="#" class="reset" id="reset">Сбросить данные</a>
        </div>
    </div>

    <script>
        const landing = document.getElementById('landing');
        const mainContent = document.getElementById('mainContent');
        const daySelect = document.getElementById('daySelect');
        const monthSelect = document.getElementById('monthSelect');
        const yearSelect = document.getElementById('yearSelect');
        const submitButton = document.getElementById('submitButton');
        const header = document.getElementById('header');
        const statsSection = document.getElementById('stats');
        const gridSection = document.getElementById('gridSection');
        const grid = document.getElementById('grid');
        const resetLink = document.getElementById('reset');
        const actions = document.getElementById('actions');

        // Populate days (1-31)
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }

        // Populate years (1920 - current year)
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= 1920; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }

        // Check if all selects have values
        function checkFormComplete() {
            if (daySelect.value && monthSelect.value && yearSelect.value) {
                submitButton.classList.add('visible');
            } else {
                submitButton.classList.remove('visible');
            }
        }

        daySelect.addEventListener('change', checkFormComplete);
        monthSelect.addEventListener('change', checkFormComplete);
        yearSelect.addEventListener('change', checkFormComplete);

        function getDateString() {
            const day = daySelect.value.padStart(2, '0');
            const month = monthSelect.value.padStart(2, '0');
            const year = yearSelect.value;
            return `${year}-${month}-${day}`;
        }

        function calculateWeeksLived(dob) {
            const now = new Date();
            const birthDate = new Date(dob);
            const diffMs = now - birthDate;
            return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
        }

        function calculateAge(dob) {
            const now = new Date();
            const birthDate = new Date(dob);
            let age = now.getFullYear() - birthDate.getFullYear();
            const monthDiff = now.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }

        function renderGrid(weeksLived) {
            const totalWeeks = 52 * 90;
            grid.innerHTML = '';
            
            for (let i = 0; i < totalWeeks; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (i < weeksLived) {
                    cell.classList.add('lived');
                }
                grid.appendChild(cell);
            }
        }

        function renderStats(dob) {
            const weeksLived = calculateWeeksLived(dob);
            const totalWeeks = 52 * 90;
            const age = calculateAge(dob);
            const percentLived = ((weeksLived / totalWeeks) * 100).toFixed(1);

            statsSection.innerHTML = `
                <div class="stat">
                    <div class="stat-value">${age}</div>
                    <div class="stat-label">Лет прожито</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${weeksLived.toLocaleString('ru-RU')}</div>
                    <div class="stat-label">Недель прошло</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${(totalWeeks - weeksLived).toLocaleString('ru-RU')}</div>
                    <div class="stat-label">Недель осталось</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${percentLived}%</div>
                    <div class="stat-label">Пути пройдено</div>
                </div>
            `;
        }

        function showVisualization(dob) {
            const weeksLived = calculateWeeksLived(dob);
            
            renderGrid(weeksLived);
            renderStats(dob);
            
            landing.style.display = 'none';
            mainContent.classList.add('visible');
            gridSection.classList.add('visible');
            statsSection.classList.add('visible');
            actions.classList.add('visible');
        }

        function hideVisualization() {
            landing.style.display = 'flex';
            mainContent.classList.remove('visible');
            gridSection.classList.remove('visible');
            statsSection.classList.remove('visible');
            actions.classList.remove('visible');
            
            daySelect.value = '';
            monthSelect.value = '';
            yearSelect.value = '';
            submitButton.classList.remove('visible');
        }

        function init() {
            const storedDob = localStorage.getItem('dob');
            if (storedDob) {
                showVisualization(storedDob);
            }
        }

        submitButton.addEventListener('click', () => {
            const dob = getDateString();
            if (daySelect.value && monthSelect.value && yearSelect.value) {
                localStorage.setItem('dob', dob);
                showVisualization(dob);
            }
        });

        resetLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('dob');
            hideVisualization();
        });

        init();
    </script>
</html>