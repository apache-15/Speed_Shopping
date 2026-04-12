// ========== КАТАЛОГ ТОВАРОВ ==========
const products = [
    { id: 1, name: 'Синяя футболка', category: 'tshirt', gender: 'men', price: 2000, oldPrice: 3500, image: 'картинки/blue-T-shirt.png', sizes: ['S','M','L','XL'], colors: ['синий'], badge: 'new' },
    { id: 2, name: 'Белая футболка', category: 'tshirt', gender: 'men', price: 1500, oldPrice: 2500, image: 'картинки/white-T-shirt.png', sizes: ['S','M','L','XL'], colors: ['белый'], badge: null },
    { id: 3, name: 'Чёрная футболка', category: 'tshirt', gender: 'women', price: 1800, oldPrice: null, image: 'картинки/black-T-shirt.png', sizes: ['XS','S','M','L'], colors: ['чёрный'], badge: null },
    { id: 4, name: 'Худи серое', category: 'hoodie', gender: 'men', price: 4500, oldPrice: 6500, image: 'картинки/grey-hoody.png', sizes: ['S','M','L','XL'], colors: ['серый'], badge: 'sale' },
    { id: 5, name: 'Худи чёрное', category: 'hoodie', gender: 'men', price: 4900, oldPrice: null, image: 'картинки/black-hoody.png', sizes: ['S','M','L','XL'], colors: ['чёрный'], badge: null },
    { id: 6, name: 'Чёрные штаны', category: 'pants', gender: 'men', price: 3200, oldPrice: null, image: 'картинки/black-pants.png', sizes: ['XS','S','M','L','XL'], colors: ['чёрный'], badge: null },
    { id: 7, name: 'Карго штаны', category: 'pants', gender: 'men', price: 3800, oldPrice: 4800, image: 'картинки/cargo-pants.png', sizes: ['S','M','L','XL'], colors: ['хаки'], badge: 'sale' },
    { id: 8, name: 'Джинсы', category: 'pants', gender: 'women', price: 4200, oldPrice: 5500, image: 'картинки/jeans.png', sizes: ['XS','S','M','L'], colors: ['синий'], badge: 'sale' },
    { id: 9, name: 'Кроссовки белые', category: 'shoes', gender: 'men', price: 5900, oldPrice: 7900, image: 'картинки/white-sneakers.png', sizes: ['40','41','42','43','44'], colors: ['белый'], badge: 'sale' },
    { id: 10, name: 'Кроссовки чёрные', category: 'shoes', gender: 'men', price: 6200, oldPrice: null, image: 'картинки/black-sneakers.png', sizes: ['40','41','42','43','44'], colors: ['чёрный'], badge: null },
    { id: 11, name: 'Кроссовки серые', category: 'shoes', gender: 'women', price: 5500, oldPrice: 6800, image: 'картинки/grey-sneakers.png', sizes: ['36','37','38','39','40'], colors: ['серый'], badge: 'sale' },
    { id: 12, name: 'Кроссовки розовые', category: 'shoes', gender: 'women', price: 5900, oldPrice: null, image: 'картинки/pink-sneakers.png', sizes: ['36','37','38','39','40'], colors: ['розовый'], badge: 'new' },
    { id: 13, name: 'Розовая футболка', category: 'tshirt', gender: 'women', price: 1900, oldPrice: 2800, image: 'картинки/pink-T-shirt.png', sizes: ['XS','S','M','L'], colors: ['розовый'], badge: 'new' },
    { id: 14, name: 'Худи бежевое', category: 'hoodie', gender: 'women', price: 4800, oldPrice: null, image: 'картинки/beige-hoody.png', sizes: ['XS','S','M','L'], colors: ['бежевый'], badge: null },
    { id: 15, name: 'Юбка-миди', category: 'pants', gender: 'women', price: 3500, oldPrice: 4500, image: 'картинки/skirt.png', sizes: ['XS','S','M','L'], colors: ['чёрный'], badge: null },
    { id: 16, name: 'Рюкзак', category: 'accessory', gender: 'unisex', price: 2800, oldPrice: 3900, image: 'картинки/backpack.png', sizes: [], colors: ['чёрный'], badge: 'sale' },
    { id: 17, name: 'Кепка', category: 'accessory', gender: 'unisex', price: 1200, oldPrice: 1900, image: 'картинки/cap.png', sizes: [], colors: ['чёрный','белый'], badge: null },
    { id: 18, name: 'Сумка через плечо', category: 'accessory', gender: 'unisex', price: 2200, oldPrice: 3200, image: 'картинки/bag.png', sizes: [], colors: ['коричневый'], badge: null },
    { id: 19, name: 'Синие кроссовки', category: 'shoes', gender: 'men', price: 6200, oldPrice: null, image: 'картинки/blue-sneakers.png', sizes: ['40','41','42','43','44'], colors: ['синий'], badge: null },
    { id: 20, name: 'Чёрная кепка', category: 'accessory', gender: 'unisex', price: 1200, oldPrice: null, image: 'картинки/black-cap.png', sizes: [], colors: ['чёрный'], badge: null },
    { id: 21, name: 'Зелёные штаны', category: 'pants', gender: 'men', price: 3800, oldPrice: 4800, image: 'картинки/green-pants.png', sizes: ['S','M','L','XL'], colors: ['хаки'], badge: 'sale' },
    { id: 22, name: 'Коричневые штаны', category: 'pants', gender: 'women', price: 3500, oldPrice: 4500, image: 'картинки/brown-pants.png', sizes: ['XS','S','M','L'], colors: ['коричневый'], badge: null },
    { id: 23, name: 'Шарф', category: 'accessory', gender: 'unisex', price: 800, oldPrice: null, image: 'картинки/scarf.png', sizes: [], colors: ['серый'], badge: null },
];

