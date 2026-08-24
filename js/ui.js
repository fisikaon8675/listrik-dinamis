// ==========================================
// STATUS GAME (INVENTARIS PEMAIN)
// ==========================================
window.gameState = {
    punyaResistor: false,
    punyaBaterai: false,
    punyaInti: false
};

// ==========================================
// 1. INISIALISASI ELEMEN HTML
// ==========================================
const uiLayer = document.getElementById('ui-layer');
const npcName = document.getElementById('npc-name');
const materiContent = document.getElementById('materi-content');
const challengeContent = document.getElementById('challenge-content');
const btnNext = document.getElementById('btn-next');
const btnClose = document.getElementById('btn-close');

// Event listener untuk tombol Lanjut dan Tutup
btnNext.addEventListener('click', () => {
    materiContent.classList.add('hidden');
    challengeContent.classList.remove('hidden');
    btnNext.classList.add('hidden');
});

btnClose.addEventListener('click', () => {
    uiLayer.classList.add('hidden');
});

// ==========================================
// 2. LOGIKA NPC 1: PROF. OHM (BREAK CODE)
// ==========================================
window.openModalOhm = function() {
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
        <p>Sebuah rangkaian memiliki Arus (I) = 2 A, dan Hambatan (R) = 50 Ohm. Berapa Tegangan (V) yang dibutuhkan untuk membuka brankas ini?</p>
        <input type="number" id="answer-ohm" placeholder="Masukkan nilai V">
        <button onclick="checkOhmAnswer()">Buka Kunci</button>
        <p id="feedback-ohm"></p>
    `;
}

window.checkOhmAnswer = function() {
    const answer = document.getElementById('answer-ohm').value;
    const feedback = document.getElementById('feedback-ohm');
    
    if (answer === "100") {
        feedback.style.color = "green";
        feedback.innerText = "Benar! Brankas Terbuka. Kamu mendapatkan Item: Resistor Emas!";
        window.gameState.punyaResistor = true; // Simpan ke inventaris
        setTimeout(() => uiLayer.classList.add('hidden'), 2500);
    } else {
        feedback.style.color = "red";
        feedback.innerText = "Salah! Ingat rumusnya: V = I x R.";
    }
}

// ==========================================
// 3. LOGIKA NPC 2: TEKNISI KIRCHHOFF (TTS)
// ==========================================
window.openModalKirchhoff = function() {
    uiLayer.classList.remove('hidden');
    challengeContent.classList.add('hidden');
    materiContent.classList.remove('hidden');
    btnNext.classList.remove('hidden');
    
    npcName.innerText = "Post 2: Teknisi Kirchhoff";
    materiContent.innerHTML = `
        <h3>Rangkaian Seri & Paralel</h3>
        <p><strong>Seri:</strong> Arus yang mengalir sama di setiap titik. Hambatan total bertambah (R = R1 + R2).</p>
        <p><strong>Paralel:</strong> Tegangan sama di setiap cabang. Hambatan total mengecil (1/R = 1/R1 + 1/R2).</p>
    `;

    challengeContent.innerHTML = `
        <h3>Teka-Teki Silang Listrik</h3>
        <div class="tts-container">
            <div class="tts-clues">
                <p><strong>1 Mendatar:</strong> Rangkaian yang arusnya sama di setiap komponennya.</p>
                <p><strong>2 Menurun:</strong> Rangkaian yang tegangannya sama di setiap cabangnya.</p>
            </div>
            
            <div class="tts-grid">
                <!-- Baris 1 -->
                <div class="tts-empty"></div><div class="tts-empty"></div><input type="text" id="c-0-2" maxlength="1"><div class="tts-empty"></div>
                <!-- Baris 2 -->
                <div class="tts-empty"></div><div class="tts-empty"></div><input type="text" id="c-1-2" maxlength="1"><div class="tts-empty"></div>
                <!-- Baris 3 (SERI bersilangan P-A-R-A-L-E-L) -->
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
    const kunciJawaban = {
        'c-0-2': 'P', 'c-1-2': 'A', 
        'c-2-0': 'S', 'c-2-1': 'E', 'c-2-2': 'R', 'c-2-3': 'I', 
        'c-3-2': 'A', 'c-4-2': 'L', 'c-5-2': 'E', 'c-6-2': 'L'
    };
    
    let benarSemua = true;
    
    for (let id in kunciJawaban) {
        let inputEl = document.getElementById(id);
        if (!inputEl) continue; 
        
        let nilaiInput = inputEl.value.toUpperCase();
        if (nilaiInput !== kunciJawaban[id]) {
            benarSemua = false;
            break;
        }
    }
    
    const feedback = document.getElementById('tts-feedback');
    if (benarSemua) {
        feedback.style.color = "green";
        feedback.innerText = "Luar biasa! Teka-teki berhasil dipecahkan. Mendapat Item: Baterai Paralel!";
        window.gameState.punyaBaterai = true; // Simpan ke inventaris
        setTimeout(() => uiLayer.classList.add('hidden'), 3000);
    } else {
        feedback.style.color = "red";
        feedback.innerText = "Masih ada huruf yang salah atau kosong. Coba periksa lagi!";
    }
}

