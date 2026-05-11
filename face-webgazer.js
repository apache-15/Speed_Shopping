//инициализация Face API
async function startFaceAPI() {
    //подгрузка моделей
    await faceapi.nets.tinyFaceDetector.loadFromUri('./models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('./models');
    await faceapi.nets.faceExpressionNet.loadFromUri('./models');
    const faceContainer = document.getElementById('faceVideoContainer');
    //запуск видеоряда
    const video = document.createElement('video');
    video.autoplay = true;
    video.muted = true;
    video.style.width = '100%';
    faceContainer.appendChild(video);
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => { video.srcObject = stream; video.play(); })
        .catch(err => console.error(err));
    // Циклическое определение эмоции
    setInterval(async () => {
        if (video.videoWidth && video.videoHeight) {
            const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
            if (detection) {
                const expressions = detection.expressions;
                const dominant = Object.entries(expressions).reduce((a,b) => a[1] > b[1] ? a : b)[0];
                AppState.currentEmotion = dominant;
                const faceValues = document.getElementById('faceValues');
                if (faceValues) {
                    const emoji = getEmotionEmoji(dominant);
                    faceValues.innerHTML = `${emoji} ${dominant}: ${Math.round(expressions[dominant]*100)}%`;
                }
                // Запись эмоции с заданным интервалом
                if (AppState.gameActive && !AppState.experimentCompleted) {
                    AppState.emotionRecordCounter++;
                    if (AppState.emotionRecordCounter >= EMOTION_RECORD_INTERVAL) {
                        AppState.emotionRecordCounter = 0;
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
    if (AppState.experimentCompleted) return;
    AppState.emotionData.push({ timestamp: Date.now(), emotion, probability: prob, taskId: AppState.currentTaskIndex });
}

//калибровка WebGazer
function startCalibration() {
    if (typeof webgazer === 'undefined') return alert('WebGazer не загружен!');
    AppState.isCalibrating = true;
    webgazer.params.moveTickSize = 5;
    webgazer.params.stablizeOutlier = false;
    webgazer.params.waitFramesCount = 1;
    document.getElementById('calibrationOverlay').style.display = 'none';
    document.getElementById('videoMonitor').style.display = 'flex';
    webgazer.setRegression('ridge')
        .setGazeListener((data, timestamp) => {
            // Во время баннера пишем координаты, в другое время отслеживаем кол-во взглядов на товары
            if (data && !AppState.experimentCompleted) {
                if (!AppState.gameActive && AppState.currentBannerType) {
                    AppState.bannerGazeData.push({ x: data.x, y: data.y, timestamp, bannerType: AppState.currentBannerType });
                    AppState.currentBannerGaze.push({ x: data.x, y: data.y });
                }
                if (AppState.gameActive) trackGazeOnProducts(data.x, data.y);
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
    AppState.gameActive = true;
    AppState.isCalibrating = false;
    initGame();
}

//инициализация игры
function initGame() {
    AppState.experimentCompleted = false;
    AppState.sessionId = 'session_' + Date.now();
    AppState.tasksDone = 0;
    AppState.cartCount = 0;
    AppState.gazeStats = {};
    AppState.emotionData = [];
    AppState.bannerMetrics = [];
    AppState.misClicks = 0;
    AppState.bannerGazeData = [];
    AppState.taskHeatmapScreenshots = new Array(tasks.length);
    AppState.currentTaskIndex = 0;
    AppState.taskProductsPurchased = [];
    document.getElementById('tasksDone').innerText = "0";
    document.getElementById('cartCount').innerText = "0";
    document.getElementById('gazeCount').innerText = "0";
    document.getElementById('totalTasks').innerText = tasks.length;
    renderProducts();
    loadTask(0);
    webgazer.resume();
    AppState.surveyAnswers = null;
}