// ========== ЗАДАНИЯ ==========
const tasks = [
    { text: 'Задание 1: Купите синюю футболку (ID 1).', products: [{ id: 1 }], bannerType: 'classic' },
    { text: 'Задание 2: Купите серое худи (ID 4).', products: [{ id: 4 }], bannerType: 'multi' },
    { text: 'Задание 3: Купите чёрные штаны (ID 6).', products: [{ id: 6 }], bannerType: 'shifted' },
    { text: 'Задание 4: Купите джинсы (ID 8).', products: [{ id: 8 }], bannerType: 'camouflage' },
    { text: 'Задание 5: Купите белые кроссовки (ID 9).', products: [{ id: 9 }], bannerType: 'dark' }
];

// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
let currentTaskIndex = 0;
let taskStartTime = null;
let taskCompleted = false;
let timerInterval = null;
let tasksDone = 0;
let cartCount = 0;
let gameActive = false;
let gazeStats = {};
let isCalibrating = true;
let currentGenderFilter = 'women';
let currentTypeFilter = 'top';
let taskProductsPurchased = [];
let experimentCompleted = false;

let activeBannersCount = 0;
let currentBannerStartTime = null;
let currentBannerType = null;
let currentBannerEmotionBefore = null;
let bannerMetrics = [];
let misClicks = 0;
let lastMultiCloseTime = null;

let bannerGazeData = [];
let currentBannerGaze = [];

let emotionData = [];
let emotionRecordCounter = 0;
const EMOTION_RECORD_INTERVAL = 3;
let currentEmotion = 'neutral';

let taskHeatmapScreenshots = [];
let sessionId = null;

