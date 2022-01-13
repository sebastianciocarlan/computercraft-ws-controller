// Option 1: Import the entire three.js core library.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x404040);
const controls = new OrbitControls(camera, renderer.domElement);
controls.keys = {
    LEFT: 'ArrowLeft', //left arrow
    UP: 'ArrowUp', // up arrow
    RIGHT: 'ArrowRight', // right arrow
    BOTTOM: 'ArrowDown' // down arrow
}
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


function addCube(x, y, z, color) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8 });
    const cube = new THREE.Mesh(geometry, material);
    const matLine = new THREE.LineBasicMaterial({
        color: color,
        linewidth: 10
    });
    const lineGeometry = new THREE.LineSegments(geometry, matLine);



    cube.translateX(x)
    cube.translateY(y)
    cube.translateZ(z)
    lineGeometry.translateX(x)
    lineGeometry.translateY(y)
    lineGeometry.translateZ(z)
    scene.add(lineGeometry);
    scene.add(cube);


}
addCube(0, 0, 1, 0x00ff00)
addCube(0, 0, 0, 0x00ffff)
addCube(0, 1, 0, 0xff00ff)

camera.position.z = 5;
controls.update();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();