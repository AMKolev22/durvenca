import * as THREE from 'three';
import { renderer } from './renderer';
import CameraControls from 'camera-controls';



CameraControls.install( { THREE: THREE } );
export const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
export const controls = new CameraControls(camera, renderer.domElement);

controls.setPosition(0, 25, 5)
controls.mouseButtons.right = CameraControls.ACTION.TRUCK;
controls.mouseButtons.left = CameraControls.ACTION.TRUCK;

controls.minDistance = 5
controls.maxDistance = 30
controls.dollyToCursor = true
controls.smoothTime = 0.4

controls.verticalDragToForward = true;

controls.draggingSmoothTime = 0.1







