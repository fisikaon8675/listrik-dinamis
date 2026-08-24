const uiLayer = document.getElementById('ui-layer');
const npcName = document.getElementById('npc-name');
const materiContent = document.getElementById('materi-content');
const challengeContent = document.getElementById('challenge-content');
const btnNext = document.getElementById('btn-next');
const btnClose = document.getElementById('btn-close');

function openModalOhm() {
    uiLayer.classList.remove('hidden');
    challengeContent.classList.add('hidden');
    materiContent.classList.remove('hidden');
    btnNext.classList.remove('hidden');
    
    npcName.innerText = "Post 1: Prof. Ohm";
    materiContent.innerHTML = `
        <h3>Hukum Ohm</h3>
        <p>Hukum Ohm menyatakan bahwa tegangan (V) dalam sebuah rangkaian berbanding lurus dengan arus (I) dan hambatan (R).</p>
        <p><strong>Rumus: V = I x R</strong></p>
    `;

    challengeContent.innerHTML = `
        <h3>Break the Code!</h3>
        <p>Arus (I) = 2 A, Hambatan (R) = 50 Ohm. Berapa Tegangan (V)?</p>
        <input type="number" id="answer-ohm" placeholder="Masukkan nilai V">
        <button onclick="checkOhmAnswer()">Buka Kunci</button>
        <p id="feedback"></p>
    `;
}

btnNext.addEventListener('click', () => {
    materiContent.classList.add('hidden');
    challengeContent.classList.remove('hidden');
    btnNext.classList.add('hidden');
});

btnClose.addEventListener('click', () => {
    uiLayer.classList.add('hidden');
});

// Fungsi untuk mengecek jawaban dari HTML yang di-inject
window.checkOhmAnswer = function() {
    const answer = document.getElementById('answer-ohm').value;
    const feedback = document.getElementById('feedback');
    if (answer == 100) {
        feedback.style.color = "green";
        feedback.innerText = "Benar! Brankas Terbuka. Kamu mendapatkan Item: Resistor Emas!";
        setTimeout(() => uiLayer.classList.add('hidden'), 2000);
    } else {
        feedback.style.color = "red";
        feedback.innerText = "Salah! Ingat rumusnya: V = I x R.";
    }
}
