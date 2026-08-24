// ==========================================
// 1. SETUP SCENE, CAMERA, DAN RENDERER
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Warna langit biru

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// ==========================================
// 2. PENCAHAYAAN (LIGHTING)
// ==========================================
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040)); // Cahaya merata

// ==========================================
// 3. MEMBUAT LINGKUNGAN (GROUND)
// ==========================================
const planeGeo = new THREE.PlaneGeometry(50, 50);
const planeMat = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // Warna rumput hijau
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -Math.PI / 2; // Memutar lantai agar mendatar
scene.add(plane);

// ==========================================
// 4. MEMBUAT PEMAIN & NPC
// ==========================================
// Pemain (Kotak Biru)
const playerGeo = new THREE.BoxGeometry(1, 1, 1);
const playerMat = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const player = new THREE.Mesh(playerGeo, playerMat);
player.position.y = 0.5;
scene.add(player);

// Geometri dasar untuk semua NPC
const npcGeo = new THREE.BoxGeometry(1.5, 2, 1.5);

// Post 1: NPC Prof. Ohm (Kotak Kuning)
const npc1Mat = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const npc1 = new THREE.Mesh(npcGeo, npc1Mat);
npc1.position.set(5, 1, -5);
scene.add(npc1);

// Post 2: NPC Teknisi Kirchhoff (Kotak Hijau)
const npc2Mat = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const npc2 = new THREE.Mesh(npcGeo, npc2Mat);
npc2.position.set(-5, 1, -5);
scene.add(npc2);

// Post 3: NPC Dr. Joule (Kotak Merah)
const npc3Mat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const npc3 = new THREE.Mesh(npcGeo, npc3Mat);
npc3.position.set(0, 1, -12);
scene.add(npc3);

// Mengatur Posisi Awal Kamera
camera.position.set(0, 5, 10);
camera.lookAt(player.position);

// ==========================================
// 5. KONTROL DAN INTERAKSI
// ==========================================
const keys = { w: false, a: false, s: false, d: false };

// Deteksi tombol keyboard ditekan
document.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

// Deteksi interaksi khusus saat tombol "E" ditekan
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e') {
        const uiLayer = document.getElementById('ui-layer');
        
        // Mencegah tombol 'E' memicu sesuatu jika UI popup sedang terbuka
        if (!uiLayer.classList.contains('hidden')) return;

        // Hitung jarak pemain ke masing-masing NPC
        const distToNpc1 = player.position.distanceTo(npc1.position);
        const distToNpc2 = player.position.distanceTo(npc2.position);
        const distToNpc3 = player.position.distanceTo(npc3.position);
        
        // Buka UI yang sesuai jika pemain cukup dekat (jarak < 3)
        if (distToNpc1 < 3) {
            openModalOhm();
        } else if (distToNpc2 < 3) {
            openModalKirchhoff();
        } else if (distToNpc3 < 3) {
            openModalJoule();
        }
    }
});

// Update ukuran render jika jendela browser di-resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// ==========================================
// 6. GAME LOOP (ANIMASI)
// ==========================================
function animate() {
    requestAnimationFrame(animate);

    // Logika Pergerakan (WASD)
    const speed = 0.1;
    if (keys.w) player.position.z -= speed;
    if (keys.s) player.position.z += speed;
    if (keys.a) player.position.x -= speed;
    if (keys.d) player.position.x += speed;

    // Kamera selalu mengikuti pemain
    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 10;

    // Render ulang layar terus-menerus
    renderer.render(scene, camera);
}

// Mulai loop animasi
animate();
