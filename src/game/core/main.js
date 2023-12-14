import { Color, Raycaster, Box3 } from 'three';
import { Random } from 'random-js';
import * as THREE from 'three'
import { camera, controls } from './camera';
import CameraControls from 'camera-controls';
import { renderer } from './renderer';
import { states } from '../scripts/states';
import { grab, grabHandler, grabDown } from '../scripts/grab';
import { scene, ambientLight, clock, cameraPos, canvasGame, loader } from "../utils/vars"
import { raycaster, mouseCords } from '../scripts/detectMouseClick';
import { loadTree, loadFactory } from '../scripts/loadModels';
import { seedInfo } from '../scripts/worldInfo';

let previousMousePosition = {
    x: 0,
    y: 0,
}
export let state = {
	loaded: false,
}
let isModelLoaded = false, shouldPreLoad = true;
const canvas = document.getElementById('game');
let map, model, boundingBox, clickedPoint, isDragging = false, topPov = true;
const co2Element = document.getElementById('co2')
const treeCountElement = document.getElementById('treecount');
const factoryCountElement = document.getElementById('factorycount');
let co2count = 0;
let treeCount = seedInfo.trees;
let factoryCount = 0;
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
        map.position.set(0,0,0);
		scene.add(map);
		raycaster.intersectObjects(map.children, true);
		boundingBox = new Box3().setFromObject(map);
	}
)



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
		co2count = Math.round(co2count - 0.0218); // 
		co2Element.innerHTML = Math.ceil(((co2count) / 1000000)) + "MT" 
		treeCount++;
		treeCountElement.innerHTML = treeCount + "x";
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

// async function spawnRandomTree(x,y,z){
// 		const modelPath = '../../../public/tree.glb';
		
// 		const loadedModel = await loadTree(modelPath);
// 		if (model) {
// 			model.traverse(child => {
// 				if (child.isMesh) {
// 					child.geometry.dispose();
// 					child.material.dispose();
// 					child = null;
// 				}
// 			});
// 		}
// 		model = loadedModel;
// 		model.position.set(x,y,z);
// 		scene.add(model);
// 		model = null;
// }

async function spawnFactory(e){
	if (!isModelLoaded){
		isModelLoaded = true;
		handleClick(e);
		co2count = Math.ceil(co2count + 50000);
		co2Element.innerHTML = ((co2count) / 1000000) + "MT" 
		factoryCount++;
		factoryCountElement.innerHTML = factoryCount + "x"
		const modelPath = '../../../public/factory.glb';
		const loadedModel = await loadFactory(modelPath);
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

// async function spawnRandomFactory(x,y,z){
// 	const modelPath = '../../../public/factory.glb';
// 	const loadedModel = await loadFactory(modelPath);
// 	if (model) {
// 		model.traverse(child => {
// 			if (child.isMesh) {
// 				child.geometry.dispose();
// 				child.material.dispose();
// 				child = null;
// 			}
// 		});
// 	}
// 	model = loadedModel;
// 	model.position.set(x,y,z);
// 	scene.add(model);
// 	model = null;
// }



function animate() {
	const delta = clock.getDelta();

	// if (shouldPreLoad == true && boundingBox != undefined){
	// 	treeCountElement.innerHTML = treeCount + "x"
	// 	factoryCountElement.innerHTML = factoryCount + "x"
	// 	for (let i = 0; i < seedInfo.trees; i++){
	// 	let x = new Random().integer(boundingBox.min.x + 1, boundingBox.max.x - 2);
	// 	let y = new Random().integer(boundingBox.min.y, boundingBox.min.y);
	// 	let z = new Random().integer(boundingBox.min.z + 1, boundingBox.max.z - 2);
	// 	spawnRandomTree(x,y,z);
	// 	co2count = co2count - 0.0218;
	// 	x = null;
	// 	y = null;
	// 	z = null;
	// }
	// 	for (let i = 0; i < seedInfo.factories; i++){
	// 	let x = new Random().integer(boundingBox.min.x + 1, boundingBox.max.x - 2);
	// 	let y = new Random().integer(boundingBox.min.y + 1, boundingBox.max.y);
	// 	let z = new Random().integer(boundingBox.min.z + 1, boundingBox.max.z - 2);
	// 	spawnRandomFactory(x,y,z);
	// 	x = null;
	// 	y = null;
	// 	z = null;
	// }
	
// 	shouldPreLoad = false;	
// }
// new Random().integer(boundingBox.min.x + 1, boundingBox.max.x - 2);

	// if (shouldPreLoad == false){
	// 			treeCount = 0;
	// 			treeCountElement.innerHTML = treeCount + "x";
	// }

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

	}

	if (states.move === true ) {
		if (topPov === true){
			canvasGame.addEventListener('mousemove', dragMouse)
		}
		canvasGame.addEventListener('mouseup', mouseup)
		canvasGame.addEventListener('mousedown', mousedown)
		canvasGame.removeEventListener('click', spawnTree, false)
		canvasGame.removeEventListener('click', spawnFactory, false)
		grab.style.cursor = "grab"
		grab.addEventListener('mousedown', grabHandler)
		grab.addEventListener('mouseup', grabDown)
		
		controls.mouseButtons.left = CameraControls.ACTION.TRUCK; 
		controls.mouseButtons.right = CameraControls.ACTION.TRUCK;
	}
	
	else if (states.factory === true) {
	
		canvasGame.removeEventListener('click', spawnTree, false)
		canvasGame.removeEventListener('mousemove', dragMouse)
		canvasGame.removeEventListener('mouseup', mouseup)
		canvasGame.removeEventListener('mousedown', mousedown)
		grab.removeEventListener('mousedown', grabHandler)
		grab.removeEventListener('mouseup', grabDown)
	
		grab.style.cursor = "default"
	
		controls.mouseButtons.left = CameraControls.ACTION.NONE; 
		controls.mouseButtons.right = CameraControls.ACTION.NONE;
		canvasGame.addEventListener('click', spawnFactory, false)

	}
	
	else if (states.tree == true) {
	
		canvasGame.removeEventListener('click', spawnFactory, false)
		grab.removeEventListener('mousedown', grabHandler)
		grab.removeEventListener('mouseup', grabDown)
		canvasGame.removeEventListener('mousemove', dragMouse)
		canvasGame.removeEventListener('mouseup', mouseup)
		canvasGame.removeEventListener('mousedown', mousedown)
	
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