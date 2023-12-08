import { Color } from 'three';
import { camera, controls} from './camera';
import { renderer } from './renderer';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { states, moveState, buildFactory} from '../scripts/states';
import { grab, grabHandler, grabDown } from '../scripts/grab';
import { scene, ambientLight, clock, cameraPos, canvasGame, loader } from "../utils/vars"

let previousMousePosition = {
    x: 0,
    y: 0,
}
let isDragging = false;
const canvas = document.getElementById('game');
let topPov = true
let map;


function dragMouse(event){
	controls.smoothTime = 0.4
	controls.draggingSmoothTime = 0.03
	if (isDragging) {
		const deltaX = event.clientX - previousMousePosition.x;
		
		controls.rotate(deltaX * 0.0025, 0);
		
		previousMousePosition = {
			x: event.clientX,
			};
		}
}

const mouseup = () => {
	controls.smoothTime = 0.4
	isDragging = false;
}
const mousedown = (event) => {
	isDragging = true;
	previousMousePosition = {
		x: event.clientX,
		y: event.clientY,
	};
}


scene.background = new Color(0xffffff);
scene.add(ambientLight)
canvas.appendChild( renderer.domElement);

loader.load('../../../public/soft_hills.glb', (gltf) =>{
		map = gltf.scene;
        map.position.set(0,0,0);
		scene.add(map);
	}
)
controls.getPosition(cameraPos, true)


function animate() {
	const delta = clock.getDelta();
	if (topPov) {
		controls.smoothTime = 0.4
		controls.draggingSmoothTime = 0.1
		controls.truckSpeed = 2.5
	}
	if (cameraPos.y <= 15 && topPov == false) {

		topPov = true
		controls.draggingSmoothTime = 0.2
		controls.smoothTime = 0.4
		controls.lerpLookAt(0, 10, 5, 0, 0, 0,0, 3,5, 0, 2, 0, 0.8, true)

		canvasGame.addEventListener('mousemove', dragMouse)
		canvasGame.addEventListener('mouseup', mouseup)
		canvasGame.addEventListener('mousedown', mousedown)


	}
	else if (cameraPos.y > 5 && topPov == true){

		controls.setLookAt(0, 35, 0, 0, 0, 0, true)


		canvasGame.removeEventListener('mousemove', dragMouse)
		canvasGame.removeEventListener('mouseup', mouseup)
		canvasGame.removeEventListener('mousedown', mousedown)

		controls.draggingSmoothTime = 0.15
		controls.smoothTime = 0.2
		topPov = false
		renderer.domElement
	}

	if (states.move == true ){
		grab.style.cursor = "grab"
		grab.addEventListener('mousedown', grabHandler)
		grab.addEventListener('mouseup', grabDown)
		moveState();
	}
	else if (states.factory == true){
		grab.removeEventListener('mousedown', grabHandler)
		grab.removeEventListener('mouseup', grabDown)
		grab.style.cursor = "default"
		buildFactory();
	}

	console.log(cameraPos.x)

	controls.getPosition(cameraPos, true)
	controls.update(delta)
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();