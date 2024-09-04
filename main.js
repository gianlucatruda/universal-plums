import * as THREE from '/node_modules/three/build/three.module.js';
import * as dat from '/node_modules/dat.gui/build/dat.gui.module.js';

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(ambientLight);
scene.add(directionalLight);

// Plum Geometry
const plumGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const plumMaterial = new THREE.MeshBasicMaterial({ color: 0x8e4585 });
const plum = new THREE.Mesh(plumGeometry, plumMaterial);
scene.add(plum);

// Icebox Geometry
const iceboxGeometry = new THREE.BoxGeometry(5, 5, 5);
const iceboxMaterial = new THREE.MeshPhongMaterial({
  color: 0x00bfff,
  transparent: true,
  opacity: 0.8,
});
const icebox = new THREE.Mesh(iceboxGeometry, iceboxMaterial);
icebox.position.set(0, 0, -10);
scene.add(icebox);

// Camera position
camera.position.z = 15;

// Dat.GUI setup
const gui = new dat.GUI();
const gameParameters = {
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
  renderer.render(scene, camera);
}

animate(); // Start the animation loop
