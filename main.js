import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({color: 0xD22B2B});
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

/* const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({color: 0x2B8AD2})
);
scene.add(cube2);
*/

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

// Moving objects: x, y, z
// cube.position.x = 0.7;
// cube.position.y = -0.6;
// cube.position.z = 0.5;

// cube.position.set(0.7, -0.6, 0.5); // same as above

// console.log(cube.position.distanceTo(camera.position));

// Axes Helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper); // y - green, x - red, z - blue (hidden - aligned with camera at 0,0)

// Scaling objects: x, y, z
// cube.scale.x = 2;
// cube.scale.y = 0.25;
// cube.scale.z = 0.5;

// Rotation: x, y, z
// cube.rotation.x = Math.PI * 0.25;
// cube.rotation.y = Math.PI * 0.25;

// Combining transformations
// cube.position.set(0.5, -0.25, 0.5);
// cube.scale.set(2, 0.25, 0.5);
// cube.rotation.set(Math.PI * 0.1, Math.PI * 0.25, 0);

// cube2.position.set(-0.5, 0.5, -2);
// cube2.scale.set(1.1,1.1,1.1);
// cube2.rotation.set(Math.PI * 0.1, Math.PI * 0.25, 0);

// Group
const group = new THREE.Group();
group.scale.y = 1.25;
group.rotation.x = -1;
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0xD22B2B})
);
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0x2B8AD2})
);
cube2.position.x = 0;
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0x2BD26B})
);
cube3.position.x = 1.5;
group.add(cube3);

group.position.y = 1;
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();