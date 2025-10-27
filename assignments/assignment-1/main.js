import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const cursor = {x:0, y:0}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY/sizes.height - 0.5)
});

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.01, 1000);
camera.position.set(0, 30, 25);
camera.lookAt(0, 0, 0);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Ground plane (campus ground)
const groundGeometry = new THREE.PlaneGeometry(40, 55);
const groundMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x2d5016, 
    side: THREE.DoubleSide 
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.set(0, 0, -3);
scene.add(ground);

// Asphalt road circle
const roadCircleGeometry = new THREE.CylinderGeometry(6, 6, 0.2, 32);
const roadCircleMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x3a3a3a,
    roughness: 0.8,
    metalness: 0.1
});
const roadCircle = new THREE.Mesh(roadCircleGeometry, roadCircleMaterial);
roadCircle.position.set(0, 0.05, 0);
scene.add(roadCircle);

// Asphalt roads from all 4 sides
const roadGeometry = new THREE.BoxGeometry(20, 0.1, 4);
const roadMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x3a3a3a,
    roughness: 0.8,
    metalness: 0.1
});
const road1 = new THREE.Mesh(roadGeometry, roadMaterial);
road1.position.set(10, 0.05, 0);
scene.add(road1);
const road2 = new THREE.Mesh(roadGeometry, roadMaterial);
road2.position.set(-10, 0.05, 0);
scene.add(road2);
const road3 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 20), roadMaterial);
road3.position.set(0, 0.05, 14.5);
scene.add(road3);
const road4 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 25), roadMaterial);
road4.position.set(0, 0.05, -18);
scene.add(road4);

// Roundabout curb
const roundaboutGeometry = new THREE.CylinderGeometry(4, 4, 0.2, 32);
const roundaboutMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xa8a8a8,
    shininess: 10
});
const roundabout = new THREE.Mesh(roundaboutGeometry, roundaboutMaterial);
roundabout.position.set(0, 0.1, 0);
scene.add(roundabout);

// Center decoration (grass circle in roundabout)
const centerCircleGeometry = new THREE.CylinderGeometry(2.5, 2.5, 0.3, 32);
const centerCircleMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x3a7d1a
});
const centerCircle = new THREE.Mesh(centerCircleGeometry, centerCircleMaterial);
centerCircle.position.set(0, 0.15, 0);
scene.add(centerCircle);

// Building 305
const building305Geometry = new THREE.BoxGeometry(8, 4, 4);
const building305Material = new THREE.MeshLambertMaterial({ 
    color: 0xb8860b
});
const building305 = new THREE.Mesh(building305Geometry, building305Material);
building305.position.set(-11, 2, 6);
scene.add(building305);

// IT Support Building
const ITSupportBuilding = new THREE.BoxGeometry(3, 3, 10);
const ITSupportBuildingMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xe0e0e0,
    shininess: 5,
    specular: 0x111111
});
const ITSupportBuildingMesh = new THREE.Mesh(ITSupportBuilding, ITSupportBuildingMaterial);
ITSupportBuildingMesh.position.set(6, 1.5, 12);
scene.add(ITSupportBuildingMesh);

// MVDSI Building
const mvdsiBuildingGeometry = new THREE.BoxGeometry(8, 4, 4);
const mvdsiBuildingMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x008b8b,
    shininess: 30,
    specular: 0x444444
});
const mvdsiBuildingMesh = new THREE.Mesh(mvdsiBuildingGeometry, mvdsiBuildingMaterial);
mvdsiBuildingMesh.position.set(14.5, 2, 5);
scene.add(mvdsiBuildingMesh);

// Buildings 814 and 815
const building814_815Geometry = new THREE.BoxGeometry(3.5, 3, 25);
const building814_815Material = new THREE.MeshLambertMaterial({ 
    color: 0x4682b4
});
const building814_815 = new THREE.Mesh(building814_815Geometry, building814_815Material);
building814_815.position.set(-8, 1.5, -18);
scene.add(building814_815);

// Lecture Hall 1 Building
const buildingLH1Geometry = new THREE.BoxGeometry(10, 4.5, 14);
const buildingLH1Material = new THREE.MeshStandardMaterial({ 
    color: 0x696969,
    roughness: 0.9,
    metalness: 0.0
});
const buildingLH1 = new THREE.Mesh(buildingLH1Geometry, buildingLH1Material);
buildingLH1.position.set(12, 2.25, -17);
scene.add(buildingLH1);

// Building 813
const building813Geometry = new THREE.BoxGeometry(3.5, 3, 13);
const building813Material = new THREE.MeshLambertMaterial({ 
    color: 0x4682b4
});
const building813 = new THREE.Mesh(building813Geometry, building813Material);
building813.rotation.y = Math.PI / 5;
building813.position.set(-10, 1.5, 16);
scene.add(building813);

// Buildings 803 and 804
const building803_804Geometry = new THREE.BoxGeometry(3.5, 3, 13);
const building803_804Material = new THREE.MeshPhongMaterial({ 
    color: 0x4682b4,
    shininess: 10,
    specular: 0x111111
});
const building803_804 = new THREE.Mesh(building803_804Geometry, building803_804Material);
building803_804.rotation.y = -Math.PI / 3.8;
building803_804.position.set(14, 1.5, 16);
scene.add(building803_804);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(
    0xffffff,
    0x444444,
    0.3
);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.45);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// PointLight illuminating the MVDSI building
const pointLight = new THREE.PointLight(0xff4400, 5, 30);
pointLight.position.set(14.5, 6, 5);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});