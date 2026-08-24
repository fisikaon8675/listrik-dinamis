window.gameState = {
    punyaResistor: false, punyaBaterai: false, punyaInti: false
};

const uiLayer = document.getElementById('ui-layer');
const npcName = document.getElementById('npc-name');
const materiContent = document.getElementById('materi-content');
const challengeContent = document.getElementById('challenge-content');
const btnNext = document.getElementById('btn-next');
const btnClose = document.getElementById('btn-close');

btnNext.addEventListener('click', () => {
    materiContent.classList.add('hidden');
    challengeContent.classList.remove('hidden');
    btnNext.classList.add('hidden');
});

btnClose.addEventListener('click', () => {
    uiLayer.classList.add('hidden');
});

window.openModalOhm = function() {
    uiLayer.classList.remove('hidden');
    challengeContent.classList.add('hidden');
    materiContent.classList.remove('hidden');
    btnNext.classList.remove('hidden');
    npcName.innerText = "Post 1: Prof. Ohm";
    materiContent.innerHTML = `<h3>Hukum Ohm</h3><p>V = I x R</p>`;
    challengeContent.innerHTML = `
        <h3>Break the Code!</h3>
        <p>I = 2 A, R = 50 Ohm. V?</p>
        <input type="number" id="answer-ohm">
        <button onclick="checkOhmAnswer()">Buka</button>
        <p id="feedback-ohm"></p>
    `;
}

window.checkOhmAnswer = function() {
    const answer = document.getElementById('answer-ohm').value;
    const feedback = document.getElementById('feedback-ohm');
    if (answer === "100") {
        feedback.style.color = "green"; feedback.innerText = "Benar!";
        window.gameState.punyaResistor = true;
        setTimeout(() => uiLayer.classList.add('hidden'), 2000);
    } else {
        feedback.style.color = "red"; feedback.innerText = "Salah!";
    }
}

window.openModalKirchhoff = function() {
    uiLayer.classList.remove('hidden');
    challengeContent.classList.add('hidden');
    materiContent.classList.remove('hidden');
    btnNext.classList.remove('hidden');
    npcName.innerText = "Post 2: Teknisi Kirchhoff";
    materiContent.innerHTML = `<h3>Rangkaian Seri & Paralel</h3>`;
    challengeContent.innerHTML = `<p>Anggap kuis berhasil dijawab!</p><button onclick="checkTTS()">Selesai</button><p id="tts-feedback"></p>`;
}

window.checkTTS = function() {
    document.getElementById('tts-feedback').innerText = "Benar! Dapat Baterai.";
    window.gameState.punyaBaterai = true;
    setTimeout(() => uiLayer.classList.add('hidden'), 2000);
}

window.openModalJoule = function() {
    uiLayer.classList.remove('hidden');
    challengeContent.classList.add('hidden');
    materiContent.classList.remove('hidden');
    btnNext.classList.remove('hidden');
    npcName.innerText = "Post 3: Dr. Joule";
    materiContent.innerHTML = `<h3>Daya & Energi</h3>`;
    challengeContent.innerHTML = `<p>Anggap kuis berhasil dijawab!</p><button onclick="checkJouleAnswer()">Selesai</button><p id="joule-feedback"></p>`;
}

window.checkJouleAnswer = function() {
    document.getElementById('joule-feedback').innerText = "Benar! Dapat Inti Generator.";
    window.gameState.punyaInti = true;
    setTimeout(() => uiLayer.classList.add('hidden'), 2000);
}

window.openModalGenerator = function() {
    uiLayer.classList.remove('hidden');
    challengeContent.classList.add('hidden');
    materiContent.classList.remove('hidden');
    btnNext.classList.add('hidden');
    npcName.innerText = "Generator Utama";
    if (window.gameState.punyaResistor && window.gameState.punyaBaterai && window.gameState.punyaInti) {
        materiContent.innerHTML = `<h3 style="color:green;">🎉 MISI BERHASIL! Generator Menyala!</h3>`;
    } else {
        materiContent.innerHTML = `<h3 style="color:red;">⚠️ Akses Ditolak! Kumpulkan semua item.</h3>`;
    }
}
