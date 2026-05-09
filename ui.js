// ========== МОДУЛЬ UI ==========
// Зависимости: state.js (AppState)

function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#333;color:#fff;padding:10px 20px;border-radius:20px;z-index:10000;';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function resetGame() {
    if (confirm('Сбросить игру? Все несохранённые данные будут потеряны.')) {
        AppState.experimentCompleted = false;
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