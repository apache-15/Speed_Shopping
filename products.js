// ========== МОДУЛЬ ТОВАРОВ ==========
// Зависимости: config.js (products, tasks), state.js (AppState), ui.js (showToast)

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

function processTaskPurchase(productId, size, color) {
    if (AppState.experimentCompleted) return;
    const currentTask = tasks[AppState.currentTaskIndex];
    if (!currentTask) return;
    const required = currentTask.products.find(p => p.id === productId);
    if (required) {
        if (required.size && required.size !== size) {
            showToast(`❌ Неверный размер! Нужен ${required.size}`);
            return;
        }
        if (!AppState.taskProductsPurchased.includes(productId)) {
            AppState.taskProductsPurchased.push(productId);
            showToast(`🎯 Верно! (${AppState.taskProductsPurchased.length} из ${currentTask.products.length})`);
        }
        if (AppState.taskProductsPurchased.length === currentTask.products.length && !AppState.taskCompleted) {
            completeTask();
        }
    } else {
        showToast("💡 Этот товар не нужен для текущего задания");
    }
}

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