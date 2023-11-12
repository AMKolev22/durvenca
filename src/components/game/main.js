import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
const canvas = document.getElementById('game');
const renderer = new THREE.WebGLRenderer({antialias: true});
const controls = new OrbitControls(camera, renderer.domElement);
const controls2  = new TrackballControls(camera, renderer.domElement);

const square = new THREE.BoxGeometry(1,0.1,1);
const light = new THREE.MeshBasicMaterial({color: 0xE0C4A8})
const dark = new THREE.MeshBasicMaterial({color: 0x6A4236})
const cube = new THREE.Mesh(square, light)
const board = new THREE.Group

const ambl = new THREE.AmbientLight(0xFFFFFF)

scene.background = new THREE.Color(0xff0000);
renderer.setSize( window.innerWidth, window.innerHeight );
canvas.appendChild( renderer.domElement);

for (let x = 0; x < 10; x++){
	for (let z = 0; z < 10; z++){
		let cube;
		if (z%2 == 0){
			cube = new THREE.Mesh(square, x % 2 == 0 ? light : dark)
		}
		else{
			cube = new THREE.Mesh(square, x % 2 == 0 ? dark : light)
		}
		cube.position.set(x,0,z)
		board.add(cube)
	}
}
controls.mouseButtons = {LEFT: 2, MIDDLE: 1, RIGHT: 0};
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.enableZoom = false;
controls.enableRotate = false;

controls2.noRotate = true;
controls2.noPan = true;
controls2.noZoom = false;
controls.zoomSpeed = 1




scene.add(ambl)
scene.add(board);

camera.position.z = 5;
camera.position.y = 20




function animate() {
	requestAnimationFrame( animate );

	const target = controls.target
	controls2.target.set(target.x, target.y, target.z);

	if (camera.position.y > 60){
		camera.position.y = 20;
	}

	
	controls.update();
	controls2.update();
	renderer.render( scene, camera );
}

animate();

