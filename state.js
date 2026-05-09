// ========== ГЛОБАЛЬНОЕ СОСТОЯНИЕ ПРИЛОЖЕНИЯ ==========
const AppState = {
    // Регистрация
    userName: null,

    // Состояние игры
    currentTaskIndex: 0,
    taskStartTime: null,
    taskCompleted: false,
    timerInterval: null,
    tasksDone: 0,
    cartCount: 0,
    gameActive: false,
    gazeStats: {},
    isCalibrating: true,
    currentGenderFilter: 'women',
    currentTypeFilter: 'top',
    taskProductsPurchased: [],
    experimentCompleted: false,

    // Баннеры
    activeBannersCount: 0,
    currentBannerStartTime: null,
    currentBannerType: null,
    currentBannerEmotionBefore: null,
    bannerMetrics: [],
    misClicks: 0,
    lastMultiCloseTime: null,
    bannerGazeData: [],
    currentBannerGaze: [],

    // Эмоции
    emotionData: [],
    emotionRecordCounter: 0,
    currentEmotion: 'neutral',

    // Тепловые карты и экспорт
    taskHeatmapScreenshots: [],
    sessionId: null
};