// ==========================================
// 4. LOGIKA NPC 3: DR. JOULE (PILIHAN GANDA)
// ==========================================
window.openModalJoule = function() {
    uiLayer.classList.remove('hidden');
    challengeContent.classList.add('hidden');
    materiContent.classList.remove('hidden');
    btnNext.classList.remove('hidden');
    
    npcName.innerText = "Post 3: Dr. Joule";
    materiContent.innerHTML = `
        <h3>Daya & Energi Listrik</h3>
        <p><strong>Daya (P):</strong> Laju energi listrik yang digunakan. Dirumuskan sebagai <strong>P = V x I</strong>.</p>
        <p><strong>Energi (W):</strong> Total daya yang digunakan selama waktu (t) tertentu. Dirumuskan sebagai <strong>W = P x t</strong>.</p>
    `;

    challengeContent.innerHTML = `
        <h3>Kuis Daya & Energi</h3>
        <p>Berapa energi yang digunakan oleh lampu <strong>10 Watt</strong> yang menyala selama <strong>60 detik</strong>?</p>
        
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:15px; text-align: left; padding: 10px;">
            <label><input type="radio" name="kuis-joule" value="10"> A) 10 Joule</label>
            <label><input type="radio" name="kuis-joule" value="60"> B) 60 Joule</label>
            <label><input type="radio" name="kuis-joule" value="600"> C) 600 Joule</label>
            <label><input type="radio" name="kuis-joule" value="6000"> D) 6000 Joule</label>
        </div>
        
        <button onclick="checkJouleAnswer()">Pilih Jawaban</button>
        <p id="joule-feedback"></p>
    `;
}

window.checkJouleAnswer = function() {
    const options = document.getElementsByName('kuis-joule');
    let selectedValue = null;
    
    for (const opt of options) {
        if (opt.checked) {
            selectedValue = opt.value;
            break;
        }
    }
    
    const feedback = document.getElementById('joule-feedback');
    
    if (!selectedValue) {
        feedback.style.color = "orange";
        feedback.innerText = "Silakan pilih salah satu jawaban terlebih dahulu!";
        return;
    }
    
    if (selectedValue === "600") {
        feedback.style.color = "green";
        feedback.innerText = "Tepat Sekali! W = P x t = 10 x 60 = 600 Joule. Mendapat Item: Generator Inti!";
        window.gameState.punyaInti = true; // Simpan ke inventaris
        setTimeout(() => uiLayer.classList.add('hidden'), 3000);
    } else {
        feedback.style.color = "red";
        feedback.innerText = "Jawaban kurang tepat. Ingat rumusnya: W = P x t.";
    }
}

// ==========================================
// 5. LOGIKA GENERATOR UTAMA (FINISH)
// ==========================================
window.openModalGenerator = function() {
    uiLayer.classList.remove('hidden');
    challengeContent.classList.add('hidden');
    materiContent.classList.remove('hidden');
    btnNext.classList.add('hidden'); // Sembunyikan tombol lanjut karena ini garis akhir
    
    npcName.innerText = "Generator Listrik Utama";
    
    // Mengecek apakah pemain sudah menyelesaikan ketiga tantangan
    if (window.gameState.punyaResistor && window.gameState.punyaBaterai && window.gameState.punyaInti) {
        materiContent.innerHTML = `
            <h3 style="color: green;">🎉 MISI BERHASIL! 🎉</h3>
            <p>Kamu telah memasukkan Resistor Emas, Baterai Paralel, dan Generator Inti ke dalam mesin.</p>
            <p><strong>Generator Utama berhasil menyala! Listrik kembali mengalir ke seluruh pulau!</strong></p>
            <p>Terima kasih telah bermain ElectroQuest 3D. Kamu sekarang adalah ahli Fisika Listrik Dinamis!</p>
        `;
    } else {
        materiContent.innerHTML = `
            <h3 style="color: red;">⚠️ Akses Ditolak! ⚠️</h3>
            <p>Generator ini kekurangan daya. Kamu harus mendatangi ke-3 Post NPC dan menyelesaikan tantangan mereka untuk mendapatkan komponen yang dibutuhkan!</p>
            <ul style="text-align: left; margin-top: 15px;">
                <li>${window.gameState.punyaResistor ? '✅' : '❌'} Resistor Emas (Post 1: Kotak Kuning)</li>
                <li>${window.gameState.punyaBaterai ? '✅' : '❌'} Baterai Paralel (Post 2: Kotak Hijau)</li>
                <li>${window.gameState.punyaInti ? '✅' : '❌'} Generator Inti (Post 3: Kotak Merah)</li>
            </ul>
        `;
    }
}