// ========== 1. СТАРТ КАЛИБРОВКИ ==========
function startCalibration() {
    if (typeof webgazer === 'undefined') return alert('WebGazer не загружен!');
    isCalibrating = true;
    webgazer.params.moveTickSize = 5;
    webgazer.params.stablizeOutlier = false;
    webgazer.params.waitFramesCount = 1;
    document.getElementById('calibrationOverlay').style.display = 'none';
    document.getElementById('videoMonitor').style.display = 'flex';
    webgazer.setRegression('ridge')
        .setGazeListener((data, timestamp) => {
            if (data && !experimentCompleted) {
                if (!gameActive && currentBannerType) {
                    bannerGazeData.push({ x: data.x, y: data.y, timestamp, bannerType: currentBannerType });
                    currentBannerGaze.push({ x: data.x, y: data.y });
                }
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
            parent.appendChild(wgContainer);
        }
    }, 1000);
}

// ========== 2. FACE API ==========
async function startFaceAPI() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    const faceContainer = document.getElementById('faceVideoContainer');
    const video = document.createElement('video');
    video.autoplay = true;
    video.muted = true;
    video.style.width = '100%';
    faceContainer.appendChild(video);
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => { video.srcObject = stream; video.play(); })
        .catch(err => console.error(err));
    setInterval(async () => {
        if (video.videoWidth && video.videoHeight) {
            const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
            if (detection) {
                const expressions = detection.expressions;
                const dominant = Object.entries(expressions).reduce((a,b) => a[1] > b[1] ? a : b)[0];
                currentEmotion = dominant;
                const faceValues = document.getElementById('faceValues');
                if (faceValues) {
                    const emoji = getEmotionEmoji(dominant);
                    faceValues.innerHTML = `${emoji} ${dominant}: ${Math.round(expressions[dominant]*100)}%`;
                }
                if (gameActive && !experimentCompleted) {
                    emotionRecordCounter++;
                    if (emotionRecordCounter >= EMOTION_RECORD_INTERVAL) {
                        emotionRecordCounter = 0;
                        recordEmotion(dominant, expressions[dominant]);
                    }
                }
            }
        }
    }, 200);
}

function getEmotionEmoji(emotion) {
    const map = { neutral:'😐', happy:'😊', sad:'😢', angry:'😠', fearful:'😨', disgusted:'🤢', surprised:'😲' };
    return map[emotion] || '😐';
}

function recordEmotion(emotion, prob) {
    if (experimentCompleted) return;
    emotionData.push({ timestamp: Date.now(), emotion, probability: prob, taskId: currentTaskIndex });
}

// ========== 3. КАЛИБРОВКА ==========
function createCalibrationPoints() {
    const points = [
        {t:'10%',l:'10%'},{t:'10%',l:'50%'},{t:'10%',l:'90%'},
        {t:'50%',l:'10%'},{t:'50%',l:'50%'},{t:'50%',l:'90%'},
        {t:'90%',l:'10%'},{t:'90%',l:'50%'},{t:'90%',l:'90%'}
    ];
    points.forEach((pos, i) => {
        const pt = document.createElement('div');
        pt.className = 'CalibrationPoint';
        pt.dataset.clicks = 0;
        Object.assign(pt.style, { top: pos.t, left: pos.l, position: 'fixed' });
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
    const remaining = document.querySelectorAll('.CalibrationPoint:not([style*="yellow"])');
    if (remaining.length === 0) startFinalValidation();
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
        borderRadius: '50%', zIndex: '10011'
    });
    document.body.appendChild(vPoint);
    setTimeout(() => {
        vPoint.remove();
        finishCalibration();
    }, 2000);
}

function finishCalibration() {
    document.getElementById('videoMonitor').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    gameActive = true;
    isCalibrating = false;
    initGame();
}

// ========== 4. ИНИЦИАЛИЗАЦИЯ ИГРЫ ==========
function initGame() {
    experimentCompleted = false;
    sessionId = 'session_' + Date.now();
    tasksDone = 0;
    cartCount = 0;
    gazeStats = {};
    emotionData = [];
    bannerMetrics = [];
    misClicks = 0;
    bannerGazeData = [];
    taskHeatmapScreenshots = new Array(tasks.length);
    currentTaskIndex = 0;
    taskProductsPurchased = [];
    document.getElementById('tasksDone').innerText = "0";
    document.getElementById('cartCount').innerText = "0";
    document.getElementById('gazeCount').innerText = "0";
    document.getElementById('totalTasks').innerText = tasks.length;
    renderProducts();
    loadTask(0);
    webgazer.resume();
}

