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
// --- Tambahkan di bagian bawah js/ui.js ---

function openModalKirchhoff() {
    uiLayer.classList.remove('hidden');
    challengeContent.classList.add('hidden');
    materiContent.classList.remove('hidden');
    btnNext.classList.remove('hidden');
    
    npcName.innerText = "Post 2: Teknisi Kirchhoff";
    materiContent.innerHTML = `
        <h3>Rangkaian Seri & Paralel</h3>
        <p><strong>Seri:</strong> Arus yang mengalir sama di setiap titik. Hambatan total bertambah panjang (R = R1 + R2).</p>
        <p><strong>Paralel:</strong> Tegangan sama di setiap cabang. Hambatan total mengecil (1/R = 1/R1 + 1/R2).</p>
    `;

    // Kita menyuntikkan HTML Grid ke dalam challengeContent
    challengeContent.innerHTML = `
        <h3>Teka-Teki Silang Listrik</h3>
        <div class="tts-container">
            <div class="tts-clues">
                <p><strong>1 Mendatar:</strong> Rangkaian yang arusnya sama di setiap komponennya.</p>
                <p><strong>2 Menurun:</strong> Rangkaian yang tegangannya sama di setiap cabangnya.</p>
            </div>
            
            <!-- Grid TTS -->
            <div class="tts-grid">
                <!-- Baris 1 -->
                <div class="tts-empty"></div><div class="tts-empty"></div><input type="text" id="c-0-2" maxlength="1"><div class="tts-empty"></div>
                <!-- Baris 2 -->
                <div class="tts-empty"></div><div class="tts-empty"></div><input type="text" id="c-1-2" maxlength="1"><div class="tts-empty"></div>
                <!-- Baris 3 (SERI bersilangan dengan P-A-R-A-L-E-L) -->
                <input type="text" id="c-2-0" maxlength="1"><input type="text" id="c-2-1" maxlength="1"><input type="text" id="c-2-2" maxlength="1"><input type="text" id="c-2-3" maxlength="1">
                <!-- Baris 4 -->
                <div class="tts-empty"></div><div class="tts-empty"></div><input type="text" id="c-3-2" maxlength="1"><div class="tts-empty"></div>
                <!-- Baris 5 -->
                <div class="tts-empty"></div><div class="tts-empty"></div><input type="text" id="c-4-2" maxlength="1"><div class="tts-empty"></div>
                <!-- Baris 6 -->
                <div class="tts-empty"></div><div class="tts-empty"></div><input type="text" id="c-5-2" maxlength="1"><div class="tts-empty"></div>
                <!-- Baris 7 -->
                <div class="tts-empty"></div><div class="tts-empty"></div><input type="text" id="c-6-2" maxlength="1"><div class="tts-empty"></div>
            </div>
        </div>
        <button onclick="checkTTS()">Cek Jawaban</button>
        <p id="tts-feedback"></p>
    `;
}

window.checkTTS = function() {
    // Definisi Kunci Jawaban (menggunakan ID kotak)
    const kunciJawaban = {
        'c-0-2': 'P', 'c-1-2': 'A', 
        'c-2-0': 'S', 'c-2-1': 'E', 'c-2-2': 'R', 'c-2-3': 'I', 
        'c-3-2': 'A', 'c-4-2': 'L', 'c-5-2': 'E', 'c-6-2': 'L'
    };
    
    let benarSemua = true;
    
    // Periksa setiap kotak input
    for (let id in kunciJawaban) {
        // Ambil nilai dan pastikan diubah ke huruf besar untuk dibandingkan
        let nilaiInput = document.getElementById(id).value.toUpperCase();
        if (nilaiInput !== kunciJawaban[id]) {
            benarSemua = false;
            break; // Jika ada 1 yang salah, langsung hentikan pengecekan
        }
    }
    
    const feedback = document.getElementById('tts-feedback');
    if (benarSemua) {
        feedback.style.color = "green";
        feedback.innerText = "Luar biasa! Teka-teki berhasil dipecahkan. Mendapat Item: Baterai Paralel!";
        setTimeout(() => uiLayer.classList.add('hidden'), 3000);
    } else {
        feedback.style.color = "red";
        feedback.innerText = "Masih ada yang salah atau kosong. Coba lagi!";
    }
}
