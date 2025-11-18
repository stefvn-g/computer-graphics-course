import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('textures/Stylized_Wood_Floor_001_basecolor.png');
const sphereTexture = textureLoader.load('textures/Stylized_Stone_Floor_010_height.png');

const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    material
);
cube.position.x = -1.5;
scene.add(cube);

texture.wrapS = THREE.RepeatWrapping; // horizontal wrapping
texture.wrapT = THREE.RepeatWrapping; // vertical wrapping
texture.repeat.set(4, 4);

const sphereMaterial = new THREE.MeshBasicMaterial({ map: sphereTexture });
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 32, 32),
    sphereMaterial
);
sphere.position.x = 1.5;
scene.add(sphere);

sphereTexture.wrapS = THREE.RepeatWrapping;
sphereTexture.wrapT = THREE.RepeatWrapping;
sphereTexture.repeat.set(5, 5);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();