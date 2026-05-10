//переменные для контроля состояния приложения и его модулей
const AppState = {
    //регистрация
    userName: null,

    //состояние игры
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

    //баннеры
    activeBannersCount: 0,
    currentBannerStartTime: null,
    currentBannerType: null,
    currentBannerEmotionBefore: null,
    bannerMetrics: [],
    misClicks: 0,
    lastMultiCloseTime: null,
    bannerGazeData: [],
    currentBannerGaze: [],

    //эмоции
    emotionData: [],
    emotionRecordCounter: 0,
    currentEmotion: 'neutral',

    //тепловые карты и экспорт
    taskHeatmapScreenshots: [],
    sessionId: null
};