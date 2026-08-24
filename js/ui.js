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

// Membuat Jalan Utama (Aspal)
const roadGeo = new THREE.PlaneGeometry(8, 60);
const roadMat = new THREE.MeshStandardMaterial({ color: 0x333333 }); 
const road = new THREE.Mesh(roadGeo, roadMat);
road.rotation.x = -Math.PI / 2;
road.position.set(0, 0.05, -15); 
scene.add(road);

// Fungsi Pembuat Pohon 
function createTree(x, z) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 2), new THREE.MeshStandardMaterial({ color: 0x8B4513 }));
    trunk.position.y = 1;
    tree.add(trunk);
    const leaves = new THREE.Mesh(new THREE.ConeGeometry(2, 4, 8), new THREE.MeshStandardMaterial({ color: 0x006400 }));
    leaves.position.y = 3.5;
    tree.add(leaves);
    tree.position.set(x, 0, z);
    scene.add(tree);
}

// Menanam pohon
createTree(5, -2);
createTree(-5, -6);
createTree(6, -10);
createTree(-6, -15);
createTree(5, -25);
createTree(-5, -30);

// Fungsi Pembuat Bangunan Lab
function createBuilding(x, z, width, height, depth, colorHex) {
    const building = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshStandardMaterial({ color: colorHex }));
    building.position.set(x, height / 2, z);
    scene.add(building);
}

createBuilding(-15, -20, 10, 15, 10, 0x555555); 
createBuilding(15, -25, 8, 10, 8, 0x888888);  

// ==========================================
// 4. PEMAIN, NPC & LOADER MODEL 3D
// ==========================================
const loader = new THREE.GLTFLoader();

// --- PEMAIN ---
const playerGeo = new THREE.BoxGeometry(1, 2, 1);
const playerMat = new THREE.MeshBasicMaterial({ visible: false }); // Hitbox
const player = new THREE.Mesh(playerGeo, playerMat);
player.position.set(0, 1, 5); 
scene.add(player);

// Selalu tambahkan kotak biru sebagai visual cadangan
const fallbackPlayerMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshStandardMaterial({color: 0x0000ff}));
player.add(fallbackPlayerMesh); 

// Coba muat model 3D (Akan diabaikan tanpa error mencolok jika file tidak ada)
loader.load(
    'assets/player.glb', 
    function(gltf) {
        const model = gltf.scene;
        model.scale.set(1, 1, 1); 
        model.position.y = -1; 
        player.add(model); 
        player.remove(fallbackPlayerMesh); // Hapus kotak biru jika berhasil
    },
    undefined,
    function(error) { console.warn("Model player.glb tidak ditemukan, menggunakan kotak biru."); }
);

// --- FUNGSI NPC ANTI-ERROR ---
function createNPC(x, z, fallbackColor, modelPath) {
    const npcHitbox = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 2, 1.5),
        new THREE.MeshBasicMaterial({ visible: false }) 
    );
    npcHitbox.position.set(x, 1, z);
    scene.add(npcHitbox);

    // Selalu tambahkan kotak warna sebagai visual cadangan
    const visual = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2, 1.5), new THREE.MeshStandardMaterial({color: fallbackColor}));
    npcHitbox.add(visual);

    // Coba muat model 3D
    loader.load(
        modelPath, 
        function(gltf) {
            const model = gltf.scene;
            model.scale.set(1, 1, 1);
            model.position.y = -1;
            npcHitbox.add(model);
            npcHitbox.remove(visual); // Hapus kotak jika model berhasil dimuat
        },
        undefined,
        function(error) { console.warn("Model " + modelPath + " tidak ditemukan, menggunakan kotak warna."); }
    );
    
    return npcHitbox;
}

// Buat NPC
const npc1 = createNPC(4, -5, 0xffff00, 'assets/npc1.glb');  
const npc2 = createNPC(-4, -15, 0x00ff00, 'assets/npc2.glb'); 
const npc3 = createNPC(4, -25, 0xff0000, 'assets/npc3.glb');  

// --- GENERATOR UTAMA ---
const genGeo = new THREE.CylinderGeometry(2, 2, 4, 32); 
const genMat = new THREE.MeshStandardMaterial({ color: 0x00ffff }); 
const mainGenerator = new THREE.Mesh(genGeo, genMat);
mainGenerator.position.set(0, 2, -35); 
scene.add(mainGenerator);

// Kamera Awal
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
        if (!uiLayer.classList.contains('hidden')) return;

        const distToNpc1 = player.position.distanceTo(npc1.position);
        const distToNpc2 = player.position.distanceTo(npc2.position);
        const distToNpc3 = player.position.distanceTo(npc3.position);
        const distToGen = player.position.distanceTo(mainGenerator.position); 
        
        if (distToNpc1 < 3) openModalOhm();
        else if (distToNpc2 < 3) openModalKirchhoff();
        else if (distToNpc3 < 3) openModalJoule();
        else if (distToGen < 4) openModalGenerator();
    }
});

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

    const speed = 0.15;
    
    if (keys.w) player.position.z -= speed;
    if (keys.s) player.position.z += speed;
    if (keys.a) player.position.x -= speed;
    if (keys.d) player.position.x += speed;

    camera.position.x = player.position.x;
    camera.position.y = player.position.y + 4;
    camera.position.z = player.position.z + 8;
    camera.lookAt(player.position);

    renderer.render(scene, camera);
}

animate();
