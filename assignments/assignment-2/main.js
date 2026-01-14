import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

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

const textureLoader = new THREE.TextureLoader();

// Grass texture
const grassColor = textureLoader.load('textures/grass/Grass001_1K-JPG_Color.jpg');
const grassNormal = textureLoader.load('textures/grass/Grass001_1K-JPG_NormalGL.jpg');
const grassRoughness = textureLoader.load('textures/grass/Grass001_1K-JPG_Roughness.jpg');
grassColor.wrapS = grassColor.wrapT = THREE.RepeatWrapping;
grassNormal.wrapS = grassNormal.wrapT = THREE.RepeatWrapping;
grassRoughness.wrapS = grassRoughness.wrapT = THREE.RepeatWrapping;
grassColor.repeat.set(8, 10);
grassNormal.repeat.set(8, 10);
grassRoughness.repeat.set(8, 10);

// Ground plane with grass texture
const groundGeometry = new THREE.PlaneGeometry(40, 55);
const groundMaterial = new THREE.MeshStandardMaterial({ 
    map: grassColor,
    normalMap: grassNormal,
    roughnessMap: grassRoughness,
    side: THREE.DoubleSide 
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.set(0, 0, -3);
scene.add(ground);

// Road texture
const pavementColor = textureLoader.load('textures/pavement/PavingStones070_1K-JPG_Color.jpg');
const pavementNormal = textureLoader.load('textures/pavement/PavingStones070_1K-JPG_NormalGL.jpg');
pavementColor.wrapS = pavementColor.wrapT = THREE.RepeatWrapping;
pavementNormal.wrapS = pavementNormal.wrapT = THREE.RepeatWrapping;
const pavement2Color = textureLoader.load('textures/pavement_2/PavingStones150_1K-JPG_Color.jpg');
const pavement2Normal = textureLoader.load('textures/pavement_2/PavingStones150_1K-JPG_NormalGL.jpg');
pavement2Color.wrapS = pavement2Color.wrapT = THREE.RepeatWrapping;
pavement2Normal.wrapS = pavement2Normal.wrapT = THREE.RepeatWrapping;

// Roundabout outer circle
const roadCircleGeometry = new THREE.CylinderGeometry(6, 6, 0.2, 32);
const roadCircleMaterial = new THREE.MeshStandardMaterial({ 
    map: pavement2Color,
    normalMap: pavement2Normal,
    roughness: 0.8
});
const roadCircle = new THREE.Mesh(roadCircleGeometry, roadCircleMaterial);
roadCircle.position.set(0, 0.05, 0);
scene.add(roadCircle);

// Road from 4 sides
const createRoadMaterial = (repeatX, repeatY) => {
    const color = pavementColor.clone();
    const normal = pavementNormal.clone();
    color.wrapS = color.wrapT = THREE.RepeatWrapping;
    normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
    color.repeat.set(repeatX, repeatY);
    normal.repeat.set(repeatX, repeatY);
    return new THREE.MeshStandardMaterial({ 
        map: color,
        normalMap: normal,
        roughness: 0.8
    });
};

const road1 = new THREE.Mesh(new THREE.BoxGeometry(20, 0.1, 4), createRoadMaterial(5, 1));
road1.position.set(10, 0.05, 0);
scene.add(road1);

const road2 = new THREE.Mesh(new THREE.BoxGeometry(20, 0.1, 4), createRoadMaterial(5, 1));
road2.position.set(-10, 0.05, 0);
scene.add(road2);

const road3 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 20), createRoadMaterial(1, 5));
road3.position.set(0, 0.05, 14.5);
scene.add(road3);

const road4 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 25), createRoadMaterial(1, 6));
road4.position.set(0, 0.05, -18);
scene.add(road4);

