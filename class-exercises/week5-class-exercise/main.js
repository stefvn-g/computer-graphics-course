import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(
    -1*aspect,
    1*aspect,
    1,
    -1,
    0.01,
    100
);
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry( 0.5, 32, 16 ); 
const material = new THREE.MeshPhongMaterial( { color: 0xc41d25, wireframe: true } ); 
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