// ========== 5. УПРАВЛЕНИЕ ЗАДАНИЯМИ ==========
function startTask() {
    if (timerInterval) clearInterval(timerInterval);
    taskStartTime = Date.now();
    taskCompleted = false;
    timerInterval = setInterval(() => {
        if (!taskCompleted && taskStartTime) {
            const elapsed = (Date.now() - taskStartTime) / 1000;
            document.getElementById('taskTimer').innerText = elapsed.toFixed(2);
        }
    }, 100);
}

function completeTask() {
    if (taskCompleted || experimentCompleted) return;
    taskCompleted = true;
    clearInterval(timerInterval);
    const elapsed = (Date.now() - taskStartTime) / 1000;
    tasksDone++;
    document.getElementById('tasksDone').innerText = tasksDone;
    showToast(`✅ Задание ${currentTaskIndex+1} выполнено за ${elapsed.toFixed(1)} сек!`);

    captureHeatmapScreenshot(currentTaskIndex).then(() => {
        currentTaskIndex++;
        if (currentTaskIndex < tasks.length) {
            loadTask(currentTaskIndex);
        } else {
            experimentCompleted = true;
            gameActive = false;
            document.getElementById('taskText').innerText = '🎉 Все задания выполнены! Спасибо! 🎉';
            showToast('🏆 Поздравляем! Выполнены все задания!');
            document.getElementById('statusText').innerText = '🏆 Игра пройдена! 🏆';
            setTimeout(() => {
                if (confirm('Эксперимент завершён. Сохранить результаты?')) exportResultsAsZip();
            }, 500);
        }
    });
}

function loadTask(index) {
    if (experimentCompleted) return;
    taskProductsPurchased = [];
    currentBannerGaze = [];
    document.getElementById('taskText').innerText = tasks[index].text;
    startTask();
    showExperimentalBanner(tasks[index].bannerType);
}

// ========== 6. БАННЕРЫ ==========
function showExperimentalBanner(type) {
    if (experimentCompleted || !type) return;
    gameActive = false;
    activeBannersCount = 0;
    currentBannerType = type;
    currentBannerStartTime = Date.now();
    currentBannerEmotionBefore = currentEmotion;
    lastMultiCloseTime = null;
    const overlay = document.getElementById('bannerOverlay');
    overlay.innerHTML = '';
    overlay.style.display = 'block';

    if (type === 'multi') {
        const positions = [
            { top: '5%', left: '5%' }, { top: '5%', right: '5%' },
            { bottom: '5%', left: '5%' }, { bottom: '5%', right: '5%' }
        ];
        positions.forEach(pos => createBanner(type, pos));
    } else {
        let position = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
        createBanner(type, position);
    }
    if (activeBannersCount === 0) {
        overlay.style.display = 'none';
        gameActive = true;
    }
}

function getBannerText(type) {
    const map = {
        classic: '🎁 СКИДКА 20% НА ФУТБОЛКИ',
        multi: '🔥 АКЦИЯ: ДО -50%',
        shifted: '⚠️ ВНИМАНИЕ! ОБНОВЛЕНИЕ ЦЕНЫ',
        camouflage: '💎 ЭКСКЛЮЗИВНОЕ ПРЕДЛОЖЕНИЕ',
        dark: '❌ НАЖМИТЕ НИЖЕ ЧТОБЫ ЗАКРЫТЬ'
    };
    return map[type] || 'Реклама';
}