// Roundabout inner circle
const roundaboutGeometry = new THREE.CylinderGeometry(4, 4, 0.2, 32);
const roundaboutMaterial = new THREE.MeshPhongMaterial({
    map: pavementColor,
    normalMap: pavementNormal, 
    shininess: 10
});
const roundabout = new THREE.Mesh(roundaboutGeometry, roundaboutMaterial);
roundabout.position.set(0, 0.1, 0);
scene.add(roundabout);

// Roundabout center decoration (grass)
const centerCircleGeometry = new THREE.CylinderGeometry(2.5, 2.5, 0.3, 32);
const centerGrassColor = textureLoader.load('textures/grass/Grass001_1K-JPG_Color.jpg');
const centerCircleMaterial = new THREE.MeshStandardMaterial({ 
    map: centerGrassColor
});
const centerCircle = new THREE.Mesh(centerCircleGeometry, centerCircleMaterial);
centerCircle.position.set(0, 0.15, 0);
scene.add(centerCircle);

// Brick textures for buildings
const redBrickColor = textureLoader.load('textures/red_bricks/Bricks031_1K-JPG_Color.jpg');
const redBrickNormal = textureLoader.load('textures/red_bricks/Bricks031_1K-JPG_NormalGL.jpg');
redBrickColor.wrapS = redBrickColor.wrapT = THREE.RepeatWrapping;
redBrickNormal.wrapS = redBrickNormal.wrapT = THREE.RepeatWrapping;
redBrickColor.repeat.set(2, 2);
redBrickNormal.repeat.set(2, 2);

const mixedBrickColor = textureLoader.load('textures/mixed_bricks/Bricks065_1K-JPG_Color.jpg');
const mixedBrickNormal = textureLoader.load('textures/mixed_bricks/Bricks065_1K-JPG_NormalGL.jpg');
mixedBrickColor.wrapS = mixedBrickColor.wrapT = THREE.RepeatWrapping;
mixedBrickNormal.wrapS = mixedBrickNormal.wrapT = THREE.RepeatWrapping;
mixedBrickColor.repeat.set(2, 2);
mixedBrickNormal.repeat.set(2, 2);

const grayBrickColor = textureLoader.load('textures/gray_bricks/Bricks066_1K-JPG_Color.jpg');
const grayBrickNormal = textureLoader.load('textures/gray_bricks/Bricks066_1K-JPG_NormalGL.jpg');
grayBrickColor.wrapS = grayBrickColor.wrapT = THREE.RepeatWrapping;
grayBrickNormal.wrapS = grayBrickNormal.wrapT = THREE.RepeatWrapping;
grayBrickColor.repeat.set(4, 2);
grayBrickNormal.repeat.set(4, 2);

const cyanBrickColor = textureLoader.load('textures/cyan_bricks/Bricks036_1K-JPG_Color.jpg');
const cyanBrickNormal = textureLoader.load('textures/cyan_bricks/Bricks036_1K-JPG_NormalGL.jpg');
cyanBrickColor.wrapS = cyanBrickColor.wrapT = THREE.RepeatWrapping;
cyanBrickNormal.wrapS = cyanBrickNormal.wrapT = THREE.RepeatWrapping;
cyanBrickColor.repeat.set(3, 3);
cyanBrickNormal.repeat.set(3, 3);

// Building 305 with red brick texture
const building305Geometry = new THREE.BoxGeometry(8, 4, 4);
const building305Material = new THREE.MeshStandardMaterial({ 
    map: redBrickColor,
    normalMap: redBrickNormal
});
const building305 = new THREE.Mesh(building305Geometry, building305Material);
building305.position.set(-11, 2, 6);
building305.userData.name = "Building 305";
scene.add(building305);

// IT Support Building with glass (transparent material)
const ITSupportBuilding = new THREE.BoxGeometry(3, 3, 10);
const ITSupportBuildingMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0x88ccff,
    transparent: true,
    opacity: 0.6,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.5
});
const ITSupportBuildingMesh = new THREE.Mesh(ITSupportBuilding, ITSupportBuildingMaterial);
ITSupportBuildingMesh.position.set(6, 1.5, 12);
ITSupportBuildingMesh.userData.name = "IT Support";
scene.add(ITSupportBuildingMesh);

