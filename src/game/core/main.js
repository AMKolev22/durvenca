import { Color, Raycaster, Box3, Vector3 } from 'three';
import * as THREE from 'three'
import { camera, controls } from './camera';
import CameraControls from 'camera-controls';
import { renderer } from './renderer';
import { states } from '../scripts/states';
import { grab, grabHandler, grabDown } from '../scripts/grab';
import { scene, ambientLight, clock, cameraPos, canvasGame, loader, treeLoader } from "../utils/vars"
import { raycaster, mouseCords } from '../scripts/detectMouseClick';
import { loadTree } from '../scripts/loadTree';
import { seedInfo } from '../scripts/worldInfo';

let previousMousePosition = {
    x: 0,
    y: 0,
}
let corners=[];
let isModelLoaded = false;
const canvas = document.getElementById('game');
let map, model, boundingBox, clickedPoint, isDragging = false, topPov = true;
const mapCornerPoints = [];
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


scene.background = new THREE.Color(0xffffff);
scene.add(ambientLight)
canvas.appendChild( renderer.domElement);

loader.load('../../../public/soft_hills.glb', (gltf) =>{
		map = gltf.scene;
		boundingBox = new Box3().setFromObject(map);
		corners = [
			new Vector3(boundingBox.min.x, boundingBox.max.y / 2, boundingBox.max.z), //bl
			new Vector3(boundingBox.min.x, boundingBox.max.y / 4, boundingBox.min.z), //tl
			new Vector3(boundingBox.max.x, boundingBox.min.y / 2, boundingBox.max.z), //tr
			new Vector3(boundingBox.max.x, boundingBox.min.y / 4, boundingBox.max.z) //br
		];
        map.position.set(0,0,0);
		boundingBox = 
		scene.add(map);
		raycaster.intersectObjects(map.children, true);
	}
)

treeLoader.load('../../../public/tree.glb', (gltf) => {
	model = gltf.scene;
	model.scale.set(0.05, 0.05, 0.05);
});

function handleClick(event){
	mouseCords.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouseCords.y = -(event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(mouseCords,camera);
	if (map){
		let point = raycaster.intersectObjects(map.children, true);
		if (point.length > 0){
			clickedPoint = point[0].point
		}
	}
}

async function spawnTree(e){
	if (!isModelLoaded){
		isModelLoaded = true;
		handleClick(e);
		const modelPath = '../../../public/tree.glb';
		const loadedModel = await loadTree(modelPath);
		if (model) {
			model.traverse(child => {
				if (child.isMesh) {
					child.geometry.dispose();
					child.material.dispose();
					child = null;
				}
			});
		}
		model = loadedModel;
		model.position.set(clickedPoint.x, clickedPoint.y, clickedPoint.z);
		scene.add(model);
		model = null;
		isModelLoaded = false; 
	}
}

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

	else if (cameraPos.y > 5 && topPov == true) {

		controls.setLookAt(0, 35, 0, 0, 0, 0, true)

		canvasGame.removeEventListener('mousemove', dragMouse)
		canvasGame.removeEventListener('mouseup', mouseup)
		canvasGame.removeEventListener('mousedown', mousedown)

		controls.draggingSmoothTime = 0.15
		controls.smoothTime = 0.2
		topPov = false
		renderer.domElement

	}

	if (states.move === true ) {

		canvasGame.removeEventListener('click', spawnTree, false)
		grab.style.cursor = "grab"
		grab.addEventListener('mousedown', grabHandler)
		grab.addEventListener('mouseup', grabDown)
		
		controls.mouseButtons.left = CameraControls.ACTION.TRUCK; 
		controls.mouseButtons.right = CameraControls.ACTION.TRUCK;
	}
	
	else if (states.factory === true) {
	
		canvasGame.removeEventListener('click', spawnTree, false)
		grab.removeEventListener('mousedown', grabHandler)
		grab.removeEventListener('mouseup', grabDown)
	
		grab.style.cursor = "default"
	
		controls.mouseButtons.left = CameraControls.ACTION.NONE; 
		controls.mouseButtons.right = CameraControls.ACTION.NONE;


	}
	
	else if (states.tree == true) {
	
		grab.removeEventListener('mousedown', grabHandler)
		grab.removeEventListener('mouseup', grabDown)
	
		grab.style.cursor = "default"
	
		controls.mouseButtons.left = CameraControls.ACTION.NONE; 
		controls.mouseButtons.right = CameraControls.ACTION.NONE;
		canvasGame.addEventListener('click', spawnTree, false)
	}
	
	controls.getPosition(cameraPos, true)
	controls.update(delta)
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();