function createBanner(type, position) {
    activeBannersCount++;
    const overlay = document.getElementById('bannerOverlay');
    const banner = document.createElement('div');
    banner.className = `exp-banner ${type}`;
    Object.assign(banner.style, position);

    let content = `<div class="banner-text">${getBannerText(type)}</div>`;
    const productImages = [
        'картинки/blue-T-shirt.png',
        'картинки/black-hoody.png',
        'картинки/white-sneakers.png',
        'картинки/jeans.png',
        'картинки/cap.png'
    ];
    let randomImg = productImages[Math.floor(Math.random() * productImages.length)];
    if (type === 'multi') {
        content += `<img src="${randomImg}" class="banner-img-small" alt="товар">`;
        content += `<div class="banner-subtext">Успей купить!</div>`;
    } else {
        content += `<img src="${randomImg}" class="banner-img" alt="товар">`;
    }

    if (type === 'classic') {
        content += `<div class="banner-subtext">Скидка действует сегодня • Бесплатная доставка</div>`;
    } else if (type === 'camouflage') {
        content += `<div class="banner-subtext">Только для новых клиентов • Предложение ограничено</div>`;
    } else if (type === 'dark') {
        content += `<div class="banner-subtext">Нажмите на кнопку ниже, чтобы закрыть окно</div>`;
    } else if (type === 'shifted') {
        content += `<div class="banner-subtext">Новые поступления • Специальные цены</div>`;
    }

    // Крестик и фальшивая кнопка
    if (type === 'dark') {
        content += `<button class="fake-action-btn">МОЖНО ЗАКРЫТЬ ОКНО</button>`;
        content += `<div class="banner-close" style="opacity:0.35; width:20px; height:20px; top:16px; right:16px;"></div>`;
    } else if (type === 'camouflage') {
        content += `<div class="banner-close" style="opacity:0.2; top:16px; right:16px;"></div>`;
    } else if (type === 'shifted') {
        content += `<div class="banner-close" style="position:absolute; bottom:16px; left:16px;"></div>`;
    } else {
        content += `<div class="banner-close" style="position:absolute; top:16px; right:16px;"></div>`;
    }

    banner.innerHTML = content;
    const closeBtn = banner.querySelector('.banner-close');
    if (closeBtn) closeBtn.addEventListener('click', () => closeBanner(banner, type));
    if (type === 'dark') {
        const fake = banner.querySelector('.fake-action-btn');
        fake.addEventListener('click', () => {
            misClicks++;
            showToast("Это реклама. Найдите настоящий крестик (маленький значок в углу).");
        });
    }
    overlay.appendChild(banner);
}

function closeBanner(banner, type) {
    const now = Date.now();
    let timeSpent;
    let cumulativeTime = (now - currentBannerStartTime) / 1000;

    if (type === 'multi') {
        if (lastMultiCloseTime === null) {
            timeSpent = cumulativeTime;
        } else {
            timeSpent = cumulativeTime - lastMultiCloseTime;
        }
        lastMultiCloseTime = cumulativeTime;
    } else {
        timeSpent = cumulativeTime;
    }

    const emotionAfter = currentEmotion;
    bannerMetrics.push({
        type: type,
        timeSpent: timeSpent,
        cumulativeTime: cumulativeTime,
        emotionBefore: currentBannerEmotionBefore,
        emotionAfter: emotionAfter,
        timestamp: now,
        taskId: currentTaskIndex
    });

    banner.remove();
    activeBannersCount--;
    if (activeBannersCount === 0) {
        document.getElementById('bannerOverlay').style.display = 'none';
        gameActive = true;
        showToast(`Баннеры закрыты за ${cumulativeTime.toFixed(2)} сек.`);
        lastMultiCloseTime = null;
    }
}

// ========== 7. ТРЕКИНГ ВЗГЛЯДА НА ТОВАРЫ ==========
function trackGazeOnProducts(x, y) {
    if (experimentCompleted) return;
    const target = document.elementFromPoint(x, y);
    const productCard = target?.closest('.product-card');
    if (productCard) {
        const pid = productCard.dataset.productId;
        gazeStats[pid] = (gazeStats[pid] || 0) + 1;
        const heatTag = productCard.querySelector('.card-heat-indicator');
        if (heatTag) {
            heatTag.innerText = ` ${gazeStats[pid]}`;
            heatTag.style.opacity = '1';
        }
        document.getElementById('gazeCount').innerText = Object.values(gazeStats).reduce((a,b)=>a+b,0);
    }
}