// MVDSI Building with cyan brick texture
const mvdsiBuildingGeometry = new THREE.BoxGeometry(8, 4, 4);
const mvdsiBuildingMaterial = new THREE.MeshStandardMaterial({ 
    map: cyanBrickColor,
    normalMap: cyanBrickNormal
});
const mvdsiBuildingMesh = new THREE.Mesh(mvdsiBuildingGeometry, mvdsiBuildingMaterial);
mvdsiBuildingMesh.position.set(14.5, 2, 5);
mvdsiBuildingMesh.userData.name = "MVDSI Building";
scene.add(mvdsiBuildingMesh);

// Buildings 814 and 815 with mixed brick texture
const building814_815Geometry = new THREE.BoxGeometry(3.5, 3, 25);
const building814_815Material = new THREE.MeshLambertMaterial({
    map: mixedBrickColor,
    color: 0x4682b4
});
const building814_815 = new THREE.Mesh(building814_815Geometry, building814_815Material);
building814_815.position.set(-8, 1.5, -18);
building814_815.userData.name = "Buildings 814-815";
scene.add(building814_815);

// Lecture Hall 1 Building with gray brick texture
const buildingLH1Geometry = new THREE.BoxGeometry(10, 4.5, 14);
const buildingLH1Material = new THREE.MeshStandardMaterial({ 
    map: grayBrickColor,
    normalMap: grayBrickNormal,
    roughness: 0.9
});
const buildingLH1 = new THREE.Mesh(buildingLH1Geometry, buildingLH1Material);
buildingLH1.position.set(12, 2.25, -17);
buildingLH1.userData.name = "Lecture Hall 1";
scene.add(buildingLH1);

// Building 813 with mixed brick texture
const building813Geometry = new THREE.BoxGeometry(3.5, 3, 13);
const building813Material = new THREE.MeshLambertMaterial({ 
    map: mixedBrickColor
});
const building813 = new THREE.Mesh(building813Geometry, building813Material);
building813.rotation.y = Math.PI / 5;
building813.position.set(-10, 1.5, 16);
building813.userData.name = "Building 813";
scene.add(building813);

// Buildings 803 and 804 with red brick texture (changed color)
const building803_804Geometry = new THREE.BoxGeometry(3.5, 3, 13);
const building803_804Material = new THREE.MeshPhongMaterial({ 
    map: redBrickColor,
    normalMap: redBrickNormal,
    color: 0x4682b4,
    shininess: 10,
    specular: 0x111111
});
const building803_804 = new THREE.Mesh(building803_804Geometry, building803_804Material);
building803_804.rotation.y = -Math.PI / 3.8;
building803_804.position.set(14, 1.5, 16);
building803_804.userData.name = "Buildings 803-804";
scene.add(building803_804);

// Array of clickable buildings for interaction
const clickableBuildings = [
    building305, ITSupportBuildingMesh, mvdsiBuildingMesh, 
    building814_815, buildingLH1, building813, building803_804
];

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.2);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 8, 20);
pointLight.position.set(3, 2, 0);
scene.add(pointLight);

// GLTF models (benches and trees)
const gltfLoader = new GLTFLoader();

// Load benches
const benchPositions = [
    { x: -3, z: -25, rotY: 0 },
    { x: -3, z: -22.5, rotY: 0 },
    { x: -3, z: -12.5, rotY: 0 },
    { x: -3, z: -10, rotY: 0 },
    { x: -3, z: 12.5, rotY: 0 },
    { x: -3, z: 15, rotY: 0 },
    { x: 11.5, z: -3, rotY: Math.PI / 2 },
    { x: 14, z: -3, rotY: Math.PI / 2 }
];

