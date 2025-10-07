import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
const material = new THREE.MeshPhongMaterial( { color: 0xc41d25 } ); 
const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    renderer.render(scene, camera);
}

animate();