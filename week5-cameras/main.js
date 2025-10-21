import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const sizes = {
    width: 800,
    height: 600
}

const cursor = {x:0, y:0}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY/sizes.height - 0.5)
});

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
);
scene.add(mesh);

// const perspectiveCamera = new THREE.PerspectiveCamera(
//     75, // FOV
//     sizes.width/sizes.height, // Aspect Ratio
//     0.01, // Near Clipping Plane
//     100 // Far Clipping Plane
// );

// perspectiveCamera.position.z = 3;
// scene.add(perspectiveCamera);

const aspectRatio = sizes.width / sizes.height;
const orthographicCamera = new THREE.OrthographicCamera(
    -1*aspectRatio, // left
    1*aspectRatio, // right
    1, // top
    -1, // bottom
    0.01, // near
    100 // far
);
orthographicCamera.position.z = 3;
scene.add(orthographicCamera);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(orthographicCamera, renderer.domElement);
controls.enableDamping = true;

const animate = () => {
    renderer.render(scene, orthographicCamera);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    perspectiveCamera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);
});