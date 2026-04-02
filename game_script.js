// ========== КАТАЛОГ ТОВАРОВ ==========
const products = [
    { id: 1, name: 'Синяя футболка', price: 2000, oldPrice: 3500,
        image: 'картинки/blue-T-shirt.png', sizes: ['S','M','L','XL'], type: 'tshirt', badge: 'new' },
    { id: 2, name: 'Белая футболка', price: 1500, oldPrice: 2500,
        image: 'картинки/white-T-shirt.png', sizes: ['S','M','L','XL'], type: 'tshirt', badge: null },
    { id: 6, name: 'Чёрные штаны', price: 3200, oldPrice: null,
        image: 'картинки/black-pants.png', sizes: ['XS','S','M','L','XL'], type: 'pants', badge: null },
    { id: 10, name: 'Кроссовки чёрные', price: 6200, oldPrice: null,
        image: 'картинки/black-sneakers.png', sizes: ['40','41','42','43','44'], type: 'shoes', badge: null },
    { id: 3, name: 'Чёрная футболка', price: 1800, oldPrice: null,
        image: 'картинки/black-T-shirt.png', sizes: ['XS','S','M','L'], type: 'tshirt', badge: null },
    { id: 4, name: 'Худи серое', price: 4500, oldPrice: 6500,
        image: 'картинки/grey-hoody.png', sizes: ['S','M','L','XL'], type: 'hoodie', badge: 'sale' },
    { id: 5, name: 'Худи чёрное', price: 4900, oldPrice: null,
        image: 'картинки/black-hoody.png', sizes: ['S','M','L','XL'], type: 'hoodie', badge: null },
    { id: 7, name: 'Карго штаны', price: 3800, oldPrice: 4800,
        image: 'картинки/cargo-pants.png', sizes: ['S','M','L','XL'], type: 'pants', badge: 'sale' },
    { id: 8, name: 'Джинсы', price: 4200, oldPrice: 5500,
        image: 'картинки/jeans.png', sizes: ['XS','S','M','L'], type: 'pants', badge: 'sale' },
    { id: 9, name: 'Кроссовки белые', price: 5900, oldPrice: 7900,
        image: 'картинки/white-sneakers.png', sizes: ['40','41','42','43','44'], type: 'shoes', badge: 'sale' },
    { id: 11, name: 'Кроссовки серые', price: 5500, oldPrice: 6800,
        image: 'картинки/grey-sneakers.png', sizes: ['36','37','38','39','40'], type: 'shoes', badge: 'sale' },
    { id: 12, name: 'Рюкзак', price: 2800, oldPrice: 3900,
        image: 'картинки/backpack.png', sizes: [], type: 'accessory', badge: 'sale' },
    { id: 13, name: 'Кепка', price: 1200, oldPrice: 1900,
        image: 'картинки/cap.png', sizes: [], type: 'accessory', badge: null },
];

// ========== ЗАДАНИЯ ==========
const tasks = [
    { text: 'Купите синюю футболку (размер M)', productId: 1, size: 'M' },
    { text: 'Купите чёрные штаны (размер M)', productId: 6, size: 'M' },
    { text: 'Купите чёрные кроссовки (размер 42)', productId: 10, size: '42' }
];

// ========== ПЕРЕМЕННЫЕ ==========
let currentTaskIndex = 0;
let taskStartTime = null;
let taskCompleted = false;
let timerInterval = null;
let tasksDone = 0;
let selectedSize = null;
let cartCount = 0;
let gameActive = false;
let gazeStats = {};

// ========== 1. СТАРТ СИСТЕМЫ ==========
function startCalibration() {
    if (typeof webgazer === 'undefined') return alert('WebGazer не загружен!');

    webgazer.params.moveTickSize = 5;
    webgazer.params.stablizeOutlier = false;
    webgazer.params.waitFramesCount = 1;

    document.getElementById('calibrationOverlay').style.display = 'none';
    document.getElementById('videoMonitor').style.display = 'flex';

    webgazer.setRegression('ridge')
        .setGazeListener((data, timestamp) => {
            if (data) {
                updateGazeIndicator(data.x, data.y);
                if (gameActive) trackGazeOnProducts(data.x, data.y);
            }
        })
        .begin()
        .then(() => {
            webgazer.showVideo(true).showPredictionPoints(false);
            setupVideoLayout();
            startFaceAPI();
            createCalibrationPoints();
        });
}

