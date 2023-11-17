import * as THREE from 'three';
import { camera, controls} from './camera';
import { renderer } from './renderer';



const scene = new THREE.Scene();
const canvas = document.getElementById('game');
const clock = new THREE.Clock();
const canvasGame = renderer.domElement;

const square = new THREE.BoxGeometry(1,0.1,1);
const light = new THREE.MeshBasicMaterial({color: 0xE0C4A8})
const dark = new THREE.MeshBasicMaterial({color: 0x6A4236})
const cube = new THREE.Mesh(square, light)
const board = new THREE.Group();
const ambl = new THREE.AmbientLight(0xFFFFFF);

let cameraPos = new THREE.Vector3();
let boardPos = new THREE.Vector3();
let orbitPos = new THREE.Vector3();

let topPov = true

let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0,
};

function dragMouse(event){
	controls.smoothTime = 0.4
			controls.draggingSmoothTime = 0.001
			if (isDragging) {
				const deltaX = event.clientX - previousMousePosition.x;
		
				controls.rotate(deltaX * 0.0025, 0);
		
				previousMousePosition = {
					x: event.clientX,
					y: event.clientY,
				};
			}
}

scene.background = new THREE.Color(0xff0000);
canvas.appendChild( renderer.domElement);
const grab = document.querySelector('canvas')
grab.addEventListener('mousedown', () =>{
	grab.style.cursor = "grabbing";
})
grab.addEventListener('mouseup', () =>{
	grab.style.cursor = "grab";
})

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
boardPos.x = board.position.x;
boardPos.y = board.position.y;
boardPos.z = board.position.z;
controls.get

controls.getPosition(cameraPos, true)


function animate() {
	const delta = clock.getDelta();
	if (cameraPos.y <= 15 && topPov == false){
		topPov = true
		controls.draggingSmoothTime = 0.2
		controls.smoothTime = 0.4
		controls.lerpLookAt(0, 10, 5, boardPos.x, boardPos.y, boardPos.z,0, 3,5, 0, 2, 0, 0.8, true)
		canvasGame.addEventListener('mousedown', (event) => {
			controls.smoothTime = 0.4
			isDragging = true;
			previousMousePosition = {
				x: event.clientX,
				y: event.clientY,
			};
		});
		
		canvasGame.addEventListener('mouseup', () => {
			controls.smoothTime = 0.4
			isDragging = false;
		});
		
		canvasGame.addEventListener('mousemove', dragMouse)
	}
	else if (cameraPos.y > 5 && topPov == true){
		controls.setLookAt(0, 20, 0, boardPos.x, boardPos.y, boardPos.z, true)
		canvasGame.removeEventListener('mousemove', dragMouse)
		controls.draggingSmoothTime = 0.2
		controls.smoothTime = 0.4
		topPov = false
		renderer.domElement
	}
	controls.getPosition(cameraPos, true)
	controls.getTarget(orbitPos)
	console.log(cameraPos.y)
	controls.update(delta)
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