// ========== 8. ТЕПЛОВАЯ КАРТА ДЛЯ БАННЕРОВ ==========
async function captureHeatmapScreenshot(taskIdx) {
    if (!currentBannerGaze.length) {
        console.warn(`Нет данных взгляда для задания ${taskIdx+1}`);
        taskHeatmapScreenshots[taskIdx] = null;
        return;
    }

    // 1. Создаём контейнер для тепловой карты (вне экрана)
    const heatmapContainer = document.createElement('div');
    heatmapContainer.style.position = 'fixed';
    heatmapContainer.style.top = '-10000px';
    heatmapContainer.style.left = '-10000px';
    heatmapContainer.style.width = window.innerWidth + 'px';
    heatmapContainer.style.height = window.innerHeight + 'px';
    document.body.appendChild(heatmapContainer);

    // 2. Настраиваем тепловую карту — ОБЛАЧНЫЙ ЭФФЕКТ
    const heatmapInstance = h337.create({
        container: heatmapContainer,
        radius: 70,
        blur: 0.92,
        maxOpacity: 0.85,
        minOpacity: 0.15,

    });

    // 3. Подготавливаем данные
    const points = currentBannerGaze.map(point => ({
        x: Math.floor(point.x),
        y: Math.floor(point.y),
        value: 1
    }));

    // Группировка близких точек (усиливает интенсивность)
    const groupedPoints = [];
    const groupRadius = 30;
    points.forEach(p => {
        let found = false;
        for (let g of groupedPoints) {
            const dx = Math.abs(g.x - p.x);
            const dy = Math.abs(g.y - p.y);
            if (dx < groupRadius && dy < groupRadius) {
                g.value += 1;
                found = true;
                break;
            }
        }
        if (!found) groupedPoints.push({ x: p.x, y: p.y, value: 1 });
    });

    // 4. Загружаем данные
    const maxValue = Math.max(...groupedPoints.map(p => p.value), 1);
    heatmapInstance.setData({
        max: maxValue,
        data: groupedPoints
    });

    // 5. Ждём отрисовки облака
    await new Promise(r => setTimeout(r, 150));

    // 6. Получаем canvas тепловой карты
    const heatmapCanvas = heatmapContainer.querySelector('canvas');
    if (!heatmapCanvas) {
        document.body.removeChild(heatmapContainer);
        taskHeatmapScreenshots[taskIdx] = null;
        return;
    }

    // 7. Создаём новый canvas с ПРОЗРАЧНЫМ фоном (только облака)
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = heatmapCanvas.width;
    finalCanvas.height = heatmapCanvas.height;
    const ctx = finalCanvas.getContext('2d');

    // Заливаем прозрачным фоном (можно оставить белым, если нужно)
    ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);

    // Рисуем только тепловую карту (облака) — без фона страницы
    ctx.drawImage(heatmapCanvas, 0, 0);

    // 8. Сохраняем результат
    const dataURL = finalCanvas.toDataURL('image/png');
    taskHeatmapScreenshots[taskIdx] = dataURL;

    // 9. Удаляем временный контейнер
    document.body.removeChild(heatmapContainer);

    console.log(`🔥 Тепловое облако для задания ${taskIdx+1} создано (${groupedPoints.length} зон, без фона)`);
}

