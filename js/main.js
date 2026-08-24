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
scene.add(new THREE.AmbientLight(0x606060)); // Cahaya merata

// ==========================================
// 3. MEMBUAT LINGKUNGAN YANG KAYA
// ==========================================
// Lantai Rumput
const planeGeo = new THREE.PlaneGeometry(100, 100);
const planeMat = new THREE.MeshStandardMaterial({ color: 0x228B22 }); 
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Membuat Jalan Utama (Aspal) membentang ke depan
const roadGeo = new THREE.PlaneGeometry(8, 60);
const roadMat = new THREE.MeshStandardMaterial({ color: 0x333333 }); 
const road = new THREE.Mesh(roadGeo, roadMat);
road.rotation.x = -Math.PI / 2;
road.position.set(0, 0.05, -15); // Sedikit di atas rumput agar tidak glitch
scene.add(road);

// Fungsi Pembuat Pohon Sederhana
function createTree(x, z) {
    const tree = new THREE.Group();
    
    // Batang pohon
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 2);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); 
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1;
    tree.add(trunk);
    
    // Daun pohon
    const leavesGeo = new THREE.ConeGeometry(2, 4, 8);
    const leavesMat = new THREE.MeshStandardMaterial({ color: 0x006400 }); 
    const leaves = new THREE.Mesh(leavesGeo, leavesMat);
    leaves.position.y = 3.5;
    tree.add(leaves);
    
    tree.position.set(x, 0, z);
    scene.add(tree);
}

// Menanam pohon di pinggir jalan
createTree(5, -2);
createTree(-5, -6);
createTree(6, -10);
createTree(-6, -15);
createTree(5, -25);
createTree(-5, -30);

// Fungsi Pembuat Bangunan Lab di Latar Belakang
function createBuilding(x, z, width, height, depth, colorHex) {
    const buildGeo = new THREE.BoxGeometry(width, height, depth);
    const buildMat = new THREE.MeshStandardMaterial({ color: colorHex });
    const building = new THREE.Mesh(buildGeo, buildMat);
    building.position.set(x, height / 2, z);
    scene.add(building);
}

// Membangun beberapa gedung di kejauhan
createBuilding(-15, -20, 10, 15, 10, 0x555555); 
createBuilding(15, -25, 8, 10, 8, 0x888888);  

// ==========================================
// 4. PEMAIN, NPC & LOADER MODEL 3D
// ==========================================
// Inisialisasi GLTFLoader (untuk memuat aset .glb jika ada nanti)
const loader = new THREE.GLTFLoader();

// --- PEMAIN (Menggunakan sistem Hitbox) ---
const playerGeo = new THREE.BoxGeometry(1, 2, 1);
const playerMat = new THREE.MeshBasicMaterial({ visible: false }); // Hitbox disembunyikan
const player = new THREE.Mesh(playerGeo, playerMat);
player.position.set(0, 1, 5); // Posisi awal (start)
scene.add(player);

// Visual Fallback untuk pemain (Kotak Biru) - Hapus bagian ini jika sudah pakai model 3D nyata
const fallbackPlayerMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshStandardMaterial({color: 0x0000ff}));
player.add(fallbackPlayerMesh); 


// CONTOH CARA MEMASUKKAN MODEL 3D PEMAIN (Hapus tanda komentar jika punya asetnya)
loader.load('assets/player.glb', function(gltf) {
    const model = gltf.scene;
    model.scale.set(1, 1, 1); 
    model.position.y = -1; 
    player.add(model); 
    player.remove(fallbackPlayerMesh); // Hapus kotak biru saat model berhasil dimuat
});

// Fungsi Helper untuk Membuat NPC
function createNPC(x, z, fallbackColor, modelPath = null) {
    // Buat hitbox transparan
    const npcHitbox = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 2, 1.5),
        new THREE.MeshBasicMaterial({ visible: false }) 
    );
    npcHitbox.position.set(x, 1, z);
    scene.add(npcHitbox);

    if (modelPath) {
        // Load model 3D jika path tersedia
        loader.load(modelPath, function(gltf) {
            const model = gltf.scene;
            model.scale.set(1, 1, 1);
            model.position.y = -1;
            npcHitbox.add(model);
        });
    } else {
        // Visual kotak sementara jika belum ada model 3D
        const visual = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2, 1.5), new THREE.MeshStandardMaterial({color: fallbackColor}));
        npcHitbox.add(visual);
    }
    
    return npcHitbox;
}

// Buat ke-3 NPC di lokasi yang berbeda di sepanjang jalan
const npc1 = createNPC(4, -5, 0xffff00, 'npc1.glb');  // Post 1: Kuning
const npc2 = createNPC(-4, -15, 0x00ff00, 'npc2.glb'); // Post 2: Hijau
const npc3 = createNPC(4, -25, 0xff0000, 'npc3.glb');  // Post 3: Merah

// --- GENERATOR UTAMA (Garis Finish) ---
const genGeo = new THREE.CylinderGeometry(2, 2, 4, 32); 
const genMat = new THREE.MeshStandardMaterial({ color: 0x00ffff }); // Warna biru menyala (Cyan)
const mainGenerator = new THREE.Mesh(genGeo, genMat);
mainGenerator.position.set(0, 2, -35); // Di ujung jalan
scene.add(mainGenerator);

// Mengatur Posisi Awal Kamera
camera.position.set(0, 5, 10);
camera.lookAt(player.position);

// ==========================================
// 5. KONTROL DAN INTERAKSI
// ==========================================
const keys = { w: false, a: false, s: false, d: false };

document.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e') {
        const uiLayer = document.getElementById('ui-layer');
        
        // Jangan eksekusi jika ada pop-up UI terbuka
        if (!uiLayer.classList.contains('hidden')) return;

        // Cek jarak pemain ke NPC dan Generator
        const distToNpc1 = player.position.distanceTo(npc1.position);
        const distToNpc2 = player.position.distanceTo(npc2.position);
        const distToNpc3 = player.position.distanceTo(npc3.position);
        const distToGen = player.position.distanceTo(mainGenerator.position); 
        
        // Panggil fungsi UI berdasarkan jarak terdekat (radius < 3)
        if (distToNpc1 < 3) {
            openModalOhm();
        } else if (distToNpc2 < 3) {
            openModalKirchhoff();
        } else if (distToNpc3 < 3) {
            openModalJoule();
        } else if (distToGen < 4) { // Area interaksi generator lebih luas
            openModalGenerator();
        }
    }
});

// Sesuaikan render saat layar di-resize
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

    // Kecepatan jalan pemain
    const speed = 0.15;
    
    // Pergerakan WASD
    if (keys.w) player.position.z -= speed;
    if (keys.s) player.position.z += speed;
    if (keys.a) player.position.x -= speed;
    if (keys.d) player.position.x += speed;

    // Kamera mengikuti dari belakang atas pemain
    camera.position.x = player.position.x;
    camera.position.y = player.position.y + 4;
    camera.position.z = player.position.z + 8;
    camera.lookAt(player.position);

    renderer.render(scene, camera);
}

// Mulai permainan
animate();
