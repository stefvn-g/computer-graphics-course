import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const group = new THREE.Group();
group.rotation.x = 0.5;
scene.add(group);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshLambertMaterial({color: 0xD22B2B})
);
sphere.position.x = -1.5;
group.add(sphere);

const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
    new THREE.MeshLambertMaterial({color: 0x2B8AD2})
);
group.add(cylinder);

const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 32),
    new THREE.MeshLambertMaterial({color: 0x2BD26D})
);
cone.position.x = 1.5;
group.add(cone);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();