// ========== 9. ФИЛЬТРАЦИЯ ТОВАРОВ И ОТРИСОВКА ==========
function getFilteredProducts() {
    let filtered = products.filter(p => {
        if (currentGenderFilter !== 'all' && p.gender !== currentGenderFilter && p.gender !== 'unisex') return false;
        return true;
    });
    if (currentTypeFilter === 'top') filtered = filtered.filter(p => p.category === 'tshirt' || p.category === 'hoodie');
    else if (currentTypeFilter === 'bottom') filtered = filtered.filter(p => p.category === 'pants');
    else if (currentTypeFilter === 'shoes') filtered = filtered.filter(p => p.category === 'shoes');
    else if (currentTypeFilter === 'accessory') filtered = filtered.filter(p => p.category === 'accessory');
    return filtered;
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const filtered = getFilteredProducts();
    if (filtered.length === 0) { grid.innerHTML = '<div class="no-products">Товаров не найдено</div>'; return; }
    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        let badgeHtml = '';
        if (product.badge === 'new') badgeHtml = '<div class="product-badge new">NEW</div>';
        else if (product.badge === 'sale' || product.oldPrice) badgeHtml = '<div class="product-badge sale">SALE</div>';
        const views = gazeStats[product.id] || 0;
        card.innerHTML = `
            ${badgeHtml}
            <div class="product-image"><img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/400x500/e3e3e3/333?text=${encodeURIComponent(product.name)}'"></div>
            <h3>${product.name}</h3>
            <div class="product-category">${getCategoryName(product.category)}</div>
            <div class="product-price"><span class="current-price">${product.price.toLocaleString()} ₽</span>${product.oldPrice ? `<span class="old-price">${product.oldPrice.toLocaleString()} ₽</span>` : ''}</div>
            <div class="product-options">
                ${product.sizes.length ? `<div class="size-selector"><span>Размер:</span><div class="size-buttons">${product.sizes.map(s => `<button class="size-option" data-size="${s}">${s}</button>`).join('')}</div></div>` : ''}
                ${product.colors && product.colors.length > 1 ? `<div class="color-selector"><span>Цвет:</span><div class="color-buttons">${product.colors.map(c => `<div class="color-opt" data-color="${c}" style="background: ${getColorCode(c)};"></div>`).join('')}</div></div>` : ''}
            </div>
            <button class="add-to-cart" data-product-id="${product.id}"><i class="fas fa-shopping-cart"></i> Добавить в корзину</button>
            <div class="card-heat-indicator">${views > 0 ? `👁️ ${views}` : ''}</div>
        `;
        grid.appendChild(card);
    });
    attachProductEvents();
}

function getCategoryName(cat) {
    const names = { tshirt:'Футболки', hoodie:'Худи', pants:'Штаны', shoes:'Кроссовки', accessory:'Аксессуары' };
    return names[cat] || cat;
}
function getColorCode(color) {
    const codes = { 'белый':'#fff', 'чёрный':'#1a1a1a', 'синий':'#3b82f6', 'серый':'#9ca3af', 'хаки':'#6b8e23', 'розовый':'#f472b6', 'бежевый':'#e5c9a5', 'коричневый':'#8b5a2b' };
    return codes[color] || '#ccc';
}

function attachProductEvents() {
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            card.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            card.dataset.selectedSize = btn.dataset.size;
        });
    });
    document.querySelectorAll('.color-opt').forEach(opt => {
        opt.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            card.querySelectorAll('.color-opt').forEach(c => c.classList.remove('selected'));
            opt.classList.add('selected');
            card.dataset.selectedColor = opt.dataset.color;
        });
    });
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            if (experimentCompleted) return;
            const card = btn.closest('.product-card');
            const productId = parseInt(btn.dataset.productId);
            const size = card.dataset.selectedSize || null;
            const color = card.dataset.selectedColor || null;
            processTaskPurchase(productId, size, color);
            cartCount++;
            document.getElementById('cartCount').innerText = cartCount;
        });
    });
}

function processTaskPurchase(productId, size, color) {
    if (experimentCompleted) return;
    const currentTask = tasks[currentTaskIndex];
    if (!currentTask) return;
    const required = currentTask.products.find(p => p.id === productId);
    if (required) {
        if (required.size && required.size !== size) {
            showToast(`❌ Неверный размер! Нужен ${required.size}`);
            return;
        }
        if (!taskProductsPurchased.includes(productId)) {
            taskProductsPurchased.push(productId);
            showToast(`🎯 Верно! (${taskProductsPurchased.length} из ${currentTask.products.length})`);
        }
        if (taskProductsPurchased.length === currentTask.products.length && !taskCompleted) {
            completeTask();
        }
    } else {
        showToast("💡 Этот товар не нужен для текущего задания");
    }
}