function setupVideoLayout() {
    setTimeout(() => {
        const wgContainer = document.getElementById('webgazerVideoContainer');
        const parent = document.getElementById('webgazerVideoParent');
        if (wgContainer && parent) {
            wgContainer.style.position = 'relative';
            wgContainer.style.width = '100%';
            wgContainer.style.top = '0';
            wgContainer.style.left = '0';
            parent.appendChild(wgContainer);
        }
    }, 1000);
}

function startFaceAPI() {
    const faceContainer = document.getElementById('faceVideoContainer');
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.muted = true;
            video.style.width = '100%';
            faceContainer.appendChild(video);
        })
        .catch(err => console.error("Ошибка Face API видео:", err));
}

// 2. КАЛИБРОВКА (9 ТОЧЕК)
function createCalibrationPoints() {
    const points = [
        {t: '10%', l: '10%'}, {t: '10%', l: '50%'}, {t: '10%', l: '90%'},
        {t: '50%', l: '10%'}, {t: '50%', l: '50%'}, {t: '50%', l: '90%'},
        {t: '90%', l: '10%'}, {t: '90%', l: '50%'}, {t: '90%', l: '90%'}
    ];

    points.forEach((pos, i) => {
        const pt = document.createElement('div');
        pt.className = 'CalibrationPoint';
        pt.dataset.clicks = 0;
        Object.assign(pt.style, {
            top: pos.t, left: pos.l, position: 'fixed', width: '25px', height: '25px',
            background: 'red', borderRadius: '50%', cursor: 'pointer', zIndex: '10010'
        });

        pt.onclick = function() {
            let clicks = parseInt(this.dataset.clicks) + 1;
            this.dataset.clicks = clicks;
            this.style.opacity = 1 - (clicks * 0.15);
            if (clicks >= 5) {
                this.style.background = 'yellow';
                this.style.pointerEvents = 'none';
                checkCalibrationStatus();
            }
        };
        document.body.appendChild(pt);
    });
}

function checkCalibrationStatus() {
    const remainingPoints = document.querySelectorAll('.CalibrationPoint:not([style*="yellow"])');
    if (remainingPoints.length === 0) {
        startFinalValidation();
    }
}

function startFinalValidation() {
    document.querySelectorAll('.CalibrationPoint').forEach(p => p.remove());
    const status = document.getElementById('calibrationStatus');
    if (status) status.innerText = "Посмотрите на синюю точку в центре";

    const vPoint = document.createElement('div');
    vPoint.className = 'FinalPoint';
    Object.assign(vPoint.style, {
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        background: 'blue', width: '40px', height: '40px', position: 'fixed',
        borderRadius: '50%', zIndex: '10011', boxShadow: '0 0 15px rgba(0,0,255,0.5)'
    });
    document.body.appendChild(vPoint);

    setTimeout(() => {
        vPoint.remove();
        finishCalibration();
    }, 2000);
}

// 3. ЗАПУСК ИГРЫ
function finishCalibration() {
    document.getElementById('videoMonitor').style.display = 'none';
    webgazer.showVideo(false);
    document.getElementById('gameContainer').style.display = 'block';

    gameActive = true;
    initGame();
}

function initGame() {
    tasksDone = 0;
    cartCount = 0;
    gazeStats = {};
    currentTaskIndex = 0;
    document.getElementById('tasksDone').innerText = "0";
    document.getElementById('cartCount').innerText = "0";
    document.getElementById('gazeCount').innerText = "0";

    renderProducts();
    loadTask(0);
    webgazer.resume();
}

// 4. ТРЕКИНГ ВЗГЛЯДОВ
function trackGazeOnProducts(x, y) {
    const target = document.elementFromPoint(x, y);
    const productCard = target ? target.closest('.product-card') : null;

    if (productCard) {
        const productId = productCard.dataset.productId;
        gazeStats[productId] = (gazeStats[productId] || 0) + 1;

        const heatTag = productCard.querySelector('.card-heat-indicator');
        if (heatTag) {
            heatTag.innerText = gazeStats[productId];
            heatTag.style.opacity = "1";
            const intensity = Math.min(gazeStats[productId] * 10, 255);
            heatTag.style.background = `rgba(${intensity}, ${255 - intensity}, 0, 0.8)`;
        }

        document.getElementById('gazeCount').innerText = Object.values(gazeStats).reduce((a,b) => a + b, 0);
    }
}

