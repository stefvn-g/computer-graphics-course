import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x36454f);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xb2beb5 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2;
floor.receiveShadow = true;
scene.add(floor);

// Geometry 1: Cube with Phong material
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b6b });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-3, 0, 0);
cube.castShadow = true;
scene.add(cube);

// Geometry 2: Sphere with Standard material
const sphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x4ecdc4,
    metalness: 0.3,
    roughness: 0.4 
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0, 0);
sphere.castShadow = true;
scene.add(sphere);

// Geometry 3: Torus with Lambert material
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const torusMaterial = new THREE.MeshLambertMaterial({ color: 0xffe66d });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(3, 0, 0);
torus.castShadow = true;
scene.add(torus);

// Light 1: Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
scene.add(directionalLight);

// Light 2: Point light
const pointLight = new THREE.PointLight(0xff9ff3, 0.8, 100);
pointLight.position.set(-5, 3, 5);
pointLight.castShadow = true;
scene.add(pointLight);

// Light 3: Ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(ambientLight);

function animate() {
    requestAnimationFrame(animate);
    
    cube.rotation.x += 0.01;
    
    sphere.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    
    torus.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();