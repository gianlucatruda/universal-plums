import * as THREE from "/node_modules/three/build/three.module.js";
import * as dat from "/node_modules/dat.gui/build/dat.gui.module.js";
import { OrbitControls } from './OrbitControls.js';

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  -(window.innerWidth / 20),
  window.innerWidth / 20,
  window.innerHeight / 20,
  -(window.innerHeight / 20),
  1,
  1000,
);
camera.position.set(8, 8, 8);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(0, 10, 0);
scene.add(sunLight);

// Plum Geometry
const plumGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const plumMaterial = new THREE.MeshBasicMaterial({ color: 0x8e4585 });
const plums = [];
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function addPlum() {
  const plum = new THREE.Mesh(plumGeometry, plumMaterial);
  plum.position.set(-5, 0.5, 0);
  scene.add(plum);
  plums.push(plum);
  console.log("Added a plum", len(plums));
}


// Icebox Geometry
const iceboxGeometry = new THREE.BoxGeometry(5, 5, 5);
const iceboxMaterial = new THREE.MeshPhongMaterial({
  color: 0x00bfff,
  transparent: true,
  opacity: 0.8,
});
const icebox = new THREE.Mesh(iceboxGeometry, iceboxMaterial);
icebox.scale.set(2, 2, 2); // Scale the icebox
scene.add(icebox);

// GUI setup
const gui = new dat.GUI();
const gameParameters = {
  plums: 0,
  plumPrice: 1,
  temperature: -2,
  breakfastPrice: 5,
};
gui.add(gameParameters, "plumPrice", 0, 100);
gui.add(gameParameters, "temperature", -10, 30);
gui.add(gameParameters, "breakfastPrice", 1, 10);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  sunLight.position.x = Math.sin(Date.now() * 0.001) * 30;
  sunLight.position.z = Math.cos(Date.now() * 0.001) * 30;
  renderer.render(scene, camera);
}

animate(); // Start the animation loop