// 5. УПРАВЛЕНИЕ ЗАДАНИЯМИ
function updateTimerDisplay() {
    if (taskStartTime && !taskCompleted) {
        const elapsed = (Date.now() - taskStartTime) / 1000;
        document.getElementById('taskTimer').innerText = elapsed.toFixed(2);
    }
}

function startTask() {
    if (timerInterval) clearInterval(timerInterval);
    taskStartTime = Date.now();
    taskCompleted = false;
    timerInterval = setInterval(updateTimerDisplay, 100);
}

function completeTask() {
    if (taskCompleted) return;
    taskCompleted = true;
    clearInterval(timerInterval);
    const elapsed = (Date.now() - taskStartTime) / 1000;

    tasksDone++;
    document.getElementById('tasksDone').innerText = tasksDone;
    showToast(`✅ Задание ${currentTaskIndex + 1} выполнено за ${elapsed.toFixed(1)} сек!`);

    currentTaskIndex++;
    if (currentTaskIndex < tasks.length) {
        loadTask(currentTaskIndex);
    } else {
        document.getElementById('taskText').innerText = '🎉 Все задания выполнены! Спасибо! 🎉';
        showToast('🏆 Поздравляем! Вы выполнили все задания!');
        document.getElementById('statusText').innerText = '🏆 Игра пройдена! 🏆';
    }
}

function loadTask(index) {
    document.getElementById('taskText').innerText = tasks[index].text;
    startTask();
    selectedSize = null;
    highlightRequiredProduct(tasks[index].productId);
}

function highlightRequiredProduct(productId) {
    document.querySelectorAll('.product-card').forEach(card => {
        if (parseInt(card.dataset.productId) === productId) {
            card.style.border = '2px solid #3b82f6';
            card.style.boxShadow = '0 0 0 4px rgba(59,130,246,0.2)';
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            card.style.border = 'none';
            card.style.boxShadow = 'none';
        }
    });
}

function checkAndCompleteTask(productId, size) {
    const currentTask = tasks[currentTaskIndex];
    if (!currentTask) return false;
    if (currentTask.productId !== productId) {
        showToast(`⚠️ Сейчас нужно купить: ${currentTask.text}`);
        return false;
    }
    if (currentTask.size !== size) {
        showToast(`❌ Неверный размер. Нужен: ${currentTask.size}`);
        return false;
    }
    if (!taskCompleted) {
        completeTask();
    }
    return true;
}

// 6. ОТРИСОВКА ТОВАРОВ
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;

        let badgeHtml = '';
        if (product.badge === 'new') badgeHtml = '<div class="product-badge new">NEW</div>';
        else if (product.badge === 'sale' || product.oldPrice) badgeHtml = '<div class="product-badge sale">SALE</div>';

        card.innerHTML = `
            ${badgeHtml}
            <div class="product-image"><img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/400x500/e3e3e3/333?text=${encodeURIComponent(product.name)}'"></div>
            <h3>${product.name}</h3>
            <div class="product-price"><span class="current-price">${product.price.toLocaleString()} ₽</span>${product.oldPrice ? `<span class="old-price">${product.oldPrice.toLocaleString()} ₽</span>` : ''}</div>
            <div class="product-options">
                ${product.sizes.length ? `
                    <div class="size-selector">
                        <span>Размер:</span>
                        <div class="size-buttons">
                            ${product.sizes.map(s => `<button class="size-option" data-size="${s}">${s}</button>`).join('')}
                        </div>
                    </div>
                ` : ''}
                ${product.type === 'pants' ? `
                    <div class="hidden-select">
                        <div class="double-click-icon">🔽 Двойной клик</div>
                        <select class="pants-select">
                            <option value="">Выберите размер</option>
                            ${product.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                ` : ''}
                ${product.type === 'shoes' ? `
                    <div class="deep-menu">
                        <div class="menu-level1">Мужчинам ▸</div>
                        <div class="menu-level2 hidden">Одежда ▸</div>
                        <div class="menu-level3 hidden">Обувь ▸</div>
                        <div class="menu-level4 hidden">Кроссовки ▸</div>
                        <div class="menu-level5 hidden">Спортивные</div>
                        <div class="color-picker hidden">
                            <span>Цвет:</span>
                            ${product.colors?.map(c => `<div class="color-option" data-color="${c}" style="background: ${getColorCode(c)};"></div>`).join('') || ''}
                        </div>
                    </div>
                ` : ''}
            </div>
            <button class="add-to-cart" data-product-id="${product.id}"><i class="fas fa-shopping-cart"></i> Добавить в корзину</button>
            <div class="card-heat-indicator">0</div>
        `;
        grid.appendChild(card);
    });

    attachProductEvents();
}

