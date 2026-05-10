//Вспомогательные функции интерфейса

//показывает временное всплывающее уведомление в правом нижнем углу
function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#333;color:#fff;padding:10px 20px;border-radius:20px;z-index:10000;';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

//сбрасывает игру и перезапускает эксперимент
function resetGame() {
    if (confirm('Сбросить игру? Все несохранённые данные будут потеряны.')) {
        AppState.experimentCompleted = false;
        initGame();
    }
}

//инициализирует кнопки фильтрации товаров по полу и категории
function initFilters() {
    const subFiltersContainer = document.getElementById('subFilters');
    //обновляет набор фильтров категорий при смене пола
    function updateSubFilters(gender) {
        subFiltersContainer.innerHTML = '';
        const btns = [
            { type:'top', label:'👕 Верх' }, { type:'bottom', label:'👖 Низ' },
            { type:'shoes', label:'👟 Обувь' }, { type:'accessory', label:'👜 Аксессуары' }
        ];
        btns.forEach(btn => {
            const button = document.createElement('button');
            button.className = 'sub-filter';
            if (AppState.currentTypeFilter === btn.type) button.classList.add('active');
            button.textContent = btn.label;
            button.dataset.type = btn.type;
            button.addEventListener('click', () => {
                document.querySelectorAll('.sub-filter').forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                AppState.currentTypeFilter = btn.type;
                renderProducts();
            });
            subFiltersContainer.appendChild(button);
        });
    }
    //обработчики на кнопки пола
    document.querySelectorAll('.gender-filter').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.gender-filter').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            AppState.currentGenderFilter = link.dataset.gender;
            if (AppState.currentTypeFilter === 'all') AppState.currentTypeFilter = 'top';
            updateSubFilters(AppState.currentGenderFilter);
            renderProducts();
        });
    });
    updateSubFilters(AppState.currentGenderFilter);
}

//Управление баннерами

//возвращает рекламный текст в зависимости от типа баннера с эмоджи
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

//показывает баннер(ы) заданного типа, приостанавливает игру и начинает замер времени
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

//создаёт DOM-элемент баннера с учётом типа
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

    //добавление пояснительного текста под типу
    if (type === 'classic') {
        content += `<div class="banner-subtext">Скидка действует сегодня ; Бесплатная доставка</div>`;
    } else if (type === 'camouflage') {
        content += `<div class="banner-subtext">Только для новых клиентов ; Предложение ограничено</div>`;
    } else if (type === 'dark') {
        content += `<div class="banner-subtext">Нажмите на кнопку ниже, чтобы закрыть окно</div>`;
    } else if (type === 'shifted') {
        content += `<div class="banner-subtext">Новые поступления ; Специальные цены</div>`;
    }

    //размещение кнопки закрытия и фальшивой кнопки
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
            showToast("Это реклама. Найдите настоящий крестик.");
        });
    }
    overlay.appendChild(banner);
}

//закрывает баннер, фиксирует время, эмоцию после закрытия и пополняет метрики
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

//Товары и трекинг взгляда

//возвращает список товаров, отфильтрованных по текущим фильтрам
function getFilteredProducts() {
    let filtered = products.filter(p => {
        if (AppState.currentGenderFilter !== 'all' && p.gender !== AppState.currentGenderFilter && p.gender !== 'unisex') return false;
        return true;
    });
    if (AppState.currentTypeFilter === 'top') filtered = filtered.filter(p => p.category === 'tshirt' || p.category === 'hoodie');
    else if (AppState.currentTypeFilter === 'bottom') filtered = filtered.filter(p => p.category === 'pants');
    else if (AppState.currentTypeFilter === 'shoes') filtered = filtered.filter(p => p.category === 'shoes');
    else if (AppState.currentTypeFilter === 'accessory') filtered = filtered.filter(p => p.category === 'accessory');
    return filtered;
}

//перестраивает сетку товаров с учётом фильтров и накопленной статистики взглядов
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
        const views = AppState.gazeStats[product.id] || 0;
        card.innerHTML = `
            ${badgeHtml}
            <div class="product-image"><img src="${product.image}" alt="${product.name}"
            onerror="this.src='https://placehold.co/400x500/e3e3e3/333?text=${encodeURIComponent(product.name)}'"></div>
            <h3>${product.name}</h3>
            <div class="product-category">${getCategoryName(product.category)}</div>
            <div class="product-price"><span class="current-price">${product.price.toLocaleString()}
            ₽</span>${product.oldPrice ? `<span class="old-price">${product.oldPrice.toLocaleString()} ₽</span>` : ''}</div>
            <div class="product-options">
                ${product.sizes.length ? `<div class="size-selector"><span>Размер:</span>
                <div class="size-buttons">${product.sizes.map(s => `<button class="size-option" data-size="${s}">${s}</button>`).join('')}</div></div>` : ''}
                ${product.colors && product.colors.length > 1 ? `<div class="color-selector">
                <span>Цвет:</span><div class="color-buttons">${product.colors.map(c => `<div class="color-opt" data-color="${c}"
                style="background: ${getColorCode(c)};"></div>`).join('')}</div></div>` : ''}
            </div>
            <button class="add-to-cart" data-product-id="${product.id}"><i class="fas fa-shopping-cart"></i> Добавить в корзину</button>
            <div class="card-heat-indicator">${views > 0 ? `👁️ ${views}` : ''}</div>
        `;
        grid.appendChild(card);
    });
    attachProductEvents();
}

