import * as THREE from 'three';
import { controls, controls2, camera } from './camera';
import { renderer } from './renderer';

const scene = new THREE.Scene();
const canvas = document.getElementById('game');


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




scene.add(ambl)
scene.add(board);





function animate() {
	requestAnimationFrame( animate );

	const target = controls.target
	controls2.target.set(target.x, target.y, target.z);

	
	controls.update();
	controls2.update();
	renderer.render( scene, camera );
}

animate();