function getColorCode(color) {
    const codes = { 'белый': '#ffffff', 'чёрный': '#1a1a1a', 'синий': '#3b82f6', 'серый': '#9ca3af',
        'хаки': '#4b5563', 'розовый': '#f472b6', 'бежевый': '#e5c9a5' };
    return codes[color] || '#cccccc';
}

function attachProductEvents() {
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = btn.dataset.size;
        });
    });

    document.querySelectorAll('.double-click-icon').forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const select = icon.nextElementSibling;
            if (select) select.style.display = 'block';
        });
    });

    document.querySelectorAll('.pants-select').forEach(select => {
        select.addEventListener('change', (e) => {
            selectedSize = e.target.value;
        });
    });

    document.querySelectorAll('.deep-menu').forEach(menu => {
        let step = 1;
        const level1 = menu.querySelector('.menu-level1'), level2 = menu.querySelector('.menu-level2'),
              level3 = menu.querySelector('.menu-level3'), level4 = menu.querySelector('.menu-level4'),
              level5 = menu.querySelector('.menu-level5'), colorPicker = menu.querySelector('.color-picker');
        const showStep = (s) => {
            if (level2) level2.classList.add('hidden');
            if (level3) level3.classList.add('hidden');
            if (level4) level4.classList.add('hidden');
            if (level5) level5.classList.add('hidden');
            if (colorPicker) colorPicker.classList.add('hidden');
            if (s >= 2 && level2) level2.classList.remove('hidden');
            if (s >= 3 && level3) level3.classList.remove('hidden');
            if (s >= 4 && level4) level4.classList.remove('hidden');
            if (s >= 5 && level5) level5.classList.remove('hidden');
            if (s >= 6 && colorPicker) colorPicker.classList.remove('hidden');
        };
        if (level1) level1.addEventListener('click', () => { step = 2; showStep(2); });
        if (level2) level2.addEventListener('click', () => { step = 3; showStep(3); });
        if (level3) level3.addEventListener('click', () => { step = 4; showStep(4); });
        if (level4) level4.addEventListener('click', () => { step = 5; showStep(5); });
        if (level5) level5.addEventListener('click', () => { step = 6; showStep(6); });
        if (colorPicker) {
            colorPicker.querySelectorAll('.color-option').forEach(opt => {
                opt.addEventListener('click', () => {
                    selectedSize = opt.dataset.color;
                });
            });
        }
    });

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            checkAndCompleteTask(productId, selectedSize);
            cartCount++;
            document.getElementById('cartCount').innerText = cartCount;
            showToast(`🛍️ Товар добавлен в корзину! (${cartCount})`);
        });
    });
}

// 7. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
function updateGazeIndicator(x, y) {
    const gi = document.getElementById('gazeIndicator');
    if (gi) {
        gi.style.display = 'block';
        gi.style.left = x + 'px';
        gi.style.top = y + 'px';
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#333;color:white;padding:10px 20px;border-radius:20px;z-index:10000;';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function exportHeatmapData() {
    const exportData = {
        gameStats: { tasksDone, totalTasks: tasks.length, timestamp: new Date().toISOString() },
        gazeStats: gazeStats,
        cartCount: cartCount
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heatmap_data_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Данные экспортированы');
}

function resetGame() {
    currentTaskIndex = 0;
    tasksDone = 0;
    cartCount = 0;
    selectedSize = null;
    tasksDoneSpan.textContent = '0';
    cartCountSpan.textContent = '0';
    renderProducts();
    loadTask(0);
    showToast('🔄 Новая игра!');
}