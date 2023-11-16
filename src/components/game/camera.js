import * as THREE from 'three';
import { renderer } from './renderer';
import CameraControls from 'camera-controls';



CameraControls.install( { THREE: THREE } );
export const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
export const controls = new CameraControls(camera, renderer.domElement);

controls.enabled = true;
controls.setPosition(0, 20, 5)
controls.mouseButtons.right = CameraControls.ACTION.NONE;
controls.mouseButtons.left = CameraControls.ACTION.TRUCK;

controls.maxZoom = 35;
controls.minZoom = 5;









