// ========== МОДУЛЬ ЭКСПОРТА ==========
// Зависимости: config.js (tasks), state.js (AppState), ui.js (showToast)

async function captureHeatmapScreenshot(taskIdx) {
    if (!AppState.currentBannerGaze.length) {
        console.warn(`Нет данных взгляда для задания ${taskIdx+1}`);
        AppState.taskHeatmapScreenshots[taskIdx] = null;
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

    // 2. Настраиваем тепловую карту
    const heatmapInstance = h337.create({
        container: heatmapContainer,
        radius: 70,
        blur: 0.92,
        maxOpacity: 0.85,
        minOpacity: 0.15,
    });

    // 3. Подготовка данных
    const points = AppState.currentBannerGaze.map(point => ({
        x: Math.floor(point.x),
        y: Math.floor(point.y),
        value: 1
    }));

    // Группировка близких точек
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

    // 5. чтобы блок успел отрисоваться
    await new Promise(r => setTimeout(r, 150));

    // 6. Получаем canvas тепловой карты
    const heatmapCanvas = heatmapContainer.querySelector('canvas');
    if (!heatmapCanvas) {
        document.body.removeChild(heatmapContainer);
        AppState.taskHeatmapScreenshots[taskIdx] = null;
        return;
    }

    // 7. Создаём новый canvas с прозрачным фоном
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = heatmapCanvas.width;
    finalCanvas.height = heatmapCanvas.height;
    const ctx = finalCanvas.getContext('2d');

    // Заливаем прозрачным фоном
    ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);

    // Рисуем только тепловую карту(без фона сайта)
    ctx.drawImage(heatmapCanvas, 0, 0);

    // 8. сохр. данных
    const dataURL = finalCanvas.toDataURL('image/png');
    AppState.taskHeatmapScreenshots[taskIdx] = dataURL;

    // 9. Удаляем временный контейнер
    document.body.removeChild(heatmapContainer);

    console.log(` Тепловое облако для задания ${taskIdx+1} создано (${groupedPoints.length} зон)`);
}

async function exportResultsAsZip() {
    if (!AppState.sessionId) AppState.sessionId = 'session_' + Date.now();
    const safeUserName = AppState.userName ? AppState.userName.replace(/[^a-z0-9]/gi, '_') : 'anonymous';
    const zipFileName = `${safeUserName}_${AppState.sessionId}_results.zip`;
    const zip = new JSZip();
    const folder = zip.folder(AppState.sessionId);

    const bannerStats = {};
    AppState.bannerMetrics.forEach(m => {
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
        userName: AppState.userName || 'anonymous',
        sessionId: AppState.sessionId,
        timestamp: new Date().toISOString(),
        tasksDone: AppState.tasksDone,
        totalTasks: tasks.length,
        totalCartItems: AppState.cartCount,
        totalGazePoints: Object.values(AppState.gazeStats).reduce((a,b)=>a+b,0),
        bannerMetrics: AppState.bannerMetrics,
        avgCloseTimePerBannerType: avgCloseTime,
        misClicks: AppState.misClicks,
        emotionData: AppState.emotionData,
        bannerGazeData: AppState.bannerGazeData,
        emotionSummary: AppState.emotionData.reduce((acc, e) => {
            acc[e.emotion] = (acc[e.emotion] || 0) + 1;
            return acc;
        }, {})
    };
    folder.file('report.json', JSON.stringify(report, null, 2));

    for (let i = 0; i < AppState.taskHeatmapScreenshots.length; i++) {
        if (AppState.taskHeatmapScreenshots[i]) {
            const base64 = AppState.taskHeatmapScreenshots[i].split(',')[1];
            folder.file(`heatmap_task${i+1}.png`, base64, { base64: true });
        }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, zipFileName);
    showToast('📦 Результаты сохранены в ZIP');
}