//возвращает название категории одежды
function getCategoryName(cat) {
    const names = { tshirt:'Футболки', hoodie:'Худи', pants:'Штаны', shoes:'Кроссовки', accessory:'Аксессуары' };
    return names[cat] || cat;
}

//возвращает цвет по названию
function getColorCode(color) {
    const codes = { 'белый':'#fff', 'чёрный':'#1a1a1a', 'синий':'#3b82f6', 'серый':'#9ca3af', 'хаки':'#6b8e23', 'розовый':'#f472b6', 'бежевый':'#e5c9a5', 'коричневый':'#8b5a2b' };
    return codes[color] || '#ccc';
}

//навешивает обработчики выбора размера, цвета и добавления в корзину
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
            if (AppState.experimentCompleted) return;
            const card = btn.closest('.product-card');
            const productId = parseInt(btn.dataset.productId);
            const size = card.dataset.selectedSize || null;
            const color = card.dataset.selectedColor || null;
            processTaskPurchase(productId, size, color);
            AppState.cartCount++;
            document.getElementById('cartCount').innerText = AppState.cartCount;
        });
    });
}

//проверяет, соответствует ли добавленный товар текущему заданию, и завершает задание при необходимости
function processTaskPurchase(productId, size, color) {
    if (AppState.experimentCompleted) return;
    const currentTask = tasks[AppState.currentTaskIndex];
    if (!currentTask) return;
    const required = currentTask.products.find(p => p.id === productId);
    if (required) {
        if (required.size && required.size !== size) {
            showToast(`Неверный размер! Нужен ${required.size}`);
            return;
        }
        if (!AppState.taskProductsPurchased.includes(productId)) {
            AppState.taskProductsPurchased.push(productId);
            showToast(`Верно! (${AppState.taskProductsPurchased.length} из ${currentTask.products.length})`);
        }
        if (AppState.taskProductsPurchased.length === currentTask.products.length && !AppState.taskCompleted) {
            completeTask();
        }
    } else {
        showToast("💡 Этот товар не нужен для текущего задания");
    }
}

//увеличивает счётчик взглядов для карточки товара
function trackGazeOnProducts(x, y) {
    if (AppState.experimentCompleted) return;
    const target = document.elementFromPoint(x, y);
    const productCard = target?.closest('.product-card');
    if (productCard) {
        const pid = productCard.dataset.productId;
        AppState.gazeStats[pid] = (AppState.gazeStats[pid] || 0) + 1;
        const heatTag = productCard.querySelector('.card-heat-indicator');
        if (heatTag) {
            heatTag.innerText = ` ${AppState.gazeStats[pid]}`;
            heatTag.style.opacity = '1';
        }
        document.getElementById('gazeCount').innerText = Object.values(AppState.gazeStats).reduce((a,b)=>a+b,0);
    }
}

//Логика заданий

//запускает таймер текущего задания
function startTask() {
    if (AppState.timerInterval) clearInterval(AppState.timerInterval);
    AppState.taskStartTime = Date.now();
    AppState.taskCompleted = false;
    AppState.timerInterval = setInterval(() => {
        if (!AppState.taskCompleted && AppState.taskStartTime) {
            const elapsed = (Date.now() - AppState.taskStartTime) / 1000;
            document.getElementById('taskTimer').innerText = elapsed.toFixed(2);
        }
    }, 100);
}

//завершает текущее задание, делает снимок тепловой карты и переходит к следующему или финиширует эксперимент
function completeTask() {
    if (AppState.taskCompleted || AppState.experimentCompleted) return;
    AppState.taskCompleted = true;
    clearInterval(AppState.timerInterval);
    const elapsed = (Date.now() - AppState.taskStartTime) / 1000;
    AppState.tasksDone++;
    document.getElementById('tasksDone').innerText = AppState.tasksDone;
    showToast(`✅ Задание ${AppState.currentTaskIndex+1} выполнено за ${elapsed.toFixed(1)} сек!`);

    captureHeatmapScreenshot(AppState.currentTaskIndex).then(() => {
        AppState.currentTaskIndex++;
        if (AppState.currentTaskIndex < tasks.length) {
            loadTask(AppState.currentTaskIndex);
        } else {
            AppState.experimentCompleted = true;
            AppState.gameActive = false;
            document.getElementById('taskText').innerText = '🎉 Все задания выполнены! Спасибо! 🎉';
            showToast('🏆 Поздравляем! Выполнены все задания!');
            document.getElementById('statusText').innerText = '🏆 Игра пройдена! 🏆';
            setTimeout(() => {
                if (confirm('Эксперимент завершён. Сохранить результаты?')) exportResultsAsZip();
            }, 500);
        }
    });
}

//загружает задание по индексу: обновляет текст, запускает таймер и показывает соответствующий баннер
function loadTask(index) {
    if (AppState.experimentCompleted) return;
    AppState.taskProductsPurchased = [];
    AppState.currentBannerGaze = [];
    document.getElementById('taskText').innerText = tasks[index].text;
    startTask();
    showExperimentalBanner(tasks[index].bannerType);
}