gltfLoader.load('models/bench/scene.gltf', (gltf) => {
    benchPositions.forEach(pos => {
        const bench = gltf.scene.clone();
        bench.scale.set(1.5, 1.5, 1.5);
        bench.position.set(pos.x, 0.375, pos.z);
        bench.rotation.y = pos.rotY;
        scene.add(bench);
    });
});

// Load trees
const treePositions = [
    { x: -15, z: -5 },
    { x: -15, z: -15 },
    { x: -15, z: -25 },
    { x: 11, z: -6 },
    { x: 17, z: -6 },
    { x: 5, z: -7.5 },
    { x: 5, z: -16.5 },
    { x: -12.5, z: 22.5 },
    { x: 5, z: 22.5 },
    { x: -17.5, z: 17.5 },
    { x: 16.5, z: 21 },
    { x: 11.5, z: 11 },
    { x: -7.5, z: 11 },
    { x: -17.5, z: 11 },
    { x: 5, z: -25 }
];

gltfLoader.load('models/tree/scene.gltf', (gltf) => {
    treePositions.forEach(pos => {
        const tree = gltf.scene.clone();
        tree.scale.set(1.5, 1.5, 1.5);
        tree.position.set(pos.x, 0, pos.z);
        scene.add(tree);
    });
});

// FBX animated models (people talking)
const fbxLoader = new FBXLoader();
let mixer1, mixer2;

fbxLoader.load('models/man_talking.fbx', (fbx) => {
    fbx.scale.set(0.015, 0.015, 0.015);
    fbx.position.set(-0.8, 0.15, -5);
    fbx.rotation.y = Math.PI / 2;

    fbx.traverse((child) => {
        if (child.isMesh && child.material) {
            child.material.transparent = false;
            child.material.opacity = 1;
        }
    });

    scene.add(fbx);
    
    if (fbx.animations.length > 0) {
        mixer1 = new THREE.AnimationMixer(fbx);
        mixer1.clipAction(fbx.animations[0]).play();
    }
});

fbxLoader.load('models/woman_talking.fbx', (fbx) => {
    fbx.scale.set(0.015, 0.015, 0.015);
    fbx.position.set(0.8, 0.15, -5);
    fbx.rotation.y = -Math.PI / 2;

    fbx.traverse((child) => {
        if (child.isMesh && child.material) {
            child.material.transparent = false;
            child.material.opacity = 1;
        }
    });

    scene.add(fbx);
    
    if (fbx.animations.length > 0) {
        mixer2 = new THREE.AnimationMixer(fbx);
        mixer2.clipAction(fbx.animations[0]).play();
    }
});

// Raycaster for click interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Click to change building color
window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableBuildings);
    
    if (intersects.length > 0) {
        const building = intersects[0].object;
        const randomColor = Math.random() * 0xffffff;
        building.material.color.setHex(randomColor);
        console.log("Clicked: " + building.userData.name);
    }
});

// Highlight building on hover
let hoveredBuilding = null;
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableBuildings);
    
    // Reset previous hovered building
    if (hoveredBuilding) {
        hoveredBuilding.material.emissive.setHex(0x000000);
        hoveredBuilding = null;
    }
    
    // Highlight new hovered building
    if (intersects.length > 0) {
        hoveredBuilding = intersects[0].object;
        hoveredBuilding.material.emissive.setHex(0x333333);
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'default';
    }
});

// Toggle point light on/off by pressing 'L' on keyboard
let lightOn = true;
window.addEventListener('keydown', (event) => {
    if (event.key === 'l' || event.key === 'L') {
        lightOn = !lightOn;
        pointLight.intensity = lightOn ? 8 : 0;
    }
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();
    
    // Animate point light around the roundabout
    pointLight.position.x = Math.cos(elapsed * 0.5) * 4;
    pointLight.position.z = Math.sin(elapsed * 0.5) * 4;
    
    // Update FBX animations
    if (mixer1) mixer1.update(delta);
    if (mixer2) mixer2.update(delta);
    
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