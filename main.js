// ========== ТОЧКА ВХОДА ==========
// Зависимости: все предыдущие модули

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('calibrationOverlay').style.display='none';
    document.getElementById('registerNameOverlay').style.display = 'flex';

    document.getElementById('nameSubmitBtn').addEventListener('click', ()=>{
        const input = document.getElementById('usernameInput');
        const name = input.value.trim();
        if(name === ''){
            alert('Введите имя пользователя');
            return;
        }
        AppState.userName = name;
        document.getElementById('registerNameOverlay').style.display = 'none';
        document.getElementById('registerConsentOverlay').style.display = 'flex';
    });

    document.getElementById('consentSubmitBtn').addEventListener('click', ()=>{
        const checkbox = document.getElementById('consentCheckbox');
        if(!checkbox.checked){
            alert('Вы должны дать согласие на участие');
            return;
        }
        document.getElementById('registerConsentOverlay').style.display='none';
        startCalibration();
    });

    initFilters();
    document.getElementById('resetGameBtn')?.addEventListener('click', resetGame);
    document.getElementById('exportResultsBtn')?.addEventListener('click', exportResultsAsZip);
});