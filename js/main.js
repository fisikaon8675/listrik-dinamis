// Inisialisasi Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Langit biru

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Tambahkan Pencahayaan
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Buat Lantai (Ground)
const planeGeo = new THREE.PlaneGeometry(50, 50);
const planeMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Buat Pemain (Player)
const playerGeo = new THREE.BoxGeometry(1, 1, 1);
const playerMat = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const player = new THREE.Mesh(playerGeo, playerMat);
player.position.y = 0.5;
scene.add(player);

// Buat NPC / Post 1 (Hukum Ohm)
const npcGeo = new THREE.BoxGeometry(1.5, 2, 1.5);
const npcMat = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const npc1 = new THREE.Mesh(npcGeo, npcMat);
npc1.position.set(5, 1, -5);
scene.add(npc1);

// Posisi Kamera mengikuti pemain
camera.position.set(0, 5, 10);
camera.lookAt(player.position);

// Kontrol Pergerakan
const keys = { w: false, a: false, s: false, d: false };
document.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

// Interaksi dengan "E"
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e') {
        const distance = player.position.distanceTo(npc1.position);
        if (distance < 3) {
            // Panggil fungsi UI dari ui.js
            openModalOhm(); 
        }
    }
});

function animate() {
    requestAnimationFrame(animate);

    // Logika gerak sederhana
    const speed = 0.1;
    if (keys.w) player.position.z -= speed;
    if (keys.s) player.position.z += speed;
    if (keys.a) player.position.x -= speed;
    if (keys.d) player.position.x += speed;

    // Update kamera
    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 10;

    renderer.render(scene, camera);
}
animate();
