import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 初始化场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// 加载天空盒纹理
const textureLoader = new THREE.TextureLoader();
const myTextureright = textureLoader.load('skybox/right.jpg');
const myTextureleft = textureLoader.load('skybox/left.jpg');
const myTexturetop = textureLoader.load('skybox/top.jpg');
const myTexturebottom = textureLoader.load('skybox/bottom.jpg');
const myTexturefront = textureLoader.load('skybox/front.jpg');
const myTextureback = textureLoader.load('skybox/back.jpg');

// 创建天空盒材质
const material = [
  new THREE.MeshStandardMaterial({map: myTextureright}),
  new THREE.MeshStandardMaterial({map: myTextureleft}),
  new THREE.MeshStandardMaterial({map: myTexturetop}),
  new THREE.MeshStandardMaterial({map: myTexturebottom}),
  new THREE.MeshStandardMaterial({map: myTexturefront}),
  new THREE.MeshStandardMaterial({map: myTextureback})
];

// 创建基础几何体
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
const cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);
cube.position.set(0,-5,0);
cube.castShadow = true;

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: "pink" });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(2,-5,2);
sphere.castShadow = true;

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide ,color:"lightcyan"});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
plane.receiveShadow = true;

// 设置光照
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(3, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

// 控制器和GUI
const controls = new OrbitControls(camera, renderer.domElement);

const gui = new GUI();
const positionFolder = gui.addFolder('立方体位置');
positionFolder.add(cube.position, 'x', -10, 10).name('X 轴');
positionFolder.add(cube.position, 'y', -5, 5).name('Y 轴');
positionFolder.add(cube.position, 'z', -5, 5).name('Z 轴');

const positionFolder1 = gui.addFolder('球体位置');
positionFolder1.add(sphere.position, 'x', -5, 5).name('X 轴');
positionFolder1.add(sphere.position, 'y', -5, 5).name('Y 轴');
positionFolder1.add(sphere.position, 'z', -5, 5).name('Z 轴');

gui.add(sphere, 'visible').name('显示球体');
gui.addColor(sphere.material, 'color').name('球体颜色');
gui.add(directionalLight, 'intensity', 0, 2).name('光照强度');

// 动画混合器和时钟
let mixer1, mixer2;
const clock = new THREE.Clock();

// 加载模型
const loader = new GLTFLoader();

// 加载第一个模型
loader.load('src/ball/scene.gltf', (gltf) => {
  const model = gltf.scene;
  model.position.set(0, -2, 1);
  model.scale.set(5, 5, 5);
  scene.add(model);

   mixer0 = new THREE.AnimationMixer(model);
  const action = mixer0.clipAction(gltf.animations[0]);
  action.play();
});

// 加载第二个模型（带动画）
loader.load('src/fish/scene.gltf', (gltf) => {
  const model = gltf.scene;
  model.position.set(-1, -1, -0.5);
  model.scale.set(2.5,2.5,2.5);
  scene.add(model);
  
  mixer1 = new THREE.AnimationMixer(model);
  const action = mixer1.clipAction(gltf.animations[0]);
  action.play();
});

// 加载第三个模型（带动画）
loader.load('src/map.glb', (glb) => {
  const model = glb.scene;
  model.position.set(0, -2, 1);
  model.scale.set(6, 6, 6);
  scene.add(model);
  
  mixer2 = new THREE.AnimationMixer(model);
  const action = mixer2.clipAction(gltf.animations[0]);
  action.play();
});

// 鼠标交互
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let currentIntersect = null;

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click', () => {
  if (currentIntersect) {
    console.log('你点击了：', currentIntersect.object.name);
  }
});

// 动画循环
function animate() {
  requestAnimationFrame(animate);

  // 更新动画
  const delta = clock.getDelta();
  if (mixer1) mixer1.update(delta);
  if (mixer2) mixer2.update(delta);

  // 几何体动画
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  sphere.rotation.x += 0.02;
  sphere.rotation.y += 0.02;

  // 鼠标交互更新
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  
  if (currentIntersect) {
    if (currentIntersect.object.material && currentIntersect.object.material.color) {
      currentIntersect.object.material.color.set('lightyellow');
    }
  }
  
  if (intersects.length > 0 && intersects[0].object.material && intersects[0].object.material.color) {
    currentIntersect = intersects[0];
    currentIntersect.object.material.color.set('lightblue');
  } else {
    currentIntersect = null;
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();

// 响应窗口大小变化
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});    