// ========== 10. ЭКСПОРТ В ZIP ==========
async function exportResultsAsZip() {
    if (!sessionId) sessionId = 'session_' + Date.now();
    const zip = new JSZip();
    const folder = zip.folder(sessionId);

    const bannerStats = {};
    bannerMetrics.forEach(m => {
        if (!bannerStats[m.type]) bannerStats[m.type] = { totalTime: 0, count: 0, times: [] };
        bannerStats[m.type].totalTime += m.timeSpent;
        bannerStats[m.type].count++;
        bannerStats[m.type].times.push(m.timeSpent);
    });
    const avgCloseTime = {};
    for (let type in bannerStats) {
        avgCloseTime[type] = bannerStats[type].totalTime / bannerStats[type].count;
    }

    const report = {
        sessionId: sessionId,
        timestamp: new Date().toISOString(),
        tasksDone: tasksDone,
        totalTasks: tasks.length,
        totalCartItems: cartCount,
        totalGazePoints: Object.values(gazeStats).reduce((a,b)=>a+b,0),
        bannerMetrics: bannerMetrics,
        avgCloseTimePerBannerType: avgCloseTime,
        misClicks: misClicks,
        emotionData: emotionData,
        bannerGazeData: bannerGazeData,
        emotionSummary: emotionData.reduce((acc, e) => {
            acc[e.emotion] = (acc[e.emotion] || 0) + 1;
            return acc;
        }, {})
    };
    folder.file('report.json', JSON.stringify(report, null, 2));

    for (let i = 0; i < taskHeatmapScreenshots.length; i++) {
        if (taskHeatmapScreenshots[i]) {
            const base64 = taskHeatmapScreenshots[i].split(',')[1];
            folder.file(`heatmap_task${i+1}.png`, base64, { base64: true });
        }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${sessionId}_results.zip`);
    showToast('📦 Результаты сохранены в ZIP');
}

// ========== 11. ВСПОМОГАТЕЛЬНЫЕ ==========
function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#333;color:#fff;padding:10px 20px;border-radius:20px;z-index:10000;';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function resetGame() {
    if (confirm('Сбросить игру? Все несохранённые данные будут потеряны.')) {
        experimentCompleted = false;
        initGame();
    }
}

function initFilters() {
    const subFiltersContainer = document.getElementById('subFilters');
    function updateSubFilters(gender) {
        subFiltersContainer.innerHTML = '';
        const btns = [
            { type:'top', label:'👕 Верх' }, { type:'bottom', label:'👖 Низ' },
            { type:'shoes', label:'👟 Обувь' }, { type:'accessory', label:'👜 Аксессуары' }
        ];
        btns.forEach(btn => {
            const button = document.createElement('button');
            button.className = 'sub-filter';
            if (currentTypeFilter === btn.type) button.classList.add('active');
            button.textContent = btn.label;
            button.dataset.type = btn.type;
            button.addEventListener('click', () => {
                document.querySelectorAll('.sub-filter').forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                currentTypeFilter = btn.type;
                renderProducts();
            });
            subFiltersContainer.appendChild(button);
        });
    }
    document.querySelectorAll('.gender-filter').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.gender-filter').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentGenderFilter = link.dataset.gender;
            if (currentTypeFilter === 'all') currentTypeFilter = 'top';
            updateSubFilters(currentGenderFilter);
            renderProducts();
        });
    });
    updateSubFilters(currentGenderFilter);
}

// ========== 12. ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    document.getElementById('resetGameBtn')?.addEventListener('click', resetGame);
    document.getElementById('exportResultsBtn')?.addEventListener('click', exportResultsAsZip);
});