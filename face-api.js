// ========== МОДУЛЬ FACE API ==========
// Зависимости: config.js (EMOTION_RECORD_INTERVAL), state.js (AppState)

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
                AppState.currentEmotion = dominant;
                const faceValues = document.getElementById('faceValues');
                if (faceValues) {
                    const emoji = getEmotionEmoji(dominant);
                    faceValues.innerHTML = `${emoji} ${dominant}: ${Math.round(expressions[dominant]*100)}%`;
                }
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