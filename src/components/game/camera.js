import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import { renderer } from './renderer';


export const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
export const controls = new OrbitControls(camera, renderer.domElement);
export const controls2  = new TrackballControls(camera, renderer.domElement);


controls.mouseButtons = {LEFT: 2, MIDDLE: 1, RIGHT: 0};
controls.enableDamping = true;
controls.enableZoom = false;
controls.enableRotate = false;
controls.dampingFactor = 0.03;
controls.panSpeed = 0.25;

controls2.noRotate = true;
controls2.noPan = false;
controls2.noZoom = false;
controls2.maxDistance = 30
controls2.minDistance = 5
controls2.dynamicDampingFactor = 0.6
controls2.zoomSpeed = 1



camera.position.z = 5;
camera.position.y = 20
camera.rotation.order = 'YXZ';







