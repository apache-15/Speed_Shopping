// ========== МОДУЛЬ ЗАДАНИЙ ==========
// Зависимости: config.js (tasks), state.js (AppState), banners.js (showExperimentalBanner), ui.js (showToast)

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

function loadTask(index) {
    if (AppState.experimentCompleted) return;
    AppState.taskProductsPurchased = [];
    AppState.currentBannerGaze = [];
    document.getElementById('taskText').innerText = tasks[index].text;
    startTask();
    showExperimentalBanner(tasks[index].bannerType);
}