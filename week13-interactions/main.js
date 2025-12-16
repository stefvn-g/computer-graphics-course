import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 15;
camera.position.y = 5;

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const info = document.createElement('div');
info.style.position = 'absolute';
info.style.top = '10px';
info.style.left = '10px';
info.style.color = 'white';
info.style.backgroundColor = 'rgba(0,0,0,0.7)';
info.style.padding = '15px';
info.style.fontFamily = 'Arial';
info.innerHTML = 'Click a cube to see its information here.';
document.body.appendChild(info);

const cubes = [];
for (let i = 0; i < 20; i++) {
    const width = Math.random() * 2 + 0.5;
    const height = Math.random() * 2 + 0.5;
    const depth = Math.random() * 2 + 0.5;
    
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff
    });
    const cube = new THREE.Mesh(geometry, material);
    
    cube.position.x = (Math.random() - 0.5) * 20;
    cube.position.y = (Math.random() - 0.5) * 10;
    cube.position.z = (Math.random() - 0.5) * 20;
    
    cube.userData.width = width;
    cube.userData.height = height;
    cube.userData.depth = depth;
    cube.userData.originalColor = material.color.clone();
    cube.userData.originalScale = new THREE.Vector3(1, 1, 1);
    
    scene.add(cube);
    cubes.push(cube);
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selected = null;
let animationProgress = 0;

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);
    
    if (selected) {
        selected.material.color.copy(selected.userData.originalColor);
        selected.scale.copy(selected.userData.originalScale);
    }
    
    if (intersects.length > 0) {
        selected = intersects[0].object;
        selected.material.color.set(0xffff00);
        animationProgress = 0;
        
        const pos = selected.position;
        
        info.innerHTML = `Position: (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)})<br>
                          Size: ${selected.userData.width.toFixed(2)} x ${selected.userData.height.toFixed(2)} x ${selected.userData.depth.toFixed(2)}`;
    } else {
        selected = null;
        info.innerHTML = 'No object selected. Click a cube to see its information here.';
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    
    if (selected && animationProgress < 1) {
        animationProgress += 0.05;
        const scale = 1 + Math.sin(animationProgress * Math.PI) * 0.2;
        selected.scale.set(scale, scale, scale);
    }
    
    renderer.render(scene, camera);
}
animate();