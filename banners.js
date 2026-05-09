// ========== МОДУЛЬ БАННЕРОВ ==========
// Зависимости: state.js (AppState), ui.js (showToast)

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

function showExperimentalBanner(type) {
    if (AppState.experimentCompleted || !type) return;
    AppState.gameActive = false;
    AppState.activeBannersCount = 0;
    AppState.currentBannerType = type;
    AppState.currentBannerStartTime = Date.now();
    AppState.currentBannerEmotionBefore = AppState.currentEmotion;
    AppState.lastMultiCloseTime = null;
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
    if (AppState.activeBannersCount === 0) {
        overlay.style.display = 'none';
        AppState.gameActive = true;
    }
}

function createBanner(type, position) {
    AppState.activeBannersCount++;
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
            AppState.misClicks++;
            showToast("Это реклама. Найдите настоящий крестик (маленький значок в углу).");
        });
    }
    overlay.appendChild(banner);
}

function closeBanner(banner, type) {
    const now = Date.now();
    let timeSpent;
    let cumulativeTime = (now - AppState.currentBannerStartTime) / 1000;

    if (type === 'multi') {
        if (AppState.lastMultiCloseTime === null) {
            timeSpent = cumulativeTime;
        } else {
            timeSpent = cumulativeTime - AppState.lastMultiCloseTime;
        }
        AppState.lastMultiCloseTime = cumulativeTime;
    } else {
        timeSpent = cumulativeTime;
    }

    const emotionAfter = AppState.currentEmotion;
    AppState.bannerMetrics.push({
        type: type,
        timeSpent: timeSpent,
        cumulativeTime: cumulativeTime,
        emotionBefore: AppState.currentBannerEmotionBefore,
        emotionAfter: emotionAfter,
        timestamp: now,
        taskId: AppState.currentTaskIndex
    });

    banner.remove();
    AppState.activeBannersCount--;
    if (AppState.activeBannersCount === 0) {
        document.getElementById('bannerOverlay').style.display = 'none';
        AppState.gameActive = true;
        showToast(`Баннеры закрыты за ${cumulativeTime.toFixed(2)} сек.`);
        AppState.lastMultiCloseTime = null;
    }
}